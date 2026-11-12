'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

/** Copies a bio to the clipboard; the label confirms for two seconds. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="pr-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 2000);
        } catch {
          /* clipboard blocked: the text is on the page to select by hand */
        }
      }}
    >
      {done ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">{done ? 'Copied' : label}</span>
    </button>
  );
}
