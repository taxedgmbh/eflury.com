import 'server-only';
import { Resend } from 'resend';
import { serverEnv, isConfigured } from './env';

/**
 * Transactional mail.
 *
 * Not the Firebase Trigger Email extension: the Firebase Extensions service is
 * deprecated and shuts down on 31 March 2027, and building a new dependency on
 * something with an announced end-of-life six months after launch is a poor
 * trade. Firestore still holds the durable record; this only sends.
 *
 * Sending is best-effort by design. A submission that is safely written to
 * Firestore but whose notification bounces is a delayed reply, not a lost lead —
 * which is exactly the failure mode EmailJS had no answer for, since it was
 * fire-and-forget with no record at all.
 */

let client: Resend | undefined;

function resend(): Resend {
  if (!client) client = new Resend(serverEnv.resendApiKey);
  return client;
}

export interface MailInput {
  subject: string;
  text: string;
  replyTo?: string;
  to?: string;
  /** Base64 content, e.g. the accepted terms PDF on an offer receipt. */
  attachments?: { filename: string; content: string }[];
}

export async function sendNotification(input: MailInput): Promise<boolean> {
  if (!isConfigured('RESEND_API_KEY')) {
    console.error('[mail] RESEND_API_KEY not configured; skipping send');
    return false;
  }
  try {
    const { error } = await resend().emails.send({
      from: `eflury.com <${serverEnv.fromEmail}>`,
      to: input.to ?? serverEnv.notifyEmail,
      subject: input.subject,
      text: input.text,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      ...(input.attachments?.length ? { attachments: input.attachments } : {}),
    });
    if (error) {
      console.error('[mail] send rejected', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[mail] send failed', error);
    return false;
  }
}
