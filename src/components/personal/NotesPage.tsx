import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { pick, type Lang } from '@/lib/i18n';

/** Shell for Notes and newsletter pages: the homepage header and footer around a reading column. */
export function NotesPage({ lang = 'en', alt, children }: { lang?: Lang; alt?: string; children: React.ReactNode }) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} alt={alt} />
      <main id="main-content" className="band nt">
        <div className="wrap narrow">{children}</div>
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
