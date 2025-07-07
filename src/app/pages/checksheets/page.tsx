"use client";
import React, { useState } from "react";
import DepartmentChecksheetTable from "@/app/components/DepartmentChecksheetTable";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


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
        <div className="min-h-screen bg-white p-8 flex flex-col justify-center items-center text-black">
            {/* Header */}
            <header className="mb-10 text-center mt-8">
                <h1 className="text-5xl font-extrabold text-gray-800 uppercase">
                    checksheet monitoring
                </h1>
            </header>

            {/* Summary + Lists */}
            <section className="flex flex-col md:flex-row justify-evenly gap-8 mb-6 w-full">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-sky-50 to-white shadow-2xl rounded-2xl p-6 border border-gray-300 h-[400px] w-full">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 uppercase">
                        summary checksheet
                    </h2>
                    {/* Summary Info Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-700 mb-3">
                        <div className="px-3 py-1 bg-white rounded-full shadow-sm flex items-center gap-1 hover:bg-gray-200 cursor-default">
                            🏢 แผนกทั้งหมด: {departments.length}
                        </div>
                        <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full shadow-sm flex items-center gap-1 hover:bg-red-200 cursor-default">
                            ⚠️ OVERDUE รวม: {departments.reduce((sum, d) => sum + d.overdue.length, 0)}
                        </div>
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full shadow-sm flex items-center gap-1 hover:bg-yellow-200 cursor-default">
                            🕒 ONGOING รวม: {departments.reduce((sum, d) => sum + d.ongoing.length, 0)}
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={departments.map((dept) => ({
                                name: dept.name,
                                Completed: dept.completed.length,
                                Ongoing: dept.ongoing.length,
                                Overdue: dept.overdue.length,
                            }))}
                            margin={{ top: 10, right: 50, left: 0, bottom: 10 }}
                            barCategoryGap="20%"
                            barGap={6}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />

                            <Legend
                                layout="horizontal"
                                align="center"
                                verticalAlign="bottom"
                                wrapperStyle={{
                                    marginLeft: 35,
                                    lineHeight: "28px",
                                }}
                                formatter={(value) => (
                                    <span
                                        style={{
                                            margin: "0 8px",
                                            display: "inline-block",
                                            textTransform: "uppercase",
                                            color: "#000",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {value}
                                    </span>
                                )}
                            />

                            <Bar
                                className="bar-glow"
                                dataKey="Completed"
                                name="COMPLETED"
                                fill="#4ade80"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                className="bar-glow"
                                dataKey="Ongoing"
                                name="ONGOING"
                                fill="#facc15"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                className="bar-glow"
                                dataKey="Overdue"
                                name="OVERDUE"
                                fill="#f87171"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>


                </div>



                {/* Overdue & Ongoing Lists */}
                <div className="flex gap-6 justify-start items-start w-[920px]">

                    {/* Overdue */}
                    <section className="bg-gradient-to-br from-red-50 to-white shadow-xl rounded-2xl border border-red-300 p-6 h-[400px] overflow-auto transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[18px] font-bold mb-4 text-red-600 flex items-center gap-2 uppercase">
                            <span className="animate-pulse  h-8">⚠️</span> Overdue Checksheet
                        </h2>
                        <table className="w-full text-[18px] border-collapse">
                            <thead>
                                <tr className="border-b border-red-200">
                                    <th className="text-left py-2 text-red-600">แผนก</th>
                                    <th className="text-center py-2 text-red-600">จำนวน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments
                                    .filter((dept) => dept.overdue.length > 0)
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.name}-overdue`}
                                            className="border-b border-red-100 last:border-none transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                                        >
                                            <td className="py-2 font-semibold text-red-800">{dept.name}</td>
                                            <td className="text-center font-bold text-red-600 animate-pulse">{dept.overdue.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </section>

                    {/* Ongoing */}
                    <section className="bg-gradient-to-br from-yellow-50 to-white shadow-xl rounded-2xl border border-yellow-300 p-6 h-[400px] overflow-auto transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[18px] font-bold mb-4 text-yellow-700 flex items-center gap-2 uppercase">
                            <span className="animate-spin">⏳</span> Ongoing Checksheet
                        </h2>
                        <table className="w-full text-[18px] border-collapse">
                            <thead>
                                <tr className="border-b border-yellow-200">
                                    <th className="text-left py-2 text-yellow-600">แผนก</th>
                                    <th className="text-center py-2 text-yellow-600">จำนวน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments
                                    .filter((dept) => dept.ongoing.length > 0)
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.name}-ongoing`}
                                            className="border-b border-yellow-100 last:border-none transition-all duration-200 hover:bg-yellow-100 hover:shadow-sm"
                                        >
                                            <td className="py-2 font-semibold text-yellow-800">{dept.name}</td>
                                            <td className="text-center font-bold text-yellow-700 animate-pulse">{dept.ongoing.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </section>

                </div>
            </section>

            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full h-[320px] mt-4">
                <table className="min-w-[1000px] w-full border-collapse text-sm text-gray-700 h-full">
                    <thead className="bg-gradient-to-br from-sky-100 via-white to-white">
                        <tr className="border-b border-gray-200">
                            <th className="sticky left-0 p-4 text-left text-base font-semibold z-30 w-[120px] max-w-[120px] border-r border-gray-200">
                                แผนก
                            </th>
                            {days.map((day) => (
                                <th
                                    key={day}
                                    className="px-3 py-4 text-sm w-10 text-center select-none border-r border-gray-200 last:border-r-0"
                                    title={`Day ${day}`}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-gradient-to-b from-white via-sky-50 to-white">
                        {departments.map((dept) => (
                            <tr
                                onClick={() => handleOpen(dept.name)}
                                key={dept.name}
                                className="hover:bg-yellow-50 transition duration-150 border-b border-gray-100"
                            >
                                <td className="sticky left-0 px-4 py-3 font-medium whitespace-nowrap z-10 w-[120px] max-w-[120px] truncate border-r border-gray-200">
                                    {dept.name}
                                </td>
                                {days.map((day) => {
                                    const status = getStatus(dept, day);
                                    const icon =
                                        status === "completed" ? "✔️" :
                                            status === "ongoing" ? "⏳" :
                                                "❌";

                                    // สี gradient บางๆ
                                    const bgGradient =
                                        status === "completed"
                                            ? "linear-gradient(to bottom, #bbf7d0, #86efac)"
                                            : status === "ongoing"
                                                ? "linear-gradient(to bottom, #fef9c3, #fde68a)"
                                                : "linear-gradient(to bottom, #fecaca, #fda4af)";

                                    const ringColor =
                                        status === "completed"
                                            ? "ring-green-200"
                                            : status === "ongoing"
                                                ? "ring-yellow-200"
                                                : "ring-red-200";

                                    return (
                                        <td
                                            key={day}
                                            className="border-r border-gray-100 last:border-r-0 p-1 transition duration-200"
                                        >
                                            <div className="flex justify-center items-center w-full h-full">
                                                <div
                                                    className={`w-6 h-6 rounded-full flex justify-center items-center text-white text-[12px] leading-none
                                            shadow-md shadow-gray-400/40 scale-110 ring-2 ring-offset-2 ${ringColor}`}
                                                    style={{ background: bgGradient }}
                                                    title={`${status} - day ${day}`}
                                                >
                                                    {icon}
                                                </div>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
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
