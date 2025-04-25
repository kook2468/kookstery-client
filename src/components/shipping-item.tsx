import { ShippingAddress } from "@/types/shipping-address";
import Image from "next/image";

interface ShippingItemProps {
  shippingInfo: ShippingAddress;
  currentShippingInfo: boolean | undefined;
  onSelect: (id: number) => void;
  openUpdateModal: (shippingInfo: ShippingAddress) => void;
  openDeleteModal: (id: number) => void;
}

export default function ShippingItem({
  shippingInfo,
  currentShippingInfo,
  onSelect,
  openUpdateModal,
  openDeleteModal,
}: ShippingItemProps) {
  const {
    id,
    isDefault,
    name,
    city,
    state,
    addressStreet,
    addressDetail,
    postalCode,
    receiverName,
    receiverPhone,
  } = shippingInfo;

  const handleCurrentShippingChange = (
    _: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSelect(id); // 부모의 현재 배송지 변경 이벤트 호출
  };

  return (
    <div className="grid grid-cols-[30px_1fr_50px] mb-3">
      <div>
        <input
          type="radio"
          checked={currentShippingInfo}
          onChange={handleCurrentShippingChange}
        />
      </div>
      <div>
        <div className="mb-2">
          <span>{name}</span>
          {isDefault && (
            <span className="ml-3 px-2 py-1 bg-gray-400 rounded-lg text-white text-xs">
              기본배송지
            </span>
          )}
        </div>
        <div className="text-sm text-gray-400">
          {city} {state} {addressStreet} {addressDetail}
        </div>
        <div className="text-sm text-gray-400">
          {receiverName} / {receiverPhone}
        </div>
      </div>
      <div>
        <Image
          src="/icon/pencil.svg"
          alt="수정"
          width={20}
          height={20}
          className="mb-4 cursor-pointer"
          onClick={() => openUpdateModal(shippingInfo)}
        />
        {!isDefault && (
          <Image
            src="/icon/delete.svg"
            alt="삭제"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => openDeleteModal(id)}
          />
        )}
      </div>
    </div>
  );
}
