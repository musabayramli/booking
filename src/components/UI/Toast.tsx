import React, { useEffect } from "react";

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: "info" | "warning" | "error" | "success";
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  message,
  type = "info",
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    success: "bg-green-500",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg
            className="w-4 h-4"
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
    </div>
  );
};

export default Toast;
