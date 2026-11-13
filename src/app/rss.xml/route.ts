import { rssResponse } from '@/lib/rss';

// Built once per deploy: notes only change with a commit.
export const dynamic = 'force-static';

/** English notes: https://eflury.com/rss.xml */
export function GET() {
  return rssResponse('en');
}
