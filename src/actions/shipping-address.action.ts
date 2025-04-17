import { Response } from "@/types/response";
import { ShippingAddress } from "@/types/shipping-address";
import { fetcher } from "@/utils/fetcher";

interface ShippingAddressResponse {
  addresses: ShippingAddress[];
  totalCount: number;
}

/* 로그인 유저 전체 배송지 조회 */
export async function getAllShippingAddress(): Promise<
  Response<ShippingAddressResponse>
> {
  return fetcher<ShippingAddressResponse>({
    urn: "/shipping-address",
    hasOption: true,
    method: "GET",
  });
}
