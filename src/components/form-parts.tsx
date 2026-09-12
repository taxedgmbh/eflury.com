import { PERSON } from '@/lib/site';

/**
 * Shared form chrome, factored out of ContactForm so the application, newsletter
 * and guide-request forms cannot drift from it.
 */

export const field =
  'w-full rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] px-3 py-2.5 text-[0.95rem] text-[var(--text)] outline-none focus-visible:border-[var(--link)]';

export const label = 'block text-sm font-medium';

/**
 * Shown whenever a submission does not get through — a failed security check, a
 * missing secret, a network error.
 *
 * A real enquiry arrived the week this was written: thirty employees, seven
 * admin seats, a full advise-build-run brief. Losing one of those to a 403 the
 * visitor cannot act on is far worse than any spam it would let through, and
 * the form is not the only way to reach him.
 */
export function DirectChannels() {
  return (
    <div className="mt-4 rounded-xl border border-[var(--rule)] bg-[var(--surface-sunken)] p-4 text-sm">
      <p className="font-medium text-[var(--text)]">Sie erreichen Emanuel auch direkt:</p>
      <ul className="mt-2 space-y-1">
        <li>
          <a href={`mailto:${PERSON.email}`} className="text-[var(--link)] hover:underline">
            {PERSON.email}
          </a>
        </li>
        <li>
          <a href={`tel:${PERSON.telephone}`} className="text-[var(--link)] hover:underline">
            {PERSON.telephoneDisplay}
          </a>
        </li>
        <li>
          <a
            href={`https://wa.me/${PERSON.telephone.replace('+', '')}`}
            className="text-[var(--link)] hover:underline"
            rel="noopener"
          >
            WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );
}
