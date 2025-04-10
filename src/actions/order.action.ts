import { Order } from "@/types/order";
import { Response } from "@/types/response";

export async function confirmOrder(
  deliveryNotes: string | null
): Promise<Response<Order>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ deliveryNotes }),
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
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: `주문 확정 실패 - ${error}`,
    };
  }
}
