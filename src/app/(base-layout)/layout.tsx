import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full fixed h-16 grid grid-flow-col grid-cols-[180px_1fr_180px] items-center px-16 border-b bg-white z-10">
        <Link href="/" className="text-xl font-bold">
          Kookstery
        </Link>
        <div className="flex gap-2">
          <Image src="/category.svg" width={22} height={22} alt="category" />
          카테고리
        </div>
        <div className="grid grid-flow-col gap-4">
          <Link href="/mypage">
            <Image
              src="/mypage.svg"
              width={20}
              height={20}
              alt="mypage"
              className="m-auto"
            />
          </Link>
          <Link href="/cart">
            <Image
              src="/cart.svg"
              width={20}
              height={20}
              alt="cart"
              className="m-auto"
            />
          </Link>
          <div>
            <Image
              src="/search.svg"
              width={20}
              height={20}
              alt="search"
              className="m-auto"
            />
          </div>
        </div>
      </header>
      <div className="flex flex-col min-h-screen w-full bg-white px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60 pt-16 min-h-[calc(100svh-116px)]">
        <div className="flex-1">{children}</div>
        <footer className="grid items-center h-16 justify-center">
          제작 @kook2468
        </footer>
      </div>
    </>
  );
}
