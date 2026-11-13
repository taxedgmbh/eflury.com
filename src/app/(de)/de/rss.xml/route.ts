import { rssResponse } from '@/lib/rss';

// Built once per deploy: notes only change with a commit.
export const dynamic = 'force-static';

/** German notes: https://eflury.com/de/rss.xml */
export function GET() {
  return rssResponse('de');
}
