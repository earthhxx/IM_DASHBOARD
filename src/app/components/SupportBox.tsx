// SupportBox.tsx
"use client";

import React from "react";

const Box: React.FC<{ label?: string }> = ({ label }) => (
    <div className="w-10 h-14 bg-yellow-300 border border-yellow-600 rounded-sm shadow-md flex items-center justify-center text-xs font-bold text-gray-800">
        {label || "BOX"}
    </div>
);

const ShelfRow: React.FC<{ row: number }> = ({ row }) => (
    <div className="flex justify-center gap-2 mb-2">
        {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i} label={`B${row}-${i + 1}`} />
        ))}
    </div>
);

const SupportBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center rounded-xl shadow-lg">
            <div className="flex flex-col gap-3 bg-gradient-to-r from-gray-200 to-white border border-gray-400 p-4 rounded-2xl ">
                {/* 6 ชั้นวางกล่อง */}
                <div className="bg-gray-400 p-2 border-gray-600 rounded-sm">
                    <ShelfRow row={6} />
                </div>

                <ShelfRow row={5} />
                <ShelfRow row={4} />
                <ShelfRow row={3} />
                <ShelfRow row={2} />
                <ShelfRow row={1} />
            </div>
            {/* ล้อชั้นวาง */}
            <div className="flex justify-between w-full px-8 mt-4">
                <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md" />
                <div className="w-5 h-5 bg-gray-700 rounded-full shadow-md" />
            </div>
        </div>
    );
};

export default SupportBox;
