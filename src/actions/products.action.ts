import { Product } from "@/types/product";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

export async function getProduct(
  productId: string
): Promise<Response<Product>> {
  return fetcher<Product>({
    urn: `/products/${productId}`,
  });
}

/* 카테고리별 전체 상품 조회 */
export async function getProductsByCategory(
  categoryId: string,
  page: number,
  limit: number
): Promise<Response<Product[]>> {
  return fetcher<Product[]>({
    urn: `/products/categories/${categoryId}?page=${page}&limit=${limit}`,
  });
}
