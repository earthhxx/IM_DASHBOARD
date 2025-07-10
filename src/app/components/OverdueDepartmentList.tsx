"use client";
import React from "react";

type OverdueDepartmentListProps = {
  department: string;
  data: any[];
  setSelectedDept: (value: string) => void; // <- รับฟังก์ชันสำหรับปิด
};

const OverdueDepartmentList: React.FC<OverdueDepartmentListProps> = ({
  department,
  data,
  setSelectedDept,
}) => {
  const filtered = data.filter(item => item.Department === department);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="relative bg-white max-w-2xl w-full p-6 rounded-lg shadow-xl">
        {/* ปุ่มปิด */}
        <button
          onClick={() => setSelectedDept("")}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          🔴 รายการค้างตรวจแผนก {department} ({filtered.length} รายการ)
        </h2>

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center">
            ✅ ไม่มีรายการค้างตรวจของแผนก {department}
          </div>
        ) : (
          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {filtered.map(item => (
              <li
                key={item.id}
                className="p-3 border rounded-md hover:bg-gray-50"
              >
                <div className="font-bold text-gray-800">{item.FormName}</div>
                <div className="text-sm text-gray-500">
                  Status: {item.Status} | Progress: {item.Progress}%
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OverdueDepartmentList;
