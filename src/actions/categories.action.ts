import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Response } from "@/types/response";

/* 전체 카테고리 조회 */
export async function getAllCategories(): Promise<Response<Category[]>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/categories`
    );

    const data = await response.json();

    console.log("🔮 data", data);

    if (!data.success) {
      return {
        status: false,
        message: data?.message,
      };
    }

    return {
      status: true,
      data: data?.data,
    };
  } catch (err) {
    console.error("💊 카테고리 조회 실패", err);
    return {
      status: false,
      message: `카테고리 조회 실패 - ${err}`,
    };
  }
}

export async function getCategoryById(
  categoryId: string
): Promise<Response<Category>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/categories/${categoryId}`
    );

    const data = await response.json();

    console.log("🔮 data", data);

    if (!data.success) {
      return {
        status: false,
        message: data?.message,
      };
    }

    return {
      status: true,
      data: data?.data,
    };
  } catch (err) {
    console.error("💊 카테고리 정보 조회 실패", err);
    return {
      status: false,
      message: `카테고리 정보 조회 실패 - ${err}`,
    };
  }
}
