import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const num = searchParams.get('location');

    if (!num) {
        return NextResponse.json({ message: 'Missing location parameter' }, { status: 400 });
    }

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .input('line', sql.NVarChar, `ตู้เย็น ${num}`)
            .query(`
                SELECT 
                    [ID],
                    [Date],
                    [Doc_Name],
                    [Area],
                    [Line],
                     [TControl1],[TControl2],[TControl3],[TControl4],[TControl5],
                    [TMax1],  [TMax2],  [TMax3],  [TMax4],  [TMax5],  [TMax6],
                    [TMax7],  [TMax8],  [TMax9],  [TMax10], [TMax11], [TMax12],
                    [TMax13], [TMax14], [TMax15], [TMax16], [TMax17], [TMax18],
                    [TMax19], [TMax20], [TMax21], [TMax22], [TMax23], [TMax24],
                    [TMax25], [TMax26], [TMax27], [TMax28], [TMax29], [TMax30],
                    [TMax31]
                FROM 
                    [DASHBOARD].[dbo].[Temperature]
                WHERE 
                    [Line] = @line;
                order by [Date] DESC;
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
