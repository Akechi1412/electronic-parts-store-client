import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProps } from '@/models';
import { Loading } from '@/components/common';

export function Auth({ children, isAdminPage }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.username) {
      if (isAdminPage) {
        router.push('/admin/login');
      } else {
        router.push('/login');
      }
    }
  }, [isAdminPage, router, profile, firstLoading]);

  if (!profile?.username) {
    return <Loading className="w-screen h-screen"></Loading>;
  }

  return <div>{children}</div>;
}
