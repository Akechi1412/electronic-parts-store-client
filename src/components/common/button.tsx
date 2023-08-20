import Link from 'next/link';
import { ButtonPureProps, ButtonProps, AddButtonProps } from '@/models';
import Image from 'next/image';

export function ButtonPure({ title, onClick, className, secondary }: ButtonPureProps) {
  className += ` h-[30px] min-w-min text-center rounded-md`;
  className += secondary ? ' text-shark bg-malibu' : ' text-white bg-blue-ribbon hover:opacity-80';

  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export function Button({ title, href, onClick, className, secondary }: ButtonProps) {
  if (!href) {
    return (
      <ButtonPure className={className} onClick={onClick} title={title} secondary={secondary} />
    );
  }
  return (
    <Link className={`block ${className}`} href={href}>
      <ButtonPure className="w-full" onClick={onClick} title={title} secondary />
    </Link>
  );
}

export function AddButton({ title, href, onClick, className }: AddButtonProps) {
  className += ' bg-blue-ribbon text-white px-[10px] py-2 rounded-[6px] hover:opacity-80';
  if (!href) {
    return (
      <button className={`rounded-[6px] flex gap-x-1 items-center ${className}`} onClick={onClick}>
        <Image alt="add" src="/icons/Add_ring_light.svg" width={24} height={24} />
        <span>{title}</span>
      </button>
    );
  }
  return (
    <Link className={className} href={href || '/'}>
      <button className="rounded-[6px] w-ful h-full flex gap-x-1 items-center" onClick={onClick}>
        <Image alt="add" src="/icons/Add_ring_light.svg" width={24} height={24} />
        <span>{title}</span>
      </button>
    </Link>
  );
}
