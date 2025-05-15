import sql from 'mssql';

export const createConnection = async () => {
  try {
    const pool = await sql.connect({
      user: 'sa',                    // ชื่อผู้ใช้
      password: 'B1mUmNU9',          // รหัสผ่าน
      server: '192.168.120.9',       // IP หรือ hostname ของเซิร์ฟเวอร์ SQL Server
      database: 'DASHBOARD',         // ชื่อฐานข้อมูล
      options: {
        encrypt: true,               // ใช้การเข้ารหัส SSL หากใช้งานบน Azure หรือเซิร์ฟเวอร์ที่รองรับ
        trustServerCertificate: true, // เชื่อมต่อ SSL โดยไม่ต้องใช้ใบรับรอง
      },
      connectionTimeout: 10000,      // ตั้งค่า timeout ของการเชื่อมต่อ
      requestTimeout: 15000,         // ตั้งค่า timeout ของการส่งคำขอ (query)
    });

    return pool;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};
