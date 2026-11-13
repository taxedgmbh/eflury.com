import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { pick, type Lang, type LangMap } from '@/lib/i18n';

/** Shell for the imprint, privacy and terms pages: the homepage header and footer around plain text. */
export function LegalPage({
  title,
  updated,
  lang = 'en',
  alts,
  children,
}: {
  title: string;
  updated: string;
  lang?: Lang;
  /** The same page in each language. */
  alts?: Partial<LangMap>;
  children: React.ReactNode;
}) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} alts={alts} />
      <main id="main-content" className="band legal">
        <div className="wrap narrow">
          <h1>{title}</h1>
          <p className="legal-updated">
            {pick(lang, 'Last updated', 'Stand')}: {updated}
          </p>
          {children}
        </div>
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
