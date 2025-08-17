// // /api/OrganizedPdf/route.ts
// // ✅ เพิ่มให้ครบด้านบนของไฟล์
// import { NextRequest, NextResponse } from 'next/server';
// import { getDashboardConnection } from '../../../lib/db'; // เส้นทางนี้ควรอิงโฟลเดอร์จริง
// import sql from 'mssql';


// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = req.nextUrl;
//     const team = searchParams.get('S_team');
//     const room = searchParams.get('S_room');
//     const location = searchParams.get('S_location');
//     const department = searchParams.get('S_department')

//     if (!team || !room || !location) {
//       return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
//     }

//     const pool = await getDashboardConnection();
//     const result = await pool
//       .request()
//       .input('team', sql.VarChar, team)
//       .input('room', sql.VarChar, room)
//       .input('location', sql.VarChar, location)
//       .input('department',sql.VarChar,department)
//       .query(`
//         SELECT S_PDF 
//         FROM SKILL_MATRIX
//         WHERE S_Room = @room AND S_Team = @team AND S_Loc = @location AND S_Dep = @department
//       `);

//     if (result.recordset.length === 0 || !result.recordset[0].S_PDF) {
//       return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
//     }

//     const base64PDF = Buffer.from(result.recordset[0].S_PDF).toString('base64');

//     return NextResponse.json({ base64Pdf: `data:application/pdf;base64,${base64PDF}` });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error loading PDF' }, { status: 500 });
//   }
// }
// /api/OrganizedPdf/route.ts
import { NextRequest, NextResponse } from 'next/server';

// base64 ของ PDF หน้าเดียวเปล่าๆ
const emptyPdfBase64 = 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSPj4+Pi9NZWRpYUJveFswIDAgNjEyIDc5Ml0vQ29udGVudHMgNSAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9MZW5ndGggIDY+PnN0cmVhbQpzdHJlYW0KZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTAgMDAwMDAgbiAKMDAwMDAwMDE4OCAwMDAwMCBuIAowMDAwMDAwMzA0IDAwMDAwIG4gCjAwMDAwMDA0MDkgMDAwMDAgbiAKMDAwMDAwMDU1NSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjY2NgolJUVPRgo=';

// Mock data ของ SKILL_MATRIX PDF
const mockSkillMatrixPDF = [
  { S_Room: 'PRODUCTION1', S_Team: 'A', S_Dep: 'Assembly', S_Loc: 'SMT-1', S_PDF: emptyPdfBase64 },
  { S_Room: 'PRODUCTION1', S_Team: 'A', S_Dep: 'Assembly', S_Loc: 'SMT-2', S_PDF: emptyPdfBase64 },
  { S_Room: 'PRODUCTION2', S_Team: 'B', S_Dep: 'Maintenance', S_Loc: 'SMT-3', S_PDF: emptyPdfBase64 },
];


export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const team = searchParams.get('S_team');
  const room = searchParams.get('S_room');
  const location = searchParams.get('S_location');
  const department = searchParams.get('S_department');

  if (!team || !room || !location || !department) {
    return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
  }

  // Filter mock data ตาม parameters
  const record = mockSkillMatrixPDF.find(
    r => r.S_Team === team && r.S_Room === room && r.S_Loc === location && r.S_Dep === department
  );

  if (!record || !record.S_PDF) {
    return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
  }

  // ส่ง base64 PDF
  return NextResponse.json({ base64Pdf: `data:application/pdf;base64,${record.S_PDF}` });
}
