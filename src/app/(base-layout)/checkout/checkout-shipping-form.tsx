"use client";
import { useEffect, useRef, useState } from "react";
import CheckoutSection from "./checkout-section";
import { ShippingAddress } from "@/types/shipping-address";
import { getAllShippingAddress } from "@/actions/shipping-address.action";
import Image from "next/image";
import FormInput from "@/components/form-input";
import {
  getCurrentCart,
  updateCurrentCartShipping,
} from "@/actions/cart.action";
import Modal from "@/components/modal";
import ShippingEditForm, {
  ShippingEditFormHandle,
} from "@/components/shipping-edit-form";

export default function CheckoutShippingForm() {
  const [shippingInfos, setShippingInfos] = useState<ShippingAddress[]>();
  const [currentShippingId, setCurrentShippingId] = useState<
    number | undefined
  >();
  const [deliveryNote, setDeliveryNote] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingShippingInfo, setEditingShippingInfo] = useState<
    ShippingAddress | undefined
  >();
  const formRef = useRef<ShippingEditFormHandle>(null);

  /* 배송지 업데이트 모달 */
  const openUpdateModal = (shippingInfo: ShippingAddress) => {
    console.log("openUpdateModal click!");
    setEditingShippingInfo(shippingInfo);
    setIsUpdateModalOpen(true);
  };

  /* 배송지 삭제 모달 */
  const openDeleteModal = (id: number) => {
    console.log("openDeleteModal click!");
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal click!");
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  /* 배송지 수정 */
  const handleSave = () => {
    const formData = formRef.current?.getValue();

    console.log(formData);
    if (formData) {
      //배송지 업데이트
      //fetch
    } else {
      console.warn("formRef is null");
    }
  };

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
      console.log("shipping Reponse???", response?.data?.addresses);
      if (response?.status) {
        setShippingInfos(response?.data?.addresses);
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
              shippingInfo={shippingInfo}
              currentShippingInfo={
                currentShippingId
                  ? shippingInfo.id === currentShippingId
                  : shippingInfo.isDefault
              }
              onSelect={handleSelectShipping}
              openUpdateModal={openUpdateModal}
              openDeleteModal={openDeleteModal}
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

      {/* 배송지 업데이트 모달 */}
      <Modal
        isOpen={isUpdateModalOpen}
        title="배송지 수정"
        confirmText="수정"
        cancelText="취소"
        onCancel={closeModal}
        onConfirm={handleSave}
      >
        {editingShippingInfo && (
          <ShippingEditForm ref={formRef} defaultValue={editingShippingInfo} />
        )}
      </Modal>

      {/* 배송지 삭제 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="배송지 삭제"
        confirmText="삭제"
        cancelText="취소  "
        onCancel={closeModal}
        onConfirm={closeModal}
      >
        배송지를 삭제하시겠습니까?
      </Modal>
    </CheckoutSection>
  );
}

interface ShippingRowProps {
  shippingInfo: ShippingAddress;
  currentShippingInfo: boolean | undefined;
  onSelect: (id: number) => void;
  openUpdateModal: (shippingInfo: ShippingAddress) => void;
  openDeleteModal: (id: number) => void;
}

const ShippingRow = ({
  shippingInfo,
  currentShippingInfo,
  onSelect,
  openUpdateModal,
  openDeleteModal,
}: ShippingRowProps) => {
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
};
