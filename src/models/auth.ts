import { ReactNode } from 'react';

export interface LoginPayload {
  role: 'admin' | 'user';
  email?: string;
  username?: string;
  password: string;
}

export interface ProfilePayload {
  username?: string;
  fullname?: string;
  password?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface forgotPasswordPayload {
  email?: string;
  role: 'admin' | 'user';
}

export interface resetPasswordPayload {
  password: string;
}

export interface AuthProps {
  children: ReactNode;
  isAdminPage: boolean;
}
