import { llmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/** https://eflury.com/llms-full.txt */
export function GET() {
  return llmsFullTxt();
}
