// Checkout 단계 Enum
enum CheckoutStep {
  CART = 1,
  ORDER_PAYMENT,
  ORDER_COMPLETE,
}

// 단계별 라벨 매핑
const stepLabels: Record<CheckoutStep, string> = {
  [CheckoutStep.CART]: "장바구니",
  [CheckoutStep.ORDER_PAYMENT]: "주문/결제",
  [CheckoutStep.ORDER_COMPLETE]: "주문완료",
};

interface CheckoutProps {
  step: CheckoutStep;
}

export default function CheckoutHeader({ step }: CheckoutProps) {
  const stepIds = Object.keys(stepLabels).map(Number) as CheckoutStep[];

  return (
    <div className="flex justify-between pb-3 pt-7 border-b-2 border-black">
      <h1 className="text-2xl font-medium">{stepLabels[step]}</h1>
      <div>
        <ul className="flex gap-4">
          {Object.values(CheckoutStep).map((key) => {
            const id = Number(key) as CheckoutStep;
            if (!id) return null;
            return (
              <li
                key={id}
                className="text-gray-600"
                style={{ fontWeight: step === id ? "bold" : "normal" }}
              >
                {id}
                &nbsp;
                {stepLabels[id]}
                &nbsp; &nbsp;
                {id !== stepIds.length && ">"}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
