// import { NextRequest, NextResponse } from 'next/server';
// import { getDashboardConnection } from '../../../../lib/db';

// export async function GET(req: NextRequest) {
//     try {
//         const url = new URL(req.url);
//         const monthParam = url.searchParams.get('month');
//         const yearParam = url.searchParams.get('year');
//         const now = new Date();
//         const currentDay = now.getDate();
//         const currentYear = now.getFullYear();
//         const currentMonth = now.getMonth() + 1; // JavaScript: 0-based

//         // const currentHour = now.getHours();
//         // const currentMinute = now.getMinutes();

//         // ใช้ month/year ที่ส่งมาหรือใช้ของปัจจุบัน
//         let year = yearParam ? parseInt(yearParam) : currentYear;
//         let month = monthParam ? parseInt(monthParam) : currentMonth;

//         // // หาวันสุดท้ายของเดือน
//         // const lastDay = new Date(year, month, 0).getDate();
//         // const isBefore745 = (currentHour < 7) || (currentHour === 7 && currentMinute < 45);

//         // // ถ้าวันนี้คือวันที่ 1 และยังไม่ถึง 7:45 → ย้อนกลับไปเดือนก่อนหน้า
//         // if (currentDay === 1 && isBefore745 && month === currentMonth && year === currentYear) {
//         //     now.setDate(0); // ไปวันสุดท้ายของเดือนก่อน
//         //     year = now.getFullYear();
//         //     month = now.getMonth() + 1;
//         // }

//         const pool = await getDashboardConnection();
//         const result = await pool
//             .request()
//             .input('year', year)
//             .input('month', month)
//             .query(`
//                 SELECT *
//                 FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
//                 WHERE YEAR(CreateTime) = @year AND MONTH(CreateTime) = @month
//                 ORDER BY [CreateTime] DESC
//             `);

//         return NextResponse.json({
//             year,
//             month,
//             // lastDay,
//             data: result.recordset
//         });

//     } catch (error) {
//         console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
//         return NextResponse.json(
//             { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
//             { status: 500 }
//         );
//     }
// }

import { NextRequest, NextResponse } from 'next/server';

// Mock data generator สำหรับ DailyChecksheet
const generateMockDailyChecksheet = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const data = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(year, month - 1, day, 8, 0, 0).toISOString();
    data.push({
      id: day,
      CreateTime: dateStr,
      Line: `Line${(day % 3) + 1}`,
      Operator: `Operator${(day % 5) + 1}`,
      CheckStatus: day % 2 === 0 ? 'OK' : 'Pending',
      Remarks: day % 2 === 0 ? '' : 'Check required'
    });
  }

  return data;
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const monthParam = url.searchParams.get('month');
    const yearParam = url.searchParams.get('year');

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const year = yearParam ? parseInt(yearParam) : currentYear;
    const month = monthParam ? parseInt(monthParam) : currentMonth;

    // สร้าง mock data สำหรับเดือนนั้น
    const data = generateMockDailyChecksheet(year, month);

    return NextResponse.json({
      year,
      month,
      data
    });
  } catch (error) {
    console.error('Error fetching mock data:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

