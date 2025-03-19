"use client";

import { getAllCartItems } from "@/actions/cart-item.action";
import { CartItem } from "@/types/cartItem";
import { useEffect, useState } from "react";

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  useEffect(() => {
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

    fetchCartItems();
  }, []);
  return (
    <div className="flex gap-20 pt-6">
      <div className="w-2/3">
        <h1 className="text-xl font-medium p-2">장바구니</h1>
        <hr className="line-main" />

        {cartItems &&
          cartItems.map((cartItem) => (
            <div key={cartItem?.id}>
              <div className="grid grid-flow-col grid-cols-[30px_1fr_2fr_100px] p-4 items-center min-h-48">
                {/* checkbox */}
                <div>
                  <input type="checkbox"></input>
                </div>
                {/* image */}
                <div className="h-full h-10 bg-gray-300"></div>
                {/* detail */}
                <div className="px-6">
                  <p className="text-[#ddd] text-sm">
                    {cartItem?.product?.category?.name}
                  </p>
                  <h3 className="font-medium">{cartItem.product.name}</h3>
                  <p className="text-sm">99,999원/개</p>
                  <div className="flex pt-4 gap-4">
                    <div>수량</div>
                    <div>삭제</div>
                  </div>
                </div>
                {/* total */}
                <div className="text-right">99,9990원</div>
              </div>
              <hr />
            </div>
          ))}
      </div>

      <div className="w-1/3">
        <h1 className="text-xl font-medium p-2">주문 합계</h1>
        <hr className="line-main" />

        <div className="py-2">
          <div className="flex justify-between py-2">
            <h3>총 상품 금액</h3>
            <p>99,999&nbsp;원</p>
          </div>

          <div className="flex justify-between py-2">
            <h3>총 상품 금액</h3>
            <p>99,999&nbsp;원</p>
          </div>
        </div>

        <hr className="line-main" />

        <div className="py-2">
          <div className="flex justify-between py-2">
            <h3>합계</h3>
            <p>99,999&nbsp;원</p>
          </div>
        </div>

        <div className="pt-5">
          <button className="btn-primary w-full !rounded-lg">주문 결제</button>
        </div>
      </div>
    </div>
  );
}
