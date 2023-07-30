import { ButtonPure } from '@/components/common';
import { Auth } from '@/components/common';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { profile, logout } = useAuth();

  async function handleLogoutClick() {
    try {
      await logout();
      router.push('/admin/login');
    } catch {
      console.log('failed to logout');
    }
  }

  return (
    <Auth isAdminPage>
      <div>
        <p>{JSON.stringify(profile)}</p>
        <ButtonPure onClick={handleLogoutClick} className="w-[120px]" title="Đăng xuất" />
      </div>
    </Auth>
  );
}
