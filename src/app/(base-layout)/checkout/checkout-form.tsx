"use client";

import { FormEvent } from "react";
import CheckoutOrderItems from "./checkout-order-items";
import CheckoutOrdererInfo from "./checkout-orderer-info";
import CheckoutPaymentInfo from "./checkout-payment-info";
import CheckoutShippingForm from "./checkout-shipping-form";
import { confirmOrder } from "@/actions/order.action";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  /* 주문 확정 버튼 클릭 */
  const handleConfirmOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const deliveryNotes = formData.get("deliveryNote") as string | null; //배송 요청사항
    fetchConfirmOrder(deliveryNotes);
  };

  const fetchConfirmOrder = async (deliveryNotes: string | null) => {
    try {
      await confirmOrder(deliveryNotes);
      router.push("/order-confirm?status=success");
    } catch (error) {
      console.error("주문확정에러", error);
      router.push("/order-confirm?status=fail");
    }
  };

  return (
    <form
      onSubmit={handleConfirmOrder}
      className="flex flex-col gap-20 pt-6 md:flex-row"
    >
      <div className="w-full md:w-2/3">
        <CheckoutOrdererInfo />
        <CheckoutShippingForm />
        <CheckoutOrderItems />
      </div>
      <div className="w-full md:w-1/3">
        <CheckoutPaymentInfo />
      </div>
    </form>
  );
}
