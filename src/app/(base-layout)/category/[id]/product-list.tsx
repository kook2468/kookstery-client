"use client";

import ShippingListSkeleton from "@/components/skeleton/shipping-list-skeleton";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

type ProductListProps = {
  categoryId: string;
};

const PAGE_SIZE = 6;
const OBSERVER_OPTIONS = { threshold: 1 };

export default function ProductList({ categoryId }: ProductListProps) {
  const [observedProduct, setObservedProduct] = useState("");
  const lastProductRef = useRef<HTMLDivElement | null>(null);

  const fetcher = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("🔮 data", data);
      if (!data.success) {
        throw new Error(data?.message || "데이터 조회 실패");
      }
      return data?.data;
    } catch (err) {
      console.error("💊 데이터 조회 실패", err);
      throw new Error(`데이터 조회 실패 - ${err}`);
    }
  };

  const getKey = (pageIndex: number, previousPageData: Product[] | null) => {
    if (previousPageData && previousPageData.length === 0) {
      return null;
    }

    console.log(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/products/categories/${categoryId}?page=${pageIndex}&limit=${PAGE_SIZE}`
    );
    return `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/products/categories/${categoryId}?page=${pageIndex}&limit=${PAGE_SIZE}`;
  };

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Product[]>(getKey, fetcher);

  const isLoading = !data && !error;
  const products: Product[] = data ? data.flat() : []; //data ? ([] as Product[]).concat(...data) : []; //data 평탄화(flat)
  const isReachingEnd = data && data[data.length - 1]?.length < PAGE_SIZE;

  useEffect(() => {
    const currentElement = lastProductRef.current;
    if (!currentElement || !products.length) return;

    const lastId = products[products.length - 1].identifier;
    if (lastId === observedProduct) return;

    /* products 업데이트 할때마다 옵저브Product 마지막 Product로 업데이트 */
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isReachingEnd) {
        setPage(page + 1);
        setObservedProduct(lastId);
      }
    }, OBSERVER_OPTIONS);

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [products]);

  // const observeElement = (element: HTMLElement | null) => {
  //   if (!element) return;
  //   const observer = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting == true) {
  //       setPage(page + 1);
  //       observer.unobserve(element);
  //     }
  //   }, OBSERVER_OPTIONS);

  //   observer.observe(element);

  //   return () => {
  //     observer.disconnect();
  //   };
  // };

  return (
    <div>
      <div className="mt-5">
        총<span className="font-bold pl-1">{products?.length || 0}</span>개
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-10">
        {products && products.length > 0 ? (
          products &&
          products.map((product, index) => (
            <div
              key={product.identifier}
              ref={index === products.length - 1 ? lastProductRef : null}
            >
              <div className="relative">
                <Link href={`/product/${product.id}`}>
                  {product.id ? (
                    <Image
                      src={`/product/${
                        product.id <= 5 ? product.id : "default"
                      }.png`}
                      alt={product.slug}
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-60 bg-gray-300 rounded-lg"></div>
                  )}
                </Link>
                <div className="absolute right-3 bottom-3">
                  <Image
                    src="/icon/heart.svg"
                    alt="wish"
                    width={20}
                    height={20}
                  />
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
          ))
        ) : (
          <ShippingListSkeleton count={6} />
        )}
      </div>
    </div>
  );
}
