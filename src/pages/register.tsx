import { MainLayout, FormLayout } from '@/components/layout';
import { useState, useEffect } from 'react';
import { Input, Button } from '@/components/common';
import Image from 'next/image';
import Link from 'next/link';
import { Loading } from '@/components/common';
import { ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { authApi } from '@/api-client';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';

export default function RegisterPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyRePassword, setEmptyRePassword] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('');
  const [errorPasswordText, setErrorPasswordText] = useState('');
  const [errorRePasswordText, setErrorRePasswordText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleClickEyePass() {
    setShowPassword((showPassword) => !showPassword);
  }

  function handleRePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setRePassword(event.target.value);
  }

  function handleClickEyeRePass() {
    setShowRePassword((rePassword) => !rePassword);
  }

  function verifyEmail() {
    const check = /\S+@\S+\.\S+/.test(email);
    if (check || email.trim().length === 0) {
      setErrorEmailText('');
    } else {
      setErrorEmailText('Email không hợp lệ');
    }
  }

  function verifyPassword() {
    if (password.length === 0) {
      setErrorPasswordText('');
      return;
    }
    if (password.length < 8) {
      setErrorPasswordText('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorPasswordText('Mật khẩu phải có ít nhất một chữ thường');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorPasswordText('Mật khẩu phải có ít nhất một chữ hoa');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setErrorPasswordText('Mật khẩu phải có ít nhất một số');
      return;
    }
    setErrorPasswordText('');
  }

  function verifyRePassword() {
    if (rePassword.length === 0) {
      setErrorRePasswordText('');
      return;
    }
    if (password !== rePassword) {
      setErrorRePasswordText('Mật khẩu không khớp');
      return;
    }

    setErrorRePasswordText('');
  }

  const verifyEmailDebounce = debounce(verifyEmail, 1000);
  const verifyPasswordDebounce = debounce(verifyPassword, 500);
  const verifyRePasswordDebounce = debounce(verifyRePassword, 500);

  async function handleSubmitClick() {
    if (email.trim() === '' || password.trim() === '' || rePassword.trim() === '') {
      if (email.trim() === '') {
        setEmptyEmail(true);
      }
      if (password.trim() === '') {
        setEmptyPassword(true);
      }
      if (rePassword.trim() === '') {
        setEmptyRePassword(true);
      }
      return;
    }

    if (errorEmailText !== '' || errorPasswordText !== '' || errorRePasswordText !== '') {
      return;
    }

    setLoading(true);
    setErrorText('');
    setSuccess(false);
    try {
      await authApi.register({ email, password });
      setSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrorText(errorMessage || 'Đã có lỗi xảy ra. Hãy thử lại.');
    }
    setLoading(false);
  }

  useEffect(() => {
    verifyPasswordDebounce();
    verifyRePasswordDebounce();
    return () => {
      verifyPasswordDebounce.cancel();
      verifyRePasswordDebounce.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, rePassword]);

  useEffect(() => {
    verifyEmailDebounce();
    return verifyEmailDebounce.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

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
        handleSubmitClick();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rePassword, password]);

  return (
    <div className="bg-[#CCD0D880] min-h-[calc(100vh-150px)] flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl capitalize text-shark text-center mb-5">
          Đăng ký tài khoản mới
        </h2>
        <div className="flex flex-col items-center">
          {errorText && <p className="mb-4 text-[13px] text-danger">{errorText}</p>}
          {loading ? (
            <Loading className="h-72"></Loading>
          ) : (
            <>
              {success ? (
                <div className="flex flex-col items-center">
                  <p className="text-success mb-12 text-center max-w-[370px]">
                    Đăng ký thành công <br /> Vui lòng mở hộp thư để xác nhận email
                  </p>
                  <Button href="/login" className="w-full" title="Đăng nhập" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Input
                    type="email"
                    className={emptyEmail ? 'border-danger' : 'border-shar-70'}
                    onChange={handleEmailChange}
                    onBlur={() => setEmptyEmail(false)}
                    value={email}
                    placeholder="Email"
                  />
                  <div className="my-2 h-4 w-full">
                    <p className="pl-2 text-danger text-[12px]">{errorEmailText}</p>
                  </div>
                  <Input
                    className={emptyPassword ? 'border-danger' : 'border-shark-70'}
                    onChange={handlePaswordChange}
                    onBlur={() => setEmptyPassword(false)}
                    type={showPassword ? 'text' : 'password'}
                    hasEye
                    value={password}
                    placeholder="Mật khẩu"
                    onClickEye={handleClickEyePass}
                  />
                  <div className="my-2 h-4 w-full">
                    <p className="pl-2 text-danger text-[12px]">{errorPasswordText}</p>
                  </div>
                  <Input
                    className={emptyRePassword ? 'border-danger' : 'border-shark-70'}
                    onChange={handleRePaswordChange}
                    onBlur={() => setEmptyRePassword(false)}
                    type={showRePassword ? 'text' : 'password'}
                    hasEye
                    value={rePassword}
                    placeholder="Nhập lại mật khẩu"
                    onClickEye={handleClickEyeRePass}
                  />
                  <div className="my-2 h-4 w-full">
                    <p className="pl-2 text-danger text-[12px]">{errorRePasswordText}</p>
                  </div>
                  <Button onClick={handleSubmitClick} className="w-full" title="Xác nhận" />
                  <div className="flex gap-1 items-center my-3 w-full">
                    <div className="flex-1 h-[1px] bg-ghost"></div>
                    <span className="shrink-0">or</span>
                    <div className="flex-1 h-[1px] bg-ghost"></div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <Link
                      href="/"
                      className="px-6 py-2 flex items-center gap-2 border border-[#1D2023] rounded hover:bg-malibu-50 hover:text-white hover:border-0"
                    >
                      <Image
                        className="w-7 aspect-square object-cover"
                        src="/icons/google.png"
                        alt="google"
                        width={100}
                        height={100}
                      />
                      <span>Google</span>
                    </Link>
                    <Link
                      href="/"
                      className="px-6 py-2 flex items-center gap-2 border border-[#1D2023] rounded hover:bg-malibu-50 hover:text-white hover:border-0"
                    >
                      <Image
                        className="w-7 aspect-square object-cover"
                        src="/icons/facebook.png"
                        alt="facebook"
                        width={100}
                        height={100}
                      />
                      <span>Facebook</span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </FormLayout>
    </div>
  );
}

RegisterPage.Layout = MainLayout;
