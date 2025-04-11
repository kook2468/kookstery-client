import { Cart } from "@/types/cart";
import { CartItem } from "@/types/cart-item";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

/* 카트아이템 생성 */
export async function createCartItem(
  productId: number,
  quantity: number
): Promise<Response<CartItem>> {
  return fetcher<CartItem>({
    urn: "/cart-items",
    hasOption: true,
    method: "POST",
    body: { productId, quantity },
  });
}

export async function getCurrentCart(): Promise<Response<Cart>> {
  return fetcher<Cart>({ urn: "/cart", hasOption: true, method: "GET" });
}

export async function updateCurrentCartShipping(
  shippingAddressId: number
): Promise<Response<Cart>> {
  return fetcher<Cart>({
    urn: "/cart/shipping-address",
    hasOption: true,
    method: "PATCH",
    body: { shippingAddressId },
  });
}
