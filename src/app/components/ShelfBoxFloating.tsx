// src/components/ShelfBoxFloating.tsx
import React from "react";

type Props = {
  shelfchoose: string;
  onResult?: (data: any) => void;
  onClose?: () => void; // ปุ่มปิดจะเรียก onClose
};

const ShelfBoxFloating: React.FC<Props> = ({ shelfchoose, onResult, onClose }) => {
  const handleClick = async (num1: number, num2: number) => {
    try {
      const res = await fetch(`/api/Toolingfinding/shelf?parameter=${shelfchoose}&num1=${num1}&num2=${num2}`);
      const data = await res.json();
      
      console.log("Fetched:", data);
      onResult?.(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-700 p-6 w-80 h-80 grid grid-cols-2 grid-rows-2 gap-4">
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center"
          onClick={() => handleClick(1, 25)}
        >
          1–25
        </button>
        <button
          className="bg-green-400 hover:bg-green-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center"
          onClick={() => handleClick(26, 50)}
        >
          26–50
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center"
          onClick={() => handleClick(51, 75)}
        >
          51–75
        </button>
        <button
          className="bg-red-400 hover:bg-red-600 text-white text-lg font-semibold rounded-lg flex items-center justify-center"
          onClick={() => handleClick(76, 100)}
        >
          76–100
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-6 px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-800 text-white font-medium"
      >
        Close
      </button>
    </div>
  );
};

export default ShelfBoxFloating;
