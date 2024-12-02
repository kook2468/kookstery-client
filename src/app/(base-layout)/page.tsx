import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-14">
      {/* 배너 */}
      <div className="bg-light w-full p-24 rounded-3xl flex justify-between items-center tracking-tighter">
        <div className="flex-1">
          <div className="text-3xl leading-snug">
            가상과 현실의 경계에서 <br />
            <span className="font-bold">신비로운 마법</span>을 발견하세요
          </div>
          <div className="mt-5">
            <input
              placeholder="Search"
              className="w-5/6 px-6 py-3 rounded-full"
            />
          </div>
        </div>
        <div className="transform scale-x-[-1]">
          <Image src="/wizard-icon.png" width={180} height={180} alt="wizard" />
        </div>
      </div>

      {/* 카테고리 선택 */}
      <div className="my-14">
        <h1 className="font-bold tracking-tight">카테고리를 선택하세요</h1>
        <div className="flex justify-between gap-3 text-center">
          <div className="bg-white flex-1 py-12 px-6 rounded-3xl hover:px-10 hover:shadow-lg hover:cursor-pointer">
            <Image
              src="/emoji-magic-wand.svg"
              width={30}
              height={30}
              alt="환상의 물건창고"
              className="m-auto"
            />
            <div>환상의 물건창고</div>
          </div>

          <div className="bg-white flex-1 py-12 px-6 rounded-3xl hover:px-10 hover:shadow-lg hover:cursor-pointer">
            <Image
              src="/emoji-magic-wand.svg"
              width={30}
              height={30}
              alt="환상의 물건창고"
              className="m-auto"
            />
            <div>환상의 물건창고</div>
          </div>

          <div className="bg-white flex-1 py-12 px-6 rounded-3xl hover:px-10 hover:shadow-lg hover:cursor-pointer">
            <Image
              src="/emoji-magic-wand.svg"
              width={30}
              height={30}
              alt="환상의 물건창고"
              className="m-auto"
            />
            <div>환상의 물건창고</div>
          </div>

          <div className="bg-white flex-1 py-12 px-6 rounded-3xl hover:px-10 hover:shadow-lg hover:cursor-pointer">
            <Image
              src="/emoji-magic-wand.svg"
              width={30}
              height={30}
              alt="환상의 물건창고"
              className="m-auto"
            />
            <div>환상의 물건창고</div>
          </div>

          <div className="bg-white flex-1 py-12 px-6 rounded-3xl hover:px-10 hover:shadow-lg hover:cursor-pointer">
            <Image
              src="/emoji-magic-wand.svg"
              width={30}
              height={30}
              alt="환상의 물건창고"
              className="m-auto"
            />
            <div>환상의 물건창고</div>
          </div>
        </div>
      </div>

      {/* 인기 상품 */}
      <div>
        <h1 className="font-bold tracking-tight">인기상품</h1>
        <div className="flex"></div>
      </div>
    </div>
  );
}
