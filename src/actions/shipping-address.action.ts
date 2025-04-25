import { Response } from "@/types/response";
import { ShippingAddress } from "@/types/shipping-address";
import { fetcher } from "@/utils/fetcher";
import { formatPhoneNumber } from "@/utils/utils";

interface ShippingAddressResponse {
  addresses: ShippingAddress[];
  totalCount: number;
}

interface UpdateShippingAddressDto {
  name: string;
  receiverName: string;
  receiverPhone?: string;
  addressStreet: string;
  addressDetail?: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
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

/* 배송지 수정 */
export async function updateShippingAddress(
  shippingInfo: ShippingAddress
): Promise<Response<ShippingAddress>> {
  const updatedShippingInfo: UpdateShippingAddressDto = {
    name: shippingInfo.name,
    receiverName: shippingInfo.receiverName,
    receiverPhone: formatPhoneNumber(shippingInfo.receiverPhone),
    addressStreet: shippingInfo.addressStreet,
    addressDetail: shippingInfo.addressDetail,
    city: shippingInfo.city,
    postalCode: shippingInfo.postalCode,
    isDefault: shippingInfo.isDefault,
  };

  return fetcher<ShippingAddress>({
    urn: `/shipping-address/${shippingInfo.id}`,
    hasOption: true,
    method: "PATCH",
    body: updatedShippingInfo,
  });
}
