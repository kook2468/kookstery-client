"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import CheckoutSection from "./checkout-section";
import { ShippingAddress } from "@/types/shipping-address";
import {
  getAllShippingAddress,
  updateShippingAddress,
} from "@/actions/shipping-address.action";
import FormInput from "@/components/form-input";
import {
  getCurrentCart,
  updateCurrentCartShipping,
} from "@/actions/cart.action";
import Modal from "@/components/modal";
import ShippingEditForm, {
  ShippingEditFormHandle,
} from "@/components/shipping-edit-form";
import ShippingListSkeleton from "@/components/skeleton/shipping-list-skeleton";
import ShippingItemList from "@/components/shipping-item-list";

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
      fetchUpdateShippingAddress(formData);
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

  /* fetch - 배송지 업데이트 */
  const fetchUpdateShippingAddress = async (shippingInfo: ShippingAddress) => {
    try {
      await updateShippingAddress(shippingInfo);
      closeModal();
      fetchCurrentShippingInfo();
      fetchShippingInfos();
    } catch (error) {
      console.error("배송지 수정 실패 - ", error);
    }
  };

  /* fetch - 현재 카트 배송지 업데이트 */
  const fetchUpdateCurrentCartShipping = async (id: number) => {
    try {
      await updateCurrentCartShipping(id);
    } catch (error) {
      console.error("배송지 업데이트 실패 - ", error);
    }
  };

  /* fetch - 현재 배송지 조회 */
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

  /* fetch - 전체 배송지 조회 */
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
      {shippingInfos ? (
        <div>
          <ShippingItemList
            shippingInfos={shippingInfos}
            currentShippingId={currentShippingId}
            onSelect={handleSelectShipping}
            openUpdateModal={openUpdateModal}
            openDeleteModal={openDeleteModal}
          />

          <div className="mt-6">
            <FormInput
              name="deliveryNote"
              label="배송 요청사항"
              placeholder="배송 요청사항을 입력해주세요."
              onChange={(e) => setDeliveryNote(e.target.value)}
              value={deliveryNote}
            />
          </div>
        </div>
      ) : (
        <ShippingListSkeleton count={2} />
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
