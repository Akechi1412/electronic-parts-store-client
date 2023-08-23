import { SearchBarSmallProps } from '@/models';
import Image from 'next/image';

export function SearchBarSmall({ className }: SearchBarSmallProps) {
  return (
    <div className={`bg-white flex border border-ghost rounded-full h-9 ${className}`}>
      <input
        className="border-none outline-none flex-1 px-4 rounded-s-full"
        type="text"
        name="search-products-scrolled"
        id="search-products-scrolled"
        placeholder="Tìm kiếm sản phẩm"
      />
      <div className="flex items-center px-3 rounded-e-full hover:bg-ghost-30">
        <Image
          alt="search"
          src="/icons/search-interface-symbol.png"
          width={50}
          height={50}
          className="w-4 h-auto cursor-pointer"
        />
      </div>
    </div>
  );
}
