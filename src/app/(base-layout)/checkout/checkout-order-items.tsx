"use client";
import { useEffect, useState } from "react";
import CheckoutSection from "./checkout-section";
import { CartItem } from "@/types/cart-item";
import { getAllCartItems } from "@/actions/cart-item.action";
import Image from "next/image";

export default function CheckoutOrderItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>();

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
    <CheckoutSection title="쿡스테리 상품정보">
      {cartItems && (
        <table className="w-full text-sm text-center">
          <thead>
            <tr>
              <td className="w-1/2" colSpan={2}>
                상품정보
              </td>
              <td className="w-1/6">판매가</td>
              <td className="w-1/6">수량</td>
              <td className="w-1/6">구매가</td>
            </tr>
          </thead>
          <tbody>
            {cartItems
              ?.filter((cartItem) => cartItem.isSelected)
              .map((cartItem, index) => {
                return (
                  <tr
                    key={cartItem.id}
                    className={index < cartItems.length - 1 ? "border-b" : ""}
                  >
                    <td className="w-20">
                      {cartItem.product ? (
                        <Image
                          src={`/product/${
                            cartItem.product.id <= 5
                              ? cartItem.product.id
                              : "default"
                          }.png`}
                          alt={cartItem.product.slug}
                          width={300}
                          height={300}
                          className="rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-300"></div>
                      )}
                    </td>
                    <td className="text-left pl-4">
                      <div className="text-gray-500 text-xs">
                        {cartItem.product.category.name}
                      </div>
                      <div className="text-md">{cartItem.product.name}</div>
                    </td>
                    <td>
                      {cartItem.product.regularPrice.toLocaleString()}&nbsp;원
                    </td>
                    <td>{cartItem.quantity}</td>
                    <td>
                      <div className="line-through text-xs text-gray-400">
                        {Number(cartItem.regularPrice).toLocaleString()}&nbsp;원
                      </div>
                      <div>
                        {Number(cartItem.finalPrice).toLocaleString()}&nbsp;원
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </CheckoutSection>
  );
}
