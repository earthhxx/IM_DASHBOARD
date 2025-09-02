import { NextRequest, NextResponse } from 'next/server';
import { getDashboardConnection } from '../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const team = searchParams.get('S_team');
    const room = searchParams.get('S_room');

    if (!team || !room) {
      return NextResponse.json({ message: 'Missing team or room parameter' }, { status: 400 });
    }

    const pool = await getDashboardConnection();
    const result = await pool
      .request()
      .input('team', sql.VarChar, team)
      .input('room', sql.VarChar, room)
      .query(`
                SELECT S_Room, S_Team, S_Dep, S_Loc
          FROM SKILL_MATRIX
          WHERE S_Room = @room AND S_Team = @team
          ORDER BY 
              CASE S_Room
                  WHEN 'Production' THEN 1
                  WHEN 'QA' THEN 2
                  WHEN 'Engineer' THEN 3
                  ELSE 99
              END,
              CASE S_Loc
                  WHEN 'SMT-1' THEN 1
                  WHEN 'SMT-2' THEN 2
                  WHEN 'SMT-3' THEN 3
                  WHEN 'SMT-4' THEN 4
                  WHEN 'SMT-5' THEN 5
                  WHEN 'SMT-6' THEN 6
                  WHEN 'SMT-7' THEN 7
                  WHEN 'SMT-8' THEN 8
                  WHEN 'SMT-9' THEN 9
                  WHEN 'SMT-10' THEN 10
                  WHEN 'SMT-11' THEN 11
                  WHEN 'SMT-12' THEN 12
                  WHEN 'SMT-13' THEN 13
                  WHEN 'SMT-14' THEN 14
                  WHEN 'SMT-15' THEN 15
                  WHEN 'SMT-16' THEN 16
                  WHEN 'SMT-17' THEN 17
                  WHEN 'SMT-18' THEN 18
                  WHEN 'SMT-19' THEN 19
                  WHEN 'SMT-20' THEN 20
                  WHEN 'SMT-21' THEN 21
                  WHEN 'FPCA Camera 1' THEN 22
                   WHEN 'FPCA Camera 2' THEN 23
                    WHEN 'FPCA Camera 3' THEN 24
                     WHEN 'FPCA Camera 4' THEN 25
                      WHEN 'PCBA Camera' THEN 26
                      WHEN 'Motor Sensor' THEN 27
                      WHEN 'ICT Heater Sensor' THEN 28
                      WHEN 'Automotive' THEN 29
                      WHEN 'Finish Good' THEN 30
                      WHEN 'Touch_up' THEN 31
                  ELSE 99
              END;

      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    const pdfBase64List = [];

    for (const row of result.recordset) {
      const { S_Room, S_Team, S_Dep, S_Loc } = row;



      pdfBase64List.push({
        room: S_Room,
        team: S_Team,
        department: S_Dep,
        location: S_Loc,
      });
    }

    return NextResponse.json({ data: pdfBase64List });

  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
