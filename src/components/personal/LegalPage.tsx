import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { pick, type Lang } from '@/lib/i18n';

/** Shell for the imprint, privacy and terms pages: the homepage header and footer around plain text. */
export function LegalPage({
  title,
  updated,
  lang = 'en',
  alt,
  children,
}: {
  title: string;
  updated: string;
  lang?: Lang;
  /** The same page in the other language. */
  alt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} alt={alt} />
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
