import Image from 'next/image';

export function Footer() {
  return (
    <footer className="h-24 bg-ghost-30 mt-8">
      <div className="h-full flex items-center justify-center">
        <p className="font-medium flex gap-2 items-center">
          <span className="flex gap-1 items-center">
            Made with{' '}
            <Image className="w-5 h-5" alt="heart" src="/icons/heart.png" width={50} height={50} />
          </span>
          <span>·</span>
          <span>Powered by Akechi</span>
        </p>
      </div>
    </footer>
  );
}
