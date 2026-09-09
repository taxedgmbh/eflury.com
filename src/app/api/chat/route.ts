import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { serverEnv, isConfigured } from '@/lib/server/env';
import { checkRateLimit } from '@/lib/server/ratelimit';
import { buildSystemPrompt } from '@/lib/server/chat-prompt';
import { PERSON } from '@/lib/site';

/**
 * Replaces astro-src/public/api/chat.php.
 *
 * The client contract is preserved exactly — POST {message} -> {reply} — so the
 * existing chat widget ports without changes. Streaming and conversation
 * history are additive and land in 3b.
 *
 * Vertex AI authenticates through the App Hosting service account via
 * Application Default Credentials, so unlike the PHP version there is no API key
 * anywhere: none in the repo, none in Secret Manager, none to rotate. The
 * service account needs roles/aiplatform.user.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        text: z.string().max(4000),
      })
    )
    .max(12)
    .optional(),
});

/** Server-side cap, independent of whatever the client sends. */
const MAX_HISTORY_TURNS = 6;

const FALLBACK = `Da ist gerade etwas schiefgelaufen. Schreiben Sie Emanuel direkt: ${PERSON.email}`;

function json(body: unknown, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = requestSchema.safeParse(await request.json());
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
  if (!parsed.success) {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  if (!isConfigured('GOOGLE_CLOUD_PROJECT')) {
    console.error('[chat] GOOGLE_CLOUD_PROJECT is not set');
    return json({ reply: FALLBACK }, 200);
  }

  // Rate limiting must not take the route down if Firestore is unreachable:
  // failing open on the counter is better than failing the whole chat, and the
  // global cap plus maxInstances still bound the spend.
  try {
    const limit = await checkRateLimit(request);
    if (!limit.allowed) {
      const reply =
        limit.reason === 'global'
          ? `Heute sind schon sehr viele Anfragen eingegangen. Schreiben Sie Emanuel direkt: ${PERSON.email}`
          : 'Einen Moment bitte — etwas zu viele Nachrichten in kurzer Zeit.';
      return json(
        { reply },
        429,
        limit.retryAfterSeconds ? { 'Retry-After': String(limit.retryAfterSeconds) } : undefined
      );
    }
  } catch (error) {
    console.error('[chat] rate limiter unavailable, allowing request', error);
  }

  const { message, history = [] } = parsed.data;

  try {
    const ai = new GoogleGenAI({
      vertexai: true,
      project: serverEnv.projectId,
      location: serverEnv.vertexLocation,
    });

    const contents = [
      ...history.slice(-MAX_HISTORY_TURNS * 2).map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
      { role: 'user' as const, parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: serverEnv.chatModel,
      contents,
      config: {
        // Gemini takes systemInstruction rather than a role:"system" message,
        // so this is not a drop-in port of the DeepSeek payload.
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: 700,
        temperature: 0.6,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      console.error('[chat] empty completion');
      return json({ reply: FALLBACK }, 200);
    }

    return json({ reply }, 200);
  } catch (error) {
    // chat.php:241 echoed the raw upstream body to the client in a `details`
    // field, leaking provider error payloads. Log server-side, return generic.
    console.error('[chat] generation failed', error);
    return json({ reply: FALLBACK }, 200);
  }
}

export async function GET() {
  return json({ error: 'Method not allowed' }, 405);
}
