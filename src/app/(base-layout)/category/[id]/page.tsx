"use client";

import { getProductsByCategory } from "@/actions/categories.action";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [products, setProducts] = useState<Product[] | undefined>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { id } = await params;
      try {
        const response = await getProductsByCategory(id);
        if (response?.status) {
          setProducts(response?.data);
        }
      } catch (error) {
        console.error("카테고리 조회 실패 - ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{products && products[0]?.category?.name}</h1>

      <div>
        <div className="mt-10">총 {products?.length || 0}개</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10">
          {products &&
            products.map((product) => (
              <div key={product.id}>
                {product.imageUrn ? (
                  <Image
                    src="/cart.svg"
                    alt={product.imageUrn}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="h-56 w-56 bg-gray-300 rounded-lg"></div>
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
