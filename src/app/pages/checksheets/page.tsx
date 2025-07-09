"use client";
import React, { useState, useEffect, use } from "react";
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


type Department = {
    FormID: string;
    FormName: string;
    Department: string;
    status: string;
    checked: number[];
    ongoing: number[];
    overdue: number[];
    stopline: number[]; // 👈 เพิ่มตรงนี้
};








const TimelineMatrix = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    const [allCheckSheetData, setAllCheckSheetData] = useState<any[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);


    const [showAllOverdue, setShowAllOverdue] = useState(false);
    const [alloverdue, setalloverdue] = useState<any[]>([]);

    const handleOpen = (depName: string) => setSelectedDepartment(depName);
    const handleClose = () => setSelectedDepartment(null);

    const handleShowAllOverdue = () => setShowAllOverdue(true);
    const handleCloseOverdue = () => setShowAllOverdue(false);

    useEffect(() => {
        const FetchAllCheckSheetData = async () => {
            try {
                const response = await fetch("/api/checksheet/dailyinmouth");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setAllCheckSheetData(data.data);
                const transformed = transformDataToDepartments(data.data);
                setDepartments(transformed);
                console.log("Fetched CheckSheet Data:", data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        FetchAllCheckSheetData();
    }, []);

    // หาวันปัจจุบัน (1-31)
    const today = new Date().getDate();
    const todayKey = `Date${today}`;

    // กรองเฉพาะรายการที่ DateX ไม่เท่ากับ "0" (หรือเปลี่ยนเงื่อนไขตามต้องการ)
    const todayCheckSheetData = allCheckSheetData.filter(
        (item) => item[todayKey] !== "0"
    );

    const transformDataToDepartments = (data: any[]): Department[] => {
        const departmentsMap: { [key: string]: Department } = {};

        data.forEach((item) => {
            const departmentName = item.Department;

            if (!departmentsMap[departmentName]) {
                departmentsMap[departmentName] = {
                    FormID: item.FormID,
                    FormName: item.FormName,
                    Department: departmentName,
                    status: item.Status,
                    checked: [],
                    ongoing: [],
                    overdue: [],
                    stopline: [], // 👈 เพิ่มตรงนี้
                };
            }

            const department = departmentsMap[departmentName];
            //Object ที่มี key แบบไดนามิก”

            for (let i = 1; i <= 31; i++) {
                const dayKey = `Date${i}`;
                const value = item[dayKey];

                if (value === "-") {
                    // ⛔ สำคัญสุด: ลบจากทุก array ก่อน แล้ว push เข้า stopline
                    department.checked = department.checked.filter(d => d !== i);
                    department.ongoing = department.ongoing.filter(d => d !== i);
                    department.overdue = department.overdue.filter(d => d !== i);
                    if (!department.stopline.includes(i)) department.stopline.push(i);
                    continue;
                }

                if (value === null || value === "") {
                    department.checked = department.checked.filter(d => d !== i);
                    department.overdue = department.overdue.filter(d => d !== i);
                    department.stopline = department.stopline.filter(d => d !== i);
                    if (!department.ongoing.includes(i)) department.ongoing.push(i);
                    continue;
                }

                if (value === "0") {
                    department.checked = department.checked.filter(d => d !== i);
                    department.ongoing = department.ongoing.filter(d => d !== i);
                    department.stopline = department.stopline.filter(d => d !== i);
                    if (!department.overdue.includes(i)) department.overdue.push(i);
                    continue;
                }

                if (value === "1") {
                    if (
                        !department.ongoing.includes(i) &&
                        !department.overdue.includes(i) &&
                        !department.stopline.includes(i)
                    ) {
                        if (!department.checked.includes(i)) department.checked.push(i);
                    }
                    continue;
                }

                // ถ้าเป็น "2" (holiday) → ไม่ต้องแสดงอะไร
            }
        });

        return Object.values(departmentsMap);
    };


    const getStatus = (
        dept: Department,
        day: number
    ): "completed" | "ongoing" | "overdue" | "stopline" | "holiday" | "null" => {
        if (dept.stopline.includes(day)) return "stopline";
        if (dept.ongoing.includes(day)) return "ongoing";
        if (dept.overdue.includes(day)) return "overdue";
        if (dept.checked.includes(day)) return "completed";

        // ✅ ตรวจสอบ holiday (คุณอาจต้องเพิ่ม logic ตรวจ holiday ถ้ามี field แยก)
        const dayValue = allCheckSheetData.find(d => d.Department === dept.Department)?.[`Date${day}`];
        if (dayValue === "2") return "holiday";

        return "null";
    };




    const FetchAllOverdue = async () => {
        try {
            const response = await fetch("/api/checksheet/alloverdue");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setalloverdue(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


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
                                name: dept.Department,
                                Completed: dept.checked.length,
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
                    <section
                        onClick={handleShowAllOverdue}
                        className="w-full bg-gradient-to-br from-red-50 to-white shadow-xl rounded-2xl border border-red-300 p-6 h-[400px] transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[26px] font-bold mb-4 text-red-600 flex items-center justify-center gap-2 uppercase me-4">
                            <span className="animate-pulse  h-9.5 text-2xl ">⚠️</span>
                            <div>
                                Overdue
                            </div>
                        </h2>
                        <table className="w-full text-[22px] border-collapse">
                            <thead>
                                <tr className="border-b border-red-200 uppercase">
                                    <th className="text-left py-2 text-red-600">Department</th>
                                    <th className="text-center py-2 text-red-600">sheet</th>
                                </tr>
                            </thead>
                            <tbody>
                                 {departments
                                    .filter((dept) => dept.overdue)
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.Department}-overdue`}

                                            className="border-b border-red-100 last:border-none transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                                        >
                                            <td className="py-2 font-semibold text-red-800">{dept.Department}</td>
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
                                <tr className="border-b border-yellow-200 uppercase">
                                    <th className="text-left py-2 text-yellow-600">department</th>
                                    <th className="text-center py-2 text-yellow-600">sheet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments
                                    .filter((dept) => dept.ongoing)
                                    .map((dept) => (
                                        <tr
                                            key={`${dept.Department}-ongoing`}
                                            className="border-b border-yellow-100 last:border-none transition-all duration-200 hover:bg-yellow-100 hover:shadow-sm"
                                        >
                                            <td className="py-2 font-semibold text-yellow-800">{dept.Department}</td>
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
                                const today = new Date().getDate();
                                const isToday = day === today;
                                const hasOngoing = departments.some((dept) => dept.ongoing.includes(day));
                                return (
                                    <th
                                        key={day}
                                        className={`px-3 py-3 text-center text-xs font-medium text-gray-600 border-r border-gray-100 last:border-r-0 select-none transition-all duration-300
                                            ${isToday ? "bg-yellow-400 animate-pulse text-black " : ""}  ${hasOngoing ? "bg-gray-400 font-bold" : ""}`}
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
                                key={dept.Department}
                                onClick={() => handleOpen(dept.Department)}
                                className="hover:bg-gray-50 transition-all duration-150 border-b border-gray-100 cursor-pointer"

                            >
                                <td className="sticky left-0  px-4 py-3 font-medium text-gray-800 whitespace-nowrap z-10 w-[120px] border-r border-gray-100">
                                    {dept.Department}
                                </td>

                                {days.map((day) => {
                                    let status = getStatus(dept, day);
                                    const today = new Date().getDate();
                                    const isToday = day === today;

                                    // 👇 ถ้าวันหลังวันนี้และ status เป็น overdue → เปลี่ยนให้ไม่แสดง icon
                                    if (day > today && status === "overdue") {
                                        status = "null";
                                    }
                                    else if (day === today && status === "overdue") {
                                         status = "ongoing";
                                        }


                                    const icon =
                                        status === "completed" ? "C" :
                                            status === "ongoing" ? "" :
                                                status === "overdue" ? "✕" :
                                                    status === "stopline" ? "S" :
                                                        status === "holiday" ? "H" :
                                                            "";

                                    const dotColor =
                                        status === "completed"
                                            ? "bg-green-400 text-white w-6 h-6 rounded-full"
                                            : status === "ongoing"
                                                ? "bg-gray-300 text-white w-6 h-6 rounded-full"
                                                : status === "overdue"
                                                    ? "bg-red-500 text-white w-6 h-6 rounded-full"
                                                    : status === "stopline"
                                                        ? "bg-black text-white w-6 h-6 rounded-full"
                                                        : status === "holiday"
                                                            ? "bg-yellow-300 text-black w-6 h-6 rounded-full"
                                                            : "";

                                    return (
                                        <td key={day} className="border-r border-gray-100 last:border-r-0 relative">
                                            {isToday && (
                                                <div className="absolute inset-0 bg-yellow-300/60 animate-pulse" />
                                            )}
                                            <div className="flex justify-center items-center w-full h-full relative z-10">
                                                {status !== "null" && (
                                                    <span
                                                        className={`${dotColor} text-[12px] font-bold flex items-center justify-center shadow-sm`}
                                                        title={`${status} - day ${day}`}
                                                    >
                                                        {icon}
                                                    </span>
                                                )}
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
            {/* {selectedDepartment && selectedDepData && (
                <DepartmentChecksheetTable
                    department={selectedDepartment}
                    data={checkSheetData}
                    onClose={handleClose}
                />
            )}
            {showAllOverdue && (
                <DepartmentChecksheetTable
                    department="รวมทุกแผนก"
                    data={convertAllOverdueToChecksheetItems()}
                    onClose={handleCloseOverdue}
                />
            )} */}




        </div>
    );
};

export default TimelineMatrix;
