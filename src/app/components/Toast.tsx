"use client";

import React from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
    <div className="flex items-center max-w-xs p-4 mb-4 bg-white border border-blue-300 rounded-lg shadow-md text-gray-800">
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
        />
      </svg>
      <div className="font-bold text-green-700">คุณเลือก:</div>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ms-auto bg-white p-1 rounded-lg hover:bg-gray-100 hover:text-gray-900 text-gray-400"
        onClick={onClose}
        aria-label="Close Toast"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default Toast;
