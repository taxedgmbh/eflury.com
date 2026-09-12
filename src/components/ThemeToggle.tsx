'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Light/dark switch, ported from DarkModeToggle.astro.
 *
 * The palette and the anti-FOUC restore script both survived the migration, so
 * a returning visitor kept whatever they had chosen on the Astro site — but
 * nothing could set the attribute any more, leaving new visitors with only
 * their OS preference and no way to override it.
 *
 * Same localStorage key as before, so the stored choice carries across.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem('theme');
      } catch {
        return null;
      }
    })();
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // private browsing; the choice simply does not persist
    }
  }

  // Render nothing until mounted: the server cannot know the stored preference,
  // and guessing produces a flash of the wrong icon on every load.
  if (theme === null) {
    return <span className="inline-block h-11 w-11" aria-hidden />;
  }

  const toDark = theme === 'light';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      title={toDark ? 'Dunkles Design' : 'Helles Design'}
      className="tap-square rounded-full border border-[var(--rule)] text-[var(--text-muted)] hover:border-[var(--rule-strong)] hover:text-[var(--text)]"
    >
      {toDark ? (
        <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      )}
      <span className="sr-only">
        {toDark ? 'Auf dunkles Design umschalten' : 'Auf helles Design umschalten'}
      </span>
    </button>
  );
}
