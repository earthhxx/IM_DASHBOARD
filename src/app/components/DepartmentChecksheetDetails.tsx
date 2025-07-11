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
      <div className="relative w-full max-w-[95vw] max-h-[90vh] rounded-2xl shadow-2xl bg-white overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDept("")}
          className="absolute top-5 right-5 text-gray-400 hover:text-red-600 text-4xl font-extrabold transition-colors duration-300"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header */}
        <div
          className={`text-center text-2xl font-extrabold py-5 bg-white select-none ${
            type === "overdue" ? "text-red-700" : "text-yellow-700"
          }`}
        >
          {type === "overdue" ? "🔴 รายการค้างตรวจ" : "⏳ รายการกำลังตรวจ"} - แผนก {department} (
          {filtered.length} รายการ)
        </div>

        {/* Table */}
        <div className="overflow-auto flex-grow px-6 pb-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-32 font-medium">
              ✅ ไม่มี{type === "overdue" ? "รายการค้างตรวจ" : "รายการ ongoing"}ของแผนก {department}
            </div>
          ) : (
            <table className="table-auto w-full border-separate border-spacing-0 text-sm md:text-base text-gray-700 rounded-lg">
              <thead className="sticky top-0 z-30 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 backdrop-blur-sm shadow-md">
                <tr>
                  <th className="p-3 border border-gray-300 bg-blue-100 sticky left-0 z-40 text-left font-semibold rounded-l-lg">
                    #
                  </th>
                  <th className="p-3 border border-gray-300 bg-blue-100 sticky left-[50px] z-40 text-left font-semibold min-w-[220px]">
                    แบบฟอร์ม
                  </th>
                  <th className="p-3 border border-gray-300 font-semibold text-center">สถานะ</th>
                  <th className="p-3 border border-gray-300 font-semibold text-center">ความคืบหน้า</th>
                  {days.map((day) => {
                    const isToday = isCurrentMonth && day === today;
                    const isHoliday = filtered.some(
                      (item) =>
                        item[`Date${day}`] === "2" &&
                        ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay))
                    );

                    return (
                      <th
                        key={day}
                        className={`border border-gray-300 p-2 text-center text-xs font-medium text-gray-600 select-none relative ${
                          isToday ? "animate-pulse bg-yellow-200/70" : ""
                        } ${isHoliday ? "bg-gray-300/70 animate-pulse" : ""}`}
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
                    className="group hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                  >
                    {/* Sticky Column 1 - Index */}
                    <td className="p-3 border border-gray-200 sticky left-0 bg-white z-20 text-center font-semibold group-hover:bg-blue-100 select-none">
                      {index + 1}
                    </td>

                    {/* Sticky Column 2 - Form Name */}
                    <td className="p-3 border border-gray-200 sticky left-[50px] bg-white z-20 truncate group-hover:bg-blue-100 select-text">
                      {item.FormName}
                    </td>

                    {/* Normal Columns */}
                    <td className="p-3 border border-gray-200 text-center select-none">{item.Status}</td>
                    <td className="p-3 border border-gray-200 text-center select-none">{item.Progress}%</td>

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
                        ? "bg-gray-100"
                        : "";

                      const color = isOverdue
                        ? "text-red-600 font-bold"
                        : isComplete
                        ? "text-green-600 font-bold"
                        : "text-gray-600";

                      return (
                        <td
                          key={day}
                          className={`p-1 text-center border border-gray-200 min-w-[28px] h-8 ${bg} select-none`}
                          title={`วันที่ ${day}`}
                        >
                          <span className={color} style={{ fontSize: "1rem" }}>
                            {symbol}
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
    </div>
  );
};

export default DepartmentChecksheetDetails;
