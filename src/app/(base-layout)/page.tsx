"use client";

import Image from "next/image";
import { getAllCategories } from "@/actions/categories.action";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import Link from "next/link";
import { Product } from "@/types/product";

export default function Home() {
  /* 카테고리 조회 */
  const [categories, setCategories] = useState<Category[] | undefined>([]);
  const [lastViewedProducts, setLastViewedProducts] = useState<Product[]>();

  /* 인기상품 조회 */
  useEffect(() => {
    const fecthCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response?.status) {
          setCategories(response?.data);
        }
      } catch (error) {
        console.error("카테고리 조회 실패 - ", error);
      }
    };

    fecthCategories();
    getStorage();
  }, []);

  const getStorage = () => {
    const storageKey = "app_lastViewedProducts";
    const stored = localStorage.getItem(storageKey);
    const parsed: Product[] = stored ? JSON.parse(stored) : [];
    setLastViewedProducts(parsed);
  };

  return (
    <div className="mt-14">
      {/* 배너 */}
      <div className="bg-light w-full p-24 rounded-3xl flex justify-between items-center tracking-tighter">
        <div className="flex-1">
          <div className="text-base md:text-xl lg:text-2xl xl:text-3xl leading-snug">
            가상과 현실의 경계에서 <br />
            <span className="font-bold">신비로운 마법</span>을 발견하세요
          </div>
          <div className="mt-5">
            <input
              placeholder="Search"
              className="w-5/6 px-6 py-3 rounded-full"
            />
          </div>
        </div>
        <div className="transform scale-x-[-1]">
          <Image src="/wizard-icon.png" width={180} height={180} alt="wizard" />
        </div>
      </div>

      {/* 카테고리 선택 */}
      <div className="my-14">
        <h1 className="font-bold tracking-tight pb-4">카테고리를 선택하세요</h1>
        <div className="flex flex-col md:flex-row justify-between gap-3 text-center">
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                className="bg-[white] flex-1 py-10 px-4 rounded-3xl border-light border-2 hover:shadow-lg hover:cursor-pointer"
                href={"/category/" + category.id}
              >
                <Image
                  src="/icon/emoji-magic-wand.svg"
                  width={30}
                  height={30}
                  alt={category.slug}
                  className="m-auto mb-2"
                />
                <div className="tracking-tighter text-sm md:text-base">
                  {category.name}
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* 인기 상품 */}
      <div>
        <h1 className="font-bold tracking-tight pb-4">최근 본 상품</h1>
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex flex-row gap-4 text-center min-w-max">
            {lastViewedProducts && lastViewedProducts.length > 0 ? (
              lastViewedProducts.map((product) => (
                <div key={product.id} className="w-44 shrink-0">
                  <Image
                    src={`/product/${
                      product.id <= 5 ? product.id : "default"
                    }.png`}
                    alt={product.slug}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                  {/* <div className="bg-[#ECF2F7] rounded-3xl py-10 px-4 min-h-40"></div> */}
                  <h3 className="mt-2">{product.name}</h3>
                </div>
              ))
            ) : (
              <div>최근 본 상품이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
