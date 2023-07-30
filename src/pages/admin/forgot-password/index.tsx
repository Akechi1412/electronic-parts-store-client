import { EmptyLayout, FormLayout } from '@/components/layout';
import { Input, Button, Loading } from '@/components/common';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { useState, useEffect, ChangeEvent } from 'react';
import { authApi } from '@/api-client';

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const [email, setEmail] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleSubmitClick() {
    const emailTrim: string = email.trim();
    if (emailTrim === '') {
      setEmptyEmail(true);
      return;
    }
    if (!isValidEmail(emailTrim)) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.forgotPassword({ email: emailTrim, role: 'admin' });
      const data: any = response;
      console.log(data);
      setLoading(false);
      if (!data?.success) {
        setError(true);
        return;
      }
      setError(false);
      router.push(`/admin/forgot-password/${emailTrim}`);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  function handleReturnClick() {
    router.push('/admin/login');
  }

  useEffect(() => {
    if (profile?.username) {
      setLoading(true);
      router.push('/admin/dashboard');
    } else {
      setLoading(false);
    }
  }, [router, profile]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmitClick();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <EmptyLayout className="bg-light-gray w-full h-screen flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl text-center mb-6">Bạn quên mật khẩu?</h2>
        <h4 className="font-light text-center w-[370px] mx-auto mb-16">
          Nhập email đã đăng ký cho tài khoản của bạn, chúng tôi sẽ gửi một email để hướng dẫn bạn
          reset mật khẩu
        </h4>
        {loading ? (
          <Loading className="mt-20"></Loading>
        ) : (
          <div id="admin-forgot-password-form" className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <Input
                className={emptyEmail ? 'border-danger' : 'border-shark-70' + ' mb-[30px]'}
                onChange={handleEmailChange}
                onBlur={() => setEmptyEmail(false)}
                type="email"
                value={email}
                placeholder="Email"
              />
              <Button onClick={handleSubmitClick} className="w-full mb-4" title="Xác nhận" />
              <Button
                href="/admin/login"
                secondary
                onClick={handleReturnClick}
                className="w-full"
                title="Trở về đăng nhập"
              />
              {error && <p className="mt-4 text-[13px] text-danger">Email không hợp lệ</p>}
            </div>
          </div>
        )}
      </FormLayout>
    </EmptyLayout>
  );
}
