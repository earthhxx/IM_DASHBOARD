import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../../lib/db';

export async function GET(req: NextRequest) {

    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .query(`
                SELECT
                        [id],
                        [FormID],
                        [FormName],
                        [Department],
                        [Date1],
                        [Date2],
                        [Date3],
                        [Date4],
                        [Date5],
                        [Date6],
                        [Date7],
                        [Date8],
                        [Date9],
                        [Date10],
                        [Date11],
                        [Date12],
                        [Date13],
                        [Date14],
                        [Date15],
                        [Date16],
                        [Date17],
                        [Date18],
                        [Date19],
                        [Date20],
                        [Date21],
                        [Date22],
                        [Date23],
                        [Date24],
                        [Date25],
                        [Date26],
                        [Date27],
                        [Date28],
                        [Date29],
                        [Date30],
                        [Date31],
                        [Progress],
                        [Status],
                        [CreateTime],
                        [UpdateTime]
                    FROM [DASHBOARD].[dbo].[tb_DailyChecksheet]
                    WHERE 
                        Date1 = 0 OR Date2 = 0 OR Date3 = 0 OR Date4 = 0 OR Date5 = 0 OR
                        Date6 = 0 OR Date7 = 0 OR Date8 = 0 OR Date9 = 0 OR Date10 = 0 OR
                        Date11 = 0 OR Date12 = 0 OR Date13 = 0 OR Date14 = 0 OR Date15 = 0 OR
                        Date16 = 0 OR Date17 = 0 OR Date18 = 0 OR Date19 = 0 OR Date20 = 0 OR
                        Date21 = 0 OR Date22 = 0 OR Date23 = 0 OR Date24 = 0 OR Date25 = 0 OR
                        Date26 = 0 OR Date27 = 0 OR Date28 = 0 OR Date29 = 0 OR Date30 = 0 OR
                        Date31 = 0;
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
