"use client";

import { createCartItem } from "@/actions/cart.action";
import { getProduct } from "@/actions/products.action";
import { useToast } from "@/context/toast.context";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | undefined>();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = await params;
      try {
        const response = await getProduct(id);
        if (response?.status) {
          setProduct(response?.data);
        }
      } catch (error) {
        console.error("상품 조회 실패 - ", error);
      }
    };

    fetchProduct();
  }, []);

  const handleCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { id } = await params;

    try {
      const response = await createCartItem(Number(id), 1);

      if (response?.status) {
        //alert 모달 호출
        console.log("카트 아이템 생성 완료");
        showToast("장바구니에 담았습니다.", "success");
      } else {
        //오류 모달 호출
        showToast(response?.message, "error");
      }
    } catch (error) {
      console.error("카테고리 상품 리스트 조회 실패 - ", error);
    }
  };

  const handleWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex my-16">
      <div className="flex-1 px-10">
        <div className="h-80 rounded-lg bg-gray-300"></div>
      </div>
      <div className="flex-1">
        <h1 className="text-xl">{product?.name}</h1>
        <p className="py-4 text-sm">{product?.description}</p>
        <div className="flex gap-3 pt-10">
          <button className="btn-light w-40" onClick={handleCart}>
            장바구니
          </button>
          <button className="btn-light w-40" onClick={handleWishlist}>
            위시리스트
          </button>
        </div>
      </div>
    </div>
  );
}
