import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const team = searchParams.get('S_team');
    const room = searchParams.get('S_room');

    if (!team || !room) {
      return NextResponse.json({ message: 'Missing team or room parameter' }, { status: 400 });
    }

    const pool = await createConnection();
    const result = await pool
      .request()
      .input('team', sql.VarChar, team)
      .input('room', sql.VarChar, room)
      .query(`
        SELECT S_Room, S_Team, S_Dep, S_Loc, S_PDF 
        FROM SKILL_MATRIX
        WHERE S_Room = @room AND S_Team = @team
        ORDER BY 
            CASE 
                WHEN S_loc = 'SMT-1' THEN 1
                WHEN S_loc = 'SMT-2' THEN 2
                WHEN S_loc = 'SMT-3' THEN 3
                WHEN S_loc = 'SMT-4' THEN 4
                WHEN S_loc = 'SMT-5' THEN 5
                WHEN S_loc = 'SMT-6' THEN 6
                WHEN S_loc = 'SMT-7' THEN 7
                WHEN S_loc = 'SMT-8' THEN 8
                WHEN S_loc = 'SMT-9' THEN 9
                WHEN S_loc = 'SMT-10' THEN 10
                WHEN S_loc = 'SMT-11' THEN 11
                WHEN S_loc = 'SMT-12' THEN 12
                WHEN S_loc = 'SMT-13' THEN 13
                WHEN S_loc = 'SMT-14' THEN 14
                WHEN S_loc = 'SMT-15' THEN 15
                WHEN S_loc = 'SMT-16' THEN 16
                WHEN S_loc = 'SMT-17' THEN 17
                WHEN S_loc = 'SMT-18' THEN 18
                WHEN S_loc = 'SMT-19' THEN 19
                WHEN S_loc = 'SMT-20' THEN 20
                WHEN S_loc = 'SMT-21' THEN 21
            END
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    const pdfBase64List = [];

    for (const row of result.recordset) {
      const { S_Room, S_Team, S_Dep, S_Loc, S_PDF } = row;

      if (!S_PDF) continue;

      const base64PDF = Buffer.from(S_PDF).toString('base64');

      pdfBase64List.push({
        room: S_Room,
        team: S_Team,
        department: S_Dep,
        location: S_Loc,
        base64Pdf: `data:application/pdf;base64,${base64PDF}`,
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
