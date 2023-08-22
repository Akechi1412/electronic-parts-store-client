import { AdminGroupLayout, AdminLayout } from '@/components/layout';
import { Auth, ExcelUpload, Loading } from '@/components/common';
import { MouseEvent, useState } from 'react';
import { ImportApi } from '@/api-client';
import Swal from 'sweetalert2';

export default function AdminImportPage() {
  const [productsFile, setProductsFile] = useState<any>();
  const [productsFileName, setProductsFileName] = useState('');
  const [productsErrorText, setProductsErrorText] = useState('');
  const [productsSuccess, setProductsSuccess] = useState(false);
  const [productsDataResponse, setProductsDataResponse] = useState<any>();
  const [productsLoading, setProductsLoading] = useState(false);

  function handleProductFileSelected(file: File) {
    setProductsFile(file);
    setProductsFileName(file.name);
  }

  async function handleProductSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!productsFile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Chưa chọn file!',
        showConfirmButton: true,
      });
      return;
    }

    setProductsLoading(true);
    setProductsErrorText('');
    setProductsSuccess(false);
    const formData = new FormData();
    formData.append('productsFile', productsFile);
    try {
      const { data } = await ImportApi.insertProducts(formData);
      setProductsDataResponse(data);
      setProductsSuccess(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      setProductsErrorText(errorMessage || 'unknown error');
    }
    setProductsFile(undefined);
    setProductsLoading(false);
  }

  return (
    <Auth isAdminPage>
      <div className="mt-7">
        <div>
          <h2 className="text-[28px] font-medium capitalize">Import dữ liệu từ file</h2>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <AdminGroupLayout className="my-6 flex flex-col">
            <h4 className="text-base font-medium capitalize mb-5">Import sản phẩm</h4>
            <ExcelUpload
              onFileSelected={handleProductFileSelected}
              onSubmit={handleProductSubmit}
              className="flex flex-col items-center"
              innerClassName="w-[420px] h-[192px]"
              initialFile={productsFile}
            />
            {productsLoading ? (
              <Loading className="mt-4" />
            ) : (
              <div className="mt-4">
                <h4>Log:</h4>
                {productsSuccess && (
                  <>
                    <p>Import file: {productsFileName}</p>
                    <p>Trạng thái: thành công</p>
                    <p>Tổng số dòng đã import: {productsDataResponse.totalRows}</p>
                  </>
                )}
                {productsErrorText && (
                  <>
                    <p>Import file: {productsFileName}</p>
                    <p>Trạng thái: thất bại</p>
                    <p>Error: {productsErrorText}</p>
                  </>
                )}
              </div>
            )}
          </AdminGroupLayout>
        </div>
      </div>
    </Auth>
  );
}

AdminImportPage.Layout = AdminLayout;
