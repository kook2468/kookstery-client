import { CartItem } from "@/types/cart-item";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

/* 전체 카트아이템 조회 */
export async function getAllCartItems(): Promise<Response<CartItem[]>> {
  return fetcher<CartItem[]>({
    urn: "/cart-items",
    hasOption: true,
    method: "GET",
  });
}

/* 카트아이템 선택여부 변경 */
export async function updateCartItemSelected(
  id: number,
  isSelected: boolean
): Promise<Response<CartItem>> {
  return fetcher<CartItem>({
    urn: "/cart-items/select",
    hasOption: true,
    method: "PATCH",
    body: { id, isSelected },
  });
}

/* 카트아이템 수량 변경 */
export async function updateCartItemQuantity(
  id: number,
  quantity: number
): Promise<Response<CartItem>> {
  return fetcher<CartItem>({
    urn: "/cart-items/quantity",
    hasOption: true,
    method: "PATCH",
    body: { id, quantity },
  });
}

/* 카트아이템 삭제 */
export async function deleteCartItem(id: number): Promise<Response<void>> {
  return fetcher<void>({
    urn: `/cart-items/${id}`,
    hasOption: true,
    method: "DELETE",
  });
}
