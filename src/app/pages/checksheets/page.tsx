"use client";
import React, { useState, useEffect } from "react";
import MonthYearSelector from "@/app/pages/checksheets/componentschecksheets/MonthYearSelector";
import DepartmentChecksheetDetails from "@/app/pages/checksheets/componentschecksheets/DepartmentChecksheetDetails";
import DepartmentAllChecksheet from "@/app/pages/checksheets/componentschecksheets/DepartmentAllChecksheet";

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


type Department30daytable = {
    Department: string;
    status: string;
    checked: number[];
    ongoing: number[];
    overdue: number[];
    holiday?: number[];
    stopline: number[];
    documentCount: number;
};

const TimelineMatrix = () => {
    //ปีและเดือนปัจจุบัน
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const getDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
    const days = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const isCurrentMonth = month === currentMonth && year === currentYear;


    //for table data
    const [departments30daytable, setDepartments30daytable] = useState<Department30daytable[]>([]);
    const transformDataToDepartments = (data: any[], month: number, year: number): Department30daytable[] => {
        const departmentsMap: { [key: string]: Department30daytable } = {};
        const now = new Date();
        const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;
        const today = now.getDate();
        const lastDay = new Date(year, month, 0).getDate();
        const loopUntil = isCurrentMonth ? today : lastDay;

        data.forEach((item) => {
            const departmentName = item.Department;

            if (!departmentsMap[departmentName]) {
                departmentsMap[departmentName] = {
                    Department: departmentName,
                    status: item.status,
                    checked: [],

                    ongoing: [],

                    overdue: [],

                    stopline: [],

                    documentCount: 0,

                };
            }

            const department = departmentsMap[departmentName];

            // เพิ่มจำนวนเอกสารทีละ 1
            department.documentCount += 1;

            for (let i = 1; i <= loopUntil; i++) {
                const dayKey = `Date${i}`;
                const value = item[dayKey];

                if (value === "-") {
                    department.checked = department.checked.filter(d => d !== i);
                    department.ongoing = department.ongoing.filter(d => d !== i);
                    department.overdue = department.overdue.filter(d => d !== i);
                    if (!department.stopline.includes(i)) department.stopline.push(i);
                    continue;
                }

                if (i === today && value === "0" && isCurrentMonth) {
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

                if (value === "2") {
                    if (!department.holiday) department.holiday = [];
                    if (!department.holiday.includes(i)) department.holiday.push(i);
                    continue;
                }
            }
        });

        return Object.values(departmentsMap).sort((a, b) => b.documentCount - a.documentCount);
        ;
    };



    const getStatus = (
        dept: Department30daytable,
        day: number
    ): "completed" | "ongoing" | "overdue" | "stopline" | "holiday" | "null" => {
        if (dept.stopline.includes(day)) return "stopline";
        if (dept.ongoing.includes(day)) return "ongoing";
        if (dept.overdue.includes(day)) return "overdue";
        if (dept.checked.includes(day)) return "completed";
        if (dept.holiday && dept.holiday.includes(day)) return "holiday";

        return "null";
    };

    const allHolidayDays = Array.from(
        new Set(
            departments30daytable.flatMap((d) =>
                Array.isArray(d.holiday) ? d.holiday : []
            )
        )
    );


    // สำหรับแสดงรายการเช็คชีตที่เกินกำหนด
    const [alloverdue, setalloverdue] = useState<any[]>([]);
    const convertAllOverdueToChecksheetItems = (data: any[], month: number, year: number) => {
        const now = new Date();
        const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;
        const today = now.getDate();
        const lastDay = new Date(year, month, 0).getDate();

        const result: any[] = [];

        //ทุกรอบ : วนแถวแรก นับเฉพาะวันที่ตรงตามเงี่ยนไข ตรง count++ ถ้า count > 0 เก็บไว้ใน result + count
        for (const item of data) {
            let count = 0;

            for (let i = 1; i <= lastDay; i++) {
                const isInRange = isCurrentMonth ? i < today : i <= lastDay;

                if (isInRange && item[`Date${i}`] === "0") {
                    count++;
                }
            }

            // ✅ ถ้าเจอ "0" อย่างน้อย 1 ตัว → push ลง result
            if (count > 0) {
                result.push({ ...item, count });
            }
        }


        // ✅ เรียงจากมาก → น้อย
        return result.sort((a, b) => b.count - a.count);
    };



    const groupOverdueByDepartment = (items: any[]) => {
        const grouped: { [key: string]: number } = {};

        items.forEach((item) => {
            const dept = item.Department || "Unknown";
            if (!grouped[dept]) grouped[dept] = 0;
            grouped[dept]++;
        });

        return Object.entries(grouped)
            .sort((a, b) => b[1] - a[1]) // ✅ ใช้ index แทน .count
            .map(([Department, count]) => ({
                Department,
                count,
            }));
    };

    // สำหรับแสดงรายการเช็คชีทที่กำลังรอในวันปัจจุบัน
    const [allongoing, setallongoing] = useState<any[]>([]);

    const convertAllOngoingToChecksheetItems = (data: any[], month: number, year: number) => {
        const now = new Date();
        const isCurrentMonth = now.getMonth() + 1 === month && now.getFullYear() === year;
        const today = now.getDate();

        if (!isCurrentMonth) return []; // ✅ ongoing เฉพาะเดือนปัจจุบันเท่านั้น

        return data.filter(item => item[`Date${today}`] === "0");
    };

    const groupOngoingByDepartment = (items: any[]) => {
        const grouped: { [key: string]: number } = {};

        items.forEach((item) => {
            const dept = item.Department || "Unknown";
            if (!grouped[dept]) grouped[dept] = 0;
            grouped[dept]++;
        });

        return Object.entries(grouped)
            .sort((a, b) => b[1] - a[1]) // ✅ ใช้ index แทน .count
            .map(([Department, count]) => ({
                Department,
                count,
            }));

    };

    //มัดรวม graph bar
    const combineOverdueAndOngoing = () => {
        const overdue = groupOverdueByDepartment(alloverdue);   // [{ Department: "A", count: 3 }, ...]

        const map: { [dept: string]: { Department: string; Overdue: number; Ongoing: number } } = {};

        departmentdata.forEach(({ Department }) => {
            map[Department] = { Department, Overdue: 0, Ongoing: 0 };
        });

        overdue.forEach(({ Department, count }) => {
            if (!map[Department]) {
                map[Department] = { Department, Overdue: 0, Ongoing: 0 };
            }
            map[Department].Overdue = count;
        });

        return Object.values(map).sort((a, b) => b.Overdue - a.Overdue);
    };

    const FetchAllCheckSheetData = async (month: number, year: number) => {
        try {
            const response = await fetch(`/api/checksheet/dailyinmouth?month=${month}&year=${year}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setDepartmentdata(data.data);

            const overdue = convertAllOverdueToChecksheetItems(data.data, month, year);
            setalloverdue(overdue);

            const ongoing = convertAllOngoingToChecksheetItems(data.data, month, year);
            setallongoing(ongoing);

            const transformed = transformDataToDepartments(data.data, month, year);
            setDepartments30daytable(transformed);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        setSelectedDept(""); // reset การเลือก
        setalloverdue([]);
        setallongoing([]); // ✅ ปรับจาก null เป็น []
        setSelectedType("")
        FetchAllCheckSheetData(month, year);
    }, [month, year]);

    const [selectedType, setSelectedType] = useState<"overdue" | "ongoing" | "">("");
    const [selectedDept, setSelectedDept] = useState("");
    const [departmentdata, setDepartmentdata] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<"detail" | "all" | "">("");

    const colors = [
        "bg-red-100 text-red-600 hover:bg-red-200",
        "bg-green-100 text-green-600 hover:bg-green-200",
        "bg-blue-100 text-blue-600 hover:bg-blue-200",
        "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
        "bg-purple-100 text-purple-600 hover:bg-purple-200",
    ];


    return (
        <div className="min-h-screen bg-white px-8 pt-8 flex flex-col justify-center items-center text-black">

            {/* Header */}
            <header className="flex justify-end w-full mb-2 text-center mt-18">
                <h1 className="text-3xl font-bold text-blue-900 uppercase">
                    checksheet monitoring
                </h1>

            </header>
            <div className="flex justify-end items-center w-full ">
                <div className="flex rounded-full bg-blue-900 text-blue-800 h-1 w-[22%] shadow-md "></div>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-gradient-to-tr from-sky-50 to-white w-full h-fit my-6">
                <table className=" w-full text-[18px] text-blue-900 font-bold h-full uppercase">
                    {/* Header */}
                    <thead className="bg-gradient-to-br from-blue-50 to-white">
                        <tr className=" border-gray-200">
                            <th colSpan={days.length + 1} className="px-6 pt-4 border-gray-100 text-left">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-3xl  uppercase tracking-wide">
                                        📋 Daily Checksheet Realtime
                                    </h1>
                                    <MonthYearSelector
                                        currentMonth={month}
                                        currentYear={year}
                                        onChange={(newMonth, newYear) => {
                                            setMonth(newMonth);
                                            setYear(newYear);
                                            FetchAllCheckSheetData(newMonth, newYear);
                                        }}
                                    />
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={days.length + 1} className="px-6 pb-4 pt-2 border-b border-gray-100 text-left">
                                <div className="flex flex-wrap gap-4">
                                    {departments30daytable.map((dept, idx) => (
                                        // ${colors[idx % colors.length]} ใช้เพื่อ map สีตาม array
                                        <div
                                            key={idx}
                                            className={`px-4 py-1 rounded-full shadow-sm cursor-default text-sm whitespace-nowrap bg-white`}
                                        >
                                            {`${dept.Department} : ${dept.documentCount}`}
                                        </div>
                                    ))}
                                </div>

                            </th>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className=" left-0 p-4 text-left z-30 w-[120px] border-r border-gray-200 ">
                                Department
                            </th>
                            {days.map((day) => {
                                const todayDate = new Date().getDate();

                                const isToday = isCurrentMonth && day === todayDate;

                                const isHoliday = allHolidayDays.includes(day);


                                return (
                                    <th
                                        key={day}
                                        className={`px-3 py-3 text-center  border-r border-gray-100 last:border-r-0 select-none transition-all duration-300
                ${isToday ? "bg-yellow-400 animate-pulse text-black " : ""}  
                ${isHoliday ? "bg-gray-400 " : ""}`}
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
                        {isCurrentMonth &&
                            departments30daytable.map((dept) => (
                                <tr
                                    key={dept.Department}
                                    className="hover:bg-gray-50 transition-all duration-150 border-b border-gray-100 cursor-pointer"
                                >
                                    <td
                                        onClick={() => { setSelectedDept(dept.Department); setViewMode('all') }}
                                        className=" left-0 px-4 py-3   whitespace-nowrap z-10 w-[120px] border-r border-gray-100 font-medium">
                                        {dept.Department}
                                    </td>

                                    {days.map((day) => {
                                        let status = getStatus(dept, day);
                                        const todayDate = new Date().getDate();
                                        const isToday = day === todayDate && month === currentMonth && year === currentYear;
                                        const isHoliday = allHolidayDays.includes(day);


                                        const isFutureOverdue = day > todayDate && status === "overdue";

                                        let icon = "";
                                        if (!isFutureOverdue) {
                                            if (status === "completed") icon = "✓";
                                            else if (status === "ongoing") icon = "";
                                            else if (status === "overdue") icon = "✕";
                                            else if (status === "stopline") icon = "S";
                                        }


                                        const dotColor =
                                            status === "completed" ? "bg-green-400 text-white  rounded-full shadow-sm" :
                                                status === "ongoing" ? "" :
                                                    isFutureOverdue ? "" : // ✅ ใช้เงื่อนไขแทรกได้เลย
                                                        status === "overdue" ? "bg-red-500 text-white  rounded-full shadow-sm" :
                                                            status === "stopline" ? "bg-black text-white  rounded-full shadow-sm" : "";

                                        return (
                                            <td
                                                onClick={() => { setSelectedDept(dept.Department); setViewMode('all') }}
                                                key={day} className="min-w-[40px] min-h-[40px] border-r border-gray-100 last:border-r-0 relative">
                                                {isToday && (
                                                    <div className="absolute inset-0 bg-yellow-300/60 animate-pulse" />
                                                )}
                                                {isHoliday && (
                                                    <div className="absolute inset-0 bg-gray-200/60" />
                                                )}
                                                <div className="flex justify-center items-center w-full h-full relative z-10">
                                                    {status !== "null" && (
                                                        <span
                                                            className={`${dotColor} text-[15px] w-6 h-6  flex items-center justify-center `}
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

                    <tbody>
                        {!isCurrentMonth &&
                            departments30daytable.map((dept) => (
                                <tr
                                    onClick={() => { setSelectedDept(dept.Department); setViewMode('all') }}
                                    key={dept.Department}

                                    className="hover:bg-gray-50 transition-all duration-150 border-b border-gray-100 cursor-pointer"
                                >
                                    <td className="sticky left-0 px-4 py-3  whitespace-nowrap z-10 w-[120px] border-r border-gray-100 font-medium ">
                                        {dept.Department}
                                    </td>

                                    {days.map((day) => {
                                        let status = getStatus(dept, day);
                                        const holiday = departments30daytable.find(d =>
                                            Array.isArray(d.holiday) && d.holiday.includes(day)
                                        );

                                        const icon =
                                            status === "completed" ? "✓" :
                                                status === "ongoing" ? "" :
                                                    status === "overdue" ? "✕" :
                                                        status === "stopline" ? "S" : "";

                                        const dotColor =
                                            status === "completed" ? "bg-green-400 text-white w-6 h-6 rounded-full" :
                                                status === "ongoing" ? "" :
                                                    status === "overdue" ? "bg-red-500 text-white w-6 h-6 rounded-full" :
                                                        status === "stopline" ? "bg-black text-white w-6 h-6 rounded-full" : "";

                                        return (
                                            <td key={day} className="border-r border-gray-100 last:border-r-0 relative">
                                                {holiday && (
                                                    <div className="absolute inset-0 bg-gray-200/60" />
                                                )}
                                                <div className="flex justify-center items-center w-full h-full relative z-10">
                                                    {status !== "null" && (
                                                        <span
                                                            className={`${dotColor} flex items-center justify-center shadow-sm`}
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

            {/* Summary + Lists */}
            <section className="flex flex-col md:flex-row justify-evenly gap-8 mb-6 w-full">
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-blue-50 to-white shadow-2xl rounded-2xl p-6 border border-gray-200 h-[400px] w-full">
                    <h2 className="text-3xl font-bold mb-4 text-blue-900 uppercase">
                        summary overdue
                    </h2>
                    {/* Summary Info Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-700 mb-3">
                        {/* <div className="px-3 py-1 bg-white rounded-full shadow-sm flex items-center gap-1 hover:bg-gray-200 cursor-default">
                            🏢 แผนกทั้งหมด: {departments.length}
                        </div> */}
                        <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full shadow-sm flex items-center gap-1 hover:bg-red-200 cursor-default">
                            ⚠️ OVERDUE : {alloverdue.length}
                        </div>
                        {/* <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full shadow-sm flex items-center gap-1 hover:bg-yellow-200 cursor-default">
                            ⏳ ONGOING รวม: {departments.reduce((sum, d) => sum + d.ongoing.length, 0)}
                        </div> */}
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={combineOverdueAndOngoing()}
                            margin={{ top: 10, right: 50, left: 0, bottom: 10 }}
                            barCategoryGap="20%"
                            barGap={6}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="Department" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            {/* <Legend /> */}

                            <Bar
                                dataKey="Overdue"
                                name="OVERDUE"
                                fill="#f87171"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                                onClick={(data) => {
                                    setSelectedDept(data.Department); // ✅ ชื่อแผนกที่ถูกคลิก
                                    setSelectedType("overdue");       // ✅ ตั้งประเภท
                                    setViewMode('detail');
                                }}
                            />

                            {/* <Bar
                                dataKey="Ongoing"
                                name="ONGOING"
                                fill="#facc15"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1000}
                            /> */}
                        </BarChart>
                    </ResponsiveContainer>



                </div>



                {/* Overdue & Ongoing Lists */}
                <div className="flex gap-6 justify-start items-start w-[2000px]">

                    {/* Overdue */}
                    <section className="w-full bg-gradient-to-br from-red-50 to-white shadow-xl rounded-2xl border border-gray-200 p-6 h-[400px] transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[26px] font-bold mb-4 text-blue-900 flex items-center justify-center gap-2 uppercase">
                            <span className="animate-pulse text-2xl">⚠️</span>
                            <div>Overdue</div>
                        </h2>

                        <table className="w-full text-[20px] border-collapse">
                            <thead>
                                <tr className="border-b border-red-200 uppercase text-left text-blue-900">
                                    <th className="py-2 pl-2">Department</th>
                                    <th className="text-center">Sheet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupOverdueByDepartment(alloverdue).map((item) => (
                                    <tr
                                        key={`${item.Department}-overdue`}
                                        className="border-b border-red-100 last:border-none transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                                    >
                                        <td className="py-2 pl-2 font-semibold text-blue-900">{item.Department}</td>

                                        <td className="w-[60px] p-2 text-center font-bold text-blue-900">
                                            {item.count}
                                        </td>

                                        <td className="w-[40px] p-2 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedDept(item.Department);
                                                    setSelectedType("overdue");
                                                    setViewMode('detail');
                                                }}
                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-blue-200 bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-700 shadow-sm transition-all duration-200"
                                                title={`ดูรายละเอียดแผนก ${item.Department}`}
                                            >
                                                🔍
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </section>

                    {/* Ongoing */}
                    <section className="w-full bg-gradient-to-br from-yellow-50 to-white shadow-xl rounded-2xl border border-gray-200 p-6 h-[400px] transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-[26px] font-bold mb-4 text-blue-900 flex items-center justify-center gap-2 uppercase">
                            <span className="animate-spin ">⏳</span>
                            <div>Ongoing</div>
                        </h2>
                        <table className="w-full text-[20px] border-collapse">
                            <thead>
                                <tr className="border-b border-yellow-200 uppercase text-left text-blue-900">
                                    <th className="py-2 pl-2">Department</th>
                                    <th className="text-center">Sheet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupOngoingByDepartment(allongoing).map((item) => (
                                    <tr
                                        key={`${item.Department}-ongoing`}
                                        className="border-b border-yellow-100 last:border-none transition-all duration-200 hover:bg-red-100 hover:shadow-sm"
                                    >
                                        <td className="py-2 pl-2 font-semibold text-blue-900">{item.Department}</td>

                                        <td className="w-[60px] p-2 text-center font-bold text-blue-900">
                                            {item.count}
                                        </td>

                                        <td className="w-[40px] p-2 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedDept(item.Department);
                                                    setSelectedType("ongoing");
                                                    setViewMode('detail');
                                                }}
                                                className="w-7 h-7 flex items-center justify-center rounded-md border border-blue-200 bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-700 shadow-sm transition-all duration-200"
                                                title={`ดูรายละเอียดแผนก ${item.Department}`}
                                            >
                                                🔍
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </section>

                </div>
            </section>

            {
                selectedDept && (
                    <>
                        {viewMode === "detail" && selectedType && (
                            <DepartmentChecksheetDetails
                                department={selectedDept}
                                data={selectedType === "overdue" ? alloverdue : allongoing}
                                setSelectedDept={setSelectedDept}
                                type={selectedType}
                                month={month}
                                year={year}
                            />
                        )}

                        {viewMode === "all" && (
                            <DepartmentAllChecksheet
                                department={selectedDept}
                                data={departmentdata}
                                setSelectedDept={setSelectedDept}
                                month={month}
                                year={year}
                            />
                        )}
                    </>
                )
            }




        </div >
    );
};

export default TimelineMatrix;
