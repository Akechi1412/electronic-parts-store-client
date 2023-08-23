import { SearchBarProps } from '@/models';
import Image from 'next/image';

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={`flex border border-ghost rounded-full h-[45px] ${className}`}>
      <input
        className="border-none outline-none rounded-s-full flex-1 px-4"
        type="text"
        name="search-products"
        id="search-products"
        placeholder="Tìm kiếm sản phẩm"
      />
      <div className="flex justify-center items-center bg-blue-ribbon h-full aspect-square rounded-full">
        <Image
          alt="search"
          src="/icons/Search-icon.svg"
          width={50}
          height={50}
          className="h-[23px] w-full cursor-pointer"
        />
      </div>
    </div>
  );
}
