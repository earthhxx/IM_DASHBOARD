"use client";
import React, { useState } from "react";
import DepartmentChecksheetTable from "@/app/components/DepartmentChecksheetTable";

type DepartmentData = {
  name: string;
  ongoing: number[];
  completed: number[];
  overdue: number[];
};

type ChecksheetStatus = "completed" | "ongoing" | "overdue";

type ChecksheetItem = {
  index: number;
  docNo: string;
  docName: string;
  line: string;
  process: string;
  checks: ChecksheetStatus[];
};

// ฟังก์ชันแปลง DepartmentData เป็น ChecksheetItem[]
const convertDepartmentDataToChecksheetItems = (
  department: DepartmentData
): ChecksheetItem[] => {
  const totalDays = 31;

  // mock รายการเอกสาร 10 รายการ
  const documents: Omit<ChecksheetItem, "checks">[] = Array.from(
    { length: 10 },
    (_, i) => ({
      index: i + 1,
      docNo: `FM-DOC-${100 + i}`,
      docName: `Document ${i + 1}`,
      line: i % 2 === 0 ? "AOI" : "Packing",
      process:
        i % 3 === 0
          ? "ตรวจสอบภาพ"
          : i % 3 === 1
          ? "บรรจุ"
          : "ทำความสะอาด",
    })
  );

  return documents.map((doc) => {
    const checks: ChecksheetStatus[] = Array.from({ length: totalDays }, (_, day) => {
      const dayNumber = day + 1;
      if (department.completed.includes(dayNumber)) return "completed";
      if (department.ongoing.includes(dayNumber)) return "ongoing";
      if (department.overdue.includes(dayNumber)) return "overdue";
      return "overdue"; // default ถ้าไม่มีข้อมูลถือ overdue
    });

    return {
      ...doc,
      checks,
    };
  });
};

const getStatus = (dept: DepartmentData, day: number): ChecksheetStatus => {
  if (dept.overdue.includes(day)) return "overdue";
  if (dept.ongoing.includes(day)) return "ongoing";
  if (dept.completed.includes(day)) return "completed";
  return "overdue";
};

const getColor = (status: ChecksheetStatus) => {
  switch (status) {
    case "completed":
      return "bg-green-400";
    case "ongoing":
      return "bg-yellow-300";
    case "overdue":
      return "bg-red-400";
  }
};

const departments: DepartmentData[] = [
  {
    name: "Engineer",
    completed: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 28],
    ongoing: [1, 2, 4, 5, 6, 7],
    overdue: [16, 17, 18, 20, 21],
  },
  {
    name: "Production",
    completed: Array.from({ length: 30 }, (_, i) => i + 1),
    ongoing: Array.from({ length: 30 }, (_, i) => i + 1),
    overdue: [],
  },
  {
    name: "Warehouse",
    completed: [1, 2, 3, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 28],
    ongoing: [1, 6, 18, 20, 22, 24, 21],
    overdue: [9, 15],
  },
  {
    name: "HR",
    completed: [1, 2, 3, 5, 6, 8, 9, 10, 12, 14, 15, 16, 17, 19, 20, 21, 23, 25, 26, 28],
    ongoing: [1, 28, 26, 21, 9],
    overdue: [15],
  },
  {
    name: "QA",
    completed: [1, 2, 3, 5, 6, 8, 9, 10, 12, 14, 15, 16, 17, 19, 20, 21, 23, 25, 26, 28],
    ongoing: [1, 19, 20, 23, 25, 28, 26, 21, 9],
    overdue: [15],
  },
];

const TimelineMatrix = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const selectedDepData = selectedDepartment
    ? departments.find((d) => d.name === selectedDepartment)
    : null;

  const checkSheetData = selectedDepData
    ? convertDepartmentDataToChecksheetItems(selectedDepData)
    : [];

  const handleOpen = (depName: string) => setSelectedDepartment(depName);
  const handleClose = () => setSelectedDepartment(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col justify-center items-center text-black">
      {/* Header */}
      <header className="mb-10 text-center mt-[5%]">
        <h1 className="text-5xl font-extrabold text-gray-800 uppercase">
          checksheet monitoring
        </h1>
      </header>

      {/* Summary + Lists */}
      <section className="flex flex-col md:flex-row justify-evenly gap-8 mb-6 w-full">
        {/* Summary Card */}
        <div className="bg-white shadow rounded-2xl p-8 border border-gray-300 h-[340px] w-full">
          <h2 className="text-3xl font-bold mb-4 mt-3 text-gray-800 uppercase">
            summary checksheet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 ">
            {departments.map((dept) => (
              <div
                key={dept.name}
                onClick={() => handleOpen(dept.name)}
                className="h-full border rounded-xl p-5 bg-gray-100 shadow-sm hover:shadow-md transition cursor-pointer mt-4"
              >
                <h3 className="font-semibold text-xl mb-3">{dept.name}</h3>
                <ul className="text-base space-y-2">
                  <li>
                    <span className="inline-block w-4 h-4 rounded bg-green-400 mr-2 align-middle" />
                    On Plan: <strong>{dept.completed.length}</strong>
                  </li>
                  <li>
                    <span className="inline-block w-4 h-4 rounded bg-yellow-300 mr-2 align-middle" />
                    Ongoing: <strong>{dept.ongoing.length}</strong>
                  </li>
                  <li>
                    <span className="inline-block w-4 h-4 rounded bg-red-400 mr-2 align-middle" />
                    Overdue: <strong>{dept.overdue.length}</strong>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue & Ongoing Lists */}
        <div className="flex gap-6 justify-start items-start w-[920px]">
          {/* Overdue */}
          <section className="bg-white shadow-md rounded-2xl p-6 border border-red-300 h-[340px] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
              ⚠️ Overdue Checksheet
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">แผนก</th>
                  <th className="text-center py-2">จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {departments
                  .filter((dept) => dept.overdue.length > 0)
                  .map((dept) => (
                    <tr
                      key={`${dept.name}-overdue`}
                      className="border-b last:border-none hover:bg-red-50 transition"
                    >
                      <td className="py-2 font-medium">{dept.name}</td>
                      <td className="text-center">{dept.overdue.length}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>

          {/* Ongoing */}
          <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-300 h-[340px]">
            <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
              🟡 Ongoing Checksheet
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">แผนก</th>
                  <th className="text-center py-2">จำนวน</th>
                </tr>
              </thead>
              <tbody>
                {departments
                  .filter((dept) => dept.ongoing.length > 0)
                  .map((dept) => (
                    <tr
                      key={`${dept.name}-ongoing`}
                      className="border-b last:border-none hover:bg-yellow-50 transition"
                    >
                      <td className="py-2 font-medium">{dept.name}</td>
                      <td className="text-center">{dept.ongoing.length}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      </section>

      {/* Timeline Table */}
      <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-xl w-full">
        {/* วันที่ */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-kanit text-gray-800">3 กรกฎาคม 2568</h2>
        </div>

        {/* ตาราง */}
        <table className="min-w-[1000px] w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100 sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="sticky left-0 bg-gray-100 border p-3 text-left text-base font-semibold z-30 min-w-[140px]">
                แผนก
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border px-2 py-3 text-sm w-10 text-center select-none"
                  title={`Day ${day}`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr
                key={dept.name}
                className="bg-white even:bg-gray-50 hover:bg-yellow-50 transition duration-150"
              >
                <td className="sticky left-0 bg-white border px-4 py-3 font-medium whitespace-nowrap z-10">
                  {dept.name}
                </td>
                {days.map((day) => {
                  const status = getStatus(dept, day);
                  const bg = getColor(status);

                  return (
                    <td
                      key={day}
                      className={`border w-10 h-10 ${bg} rounded-md cursor-default transition duration-200`}
                      title={`${status} - day ${day}`}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div className="flex justify-center items-center gap-10 text-base mt-8 text-gray-700 px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-green-400 shadow" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-yellow-300 shadow" />
            <span>Ongoing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-red-400 shadow" />
            <span>Overdue</span>
          </div>
        </div>
      </div>

      {/* แสดงตารางถ้ามีการเลือกแผนก */}
      {selectedDepartment && selectedDepData && (
        <DepartmentChecksheetTable
          department={selectedDepartment}
          data={checkSheetData}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default TimelineMatrix;
