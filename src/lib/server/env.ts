import 'server-only';

/**
 * Server-side configuration.
 *
 * Every value is read lazily rather than at module load. A route that does not
 * need Resend must still build and deploy when RESEND_API_KEY is absent, which
 * matters during the migration: /api/chat ships before /api/contact does.
 *
 * Note what is *not* here — there is no model API key. Vertex AI authenticates
 * through the App Hosting service account via Application Default Credentials,
 * so there is nothing to store or rotate. That was the deciding argument for
 * Vertex over DeepSeek, more than cost.
 */

export class ConfigError extends Error {
  constructor(name: string) {
    super(`Missing required configuration: ${name}`);
    this.name = 'ConfigError';
  }
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new ConfigError(name);
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

export const serverEnv = {
  /** GCP project. App Hosting injects this; locally it comes from .env.local. */
  get projectId(): string {
    return (
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.GCLOUD_PROJECT ||
      required('GOOGLE_CLOUD_PROJECT')
    );
  },

  /** Zurich. Chosen for Swiss data residency, which the site itself sells. */
  get vertexLocation(): string {
    return optional('VERTEX_LOCATION', 'europe-west6');
  },

  get chatModel(): string {
    return optional('VERTEX_CHAT_MODEL', 'gemini-2.5-flash');
  },

  get turnstileSecret(): string {
    return required('TURNSTILE_SECRET_KEY');
  },

  get resendApiKey(): string {
    return required('RESEND_API_KEY');
  },

  get notifyEmail(): string {
    return optional('NOTIFY_EMAIL', 'me@eflury.com');
  },

  /** Verified sending domain for Resend. */
  get fromEmail(): string {
    return optional('FROM_EMAIL', 'website@eflury.com');
  },

  /** Rotated daily so hashed IPs are not a durable identifier under revDSG. */
  get ipHashSalt(): string {
    return optional('IP_HASH_SALT', 'eflury-rotating-salt');
  },

  get isProduction(): boolean {
    return (process.env.NEXT_PUBLIC_ENV ?? 'production') === 'production';
  },
} as const;

/** True when a capability is configured, so a route can degrade instead of 500. */
export function isConfigured(...names: string[]): boolean {
  return names.every((n) => Boolean(process.env[n]));
}
