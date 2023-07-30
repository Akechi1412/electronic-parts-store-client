import { InputProps } from '@/models';
import Image from 'next/image';

export function Input({
  type,
  hasEye,
  value,
  placeholder,
  className,
  onChange,
  onBlur,
  onClickEye,
}: InputProps) {
  if (!className) className = '';
  className += ` block border w-[350px] h-[40px] rounded-lg px-3 outline-none focus:border-blue-ribbon`;
  if (hasEye) {
    className += ' pr-8';
  }

  return (
    <div className="relative">
      <input
        onBlur={onBlur}
        type={type}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Image
        className={hasEye ? 'absolute right-2 top-[10px] cursor-pointer' : 'hidden'}
        width={20}
        height={20}
        src={type === 'password' ? '/icons/hide.png' : '/icons/view.png'}
        alt={type === 'password' ? 'hide' : 'view'}
        onClick={onClickEye}
      />
    </div>
  );
}
