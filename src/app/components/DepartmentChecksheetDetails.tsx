"use client";
import React from "react";

type DepartmentChecksheetDetailsProps = {
  department: string;
  data: any[];
  setSelectedDept: (value: string) => void;
  type: "overdue" | "ongoing";
  month: number;
  year: number;
};

const DepartmentChecksheetDetails: React.FC<DepartmentChecksheetDetailsProps> = ({
  department,
  data,
  setSelectedDept,
  type,
  month,
  year,
}) => {
  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const displayMonth = month || currentMonth;
  const displayYear = year || currentYear;
  const isCurrentMonth = displayMonth === currentMonth && displayYear === currentYear;
  const lastDay = new Date(displayYear, displayMonth, 0).getDate();
  const loopUntil = isCurrentMonth ? today : lastDay;

  const filtered = data.filter((item) => item.Department === department);
  const days = Array.from({ length: lastDay }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-6">
      <div className="relative w-full max-w-[95vw] max-h-[90vh] rounded-xl shadow-2xl bg-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDept("")}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header */}
        <div
          className={`text-center text-xl md:text-2xl font-bold py-4 border-b bg-white ${type === "overdue" ? "text-red-600" : "text-yellow-600"
            } select-none`}
        >
          {type === "overdue" ? "🔴 รายการค้างตรวจ" : "⏳ รายการกำลังตรวจ"} - แผนก {department} (
          {filtered.length} รายการ)
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[75vh] px-4 pb-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
              ✅ ไม่มี{type === "overdue" ? "รายการค้างตรวจ" : "รายการ ongoing"}ของแผนก {department}
            </div>
          ) : (
            <table className="table-auto w-full border-separate border-spacing-0 text-sm md:text-base text-gray-700">
              <thead className="sticky top-0 z-20 shadow bg-blue-50/80 backdrop-blur-sm">
                <tr>
                  <th className="p-2 border border-gray-300 bg-blue-100 left-0 z-30 text-left font-semibold">
                    #
                  </th>
                  <th className="p-2 border border-gray-300 bg-blue-100 left-[50px] z-30 text-left font-semibold min-w-[220px]">
                    แบบฟอร์ม
                  </th>
                  <th className="p-2 border border-gray-300 font-semibold">สถานะ</th>
                  <th className="p-2 border border-gray-300 font-semibold">ความคืบหน้า</th>
                  {days.map((day) => {
                    const isToday = isCurrentMonth && day === today;
                    const isHoliday = filtered.some((item) => item[`Date${day}`] === "2" && ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay)));

                    return (
                      <th
                        key={day}
                        className={`border border-gray-300 p-2 text-center text-xs font-medium text-gray-600 select-none relative ${isToday ? "animate-pulse bg-yellow-200/60" : ""
                          } ${isHoliday ? "bg-gray-400/60 animate-pulse" : ""}`}
                        title={`วันที่ ${day}`}
                      >
                        {day}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-blue-50 transition-all duration-150"
                  >
                    {/* Sticky Column 1 - Index */}
                    <td className="p-2 border border-gray-200 left-0 bg-white z-10 text-center font-bold group-hover:bg-blue-50">
                      {index + 1}
                    </td>

                    {/* Sticky Column 2 - Form Name */}
                    <td className="p-2 border border-gray-200 left-[50px] bg-white z-10 truncate group-hover:bg-blue-50">
                      {item.FormName}
                    </td>

                    {/* Normal Columns */}
                    <td className="p-2 border border-gray-200">{item.Status}</td>
                    <td className="p-2 border border-gray-200">{item.Progress}%</td>

                    {days.map((day) => {
                      const val = item[`Date${day}`];
                      const isToday = isCurrentMonth && day === today;
                      const isOverdue = val === "0" && ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay));
                      const isComplete = val === "1" && day <= loopUntil;
                      const isHoliday = val === "2";

                      let symbol = "";
                      if (isOverdue) symbol = "✕";
                      else if (isComplete) symbol = "✔";
                      else if (val === "-") symbol = "–";

                      const bg = isToday
                        ? "bg-yellow-100"
                        : isHoliday
                          ? "bg-gray-200"
                          : "";

                      const color = isOverdue
                        ? "text-red-600 font-bold"
                        : isComplete
                          ? "text-green-600 font-bold"
                          : "text-gray-600";

                      return (
                        <td
                          key={day}
                          className={`p-1 text-center border border-gray-200 min-w-[28px] h-8 ${bg}`}
                          title={`วันที่ ${day}`}
                        >
                          <span className={color}>{symbol}</span>
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
    </div>
  );
};

export default DepartmentChecksheetDetails;
