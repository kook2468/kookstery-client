import { Response } from "@/types/response";
import { ShippingAddress } from "@/types/shipping-address";
import { fetcher } from "@/utils/fetcher";

interface ShippingAddressResponse {
  addresses: ShippingAddress[];
  totalCount: number;
}
export async function getAllShippingAddress(): Promise<
  Response<ShippingAddressResponse>
> {
  return fetcher<ShippingAddressResponse>({
    urn: "/shipping-address",
    hasOption: true,
    method: "GET",
  });
}
