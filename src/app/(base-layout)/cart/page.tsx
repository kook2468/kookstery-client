"use client";

import {
  deleteCartItem,
  getAllCartItems,
  updateCartItemQuantity,
  updateCartItemSelected,
} from "@/actions/cart-item.action";
import CheckoutHeader from "@/components/checkout-header";
import QuantityInput from "@/components/quantity-input";
import { useToast } from "@/context/toast.context";
import { CartItem } from "@/types/cart-item";
` `;
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { showToast } = useToast();
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

  const handleCheckboxChange =
    (id: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const isSelected = e.target.checked;
      console.log(`Id: ${id}, Selected: ${isSelected}`);

      setCartItems(
        cartItems?.map((prev) =>
          prev?.id === id ? { ...prev, isSelected: !prev.isSelected } : prev
        )
      );

      try {
        await updateCartItemSelected(id, isSelected);
      } catch (error) {
        console.error(`카트아이템 id=${id} 상태 업데이트 실패 - `, error);
      }
    };

  const handleQtyChange = async (id: number, newQty: number) => {
    try {
      console.log("여기newQty", newQty);
      const response = await updateCartItemQuantity(id, newQty);
      if (response?.status) {
        fetchCartItems();
      }
    } catch (error) {
      console.error(`카트아이템 수량 업데이트 실패 - `, error);
    }
  };

  const handleDeleteClick = (id: number) => async () => {
    try {
      const response = await deleteCartItem(id);
      if (response?.status) {
        await fetchCartItems();
        showToast("카트아이템을 삭제했습니다.", "success");
      } else {
        showToast("카트아이템 삭제 실패", "error");
      }
    } catch (error) {
      console.error(`카트아이템 삭제 실패 - ${error}`);
      showToast("카트아이템 삭제 실패", "error");
    }
  };

  return (
    <div>
      <CheckoutHeader step={1} />
      <div className="flex flex-col gap-20 pt-6 md:flex-row">
        <div className="w-full md:w-2/3">
          <h1 className="text-lg p-2">쿡스테리 상품내역</h1>
          <hr className="sub-line" />

          {cartItems && cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <div key={cartItem?.id}>
                <div className="grid grid-flow-col grid-cols-[30px_1fr_2fr_100px] p-4 items-center min-h-48">
                  {/* checkbox */}
                  <div>
                    <input
                      type="checkbox"
                      checked={cartItem?.isSelected}
                      onChange={handleCheckboxChange(cartItem.id)}
                    ></input>
                  </div>
                  {/* image */}
                  <div className="h-full h-10 bg-gray-300"></div>
                  {/* detail */}
                  <div className="px-6">
                    <p className="text-[#ddd] text-sm pb-1">
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          router.push(
                            `/category/${cartItem?.product?.category?.id}`
                          );
                        }}
                      >
                        {cartItem?.product?.category?.name}
                      </span>
                    </p>
                    <h3 className="font-medium pb-1 ">
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          router.push(`/product/${cartItem?.product?.id}`);
                        }}
                      >
                        {cartItem.product.name}
                      </span>
                    </h3>
                    <p className="text-sm">
                      {cartItem.product.finalPrice.toLocaleString()}원/개
                    </p>
                    <div className="flex pt-4 gap-4">
                      <QuantityInput
                        id={cartItem.id}
                        initQty={cartItem.quantity}
                        onQtyChange={handleQtyChange}
                      ></QuantityInput>
                      <Image
                        src="/trash.svg"
                        width={22}
                        height={22}
                        alt="delete"
                        className="cursor-pointer"
                        onClick={handleDeleteClick(cartItem.id)}
                      />
                    </div>
                  </div>
                  {/* total */}
                  <div className="text-right">
                    {Number(cartItem.finalPrice).toLocaleString()}&nbsp;원
                  </div>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="w-full p-6 text-center">장바구니가 비었습니다.</div>
          )}
        </div>

        <div className="w-full md:w-1/3">
          <h1 className="text-lg p-2">금액 합계</h1>
          <hr className="sub-line" />

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
                      (cartItem.isSelected
                        ? Number(cartItem.discountPrice)
                        : 0),
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
                      sum +
                      (cartItem.isSelected ? Number(cartItem.finalPrice) : 0),
                    0
                  )
                  .toLocaleString()}
                &nbsp;원
              </p>
            </div>
          </div>

          <div className="pt-5">
            <button
              className="btn-light w-full !rounded-lg !py-3 text-xl"
              onClick={() => router.push("/checkout")}
            >
              주문/결제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
