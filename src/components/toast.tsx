import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  type: string;
}

export default function Toast({ message, type = "error" }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  //const toastRef = useRef<HTMLElement>(null);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsVisible(false);
  //     }, 3000); //3초 후 토스트 메세지 사라짐

  //     return () => clearTimeout(timer); //타이머 클린업
  //   }, []);

  return createPortal(
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
        type === "error" ? "bg-danger" : "bg-green-500"
      }`}
    >
      {message}
    </div>,
    document.getElementById("toast-root") as HTMLElement
  );
}
