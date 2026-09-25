"""
NDDB AI4IT — Day 5 Enterprise HR Portal MCP Server
=============================================================================
Model Context Protocol (MCP) Server backed by live Neon PostgreSQL.
Exposes HR & Self-Service tools to any MCP Client (Claude Desktop, Cursor,
Continue.dev, or custom AI Agents).

Neon PostgreSQL Target Database:
  Host: ep-wandering-water-b52fnnnb-pooler.c-7.us-east-2.aws.neon.tech
  Database: neondb
  Tables: employees, leave_balances, leave_applications, agent_audit_logs

Tools Exposed:
  1. register_employee   : Onboard an attendee/employee into Neon PostgreSQL.
  2. get_remaining_leaves: Query live leave balance and application history.
  3. apply_for_leave     : Validate balance, deduct days, and log application.
  4. list_all_employees  : View all registered employees across NDDB divisions.
"""

import os
import sys
import uuid
from datetime import datetime, date
import psycopg2
from psycopg2.extras import RealDictCursor

# Graceful import across MCP SDK versions (mcp 2.x MCPServer vs mcp 1.x FastMCP)
try:
    from mcp.server.mcpserver import MCPServer
    app = MCPServer("nddb-hr-portal")
except ImportError:
    try:
        from mcp.server.fastmcp import FastMCP
        app = FastMCP("nddb-hr-portal")
    except ImportError:
        print("Error: 'mcp' package is required. Install via: pip install mcp", file=sys.stderr)
        sys.exit(1)

# =============================================================================
# NEON POSTGRESQL CONNECTION CONFIGURATION
# =============================================================================
DEFAULT_NEON_URL = (
    "postgresql://neondb_owner:npg_lobBinG8fcx1@ep-wandering-water-b52fnnnb-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require"
)
DATABASE_URL = os.environ.get("NEON_DATABASE_URL", DEFAULT_NEON_URL)
if "channel_binding=" in DATABASE_URL:
    DATABASE_URL = (
        DATABASE_URL.replace("&channel_binding=require", "")
        .replace("?channel_binding=require&", "?")
        .replace("?channel_binding=require", "")
    )

def get_db_connection():
    """Returns a new psycopg2 connection to Neon PostgreSQL."""
    return psycopg2.connect(DATABASE_URL)

def log_audit(cursor, agent_name: str, action: str, details: str):
    """Optional audit trail recorder into agent_audit_logs."""
    try:
        cursor.execute("""
            INSERT INTO agent_audit_logs (agent_name, action_performed, details, status)
            VALUES (%s, %s, %s, 'SUCCESS')
        """, (agent_name, action, details))
    except Exception:
        pass  # Non-blocking if table doesn't exist yet


# =============================================================================
# MCP TOOLS EXPOSITION
# =============================================================================

@app.tool()
def register_employee(employee_id: str, full_name: str, email: str, department: str, designation: str) -> str:
    """Register a new employee in the NDDB enterprise HR system (Neon PostgreSQL).
    
    Args:
        employee_id: Unique Employee ID (e.g., 'EMP-882' or 'NDDB-2026-05').
        full_name: Full legal name of the employee/attendee.
        email: Official enterprise email address.
        department: Assigned department (e.g., 'ICT Infrastructure', 'Cold-Chain Engineering', 'Procurement').
        designation: Job title / role (e.g., 'Senior Systems Engineer', 'DBA Specialist', 'Chilling Operations Lead').
    
    Returns:
        Confirmation message with initial leave allocations (12 Casual, 10 Sick, 18 Earned).
    """
    emp_id = employee_id.strip().upper()
    name = full_name.strip()
    email_clean = email.strip().lower()
    dept = department.strip()
    desig = designation.strip()
    today_str = date.today().isoformat()

    try:
        conn = get_db_connection()
        conn.autocommit = False
        cursor = conn.cursor()

        # Check for duplicate employee ID
        cursor.execute("SELECT employee_id, full_name FROM employees WHERE employee_id = %s", (emp_id,))
        existing = cursor.fetchone()
        if existing:
            conn.close()
            return f"Registration Error: Employee ID '{emp_id}' is already registered to '{existing[1]}'."

        # 1. Insert into employees
        cursor.execute("""
            INSERT INTO employees (employee_id, full_name, email, department, designation, joining_date, status)
            VALUES (%s, %s, %s, %s, %s, %s, 'ACTIVE')
        """, (emp_id, name, email_clean, dept, desig, today_str))

        # 2. Insert initial leave allocations for 2026 (12 Casual, 10 Sick, 18 Earned)
        allocations = [
            (emp_id, 'casual', 12, 0, 2026),
            (emp_id, 'sick', 10, 0, 2026),
            (emp_id, 'earned', 18, 0, 2026)
        ]
        cursor.executemany("""
            INSERT INTO leave_balances (employee_id, leave_type, total_allocated, used_days, year)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (employee_id, leave_type, year) DO NOTHING
        """, allocations)

        log_audit(cursor, "nddb-hr-portal-mcp", "register_employee", f"Onboarded {name} ({emp_id})")

        conn.commit()
        conn.close()

        return (
            f"✅ Employee Registration Successful in Neon PostgreSQL!\n"
            f"• Employee ID  : {emp_id}\n"
            f"• Full Name    : {name}\n"
            f"• Department   : {dept}\n"
            f"• Designation  : {desig}\n"
            f"• Email        : {email_clean}\n"
            f"• Allocated Leaves: 12 Casual, 10 Sick, 18 Earned (Total: 40 Days for 2026)\n"
            f"• Database     : Neon Serverless PostgreSQL"
        )
    except Exception as e:
        return f"Database Error during registration: {str(e)}"


@app.tool()
def get_remaining_leaves(employee_id: str) -> str:
    """Check remaining leave balances and recent application history from Neon PostgreSQL.
    
    Args:
        employee_id: The Employee ID to query (e.g., 'EMP-101' or 'EMP-882').
        
    Returns:
        Structured leave balance breakdown and recent application status.
    """
    emp_id = employee_id.strip().upper()

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Query employee info
        cursor.execute("""
            SELECT full_name, department, designation, status 
            FROM employees WHERE employee_id = %s
        """, (emp_id,))
        emp = cursor.fetchone()

        if not emp:
            conn.close()
            return f"Error: No employee found with ID '{emp_id}'. Use 'register_employee' to create a new profile."

        # 2. Query leave balances for 2026
        cursor.execute("""
            SELECT leave_type, total_allocated, used_days, remaining_days 
            FROM leave_balances 
            WHERE employee_id = %s AND year = 2026
            ORDER BY leave_type ASC
        """, (emp_id,))
        balances = cursor.fetchall()

        # 3. Query recent leave applications
        cursor.execute("""
            SELECT application_id, leave_type, days_count, status, reason, applied_at
            FROM leave_applications
            WHERE employee_id = %s
            ORDER BY applied_at DESC
            LIMIT 3
        """, (emp_id,))
        recent_apps = cursor.fetchall()

        conn.close()

        # Format output report
        balance_lines = []
        total_remaining = 0
        for b in balances:
            balance_lines.append(
                f"  • {b['leave_type'].capitalize():<10} : {b['remaining_days']:>2} remaining "
                f"(Allocated: {b['total_allocated']}, Used: {b['used_days']})"
            )
            total_remaining += b['remaining_days']

        history_lines = []
        if recent_apps:
            for app_rec in recent_apps:
                applied_date = app_rec['applied_at'].strftime("%Y-%m-%d") if app_rec['applied_at'] else "N/A"
                history_lines.append(
                    f"  - [{applied_date}] {app_rec['days_count']}d {app_rec['leave_type'].capitalize()} "
                    f"({app_rec['status']}) - Reason: {app_rec['reason']}"
                )
        else:
            history_lines.append("  - No prior leave applications recorded.")

        return (
            f"📋 NDDB Leave Balance Report (Live Neon DB):\n"
            f"• Employee   : {emp['full_name']} ({emp_id})\n"
            f"• Department : {emp['department']} | {emp['designation']}\n"
            f"• Status     : {emp['status']}\n\n"
            f"📊 Leave Balances (Year 2026):\n" + "\n".join(balance_lines) + "\n"
            f"  ------------------------------------------------\n"
            f"  • Total Available : {total_remaining} days\n\n"
            f"📝 Recent Applications:\n" + "\n".join(history_lines)
        )
    except Exception as e:
        return f"Database Error during leave lookup: {str(e)}"


@app.tool()
def apply_for_leave(employee_id: str, leave_type: str, days_count: int, reason: str) -> str:
    """Apply for leave, validate available balance in Neon PostgreSQL, and deduct days.
    
    Args:
        employee_id: Employee ID applying for leave (e.g., 'EMP-101').
        leave_type: Type of leave requested: 'casual', 'sick', or 'earned'.
        days_count: Number of working days requested (must be a positive integer).
        reason: Justification/purpose for the leave request.
        
    Returns:
        Approval confirmation with updated balances, or rejection details if insufficient days.
    """
    emp_id = employee_id.strip().upper()
    l_type = leave_type.strip().lower()

    if days_count <= 0:
        return "Application Error: Number of days requested must be at least 1."

    if l_type not in ['casual', 'sick', 'earned', 'bereavement', 'maternity', 'paternity']:
        return f"Application Error: Invalid leave type '{leave_type}'. Allowed types: 'casual', 'sick', 'earned'."

    try:
        conn = get_db_connection()
        conn.autocommit = False
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Verify employee exists
        cursor.execute("SELECT full_name FROM employees WHERE employee_id = %s", (emp_id,))
        emp = cursor.fetchone()
        if not emp:
            conn.close()
            return f"Application Error: Employee '{emp_id}' not found. Please register first."

        # 2. Check balance
        cursor.execute("""
            SELECT total_allocated, used_days, remaining_days 
            FROM leave_balances 
            WHERE employee_id = %s AND leave_type = %s AND year = 2026
        """, (emp_id, l_type))
        balance = cursor.fetchone()

        if not balance:
            conn.close()
            return f"Application Error: No leave balance record found for type '{l_type}' in 2026."

        rem_days = balance['remaining_days']
        if rem_days < days_count:
            conn.close()
            return (
                f"❌ Leave Application REJECTED for {emp['full_name']} ({emp_id}):\n"
                f"• Reason     : Insufficient {l_type.capitalize()} Leave balance.\n"
                f"• Requested  : {days_count} days\n"
                f"• Available  : {rem_days} days (Shortfall: {days_count - rem_days} days)\n"
                f"• Database   : Neon PostgreSQL (Integrity Constraint Maintained)"
            )

        # 3. Update used_days in leave_balances
        new_used = balance['used_days'] + days_count
        cursor.execute("""
            UPDATE leave_balances 
            SET used_days = %s, last_updated = CURRENT_TIMESTAMP
            WHERE employee_id = %s AND leave_type = %s AND year = 2026
        """, (new_used, emp_id, l_type))

        # 4. Insert into leave_applications
        app_id = f"APP-{uuid.uuid4().hex[:8].upper()}"
        today_str = date.today().isoformat()
        cursor.execute("""
            INSERT INTO leave_applications (application_id, employee_id, leave_type, start_date, end_date, days_count, reason, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, 'APPROVED')
        """, (app_id, emp_id, l_type, today_str, today_str, days_count, reason.strip()))

        log_audit(cursor, "nddb-hr-portal-mcp", "apply_for_leave", f"{emp['full_name']} applied {days_count}d {l_type}")

        conn.commit()
        conn.close()

        updated_remaining = rem_days - days_count
        return (
            f"✅ Leave Application APPROVED!\n"
            f"• Application ID : {app_id}\n"
            f"• Employee       : {emp['full_name']} ({emp_id})\n"
            f"• Leave Type     : {l_type.capitalize()} Leave\n"
            f"• Duration       : {days_count} day(s)\n"
            f"• Reason         : {reason}\n"
            f"• Updated Balance: {updated_remaining} days remaining (was {rem_days})\n"
            f"• Status         : APPROVED (Persisted in Neon PostgreSQL)"
        )
    except Exception as e:
        return f"Database Error during leave application: {str(e)}"


@app.tool()
def list_all_employees() -> str:
    """List all registered employees in the NDDB HR system from Neon PostgreSQL."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT e.employee_id, e.full_name, e.department, e.designation,
                   COALESCE(SUM(b.remaining_days), 0) AS total_remaining_leaves
            FROM employees e
            LEFT JOIN leave_balances b ON e.employee_id = b.employee_id AND b.year = 2026
            GROUP BY e.employee_id, e.full_name, e.department, e.designation
            ORDER BY e.employee_id ASC
        """)
        rows = cursor.fetchall()
        conn.close()

        if not rows:
            return "No employees registered yet in Neon PostgreSQL."

        lines = [f"{'ID':<10} | {'Name':<22} | {'Department':<26} | {'Designation':<22} | {'Leaves Left':<11}"]
        lines.append("-" * 102)
        for r in rows:
            lines.append(
                f"{r['employee_id']:<10} | {r['full_name']:<22} | {r['department']:<26} | "
                f"{r['designation']:<22} | {r['total_remaining_leaves']:<11}"
            )

        return (
            f"👥 Registered NDDB Employees (Neon PostgreSQL Live Roster):\n"
            + "\n".join(lines)
            + f"\n\nTotal Registered Employees: {len(rows)}"
        )
    except Exception as e:
        return f"Database Error fetching employee list: {str(e)}"


# =============================================================================
# SERVER ENTRYPOINT
# =============================================================================
if __name__ == "__main__":
    print(f"Starting NDDB HR Portal MCP Server (Connected to Neon Serverless PostgreSQL)...", file=sys.stderr)
    app.run()
