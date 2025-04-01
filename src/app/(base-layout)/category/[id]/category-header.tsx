"use client";

import { getCategoryById } from "@/actions/categories.action";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

type CategoryHeaderProps = {
  categoryId: string;
};

export default function CategoryHeader({ categoryId }: CategoryHeaderProps) {
  const [category, setCategory] = useState<Category | undefined>();

  /* 초기 렌더링 시 카테고리 불러오기 */
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(categoryId);
        if (response?.status) {
          setCategory(response?.data);
        }
      } catch (error) {
        console.error("카테고리 상품 리스트 조회 실패 - ", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div>
      {category && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-6 md:items-center">
          <h1 className="text-xl">{category?.name}</h1>
          <p className="text-xs bg-light py-3 px-6 ">{category?.description}</p>
        </div>
      )}
    </div>
  );
}
