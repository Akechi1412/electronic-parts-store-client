import { AdminGroupLayout, AdminLayout } from '@/components/layout';
import { Auth, Button, ImageUpload, Loading } from '@/components/common';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { brandsApi, uploadFile } from '@/api-client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { BrandData } from '@/models';

export default function AdminEditBrandPage() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [description, setDescription] = useState('');
  const [emptyName, setEmptyName] = useState(false);
  const [logo, setLogo] = useState('');
  const [oldBrandData, setOldBrandData] = useState<BrandData>();
  const [errorText, setErrorText] = useState('');

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function handleSelectedFile(file: File) {
    setSelectedFile(file);
  }

  function handleResetClick() {
    setName(oldBrandData?.name as string);
    setLogo(' ');
    setSelectedFile(undefined);
    setDescription(oldBrandData?.description as string);
  }

  async function handleSubmitClick() {
    if (name.trim().length === 0) {
      setEmptyName(true);
      setErrorText('Tên thương hiệu không được bỏ trống!');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        const fileDirectory = `brands/${Date.now()}_${selectedFile.name}`;
        imageUrl = await uploadFile(selectedFile, fileDirectory);
      }
      await brandsApi.update(Number(query.brandId), {
        name,
        description,
        logo: imageUrl || undefined,
      });
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa thương hiệu thành công',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/admin/brands');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Có lỗi gì đó đã xảy ra',
        showConfirmButton: true,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    setLogo(oldBrandData?.logo as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);

  useEffect(() => {
    (async () => {
      try {
        if (!query || !query?.brandId) return;
        const { data } = await brandsApi.getById(Number(query?.brandId));
        setOldBrandData(data);
        setLogo(data?.logo);
        setName(data?.name);
        setDescription(data?.description);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Có lỗi gì đó xảy ra',
          showConfirmButton: true,
        });
      }
    })();
  }, [query]);

  useEffect(() => {
    if (errorText) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorText,
        showConfirmButton: true,
      });
      setErrorText('');
    }
  }, [errorText]);

  return (
    <Auth isAdminPage>
      <>
        {loading ? (
          <Loading className="fixed left-0 top-0 w-screen h-screen" />
        ) : (
          <div className="mt-7">
            <div className="flex justify-between items-end">
              <h2 className="text-[28px] font-semibold capitalize">Sửa thông tin thương hiệu</h2>
              <Link href="/admin/brands">
                <Image alt="return" src="/icons/Back.svg" width={35} height={35} />
              </Link>
            </div>
            <div className="flex items-start justify-between mt-8">
              <div className="flex flex-col items-start gap-y-5">
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Tên thương hiệu</h3>
                  <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                    <input
                      onChange={handleNameChange}
                      onBlur={() => setEmptyName(false)}
                      value={name}
                      className="w-full h-full rounded outline-none pl-2 pr-6"
                      type="text"
                    />
                    {emptyName && (
                      <div className="text-2xl absolute top-1 right-2 text-danger">*</div>
                    )}
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Logo</h3>
                  <ImageUpload
                    initialImage={logo}
                    onFileSelected={handleSelectedFile}
                    height={176}
                    width={350}
                  />
                </AdminGroupLayout>
              </div>
              <div className="flex flex-col">
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Mô tả</h3>
                  <textarea
                    name="brand-description"
                    id="brand-description"
                    className="w-[550px] h-64 resize-none outline-none p-2"
                    onChange={handleDescriptionChange}
                    value={description}
                  ></textarea>
                </AdminGroupLayout>
                <div className="mt-6 ml-auto self-end">
                  <Button
                    secondary
                    onClick={handleResetClick}
                    title="Reset"
                    className="px-10 mr-4"
                  />
                  <Button onClick={handleSubmitClick} title="Lưu" className="px-10" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </Auth>
  );
}

AdminEditBrandPage.Layout = AdminLayout;
