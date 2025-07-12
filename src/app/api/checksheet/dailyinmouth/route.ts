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
                SELECT 
                [id]
      ,[FormID]
      ,[FormName]
      ,[Department]
      ,[Date1]
      ,[Date2]
      ,[Date3]
      ,[Date4]
      ,[Date5]
      ,[Date6]
      ,[Date7]
      ,[Date8]
      ,[Date9]
      ,[Date10]
      ,[Date11]
      ,[Date12]
      ,[Date13]
      ,[Date14]
      ,[Date15]
      ,[Date16]
      ,[Date17]
      ,[Date18]
      ,[Date19]
      ,[Date20]
      ,[Date21]
      ,[Date22]
      ,[Date23]
      ,[Date24]
      ,[Date25]
      ,[Date26]
      ,[Date27]
      ,[Date28]
      ,[Date29]
      ,[Date30]
      ,[Date31]
      ,[CreateTime]
      ,[UpdateTime]
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
