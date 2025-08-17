// import { NextRequest, NextResponse } from 'next/server';
// import { getDashboardConnection } from '../../../lib/db';
// import sql from 'mssql';

// export async function GET(req: NextRequest) {
//     const { searchParams } = req.nextUrl;
//     const team = searchParams.get('S_team');         // 'A' หรือ 'B'
//     const locationto4m = searchParams.get('locationto4m');

//     if (!team || !locationto4m) {
//         return NextResponse.json({ message: 'Missing team or location parameter' }, { status: 400 });
//     }

//     try {
//         const pool = await getDashboardConnection();

//         // ✅ Step 1: หาค่า Shift ล่าสุดของทีมที่เลือก
//         const latestResult = await pool
//             .request()
//             .input('locationto4m', sql.VarChar, locationto4m)
//             .input('shiftLike', sql.VarChar, `${team}/%`)
//             .query(`
//                 SELECT TOP 1 [Shift]
//                 FROM [DASHBOARD].[dbo].[4M_Change]
//                 WHERE [Line] = @locationto4m
//                   AND [Shift] LIKE @shiftLike
//                 ORDER BY [Date] DESC
//             `);

//         if (latestResult.recordset.length === 0) {
//             return NextResponse.json({ message: 'No shift data found for team ' + team }, { status: 404 });
//         }

//         const latestShift: string = latestResult.recordset[0].Shift;
//         const now = new Date();
//         const currentHour = now.getHours();
//         const currentMinute = now.getMinutes();

//         // ✅ ตรวจสอบว่าจะลดวันหรือไม่
//         const isNightShift = latestShift.includes('/N');
//         const isBefore745 = (currentHour < 7) || (currentHour === 7 && currentMinute < 45);

//         if (isNightShift && isBefore745) {
//             now.setDate(now.getDate() - 1); // ✅ ลดวัน
//         }
//         // else if (now) {
//         //     now.setDate(now.getDate() - 1); // ✅ ลดวัน
//         // }

//         const queryDate = now.toISOString().split('T')[0]; // 'YYYY-MM-DD'

//         // ✅ Step 2: Query ข้อมูลของวันนั้น
//         const finalResult = await pool
//             .request()
//             .input('locationto4m', sql.VarChar, locationto4m)
//             .input('shiftLike', sql.VarChar, `${team}/%`)
//             .input('queryDate', sql.Date, queryDate)
//             .query(`
//                 SELECT TOP 1 *
//                 FROM [DASHBOARD].[dbo].[4M_Change]
//                 WHERE [Line] = @locationto4m
//                   AND [Shift] LIKE @shiftLike
//                   AND CAST([Date] AS DATE) = @queryDate
//                 ORDER BY [Date] DESC
//             `);

//         if (finalResult.recordset.length === 0) {
//             return NextResponse.json({ message: 'No data found for selected date' }, { status: 404 });
//         }

//         return NextResponse.json({ data: finalResult.recordset[0] });

//     } catch (error) {
//         console.error('DB Error:', error);
//         return NextResponse.json({
//             message: 'Internal Server Error',
//             error: error instanceof Error ? error.message : 'Unknown error'
//         }, { status: 500 });
//     }
// }
import { NextRequest, NextResponse } from 'next/server';

// Mock data
const mockData = [
  {
    Line: 'Line1',
    Shift: 'A/M',
    Date: '2025-08-17T08:00:00.000Z',
    Operator: 'Alice',
    Task: 'Inspection',
    Status: 'Completed'
  },
  {
    Line: 'Line1',
    Shift: 'A/N',
    Date: '2025-08-16T20:00:00.000Z',
    Operator: 'Bob',
    Task: 'Maintenance',
    Status: 'Pending'
  },
  {
    Line: 'Line2',
    Shift: 'B/M',
    Date: '2025-08-17T08:00:00.000Z',
    Operator: 'Charlie',
    Task: 'Assembly',
    Status: 'Completed'
  }
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const team = searchParams.get('S_team');         // 'A' หรือ 'B'
  const locationto4m = searchParams.get('locationto4m');

  if (!team || !locationto4m) {
    return NextResponse.json({ message: 'Missing team or location parameter' }, { status: 400 });
  }

  // Step 1: หา shift ล่าสุด
  const latestShiftData = mockData
    .filter(d => d.Line === locationto4m && d.Shift.startsWith(team))
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())[0];

  if (!latestShiftData) {
    return NextResponse.json({ message: 'No shift data found for team ' + team }, { status: 404 });
  }

  // Step 2: ตรวจสอบเวลาปัจจุบัน
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const isNightShift = latestShiftData.Shift.includes('/N');
  const isBefore745 = currentHour < 7 || (currentHour === 7 && currentMinute < 45);
  if (isNightShift && isBefore745) {
    now.setDate(now.getDate() - 1);
  }

  const queryDate = now.toISOString().split('T')[0];

  // Step 3: เลือกข้อมูลตาม date
  const finalData = mockData
    .filter(d => 
      d.Line === locationto4m && 
      d.Shift.startsWith(team) &&
      d.Date.startsWith(queryDate)
    )[0];

  if (!finalData) {
    return NextResponse.json({ message: 'No data found for selected date' }, { status: 404 });
  }

  return NextResponse.json({ data: finalData });
}
