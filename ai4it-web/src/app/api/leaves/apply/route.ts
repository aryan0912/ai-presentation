import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { employee_id = 'EMP-882', leave_type = 'casual', start_date = '2026-04-01', end_date = '2026-04-02', days_count = 2, reason = 'Personal emergency' } = body;

    const connectionString = process.env.NEON_DATABASE_URL_ADMIN;
    if (!connectionString) {
      return NextResponse.json({
        success: true,
        application_id: `LV-${Date.now().toString().slice(-6)}`,
        status: "APPROVED_MOCK",
        message: "Applied in simulation mode (no database connection)."
      });
    }

    const sql = neon(connectionString);
    const appId = `LV-${new Date().toISOString().slice(0, 7).replace('-', '')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const result = await sql`
      INSERT INTO leave_applications (application_id, employee_id, leave_type, start_date, end_date, days_count, reason, status)
      VALUES (${appId}, ${employee_id}, ${leave_type}, ${start_date}, ${end_date}, ${days_count}, ${reason}, 'PENDING')
      RETURNING application_id, employee_id, leave_type, days_count, status, applied_at;
    `;

    return NextResponse.json({
      success: true,
      application: result[0],
      isLive: true
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
