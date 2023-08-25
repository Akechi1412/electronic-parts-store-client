import { useState, useEffect, useLayoutEffect, createRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ImageUploadProps } from '@/models';

export function ImageUpload({ onFileSelected, initialImage, width, height }: ImageUploadProps) {
  const [hovered, setHovered] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = createRef<HTMLInputElement>();

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      displayImagePreview(file);
      onFileSelected(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const displayImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    noClick: true,
    accept: {
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/jpeg': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif'],
      'image/avif': ['.avif'],
      'image/apng': ['.apng'],
    },
  });

  useEffect(() => {
    if (initialImage?.trim()) {
      setImagePreview(initialImage);
    } else {
      setImagePreview(null);
    }
  }, [initialImage]);

  return (
    <div
      {...getRootProps()}
      className={`w-[${width}px] h-44 h-[${height}px] border-2 border-dashed border-ghost rounded-md flex items-center justify-center relative overflow-hidden`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imagePreview ? (
        <>
          <Image
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-full h-full object-contain"
            width={600}
            height={600}
            priority
          />
          <div
            className={`absolute left-0 top-0 w-full h-full opacity-20 transition-all bg-[#000]${
              hovered ? ' visible' : ' invisible'
            }`}
          ></div>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-white rounded text-white cursor-pointer transition-all${
              hovered ? ' visible' : ' invisible'
            }`}
          >
            Chọn ảnh
          </button>
        </>
      ) : (
        <>
          {isDragActive ? (
            <p className="absolute">Thả ảnh vào đây...</p>
          ) : (
            <p className="absolute">Kéo và thả ảnh vào đây hoặc</p>
          )}
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute mt-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 border bg-blue-ribbon text-white cursor-pointer"
          >
            Tải file
          </button>
        </>
      )}
      <input {...getInputProps()} type="file" ref={fileInputRef} className="hidden" />
    </div>
  );
}
