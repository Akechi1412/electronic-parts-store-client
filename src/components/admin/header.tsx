import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '../common/search-bar';

export function Header() {
  const router = useRouter();
  const { profile, error, logout } = useAuth();
  const [dropdownExpand, setDropdownExpand] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const expandIconRef = useRef<HTMLImageElement>(null);

  function handleDropdownClick() {
    setDropdownExpand((prev) => !prev);
  }

  function handleWindowClick(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !expandIconRef.current?.contains(event.target as Node)
    ) {
      setDropdownExpand(false);
    }
  }

  async function handleLogoutClick() {
    try {
      await logout();
      router.push('/admin/login');
    } catch {
      console.log('failed to logout');
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] shadow-lg z-10 bg-white">
      <div className="mx-auto container h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" rel="preload">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-[60px] aspect-square"
              priority
              placeholder="blur"
              blurDataURL={'/logo.svg'}
            />
          </Link>
          <SearchBar className="w-[540px]" />
          <div className="flex items-center gap-x-4 relative">
            <Image
              alt="notification"
              src="/icons/Bell_light.svg"
              width={32}
              height={32}
              className="h-[32px] cursor-pointer"
            />
            <div className="flex items-center gap-x-2">
              <Image
                alt="Profile"
                src={profile?.avatar || '/users/default.png'}
                width={32}
                height={32}
                className="h-[32px]"
              />
              <span>{error ? 'underfined' : profile?.username}</span>
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
                className="absolute top-full right-0 w-full transform translate-y-8 rounded-md shadow-md border border-ghost bg-white"
              >
                <ul className="overflow-hidden">
                  <li className="">
                    <Link
                      className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                      href="/admin/profile"
                    >
                      <Image
                        className="mr-3 w-5 h-5 object-cover"
                        src="/icons/user.png"
                        alt=""
                        width={30}
                        height={30}
                      />
                      <span> Profile</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      className="flex items-center border-b border-ghost px-3 py-3 hover:bg-malibu-50"
                      href="/admin/settings"
                    >
                      <Image
                        className="mr-3 w-5 h-5 object-cover"
                        src="/icons/settings.png"
                        alt=""
                        width={30}
                        height={30}
                      />
                      <span>Cài đặt</span>
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
          </div>
        </div>
      </div>
    </header>
  );
}
