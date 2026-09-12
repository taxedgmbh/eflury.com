import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

/**
 * The shared visual kit, matching the language eflury.com already uses: centred
 * section headings, white cards with a tinted icon tile, teal accents, big stat
 * figures, and pill badges.
 *
 * Built as components rather than repeated utility strings so a change to the
 * card treatment happens once. The earlier rebuild had no cards at all, which is
 * why it read as a different — and thinner — site.
 */

export function SectionHeading({
  title,
  subtitle,
  id,
  align = 'center',
}: {
  title: string;
  subtitle?: string;
  id?: string;
  align?: 'center' | 'start';
}) {
  const centred = align === 'center';
  return (
    <div className={centred ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2
        id={id}
        className="title text-[var(--text)]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="lead mt-4">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--rule)] bg-[var(--surface-raised)] p-6 shadow-[0_1px_2px_rgba(2,37,84,0.04),0_8px_24px_-12px_rgba(2,37,84,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Rounded-square tile holding a teal icon on a tinted ground. */
export function IconTile({ icon: Icon, label }: { icon: LucideIcon; label?: string }) {
  return (
    <span
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
      aria-hidden={label ? undefined : true}
    >
      <Icon className="h-5 w-5 text-[var(--accent-text)]" strokeWidth={1.75} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

export function Pill({ icon: Icon, children }: { icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--text-muted)]">
      {Icon ? (
        <Icon className="h-4 w-4 text-[var(--accent-text)]" strokeWidth={1.75} aria-hidden />
      ) : null}
      {children}
    </span>
  );
}

/**
 * Figures are rendered from a string, not a number, so "13+" and "100%" keep
 * their qualifier. Every one of these is an estimate elsewhere on the site and
 * is labelled as such where the claim is made.
 */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-[2.25rem] leading-none font-bold tracking-tight text-[var(--accent-text)]">
        {value}
      </p>
      <p className="mt-2 text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">{label}</p>
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
};

export function Button({ href, children, variant = 'primary', external }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-6 py-3 text-[0.95rem] font-semibold transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-[var(--accent-text)] text-white hover:bg-[color-mix(in_srgb,var(--accent-text)_88%,black)]'
      : 'border border-[var(--rule-strong)] text-[var(--text)] hover:bg-[var(--surface-raised)]';

  if (external) {
    return (
      <a href={href} className={`${base} ${styles}`} rel="noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function Section({
  children,
  className = '',
  labelledBy,
  tone = 'plain',
}: {
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  tone?: 'plain' | 'sunken';
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`${tone === 'sunken' ? 'bg-[var(--surface-sunken)]' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">{children}</div>
    </section>
  );
}
