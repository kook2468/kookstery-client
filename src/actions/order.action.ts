import { Order } from "@/types/order";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

/* 주문 확정 */
export async function confirmOrder(
  deliveryNotes: string | null
): Promise<Response<Order>> {
  return fetcher<Order>({
    method: "POST",
    hasOption: true,
    urn: "/orders",
    body: { deliveryNotes },
  });
}
