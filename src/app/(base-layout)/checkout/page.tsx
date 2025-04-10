import CheckoutHeader from "@/components/checkout-header";
import CheckoutForm from "./checkout-form";

export default function page() {
  return (
    <div>
      <CheckoutHeader step={2} />
      <CheckoutForm />
    </div>
  );
}
