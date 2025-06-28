import React from 'react';

interface DepartmentStatus {
    department: string;
    lastCheckedDay: number; // วันที่ล่าสุดที่แผนกเช็คเอกสาร (1-31)
}
//pro .qa .en .wh .hr and admin,
const departmentsStatus: DepartmentStatus[] = [
    { department: 'PRODUCTION', lastCheckedDay: 20 },
    { department: 'QA', lastCheckedDay: 22 },
    { department: 'ENGINEER', lastCheckedDay: 10 },
    { department: 'WAREHOUSE', lastCheckedDay: 10 },
    { department: 'HR AND ADMIN', lastCheckedDay: 30 },
];

const today = new Date().getDate();

interface DepartmentCalendarCardProps {
    department: string;
    lastCheckedDay: number;
}

const statusColors = {
    checked: 'bg-green-400',
    today: 'bg-yellow-400',
    upcoming: 'bg-yellow-200',
    overdue: 'bg-red-400',
};

const DepartmentCalendarCard: React.FC<DepartmentCalendarCardProps> = ({
    department,
    lastCheckedDay,
}) => {
    const daysInMonth = 31;

    // เตรียมช่องปฏิทิน 35 ช่อง (5 แถว 7 คอลัมน์)
    const firstDayIndex = 0; // สมมติวันที่ 1 เริ่มจันทร์
    const calendarCells: (number | null)[] = [];

    for (let i = 0; i < firstDayIndex; i++) calendarCells.push(null);
    for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);
    while (calendarCells.length < 35) calendarCells.push(null);

    // คำนวณจำนวนสถานะแต่ละแบบ
    const checkedCount = lastCheckedDay > today ? today - 1 : lastCheckedDay; // เช็คแล้ว (ก่อนหรือเท่ากับวันนี้ที่เช็คได้)
    const todayCount = 1; // วันนี้
    const upcomingCount = daysInMonth - today; // ยังไม่ถึงวัน
    const overdueCount = today - 1 - checkedCount > 0 ? today - 1 - checkedCount : 0; // เลยวันวันนี้ แต่ยังไม่เช็ค

    const getStatusColor = (day: number | null) => {
        if (day === null) return 'bg-transparent';
        if (day <= lastCheckedDay) return statusColors.checked;
        if (day === today) return statusColors.today;
        if (day > today) return statusColors.upcoming;
        return statusColors.overdue;
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 max-w-[320px] w-full flex flex-col">
            <h3 className="text-xl font-semibold mb-3 text-center text-gray-700">{department}</h3>

            <div className="grid grid-cols-7 gap-1 text-xs text-center font-semibold text-gray-600 select-none">
                {/* หัววัน */}
                {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'].map((d) => (
                    <div key={d} className="border-b pb-1">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mt-1 text-center flex-grow">
                {calendarCells.map((day, idx) => {
                    const bgColor = getStatusColor(day);
                    return (
                        <div
                            key={idx}
                            className={`${bgColor} rounded-lg h-10 flex items-center justify-center cursor-default
                ${day === today ? 'border-2 border-yellow-600' : ''}
              `}
                            title={day ? `วันที่ ${day}` : ''}
                        >
                            {day ?? ''}
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="mt-4 border-t pt-3 text-sm space-y-1 text-gray-700">
                <div>
                    <span className="inline-block w-4 h-4 bg-green-400 rounded mr-2 align-middle"></span>
                    เช็คไปแล้ว: <strong>{checkedCount}</strong> วัน
                </div>
                <div>
                    <span className="inline-block w-4 h-4 bg-yellow-200 rounded mr-2 align-middle"></span>
                    ยังไม่เช็ค (วันอนาคต): <strong>{upcomingCount}</strong> วัน
                </div>
                <div>
                    <span className="inline-block w-4 h-4 bg-red-400 rounded mr-2 align-middle"></span>
                    ไม่เช็คผ่านมาแล้ว: <strong>{overdueCount}</strong> วัน
                </div>
            </div>
        </div>
    );
};

const MultiDepartmentCalendar = () => {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center mt-22 text-black">ปฏิทินเช็คเอกสารรายแผนก Checksheets</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 justify-center">
                {departmentsStatus.map(({ department, lastCheckedDay }) => (
                    <DepartmentCalendarCard
                        key={department}
                        department={department}
                        lastCheckedDay={lastCheckedDay}
                    />
                ))}
            </div>
        </div>
    );
};

export default MultiDepartmentCalendar;
