// /api/OrganizedPdf/route.ts
// ✅ เพิ่มให้ครบด้านบนของไฟล์
import { NextRequest, NextResponse } from 'next/server';
import { getDashboardConnection } from '../../../lib/db'; // เส้นทางนี้ควรอิงโฟลเดอร์จริง
import sql from 'mssql';


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const team = searchParams.get('O_team');
    const room = searchParams.get('O_room');
    const location = searchParams.get('O_location');

    if (!team || !room || !location) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    const pool = await getDashboardConnection();
    const result = await pool
      .request()
      .input('team', sql.VarChar, team)
      .input('room', sql.VarChar, room)
      .input('location', sql.VarChar, location)
      .query(`
        SELECT O_PDFs 
        FROM ORGANIZATION 
        WHERE O_Room = @room AND O_Team = @team AND O_Loc = @location
      `);

    if (result.recordset.length === 0 || !result.recordset[0].O_PDFs) {
      return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
    }

    const base64PDF = Buffer.from(result.recordset[0].O_PDFs).toString('base64');

    return NextResponse.json({ base64Pdf: `data:application/pdf;base64,${base64PDF}` });
  } catch (error) {
    return NextResponse.json({ message: 'Error loading PDF' }, { status: 500 });
  }
}
