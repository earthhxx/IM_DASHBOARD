"use client";
import React from "react";

type DepartmentAllChecksheetProps = {
  department: string;
  data: any[];
  setSelectedDept: (value: string) => void;
  month: number;
  year: number;
};

const DepartmentAllChecksheet: React.FC<DepartmentAllChecksheetProps> = ({
  department,
  data,
  setSelectedDept,
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

  const getDaysInMonth = (m: number, y: number) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(displayMonth, displayYear) }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm pt-10">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[95vw] max-h-[92vh] w-full overflow-auto px-2 pb-8 flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDept("")}
          className="fixed top-17 right-20 z-50 px-6 bg-red-500 rounded-md text-white hover:animate-pulse shadow-lg transition-colors duration-300"
          aria-label="Close"
        >
          <span className="text-4xl font-extrabold leading-none select-none">&times;</span>
        </button>


        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900 select-none mt-8">
          📋 รายการตรวจสอบทั้งหมดของแผนก {department} ({filtered.length} รายการ)
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-24 select-none font-medium">
            ✅ ไม่มีรายการของแผนก {department}
          </div>
        ) : (
          <table className="w-full table-auto text-gray-800 shadow-lg rounded-2xl border-separate border-spacing-0">

            <thead className="bg-gradient-to-r from-blue-200 to-blue-100 sticky top-0">
              <tr>
                <th className="border border-gray-300 p-4 text-left font-semibold bg-blue-200 rounded-tl-2xl">
                  #
                </th>
                <th className="border border-gray-300 p-4 text-left font-semibold bg-blue-200 min-w-[280px]">
                  Form Name
                </th>
                {/* <th className="border border-gray-300 p-4 text-left font-semibold bg-blue-200">
                  Status
                </th>
                <th className="border border-gray-300 p-4 text-left font-semibold bg-blue-200">
                  Progress
                </th> */}
                {days.map((day, idx) => {
                  const isLast = idx === days.length - 1;
                  const isToday = isCurrentMonth && day === today;
                  const isHoliday = filtered.some(
                    (item) =>
                      item[`Date${day}`] === "2" &&
                      ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay))
                  );

                  return (
                    <th
                      key={day}
                      className={`border border-gray-300 p-2 text-center text-xs font-semibold text-gray-700 select-none relative ${isToday ? "animate-pulse bg-yellow-300/70" : ""
                        } ${isHoliday ? "bg-gray-300/70 animate-pulse" : ""} ${isLast ? "rounded-tr-2xl" : ""
                        }`}
                      title={`วันที่ ${day}`}
                    >
                      {day}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, rowIndex) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                >
                  <td
                    className={`border border-gray-300 p-3  font-semibold text-center ${rowIndex === filtered.length - 1 ? "rounded-bl-2xl" : ""
                      }`}
                  >
                    {rowIndex + 1}
                  </td>
                  <td
                    className={`border border-gray-300 p-3 font-medium min-w-[280px] truncate max-w-xs select-text ${rowIndex === filtered.length - 1 ? "" : ""
                      }`}
                  >
                    {item.FormName}
                  </td>
                  {/* <td
                    className={`border border-gray-300 p-3 text-center ${rowIndex === filtered.length - 1 ? "" : ""
                      }`}
                  >
                    {item.Status}
                  </td>
                  <td
                    className={`border border-gray-300 p-3 text-center ${rowIndex === filtered.length - 1 ? "" : ""
                      }`}
                  >
                    {item.Progress}%
                  </td> */}
                  {days.map((day, idx) => {
                    const val = item[`Date${day}`];
                    const isToday = isCurrentMonth && day === today;
                    const isOverdue =
                      val === "0" && ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay));
                    const isComplete =
                      val === "1" && ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay));
                    const isHoliday = filtered.some(
                      (item) =>
                        item[`Date${day}`] === "2" &&
                        ((isCurrentMonth && day < today) || (!isCurrentMonth && day <= lastDay))
                    );
                    const isLastDay = idx === days.length - 1;
                    const isLastRow = rowIndex === filtered.length - 1;

                    return (
                      <td
                        key={day}
                        className={`border border-gray-300 p-1 text-center relative min-w-[30px] h-8 select-none ${isLastDay && isLastRow ? "rounded-br-2xl" : ""
                          }`}
                      >
                        {/* Highlight today */}
                        {isToday && (
                          <div className="absolute inset-0 bg-yellow-300/60 rounded animate-pulse z-0" />
                        )}

                        {/* Background for holiday */}
                        {isHoliday && (
                          <div className="absolute inset-0 bg-gray-200/50 z-0 rounded" />
                        )}

                        <span
                          className={`relative z-10 ${isOverdue
                            ? "text-red-700 font-bold"
                            : isComplete
                              ? "text-green-700 font-bold"
                              : "text-gray-600"
                            }`}
                          title={`วันที่ ${day}: ${val === "0"
                            ? "ค้างตรวจ"
                            : val === "1"
                              ? "ตรวจแล้ว"
                              : val === "-"
                                ? "ไม่ตรวจ"
                                : val === "2"
                                  ? "วันหยุด"
                                  : "ไม่มีข้อมูล"
                            }`}
                        >
                          {val === "0" && isOverdue
                            ? "✕"
                            : val === "1" && isComplete
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

export default DepartmentAllChecksheet;
