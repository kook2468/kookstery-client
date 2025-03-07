import { Product } from "@/types/product";

export async function getProduct(productId: string): Promise<{
  status: boolean;
  message?: string;
  data?: Product;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/products/${productId}`
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
    console.error("💊 상품 조회 실패", err);
    return {
      status: false,
      message: `상품 조회 실패 - ${err}`,
    };
  }
}
