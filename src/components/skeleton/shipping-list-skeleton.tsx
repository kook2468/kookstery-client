import ShippingRowSkeleton from "./shipping-row-skeleton";

export default function ShippingListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <ShippingRowSkeleton key={`shipping-row-skeleton-${idx}`} />
    ));
}
