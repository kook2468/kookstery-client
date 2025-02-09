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

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/user/register`,
      {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
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

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error("💊 회원가입 실패", err);
    return {
      status: false,
      error: `회원가입 실패 - ${err}`,
    };
  }
}
