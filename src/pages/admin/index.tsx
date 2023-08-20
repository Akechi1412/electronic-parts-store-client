import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/dashboard');
  }, [router]);

  return <div></div>;
}
