import { fetcher } from "@/utils/fetcher";

/* 회원가입 */
export async function signUpAction(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password || !username) {
    return {
      status: false,
      error: "입력 정보를 확인해주세요.",
    };
  }

  console.log(email, password, username);

  return fetcher<void>({
    urn: "/user/register",
    hasOption: true,
    method: "POST",
    body: { email, username, password },
  });
}
