"use client";

import React, { useEffect, useState } from "react";

type shelfSqueegeeProps = {
  activeNumber?: number;
};

const shelfSqueegee: React.FC<shelfSqueegeeProps> = ({ activeNumber }) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto flex justify-center items-center">
      {/* โครงตู้ */}
      <div className="relative bg-gray-100 border-4 border-gray-500 rounded-xl shadow-2xl p-4 w-full max-w-2xl">
        {/* 5 ชั้นวาง */}
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3, 4].map((rowIndex) => {
            const start = rowIndex * 10 + 1;

            return (
              <div
                key={rowIndex}
                className="relative w-full h-[80px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center"
              >
                {/* แถบฐานของชั้น */}
                <div className="absolute bottom-0 h-[4px] w-[90%] bg-blue-800 rounded-full m-1.5" />

                {/* กล่องแต่ละช่อง */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const number = start + i;
                  const isActive = activeNumber === number;

                  return (
                    <div
                      key={number}
                      className="absolute bottom-[10px]"
                      style={{
                        left: `${(i + 0.5) * 9}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="ms-10 text-center text-xs font-semibold text-gray-700">
                        {number}
                      </div>
                      <div
                        className="relative ms-10 w-0 h-0"
                        style={{
                          borderLeft: "10px solid transparent",
                          borderRight: "10px solid transparent",
                          borderBottom: `16px solid ${
                            isActive && blink ? "#f87171" : "#4B5563"
                          }`,
                        }}
                      >
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-1.5 h-1.5 rounded-full bg-gray-200 shadow-md" />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* ขาตู้ + ล้อ */}
        <div className="absolute -bottom-8 left-0 w-full px-6 flex justify-between ">
          <div className="w-5 h-5 bg-gray-800 rounded-full shadow-md" />
          <div className="w-5 h-5 bg-gray-800 rounded-full shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default shelfSqueegee;
