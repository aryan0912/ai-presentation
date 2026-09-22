import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chillerId = searchParams.get('id') || 'CH-04';
  
  const connectionString = process.env.NEON_DATABASE_URL_READONLY || process.env.NEON_DATABASE_URL_ADMIN;

  if (!connectionString) {
    return NextResponse.json({
      chiller_id: chillerId,
      facility_name: "Anand Central BMC - Bay B",
      current_temp: 4.10,
      pressure_bar: 18.90,
      power_kw: 26.80,
      status: "WARNING",
      isLive: false,
      message: "Database connection string missing in environment; returned demo fallback."
    });
  }

  try {
    const sql = neon(connectionString);
    const rows = await sql`
      SELECT c.*, t.recorded_at as last_telemetry_time, t.temperature_celsius as latest_reading_temp,
             t.discharge_pressure_bar as latest_pressure, t.alarm_active
      FROM chillers c 
      LEFT JOIN chiller_telemetry t ON c.chiller_id = t.chiller_id 
      WHERE c.chiller_id = ${chillerId}
      ORDER BY t.recorded_at DESC LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: `Chiller '${chillerId}' not found.` }, { status: 404 });
    }

    return NextResponse.json({ ...rows[0], isLive: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, isLive: false }, { status: 500 });
  }
}
