import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const pool = await createConnection();

        // สร้าง Date object แบบไม่มีเวลา (เวลาเป็น 00:00:00)
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // JS: เดือนเริ่มที่ 0
        const currentYear = now.getFullYear();

        const result = await pool
            .request()
            .input('year', currentYear)
            .input('month', currentMonth)
            .query(`
        SELECT *
        FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
        WHERE YEAR(UpdateTime) = @year AND MONTH(UpdateTime) = @month
        ORDER BY [UpdateTime] DESC
    `);


        return NextResponse.json({ data: result.recordset });

    } catch (error) {
        console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
