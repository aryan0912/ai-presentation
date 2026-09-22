import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
  try {
    const { query, mode = 'readonly' } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Missing SQL query in request body" }, { status: 400 });
    }

    // Select role: 'admin' has DDL/DML write access; 'readonly' rejects write operations
    const connectionString = mode === 'admin' 
      ? process.env.NEON_DATABASE_URL_ADMIN 
      : process.env.NEON_DATABASE_URL_READONLY;

    if (!connectionString) {
      return NextResponse.json({ 
        error: "Neon connection string not configured in .env.local",
        fallbackSimulation: true 
      }, { status: 500 });
    }

    const sql = neon(connectionString);
    const result = await sql(query);

    return NextResponse.json({
      success: true,
      mode,
      rowCount: result.length,
      rows: result
    });
  } catch (error: any) {
    // Return PostgreSQL permission or syntax error to demonstrate guardrail behavior
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code || 'DB_ERROR'
    }, { status: 400 });
  }
}
