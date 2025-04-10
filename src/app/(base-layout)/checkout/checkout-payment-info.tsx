"use client";
import { getAllCartItems } from "@/actions/cart-item.action";
import CheckoutSection from "./checkout-section";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart-item";
import { useRouter } from "next/navigation";

export default function CheckoutPaymentInfo() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const router = useRouter();

  const fetchCartItems = async () => {
    try {
      const response = await getAllCartItems();
      if (response?.status) {
        setCartItems(response?.data);
      }
    } catch (error) {
      console.error("전체 카트아이템 조회 실패 - ", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CheckoutSection title="최종 결제정보">
      <div className="py-2">
        <div className="flex justify-between py-2">
          <h3>총 상품 금액</h3>
          <p>
            {cartItems
              ?.reduce(
                (sum, cartItem) =>
                  sum +
                  (cartItem.isSelected ? Number(cartItem.regularPrice) : 0),
                0
              )
              .toLocaleString()}
            &nbsp;원
          </p>
        </div>

        <div className="flex justify-between py-2">
          <h3>할인 금액</h3>
          <p>
            {cartItems
              ?.reduce(
                (sum, cartItem) =>
                  sum +
                  (cartItem.isSelected ? Number(cartItem.discountPrice) : 0),
                0
              )
              .toLocaleString()}
            &nbsp;원
          </p>
        </div>
      </div>

      <hr className="line-main" />

      <div className="py-2">
        <div className="flex justify-between py-2">
          <h3>합계</h3>
          <p>
            {" "}
            {cartItems
              ?.reduce(
                (sum, cartItem) =>
                  sum + (cartItem.isSelected ? Number(cartItem.finalPrice) : 0),
                0
              )
              .toLocaleString()}
            &nbsp;원
          </p>
        </div>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="btn-light w-full !rounded-lg !py-3 text-xl"
        >
          주문 확정
        </button>
      </div>
    </CheckoutSection>
  );
}
