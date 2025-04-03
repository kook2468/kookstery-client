"use client";
import { useAuth } from "@/context/auth.context";
import CheckoutSection from "./checkout-section";

export default function CheckoutOrdererInfo() {
  const { user, loading } = useAuth();
  console.log(user);
  return (
    <CheckoutSection title="주문자 정보">
      <div className="flex justify-between">
        <OrdererInfoBox label="주문자" value={user?.username} />
        <OrdererInfoBox label="연락처" value={user?.phone} />
        <OrdererInfoBox label="이메일" value={user?.email} />
      </div>
    </CheckoutSection>
  );
}

const OrdererInfoBox = ({ label, value }: OrdererInfoBox) => {
  return (
    <div>
      <h3 className="text-sm pb-2 text-gray-600">{label}</h3>
      <p>{value}</p>
    </div>
  );
};

type OrdererInfoBox = {
  label: string;
  value: string | undefined;
};
