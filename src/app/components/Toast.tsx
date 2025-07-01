import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // ปิดอัตโนมัติใน 3 วิ
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in-up">
      <div className="flex items-center gap-2 max-w-sm p-4 text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto bg-white/10 hover:bg-white/20 rounded-full p-1"
        >
          <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
              1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
              1.414L10 11.414l-4.293 4.293a1 1 0 
              01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 
              010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
