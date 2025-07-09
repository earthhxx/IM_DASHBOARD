"use client";
import React, { useState } from "react";
import { RefreshCcw } from "lucide-react"; // ใช้ไอคอนจาก lucide-react (สวยและน้ำหนักดี)

const MonthYearSelector = ({
    currentMonth,
    currentYear,
    onChange,
}: {
    currentMonth: number;
    currentYear: number;
    onChange: (month: number, year: number) => void;
}) => {
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const handleChange = () => {
        onChange(month, year);
    };

    return (
        <div className="flex items-center gap-3 bg-sky-50 text-black rounded-xl shadow-sm px-4 py-2 border border-gray-200">
            {/* Month Selector */}
            <div className="flex flex-col text-xs font-medium ">
                {/* <label htmlFor="month" className="mb-1 ">
          เดือน
        </label> */}
                <select
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                        </option>
                    ))}

                </select>
            </div>

            {/* Year Selector */}
            <div className="flex flex-col text-xs font-medium ">
                {/* <label htmlFor="year" className="mb-1 ">
          ปี
        </label> */}
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {Array.from({ length: 5 }, (_, i) => {
                        const y = new Date().getFullYear() - 2 + i;
                        return (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Refresh Button */}
            <button
                onClick={handleChange}
                className="ml-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center transition-all duration-150"
                title="โหลดข้อมูลใหม่"
            >
                <RefreshCcw size={18} className="animate-spin-slow" />
            </button>
        </div>
    );
};

export default MonthYearSelector;
