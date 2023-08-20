import { authApi } from '@/api-client';
import { LoginPayload, ProfilePayload } from '@/models';
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

  async function updateProfile({
    username,
    fullname,
    phone,
    email,
    avatar,
    password,
  }: ProfilePayload) {
    await authApi.updateProfile({ username, fullname, phone, email, avatar, password });
    await mutate();
  }

  return {
    profile,
    firstLoading,
    error,
    updateProfile,
    login,
    logout,
  };
}
