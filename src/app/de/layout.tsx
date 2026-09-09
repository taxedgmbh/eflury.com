import { Header, Footer } from '@/components/SiteChrome';
import { ChatWidget } from '@/components/ChatWidget';

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
