import { NextRequest, NextResponse } from 'next/server';
import { getDemo1Connection } from '../../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const parameter = searchParams.get('parameter');

    if (!parameter) {
        return NextResponse.json({ message: 'Missing parameter(s)' }, { status: 400 });
    }

    try {
        const pool = await getDemo1Connection();
        const result = await pool
            .request()
            .input('para', sql.NVarChar, `${parameter}`)
            .query(`
            SELECT TOP 1
                [ID],
                [MS_ID],
                [User_ID],
                [Loc1],
                [loc2],
                [loc3],
                [loc4],
                [loc5],
                [status],
                [spac],
                [Datetime]
            FROM [Demo1].[dbo].[TB_Check_Stencil]
            WHERE [MS_ID] = 'B02'
            ORDER BY [Datetime] DESC;
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
