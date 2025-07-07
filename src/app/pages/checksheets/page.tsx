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
        completed: [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ongoing: [5, 6],
        overdue: [2],
    },
    {
        name: "Production",
        completed: [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ongoing: [5, 6],
        overdue: [3],
    },
    {
        name: "Warehouse",
        completed: [1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ongoing: [5, 6],
        overdue: [2],
    },
    {
        name: "HR",
        completed: [2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ongoing: [5, 6],
        overdue: [1, 4],
    },
    {
        name: "QA",
        completed: [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ongoing: [5, 6],
        overdue: [2, 1],
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

    const today = new Date().getDate();


    return (
        <div className="min-h-screen bg-white p-8 flex flex-col justify-center items-center text-black">
            {/* Header */}
            <header className="mb-10 text-center mt-12">
                <h1 className="text-5xl font-extrabold text-blue-900 uppercase">
                    checksheet monitoring
                </h1>
            </header>

            {/* Summary + Lists */}
            <section className="flex flex-col md:flex-row justify-evenly gap-8 mb-6 w-full">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-red-50 to-white shadow-2xl rounded-2xl p-6 border border-gray-300 h-[400px] w-full">
                    <h2 className="text-3xl font-bold mb-4 text-red-600 uppercase">
                        summary overdue
                    </h2>
                    {/* Summary Info Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-700 mb-3">
                        {/* <div className="px-3 py-1 bg-white rounded-full shadow-sm flex items-center gap-1 hover:bg-gray-200 cursor-default">
                            🏢 แผนกทั้งหมด: {departments.length}
                        </div> */}
                        <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full shadow-sm flex items-center gap-1 hover:bg-red-200 cursor-default">
                            ⚠️ OVERDUE รวม: {departments.reduce((sum, d) => sum + d.overdue.length, 0)}
                        </div>
                        {/* <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full shadow-sm flex items-center gap-1 hover:bg-yellow-200 cursor-default">
                            ⏳ ONGOING รวม: {departments.reduce((sum, d) => sum + d.ongoing.length, 0)}
                        </div> */}
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
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />

                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />

                            {/* <Legend
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
                            /> */}

                            {/* <Bar
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
                            /> */}
                            <Bar
                                // className="bar-glow"
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
                <div className="flex gap-6 justify-start items-start w-[2000px]">

                    {/* Overdue */}
                    <section className="w-full bg-gradient-to-br from-red-50 to-white shadow-xl rounded-2xl border border-red-300 p-6 h-[400px] transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[26px] font-bold mb-4 text-red-600 flex items-center justify-center gap-2 uppercase me-4">
                            <span className="animate-pulse  h-9.5 text-2xl ">⚠️</span>
                            <div>
                                Overdue
                            </div>
                        </h2>
                        <table className="w-full text-[22px] border-collapse">
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
                    <section className="w-full bg-gradient-to-br from-yellow-50 to-white shadow-xl rounded-2xl border border-yellow-300 p-6 h-[400px]  transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[26px] font-bold mb-4 text-yellow-700 flex items-center justify-center gap-2 uppercase me-4">
                            <span className="animate-spin ">⏳</span>
                            <div>
                                Ongoing
                            </div>

                        </h2>
                        <table className="w-full text-[22px] border-collapse">
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



            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-gradient-to-br from-sky-50 to-white w-full h-fit mt-4">

                <table className="min-w-[1000px] w-full text-sm text-gray-700 h-full">
                    {/* Header */}


                    <thead className="bg-gradient-to-br from-blue-200 to-white">
                        <tr className="border-b border-gray-200">
                            <th
                                colSpan={days.length + 1}
                                className="px-6 py-4 border-b border-gray-100 text-left"
                            >
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold text-sky-900 uppercase tracking-wide">
                                        📋 Daily Checksheet Realtime
                                    </h1>
                                    <span className="text-2xl text-gray-600 whitespace-nowrap">
                                        {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}
                                    </span>
                                </div>
                            </th>
                        </tr>

                        <tr className="border-b border-gray-200">
                            <th className="sticky left-0 p-4 text-left font-semibold z-30 w-[120px] border-r border-gray-200 text-gray-700">
                                แผนก
                            </th>
                            {days.map((day) => {
                                const isToday = day === today;
                                const hasOngoing = departments.some((dept) => dept.ongoing.includes(day));
                                return (
                                    <th
                                        key={day}
                                        className={`px-3 py-3 text-center text-xs font-medium text-gray-600 border-r border-gray-100 last:border-r-0 select-none transition-all duration-300
                                            ${isToday ? "bg-yellow-400 animate-pulse text-black " : ""}  ${hasOngoing ? "bg-green-400 font-bold" : ""}`}
                                        title={`Day ${day}`}
                                    >
                                        {day}
                                    </th>
                                );
                            })}
                        </tr>

                    </thead>


                    {/* Body */}
                    <tbody>
                        {departments.map((dept) => (
                            <tr
                                key={dept.name}
                                onClick={() => handleOpen(dept.name)}
                                className="hover:bg-gray-50 transition-all duration-150 border-b border-gray-100 cursor-pointer"

                            >
                                <td className="sticky left-0  px-4 py-3 font-medium text-gray-800 whitespace-nowrap z-10 w-[120px] border-r border-gray-100">
                                    {dept.name}
                                </td>

                                {days.map((day) => {
                                    const status = getStatus(dept, day);
                                    const icon =
                                        status === "completed" ? "" :
                                            status === "ongoing" ? "H" :
                                                "✕";

                                    const dotColor =
                                        // status === "completed"
                                        //     ? "bg-green-500 text-white w-6 h-6"
                                        //     : status === "ongoing"
                                        //         ? "bg-yellow-100 border-2 border-t-transparent border-yellow-300 rounded-full animate-spin absolute text-black w-5 h-5"
                                        //         : "bg-red-400 text-white w-6 h-6";
                                        status === "completed"
                                            ? ""
                                            : status === "ongoing"
                                                ? "bg-green-300 text-white w-full h-full  text-[18px]"
                                                : "bg-red-400 text-white w-6 h-6 rounded-full ";
                                    const isToday = day === today;
                                    return (
                                        <td
                                            key={day}
                                            className={`border-r border-gray-100 last:border-r-0 relative`}
                                        >
                                            {/* กระพริบเฉพาะวันนี้ */}
                                            {isToday && (
                                                <div className="absolute inset-0 bg-yellow-300/60 animate-pulse" />
                                            )}

                                            <div className="flex justify-center items-center w-full h-full relative z-10">
                                                <span
                                                    className={`${dotColor} text-[10px] font-bold flex items-center justify-center shadow-sm`}
                                                    title={`${status} - day ${day}`}
                                                >
                                                    {icon}
                                                </span>
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
