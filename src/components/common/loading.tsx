import { LoadingProps } from '@/models';

export function Loading({ className }: LoadingProps) {
  return (
    <div className={`${className || ''} flex justify-center items-center`}>
      <div className="border-8 border-ghost border-t-blue-ribbon rounded-full w-[60px] h-[60px] animate-spin"></div>
    </div>
  );
}
