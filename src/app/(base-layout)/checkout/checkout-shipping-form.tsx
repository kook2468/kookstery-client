"use client";
import { useEffect, useState } from "react";
import CheckoutSection from "./checkout-section";
import { ShippingAddress } from "@/types/shipping-address";
import { getAllShippingAddress } from "@/actions/shipping-address.action";
import Image from "next/image";
import FormInput from "@/components/form-input";
import {
  getCurrentCart,
  updateCurrentCartShipping,
} from "@/actions/cart.action";

export default function CheckoutShippingForm() {
  const [shippingInfos, setShippingInfos] = useState<ShippingAddress[]>();
  const [currentShippingId, setCurrentShippingId] = useState<
    number | undefined
  >();
  const [deliveryNote, setDeliveryNote] = useState("");

  /* 현재 배송지 변경 이벤트 */
  const handleSelectShipping = (id: number) => {
    console.log(`선택된 배송지 ID: ${id}`);
    setCurrentShippingId(id);

    /* 현재 배송지 변경 Action 호출 */
    fetchUpdateCurrentCartShipping(id);
  };

  const fetchUpdateCurrentCartShipping = async (id: number) => {
    try {
      await updateCurrentCartShipping(id);
    } catch (error) {
      console.error("배송지 업데이트 실패 - ", error);
    }
  };

  /* 현재 배송지 조회 */
  const fetchCurrentShippingInfo = async () => {
    try {
      const response = await getCurrentCart();
      if (response?.status) {
        setCurrentShippingId(response?.data?.shippingAddress?.id);
      }
      console.log("currentShippingId", currentShippingId);
    } catch (error) {
      console.error("현재 배송지 조회 실패 - ", error);
    }
  };

  const fetchShippingInfos = async () => {
    try {
      const response = await getAllShippingAddress();
      if (response?.status) {
        setShippingInfos(response?.data);
      }
    } catch (error) {
      console.error("전체 배송지 조회 실패 - ", error);
    }
  };

  useEffect(() => {
    fetchCurrentShippingInfo();
    fetchShippingInfos();
  }, []);

  return (
    <CheckoutSection title="배송지 정보">
      {shippingInfos &&
        shippingInfos.length > 0 &&
        shippingInfos.map((shippingInfo, index) => (
          <div key={shippingInfo.id}>
            <ShippingRow
              {...shippingInfo}
              currentShippingInfo={
                currentShippingId
                  ? shippingInfo.id === currentShippingId
                  : shippingInfo.isDefault
              }
              onSelectShipping={handleSelectShipping}
            />
            {index < shippingInfos.length - 1 && (
              <hr className="my-4 w-11/12 mx-auto" />
            )}
          </div>
        ))}

      {shippingInfos && (
        <div className="mt-6">
          <FormInput
            name="deliveryNote"
            label="배송 요청사항"
            placeholder="배송 요청사항을 입력해주세요."
            onChange={(e) => setDeliveryNote(e.target.value)}
            value={deliveryNote}
          />
        </div>
      )}
    </CheckoutSection>
  );
}

interface ShippingRowProps extends ShippingAddress {
  currentShippingInfo: boolean | undefined;
  onSelectShipping: (id: number) => void;
}

const ShippingRow = ({
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
  currentShippingInfo,
  onSelectShipping,
}: ShippingRowProps) => {
  const handleCurrentShippingChange = (
    _: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSelectShipping(id); // 부모의 현재 배송지 변경 이벤트 호출
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
          src="/pencil.svg"
          alt="수정"
          width={20}
          height={20}
          className="mb-4 cursor-pointer"
        />
        {!isDefault && (
          <Image
            src="/delete.svg"
            alt="수정"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
