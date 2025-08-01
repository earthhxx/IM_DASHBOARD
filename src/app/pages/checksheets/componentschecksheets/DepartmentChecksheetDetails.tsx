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

  const filtered = data.filter((item) => item.Department === department);
  const days = Array.from({ length: lastDay }, (_, i) => i + 1);


  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm pt-10">
      <div className="relative w-full max-w-[95vw] max-h-[92vh] rounded-2xl shadow-2xl bg-white overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedDept("")}
          className="fixed top-17 right-20 z-50 px-6 bg-red-500 rounded-md text-white hover:animate-pulse shadow-lg transition-colors duration-300"
          aria-label="Close"
        >
          <span className="text-4xl font-extrabold leading-none select-none">&times;</span>
        </button>


        {/* Header */}
        <div
          className={`uppercase text-center text-2xl font-extrabold py-5 bg-white select-none ${type === "overdue" ? "text-red-700" : "text-yellow-700"
            }`}
        >
          {type === "overdue" ? "⚠️ overdue Checksheet Department : " : "⏳ ONGOING Checksheet Department"} {department} (
          {filtered.length})
        </div>

        {/* Table */}
        <div className="overflow-auto flex-grow px-6 pb-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-32 font-medium">
              ✅ ไม่มี{type === "overdue" ? "รายการค้างตรวจ" : "รายการ ongoing"}ของแผนก {department}
            </div>
          ) : (
            <table className="table-auto w-full border-separate border-spacing-0 text-sm md:text-base text-gray-700 rounded-lg overflow-hidden shadow-lg">
              <thead className="sticky top-0 z-30 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 backdrop-blur-sm shadow-md">
                <tr>
                  <th className="w-[45px] px-4 border border-gray-300 bg-blue-100 left-0 z-40 text-left font-semibold rounded-tl-lg">
                    #
                  </th>
                  <th className="p-3 border border-gray-300 bg-blue-100 left-[50px] z-40 text-left font-semibold min-w-[220px]">
                    FORM NAME
                  </th>
                  {/* <th className="p-3 border border-gray-300 font-semibold text-center">
                    สถานะ
                  </th>
                  <th className="p-3 border border-gray-300 font-semibold text-center">
                    ความคืบหน้า
                  </th> */}
                  {days.map((day) => {
                    const isToday = isCurrentMonth && day === today;
                    const isHoliday = filtered.some(
                      (item) =>
                        item[`Date${day}`] === "2" &&
                        ((isCurrentMonth && day <= today) || (!isCurrentMonth && day <= lastDay))
                    );

                    return (
                      <th
                        key={day}
                        className={`border border-gray-300 p-2 text-center text-[16px] font-medium text-gray-600 select-none relative ${isToday ? "animate-pulse bg-yellow-200/70" : ""
                          } ${isHoliday ? "bg-gray-300/70 " : ""}`}
                        title={`วันที่ ${day}`}
                      >
                        {day}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => {
                  const isLastRow = index === paginatedData.length - 1;

                  return (
                    <tr
                      key={item.id}
                      className="group hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                    >
                      {/* Column 1 - Index */}
                      <td
                        className={`p-3 border border-gray-200 left-0 bg-white z-20 text-center font-semibold group-hover:bg-blue-100 select-none ${isLastRow ? "rounded-bl-lg" : ""
                          }`}
                      >
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      {/* Column 2 - Form Name */}
                      <td
                        className={`p-3 border border-gray-200 left-[50px] bg-white z-20 truncate group-hover:bg-blue-100 select-text ${isLastRow ? "rounded-br-lg" : ""
                          }`}
                      >
                        {item.FormName}
                      </td>

                      {/* Days Columns */}
                      {days.map((day, dayIndex) => {
                        const val = item[`Date${day}`];
                        const isToday = isCurrentMonth && day === today;
                        const isOverdue =
                          val === "0" &&
                          ((isCurrentMonth && day < today) ||
                            (!isCurrentMonth && day <= lastDay));
                        const isComplete = val === "1" || val === 1;
                        const isHoliday = filtered.some(
                          (item) =>
                            item[`Date${day}`] === "2" &&
                            ((isCurrentMonth && day <= today) ||
                              (!isCurrentMonth && day <= lastDay))
                        );

                        const symbol = isOverdue
                          ? "✕"
                          : isComplete
                            ? "✓"
                            : val === "-"
                              ? "–"
                              : "";

                        const isLastDay = dayIndex === days.length - 1;

                        return (
                          <td
                            key={day}
                            className={`border border-gray-300 p-1 text-center relative min-w-[30px] h-8 select-none ${isLastDay && isLastRow ? "rounded-br-2xl" : ""
                              }`}
                          >
                            {isToday && (
                              <div className="absolute inset-0 bg-yellow-300/60 rounded animate-pulse z-0" />
                            )}
                            {isHoliday && (
                              <div className="absolute inset-0 bg-gray-200/50 z-0 rounded" />
                            )}
                            <span
                              className={`${isOverdue
                                ? "text-red-600 font-bold"
                                : isComplete
                                  ? "text-green-600 font-bold"
                                  : "text-gray-600"
                                }`}
                              style={{ fontSize: "1rem" }}
                            >
                              {symbol}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold shadow ${currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              ⬅ Back
            </button>
            <span className="font-bold text-blue-900">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold shadow ${currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Next ➡
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DepartmentChecksheetDetails;
