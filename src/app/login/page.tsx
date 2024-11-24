import MobileLogin from "./mobile-login";
import DesktopLogin from "./desktop-login";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isMobile = cookieStore.get("isMobile")?.value === "true";

  console.log("🎃 LoginPage - isMobile? ", isMobile);
  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}
