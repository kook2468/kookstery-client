import { Response } from "@/types/response";
import { ShippingAddress } from "@/types/shipping-address";

export async function getAllShippingAddress(): Promise<
  Response<ShippingAddress[]>
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/shipping-address`,
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
      data: data?.data?.addresses,
    };
  } catch (error) {
    console.error("💊 배송지 조회 실패", error);
    return {
      status: false,
      message: `배송지 조회 실패 - ${error}`,
    };
  }
}
