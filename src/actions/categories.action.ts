import { Category } from "@/types/category";
import { Product } from "@/types/product";

export async function getAllCategories(): Promise<{
  status: boolean;
  message?: string;
  data?: Category[];
}> {
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

export async function getProductsByCategory(categoryId: string): Promise<{
  status: boolean;
  message?: string;
  data?: Product[];
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/categories/${categoryId}/products`
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

    console.log();
  } catch (err) {
    console.error("💊 상품 리스트 조회 실패", err);
    return {
      status: false,
      message: `상품 리스트 조회 실패 - ${err}`,
    };
  }
}
