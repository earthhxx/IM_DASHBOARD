import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const parameter = searchParams.get('parameter'); // ✅ รับพารามิเตอร์จาก URL

    if (!parameter) {
        return NextResponse.json({ message: 'Missing location parameter' }, { status: 400 });
    }

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .input('para', sql.NVarChar, `%${parameter}`) // ✅ ใส่ wildcard ที่นี่
            .query(`
                SELECT TOP (1000) [sheftname]
                    ,[slot]
                    ,[toolingname]
                    ,[side]
                    ,[status]
                FROM 
                    [DASHBOARD].[dbo].[im_tooling]
                WHERE 
                    [sheftname] LIKE @para
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
