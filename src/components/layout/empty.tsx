import { LayoutProps } from '@/models';

export function EmptyLayout({ children, className }: LayoutProps) {
  return <div className={className}>{children}</div>;
}
