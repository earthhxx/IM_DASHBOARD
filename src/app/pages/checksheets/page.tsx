"use client";
import React, { useState } from "react";
import DepartmentChecksheetTable from "@/app/components/DepartmentChecksheetTable";



type DepartmentData = {
    name: string;
    ongoing: number[];
    completed: number[];
    overdue: number[];
};

type ChecksheetStatus = "checked" | "uncheck" | "waiting";

const randomStatus = (i: number): ChecksheetStatus => {
    if (i % 7 === 0) return "waiting";
    if (i % 3 === 0) return "checked";
    return "uncheck";
};

const mockData = Array.from({ length: 10 }, (_, index) => ({
    index: index + 1,
    docNo: `FM-DOC-${100 + index}`,
    docName: `Document ${index + 1}`,
    line: index % 2 === 0 ? "AOI" : "Packing",
    process:
        index % 3 === 0
            ? "ตรวจสอบภาพ"
            : index % 3 === 1
                ? "บรรจุ"
                : "ทำความสะอาด",
    checks: Array.from({ length: 31 }, (_, i) => randomStatus(i)),
}));

const departments: DepartmentData[] = [
    {
        name: "Engineer",
        completed: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 28],
        ongoing: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 15],
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
        ongoing: [1, 2, 3, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 28, 26, 21],
        overdue: [9, 15],
    },
    {
        name: "IT",
        completed: [1, 2, 3, 5, 6, 8, 9, 10, 12, 14, 15, 16, 17, 19, 20, 21, 23, 25, 26, 28],
        ongoing: [1, 2, 3, 5, 6, 8, 10, 12, 14, 16, 17, 19, 20, 23, 25, 28, 26, 21, 9],
        overdue: [15],
    },
];

const getStatus = (dept: DepartmentData, day: number) => {
    if (dept.overdue.includes(day)) return "overdue";
    if (dept.ongoing.includes(day)) return "ongoing";
    if (dept.completed.includes(day)) return "completed";
    return;
};


const getColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return "bg-green-400";
        case "overdue":
            return "bg-red-400";
        case "ongoing":
            return "bg-yellow-300";
        default:
            return "bg-gray-200";
    }
};




const TimelineMatrix = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const [selectedDep, setSelectedDep] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col justify-center items-center text-black">
            {/* Header */}
            <header className="mb-10 text-center mt-[5%]">
                <h1 className="text-5xl font-extrabold text-gray-800">
                    สรุปการเช็คเอกสารรายวัน (Timeline View)
                </h1>
            </header>

            {/* Summary + Lists */}
            <section className="flex flex-col md:flex-row justify-evenly gap-8 mb-6 w-full">
                {/* Summary Card */}
                <div className="bg-white shadow rounded-2xl p-8 border border-gray-300 h-[390px] w-full">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">สรุปภาพรวมรายแผนก</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {departments.map((dept) => {
                            const notChecked = 31 - new Set(dept.overdue).size;
                            return (
                                <div
                                    key={dept.name}
                                    onClick={() => { setSelectedDep(dept.name); setOpen(true); }}
                                    className="h-full border rounded-xl p-5 bg-gray-100 shadow-sm hover:shadow-md transition cursor-default"
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
                            );
                        })}
                    </div>
                </div>

                {/* Overdue & Not Checked Lists */}
                <div className="flex gap-6 h-[390px] justify-start">
                    {/* Overdue */}
                    <section className="bg-white shadow rounded-2xl p-6 border border-red-200 w-[320px] h-full">
                        <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center gap-2">
                            ⚠️ Overdue Checksheet
                        </h2>
                        <table className="w-full text-base border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">แผนก</th>
                                    <th className="text-center py-2">จำนวนเอกสาร</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...departments]
                                    .filter((dept) => dept.overdue.length > 0) // ✅ แสดงเฉพาะแผนกที่มี ongoing
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.name}-ongoing`}
                                            className="border-b last:border-none hover:bg-gray-100 transition"
                                        >
                                            <td className="py-2">{dept.name}</td>
                                            <td className="text-center">{dept.overdue.length}</td> {/* ✅ จำนวน ongoing */}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </section>

                    {/* Not Checked */}
                    <section className="bg-white shadow rounded-2xl p-6 border border-gray-300 w-[320px] h-full">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                            ❌ Ongoing Checksheet
                        </h2>
                        <table className="w-full text-base border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">แผนก</th>
                                    <th className="text-center py-2">จำนวนเอกสาร</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...departments]
                                    .filter((dept) => dept.ongoing.length > 0) // ✅ แสดงเฉพาะแผนกที่มี ongoing
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.name}-ongoing`}
                                            className="border-b last:border-none hover:bg-gray-100 transition"
                                        >
                                            <td className="py-2">{dept.name}</td>
                                            <td className="text-center">{dept.ongoing.length}</td> {/* ✅ จำนวน ongoing */}
                                        </tr>
                                    ))}

                            </tbody>
                        </table>
                    </section>
                </div>
            </section>
            <div className="flex font-kanit text-2xl mb-4"> 3 กรกฎาคม 2568 </div>
            {/* Timeline Table */}
            <div className="p-6 border-b border-gray-200 rounded-2xl bg-white shadow w-full overflow-x-auto">
                <table className="min-w-[1000px] w-full border-collapse text-sm">
                    <thead className="bg-gray-100 sticky top-0 z-20">
                        <tr>
                            <th className="sticky left-0 bg-gray-100 border p-3 text-left text-base font-semibold z-30 min-w-[120px]">
                                แผนก
                            </th>
                            {days.map((day) => (
                                <th
                                    key={day}
                                    className="border p-2 text-sm w-10 text-center select-none"
                                    title={`Day ${day}`}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => {
                            return (
                                <tr
                                    key={dept.name}
                                    className="bg-white even:bg-gray-50 hover:bg-yellow-50 transition-colors duration-150"
                                >
                                    <td className="sticky left-0 bg-white border px-3 py-2 font-semibold whitespace-nowrap z-10">
                                        {dept.name}
                                    </td>
                                    {days.map((day) => {
                                        const status = getStatus(dept, day);
                                        const bg = getColor(status?.toLowerCase() || "none") || "bg-gray-200";
                                        return (
                                            <td
                                                key={day}
                                                className={`border w-10 h-10 cursor-default ${bg} rounded-sm`}
                                                title={`${status !== undefined ? status : "not checked"} - day ${day}`}
                                            />
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="flex justify-center items-center space-x-8 text-base mt-8 text-gray-700 rounded-full p-5 bg-gray-50 shadow">
                <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-green-400 shadow" />
                    <span>Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-yellow-300 shadow" />
                    <span>ongoing</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-red-400 shadow" />
                    <span>Overdue</span>
                </div>
            </div>

            {open && selectedDep && (
                <DepartmentChecksheetTable
                    department={selectedDep ?? ""}
                    data={mockData}
                    onClose={() => setOpen(false)}
                />
            )}


        </div>
    );
};

export default TimelineMatrix;
