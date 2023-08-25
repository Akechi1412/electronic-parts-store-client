import { EmptyLayout, FormLayout } from '@/components/layout';
import { Input, Button, Loading } from '@/components/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { useState, useEffect, ChangeEvent } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleLoginClick() {
    if (username.trim() === '' || password.trim() === '') {
      if (username.trim() === '') {
        setEmptyUsername(true);
      }
      if (password.trim() === '') {
        setEmptyPassword(true);
      }
      return;
    }
    try {
      setErrorText('');
      setLoading(true);
      setEmptyUsername(false);
      setEmptyPassword(false);
      await login({ username, password, role: 'admin' });
    } catch (error: any) {
      console.log('failed to login', error);
      const status = error.response?.status || 500;
      if (status === 401) {
        setErrorText('Tên đăng nhập hoặc mật khẩu không đúng');
      } else if (status === 403) {
        setErrorText('Truy cập bị từ chối');
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
    if (profile?.username && profile?.admin) {
      setLoading(true);
      if (profile?.email) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/dashboard?emailMissing=true');
      }
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
  }, [username, password]);
  return (
    <EmptyLayout className="bg-light-gray w-full h-screen flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl text-center mb-16">Đăng nhập để tiếp tục</h2>
        <div id="admin-login-form" className="flex flex-col items-center">
          {loading ? (
            <Loading className="mt-14"></Loading>
          ) : (
            <div className="flex flex-col items-center">
              <Input
                className={(emptyUsername ? 'border-danger' : 'border-shark-70') + ' mb-[30px]'}
                onChange={handleUsernameChange}
                onBlur={() => setEmptyUsername(false)}
                type="text"
                value={username}
                placeholder="Tên đăng nhập"
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
    </EmptyLayout>
  );
}
