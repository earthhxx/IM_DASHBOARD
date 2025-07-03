import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';
import sql from 'mssql';


export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const num = searchParams.get('location');
    if (!num ) {
        return NextResponse.json({ message: 'Missing team or room parameter' }, { status: 400 });
    }

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .input('num', sql.NVarChar, `ตู้ Supper Dry ${num}` )
            .query(`           
                    SELECT [ID], [Date], [Doc_Name], [Area], [Line],
                                [HControl1],[HControl2],[HControl3],[HControl4],[HControl5],
                                [HMax1], [HMax2], [HMax3], [HMax4], [HMax5], [HMax6], [HMax7], [HMax8], [HMax9], [HMax10],
                                [HMax11], [HMax12], [HMax13], [HMax14], [HMax15], [HMax16], [HMax17], [HMax18], [HMax19], [HMax20],
                                [HMax21], [HMax22], [HMax23], [HMax24], [HMax25], [HMax26], [HMax27], [HMax28], [HMax29], [HMax30],
                                [HMax31]
                        FROM [DASHBOARD].[dbo].[Temperature]
                        WHERE Line = @num;
                    order by [Date] DESC;
            `);

        // console.log(`Qurey`, result.recordset);

        if (result.recordset.length === 0) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
            // console.log(result.recordset)
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





