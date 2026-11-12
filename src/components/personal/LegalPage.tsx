import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';

/** Shell for the imprint and privacy pages: the homepage header and footer around plain text. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <PersonalHeader />
      <main id="main-content" className="band legal">
        <div className="wrap narrow">
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {updated}</p>
          {children}
        </div>
      </main>
      <PersonalFooter />
    </div>
  );
}
