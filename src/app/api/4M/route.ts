import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '../../../lib/db';
import sql from 'mssql';


export async function GET(req: NextRequest) {
    try {
        const pool = await createConnection();
        const result = await pool
            .request()
            .query(`SELECT [Id]
                ,[Date]
                ,[Line]
                ,[Shift]
                ,[Process1]
                ,[Process2]
                ,[Process3]
                ,[Process4]
                ,[Process5]
                ,[Process6]
                ,[Process7]
                ,[Process8]
                ,[Process9]
                ,[Process10]
                ,[Process11]
                ,[Process12]
                ,[Process13]
                ,[Process14]
                ,[AM1]
                ,[PM1]
                ,[AM2]
                ,[PM2]
                ,[AM3]
                ,[PM3]
                ,[AM4]
                ,[PM4]
                ,[AM5]
                ,[PM5]
                ,[AM6]
                ,[PM6]
                ,[AM7]
                ,[PM7]
                ,[AM8]
                ,[PM8]
                ,[AM9]
                ,[PM9]
                ,[AM10]
                ,[PM10]
                ,[AM11]
                ,[PM11]
                ,[AM12]
                ,[PM12]
                ,[AM13]
                ,[PM13]
                ,[AM14]
                ,[PM14]
                ,[Checked]
                ,[QA_Confirm]
                FROM [DASHBOARD].[dbo].[4M_Change]
                WHERE CAST(Date AS DATE) = CAST(GETDATE() AS DATE) AND [Line] = 'SMT-1' and shift like 'A%'
`);

        console.log(`Qurey`, result.recordset);

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