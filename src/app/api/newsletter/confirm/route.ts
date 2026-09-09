import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore, COLLECTIONS } from '@/lib/server/firestore';
import { verifyToken } from '@/lib/server/tokens';
import { SITE_URL } from '@/lib/site';

/**
 * Second half of the newsletter double opt-in. The link is HMAC-signed and
 * expires after seven days, so a confirmation cannot be forged and an old link
 * cannot be replayed indefinitely.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) return NextResponse.redirect(`${SITE_URL}/de/?newsletter=ungueltig`, 303);

  const { valid, payload } = verifyToken(token);
  if (!valid || !payload) {
    return NextResponse.redirect(`${SITE_URL}/de/?newsletter=abgelaufen`, 303);
  }

  try {
    const id = Buffer.from(payload).toString('base64url');
    await firestore()
      .collection(COLLECTIONS.newsletter)
      .doc(id)
      .set({ confirmed: true, confirmedAt: FieldValue.serverTimestamp() }, { merge: true });
  } catch (error) {
    console.error('[newsletter] confirmation failed', error);
    return NextResponse.redirect(`${SITE_URL}/de/?newsletter=fehler`, 303);
  }

  return NextResponse.redirect(`${SITE_URL}/de/?newsletter=bestaetigt`, 303);
}
