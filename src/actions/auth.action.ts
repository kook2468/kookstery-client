import { Response } from "@/types/response";
import { User } from "@/types/user";
import { fetcher } from "@/utils/fetcher";

/* 로그인 */
export async function loginAction(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      status: false,
      error: "입력 정보를 확인해주세요.",
    };
  }

  console.log(email, password);

  return fetcher<void>({
    urn: "/auth/login",
    hasOption: true,
    method: "POST",
    body: { email, password },
  });
}

/* 현재 로그인 유저 조회 */
export async function getCurrentUser(): Promise<Response<User>> {
  return fetcher<User>({
    urn: "/auth/currentUser",
    hasOption: true,
    method: "GET",
  });
}
