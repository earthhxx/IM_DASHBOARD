import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const monthParam = url.searchParams.get('month');
        const yearParam = url.searchParams.get('year');

        const month = monthParam ? parseInt(monthParam) : new Date().getMonth() + 1;
        const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

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

        return NextResponse.json({ data: result.recordset });

    } catch (error) {
        console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
