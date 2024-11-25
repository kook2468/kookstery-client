"use client";

import { loginAction } from "@/actions/login.action";
import { useToast } from "@/context/toast.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

interface Errors {
  email?: string | null;
  password?: string | null;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { showToast } = useToast(); // useToast 훅으로 Toast 제어

  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    console.log("🔮 effect state", state);
    if (state?.status) {
      //로그인 성공 시 대시보드로 이동
      showToast("로그인 성공", "success");
      router.push("/");
    } else if (state?.error) {
      showToast(state.error || "", "error");
    } else if (state?.errors) {
      setErrors(state?.errors);
    }
  }, [state]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: null });
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: null });
  };

  return (
    <div className="max-w-lg w-full">
      <h1 className="w-full text-3xl text-center mb-20">Kookstery</h1>

      <div>
        <form className="space-y-4" action={formAction}>
          <div className="py-5">
            <label className="text-sm text-[#AAA]">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full mt-3 p-3 border-b rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors?.email && "border border-danger"
              }`}
              disabled={isPending}
              value={email}
              onChange={onChangeEmail}
            />
            {errors?.email && (
              <div className="text-danger text-xs pt-1">{errors?.email}</div>
            )}
          </div>
          <div>
            <label className="text-sm text-[#AAA]">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full mt-3 p-3 border-b rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors?.password && "border border-danger"
              }`}
              disabled={isPending}
              value={password}
              onChange={onChangePassword}
            />
            {errors?.password && (
              <div className="text-danger text-xs pt-1">{errors?.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-dark hover:underline text-sm">
              비밀번호 찾기
            </a>
          </div>
          <div className="flex justify-between py-16 items-center">
            <p className="text-sm text-gray-600">
              아이디가 없으신가요?{" "}
              <Link
                href="/signup"
                className="text-dark font-bold hover:underline"
              >
                회원가입
              </Link>
            </p>
            <button
              type="submit"
              className="w-32 btn-primary"
              disabled={isPending}
            >
              로그인
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <div className="mt-4 flex justify-center space-x-4">
            <button className="border border-2 border-[#AAA] border-opacity-20 px-6 py-3 rounded-3xl flex items-center space-x-2 text-sm">
              <img src="/google-icon.png" alt="Google" className="w-6" />
              <span>Google 간편 로그인</span>
            </button>
            <button className="border border-2 border-[#AAA] border-opacity-20 px-6 py-2 rounded-3xl flex items-center space-x-2 text-sm">
              <img src="/kakao-icon.png" alt="Kakao" className="w-6" />
              <span>카카오톡 간편 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
