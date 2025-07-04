"use client";
import React from "react";

type ChecksheetStatus = "checked" | "uncheck" | "waiting";

type ChecksheetItem = {
  index: number;
  docNo: string;
  docName: string;
  line: string;
  process: string;
  checks: ChecksheetStatus[];
};


type Props = {
  department: string;
  data: ChecksheetItem[];
  onClose: () => void;
};

const getStatusColor = (status: ChecksheetStatus) => {
  if (status === "checked") return "bg-green-200 text-green-800";
  if (status === "waiting") return "bg-yellow-200 text-yellow-800";
  return "bg-red-200 text-red-800"; // uncheck
};


const DepartmentChecksheetTable: React.FC<Props> = ({ department, data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-h-[90vh] overflow-auto rounded-xl shadow-lg w-full max-w-[95vw] border relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center font-kanit">แผนก : {department}</h2>
          <div className="overflow-x-auto flex justify-center items-center">
            <table className="min-w-[1200px] text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-center">
                  <th className="border px-2 py-1">ลำดับ</th>
                  <th className="border px-2 py-1">หมายเลข</th>
                  <th className="border px-2 py-1">ชื่อเอกสาร</th>
                  <th className="border px-2 py-1">Line</th>
                  <th className="border px-2 py-1">Process</th>
                  {Array.from({ length: 31 }, (_, i) => (
                    <th key={i} className="border px-1 py-1 w-[40px]">
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, rowIdx) => (
                  <tr key={rowIdx} className="text-center">
                    <td className="border px-2 py-1">{item.index}</td>
                    <td className="border px-2 py-1">{item.docNo}</td>
                    <td className="border px-2 py-1 text-left">{item.docName}</td>
                    <td className="border px-2 py-1">{item.line}</td>
                    <td className="border px-2 py-1">{item.process}</td>
                    {item.checks.map((status, i) => (
                      <td
                        key={i}
                        className={`border px-1 py-1 ${getStatusColor(status)}`}
                      >
                        {status === "checked"
                          ? "✔️"
                          : status === "waiting"
                            ? "⏳"
                            : "❌"}

                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChecksheetTable;
