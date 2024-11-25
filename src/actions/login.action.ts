import { error } from "console";

export async function loginAction(_: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      status: false,
      error: "입력 정보를 확인해주세요.",
    };
  }

  console.log(email, password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("🔮 data", data);

    if (!data.success) {
      if (data?.message) {
        return {
          status: false,
          error: data?.message,
        };
      } else if (data?.errors) {
        return {
          status: false,
          errors: data?.errors,
        };
      }
    }

    //쿠키설정 내용~~

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.log(err);
    //console.error("💊 로그인 실패", err);
    return {
      status: false,
      error: `로그인에 실패 - ${err}`,
    };
  }
}
