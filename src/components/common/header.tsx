import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SearchBarSmall } from '.';
import { SearchBar } from './search-bar';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownExpand, setDropdownExpand] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownScrolledRef = useRef<HTMLDivElement>(null);
  const expandIconRef = useRef<HTMLImageElement>(null);
  const expandIconScrolledRef = useRef<HTMLImageElement>(null);
  const scrolledRef = useRef(false);

  function handleDropdownClick() {
    setDropdownExpand((prev) => !prev);
  }

  function handleWindowClick(event: MouseEvent) {
    console.log(scrolledRef);
    if (scrolledRef.current) {
      if (
        dropdownScrolledRef.current &&
        !dropdownScrolledRef.current?.contains(event.target as Node) &&
        !expandIconScrolledRef.current?.contains(event.target as Node)
      ) {
        setDropdownExpand(false);
      }
    } else {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node) &&
        !expandIconRef.current?.contains(event.target as Node)
      ) {
        setDropdownExpand(false);
      }
    }
  }

  async function handleLogoutClick() {
    try {
      setDropdownExpand(false);
      await logout();
      router.push('/login');
    } catch {
      console.log('failed to logout');
    }
  }

  useEffect(() => {
    scrolledRef.current = scrolled;
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 40) {
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
              <div className="flex items-center gap-2 relative">
                {profile ? (
                  <>
                    <Image
                      className="w-6 aspect-square object-cover cursor-pointer"
                      src="/icons/Bell_light.svg"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div className="flex items-center gap-2">
                      <Image
                        className="w-[28px] aspect-square object-cover"
                        src={profile?.avatar || '/users/default.png'}
                        alt="Profile"
                        width={100}
                        height={100}
                      />
                      <span>{profile?.username || 'Underfined'}</span>
                      <Image
                        alt="notification"
                        src="/icons/Expand_down_light.svg"
                        width={32}
                        height={32}
                        className="h-[32px] cursor-pointer"
                        onClick={handleDropdownClick}
                        ref={expandIconScrolledRef}
                      />
                    </div>
                    {dropdownExpand && (
                      <div
                        ref={dropdownScrolledRef}
                        className="absolute top-full right-0 w-full transform translate-y-6 rounded-md shadow-md border border-ghost bg-white"
                      >
                        <ul className="overflow-hidden">
                          <li className="">
                            <Link
                              className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                              href="/orders"
                            >
                              <Image
                                className="mr-3 w-5 h-5 object-cover"
                                src="/icons/shopping-bag.png"
                                alt=""
                                width={30}
                                height={30}
                              />
                              <span>Đơn hàng của tôi</span>
                            </Link>
                          </li>
                          <li className="">
                            <Link
                              className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                              href="/settings"
                            >
                              <Image
                                className="mr-3 w-5 h-5 object-cover"
                                src="/icons/settings_v2.png"
                                alt=""
                                width={30}
                                height={30}
                              />
                              <span>Cài đặt thông tin</span>
                            </Link>
                          </li>
                          <li
                            className="flex items-center cursor-pointer px-3 py-3 hover:bg-malibu-50"
                            onClick={handleLogoutClick}
                          >
                            <Image
                              className="mr-3 w-5 h-5 object-cover"
                              src="/icons/logout.png"
                              alt=""
                              width={30}
                              height={30}
                            />
                            <span>Đăng xuất</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Link className="hover:text-blue-ribbon" href="/login">
                      Đăng nhập
                    </Link>
                    <span>|</span>
                    <Link className="hover:text-blue-ribbon" href="/register">
                      Đăng ký
                    </Link>
                  </>
                )}
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
              <div className="h-full flex gap-6 items-center relative">
                {profile ? (
                  <>
                    <Image
                      className="w-6 aspect-square object-cover cursor-pointer"
                      src="/icons/Bell_light.svg"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div className="flex items-center gap-2">
                      <Image
                        className="w-[28px] aspect-square object-cover"
                        src={profile?.avatar || '/users/default.png'}
                        alt="Profile"
                        width={100}
                        height={100}
                      />
                      <span>{profile?.username || 'Underfined'}</span>
                      <Image
                        alt="notification"
                        src="/icons/Expand_down_light.svg"
                        width={32}
                        height={32}
                        className="h-[32px] cursor-pointer"
                        onClick={handleDropdownClick}
                        ref={expandIconRef}
                      />
                    </div>
                    {dropdownExpand && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 top-full right-0 w-full transform translate-y-4 rounded-md shadow-md border border-ghost bg-white"
                      >
                        <ul className="overflow-hidden">
                          <li className="">
                            <Link
                              className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                              href="/orders"
                            >
                              <Image
                                className="mr-3 w-5 h-5 object-cover"
                                src="/icons/shopping-bag.png"
                                alt=""
                                width={30}
                                height={30}
                              />
                              <span>Đơn hàng của tôi</span>
                            </Link>
                          </li>
                          <li className="">
                            <Link
                              className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                              href="/settings"
                            >
                              <Image
                                className="mr-3 w-5 h-5 object-cover"
                                src="/icons/settings_v2.png"
                                alt=""
                                width={30}
                                height={30}
                              />
                              <span>Cài đặt thông tin</span>
                            </Link>
                          </li>
                          <li
                            className="flex items-center cursor-pointer px-3 py-3 hover:bg-malibu-50"
                            onClick={handleLogoutClick}
                          >
                            <Image
                              className="mr-3 w-5 h-5 object-cover"
                              src="/icons/logout.png"
                              alt=""
                              width={30}
                              height={30}
                            />
                            <span>Đăng xuất</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
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
                    <Link
                      href="/register"
                      className="flex items-center gap-1 hover:text-blue-ribbon"
                    >
                      <Image
                        className="w-6 h-6 object-cover"
                        src="/icons/User_add_light.svg"
                        alt="register"
                        width={100}
                        height={100}
                      />
                      <span>Đăng ký</span>
                    </Link>
                  </>
                )}
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
        <div className="h-10 bg-blue-ribbon text-white text-base font-medium">
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
