import { EmptyLayout, FormLayout } from '@/components/layout';
import { Button, Loading } from '@/components/common';
import { useRouter } from 'next/router';
import { authApi } from '@/api-client';
import { useState } from 'react';

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [resended, setResended] = useState(false);
  const [error, setError] = useState(false);

  function handleReturnClick() {
    router.push('/admin/login');
  }

  async function handleResendEmail() {
    if (resended) return;

    try {
      setLoading(true);
      const response = await authApi.forgotPassword({ email: query.email as string });
      const data: any = response;
      if (data?.success) {
        setResended(true);
        setError(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <EmptyLayout className="bg-light-gray w-full h-screen flex justify-center items-center">
      <FormLayout>
        <h2 className="font-semibold text-2xl text-center mb-16">Reset mật khẩu</h2>
        <h4 className="font-light text-center w-[370px] mx-auto mb-16">
          Một email đã được gửi cho bạn để reset lại mật khẩu. Vui lòng làm theo hướng dẫn và đăng
          nhập lại
        </h4>
        {loading ? (
          <Loading className="mt-20"></Loading>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-[350px]">
              <Button onClick={handleReturnClick} className="w-full mb-4" title="Đăng nhập" />
              <Button
                secondary
                onClick={handleResendEmail}
                className="w-full"
                title="Gửi lại email"
              />
              {resended && (
                <p className="mt-4 text-[13px] text-success">
                  Reset password email đã được gửi lại!
                </p>
              )}
              {error && (
                <p className="mt-4 text-[13px] text-danger">
                  Có lỗi gì đó đã xảy ra, vui lòng thử lại!
                </p>
              )}
            </div>
          </div>
        )}
      </FormLayout>
    </EmptyLayout>
  );
}
