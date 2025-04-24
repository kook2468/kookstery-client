import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import FormInput from "./form-input";
import { ShippingAddress } from "@/types/shipping-address";
import PostCode from "react-daum-postcode";

// ref로 노출할 메서드 타입
export type ShippingEditFormHandle = {
  getValue: () => ShippingAddress;
};

interface ShippingEditFormProps {
  defaultValue: ShippingAddress;
  //openPostModal: (_: React.MouseEvent<HTMLButtonElement>) => void;
}

const ShippingEditForm = forwardRef<
  ShippingEditFormHandle,
  ShippingEditFormProps
>((props, ref) => {
  const { defaultValue } = props;
  const [form, setForm] = useState(defaultValue);
  const [showPostModal, setShowPostModal] = useState(false);

  useImperativeHandle(ref, () => ({ getValue: () => form }));

  /* 우편번호 모달 */
  const openPostModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
  };

  const handleComplete = async (data: any) => {
    const {
      address,
      addressType,
      bname,
      buildingName,
      zonecode,
      sido,
      sigungu,
    } = data;
    let fullAddress = address;
    let extraAddress = "";

    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

      setForm((prev) => {
        if (!prev) return prev; // 혹은 null 그대로 반환

        return {
          ...prev,
          addressStreet: fullAddress,
          postalCode: zonecode,
          city: sido,
          state: sigungu,
        };
      });

      closePostModal();
    }
  };

  return (
    <div>
      <FormInput
        name="shipping-name"
        label="배송지명"
        placeholder="배송지명 입력"
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        value={form.name}
      />

      <FormInput
        name="shipping-username"
        label="수신자"
        placeholder="배송 받을 사람 입력"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, receiverName: e.target.value }))
        }
        value={form.receiverName}
      />

      <FormInput
        name="shipping-phone"
        label="전화번호"
        placeholder="'-'빼고 숫자만 입력"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, receiverPhone: e.target.value }))
        }
        value={form.receiverPhone}
      />

      <div className="flex gap-x-2">
        <FormInput
          name="shipping-zonecode"
          label="배송주소"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, postalCode: e.target.value }))
          }
          value={form.postalCode}
          placeholder="우편번호"
        />

        <button
          className="btn btn-light h-12 !rounded-none relative top-[45px]"
          onClick={openPostModal}
        >
          주소 검색
        </button>
      </div>

      <div className="mt-[-20px] mb-[-10px]">
        <FormInput
          name="shipping-address"
          label=""
          onChange={(e) =>
            setForm((prev) => ({ ...prev, addressStreet: e.target.value }))
          }
          value={form.addressStreet}
          disabled={true}
        />
      </div>

      <FormInput
        type="string"
        name="shipping-address-detail"
        label=""
        onChange={(e) =>
          setForm((prev) => ({ ...prev, addressDetail: e.target.value }))
        }
        value={form.addressDetail}
        placeholder="상세주소 입력"
      />

      {/* Daum 우편번호 검색 모달 */}
      {showPostModal && (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bnb_md_xl:max-w-[600px] bnb_sm:max-w-[85%] z-[1000]">
          <div onClick={() => setShowPostModal(false)} className="pb-8">
            <span className="float-right text-xl font-bold">X</span>
          </div>
          <PostCode onComplete={handleComplete} className="border" />
        </div>
      )}
    </div>
  );
});

export default ShippingEditForm;
