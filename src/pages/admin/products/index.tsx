import { AddButton, Auth, Button } from '@/components/common';
import { CategoriesTree, ProductRow, ProductRowLazy } from '@/components/admin';
import { AdminGroupLayout, AdminLayout, AdminGroupLayoutToggle } from '@/components/layout';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { ChangeEvent, MouseEvent } from 'react';
import { BrandData, CategoryData, ProductsData } from '@/models';
import { brandsApi, categoriesApi, productsApi } from '@/api-client';

export default function AdminProductsPage() {
  const router = useRouter();
  // const { query } = router;
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [productsData, setProductsData] = useState<ProductsData[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [brandList, setBrandList] = useState<BrandData[]>([]);
  const [filteredBrandList, setFilteredBrandList] = useState<BrandData[]>([]);
  const [enableFetchData, setEnableFetchData] = useState(true);
  const [visibleStateRadio, setVisibleStateRadio] = useState(1);
  const [classifyCheckbox, setClassifyCheckbox] = useState<number[]>([]);
  const [category, setCategory] = useState<CategoryData>({
    id: 0,
    name: 'Tất cả',
    parent_id: null,
  });
  const [brand, setBrand] = useState<BrandData>({ id: 0, name: 'Tất cả' });
  const [hiddenFilter, setHiddenFilter] = useState<0 | 1 | null>(null);
  const [newFilter, setNewFilter] = useState<null | 1>();
  const [featuredFilter, setFeaturedFilter] = useState<null | 1>();
  const [bestsellerFilter, setBestSellerFilter] = useState<null | 1>();
  const [freeshipFilter, setFreeshipFilter] = useState<null | 1>();
  const [saleFilter, setSaleFilter] = useState<null | 1>();
  const [loading, setLoading] = useState(false);

  const visibleStateList = [
    {
      id: 1,
      name: 'Tất cả',
    },
    {
      id: 2,
      name: 'Công khai',
    },
    {
      id: 3,
      name: 'Ẩn',
    },
  ];

  const classifyList = [
    {
      id: 1,
      name: 'Mới về',
    },
    {
      id: 2,
      name: 'Nổi bật',
    },
    {
      id: 3,
      name: 'Bán chạy',
    },
    {
      id: 4,
      name: 'Free ship',
    },
    {
      id: 5,
      name: 'Giảm giá',
    },
  ];

  function handleFilterInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNameFilter(event.target.value);
  }

  const handleEnableFetchDataDebounce = debounce(() => {
    setEnableFetchData(true);
  }, 1200);

  function handlePageChange(event: any) {
    setEnableFetchData(true);
    setCurrentPage(event.selected + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function handleResetClick() {
    setNameFilter('');
    setCategory({ id: 0, name: 'Tất cả', parent_id: null });
    setBrand({ id: 0, name: 'Tất cả' });
    setHiddenFilter(null);
    setNewFilter(null);
    setFeaturedFilter(null);
    setBestSellerFilter(null);
    setFreeshipFilter(null);
    setVisibleStateRadio(1);
    setClassifyCheckbox([]);
    setEnableFetchData(true);
  }

  function handleClassifyCheckboxChange(id: number) {
    setClassifyCheckbox((prev) => {
      const isChecked = classifyCheckbox.includes(id);
      if (isChecked) {
        return classifyCheckbox.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function handleBrandFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setBrandFilter(event.target.value);
  }

  function handleBrandFilter(textFilter: string) {
    if (brandList.length === 0) return;
    if (textFilter.length !== 0) {
      const result = brandList.filter((item) => {
        if (item.id === 0) return item.name;
        return item.name.toLowerCase().includes(textFilter.trim().toLowerCase());
      });
      setFilteredBrandList(result);
    } else {
      setFilteredBrandList(brandList);
    }
  }

  const handleBrandFilterDebounce = debounce(handleBrandFilter, 500);

  function handleCategoryClick(categoryId: number) {
    setCategory(categoryList.find((item) => item.id === categoryId) as CategoryData);
    setEnableFetchData(true);
  }

  function handleBrandClick(brand: BrandData) {
    setBrand(brand);
    setEnableFetchData(true);
  }

  async function handleDelete(event: MouseEvent<HTMLDivElement>) {
    const productId = event.currentTarget.dataset.id;
    const selection = await Swal.fire({
      title: 'Bạn có chắc muốn xóa sản phẩm này',
      text: 'Bạn sẽ không thể khôi phục lại!!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa',
    });
    if (!selection.isConfirmed) return;
    try {
      await productsApi.delete(BigInt(productId as string));
      Swal.fire('Xóa thành công', 'Một sản phẩm đã được xóa!', 'success');
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
    const productId = Number(event.currentTarget.dataset.id);
    router.push(`/admin/products/edit/${productId}`);
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    setMounted(true);
    handleEnableFetchDataDebounce();
    return handleEnableFetchDataDebounce.cancel;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameFilter]);

  useEffect(() => {
    if (!enableFetchData) return;
    setLoading(true);
    (async () => {
      try {
        const { data } = await productsApi.getPerPage({
          page: currentPage,
          nameFilter,
          categoryIdFilter: category.id,
          brandIdFilter: brand.id,
          hiddenFilter,
          newFilter,
          featuredFilter,
          bestsellerFilter,
          freeshipFilter,
          saleFilter,
        });
        setProductsData(data?.data);
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
      setLoading(false);
      setEnableFetchData(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableFetchData]);

  useEffect(() => {
    (async () => {
      const { data: categoriesData } = await categoriesApi.getAll();
      setCategoryList([{ id: 0, name: 'Tất cả', parent_id: null }, ...categoriesData]);
      const { data: brandsData } = await brandsApi.getAll();
      setBrandList([{ id: 0, name: 'Tất cả' }, ...brandsData]);
      setFilteredBrandList([{ id: 0, name: 'Tất cả' }, ...brandsData]);
    })();
  }, []);

  useEffect(() => {
    handleBrandFilterDebounce(brandFilter);
    return handleBrandFilterDebounce.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandFilter]);

  useEffect(() => {
    if (!mounted) return;

    if (visibleStateRadio === 1) {
      setHiddenFilter(null);
    } else if (visibleStateRadio === 2) {
      setHiddenFilter(0);
    } else if (visibleStateRadio === 3) {
      setHiddenFilter(1);
    }

    setEnableFetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleStateRadio]);

  useEffect(() => {
    if (!mounted) return;

    if (classifyCheckbox.includes(1)) {
      setNewFilter(1);
    } else {
      setNewFilter(null);
    }

    if (classifyCheckbox.includes(2)) {
      setFeaturedFilter(1);
    } else {
      setFeaturedFilter(null);
    }

    if (classifyCheckbox.includes(3)) {
      setBestSellerFilter(1);
    } else {
      setBestSellerFilter(null);
    }

    if (classifyCheckbox.includes(4)) {
      setFreeshipFilter(1);
    } else {
      setFreeshipFilter(null);
    }

    if (classifyCheckbox.includes(5)) {
      setSaleFilter(1);
    } else {
      setSaleFilter(null);
    }

    setEnableFetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classifyCheckbox]);

  return (
    <Auth isAdminPage>
      <div className="mt-7">
        <div className="flex justify-between items-end">
          <h2 className="text-[28px] font-medium capitalize">Danh sách sản phẩm</h2>
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
          <AddButton title="Thêm sản phẩm" href="/admin/products/new" />
        </div>
        <div className="my-6 flex gap-10">
          <div className="w-[350px] flex flex-col items-start gap-y-5">
            <AdminGroupLayout className="w-full flex justify-between items-center">
              <h4 className="text-base font-medium">Filter</h4>
              <Button onClick={handleResetClick} className="px-3" title="Reset" />
            </AdminGroupLayout>
            <AdminGroupLayoutToggle title="Danh mục" className="w-full">
              <p className="my-6 w-[550px]">
                <span className="font-semibold">Đã chọn:</span> {category.name}
              </p>
              <CategoriesTree onClick={handleCategoryClick} categories={categoryList} />
            </AdminGroupLayoutToggle>
            <AdminGroupLayoutToggle title="Thương hiệu" className="w-full">
              <p className="my-6 w-[550px]">
                <span className="font-semibold">Đã chọn:</span> {brand.name}
              </p>
              <div className="bg-white w-full h-8 rounded border border-ghost relative mb-3">
                <input
                  value={brandFilter}
                  className="w-full h-full rounded outline-none px-2"
                  type="text"
                  placeholder="Tìm theo tên"
                  onChange={handleBrandFilterChange}
                />
              </div>
              <div className="w-full h-[186px] border border-ghost rounded-sm overflow-y-auto">
                <ul className="overflow-y-auto h-full w-full">
                  {filteredBrandList.map((brand) => (
                    <li
                      key={brand.id}
                      className="p-2 border-b border-ghost cursor-pointer hover:bg-malibu-50"
                      onClick={() => handleBrandClick(brand)}
                    >
                      {brand.name}
                    </li>
                  ))}
                </ul>
              </div>
            </AdminGroupLayoutToggle>
            <AdminGroupLayoutToggle title="Trạng thái" className="w-full">
              <div className="mt-6 flex flex-col gap-y-4">
                {visibleStateList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <input
                      checked={item.id === visibleStateRadio}
                      onChange={() => setVisibleStateRadio(item.id)}
                      className="w-4 h-4 cursor-pointer"
                      type="radio"
                    />
                  </div>
                ))}
              </div>
            </AdminGroupLayoutToggle>
            <AdminGroupLayoutToggle title="Phân loại" className="w-full">
              <div className="mt-6 flex flex-col gap-y-4">
                {classifyList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <input
                      checked={classifyCheckbox.includes(item.id)}
                      onChange={() => handleClassifyCheckboxChange(item.id)}
                      className="w-4 h-4 cursor-pointer"
                      type="checkbox"
                    />
                  </div>
                ))}
              </div>
            </AdminGroupLayoutToggle>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-y-4">
              {loading ? (
                <>
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                  <ProductRowLazy />
                </>
              ) : (
                <div className="flex flex-col gap-y-4">
                  {productsData.map((product) => (
                    <ProductRow
                      key={product.id.toString()}
                      id={product.id}
                      name={product.name}
                      thumbnail={product?.thumbnail || '/default.jpg'}
                      brand={product?.brand_name || '--'}
                      amount={product?.quantity || '--'}
                      price={product?.price || '--'}
                      createdAt={product.created_at}
                      updatedAt={product.updated_at}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <p>
                Đang hiển thị {productsData.length} trên tổng số {totalRows}
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
        </div>
      </div>
    </Auth>
  );
}

AdminProductsPage.Layout = AdminLayout;
