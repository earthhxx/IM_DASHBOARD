import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {

    try {
        const pool = await createConnection();
        const date = new Date().getDate();
        const result = await pool
            .request()
            .query(`
                
                 SELECT *
                    FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
                    WHERE CAST([UpdateTime] AS DATE) = CAST(GETDATE() AS DATE)
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
