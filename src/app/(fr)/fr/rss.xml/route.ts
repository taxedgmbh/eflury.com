import { rssResponse } from '@/lib/rss';

// Built once per deploy: notes only change with a commit.
export const dynamic = 'force-static';

/** French notes: https://eflury.com/fr/rss.xml */
export function GET() {
  return rssResponse('fr');
}
