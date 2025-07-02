"use client";

import React, { useEffect, useState } from "react";

type ShelfWithJigsProps = {
  activeNumber?: number;
};

const ShelfWithJigs: React.FC<ShelfWithJigsProps> = ({ activeNumber }) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-gray-200 to-white border border-gray-400 p-4 rounded-lg shadow-2xl max-w-3xl mx-auto">
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className="w-full bg-white border border-gray-400 rounded-md shadow-inner flex items-center justify-center gap-4 p-2"
          >
            {[0, 1, 2].map((col) => {
              const jigNumber = row * 3 + col + 1;
              const isBlinking = activeNumber === jigNumber && blink;

              return (
                <div
                  key={jigNumber}
                  className={`relative w-[120px] h-[70px] border-gray-600 rounded-sm transition-all duration-200 ${
                    isBlinking ? "bg-red-300" : "bg-white"
                  }`}
                >
                  {/* เส้นแบ่ง */}
                  <div className="absolute top-[20%] left-0 right-0 h-[4px] bg-gray-500 rounded-4xl" />
                  <div className="absolute top-[49%] left-0 right-0 h-[4px] bg-amber-100 shadow-inner rounded-4xl" />
                  <div className="absolute top-[66%] left-0 right-0 h-[4px] bg-gray-500 rounded-4xl" />
                  <div className="absolute top-[100%] left-0 right-0 h-[4px] bg-gray-500 rounded-4xl" />

                  {/* ขา JIG ด้านล่าง */}
                  <div className="absolute bottom-0 left-2 w-2 h-8 bg-gray-600" />
                  <div className="absolute bottom-0 right-2 w-2 h-8 bg-gray-600" />
                  <div className="absolute bottom-0 left-10 w-1.5 h-6 bg-gray-600" />
                  <div className="absolute bottom-0 left-12 w-1.5 h-6 bg-gray-600" />
                  <div className="absolute bottom-0 right-12 w-1.5 h-6 bg-gray-600" />
                  <div className="absolute bottom-0 right-10 w-1.5 h-6 bg-gray-600" />
                  <div className="absolute bottom-9 left-2 w-2 h-4 bg-gray-600" />
                  <div className="absolute bottom-9 right-2 w-2 h-4 bg-gray-600" />

                  {/* ชื่อ JIG */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-800">
                      JIG ICT {jigNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

   
    </div>
  );
};

export default ShelfWithJigs;
