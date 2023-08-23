import { LayoutProps } from '@/models';
import { Header } from '@/components/common';

export function MainLayout({ children, className }: LayoutProps) {
  return (
    <div id="root" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
