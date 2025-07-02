"use client";

import React, { useState, useEffect } from "react";

type BoxProps = {
  startNumber: number;
  active?: boolean;
  blink?: boolean;
};

const Box: React.FC<BoxProps> = ({ startNumber, active, blink }) => {
  const endNumber = startNumber + 1;
  const label = `${startNumber}-${endNumber}`;
  return (
    <div
      className={`w-15 h-11 border rounded-sm shadow-md flex items-center justify-center text-xs font-bold text-gray-800
        ${active ? (blink ? "bg-yellow-300" : "bg-yellow-300-red-300") : "bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 text-black border-white"}
      `}
    >
      {label}
    </div>
  );
};

type ShelfRowProps = {
  row: number;
  startNumber: number; // จุดเริ่มของแถวนี้
  activeNumber?: number;
  blink?: boolean;
};

const ShelfRow: React.FC<ShelfRowProps> = ({ row, startNumber, activeNumber, blink }) => (
  <div className="flex justify-center gap-6 mb-2">
    {Array.from({ length: 8 }).map((_, i) => {
      const boxStart = startNumber + i * 2;
      const isActive = activeNumber === boxStart || activeNumber === boxStart + 1;
      return (
        <Box key={boxStart} startNumber={boxStart} active={isActive} blink={blink} />
      );
    })}
  </div>
);

type SupportBoxProps = {
  activeNumber?: string; // ตัวอย่าง "C43" หรือ "A120"
};

const SupportBox: React.FC<SupportBoxProps> = ({ activeNumber }) => {
  const [blink, setBlink] = useState(true);
  const [numonly, setNumonly] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeNumber) {
      const match = activeNumber.match(/\d+/);
      setNumonly(match ? parseInt(match[0], 10) : null);
    }
  }, [activeNumber]);

  return (
    <div className="flex flex-col items-center rounded-xl ">
      <div className="flex flex-col gap-3 bg-gradient-to-r from-gray-200 to-white border border-gray-400 p-4 rounded-2xl h-126 w-190">
        {/* 6 ชั้นวางกล่อง = 6 แถว * 8 ช่อง = 48 ช่อง → 96 หมายเลข */}
        {[6, 5, 4, 3, 2, 1].map((row, index) => (
          <div key={row} className="bg-gray-400/40 p-2 border-gray-600 rounded-sm">
            <ShelfRow
              row={row}
              startNumber={index * 16 + 1} // แต่ละแถวมี 8 ช่อง * 2 เลข = 16
              activeNumber={numonly || undefined}
              blink={blink}
            />
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
