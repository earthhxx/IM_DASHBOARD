"use client";

import React, { useEffect, useState } from "react";

type ShelfWithJigsProps = {
    activeNumber?: number;
};

const ShelfWithJigs: React.FC<ShelfWithJigsProps> = ({ activeNumber }) => {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 w-full">
              <div className="relative w-full h-[120px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center">
                {/* ฐานสีน้ำเงิน */}
                <div className="absolute bottom-0 h-[6px] w-[90%] bg-blue-800 rounded-full m-2" />

                {/* สามเหลี่ยม + วงกลม + หมายเลข */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const number = i + 1;
                    const isActive = activeNumber === number;
                    return (
                        <div
                            key={number}
                            className="absolute bottom-[16px]"
                            style={{
                                left: `${(number - 0.5) * 9}%`, // 10 ตำแหน่งกระจายเต็ม
                                transform: "translateX(-50%)",
                            }}
                        >
                            {/* หมายเลข */}
                            <div className="ms-11   text-center text-sm font-semibold text-gray-700">
                                {number}
                            </div>
                            {/* สามเหลี่ยม */}
                            <div
                                className="relative ms-11  w-0 h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${isActive && blink ? "#f87171" : "#4B5563"
                                        }`,
                                }}
                            >
                                {/* วงกลม */}
                                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-gray-200 shadow-md flex items-center justify-center text-[10px] font-bold text-gray-700" />
                            </div>


                        </div>
                    );
                })}
            </div>
              <div className="relative w-full h-[120px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center">
                {/* ฐานสีน้ำเงิน */}
                <div className="absolute bottom-0 h-[6px] w-[90%] bg-blue-800 rounded-full m-2" />

                {/* สามเหลี่ยม + วงกลม + หมายเลข */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const number = i + 1;
                    const isActive = activeNumber === number;
                    return (
                        <div
                            key={number}
                            className="absolute bottom-[16px]"
                            style={{
                                left: `${(number - 0.5) * 9}%`, // 10 ตำแหน่งกระจายเต็ม
                                transform: "translateX(-50%)",
                            }}
                        >
                            {/* หมายเลข */}
                            <div className="ms-11   text-center text-sm font-semibold text-gray-700">
                                {number}
                            </div>
                            {/* สามเหลี่ยม */}
                            <div
                                className="relative ms-11  w-0 h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${isActive && blink ? "#f87171" : "#4B5563"
                                        }`,
                                }}
                            >
                                {/* วงกลม */}
                                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-gray-200 shadow-md flex items-center justify-center text-[10px] font-bold text-gray-700" />
                            </div>


                        </div>
                    );
                })}
            </div>
              <div className="relative w-full h-[120px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center">
                {/* ฐานสีน้ำเงิน */}
                <div className="absolute bottom-0 h-[6px] w-[90%] bg-blue-800 rounded-full m-2" />

                {/* สามเหลี่ยม + วงกลม + หมายเลข */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const number = i + 1;
                    const isActive = activeNumber === number;
                    return (
                        <div
                            key={number}
                            className="absolute bottom-[16px]"
                            style={{
                                left: `${(number - 0.5) * 9}%`, // 10 ตำแหน่งกระจายเต็ม
                                transform: "translateX(-50%)",
                            }}
                        >
                            {/* หมายเลข */}
                            <div className="ms-11   text-center text-sm font-semibold text-gray-700">
                                {number}
                            </div>
                            {/* สามเหลี่ยม */}
                            <div
                                className="relative ms-11  w-0 h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${isActive && blink ? "#f87171" : "#4B5563"
                                        }`,
                                }}
                            >
                                {/* วงกลม */}
                                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-gray-200 shadow-md flex items-center justify-center text-[10px] font-bold text-gray-700" />
                            </div>


                        </div>
                    );
                })}
            </div>
              <div className="relative w-full h-[120px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center">
                {/* ฐานสีน้ำเงิน */}
                <div className="absolute bottom-0 h-[6px] w-[90%] bg-blue-800 rounded-full m-2" />

                {/* สามเหลี่ยม + วงกลม + หมายเลข */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const number = i + 1;
                    const isActive = activeNumber === number;
                    return (
                        <div
                            key={number}
                            className="absolute bottom-[16px]"
                            style={{
                                left: `${(number - 0.5) * 9}%`, // 10 ตำแหน่งกระจายเต็ม
                                transform: "translateX(-50%)",
                            }}
                        >
                            {/* หมายเลข */}
                            <div className="ms-11   text-center text-sm font-semibold text-gray-700">
                                {number}
                            </div>
                            {/* สามเหลี่ยม */}
                            <div
                                className="relative ms-11  w-0 h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${isActive && blink ? "#f87171" : "#4B5563"
                                        }`,
                                }}
                            >
                                {/* วงกลม */}
                                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-gray-200 shadow-md flex items-center justify-center text-[10px] font-bold text-gray-700" />
                            </div>


                        </div>
                    );
                })}
            </div>
            
        
            <div className="relative w-full h-[120px] bg-white border border-gray-400 rounded-md shadow-inner flex items-end justify-center">
                {/* ฐานสีน้ำเงิน */}
                <div className="absolute bottom-0 h-[6px] w-[90%] bg-blue-800 rounded-full m-2" />

                {/* สามเหลี่ยม + วงกลม + หมายเลข */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const number = i + 1;
                    const isActive = activeNumber === number;
                    return (
                        <div
                            key={number}
                            className="absolute bottom-[16px]"
                            style={{
                                left: `${(number - 0.5) * 9}%`, // 10 ตำแหน่งกระจายเต็ม
                                transform: "translateX(-50%)",
                            }}
                        >
                            {/* หมายเลข */}
                            <div className="ms-11   text-center text-sm font-semibold text-gray-700">
                                {number}
                            </div>
                            {/* สามเหลี่ยม */}
                            <div
                                className="relative ms-11  w-0 h-0"
                                style={{
                                    borderLeft: "12px solid transparent",
                                    borderRight: "12px solid transparent",
                                    borderBottom: `20px solid ${isActive && blink ? "#f87171" : "#4B5563"
                                        }`,
                                }}
                            >
                                {/* วงกลม */}
                                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-gray-200 shadow-md flex items-center justify-center text-[10px] font-bold text-gray-700" />
                            </div>


                        </div>
                    );
                })}
            </div>

            {/* ล้อด้านล่าง */}
            <div className="flex justify-between w-full px-12 mt-4">
                <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
                <div className="w-4 h-4 bg-gray-700 rounded-full shadow-md" />
            </div>
        </div>
    );
};

export default ShelfWithJigs;
