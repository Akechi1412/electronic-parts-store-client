import { axiosClient } from '@/api-client';
import {
  RegisterPayload,
  LoginPayload,
  ProfilePayload,
  forgotPasswordPayload,
  resetPasswordPayload,
} from '@/models';

export const authApi = {
  register(payload: RegisterPayload) {
    return axiosClient.post('/users/register', payload);
  },
  login(payload: LoginPayload) {
    return axiosClient.post('/users/login', payload);
  },
  logout() {
    return axiosClient.post('/users/logout');
  },
  getProfile() {
    return axiosClient.get('/users/profile');
  },
  updateProfile(payload: ProfilePayload) {
    return axiosClient.patch('/users', payload);
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
  verifyEmail(id: string) {
    return axiosClient.patch(`/users/verify-email/${id}`);
  },
};
