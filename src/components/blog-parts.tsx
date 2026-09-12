import Link from 'next/link';
import Image from 'next/image';
import { PERSON } from '@/lib/site';
import { tagSlug, formatDate, type Post } from '@/lib/content';
import { Card } from './ui';
import { PhotoThumb } from './PhotoThumb';
import { photoIdForPost } from '@/lib/post-photos';

/**
 * Author block on a post, ported from AuthorBio.astro.
 *
 * This is an E-E-A-T signal as much as a design element: a named author with
 * verifiable credentials and a link to a fuller profile. The new post page had
 * reduced it to the author's name as a plain string.
 *
 * The credentials are carried over from the Astro component verbatim, except
 * "50+ Claude Skills entwickelt", which is dropped — nothing on the site
 * substantiates it and the security page makes a point of not claiming what
 * cannot be checked.
 */
export function AuthorBio() {
  return (
    <Card className="mt-16">
      <p className="text-xs font-semibold tracking-[0.08em] text-[var(--accent-text)] uppercase">
        Geschrieben von
      </p>
      <div className="mt-4 flex flex-wrap items-start gap-5">
        <Image
          src="/images/portraits/emanuel-aaron-flury-portrait.webp"
          alt=""
          width={72}
          height={72}
          className="rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold tracking-tight">{PERSON.name}</p>
          <p className="mt-0.5 text-sm text-[var(--text-muted)]">
            Unternehmer, Grenchen — Automatisierung für Schweizer KMU
          </p>
          <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
            13 Jahre Automatisierungserfahrung aus einem grossen internationalen
            Konzern. Gründer der Taxed GmbH, wo die Automatisierungen zuerst
            laufen, bevor er sie anderen empfiehlt.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[var(--text-faint)]">
            <li>13+ Jahre Konzernerfahrung</li>
            <li>UiPath-RPA-zertifiziert</li>
            <li>MA Economics-Finance, Aberdeen</li>
          </ul>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/de/about/" className="font-semibold text-[var(--link)] hover:underline">
              Mehr über Emanuel
            </Link>
            <Link href="/de/kontakt/" className="font-semibold text-[var(--link)] hover:underline">
              Kontakt aufnehmen
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Related posts, ported from RelatedPosts.astro: ranked by how many tags they
 * share with the current post, newest first as the tie-break. Falls back to the
 * most recent posts when nothing overlaps, so the block is never empty.
 */
export function RelatedPosts({ current, all }: { current: Post; all: Post[] }) {
  const others = all.filter((p) => p.slug !== current.slug);
  const ranked = others
    .map((p) => ({ post: p, shared: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.post.pubDate.getTime() - a.post.pubDate.getTime())
    .slice(0, 3)
    .map((r) => r.post);

  if (ranked.length === 0) return null;

  return (
    <section aria-labelledby="weiterlesen" className="mt-16">
      <h2 id="weiterlesen" className="text-xl font-bold tracking-tight">
        Weiterlesen
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-3">
        {ranked.map((p) => (
          <li key={p.slug}>
            <Link href={`/de/blog/${p.slug}/`} className="block h-full">
              <Card className="flex h-full flex-col transition-colors hover:border-[var(--rule-strong)]">
                <PhotoThumb id={photoIdForPost(p)} variant="card" className="mb-4" />
                <p className="text-xs tracking-[0.06em] text-[var(--text-faint)] uppercase">
                  <time dateTime={p.pubDate.toISOString()}>{formatDate(p.pubDate)}</time>
                </p>
                <p className="mt-3 leading-snug font-bold tracking-tight">{p.title}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Visible breadcrumb trail; the JSON-LD counterpart lives in schema.ts. */
export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 text-[var(--text-muted)]">
        {trail.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden className="text-[var(--text-faint)]">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="tap hover:text-[var(--text)]">
                {item.name}
              </Link>
            ) : (
              <span className="text-[var(--text-faint)]">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Tags as links to their archive — they were inert text. */
export function TagLinks({ tags }: { tags: readonly string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="rail mt-16 border-t border-[var(--rule)] pt-6">
      <h2 className="rail-label">Themen</h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t}>
            <Link
              href={`/de/blog/tag/${tagSlug(t)}/`}
              className="tap rounded-full border border-[var(--rule)] px-4 text-sm text-[var(--text-muted)] hover:border-[var(--rule-strong)] hover:text-[var(--text)]"
            >
              {t}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
