"use client";
import React from "react";

type DepartmentChecksheetDetailsProps = {
  department: string;
  data: any[];
  setSelectedDept: (value: string) => void;
  type: "overdue" | "ongoing";
  month: number;  // เพิ่มตรงนี้
  year: number;   // เพิ่มตรงนี้
};


const DepartmentChecksheetDetails: React.FC<DepartmentChecksheetDetailsProps> = ({
  department,
  data,
  setSelectedDept,
  type,
  month,
  year,
}) => {
  const filtered = data.filter((item) => item.Department === department);

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const today = now.getDate();

  const displayMonth = month || currentMonth;
  const displayYear = year || currentYear;

  const isCurrentMonth = displayMonth === currentMonth && displayYear === currentYear;
  const lastDay = new Date(displayYear, displayMonth, 0).getDate();
  const loopUntil = isCurrentMonth ? today : lastDay;

  const getDaysInMonth = (m: number, y: number) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(displayMonth, displayYear) }, (_, i) => i + 1);

  const getRelevantDates = (item: any, type: "overdue" | "ongoing"): number[] => {
    const dates: number[] = [];
    for (let i = 1; i <= loopUntil; i++) {
      const val = item[`Date${i}`];
      if (type === "ongoing") {
        if (i === today && val === "0") dates.push(i);
      }
      if (type === "overdue") {
        if (val === "0") dates.push(i);
      }
    }
    return dates;
  };




  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[10px] bg-opacity-40 z-50 flex items-center justify-center">
      <div className="relative bg-white max-w-4xl w-full p-6 rounded-lg shadow-xl overflow-auto">
        <button
          onClick={() => setSelectedDept("")}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        <h2
          className={`text-2xl font-bold mb-4 text-center ${type === "overdue" ? "text-red-600" : "text-yellow-600"
            }`}
        >
          {type === "overdue" ? "🔴 รายการค้างตรวจ" : "⏳ รายการกำลังตรวจ"} แผนก {department} ({filtered.length} รายการ)
        </h2>

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">
            ✅ ไม่มี{type === "overdue" ? "รายการค้างตรวจ" : "รายการ ongoing"}ของแผนก {department}
          </div>
        ) : (
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Form Name</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Progress</th>
                {days.map((day) => (
                  <th key={day} className="p-2 border text-sm text-gray-600 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border font-medium text-gray-800">{item.FormName}</td>
                  <td className="p-2 border text-gray-600">{item.Status}</td>
                  <td className="p-2 border text-gray-600">{item.Progress}%</td>
                  {days.map((day) => {
                    const val = item[`Date${day}`];
                    const isToday = isCurrentMonth && day === today;

                    const isOverdue = val === "0" && day < loopUntil;

                    return (
                      <td key={day} className="p-1 border text-center relative">
                        {/* 🔶 ไฮไลต์วันปัจจุบัน */}
                        {isToday && (
                          <div className="absolute inset-0 bg-yellow-200/70 z-0 animate-pulse" />
                        )}

                        <span className={`relative z-10 ${isOverdue ? "text-red-600 font-bold" : ""}`}>
                          {val === "0" && isOverdue
                            ? "✕"
                            : val === "1"
                              ? "✔"
                              : val === "-"
                                ? "–"
                                : ""}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DepartmentChecksheetDetails;
