"use client";

import Toast from "@/components/toast";
import React, { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string, type?: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const showToast = (msg: string, toastType: string = "error") => {
    setMessage(msg);
    setType(toastType);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3초 후 토스트 메시지 숨기기
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {isVisible && <Toast message={message} type={type} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
