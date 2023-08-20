import { EmptyLayout, FormLayout } from '@/components/layout';
import { Input, Button, Loading } from '@/components/common';
import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { authApi } from '@/api-client';

export default function AdminLoginPage() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyRePassword, setEmptyRePassword] = useState(false);
  const [errorPasswordText, setErrorPasswordText] = useState('' as string);
  const [errorRePasswordText, setErrorRePasswordText] = useState('' as string);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  function verifyPassword() {
    console.log('a');
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

  const verifyPasswordDebounce = debounce(verifyPassword, 500);
  const verifyRePasswordDebounce = debounce(verifyRePassword, 500);

  function handlePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleRePaswordChange(event: ChangeEvent<HTMLInputElement>) {
    setRePassword(event.target.value);
  }

  async function handleSubmitClick() {
    if (password.trim() === '' || rePassword.trim() === '') {
      if (password.trim() === '') {
        setEmptyPassword(true);
      }
      if (rePassword.trim() === '') {
        setEmptyRePassword(true);
      }
      return;
    }

    if (errorPasswordText !== '' || errorRePasswordText !== '') {
      return;
    }

    setLoading(true);
    setErrorText('');
    setSuccess(false);
    try {
      const token = query.token as string;
      await authApi.resetPassword({ password }, token);
      setSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrorText(errorMessage || 'Đã có lỗi xảy ra. Hãy thử lại.');
    }
    setLoading(false);
  }

  function handleClickEyePass() {
    setShowPassword((showPassword) => !showPassword);
  }

  function handleClickEyeRePass() {
    setShowRePassword((showRePassword) => !showRePassword);
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
    <EmptyLayout className="bg-light-gray w-full h-screen flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl text-center mb-16">Đổi mật khẩu mới</h2>
        <div id="admin-reset-password-form" className="flex flex-col items-center">
          {loading ? (
            <Loading className="mt-14"></Loading>
          ) : (
            <>
              {success ? (
                <div className="flex flex-col items-center">
                  <p className="text-success mb-16 text-center max-w-[370px]">
                    Đổi mật khẩu thành công. Vui lòng đăng nhập lại.
                  </p>
                  <Button href="/" className="w-full" title="Về trang chủ" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Input
                    className={emptyPassword ? 'border-danger' : 'border-shark-70'}
                    onChange={handlePaswordChange}
                    onBlur={() => setEmptyPassword(false)}
                    type={showPassword ? 'text' : 'password'}
                    hasEye
                    value={password}
                    placeholder="Mật khẩu mới"
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
                  {errorText && <p className="mt-4 text-[13px] text-danger">{errorText}</p>}
                </div>
              )}
            </>
          )}
        </div>
      </FormLayout>
    </EmptyLayout>
  );
}
