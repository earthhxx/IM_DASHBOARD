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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[90vw] max-h-[90vh] w-full overflow-auto p-6">
        {/* ปุ่มปิด */}
        <button
          onClick={() => setSelectedDept("")}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${
            type === "overdue" ? "text-red-600" : "text-yellow-600"
          } select-none`}
        >
          {type === "overdue" ? "🔴 รายการค้างตรวจ" : "⏳ รายการกำลังตรวจ"} แผนก {department} (
          {filtered.length} รายการ)
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-16 select-none">
            ✅ ไม่มี{type === "overdue" ? "รายการค้างตรวจ" : "รายการ ongoing"}ของแผนก {department}
          </div>
        ) : (
          <table className="w-full border-collapse table-auto text-gray-700">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-50 sticky top-0 z-20 shadow-md">
              <tr>
                <th className="border border-gray-300 p-3 text-left font-semibold sticky left-0 bg-blue-100 z-30 rounded-l-lg">
                  #
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold sticky left-[50px] bg-blue-100 z-30 min-w-[250px]">
                  Form Name
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold bg-blue-100">Status</th>
                <th className="border border-gray-300 p-3 text-left font-semibold bg-blue-100">
                  Progress
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-300 p-2 text-center text-xs font-medium text-gray-600 select-none"
                    title={`วันที่ ${day}`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="border border-gray-300 p-2 sticky left-0 bg-white font-semibold text-center z-20">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 sticky left-[50px] bg-white font-medium min-w-[250px] truncate max-w-xs">
                    {item.FormName}
                  </td>
                  <td className="border border-gray-300 p-2">{item.Status}</td>
                  <td className="border border-gray-300 p-2">{item.Progress}%</td>
                  {days.map((day) => {
                    const val = item[`Date${day}`];
                    const isToday = isCurrentMonth && day === today;
                    const isOverdue = val === "0" && day < loopUntil;
                    const iscomplete = val ==="1" && day <= loopUntil;

                    return (
                      <td
                        key={day}
                        className="border border-gray-300 p-1 text-center relative min-w-[30px] h-8"
                      >
                        {/* ไฮไลต์วันปัจจุบัน */}
                        {isToday && (
                          <div className="absolute inset-0 bg-yellow-300/50 rounded transition-opacity animate-pulse z-0" />
                        )}

                        <span
                          className={`relative z-10 select-none ${
                            isOverdue ? "text-red-600 font-bold" : "text-gray-600"
                          }`}
                          title={`วันที่ ${day}: ${
                            val === "0" ? "ค้างตรวจ" : val === "1" ? "ตรวจแล้ว" : val === "-" ? "ไม่ตรวจ" : "ไม่มีข้อมูล"
                          }`}
                        >
                          {val === "0" && isOverdue
                            ? "✕"
                            : val === "1" && iscomplete
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
