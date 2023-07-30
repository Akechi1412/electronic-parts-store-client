import { LayoutProps } from '@/models/common';

export function FormLayout({ children }: LayoutProps) {
  return (
    <div className="w-[700px] h-[400px] bg-white rounded-xl p-[30px] shadow-lg">{children}</div>
  );
}
