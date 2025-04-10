"use client";

import { createCartItem } from "@/actions/cart.action";
import { getProduct } from "@/actions/products.action";
import QuantityInput from "@/components/quantity-input";
import { useToast } from "@/context/toast.context";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product>();
  const [qty, setQty] = useState(1);
  const { showToast } = useToast();
  const router = useRouter();

  const saveStorage = () => {
    /* 최근 본 상품 스토리지 */
    console.log("saveStorage - product ? ", product);
    const storageKey = "app_lastViewedProducts";
    const stored = localStorage.getItem(storageKey);
    const parsed: Product[] = stored ? JSON.parse(stored) : [];
    const updated = [
      product,
      ...parsed.filter((ele) => ele?.id !== product?.id),
    ];
    console.log("updated", updated);
    localStorage.setItem(storageKey, JSON.stringify(updated.slice(0, 10)));
  };

  useEffect(() => {
    /* 상품 데이터 fetch */
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

  useEffect(() => {
    if (product) {
      saveStorage();
    }
  }, [product]);

  const handleCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { id } = await params;

    try {
      const response = await createCartItem(Number(id), qty);

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

  const handleQtyChange = async (id: number, newQty: number) => {
    setQty(newQty);
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-400 font-bold mt-10">
        <div>
          <Image
            src="/icon/home.svg"
            width={22}
            height={18}
            alt="home"
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>
        <div>{`>`}</div>
        <div>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/category/${product?.category?.id}`)}
          >
            {product?.category?.name}
          </span>
        </div>
      </div>
      <div className="flex my-10 flex-col md:flex-row">
        <div className="flex-1 md:px-10">
          {product ? (
            <Image
              src={`/product/${product.id <= 5 ? product.id : "default"}.png`}
              alt={product.slug}
              width={400}
              height={400}
              className="rounded-lg"
            />
          ) : (
            <div className="h-80 rounded-lg bg-gray-300"></div>
          )}
        </div>
        <div className="flex-1 mt-5">
          <h1 className="text-xl font-semibold">{product?.name}</h1>
          <p className="py-4 text-sm">{product?.description}</p>

          {product && (
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h3>수량</h3>
                  <QuantityInput
                    id={product.id}
                    initQty={qty}
                    onQtyChange={handleQtyChange}
                  ></QuantityInput>
                </div>
                <div className="flex justify-between">
                  <h3>상품금액 합계</h3>
                  <p>{product.finalPrice * qty} 원</p>
                </div>
              </div>
              <div className="flex gap-3 pt-10">
                <button className="btn-light w-40" onClick={handleCart}>
                  장바구니
                </button>
                <button className="btn-light w-40" onClick={handleWishlist}>
                  위시리스트
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
