import { AdminGroupLayout, AdminLayout } from '@/components/layout';
import { Auth, Button, ImageUpload, Loading } from '@/components/common';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MouseEvent, ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { categoriesApi, uploadFile } from '@/api-client';
import Swal from 'sweetalert2';

export default function AdminNewCategoryPage() {
  const [loading, setLoading] = useState(false);
  const [textFilter, setTextFilter] = useState('');
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [parent, setParent] = useState({ name: '', id: 0 });
  const [filteredList, setFilteredList] = useState([] as any[]);
  const [categoryList, setCategoryList] = useState([] as any[]);
  const [newCategory, setNewCategory] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState('');

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleSelectedFile(file: File) {
    setSelectedFile(file);
  }

  function handleItemClick(event: MouseEvent<HTMLLIElement>) {
    const id = Number(event.currentTarget.dataset.id);
    const name = event.currentTarget.textContent as string;
    setParent({ id, name });
  }

  function handleTextFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setTextFilter(event.target.value);
  }

  function handleFilter(textFilter: string) {
    if (categoryList.length === 0) return;
    if (textFilter.length !== 0) {
      const result = categoryList.filter((item) => {
        if (item.id === 0) return item.name;
        return item.name.toLowerCase().includes(textFilter.trim().toLowerCase());
      });
      setFilteredList(result);
    } else {
      setFilteredList(categoryList);
    }
  }

  function handleClearClick() {
    setName('');
    setThumbnail(' ');
    setSelectedFile(undefined);
    setParent({ id: 0, name: 'Không có' });
    nameRef.current?.focus();
  }

  async function handleSubmitClick() {
    if (name.trim().length === 0) {
      setEmptyName(true);
      setErrorText('Tên danh mục không được bỏ trống!');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        const fileDirectory = `categories/${Date.now()}_${selectedFile.name}`;
        imageUrl = await uploadFile(selectedFile, fileDirectory);
      }
      await categoriesApi.create({
        name,
        parent_id: parent.id || null,
        thumbnail: imageUrl || undefined,
      });
      handleClearClick();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tạo danh mục thành công',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Có lỗi gì đó xảy ra',
        showConfirmButton: true,
      });
    }
    setLoading(false);
  }

  const handleFilterDebounce = debounce(handleFilter, 500);

  useEffect(() => {
    if (newCategory) {
      setNewCategory(false);
    }
    (async () => {
      try {
        const { data } = await categoriesApi.getAllWithoutProducts();
        const categoriesData = data.map((item: any) => ({ id: item.id, name: item.name }));
        setCategoryList([{ id: 0, name: 'Không có' }, ...categoriesData]);
        setFilteredList([{ id: 0, name: 'Không có' }, ...categoriesData]);
      } catch (error: any) {
        const errorMessage = error?.response?.data.message || error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Có lỗi gì đó xảy ra',
          showConfirmButton: true,
        });
      }
    })();
  }, [newCategory]);

  useEffect(() => {
    handleFilterDebounce(textFilter);
    return handleFilterDebounce.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textFilter]);

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
              <h2 className="text-[28px] font-semibold capitalize">Thêm danh mục mới</h2>
              <Link href="/admin/categories">
                <Image alt="return" src="/icons/Back.svg" width={35} height={35} />
              </Link>
            </div>
            <div className="flex items-start justify-between mt-8">
              <div className="flex flex-col items-start gap-y-5">
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Tên danh mục</h3>
                  <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                    <input
                      ref={nameRef}
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
                  <h3 className="capitalize font-medium text-base mb-3">Thumbnail</h3>
                  <ImageUpload
                    initialImage={thumbnail}
                    onFileSelected={handleSelectedFile}
                    height={176}
                    width={350}
                  />
                </AdminGroupLayout>
              </div>
              <div className="flex flex-col">
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Chọn danh mục cha</h3>
                  <p className="mb-6 w-[550px]">
                    <span className="font-semibold">Đã chọn:</span> {parent.name || 'Không có'}
                  </p>
                  <div className="bg-white w-[550px] h-8 rounded border border-ghost relative mb-3">
                    <input
                      value={textFilter}
                      className="w-full h-full rounded outline-none px-2"
                      type="text"
                      placeholder="Tìm theo tên"
                      onChange={handleTextFilterChange}
                    />
                  </div>
                  <div className="w-[550px] h-[258px] border border-ghost rounded-sm overflow-y-auto">
                    <ul className="overflow-y-auto h-full w-full">
                      {filteredList.map((item) => (
                        <li
                          data-id={item.id}
                          className="p-2 border-b border-ghost cursor-pointer hover:bg-malibu-50"
                          key={item.id}
                          onClick={(id) => handleItemClick(id)}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AdminGroupLayout>
                <div className="mt-6 ml-auto self-end">
                  <Button
                    secondary
                    onClick={handleClearClick}
                    title="Clear"
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

AdminNewCategoryPage.Layout = AdminLayout;
