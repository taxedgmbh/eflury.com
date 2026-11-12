import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';

/** Shell for Notes and newsletter pages: the homepage header and footer around a reading column. */
export function NotesPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb">
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <PersonalHeader />
      <main id="main-content" className="band nt">
        <div className="wrap narrow">{children}</div>
      </main>
      <PersonalFooter />
    </div>
  );
}
