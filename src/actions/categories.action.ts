import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

/* 전체 카테고리 조회 */
export async function getAllCategories(): Promise<Response<Category[]>> {
  return fetcher<Category[]>({
    urn: "/categories",
  });
}

/* 카테고리 정보 조회 */
export async function getCategoryById(
  categoryId: string
): Promise<Response<Category>> {
  return fetcher<Category>({
    urn: `/categories/${categoryId}`,
  });
}
