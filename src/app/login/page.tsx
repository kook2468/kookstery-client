import { getIsMobile } from "@/utils/utils";
import MobileLogin from "./mobile-login";
import DesktopLogin from "./desktop-login";

export default function LoginPage() {
  return getIsMobile() ? <MobileLogin /> : <DesktopLogin />;
}
