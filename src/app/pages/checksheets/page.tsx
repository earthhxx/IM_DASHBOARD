import React from 'react';

interface DepartmentStatus {
  department: string;
  lastCheckedDay: number; // วันที่ล่าสุดที่แผนกเช็คเอกสาร (1-31)
}

const departmentsStatus: DepartmentStatus[] = [
  { department: 'ผลิต', lastCheckedDay: 15 },
  { department: 'QC', lastCheckedDay: 22 },
  { department: 'บรรจุ', lastCheckedDay: 10 },
  { department: 'จัดส่ง', lastCheckedDay: 30 },
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

  // วันที่ในรูปแบบ array สำหรับตาราง 7 คอลัมน์ (อาทิตย์เป็นวันแรก)
  // แต่เราจะเริ่มที่วันจันทร์ = 0 (ปรับได้)
  // สมมติให้วันที่ 1 เริ่มวันจันทร์ (เพื่อให้ง่าย)
  // เราจะเติมช่องว่างให้เต็ม 35 ช่อง (5 แถว 7 คอลัมน์) สำหรับแสดงเหมือนปฏิทิน

  // กำหนดวันแรกของเดือนเป็นวันจันทร์ (index 0)
  const firstDayIndex = 0;

  // เตรียม array สำหรับ 35 ช่อง (5 แถว x 7 คอลัมน์)
  const calendarCells: (number | null)[] = [];

  // เติมช่องว่างก่อนวันที่ 1
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }

  // เติมวันที่ 1-31
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // เติมช่องว่างหลังสุด ให้เต็ม 35 ช่อง
  while (calendarCells.length < 35) {
    calendarCells.push(null);
  }

  // ฟังก์ชันตรวจสถานะวัน
  const getStatusColor = (day: number | null) => {
    if (day === null) return 'bg-transparent';
    if (day <= lastCheckedDay) return statusColors.checked;
    if (day === today) return statusColors.today;
    if (day > today) return statusColors.upcoming;
    return statusColors.overdue;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-[320px] w-full">
      <h3 className="text-xl font-semibold mb-3 text-center text-gray-700">{department}</h3>
      <div className="grid grid-cols-7 gap-1 text-xs text-center font-semibold text-gray-600 select-none">
        {/* หัววัน */}
        {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'].map((d) => (
          <div key={d} className="border-b pb-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-1 text-center">
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
    </div>
  );
};

const MultiDepartmentCalendar = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center mt-22 text-black">ปฏิทินเช็คเอกสารรายแผนก (หลายแผนก)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
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
