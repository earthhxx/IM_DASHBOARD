import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const parameter = searchParams.get('parameter');
    const num1 = searchParams.get('num1');
    const num2 = searchParams.get('num2');

    if (!parameter || !num1 || !num2) {
        return NextResponse.json({ message: 'Missing parameter(s)' }, { status: 400 });
    }

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .input('para', sql.NVarChar, `%${parameter}`)
            .input('num1', sql.Int, parseInt(num1))
            .input('num2', sql.Int, parseInt(num2))
            .query(`
                SELECT TOP (1000)
                    [sheftname],
                    [slot],
                    [toolingname],
                    [side],
                    [status]
                FROM [DASHBOARD].[dbo].[im_tooling]
                WHERE 
                    [sheftname] LIKE @para
                    AND TRY_CAST(SUBSTRING(slot, PATINDEX('%[0-9]%', slot), 10) AS INT) BETWEEN @num1 AND @num2
                ORDER BY
                    LEFT(slot, PATINDEX('%[0-9]%', slot) - 1),
                    TRY_CAST(SUBSTRING(slot, PATINDEX('%[0-9]%', slot), 10) AS INT)
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
