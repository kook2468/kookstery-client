import { isMobileDevice } from "@/utils/deviceUtils";
import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const userAgent = req.headers.get("user-agent") || "";
  const isMobile = isMobileDevice(userAgent);

  // Cookie에 모바일 여부를 저장
  const response = NextResponse.next();
  response.cookies.set("isMobile", String(isMobile));

  console.log("🎃 middleware - isMobile", isMobile);

  return response;
}

export const config = {
  matcher: ["/login"], // /login 경로에만 middleware 적용
};
