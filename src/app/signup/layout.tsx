import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen text-black text-sm">
      <div className="w-full h-40 bg-light"></div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="relative">
            <div className="absolute -left-48 -top-16">
              <Image
                src="/wizard-icon.png"
                width={140}
                height={140}
                alt="wizard"
              />
            </div>
          </div>
          {children}
        </div>
        <footer className="text-center fixed bottom-0 w-full">
          <div className="p-5">제작 @kook2468</div>
        </footer>
      </div>
    </div>
  );
}
