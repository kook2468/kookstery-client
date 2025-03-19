import { CartItem } from "@/types/cartItem";

export async function getAllCartItems(): Promise<{
  status: boolean;
  message?: string;
  data?: CartItem[];
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart-items`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await response.json();

    console.log("🔮 data", data);

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
  } catch (err) {
    console.error("💊 카트아이템 전체 조회 실패", err);
    return {
      status: false,
      message: `카트아이템 전체 조회 실패 - ${err}`,
    };
  }
}
