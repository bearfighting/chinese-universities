import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <div className="relative h-14 aspect-video">
          <Image
            src="/chinese-universities-logo.png"
            alt="Photo"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
