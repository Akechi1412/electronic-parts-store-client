import { LayoutProps } from '@/models';
import Image from 'next/image';
import { Footer, Header } from '@/components/admin';
import { SideItem } from '@/components/admin';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { logout, error } = useAuth();
  const [sideExpand, setSideExpand] = useState(false);

  const sideItems = [
    {
      title: 'Dashboard',
      iconSrc: '/icons/darhboard_alt.svg',
      activeIconSrc: '/icons/darhboard_alt_active.svg',
      href: '/admin/dashboard',
    },
    {
      title: 'Danh mục',
      iconSrc: '/icons/Structure_light.svg',
      activeIconSrc: '/icons/Structure_light_active.svg',
      href: '/admin/categories',
    },
    {
      title: 'Sản phẩm',
      iconSrc: '/icons/CPU_light.svg',
      activeIconSrc: '/icons/CPU_light_active.svg',
      href: '/admin/products',
    },
    {
      title: 'Thương hiệu',
      iconSrc: '/icons/group_share_light.svg',
      activeIconSrc: '/icons/group_share_light_active.svg',
      href: '/admin/brands',
    },
    {
      title: 'Đơn hàng',
      iconSrc: '/icons/Bag_light.svg',
      activeIconSrc: '/icons/Bag_light.svg',
      href: '/admin/orders',
    },
    {
      title: 'Users',
      iconSrc: '/icons/Group_light.svg',
      activeIconSrc: '/icons/Group_light.svg',
      href: '/admin/users',
    },
    {
      title: 'Tùy chỉnh',
      iconSrc: '/icons/Setting_alt_line_light.svg',
      activeIconSrc: '/icons/Setting_alt_line_light.svg',
      href: '/admin/options',
    },
    {
      title: 'Import',
      iconSrc: '/icons/Arhive_import_light.svg',
      activeIconSrc: '/icons/Arhive_import_light_active.svg',
      href: '/admin/import',
    },
    {
      title: 'Export',
      iconSrc: '/icons/Arhive_export_light.svg',
      activeIconSrc: '/icons/Arhive_export_light_active.svg',
      href: '/admin/export',
    },
    {
      title: 'Đăng xuất',
      iconSrc: '/icons/Sign_out_squre_light.svg',
      activeIconSrc: '/icons/Sign_out_squre_light.svg',
      onClick: handleLogoutClick,
    },
  ];

  async function handleLogoutClick() {
    try {
      await logout();
      router.push('/admin/login');
    } catch {
      console.log('failed to logout');
    }
  }

  function handleExpandClick() {
    setSideExpand((sideExpand) => !sideExpand);
  }

  useEffect(() => {}, [sideExpand]);

  return (
    <div id="admin-root" className="before:block before:h-[80px] min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto flex-1">
        <div className="flex gap-x-9 mt-4 h-full">
          <aside className="h-full">
            <div className="h-full px-[10px] border-r border-ghost flex flex-col gap-y-3">
              <div
                onClick={handleExpandClick}
                className=" self-end px-3 h-[30px] rounded-[10px] bg-malibu flex items-center justify-center cursor-pointer"
              >
                <Image
                  alt="arrow"
                  src={
                    sideExpand ? '/icons/Arrow_alt_left_alt.svg' : '/icons/Arrow_alt_lright_alt.svg'
                  }
                  width={24}
                  height={24}
                />
              </div>
              {sideItems.map((item, index) => (
                <SideItem
                  key={index}
                  title={item.title}
                  href={item.href}
                  iconSrc={item.iconSrc}
                  activeIconSrc={item.activeIconSrc}
                  isExpanded={sideExpand}
                  isActive={router.pathname.includes(item.href as string)}
                  onClick={item.onClick}
                />
              ))}
            </div>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
