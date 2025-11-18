import React from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = "info",
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    info: "border-blue-500",
    warning: "border-yellow-500",
    error: "border-red-500",
    success: "border-green-500",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border-t-4 ${typeStyles[type]}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="text-gray-600 mb-6">{children}</div>

          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant={type === "error" ? "danger" : "primary"}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
