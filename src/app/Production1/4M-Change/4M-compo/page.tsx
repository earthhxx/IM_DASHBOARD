'use client';

import React from 'react';

type ProductionData = {
  Id: number;
  Date: string;
  Line: string;
  Shift: string;
  [key: string]: any; // สำหรับ dynamic access
};

interface Props {
  data: ProductionData;
}

const ProcessTable: React.FC<Props> = ({ data }) => {
  const processes = [];

  for (let i = 1; i <= 14; i++) {
    const processName = data[`Process${i}`];
    const am = data[`AM${i}`];
    const pm = data[`PM${i}`];

    // ถ้า process ไม่มีชื่อ ให้ข้าม
    if (!processName) continue;

    processes.push({ processName, am, pm });
  }

  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-semibold mb-4">Line: {data.Line} | Shift: {data.Shift}</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Process</th>
            <th className="border px-4 py-2 text-center">AM</th>
            <th className="border px-4 py-2 text-center">PM</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-2">{p.processName}</td>
              <td className="border px-4 py-2 text-center">{p.am || '-'}</td>
              <td className="border px-4 py-2 text-center">{p.pm || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-black">
        ✅ Checked: <strong>{data.Checked}</strong> | QA Confirm: <strong>{data.QA_Confirm}</strong>
      </div>
    </div>
  );
};

export default ProcessTable;
