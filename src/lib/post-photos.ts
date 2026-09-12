import type { Post } from './content';
import { PHOTO_CREDITS, type PhotoCredit } from './photos';

/**
 * Which photograph a blog post shows.
 *
 * Derived from tags rather than stored per post. Seventeen posts carry 48 tags
 * between them and the set keeps growing; a `heroPhoto` in each frontmatter
 * block would be seventeen edits now and one more per post forever, and the
 * first one someone forgot would render an empty card.
 *
 * Order matters — the first rule whose tag appears on the post wins, so the
 * specific tags come before the broad ones. "Schweizer KMU" is on ten of the
 * seventeen and says nothing about subject, so it is not a rule at all.
 */
const RULES: { tags: string[]; photo: string }[] = [
  { tags: ['Datenqualität', 'Stammdaten'], photo: 'card-catalogue' },
  { tags: ['Treuhand'], photo: 'genoa-ledger' },
  { tags: ['Power BI', 'Business Intelligence', 'Reporting'], photo: 'chart-recorders' },
  { tags: ['Kreditorenbuchhaltung', 'Buchhaltung'], photo: 'invoice-sorting' },
  { tags: ['Finanzen', 'Finanzautomatisierung'], photo: 'ledger-book' },
  {
    tags: ['Compliance', 'Sicherheit', 'Zero Trust', 'Schatten-KI', 'Datenschutz'],
    photo: 'switching-station',
  },
  { tags: ['WhatsApp Business', 'Voice KI', 'Kundenkommunikation'], photo: 'sorting-office' },
  { tags: ['KI-Agenten', 'Agentic AI', 'AI Agents', 'MCP'], photo: 'engine-room' },
  { tags: ['Technologievergleich', 'RPA'], photo: 'micrometer' },
  { tags: ['KI', 'Claude AI', 'KI-Automatisierung'], photo: 'lathe-workshop' },
  { tags: ['Automatisierung', 'Automation', 'Geschäftsprozesse'], photo: 'facade-bays' },
];

/**
 * Posts whose tags match no rule; a machine shop is the general case.
 *
 * Nothing reaches it today. Two posts did until their tags were added above —
 * they used English variants ("Agentic AI", "Automation", "Claude AI") of tags
 * the rules already covered in German, which is the failure mode to watch for
 * when a post is added.
 */
const FALLBACK = 'machine-shop';

export function photoIdForPost(post: Pick<Post, 'tags'>): string {
  for (const rule of RULES) {
    if (rule.tags.some((tag) => post.tags.includes(tag))) return rule.photo;
  }
  return FALLBACK;
}

export function photoForPost(post: Pick<Post, 'tags'>): PhotoCredit {
  const id = photoIdForPost(post);
  const found = PHOTO_CREDITS.find((p) => p.id === id);
  // The generated credits are the source of truth for what exists on disk, so a
  // rule naming a photo that was never fetched must fail loudly at build time.
  if (!found) throw new Error(`post-photos.ts maps to unknown photo "${id}"`);
  return found;
}
