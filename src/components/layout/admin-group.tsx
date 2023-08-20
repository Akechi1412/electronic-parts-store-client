import { LayoutProps, ToggleLayoutProps } from '@/models';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';

export function AdminGroupLayout({ children, className }: LayoutProps) {
  return (
    <div className={`bg-[#f4f4f4] rounded border border-ghost p-6 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function AdminGroupLayoutToggle({ children, className, title }: ToggleLayoutProps) {
  const [iconSrc, setIconSrc] = useState('/icons/Expand_right_blue.svg');
  const [expand, setExpand] = useState(false);

  function handleToggleExpanding() {
    if (expand) {
      setIconSrc('/icons/Expand_right_blue.svg');
      setExpand(false);
    } else {
      setIconSrc('/icons/Expand_down_blue.svg');
      setExpand(true);
    }
  }

  return (
    <AdminGroupLayout className={className}>
      <>
        <div className="flex justify-between items-center">
          <h3 className="capitalize font-medium text-base">{title}</h3>
          <Image
            src={iconSrc}
            alt="expand-right"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleToggleExpanding}
          />
        </div>
        <div className={expand ? 'transition-all' : 'h-0 transition-all overflow-hidden'}>
          {children}
        </div>
      </>
    </AdminGroupLayout>
  );
}
