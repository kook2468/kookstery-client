"use client";

import {
  getCategoryById,
  getProductsByCategory,
} from "@/actions/categories.action";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [category, setCategory] = useState<Category | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      const { id } = await params;
      try {
        const response = await getProductsByCategory(id);
        if (response?.status) {
          setProducts(response?.data);
        }
      } catch (error) {
        console.error("카테고리 상품 리스트 조회 실패 - ", error);
      }
    };

    const fetchCategory = async () => {
      const { id } = await params;
      try {
        const response = await getCategoryById(id);
        if (response?.status) {
          setCategory(response?.data);
        }
      } catch (error) {
        console.error("카테고리 상품 리스트 조회 실패 - ", error);
      }
    };

    fetchProducts();
    fetchCategory();
  }, []);

  return (
    <div>
      {/* title */}
      {category && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-6 md:items-center">
          <h1 className="text-xl">{category?.name}</h1>
          <p className="text-xs bg-light py-3 px-6 ">{category?.description}</p>
        </div>
      )}
      {/* body */}
      <div>
        <div className="mt-5">
          총<span className="font-bold pl-1">{products?.length || 0}</span>개
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-10">
          {products &&
            products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  {product.imageUrn ? (
                    <Image
                      src="/cart.svg"
                      alt={product.imageUrn}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  ) : (
                    <Link href={`/product/${product.id}`}>
                      <div className="w-full h-60 bg-gray-300 rounded-lg"></div>
                    </Link>
                  )}
                  <div className="absolute right-3 bottom-3">
                    <Image src="/heart.svg" alt="wish" width={20} height={20} />
                  </div>
                </div>

                <div className="flex items-center gap-x-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="py-2">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-400">
                    {product?.category?.name}
                  </p>
                </div>
                <p className="text-xs">{product.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
