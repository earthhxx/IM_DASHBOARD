// import { NextRequest, NextResponse } from 'next/server';
// import { getDashboardConnection } from '../../../lib/db';
// import sql from 'mssql';


// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = req.nextUrl;
//     const team = searchParams.get('O_team');
//     const room = searchParams.get('O_room');
//     // console.log('Team:', team); // ตรวจสอบค่า team
//     // console.log('Room:', room); // ตรวจสอบค่า room

//     if (!team || !room) {
//       return NextResponse.json({ message: 'Missing team parameter' }, { status: 400 });
//     }

//     const pool = await getDashboardConnection();
//     const result = await pool
//       .request()
//       .input('team', sql.VarChar, team)
//       .input('room', sql.VarChar, room)
//       .query(`SELECT O_Room, O_Team, O_Dep, O_Loc FROM ORGANIZATION WHERE O_Room = @room AND O_Team = @team Order by O_Loc desc`);



//     if (result.recordset.length === 0) {
//       return NextResponse.json({ message: 'No data found' }, { status: 404 });
//       // console.log(result.recordset)
//     }


//     const pdfBase64List = [];

//     for (const row of result.recordset) {
//       const { O_Room, O_Team, O_Dep, O_Loc } = row;
//       // console.log(pdfUrls)


//       pdfBase64List.push({
//         room: O_Room,
//         team: O_Team,
//         department: O_Dep,
//         location: O_Loc,
//       });
//     }

//     return NextResponse.json({ data: pdfBase64List });

//   } catch (error) {
//     console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
//     return NextResponse.json(
//       { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

// Mock data ของ ORGANIZATION
const mockOrganization = [
  // PRODUCTION1
  { O_Room: 'PRODUCTION1', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-1' },
  { O_Room: 'PRODUCTION1', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-2' },
  { O_Room: 'PRODUCTION1', O_Team: 'A', O_Dep: 'Quality', O_Loc: 'SMT-3' },
  { O_Room: 'PRODUCTION1', O_Team: 'B', O_Dep: 'TEST', O_Loc: 'SMT-4' },

  // PRODUCTION2
  { O_Room: 'PRODUCTION2', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-1' },
  { O_Room: 'PRODUCTION2', O_Team: 'A', O_Dep: 'Quality', O_Loc: 'SMT-2' },
  { O_Room: 'PRODUCTION2', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3' },

  // PRODUCTION3
  { O_Room: 'PRODUCTION3', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-1' },
  { O_Room: 'PRODUCTION3', O_Team: 'B', O_Dep: 'Quality', O_Loc: 'SMT-2' },
  { O_Room: 'PRODUCTION3', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3' },

  // PRODUCTION4
  { O_Room: 'PRODUCTION4', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-1' },
  { O_Room: 'PRODUCTION4', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-2' },

  // PRODUCTION5
  { O_Room: 'PRODUCTION5', O_Team: 'A', O_Dep: 'Quality', O_Loc: 'SMT-1' },
  { O_Room: 'PRODUCTION5', O_Team: 'B', O_Dep: 'Quality', O_Loc: 'SMT-2' },
  { O_Room: 'PRODUCTION5', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3' },

  // WAREHOUSE
  { O_Room: 'WAREHOUSE', O_Team: 'A', O_Dep: 'Quality', O_Loc: 'SMT-1' },
  { O_Room: 'WAREHOUSE', O_Team: 'B', O_Dep: 'Quality', O_Loc: 'SMT-2' },
  { O_Room: 'WAREHOUSE', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3' },

  // MAINTENANCE
  { O_Room: 'MAINTENANCE', O_Team: 'A', O_Dep: 'Quality', O_Loc: 'SMT-1' },
  { O_Room: 'MAINTENANCE', O_Team: 'B', O_Dep: 'Quality', O_Loc: 'SMT-2' },
  { O_Room: 'MAINTENANCE', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3' },
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const team = searchParams.get('O_team');
  const room = searchParams.get('O_room');

  if (!team || !room) {
    return NextResponse.json({ message: 'Missing team or room parameter' }, { status: 400 });
  }

  // Filter ข้อมูลตาม team และ room
  const filtered = mockOrganization.filter(d => d.O_Team === team && d.O_Room === room);

  if (filtered.length === 0) {
    return NextResponse.json({ message: 'No data found' }, { status: 404 });
  }

  // Sort ตาม O_Loc desc เหมือน query SQL ของคุณ
  const sorted = filtered.sort((a, b) => b.O_Loc.localeCompare(a.O_Loc));

  const result = sorted.map(r => ({
    room: r.O_Room,
    team: r.O_Team,
    department: r.O_Dep,
    location: r.O_Loc
  }));

  return NextResponse.json({ data: result });
}
