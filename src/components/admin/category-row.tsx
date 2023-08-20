import { CategoryRowProps } from '@/models';
import Image from 'next/image';

export function CategoryRow({
  id,
  name,
  parent,
  createdAt,
  updatedAt,
  onDelete,
  onEdit,
}: CategoryRowProps) {
  return (
    <tr className="odd:bg-white even:bg-[#eeeeee] border border-ghost relative">
      <th className="pl-2">{`#${id?.toString()?.padStart(4, '0')}`}</th>
      <th>{name}</th>
      <th>{parent}</th>
      <th>{createdAt}</th>
      <th>{updatedAt}</th>
      <th>
        <div className="flex gap-x-2">
          <div
            onClick={onEdit}
            data-id={id}
            className="w-[30px] h-[30px] flex justify-center items-center border border-malibu rounded cursor-pointer hover:border-blue-ribbon"
          >
            <Image alt="Edit" src="/icons/Edit_fill.svg" width={20} height={20} />
          </div>
          <div
            onClick={onDelete}
            data-id={id}
            className="w-[30px] h-[30px] flex justify-center items-center border border-malibu rounded cursor-pointer hover:border-blue-ribbon"
          >
            <Image alt="Delete" src="/icons/trash.svg" width={20} height={20} />
          </div>
        </div>
      </th>
    </tr>
  );
}
