import { ProductRowProps } from '@/models';
import Image from 'next/image';

export function ProductRow({
  thumbnail,
  id,
  name,
  brand,
  price,
  amount,
  createdAt,
  updatedAt,
  onDelete,
  onEdit,
}: ProductRowProps) {
  return (
    <div className="flex gap-x-5 p-4 shadow-[0_0px_10px_2px_rgba(0,0,0,0.3)] rounded-md">
      <Image
        className="w-[130px] aspect-square object-contain"
        src={thumbnail as string}
        alt={name}
        width={130}
        height={130}
      />
      <div className="flex-1 flex gap-x-8">
        <div className="flex-1 flex flex-col gap-y-9">
          <h2 className="text-base font-semibold">{`#${id}: ${name}`}</h2>
          <div className="flex items-center justify-between">
            <h5>Thương hiệu: {brand}</h5>
            <span>Giá bán: {price}đ</span>
            <span>Hàng còn: {amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Ngày tạo: {createdAt}</span>
            <span>Ngày cập nhật: {updatedAt}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-4">
          <div
            data-id={id}
            onClick={onEdit}
            className="bg-success px-3 py-2 text-white rounded cursor-pointer"
          >
            Sửa
          </div>
          <div
            data-id={id}
            onClick={onDelete}
            className="bg-danger px-3 py-2 text-white rounded cursor-pointer"
          >
            Xóa
          </div>
        </div>
      </div>
    </div>
  );
}
