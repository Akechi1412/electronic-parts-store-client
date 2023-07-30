import { axiosClient } from '@/api-client';
import { LoginPayload, forgotPasswordPayload, resetPasswordPayload } from '@/models';

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/users/login', payload);
  },
  logout() {
    return axiosClient.post('/users/logout');
  },
  getProfile() {
    return axiosClient.get('/users/profile');
  },
  forgotPassword(payload: forgotPasswordPayload) {
    return axiosClient.post('/users/forgot-password', payload);
  },
  resetPassword(payload: resetPasswordPayload, token: string) {
    return axiosClient.post('/users/reset-password', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
