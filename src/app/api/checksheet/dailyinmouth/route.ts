import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const pool = await createConnection();

        // สร้าง Date object แบบไม่มีเวลา (เวลาเป็น 00:00:00)
        const now = new Date();
        const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const result = await pool
            .request()
            .input('date', todayOnly)
            .query(`
                SELECT *
                FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
                WHERE CAST([UpdateTime] AS DATE) <= CAST(@date AS DATE)
                ORDER BY [UpdateTime] DESC
            `);

        if (result.recordset.length === 0) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }

        return NextResponse.json({ data: result.recordset });

    } catch (error) {
        console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
