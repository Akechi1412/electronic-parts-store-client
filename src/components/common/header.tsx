import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchBarSmall } from '.';
import { SearchBar } from './search-bar';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();
  const { profile, error, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header className={scrolled ? 'before:block before:h-12' : ''}>
      <div
        className={
          'h-12 bg-[#edf3f7] fixed top-0 left-0 w-full shadow' + (!scrolled ? ' hidden' : '')
        }
      >
        <div className="h-full mx-auto container">
          <div className="w-full h-full flex items-center justify-between">
            <div className="h-full flex gap-10 items-center">
              <Link href="/" rel="preload">
                <Image
                  className="w-10 aspect-square object-cover"
                  src="/logo.svg"
                  alt="linhkienPN"
                  width={120}
                  height={120}
                  priority
                  placeholder="blur"
                  blurDataURL={'/logo.svg'}
                />
              </Link>
              <SearchBarSmall className="w-72" />
            </div>
            <div className="h-full flex gap-10 items-center">
              <div className="flex items-center gap-2">
                <Link className="hover:text-blue-ribbon" href="/login">
                  Đăng nhập
                </Link>
                <span>|</span>
                <Link className="hover:text-blue-ribbon" href="/register">
                  Đăng ký
                </Link>
              </div>
              <Link className="flex gap-2 items-center hover:text-blue-ribbon" href="/cart">
                <Image
                  className="w-8 aspect-square object-contain"
                  src="/icons/cart.svg"
                  alt="cart"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-end">
                  <span className="font-light text-[13px]">0 món</span>
                  {/* <span className="font-bold text-malibu">0 đ</span> */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={scrolled ? 'hidden' : ''}>
        <div className="h-[30px] bg-white border-b border-ghost">
          <div className="mx-auto container h-full">
            <div className="h-full w-full flex justify-between items-center">
              <div className="h-full flex gap-6 items-center">
                <div className="flex items-center gap-1">
                  <Image
                    className="w-6 h-6 object-cover"
                    src="/icons/Message_light.svg"
                    alt="mail"
                    width={100}
                    height={100}
                  />
                  <span>linhkienPN@gmail.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    className="w-6 h-6 object-cover"
                    src="/icons/Phone_light.svg"
                    alt="phone"
                    width={100}
                    height={100}
                  />
                  <span>0912784578</span>
                </div>
              </div>
              <div className="h-full flex gap-6 items-center">
                <Link href="/login" className="flex items-center gap-1 hover:text-blue-ribbon">
                  <Image
                    className="w-6 h-6 object-cover"
                    src="/icons/User_light.svg"
                    alt="login"
                    width={100}
                    height={100}
                  />
                  <span>Đăng nhập</span>
                </Link>
                <Link href="/register" className="flex items-center gap-1 hover:text-blue-ribbon">
                  <Image
                    className="w-6 h-6 object-cover"
                    src="/icons/User_add_light.svg"
                    alt="register"
                    width={100}
                    height={100}
                  />
                  <span>Đăng ký</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 bg-white">
          <div className="h-full mx-auto container">
            <div className="h-full flex justify-between items-center">
              <Link href="/" rel="preload">
                <Image
                  className="w-[60px] aspect-square object-cover"
                  src="/logo.svg"
                  alt="linhkienPN"
                  width={120}
                  height={120}
                  priority
                  placeholder="blur"
                  blurDataURL={'/logo.svg'}
                />
              </Link>
              <SearchBar className="w-[540px]" />
              <Link className="flex gap-2 items-center hover:text-blue-ribbon" href="/cart">
                <Image
                  className="w-9 aspect-square object-contain"
                  src="/icons/cart.svg"
                  alt="cart"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-end">
                  <span className="font-light text-[13px]">0 món</span>
                  {/* <span className="font-bold text-malibu">0 đ</span> */}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-10 bg-blue-ribbon text-white text-base font-bold">
          <div className="h-full mx-auto container">
            <div className="h-full flex justify-between items-center">
              <div className="flex gap-1 items-center cursor-pointer">
                <Image
                  className="w-5 h-auto object-contain"
                  src="/icons/toggle.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <span>Sản phẩm</span>
              </div>
              <nav className="h-full">
                <ul className="h-full flex gap-7 items-center">
                  <li className="h-full border-white relative before:absolute before:block before:w-0 before:h-[1px] before:bottom-1 before:left-0 before:bg-white before:hover:w-full before:transition-all">
                    <Link className="block h-full leading-10" href="/">
                      Trang chủ
                    </Link>
                  </li>
                  <li className="h-full border-white relative before:absolute before:block before:w-0 before:h-[1px] before:bottom-1 before:left-0 before:bg-white before:hover:w-full before:transition-all">
                    <Link className="block h-full leading-10" href="/about">
                      Giới thiệu
                    </Link>
                  </li>
                  <li className="h-full border-white relative before:absolute before:block before:w-0 before:h-[1px] before:bottom-1 before:left-0 before:bg-white before:hover:w-full before:transition-all">
                    <Link className="block h-full leading-10" href="/brands">
                      Thương hiệu
                    </Link>
                  </li>
                  <li className="h-full border-white relative before:absolute before:block before:w-0 before:h-[1px] before:bottom-1 before:left-0 before:bg-white before:hover:w-full before:transition-all">
                    <Link className="block h-full leading-10" href="/shopping-guide">
                      Hướng dẫn mua hàng
                    </Link>
                  </li>
                  <li className="h-full border-white relative before:absolute before:block before:w-0 before:h-[1px] before:bottom-1 before:left-0 before:bg-white before:hover:w-full before:transition-all">
                    <Link className="block h-full leading-10" href="/news">
                      Tin tức
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
