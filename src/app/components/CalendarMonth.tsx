import React from 'react';

interface CalendarMonthProps {
  title?: string; // ใส่ชื่อแผนกหรือชื่อหัวข้อ
}

const departments = [0];
const totalDays = 31;

const today = new Date();
const todayDate = today.getDate(); // ใช้เป็นเส้นแบ่งระหว่าง "แดง/เขียว" กับ "เหลือง"

const statusColorMap: Record<string, string> = {
  checked: 'bg-green-100 text-green-800',
  unchecked: 'bg-red-100 text-red-800',
  future: 'bg-yellow-100 text-yellow-900 font-semibold',
};

const CalendarMonth: React.FC<CalendarMonthProps> = ({ title }) => {
  // สุ่มสถานะของแต่ละแผนกแต่ละวัน
  const generateMockStatuses = () => {
    const result: Record<number, Record<string, string>> = {};
    for (let day = 1; day <= totalDays; day++) {
      result[day] = {};
      departments.forEach((dept) => {
        if (day > todayDate) {
          result[day][dept] = 'future';
        } else {
          const rand = Math.random();
          result[day][dept] = rand > 0.5 ? 'checked' : 'unchecked';
        }
      });
    }
    return result;
  };

  const mockStatuses = generateMockStatuses();

  return (
    <div className="bg-white p-4 border rounded-xl shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-center font-bold text-lg mb-4 text-gray-700">
        📋 {title || 'ปฏิทินเช็คเอกสารรายวัน'}
      </h2>

      <div className="grid grid-cols-7 gap-2 text-[11px]">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className="min-h-[80px] border rounded-md p-1 flex flex-col justify-start bg-white hover:bg-gray-50 transition"
          >
            <div className="text-xs text-right text-gray-600 font-semibold mb-1">
              {day}
            </div>
            <div className="flex flex-col gap-[2px]">
              {departments.map((dept) => {
                const status = mockStatuses[day]?.[dept];
                const color = statusColorMap[status];
                return (
                  <span
                    key={dept}
                    className={`rounded-full px-2 py-[2px] text-[10px] w-fit ${color}`}
                  >
                    {dept}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
