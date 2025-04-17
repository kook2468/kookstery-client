import { KookCoin } from "@/types/kook-coin";
import { Response } from "@/types/response";
import { fetcher } from "@/utils/fetcher";

/* 보유 쿡코인 조회 */
export async function getUserKookCoin(): Promise<Response<KookCoin>> {
  return fetcher<KookCoin>({
    urn: "/kook-coin",
    hasOption: true,
    method: "GET",
  });
}
