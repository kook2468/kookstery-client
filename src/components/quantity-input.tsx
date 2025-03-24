import { useState } from "react";

type QuantityType = "increase" | "decrease";

interface QuantityInputProps {
  id: number;
  initQty: number;
  onQtyChange: (id: number, newQty: number) => void;
}

export default function QuantityInput({
  id,
  initQty,
  onQtyChange,
}: QuantityInputProps) {
  const [qty, setQty] = useState(initQty);
  const minQty = 1;
  const maxQty = 99;
  const handleQuantityButtonClick = (type: QuantityType) => () => {
    if (
      (type == "increase" && qty < maxQty) ||
      (type == "decrease" && qty > minQty)
    ) {
      const newQty = qty + (type === "increase" ? 1 : -1);
      console.log("newQty", newQty);
      setQty(newQty);
      onQtyChange(id, newQty);
    }
  };

  const QuantityButton = ({ type }: { type: QuantityType }) => {
    return (
      <button
        onClick={handleQuantityButtonClick(type)}
        className="border border-gray-400 w-7"
      >
        {type === "increase" ? "+" : "-"}
      </button>
    );
  };
  return (
    <div className="flex items-center">
      <QuantityButton type="decrease"></QuantityButton>
      <input
        value={qty}
        className="w-16 text-center border border-y-gray-400"
        min={minQty}
        max={maxQty}
        readOnly
      ></input>
      <QuantityButton type="increase"></QuantityButton>
    </div>
  );
}
