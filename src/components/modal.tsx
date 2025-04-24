type CommonModalProps = {
  isOpen?: boolean;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
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
            onClick={onConfirm}
            className="flex-1 btn-primary !px-4 py-2 !rounded text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
