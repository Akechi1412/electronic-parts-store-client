export interface LoginPayload {
  role: 'admin' | 'user';
  email?: string;
  username?: string;
  password: string;
}

export interface forgotPasswordPayload {
  email?: string;
  role: 'admin' | 'user';
}

export interface resetPasswordPayload {
  password: string;
}
