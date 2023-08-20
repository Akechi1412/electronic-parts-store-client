import { SideItemProps } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

export function SideItem({
  title,
  iconSrc,
  activeIconSrc,
  isActive,
  isExpanded,
  href,
  onClick,
}: SideItemProps) {
  let className = 'px-3 h-[30px] rounded-[10px] flex items-center justify-start cursor-pointer';
  className += isActive
    ? ' bg-blue-ribbon text-white'
    : ' bg-white text-shark-80 hover:bg-[#e4e4e4]';

  return (
    <>
      {href ? (
        <Link href={href} className={className}>
          <Image alt={title} src={isActive ? activeIconSrc : iconSrc} width={24} height={24} />
          {isExpanded && <span className="ml-2">{title}</span>}
        </Link>
      ) : (
        <div onClick={onClick} className={className}>
          <Image alt={title} src={isActive ? activeIconSrc : iconSrc} width={24} height={24} />
          {isExpanded && <span className="ml-2">{title}</span>}
        </div>
      )}
    </>
  );
}
