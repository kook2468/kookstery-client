import { Response } from "@/types/response";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface FetcherOptions<TBody> {
  urn: string;
  hasOption?: boolean;
  method?: Method;
  body?: TBody;
}

export async function fetcher<TResponse, TBody = unknown>({
  urn,
  hasOption = false,
  method = "GET",
  body,
}: FetcherOptions<TBody>): Promise<Response<TResponse>> {
  try {
    const fetchOptions = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include" as RequestCredentials,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}${urn}`,
      hasOption ? fetchOptions : undefined
    );

    const data = await response.json();

    if (!data.success) {
      return {
        status: false,
        message: data?.message,
      };
    }

    return {
      status: true,
      data: data?.data,
    };
  } catch (error) {
    console.error("🌋 fetcher error", error);
    return {
      status: false,
      message: `API 호출 실패 - ${error}`,
    };
  }
}
