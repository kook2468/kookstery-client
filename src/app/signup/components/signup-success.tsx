import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignUpSuccess() {
  const router = useRouter();

  return (
    <section className="w-full flex items-center justify-center text-center mt-44">
      <div>
        <Image
          src="/success-icon.svg"
          alt="success"
          width={40}
          height={40}
          className="m-auto mb-7"
        />
        <h1 className="text-3xl tracking-tight font-bold">회원가입 완료!</h1>
        <p className="text-gray-500 p-4 mb-8">
          환영합니다! 신비한 상점의 새로운 손님이 되신 것을 축하드립니다. <br />
          마법 같은 하루를 만드세요!
        </p>
        <div className="space-x-2">
          <button
            className="btn-dark w-40"
            onClick={() => router.push("/login")}
          >
            로그인
          </button>
          <button className="btn-light w-40" onClick={() => router.push("/")}>
            홈페이지 이동
          </button>
        </div>
      </div>
    </section>
  );
}
