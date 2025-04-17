"use client";
import { getAllCartItems } from "@/actions/cart-item.action";
import CheckoutSection from "./checkout-section";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart-item";
import { useRouter } from "next/navigation";
import { getUserKookCoin } from "@/actions/kook-coin.action";
import { KookCoin } from "@/types/kook-coin";

export default function CheckoutPaymentInfo() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [currentKookCoin, setCurrentKookCoin] = useState<number>(0);
  const router = useRouter();

  const finalPrice =
    cartItems?.reduce(
      (sum, cartItem) =>
        sum + (cartItem.isSelected ? Number(cartItem.finalPrice) : 0),
      0
    ) || 0;

  const afterKookCoin =
    currentKookCoin && finalPrice ? currentKookCoin - finalPrice : 0;

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

  const fetchUserKookCoin = async () => {
    try {
      const response = await getUserKookCoin();
      if (response?.status) {
        setCurrentKookCoin(response?.data?.balance || 0);
      }
    } catch (error) {
      console.error("보유 쿡코인 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserKookCoin();
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
            {finalPrice.toLocaleString()}
            &nbsp;원
          </p>
        </div>
      </div>

      <div className="p-4 pr-5 mt-2 bg-light rounded-lg text-md">
        <div className="flex justify-between py-2">
          <div>🍪 보유 Kook</div>
          <div>{Number(currentKookCoin)?.toLocaleString()}</div>
        </div>
        <div className="flex justify-between py-2">
          <div>🍪 주문 후 Kook</div>
          <div className="font-bold">{afterKookCoin.toLocaleString()}</div>
        </div>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="btn btn-primary w-full !rounded-lg !py-3 text-xl"
          disabled={!(afterKookCoin && afterKookCoin >= 0)}
        >
          주문 확정
        </button>
      </div>
    </CheckoutSection>
  );
}
