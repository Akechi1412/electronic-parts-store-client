import { authApi } from '@/api-client';
import { LoginPayload } from '@/models';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const MILISECONDS_PER_HOUR = 60 * 60 * 1000;
  // Profile
  const { data, error, isValidating, mutate } = useSWR('/users/profile', {
    dedupingInterval: MILISECONDS_PER_HOUR,
    revalidateOnFocus: false,
    ...options,
  });

  const profile = data?.data;
  const firstLoading = profile === undefined && error === undefined;

  async function login({ email, username, password, role }: LoginPayload) {
    await authApi.login({ email, username, password, role });
    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate({}, false);
  }

  return {
    profile,
    firstLoading,
    error,
    login,
    logout,
  };
}
