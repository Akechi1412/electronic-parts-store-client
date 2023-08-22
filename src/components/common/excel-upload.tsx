import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/common';
import { ExcelUploadProps } from '@/models';

export function ExcelUpload({
  className,
  innerClassName,
  onFileSelected,
  onSubmit,
  initialFile,
}: ExcelUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      onFileSelected(event.target.files[0]);
    }
  }

  function handleChooseFileClick() {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    if (!initialFile) {
      setFile(null);
    }
  }, [initialFile]);

  return (
    <div className={className}>
      <form
        className="h-full flex flex-col items-end gap-y-4"
        action=""
        method="post"
        encType="multipart/form-data"
      >
        <input
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".xlsx"
        />
        <div
          onClick={handleChooseFileClick}
          className={`bg-white border border-dashed border-ghost rounded-lg flex flex-col items-center cursor-pointer p-2 ${innerClassName}`}
        >
          <h5 className="text-base font-semibold">Chọn file</h5>
          <p className="mb-3">Hỗ trợ: excel(.xlsx)</p>
          <p>File đã chọn:</p>
          <p className="text-base text-center">{file?.name || ''}</p>
        </div>
        <Button onClick={onSubmit} className="px-3" title="Import" />
      </form>
    </div>
  );
}
