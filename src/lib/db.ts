import sql from 'mssql';
import dotenv from 'dotenv';


dotenv.config();

export const createConnection = async () => {
  // console.log('DB_SERVER:', process.env.DB_SERVER); // debug
  try {
    const pool = await sql.connect({
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      server: process.env.DB_SERVER!, // ต้องมีค่าเป็น string
      database: process.env.DB_NAME!,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
      connectionTimeout: 10000,
      requestTimeout: 15000,
    });

    // console.log('✅ Connected to DB:', process.env.DB_NAME);
    return pool;
  } catch (err) {
    console.error('❌ Database connection error:', err);
    throw err;
  }
};
