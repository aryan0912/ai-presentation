import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('empId') || 'EMP-882';

  const connectionString = process.env.NEON_DATABASE_URL_READONLY || process.env.NEON_DATABASE_URL_ADMIN;

  if (!connectionString) {
    return NextResponse.json({
      employee_id: employeeId,
      full_name: "Amit Sharma",
      department: "ICT Infrastructure",
      leave_type: "casual",
      remaining_days: 4,
      total_allocated: 12,
      used_days: 8,
      isLive: false
    });
  }

  try {
    const sql = neon(connectionString);
    const rows = await sql`
      SELECT e.employee_id, e.full_name, e.department, e.designation,
             lb.leave_type, lb.total_allocated, lb.used_days, lb.remaining_days, lb.year
      FROM employees e
      JOIN leave_balances lb ON e.employee_id = lb.employee_id
      WHERE e.employee_id = ${employeeId}
      ORDER BY lb.leave_type;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: `Employee '${employeeId}' not found.` }, { status: 404 });
    }

    return NextResponse.json({
      employee: {
        id: rows[0].employee_id,
        name: rows[0].full_name,
        department: rows[0].department,
        designation: rows[0].designation
      },
      balances: rows.map(r => ({
        leave_type: r.leave_type,
        total_allocated: r.total_allocated,
        used_days: r.used_days,
        remaining_days: r.remaining_days,
        year: r.year
      })),
      isLive: true
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, isLive: false }, { status: 500 });
  }
}
