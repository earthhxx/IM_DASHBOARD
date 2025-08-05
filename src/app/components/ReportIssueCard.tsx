'use client'; // This file is a client component
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ReportIssueCard = () => {
  const [state, setState] = useState<"idle" | "open">('idle');

  const [selectedDept, setSelectedDept] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");


  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments"); // ✅ เปลี่ยน endpoint ตามจริง
      const data = await res.json();
    } catch (error) {
      console.error("โหลดแผนกไม่สำเร็จ:", error);
    }
  };

  const handlesubmit = () => {
    fetchDepartments();
    setState('idle');
  }

  const idle = () => {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setState('open')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          <div className="flex items-center justify-center space-x-2 gap-2">
            แจ้งปัญหา
            <Image
              src="/images/michelle-hi4.png"
              alt="Logo"
              width={30}
              height={30}
              priority
            />
          </div>

        </button>
      </div>
    )
  };

  const ReportIssueCard = () => {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen backdrop-blur-md">
        <div className="bg-blue-900/85 shadow-xl rounded-lg p-8 w-full max-w-xl backdrop-blur-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">แบบฟอร์มแจ้งปัญหา</h2>

          {/* ชื่อ */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-white">ชื่อ</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>

          {/* แผนก */}
          <div className="mb-4">
            <label htmlFor="department" className="block mb-1 text-sm font-medium text-white">
              แผนก
            </label>
            <select
              id="department"
              className=" border border-white text-white text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 uppercase"
            >
              <option className="bg-blue-900/75 text-white" value="">-- เลือกแผนก -- </option>
              <option className="bg-blue-900/75 text-white" value="external">บุคคลภายนอก</option>
              <option className="bg-blue-900/75 text-white" value="external">customer</option>
              <option className="bg-blue-900/75 text-white" value="external">ENGINEER</option>
              <option className="bg-blue-900/75 text-white" value="external">PRODUCTION</option>
              <option className="bg-blue-900/75 text-white" value="external">Accounting</option>
              <option className="bg-blue-900/75 text-white" value="external">WAREHOUSE</option>
              <option className="bg-blue-900/75 text-white" value="external">QA</option>
              <option className="bg-blue-900/75 text-white" value="external">IT</option>
              <option className="bg-blue-900/75 text-white" value="external">HR</option>
            </select>
          </div>

          {/* รายละเอียดของปัญหา */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-white">รายละเอียดของปัญหา</label>
            <textarea
              id="description"
              rows={5}
              className="w-full px-4 py-3 border border-white rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="รายละเอียดของปัญหาที่พบบ่อย"
            ></textarea>
          </div>

          {/* ปุ่มส่ง */}
          <div className="text-center">
            <button
              onClick={() => {
                handlesubmit();
              }}
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              ส่ง
            </button>
          </div>
        </div>
      </div >
    )
  };


  return (
    <div>
      {state === 'idle' && idle()}
      {state === 'open' && ReportIssueCard()}
    </div>
  );
};

export default ReportIssueCard;
