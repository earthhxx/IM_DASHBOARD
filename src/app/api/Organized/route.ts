import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../lib/db';
import sql from 'mssql';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const team = searchParams.get('O_team');
    const room = searchParams.get('O_room');
    // console.log('Team:', team); // ตรวจสอบค่า team
    // console.log('Room:', room); // ตรวจสอบค่า room

    if (!team || !room) {
      return NextResponse.json({ message: 'Missing team parameter' }, { status: 400 });
    }

    const pool = await createConnection();
    const result = await pool
      .request()
      .input('team', sql.VarChar, team)
      .input('room', sql.VarChar, room)
      .query(`SELECT O_Room, O_Team, O_Dep, O_Loc, O_PDFs FROM ORGANIZATION WHERE O_Room = @room AND O_Team = @team Order by O_Loc desc`);

    console.log('Query result:', result.recordset); // ตรวจสอบผลลัพธ์จากฐานข้อมูล

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
      // console.log(result.recordset)
    }

  
    const pdfBase64List = [];
    
    for (const row of result.recordset) {
      const { O_Room, O_Team, O_Dep, O_Loc, O_PDFs } = row;
      // console.log(pdfUrls)

      if (!O_PDFs) continue; 
      

      const base64PDF = Buffer.from(O_PDFs).toString('base64');

      pdfBase64List.push({
        room: O_Room,
        team: O_Team,
        department: O_Dep,
        location: O_Loc,
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
