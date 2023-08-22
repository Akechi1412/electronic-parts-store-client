import { AdminGroupLayout, AdminLayout } from '@/components/layout';
import {
  Auth,
  Button,
  DynamicInputs,
  ImageUpload,
  Loading,
  MultiImagesUpload,
} from '@/components/common';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { brandsApi, categoriesApi, productsApi, uploadFile } from '@/api-client';
import Swal from 'sweetalert2';
import { CategoriesTree } from '@/components/admin';
import {
  BrandData,
  CategoryData,
  InputsData,
  MultiImagesData,
  ProductData,
  ProductImageData,
  ProductsData,
  SpecificationData,
} from '@/models';
import { useRouter } from 'next/router';

function getDateAndTimeValue(dateTime: string) {
  if (!dateTime) {
    return { date: '', time: '' };
  }
  const [date, timePart] = dateTime.split(' ');
  const [hour, minute, second] = timePart.split(':');

  const time = `${hour}:${minute}`;

  return { date, time };
}

export default function AdminEditCategoryPage() {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [emptyName, setEmptyName] = useState(false);
  const [shortDesc, setShortDesc] = useState('');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [unit, setUnit] = useState('');
  const [warranty, setWarranty] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<CategoryData>();
  const [brand, setBrand] = useState<CategoryData>();
  const [feature, setFeature] = useState('');
  const [specificationInput, setSpecificationInput] = useState<InputsData[]>([
    { input1: '', input2: '' },
  ]);
  const [visibleStateRadio, setVisibleStateRadio] = useState(1);
  const [classifyCheckbox, setClassifyCheckbox] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [thumbnail, setThumbnail] = useState('');
  const [topImageList, setTopImageList] = useState<MultiImagesData[]>([]);
  const [otherImageList, setOtherImageList] = useState<MultiImagesData[]>([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [brandList, setBrandList] = useState<BrandData[]>([]);
  const [filteredBrandList, setFilteredBrandList] = useState<BrandData[]>([]);
  const [specificationList, setSpecificationList] = useState<SpecificationData[]>([]);
  const [hiddenProduct, setHiddenProduct] = useState<0 | 1>(0);
  const [newProduct, setNewProduct] = useState<0 | 1>(0);
  const [featuredProduct, setFeaturedProduct] = useState<0 | 1>(0);
  const [bestsellerProduct, setBestsellerProduct] = useState<0 | 1>(0);
  const [freeshipProduct, setFreeshipProduct] = useState<0 | 1>(0);
  const [errorText, setErrorText] = useState('');
  const [oldProductData, setOldProductData] = useState<ProductData>();

  const visibleStateList = [
    {
      id: 1,
      name: 'Công khai',
    },
    {
      id: 2,
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
  ];

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleShortDescChange(event: ChangeEvent<HTMLInputElement>) {
    setShortDesc(event.target.value);
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  function handleUnitChange(event: ChangeEvent<HTMLInputElement>) {
    setUnit(event.target.value);
  }

  function handleWarrantyChange(event: ChangeEvent<HTMLInputElement>) {
    setWarranty(Number(event.target.value));
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }

  function handleDiscountChange(event: ChangeEvent<HTMLInputElement>) {
    setDiscount(Number(event.target.value));
  }

  function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleStartTimeChange(event: ChangeEvent<HTMLInputElement>) {
    setStartTime(event.target.value);
  }

  function handleEndDateChange(event: ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  function handleEndTimeChange(event: ChangeEvent<HTMLInputElement>) {
    setEndTime(event.target.value);
  }

  function handleBrandFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setBrandFilter(event.target.value);
  }

  function handleFeatureChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setFeature(event.target.value);
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

  function handleSelectedFile(file: File) {
    setSelectedFile(file);
  }

  function handleTopImagesChange(imageList: MultiImagesData[]) {
    setTopImageList(imageList);
  }

  function handleOtherImagesChange(imageList: MultiImagesData[]) {
    setOtherImageList(imageList);
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

  function handleCategoryItemClick(categoryId: number) {
    setCategory(categoryList.find((item) => item.id === categoryId));
  }

  function handleResetClick() {
    setName(oldProductData?.name || '');
    setShortDesc(oldProductData?.short_desc || '');
    setQuantity(oldProductData?.quantity || null);
    setUnit(oldProductData?.unit || '');
    setWarranty(oldProductData?.warranty || null);
    setPrice(oldProductData?.price || null);
    setDiscount(oldProductData?.discount || null);
    const { date: startDate, time: startTime } = getDateAndTimeValue(
      oldProductData?.start_at || ''
    );
    setStartDate(startDate);
    setStartTime(startTime);
    const { date: endDate, time: endTime } = getDateAndTimeValue(oldProductData?.end_at || '');
    setEndDate(endDate);
    setEndTime(endTime);
    setCategory({
      id: oldProductData?.category_id as number,
      name: oldProductData?.category_name as string,
    });
    setBrand({
      id: oldProductData?.brand_id || 0,
      name: oldProductData?.brand_name || 'Không chọn',
    });
    setFeature(oldProductData?.feature || '');
    if (oldProductData?.specification && oldProductData.specification?.length > 0) {
      const specificationInput = [];
      for (const item of oldProductData?.specification) {
        specificationInput.push({ input1: item.name, input2: item.value });
      }
      setSpecificationInput(specificationInput);
    }
    setHiddenProduct(oldProductData?.hidden || 0);
    setVisibleStateRadio(oldProductData?.hidden ? 2 : 1);
    setNewProduct(oldProductData?.new || 0);
    setFeaturedProduct(oldProductData?.featured || 0);
    setBestsellerProduct(oldProductData?.bestseller || 0);
    setFreeshipProduct(oldProductData?.freeship || 0);
    const checkboxList = [];
    if (oldProductData?.new) {
      checkboxList.push(1);
    }
    if (oldProductData?.featured) {
      checkboxList.push(2);
    }
    if (oldProductData?.bestseller) {
      checkboxList.push(3);
    }
    if (oldProductData?.freeship) {
      checkboxList.push(4);
    }
    setClassifyCheckbox(checkboxList);
    setThumbnail(oldProductData?.thumbnail || ' ');
    setSelectedFile(undefined);
    if (oldProductData?.product_image?.length !== 0) {
      setTopImageList(
        () => oldProductData?.product_image?.filter((image: any) => image.on_top === 1) || []
      );
      setOtherImageList(
        () => oldProductData?.product_image?.filter((image: any) => image.on_top === 0) || []
      );
    }
  }

  async function handleSubmitClick() {
    if (name.trim().length === 0) {
      setEmptyName(true);
      setErrorText('Tên sản phẩm không được bỏ trống!');
      return;
    }

    if (!category?.id) {
      setErrorText('Chưa chọn danh mục!');
      return;
    }

    const specificationLength = specificationInput.length;
    for (let i = 0; i < specificationLength - 1; i++) {
      const input1 = specificationInput[i].input1.trim();
      const input2 = specificationInput[i].input2.trim();
      if (!input1 || !input2) {
        setErrorText('Chưa điền thông số kỹ nào đó!');
        return;
      }
      specificationList.push({ name: input1, value: input2 });
    }

    const lastSpecificationInput1 = specificationInput[specificationLength - 1].input1.trim();
    const lastSpecificationInput2 = specificationInput[specificationLength - 1].input2.trim();
    if (lastSpecificationInput1 && lastSpecificationInput2) {
      specificationList.push({ name: lastSpecificationInput1, value: lastSpecificationInput2 });
    } else if (!lastSpecificationInput1 && lastSpecificationInput2) {
      setErrorText('Tên thông số kỹ thuật cuối bị bỏ trống!');
      return;
    } else if (!lastSpecificationInput2 && lastSpecificationInput1) {
      setErrorText('Giá trị thông số kỹ thuật cuối bị bỏ trống!');
      return;
    }

    setLoading(true);

    try {
      let thumbnailUrl = null;
      if (selectedFile) {
        const fileDirectory = `products/${Date.now()}_${selectedFile.name}`;
        thumbnailUrl = await uploadFile(selectedFile, fileDirectory);
      }
      const productImageList: ProductImageData[] = [];
      if (topImageList.length !== 0) {
        for await (const image of topImageList) {
          const fileDirectory = `products/${Date.now()}_${image.file?.name}`;
          let url = image.url as string;
          if (url?.startsWith('blob:')) {
            url = await uploadFile(image.file as File, fileDirectory);
          }
          productImageList.push({ url, on_top: 1 });
        }
      }
      if (otherImageList.length !== 0) {
        for await (const image of otherImageList) {
          const fileDirectory = `products/${Date.now()}_${image.file?.name}`;
          let url = image.url as string;
          if (url?.startsWith('blob:')) {
            url = await uploadFile(image.file as File, fileDirectory);
          }
          productImageList.push({ url, on_top: 0 });
        }
      }
      await productsApi.update(BigInt(query?.productId as string), {
        name,
        short_desc: shortDesc,
        quantity: quantity,
        unit: unit,
        warranty: warranty,
        price,
        discount,
        start_at: `${startDate} ${startTime}`.trim() || null,
        end_at: `${endDate} ${endTime}`.trim() || null,
        category_id: category.id,
        brand_id: brand?.id || null,
        feature,
        specification: specificationList,
        hidden: hiddenProduct,
        new: newProduct,
        featured: featuredProduct,
        bestseller: bestsellerProduct,
        freeship: freeshipProduct,
        thumbnail: thumbnailUrl || undefined,
        product_image: productImageList,
      });
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sửa sản phẩm thành công',
        showConfirmButton: false,
        timer: 1500,
      });
      router.push('/admin/products');
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
    (async () => {
      const { data: categoriesData } = await categoriesApi.getAll();
      setCategoryList(categoriesData);
      const { data: brandsData } = await brandsApi.getAll();
      setBrandList([{ id: 0, name: 'Không chọn' }, ...brandsData]);
      setFilteredBrandList([{ id: 0, name: 'Không chọn' }, ...brandsData]);
    })();
  }, []);

  useEffect(() => {
    handleBrandFilterDebounce(brandFilter);
    return handleBrandFilterDebounce.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandFilter]);

  useEffect(() => {
    if (visibleStateRadio === 1) {
      setHiddenProduct(0);
    } else {
      setHiddenProduct(1);
    }
  }, [visibleStateRadio]);

  useEffect(() => {
    if (classifyCheckbox.includes(1)) {
      setNewProduct(1);
    } else {
      setNewProduct(0);
    }

    if (classifyCheckbox.includes(2)) {
      setFeaturedProduct(1);
    } else {
      setFeaturedProduct(0);
    }

    if (classifyCheckbox.includes(3)) {
      setBestsellerProduct(1);
    } else {
      setBestsellerProduct(0);
    }

    if (classifyCheckbox.includes(4)) {
      setFreeshipProduct(1);
    } else {
      setFreeshipProduct(0);
    }
  }, [classifyCheckbox]);

  useEffect(() => {
    setThumbnail(oldProductData?.thumbnail as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbnail]);

  useEffect(() => {
    (async () => {
      try {
        if (!query || !query?.productId) return;
        const { data } = await productsApi.getById(BigInt(query?.productId as string));
        setOldProductData(data);
        setName(data?.name);
        setShortDesc(data?.short_desc || '');
        setQuantity(data?.quantity || null);
        setUnit(data?.unit || '');
        setWarranty(data?.warranty || null);
        setPrice(data?.price || null);
        setDiscount(data?.discount || null);
        const { date: startDate, time: startTime } = getDateAndTimeValue(data?.start_at);
        setStartDate(startDate);
        setStartTime(startTime);
        const { date: endDate, time: endTime } = getDateAndTimeValue(data?.end_at);
        setEndDate(endDate);
        setEndTime(endTime);
        setCategory({ id: data?.category_id, name: data?.category_name });
        setBrand({ id: data?.brand_id || 0, name: data?.brand_name || 'Không chọn' });
        setFeature(data?.feature || '');
        if (data?.specification?.length > 0) {
          const specificationInput = [];
          for (const item of data.specification) {
            specificationInput.push({ input1: item.name, input2: item.value });
          }
          setSpecificationInput(specificationInput);
        }
        setHiddenProduct(data?.hidden || 0);
        setVisibleStateRadio(data?.hidden ? 2 : 1);
        setNewProduct(data?.new || 0);
        setFeaturedProduct(data?.featured || 0);
        setBestsellerProduct(data?.bestseller || 0);
        setFreeshipProduct(data?.freeship || 0);
        const checkboxList = [];
        if (data?.new) {
          checkboxList.push(1);
        }
        if (data?.featured) {
          checkboxList.push(2);
        }
        if (data?.bestseller) {
          checkboxList.push(3);
        }
        if (data?.freeship) {
          checkboxList.push(4);
        }
        setClassifyCheckbox(checkboxList);
        setThumbnail(data?.thumbnail);
        if (data?.product_image?.length !== 0) {
          setTopImageList(() => data?.product_image?.filter((image: any) => image.on_top === 1));
          setOtherImageList(() => data?.product_image?.filter((image: any) => image.on_top === 0));
        }
      } catch (error: any) {
        const errorMessage = error.response?.dat?.message || error.message;
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
              <h2 className="text-[28px] font-semibold capitalize">Thêm sản phẩm mới</h2>
              <Link href="/admin/products">
                <Image alt="return" src="/icons/Back.svg" width={35} height={35} />
              </Link>
            </div>
            <div className="flex items-start justify-between mt-8">
              <div className="flex flex-col items-start gap-y-5">
                <AdminGroupLayout className="flex flex-col gap-y-4">
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Tên sản phẩm</h3>
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
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Mô tả ngắn</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handleShortDescChange}
                        value={shortDesc}
                        className="w-full h-full rounded outline-none px-2"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Số lượng</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handleAmountChange}
                        value={quantity || ''}
                        className="w-full h-full rounded outline-none px-2"
                        type="number"
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Đơn vị</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        value={unit}
                        onChange={handleUnitChange}
                        className="w-full h-full rounded outline-none px-2"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Bảo hành</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handleWarrantyChange}
                        value={warranty || ''}
                        className="w-full h-full rounded outline-none pl-2 pr-14"
                        type="text"
                      />
                      <span className="absolute top-1/2 transform -translate-y-1/2 right-2">
                        tháng
                      </span>
                    </div>
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout className="flex flex-col gap-y-4">
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Giá bán</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handlePriceChange}
                        value={price || ''}
                        className="w-full h-full rounded outline-none pl-2 pr-14"
                        type="number"
                        min={0}
                      />
                      <span className="absolute top-1/2 transform -translate-y-1/2 right-2">
                        đồng
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Chiết khấu</h3>
                    <div className="bg-white w-[350px] rounded border border-ghost relative">
                      <input
                        onChange={handleDiscountChange}
                        value={discount || ''}
                        className="w-full h-8 rounded outline-none pl-2 pr-14"
                        type="number"
                        min={0}
                        max={100}
                      />
                      <span className="absolute top-1/2 transform -translate-y-1/2 right-2">%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Bắt đầu giảm giá</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative mb-3">
                      <input
                        onChange={handleStartDateChange}
                        value={startDate}
                        className="w-full h-full rounded outline-none px-2 mb-3"
                        type="date"
                      />
                    </div>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handleStartTimeChange}
                        value={startTime}
                        className="w-full h-full rounded outline-none px-2 mb-3"
                        type="time"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="capitalize font-medium text-base mb-3">Kết thúc giảm giá</h3>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative mb-3">
                      <input
                        onChange={handleEndDateChange}
                        value={endDate}
                        className="w-full h-full rounded outline-none px-2 mb-3"
                        type="date"
                      />
                    </div>
                    <div className="bg-white w-[350px] h-8 rounded border border-ghost relative">
                      <input
                        onChange={handleEndTimeChange}
                        value={endTime}
                        className="w-full h-full rounded outline-none px-2 mb-3"
                        type="time"
                      />
                    </div>
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base">Chọn danh mục</h3>
                  <p className="my-5 w-[350px]">
                    <span className="font-semibold">Đã chọn:</span>{' '}
                    {category?.name || <span className="text-danger">Chưa chọn danh mục</span>}
                  </p>
                  <CategoriesTree onClick={handleCategoryItemClick} categories={categoryList} />
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base">Chọn thương hiệu</h3>
                  <p className="my-5 w-[350px]">
                    <span className="font-semibold">Đã chọn:</span> {brand?.name || 'Không chọn'}
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
                      {filteredBrandList.map((item) => (
                        <li
                          key={item.id}
                          className="p-2 border-b border-ghost cursor-pointer hover:bg-malibu-50"
                          onClick={() => {
                            setBrand(item);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AdminGroupLayout>
              </div>
              <div className="flex flex-col items-start gap-y-5">
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Mô tả tính năng</h3>
                  <div className="bg-white w-[550px] h-52 rounded border border-ghost relative">
                    <textarea
                      onChange={handleFeatureChange}
                      value={feature}
                      className="w-full h-full resize-none outline-none p-2"
                    ></textarea>
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Thông số kỹ thuật</h3>
                  <DynamicInputs
                    initInputs={specificationInput}
                    className="w-[550px]"
                    placeholderInput1="Tên thông số"
                    placeholderInput2="Giá trị thông số"
                    onInputsChange={(inputs) => setSpecificationInput(inputs)}
                  />
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Trạng thái hiển thị</h3>
                  <div className="w-[550px] flex items-center gap-x-4">
                    {visibleStateList.map((item) => (
                      <div className="flex item flex-1 gap-x-4" key={item.id}>
                        <input
                          checked={item.id === visibleStateRadio}
                          onChange={() => setVisibleStateRadio(item.id)}
                          className="w-4 h-4 cursor-pointer"
                          type="radio"
                        />
                        <span className="leading-4">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Phân loại</h3>
                  <div className="w-[550px] grid grid-cols-2 gap-4">
                    {classifyList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between pr-14">
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
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Thumbnail</h3>
                  <div className="w-[550px] flex justify-center">
                    <ImageUpload
                      initialImage={thumbnail}
                      onFileSelected={handleSelectedFile}
                      height={176}
                      width={350}
                    />
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Thêm ảnh mô tả</h3>
                  <div className="w-[550px]">
                    <MultiImagesUpload
                      className=""
                      itemClassName="w-[120px] aspect-square"
                      onImagesChange={(imageList) => handleTopImagesChange(imageList)}
                      initImagesData={topImageList}
                    />
                  </div>
                </AdminGroupLayout>
                <AdminGroupLayout>
                  <h3 className="capitalize font-medium text-base mb-3">Thêm ảnh bổ sung</h3>
                  <div className="w-[550px]">
                    <MultiImagesUpload
                      className=""
                      itemClassName="w-[120px] aspect-square"
                      onImagesChange={(imageList) => handleOtherImagesChange(imageList)}
                      initImagesData={otherImageList}
                    />
                  </div>
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

AdminEditCategoryPage.Layout = AdminLayout;
