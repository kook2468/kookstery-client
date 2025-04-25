import { ShippingAddress } from "@/types/shipping-address";
import ShippingItem from "./shipping-item";

interface ShippingItemListProps {
  shippingInfos: ShippingAddress[] | undefined;
  currentShippingId: number | undefined;
  onSelect: (id: number) => void;
  openUpdateModal: (shippingInfo: ShippingAddress) => void;
  openDeleteModal: (id: number) => void;
}
export default function ShippingItemList({
  shippingInfos,
  currentShippingId,
  onSelect,
  openUpdateModal,
  openDeleteModal,
}: ShippingItemListProps) {
  return (
    <div>
      {shippingInfos &&
        shippingInfos.length > 0 &&
        shippingInfos.map((shippingInfo, index) => (
          <div key={shippingInfo.id}>
            <ShippingItem
              shippingInfo={shippingInfo}
              currentShippingInfo={
                currentShippingId
                  ? shippingInfo.id === currentShippingId
                  : shippingInfo.isDefault
              }
              onSelect={onSelect}
              openUpdateModal={openUpdateModal}
              openDeleteModal={openDeleteModal}
            />
            {index < shippingInfos.length - 1 && (
              <hr className="my-4 w-11/12 mx-auto" />
            )}
          </div>
        ))}
    </div>
  );
}
