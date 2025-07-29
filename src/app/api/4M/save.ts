import { NextRequest, NextResponse } from 'next/server';
import { getDashboardConnection } from '../../../lib/db';
import sql from 'mssql';

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const team = searchParams.get('S_team'); // 'A' หรือ 'B'
    const locationto4m = searchParams.get('locationto4m'); // เช่น 'SMT-6'

    if (!team || !locationto4m) {
        return NextResponse.json({ message: 'Missing team or location parameter' }, { status: 400 });
    }

    try {
        const pool = await getDashboardConnection();

        const result = await pool
            .request()
            .input('locationto4m', sql.VarChar, locationto4m)
            .input('shiftPattern', sql.VarChar, `${team}/%`) // เช่น A/% หรือ B/%
            .query(`
                SELECT TOP 1 *
                FROM [DASHBOARD].[dbo].[4M_Change]
                WHERE [Line] = @locationto4m
                  AND [Shift] LIKE @shiftPattern
                ORDER BY [Date] DESC
            `);

        if (result.recordset.length === 0) {
            return NextResponse.json({ message: 'No data found for team ' + team }, { status: 404 });
        }

        return NextResponse.json({ data: result.recordset[0] });

    } catch (error) {
        console.error('DB Error:', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
