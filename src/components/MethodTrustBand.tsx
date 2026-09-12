import Link from 'next/link';
import { Route, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, IconTile } from './ui';

/**
 * Ported from MethodTrustBand.astro: a two-card band linking the method and the
 * security disclosure.
 *
 * It exists because those two pages answer the questions a cautious Swiss SME
 * asks before a first call — how does this run, and what happens to my data —
 * and neither is reachable from a service page otherwise.
 */
export function MethodTrustBand() {
  const items = [
    {
      icon: Route,
      title: 'Die eFlury-Methode',
      body: 'Fünf Phasen mit einem Entscheid nach jeder. Kein Projekt beginnt, bevor die Zahlen dafür sprechen.',
      href: '/de/methode/',
      cta: 'Methode ansehen',
    },
    {
      icon: ShieldCheck,
      title: 'Sicherheit & Vertrauen',
      body: 'Lesezugriff statt Kopien, menschliche Freigabe für jede Änderung, jeder eingesetzte Dienst offengelegt.',
      href: '/de/sicherheit/',
      cta: 'Offenlegung lesen',
    },
  ];

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.href}>
          <Card className="flex h-full flex-col">
            <span className="inline-flex">
              <IconTile icon={i.icon} />
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight">{i.title}</h3>
            <p className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{i.body}</p>
            <p className="mt-auto pt-5">
              <Link
                href={i.href}
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline"
              >
                {i.cta}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
