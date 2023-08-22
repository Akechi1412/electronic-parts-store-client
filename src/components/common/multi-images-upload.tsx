import { MultiImagesData, MultiImagesUploadProps } from '@/models';
import Image from 'next/image';
import { useState, useEffect, useRef, MouseEvent, ChangeEvent } from 'react';

export function MultiImagesUpload({
  className,
  itemClassName,
  initImagesData,
  onImagesChange,
}: MultiImagesUploadProps) {
  const [imageList, setImageList] = useState<MultiImagesData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef(0);

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length === 0) {
      return;
    }
    const index = indexRef.current;
    if (imageList[index] && imageList[index].url?.startsWith('blob:')) {
      window.URL.revokeObjectURL(imageList[index].url as string);
    }
    const file = event.target.files?.[0];
    const url = window.URL.createObjectURL(file as Blob);
    if (index !== imageList.length) {
      const newImageList = [...imageList];
      newImageList[index] = { file, url };
      setImageList(newImageList);
      onImagesChange(newImageList);
    } else {
      setImageList((prev) => [...prev, { file, url }]);
      onImagesChange([...imageList, { file, url }]);
    }
  }

  function handleAddImageClick() {
    indexRef.current = imageList.length;
    fileInputRef.current?.click();
  }

  function handleChangeImageClick(index: number) {
    indexRef.current = index;
    fileInputRef.current?.click();
  }

  function handleDeleteImageClick(index: number) {
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    setImageList(newImageList);
    onImagesChange(newImageList);
  }

  useEffect(() => {
    setImageList(initImagesData);
    indexRef.current = initImagesData.length - 1;
  }, [initImagesData]);

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleSelectFile}
      />
      <div className={`grid grid-cols-4 gap-3 ${className}`}>
        {imageList.map((item, index) => (
          <div
            key={index}
            className={`relative group/item cursor-pointer ${itemClassName}`}
            onClick={() => handleChangeImageClick(index)}
          >
            {item.url && (
              <>
                <Image
                  src={item.url}
                  alt={item.url}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                  priority
                />
                <div
                  onClick={(event: MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                    handleDeleteImageClick(index);
                  }}
                  className="hidden group-hover/item:block absolute hover:bg-[#00000035] p-1 top-0 right-0 bg-[#00000015]"
                >
                  <Image
                    className="w-5 h-5"
                    src="/icons/Close_round_light.svg"
                    alt="del"
                    width={30}
                    height={30}
                  />
                </div>
              </>
            )}
          </div>
        ))}
        <div
          className={`flex items-center justify-center border border-dashed border-ghost rounded-sm bg-white cursor-pointer ${itemClassName}`}
          onClick={handleAddImageClick}
        >
          <Image
            className="w-30 h-30"
            src="/icons/Add_ring_light_dark.svg"
            alt="Thêm ảnh"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
}
