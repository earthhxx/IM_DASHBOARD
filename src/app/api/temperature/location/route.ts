import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const num = searchParams.get('location');
    const area = searchParams.get('area');

    if (!num && !area) {
        return NextResponse.json({ message: 'Missing location or area parameter' }, { status: 400 });
    }

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .input('line', sql.NVarChar, num)
            .input('area', sql.NVarChar, area)
            .query(`
                SELECT 
                    [ID],
                    [Date],
                    [Doc_Name],
                    [Area],
                    [Line],

                    -- TControl
                    [TControl1], [TControl2], [TControl3], [TControl4], [TControl5],

                    -- Tmax
                    [TMax1], [TMax2], [TMax3], [TMax4], [TMax5], [TMax6],
                    [TMax7], [TMax8], [TMax9], [TMax10], [TMax11], [TMax12],
                    [TMax13], [TMax14], [TMax15], [TMax16], [TMax17], [TMax18],
                    [TMax19], [TMax20], [TMax21], [TMax22], [TMax23], [TMax24],
                    [TMax25], [TMax26], [TMax27], [TMax28], [TMax29], [TMax30], [TMax31],

                    -- Tmin
                    [TMin1], [TMin2], [TMin3], [TMin4], [TMin5], [TMin6],
                    [TMin7], [TMin8], [TMin9], [TMin10], [TMin11], [TMin12],
                    [TMin13], [TMin14], [TMin15], [TMin16], [TMin17], [TMin18],
                    [TMin19], [TMin20], [TMin21], [TMin22], [TMin23], [TMin24],
                    [TMin25], [TMin26], [TMin27], [TMin28], [TMin29], [TMin30], [TMin31],

                    -- HControl
                    [HControl1], [HControl2], [HControl3], [HControl4], [HControl5],

                    -- HMax
                    [HMax1], [HMax2], [HMax3], [HMax4], [HMax5], [HMax6],
                    [HMax7], [HMax8], [HMax9], [HMax10], [HMax11], [HMax12],
                    [HMax13], [HMax14], [HMax15], [HMax16], [HMax17], [HMax18],
                    [HMax19], [HMax20], [HMax21], [HMax22], [HMax23], [HMax24],
                    [HMax25], [HMax26], [HMax27], [HMax28], [HMax29], [HMax30], [HMax31],

                    -- HMin
                    [HMin1], [HMin2], [HMin3], [HMin4], [HMin5], [HMin6],
                    [HMin7], [HMin8], [HMin9], [HMin10], [HMin11], [HMin12],
                    [HMin13], [HMin14], [HMin15], [HMin16], [HMin17], [HMin18],
                    [HMin19], [HMin20], [HMin21], [HMin22], [HMin23], [HMin24],
                    [HMin25], [HMin26], [HMin27], [HMin28], [HMin29], [HMin30], [HMin31]

                FROM 
                    [DASHBOARD].[dbo].[Temperature]
                WHERE 
                    [Line] = @line AND [Area] = @area 
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
