import { AddButton, Auth } from '@/components/common';
import { BrandRow } from '@/components/admin';
import { AdminLayout } from '@/components/layout';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { brandsApi } from '@/api-client';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { ChangeEvent, MouseEvent } from 'react';
import { BrandsData } from '@/models';

export default function AdminBrandsPage() {
  const router = useRouter();
  // const { query } = router;
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [brandsData, setBrandsData] = useState<BrandsData[]>([]);
  const [enableFetchData, setEnableFetchData] = useState(true);

  function handleFilterInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNameFilter(event.target.value);
  }

  function handleLimitChange(event: ChangeEvent<HTMLSelectElement>) {
    setEnableFetchData(true);
    setLimit(Number(event.target.value));
  }

  function handlePageChange(event: any) {
    setEnableFetchData(true);
    setCurrentPage(event.selected + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  async function handleDelete(event: MouseEvent<HTMLDivElement>) {
    const brandId = Number(event.currentTarget.dataset.id);
    const selection = await Swal.fire({
      title: 'Bạn có chắc muốn xóa danh mục này',
      text: 'Bạn sẽ không thể khôi phục lại!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa',
    });
    if (!selection.isConfirmed) return;
    try {
      await brandsApi.delete(brandId);
      Swal.fire('Xóa thành công', 'Một danh mục đã được xóa!', 'success');
      setEnableFetchData(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data.message || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Có lỗi gì đó xảy ra',
        showConfirmButton: true,
      });
    }
  }

  function handleEdit(event: MouseEvent<HTMLDivElement>) {
    const brandId = Number(event.currentTarget.dataset.id);
    router.push(`/admin/brands/edit/${brandId}`);
  }

  const handleEnableFetchDataDebounce = debounce(() => {
    setEnableFetchData(true);
  }, 1200);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    handleEnableFetchDataDebounce();

    return handleEnableFetchDataDebounce.cancel;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameFilter]);

  useEffect(() => {
    if (!enableFetchData) return;
    (async () => {
      try {
        const { data } = await brandsApi.getPerPage({
          page: currentPage,
          limit,
          nameFilter,
        });
        setBrandsData(data?.data);
        setTotalPages(data?.pagination?.totalPages);
        setTotalRows(data?.pagination?.totalRows);
      } catch (error: any) {
        const errorMessage = error?.response?.data.message || error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Có lỗi gì đó xảy ra',
          showConfirmButton: true,
        });
      }
      setEnableFetchData(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableFetchData]);

  return (
    <Auth isAdminPage>
      <div className="mt-7">
        <div className="flex justify-between items-end">
          <h2 className="text-[28px] font-medium capitalize">Danh sách thương hiệu</h2>
          <div className="w-[400px] h-[35px] flex rounded-lg border border-ghost">
            <div className="w-[80px] h-full rounded-s-md bg-blue-ribbon text-white text-center leading-[35px] font-medium">
              Search
            </div>
            <input
              className="flex-1 h-full px-2 rounded-e-lg outline-none"
              type="text"
              placeholder="Tìm theo tên"
              value={nameFilter}
              onChange={handleFilterInputChange}
            />
          </div>
          <AddButton title="Thêm thương hiệu" href="/admin/brands/new" />
        </div>
        <div className="my-6">
          <span className="mr-2">Hiển thị:</span>
          <select
            className="w-14  rounded-sm border border-malibu-90 outline-blue-ribbon"
            name="brands-limit"
            id="brands-limit"
            value={limit.toString()}
            onChange={handleLimitChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
          </select>
        </div>
        <table className="w-full">
          <thead className="capitalize font-medium bg-malibu-50 h-8 leading-8">
            <tr className="border border-ghost">
              <th className="pl-2">ID</th>
              <th>Tên thương hiệu</th>
              <th>Logo</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th className="pr-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {brandsData.map((item) => (
              <BrandRow
                key={item.id}
                id={item.id}
                name={item.name}
                logo={item.logo || ''}
                createdAt={item.created_at}
                updatedAt={item.updated_at}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex items-end justify-between">
          <p>
            Đang hiển thị {brandsData.length} trên tổng số {totalRows}
          </p>
          <ReactPaginate
            activeClassName={'border-none bg-blue-ribbon text-white'}
            breakClassName={'break-me '}
            breakLabel={'...'}
            containerClassName={'flex items-center'}
            disabledClassName={'border-none bg-[#e4e4e4] cursor-default'}
            marginPagesDisplayed={2}
            nextClassName={'border border-ghost mx-2 rounded'}
            nextLabel={'›'}
            onPageChange={handlePageChange}
            pageCount={totalPages}
            pageClassName={'rounded border border-ghost mx-2'}
            pageRangeDisplayed={3}
            previousClassName={'border border-ghost mx-2 rounded'}
            previousLabel={'‹'}
            previousLinkClassName={'block p-2'}
            nextLinkClassName={'block p-2'}
            pageLinkClassName={'block p-2'}
          />
        </div>
      </div>
    </Auth>
  );
}

AdminBrandsPage.Layout = AdminLayout;
