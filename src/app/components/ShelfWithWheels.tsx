"use client";

import React from "react";

type ShelfWithWheelsProps = {
  visible?: boolean;
  label?: string;
  highlightedNumbers?: number[]; // เพิ่ม prop นี้
};

const ShelfWithWheels: React.FC<ShelfWithWheelsProps> = ({
  visible = true,
  label,
  highlightedNumbers = [], // default empty array
}) => {
  if (!visible) return null;

  const renderVerticalSticks = (start: number) =>
    Array.from({ length: 25 }, (_, i) => {
      const number = start + i;
      const isHighlighted = highlightedNumbers.includes(number);

      return (
        <div
          key={number}
          className={`w-full h-full border text-[8px] text-center flex items-center justify-center
            ${isHighlighted
              ? "bg-yellow-300 text-white animate-pulse border-yellow-400"
              : "bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 text-black border-white"
            }`}
        >
          {number}
        </div>
      );
    });

  const renderSquareSlot = (start: number) => (
    <div className="w-full h-full border border-gray-500 rounded-md shadow-inner bg-gray-100 flex">
      {renderVerticalSticks(start)}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
      )}

      {/* ชั้นวางหลักแบบจัตุรัส */}
      <div className="w-204 h-124 grid grid-cols-2 gap-2 p-2 bg-white border-2 border-gray-600 rounded-md shadow-lg">
        {renderSquareSlot(1)}
        {renderSquareSlot(26)}
        {renderSquareSlot(51)}
        {renderSquareSlot(76)}
      </div>

      {/* ล้อซ้ายขวา */}
      <div className="flex justify-between w-full px-8 mt-2 mb-4">
        <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
        <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
      </div>
    </div>
  );
};

export default ShelfWithWheels;
