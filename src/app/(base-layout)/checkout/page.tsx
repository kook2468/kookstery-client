import CheckoutHeader from "@/components/checkout-header";
import CheckoutOrdererInfo from "./checkout-orderer-info";
import CheckoutShippingForm from "./checkout-shipping-form";
import CheckoutPaymentInfo from "./checkout-payment-info";
import CheckoutOrderItems from "./checkout-order-items";

export default function page() {
  return (
    <div>
      <CheckoutHeader step={2} />
      <div className="flex flex-col gap-20 pt-6 md:flex-row">
        <div className="w-full md:w-2/3">
          <CheckoutOrdererInfo />
          <CheckoutShippingForm />
          <CheckoutOrderItems />
        </div>
        <div className="w-full md:w-1/3">
          <CheckoutPaymentInfo />
        </div>
      </div>
    </div>
  );
}
