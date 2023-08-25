import { MainLayout, FormLayout } from '@/components/layout';
import { Input, Button, Loading } from '@/components/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { useState, useEffect, ChangeEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { login, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleLoginClick() {
    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        setEmptyEmail(true);
      }
      if (password.trim() === '') {
        setEmptyPassword(true);
      }
      return;
    }
    try {
      setErrorText('');
      setLoading(true);
      setEmptyEmail(false);
      setEmptyPassword(false);
      await login({ email, password, role: 'user' });
    } catch (error: any) {
      console.log('failed to login', error);
      const status = error.response?.status || 500;
      if (status === 401) {
        setErrorText('Email hoặc mật khẩu không đúng');
      } else if (status === 400) {
        setErrorText('Email chưa được xác thực');
      } else {
        setErrorText('Đã có lỗi gì đó xảy ra. Vui lòng thử lại');
      }
      setLoading(false);
    }
  }

  function handleClickEye() {
    setShowPassword((showPassword) => !showPassword);
  }

  useEffect(() => {
    if (profile?.email) {
      setLoading(true);
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router, profile]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleLoginClick();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);
  return (
    <div className="bg-[#CCD0D880] min-h-[calc(100vh-150px)] flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl text-center mb-16">Đăng nhập</h2>
        <div id="admin-login-form" className="flex flex-col items-center">
          {loading ? (
            <Loading className="mt-14"></Loading>
          ) : (
            <div className="flex flex-col items-center">
              <Input
                className={(emptyEmail ? 'border-danger' : 'border-shark-70') + ' mb-[30px]'}
                onChange={handleUsernameChange}
                onBlur={() => setEmptyEmail(false)}
                type="email"
                value={email}
                placeholder="Email"
              />
              <Input
                className={(emptyPassword ? 'border-danger' : 'border-shark-70') + ' mb-[30px]'}
                onChange={handlePaswordChange}
                onBlur={() => setEmptyPassword(false)}
                type={showPassword ? 'text' : 'password'}
                hasEye
                value={password}
                placeholder="Mật khẩu"
                onClickEye={handleClickEye}
              />
              <Link
                className="inline-block float-right text-[13px] text-blue-ribbon mb-2 self-end"
                href="/admin/forgot-password"
              >
                Quên mật khẩu?
              </Link>
              <Button onClick={handleLoginClick} className="w-full" title="Xác nhận" />
              <p className="mt-4 text-[13px] text-danger">{errorText}</p>
            </div>
          )}
        </div>
      </FormLayout>
    </div>
  );
}

LoginPage.Layout = MainLayout;
