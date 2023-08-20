export function ProductRowLazy() {
  return (
    <div className="flex gap-x-5 p-4 shadow-[0_0px_10px_2px_rgba(0,0,0,0.3)] rounded-md">
      <div className="w-[130px] aspect-square object-contain bg-ghost-30 animate-pulse"></div>
      <div className="flex-1 flex gap-x-8">
        <div className="flex-1 flex flex-col gap-y-9 animate-pulse">
          <h2 className="text-base font-semibold bg-ghost-30 h-6"></h2>
          <div className="grid grid-cols-3 gap-8">
            <h5 className="bg-ghost-30 h-6"></h5>
            <span className="bg-ghost-30 h-6"></span>
            <span className="bg-ghost-30 h-6"></span>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <span className="bg-ghost-30 h-6"></span>
            <span className="bg-ghost-30 h-6"></span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-y-4">
          <div className="bg-success px-3 py-2 text-white rounded cursor-pointer">Sửa</div>
          <div className="bg-danger px-3 py-2 text-white rounded cursor-pointer">Xóa</div>
        </div>
      </div>
    </div>
  );
}
