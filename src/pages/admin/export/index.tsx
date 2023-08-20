import { AdminGroupLayout, AdminLayout } from '@/components/layout';
import { Auth, Button, Loading } from '@/components/common';
import { MouseEvent, useState } from 'react';
import { ExportApi } from '@/api-client';

export default function AdminExportPage() {
  const [productsDownloadLink, setProductsDownloadLink] = useState('');
  const [productsDownload, setProductDownload] = useState('');
  const [productsErrorText, setProductsErrorText] = useState('');
  const [productsSuccess, setProductsSuccess] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  async function handleProductsSubmit(event: MouseEvent<HTMLButtonElement>) {
    setProductsLoading(true);
    setProductsErrorText('');
    setProductsSuccess(false);
    if (productsDownloadLink) {
      window.URL.revokeObjectURL(productsDownloadLink);
    }
    try {
      const blob = await ExportApi.getProductsFile();
      const url = window.URL.createObjectURL(blob as any);
      const fileName = `${Date.now()}_products.xlsx`;
      setProductsDownloadLink(url);
      setProductDownload(fileName);
      setProductsSuccess(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      setProductsErrorText(errorMessage || 'unknown error');
    }
    setProductsLoading(false);
  }

  function handleDownloadProductsClick() {
    setTimeout(() => {
      setProductsSuccess(false);
      window.URL.revokeObjectURL(productsDownloadLink);
      setProductsDownloadLink('');
      setProductDownload('');
    }, 3000);
  }

  return (
    <Auth isAdminPage>
      <div className="mt-7">
        <div>
          <h2 className="text-[28px] font-medium capitalize">Export dữ liệu thành file</h2>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <AdminGroupLayout className="my-6 flex flex-col">
            <h4 className="text-base font-medium capitalize mb-5">Export sản phẩm</h4>
            <Button onClick={handleProductsSubmit} title="Export" />

            {productsLoading ? (
              <Loading className="mt-4" />
            ) : (
              <div className="mt-4">
                <h4>Log:</h4>
                {productsSuccess && (
                  <>
                    <p>Trạng thái: thành công</p>
                    <p>
                      Tải xuống:{' '}
                      <a
                        onClick={handleDownloadProductsClick}
                        download={productsDownload}
                        className="text-blue-ribbon hover:underline"
                        href={productsDownloadLink}
                      >
                        {productsDownload}
                      </a>
                    </p>
                  </>
                )}
                {productsErrorText && (
                  <>
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

AdminExportPage.Layout = AdminLayout;
