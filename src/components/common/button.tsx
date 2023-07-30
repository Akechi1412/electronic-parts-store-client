import Link from 'next/link';
import { ButtonPureProps, ButtonProps } from '@/models';

export function ButtonPure({ title, onClick, className, secondary }: ButtonPureProps) {
  className += ` h-[30px] min-w-min text-center rounded-md`;
  className += secondary ? ' text-shark bg-malibu' : ' text-white bg-blue-ribbon';

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
