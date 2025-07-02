"use client";

import React, { useState, useEffect } from "react";

type BoxProps = {
  label?: string;
  active?: boolean;
  blink?: boolean;
};

const Box: React.FC<BoxProps> = ({ label, active, blink }) => {
  return (
    <div
      className={`w-10 h-14 border rounded-sm shadow-md flex items-center justify-center text-xs font-bold text-gray-800
        ${active ? (blink ? "bg-red-400" : "bg-red-300") : "bg-yellow-300 border-yellow-600"}
      `}
    >
      {label || "BOX"}
    </div>
  );
};

type ShelfRowProps = {
  row: number;
  activeNumber?: string;
  blink?: boolean;
};

const ShelfRow: React.FC<ShelfRowProps> = ({ row, activeNumber, blink }) => (
  <div className="flex justify-center gap-2 mb-2">
    {Array.from({ length: 8 }).map((_, i) => {
      const label = `B${row}-${i + 1}`;
      const isActive = activeNumber === label;
      return <Box key={label} label={label} active={isActive} blink={blink} />;
    })}
  </div>
);

type SupportBoxProps = {
  activeNumber?: string; // ตัวอย่าง: "B3-5"
};

const SupportBox: React.FC<SupportBoxProps> = ({ activeNumber }) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center rounded-xl ">
      <div className="flex flex-col gap-3 bg-gradient-to-r from-gray-200 to-white border border-gray-400 p-4 rounded-2xl ">
        {/* 6 ชั้นวางกล่อง */}
        {[6, 5, 4, 3, 2, 1].map((row) => (
          <div key={row} className="bg-gray-400/40 p-2 border-gray-600 rounded-sm">
            <ShelfRow row={row} activeNumber={activeNumber} blink={blink} />
          </div>
        ))}
      </div>
      {/* ล้อชั้นวาง */}
      <div className="flex justify-between w-full px-8 mt-2">
        <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md" />
        <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md" />
      </div>
    </div>
  );
};

export default SupportBox;
