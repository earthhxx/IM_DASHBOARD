import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql'; // นำเข้า mssql library
import { createConnection } from '../../../lib/db'; // การเชื่อมต่อฐานข้อมูล

export async function POST(req: NextRequest) {
  try {
    // ดึงข้อมูลจาก body
    const { file, data } = await req.json();

    if (!file || !data) {
      return NextResponse.json({ message: 'Missing file or data' }, { status: 400 });
    }
    console.log(file, data);

    // แปลงข้อมูล Base64 เป็นไฟล์
    const fileBuffer = Buffer.from(file.split(',')[1], 'base64'); // แยกแค่ข้อมูล Base64 ที่ไม่รวม header (data:image/pdf;base64,...)

    // สร้างการเชื่อมต่อกับฐานข้อมูล
    const pool = await createConnection();

    // สร้างคำสั่ง SQL เพื่อบันทึกข้อมูล
    const query = 'INSERT INTO PDFs (file_data, json_data) VALUES (@fileBuffer, @jsonData)';
    const request = pool.request();

    // ใส่ข้อมูลที่ต้องการส่งไปยัง SQL
    request.input('fileBuffer', sql.VarBinary, fileBuffer); // ส่งไฟล์ในรูปแบบ VarBinary
    request.input('jsonData', sql.NVarChar, JSON.stringify(data)); // ส่งข้อมูล JSON ในรูปแบบ NVarChar

    // รันคำสั่ง SQL
    const result = await request.query(query);

    // ปิดการเชื่อมต่อฐานข้อมูล
    pool.close();

    // ส่งผลลัพธ์กลับไปยัง client
    return NextResponse.json({ message: 'File and data saved successfully!', result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error saving PDF:', error.message);
      return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ message: 'Internal Server Error', error: 'Unknown error' }, { status: 500 });
    }
  }
}
