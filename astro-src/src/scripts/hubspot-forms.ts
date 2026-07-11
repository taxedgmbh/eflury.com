/**
 * HubSpot form submissions for the static site.
 *
 * Uses the unauthenticated Forms v3 submission endpoint (CORS-enabled by
 * design): no HubSpot scripts, no cookies, nothing loaded from HubSpot on
 * our pages — the browser POSTs the field values and HubSpot creates or
 * updates the contact in the eFlury portal (EU data centre, hence the
 * eu1 API host).
 */

const PORTAL_ID = '148876247';
const API_BASE = 'https://api-eu1.hsforms.com/submissions/v3/integration/submit';

export const HUBSPOT_FORMS = {
  /** "eflury Website Contact": firstname, email, message */
  contact: '964cc7b9-969c-4007-ae49-232ad1117b8c',
  /** "eflury Newsletter": email */
  newsletter: 'c8ebb933-74ed-4b10-a4d8-d4f1c9786892',
} as const;

export async function submitHubSpotForm(
  formGuid: string,
  fields: Record<string, string>,
  pageName?: string,
): Promise<void> {
  const res = await fetch(`${API_BASE}/${PORTAL_ID}/${formGuid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: Object.entries(fields).map(([name, value]) => ({
        objectTypeId: '0-1',
        name,
        value,
      })),
      context: {
        pageUri: window.location.href,
        pageName: pageName ?? document.title,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HubSpot form submission failed (${res.status}): ${body.slice(0, 200)}`);
  }
}
