import { EmptyLayout, FormLayout } from '@/components/layout';
import { Button, Loading } from '@/components/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { authApi } from '@/api-client';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmitClick() {
    setErrorText('');
    setSuccess(false);
    setLoading(true);
    try {
      const userId = query?.id as string;

      console.log(userId);

      if (!userId) {
        setErrorText('Yêu cầu không hợp lệ');
        setLoading(false);
        return;
      }

      await authApi.verifyEmail(userId);
      setSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrorText(errorMessage || 'Đã có lỗi xảy ra. Hãy thử lại.');
    }
    setLoading(false);
  }

  return (
    <EmptyLayout className="bg-light-gray w-full h-screen flex justify-center items-center">
      <FormLayout>
        <div className="flex flex-col h-[400px] gap-2">
          <h2 className="font-semibold text-2xl text-center">Xác thực email</h2>
          <div className="flex-1 flex flex-col items-center justify-center">
            {loading ? (
              <Loading className="mt-14"></Loading>
            ) : (
              <>
                {success ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-success mb-16 text-center max-w-[370px]">
                      Xác thực email thành công.
                    </p>
                    <Button href="/login" className="w-full" title="Đăng nhập" />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <Button onClick={handleSubmitClick} className="w-60" title="Xác nhận" />
                    {errorText && (
                      <>
                        <p className="mt-4 text-[13px] text-danger">{errorText}</p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </FormLayout>
    </EmptyLayout>
  );
}
