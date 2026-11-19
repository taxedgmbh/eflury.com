import { llmsTxt } from '@/lib/llms';

// Built once per deploy: the facts and the notes only change with a commit.
export const dynamic = 'force-static';

/** https://eflury.com/llms.txt */
export function GET() {
  return llmsTxt();
}
