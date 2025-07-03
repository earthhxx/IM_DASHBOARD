// src/components/ShelfICTFloating.tsx
import React from "react";

type Props = {
  shelfchoose: string;
  onResult?: (data: any) => void;
};

const ShelfICTFloating: React.FC<Props> = ({ shelfchoose, onResult }) => {
  const handleClick = async (num1: number, num2: number) => {
    try {
      const res = await fetch(
        `/api/Toolingfinding/shelf?parameter=${shelfchoose}&num1=${num1}&num2=${num2}`
      );
      const data = await res.json();

      console.log("Fetched:", data);
      onResult?.(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="grid grid-cols-1 grid-rows-3 gap-2 w-36 h-60 border-2 border-gray-800 bg-white shadow-xl rounded-md p-2">
        <div
          className="bg-blue-100 hover:bg-blue-300 cursor-pointer flex items-center justify-center rounded-md"
          onClick={() => handleClick(1, 25)}
        >
          ชั้น 1 (1–25)
        </div>
        <div
          className="bg-green-100 hover:bg-green-300 cursor-pointer flex items-center justify-center rounded-md"
          onClick={() => handleClick(26, 50)}
        >
          ชั้น 2 (26–50)
        </div>
        <div
          className="bg-yellow-100 hover:bg-yellow-300 cursor-pointer flex items-center justify-center rounded-md"
          onClick={() => handleClick(51, 75)}
        >
          ชั้น 3 (51–75)
        </div>
      </div>
    </div>
  );
};

export default ShelfICTFloating;
