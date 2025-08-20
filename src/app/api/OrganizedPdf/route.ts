// // /api/OrganizedPdf/route.ts
// // ✅ เพิ่มให้ครบด้านบนของไฟล์
// import { NextRequest, NextResponse } from 'next/server';
// import { getDashboardConnection } from '../../../lib/db'; // เส้นทางนี้ควรอิงโฟลเดอร์จริง
// import sql from 'mssql';


// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = req.nextUrl;
//     const team = searchParams.get('O_team');
//     const room = searchParams.get('O_room');
//     const location = searchParams.get('O_location');
//     const department = searchParams.get('O_department'); 

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
//         SELECT O_PDFs 
//         FROM ORGANIZATION 
//         WHERE O_Room = @room AND O_Team = @team AND O_Loc = @location AND O_Dep = @department
//       `);

//     if (result.recordset.length === 0 || !result.recordset[0].O_PDFs) {
//       return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
//     }

//     const base64PDF = Buffer.from(result.recordset[0].O_PDFs).toString('base64');

//     return NextResponse.json({ base64Pdf: `data:application/pdf;base64,${base64PDF}` });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error loading PDF' }, { status: 500 });
//   }
// }
// /src/app/api/OrganizedPdf/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Base64 PDF หน้าเดียวเปล่าๆ (ขนาดเล็ก)
const emptyPdfBase64 = 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlcyA8PC9Gb250IDw8L0YxIDQgMCBSPj4+Pi9NZWRpYUJveFswIDAgNjEyIDc5Ml0vQ29udGVudHMgNSAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9MZW5ndGggIDY+PnN0cmVhbQpzdHJlYW0KZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTAgMDAwMDAgbiAKMDAwMDAwMDE4OCAwMDAwMCBuIAowMDAwMDAwMzA0IDAwMDAwIG4gCjAwMDAwMDA0MDkgMDAwMDAgbiAKMDAwMDAwMDU1NSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjY2NgolJUVPRgo=';

// Mock data
const mockOrganizationPDFs = [
  { O_Room: 'PRODUCTION1', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-1', O_PDFs: emptyPdfBase64 },
  { O_Room: 'PRODUCTION1', O_Team: 'A', O_Dep: 'Assembly', O_Loc: 'SMT-2', O_PDFs: emptyPdfBase64 },
  { O_Room: 'PRODUCTION2', O_Team: 'B', O_Dep: 'Maintenance', O_Loc: 'SMT-3', O_PDFs: emptyPdfBase64 },
  // เพิ่ม mock entries ตามต้องการ
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const team = searchParams.get('O_team');
  const room = searchParams.get('O_room');
  const location = searchParams.get('O_location');
  const department = searchParams.get('O_department');

  if (!team || !room || !location || !department) {
    return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
  }

  // Filter mock data ตาม parameters
  const record = mockOrganizationPDFs.find(
    r => r.O_Team === team && r.O_Room === room && r.O_Loc === location && r.O_Dep === department
  );

  if (!record || !record.O_PDFs) {
    return NextResponse.json({ message: 'PDF not found' }, { status: 404 });
  }

  // ส่ง base64 PDF
  return NextResponse.json({ base64Pdf: `data:application/pdf;base64,${record.O_PDFs}` });
}
