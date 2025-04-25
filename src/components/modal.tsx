import Image from "next/image";
import { useEffect, useState } from "react";

type CommonModalProps = {
  isOpen?: boolean;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export default function Modal({
  isOpen = false,
  title,
  children,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}: CommonModalProps) {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onConfirm) {
      setIsLoading(true);
      console.log("isLoading?", isLoading);
      try {
        await onConfirm();
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {isLoading && (
          <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-100">
            <Image
              className="rounded-lg w-full max-w-md p-6 relative"
              src="/icon/spinner.svg"
              width={70}
              height={70}
              alt="spinner"
            />
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="mb-6">{children}</div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 btn-primary !px-4 py-2 !rounded text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
