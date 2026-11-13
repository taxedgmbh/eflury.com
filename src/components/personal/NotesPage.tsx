import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { pick, type Lang, type LangMap } from '@/lib/i18n';

/** Shell for Notes and newsletter pages: the homepage header and footer around a reading column. */
export function NotesPage({
  lang = 'en',
  alts,
  children,
}: {
  lang?: Lang;
  alts?: Partial<LangMap>;
  children: React.ReactNode;
}) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} alts={alts} />
      <main id="main-content" className="band nt">
        <div className="wrap narrow">{children}</div>
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
