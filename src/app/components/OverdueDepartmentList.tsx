"use client";
import React from "react";

type OverdueDepartmentListProps = {
  department: string;
  data: any[];
};

const OverdueDepartmentList: React.FC<OverdueDepartmentListProps> = ({ department, data }) => {
  // กรองเฉพาะของแผนกที่ต้องการ
  const filtered = data.filter(item => item.Department === department);

  if (filtered.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        ✅ ไม่มีรายการค้างตรวจของแผนก {department}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        🔴 รายการค้างตรวจแผนก {department} ({filtered.length} รายการ)
      </h2>
      <ul className="space-y-3">
        {filtered.map(item => (
          <li key={item.id} className="p-3 border rounded-md hover:bg-gray-50">
            <div className="font-bold text-gray-800">{item.FormName}</div>
            <div className="text-sm text-gray-500">Status: {item.Status} | Progress: {item.Progress}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverdueDepartmentList;
