import { CartItem } from "@/types/cartItem";
import { Response } from "@/types/response";

/* 전체 카트아이템 조회 */
export async function getAllCartItems(): Promise<Response<CartItem[]>> {
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

/* 카트아이템 선택여부 변경 */
export async function updateCartItemSelected(
  id: number,
  isSelected: boolean
): Promise<Response<CartItem>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart-items/select`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, isSelected }),
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
    console.error("💊 카트아이템 isSelected 업데이트 실패", err);
    return {
      status: false,
      message: `💊 카트아이템 isSelected 업데이트 실패 - ${err}`,
    };
  }
}

/* 카트아이템 수량 변경 */
export async function updateCartItemQuantity(
  id: number,
  quantity: number
): Promise<Response<CartItem>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart-items/quantity`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, quantity }),
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
    console.error("💊 카트아이템 수량 변경 실패", err);
    return {
      status: false,
      message: `💊 카트아이템 수량 변경 실패 - ${err}`,
    };
  }
}

/* 카트아이템 삭제 */
export async function deleteCartItem(id: number): Promise<Response<void>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/cart-items/${id}`,
      {
        method: "DELETE",
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
    console.error(`💊 카트아이템 (id=${id})삭제 실패`, err);
    return {
      status: false,
      message: `💊 카트아이템 (id=${id})삭제 실패 - ${err}`,
    };
  }
}
