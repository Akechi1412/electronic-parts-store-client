import { useState, useEffect, useRef } from 'react';
import { Auth } from '@/components/common';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';
import { AdminLayout } from '@/components/layout';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';
import { resolve } from 'path';
import { reject } from 'lodash';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { query } = router;
  const { profile, updateProfile } = useAuth();

  async function handleInputEmail() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Bạn chưa có email!!!',
        input: 'email',
        inputLabel: 'Địa chỉ email của bạn',
        inputPlaceholder: 'Nhập địa chỉ email',
        showCancelButton: true,
        cancelButtonText: 'Bỏ qua',
      })
        .then((data) => {
          return resolve(data.value as string);
        })
        .catch(() => {
          return resolve('');
        });
    });
  }

  useEffect(() => {
    if (!query?.emailMissing || !profile?.username) return;
    (async () => {
      const email = (await handleInputEmail()) as string;
      try {
        if (email) {
          await updateProfile({ email });
          await Swal.fire('Thêm email thành công', `Email của bạn: ${email}`, 'success');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
            showConfirmButton: true,
          });
        }
      }
      router.push('/admin/dashboard', undefined, { shallow: true });
    })();
  }, [query, profile, router, updateProfile]);

  return (
    <Auth isAdminPage>
      <div></div>
    </Auth>
  );
}

AdminDashboardPage.Layout = AdminLayout;
