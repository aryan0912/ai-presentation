import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  const connectionString = process.env.NEON_DATABASE_URL_READONLY || process.env.NEON_DATABASE_URL_ADMIN;

  if (!connectionString) {
    return NextResponse.json({ error: "No database connection string configured" }, { status: 500 });
  }

  try {
    const sql = neon(connectionString);
    const collections = await sql`
      SELECT mc.*, dc.cooperative_name, dc.district
      FROM milk_collections mc
      JOIN dairy_cooperatives dc ON mc.cooperative_id = dc.cooperative_id
      ORDER BY mc.created_at DESC
      LIMIT 10;
    `;

    const summary = await sql`
      SELECT 
        COUNT(*) as total_entries,
        ROUND(SUM(quantity_liters), 2) as total_liters,
        ROUND(AVG(fat_percentage), 2) as avg_fat,
        ROUND(AVG(snf_percentage), 2) as avg_snf,
        ROUND(SUM(total_amount), 2) as total_payout_inr
      FROM milk_collections;
    `;

    return NextResponse.json({
      success: true,
      summary: summary[0],
      records: collections
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
