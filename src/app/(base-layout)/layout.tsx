export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full fixed h-16 grid grid-flow-col grid-cols-[230px_1fr_230px] items-center px-16 border-b bg-white">
        <div className="text-xl font-bold">Kookstery</div>
        <div>카테고리</div>
        <div className="grid grid-flow-col gap-4">
          <div>마이페이지</div> <div>장바구니</div> <div>검색</div>
        </div>
      </header>
      <div className="w-full bg-[#fafafa] px-60 pt-16 min-h-[calc(100svh-116px)]">
        {children}
      </div>
      <footer className="grid items-center h-16 justify-center bg-[#fafafa]">
        제작 @kook2468
      </footer>
    </>
  );
}
