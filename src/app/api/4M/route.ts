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
    Line: "SMT-1", // จะ map เป็น PCBA Camera
    Shift: "A/D",
    Date: "2025-08-17T08:00:00.000Z",
    Checked: true,
    ProcessChange: "Testing",
    // Process1-14
    Process1: "Soldering",
    Process2: "Inspection",
    Process3: "Testing",
    Process4: "Assembly",
    Process5: "Packaging",
    Process6: "Labeling",
    Process7: "QC",
    Process8: "Calibration",
    Process9: "Maintenance",
    Process10: "Shipping",
    Process11: "Receiving",
    Process12: "Cleaning",
    Process13: "Training",
    Process14: "Documentation",
    // AM1-14
    AM1: "Alice",
    AM2: "Bob",
    AM3: "-",
    AM4: "Eve",
    AM5: "-",
    AM6: "Frank",
    AM7: "-",
    AM8: "Grace",
    AM9: "-",
    AM10: "Hank",
    AM11: "-",
    AM12: "Ivy",
    AM13: "-",
    AM14: "Jack",
    // PM1-14
    PM1: "Charlie",
    PM2: "-",
    PM3: "Dave",
    PM4: "-",
    PM5: "Mia",
    PM6: "-",
    PM7: "Nina",
    PM8: "-",
    PM9: "Oscar",
    PM10: "-",
    PM11: "Paul",
    PM12: "-",
    PM13: "Quinn",
    PM14: "-",
  }
];


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const team = searchParams.get("S_team");
  const locationto4m = searchParams.get("locationto4m");

  if (!team || !locationto4m)
    return NextResponse.json({ message: "Missing team or location parameter" }, { status: 400 });

  const latestShiftData = mockData
    .filter(d => d.Line === locationto4m && d.Shift.startsWith(team))
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())[0];

  if (!latestShiftData)
    return NextResponse.json({ message: "No shift data found" }, { status: 404 });

  return NextResponse.json({ data: latestShiftData });
}
