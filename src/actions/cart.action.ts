import { Cart } from "@/types/cart";
import { CartItem } from "@/types/cart-item";
import { Response } from "@/types/response";

/* 카트아이템 생성 */
export async function createCartItem(
  productId: number,
  quantity: number
): Promise<Response<CartItem>> {
  try {
    console.log("쿠키??", document.cookie);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart-items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
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
    console.error("💊 카트아이템 생성 실패", err);
    return {
      status: false,
      message: `카트아이템 생성 실패 - ${err}`,
    };
  }
}

export async function getCurrentCart(): Promise<Response<Cart>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart`,
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
  } catch (error) {
    console.error("💊 현재 카트 조회 실패", error);
    return {
      status: false,
      message: `현재 카트 조회 실패 - ${error}`,
    };
  }
}

export async function updateCurrentCartShipping(
  shippingAddressId: number
): Promise<Response<Cart>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart/shipping-address`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ shippingAddressId }),
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
    console.error("💊 현재 카트 배송지 업데이트 실패", error);
    return {
      status: false,
      message: `현재 카트 배송지 업데이트 실패 - ${error}`,
    };
  }
}
