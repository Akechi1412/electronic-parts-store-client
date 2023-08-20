import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProps } from '@/models';
import { Loading } from '@/components/common';

export function Auth({ children, isAdminPage }: AuthProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    let isAuthorized = true;
    if (isAdminPage && !profile?.admin) {
      isAuthorized = false;
    }
    if (!firstLoading && !profile?.username && !isAuthorized) {
      if (isAdminPage) {
        router.push('/admin/login');
      } else {
        router.push('/login');
      }
    }
  }, [isAdminPage, router, profile, firstLoading]);

  if (!profile?.username) {
    return <Loading className="fixed left-0 top-0 z-40 w-screen h-screen" />;
  }

  return <div>{children}</div>;
}
