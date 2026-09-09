import 'server-only';
import { getApps, initializeApp, applicationDefault, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { serverEnv } from './env';

/**
 * Firestore via the Admin SDK, authenticated with Application Default
 * Credentials — the App Hosting service account. Access rules are irrelevant
 * here because the Admin SDK bypasses them; client access is denied outright in
 * firestore.rules, and every write goes through a route handler.
 */

let app: App | undefined;

function getApp(): App {
  if (app) return app;
  const existing = getApps();
  app = existing.length
    ? existing[0]
    : initializeApp({ credential: applicationDefault(), projectId: serverEnv.projectId });
  return app;
}

let db: Firestore | undefined;

export function firestore(): Firestore {
  if (!db) {
    db = getFirestore(getApp());
    // Undefined fields would otherwise throw on write; optional form fields are
    // routinely absent.
    db.settings({ ignoreUndefinedProperties: true });
  }
  return db;
}

export const COLLECTIONS = {
  contact: 'contact_submissions',
  newsletter: 'newsletter_subscribers',
  leadRequests: 'lead_requests',
  applications: 'job_applications',
  acceptances: 'offer_acceptances',
  rateLimit: 'ratelimit',
} as const;
