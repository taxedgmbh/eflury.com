import Link from 'next/link';

export const metadata = { title: 'Seite nicht gefunden', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-5 py-24">
      <p className="text-sm font-medium text-[var(--accent)]">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Diese Seite gibt es nicht.</h1>
      <p className="mt-3 text-[var(--text-muted)]">
        Möglicherweise wurde sie verschoben oder der Link ist veraltet.
      </p>
      <p className="mt-8">
        <Link href="/de/" className="text-[var(--accent)] hover:underline">
          Zurück zur Startseite
        </Link>
      </p>
    </div>
  );
}
