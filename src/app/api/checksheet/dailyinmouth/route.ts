import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const monthParam = url.searchParams.get('month');
        const yearParam = url.searchParams.get('year');
        const now = new Date();
        const currentDay = now.getDate();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // JavaScript: 0-based

        // const currentHour = now.getHours();
        // const currentMinute = now.getMinutes();

        // ใช้ month/year ที่ส่งมาหรือใช้ของปัจจุบัน
        let year = yearParam ? parseInt(yearParam) : currentYear;
        let month = monthParam ? parseInt(monthParam) : currentMonth;

        // // หาวันสุดท้ายของเดือน
        // const lastDay = new Date(year, month, 0).getDate();
        // const isBefore745 = (currentHour < 7) || (currentHour === 7 && currentMinute < 45);

        // // ถ้าวันนี้คือวันที่ 1 และยังไม่ถึง 7:45 → ย้อนกลับไปเดือนก่อนหน้า
        // if (currentDay === 1 && isBefore745 && month === currentMonth && year === currentYear) {
        //     now.setDate(0); // ไปวันสุดท้ายของเดือนก่อน
        //     year = now.getFullYear();
        //     month = now.getMonth() + 1;
        // }

        const pool = await createConnection();
        const result = await pool
            .request()
            .input('year', year)
            .input('month', month)
            .query(`
                SELECT *
                FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
                WHERE YEAR(UpdateTime) = @year AND MONTH(UpdateTime) = @month
                ORDER BY [UpdateTime] DESC
            `);

        return NextResponse.json({
            year,
            month,
            // lastDay,
            data: result.recordset
        });

    } catch (error) {
        console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
