"""
NDDB AI4IT — Day 5 Hands-on Demonstration: Interactive MCP Client
=============================================================================
This script demonstrates how an AI Agent or MCP Client (like Claude Desktop, 
Cursor, or an LLM application) interacts with an MCP Server.

It runs the MCP server as a subprocess, conducts the JSON-RPC 2.0 handshake,
discovers registered tools, and executes real tool calls.

Run:
    python mcp-explain/test_client.py
"""

import asyncio
import os
import sys
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

SERVER_SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "server.py")

async def run_mcp_demonstration():
    print("=" * 75)
    print(" NDDB AI4IT — MODEL CONTEXT PROTOCOL (MCP) INTERACTIVE DEMO")
    print("=" * 75)
    print(f"--> Spawning MCP Server: {SERVER_SCRIPT}")
    print(f"--> Python Executable : {sys.executable}\n")

    sys.stdout.reconfigure(encoding='utf-8')

    # Configure Stdio transport to the MCP server
    server_params = StdioServerParameters(
        command=sys.executable,
        args=[SERVER_SCRIPT],
        env=dict(os.environ)
    )

    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            # 1. MCP Handshake (Initialize)
            print("[STEP 1/5] Performing MCP Handshake (Protocol Initialization)...")
            init_result = await session.initialize()
            
            # Robust extraction across MCP 1.x and 2.x attribute styles
            s_info = getattr(init_result, 'server_info', getattr(init_result, 'serverInfo', None))
            s_name = getattr(s_info, 'name', 'nddb-hr-portal') if s_info else 'nddb-hr-portal'
            p_ver = getattr(init_result, 'protocol_version', getattr(init_result, 'protocolVersion', 'unknown'))
            
            print(f"  • Connected to Server: {s_name} (Protocol: {p_ver})")
            caps = getattr(init_result, 'capabilities', None)
            caps_keys = list(caps.__dict__.keys()) if hasattr(caps, '__dict__') else []
            print("  • Server Capabilities:", caps_keys)

            # 2. Tool Discovery (tools/list)
            print("\n[STEP 2/5] Tool Discovery via 'tools/list' (What Claude/GPT Sees):")
            tools_response = await session.list_tools()
            for tool in tools_response.tools:
                t_name = getattr(tool, 'name', '')
                t_desc = getattr(tool, 'description', '')
                t_schema = getattr(tool, 'input_schema', getattr(tool, 'inputSchema', {}))
                first_line_desc = t_desc.splitlines()[0] if t_desc else ''
                props = list(t_schema.get('properties', {}).keys()) if isinstance(t_schema, dict) else []
                print(f"\n  🔧 Tool: '{t_name}'")
                print(f"     Description: {first_line_desc}")
                print(f"     Parameters : {props}")

            # 3. Register a New Employee
            print("\n" + "=" * 75)
            print("[STEP 3/5] Executing Tool: 'register_employee' (Live Attendee Onboarding)...")
            register_args = {
                "employee_id": "NDDB-999",
                "full_name": "Sunita Verma",
                "email": "sunita.verma@nddb.coop",
                "department": "ICT Cloud & Cyber Operations",
                "designation": "Senior Cloud Security Engineer"
            }
            print(f"  --> Calling register_employee with: {json.dumps(register_args)}")
            res1 = await session.call_tool("register_employee", arguments=register_args)
            for content in res1.content:
                print(f"\n{content.text}")

            # 4. Check Leave Balances
            print("\n" + "=" * 75)
            print("[STEP 4/5] Executing Tool: 'get_remaining_leaves'...")
            query_args = {"employee_id": "NDDB-999"}
            print(f"  --> Calling get_remaining_leaves with: {json.dumps(query_args)}")
            res2 = await session.call_tool("get_remaining_leaves", arguments=query_args)
            for content in res2.content:
                print(f"\n{content.text}")

            # 5. Apply for Leave (Success and Boundary Check)
            print("\n" + "=" * 75)
            print("[STEP 5/5] Executing Tool: 'apply_for_leave'...")
            
            # 5A. Valid Leave Request (3 Days Casual Leave)
            print("\n--- Test 5A: Valid Application (3 Days Casual Leave) ---")
            apply_args = {
                "employee_id": "NDDB-999",
                "leave_type": "casual",
                "days_count": 3,
                "reason": "Family wedding in Vadodara"
            }
            res3a = await session.call_tool("apply_for_leave", arguments=apply_args)
            for content in res3a.content:
                print(content.text)

            # 5B. Boundary Test: Exceeding Balance (50 Days Casual Leave)
            print("\n--- Test 5B: Deficit Test (Attempting to take 50 Days) ---")
            excess_args = {
                "employee_id": "NDDB-999",
                "leave_type": "casual",
                "days_count": 50,
                "reason": "Extended sabbatical"
            }
            res3b = await session.call_tool("apply_for_leave", arguments=excess_args)
            for content in res3b.content:
                print(content.text)

            # 6. List all employees to show persistence
            print("\n" + "=" * 75)
            print("[FINAL AUDIT] Fetching complete employee registry:")
            res4 = await session.call_tool("list_all_employees", arguments={})
            for content in res4.content:
                print(content.text)

    print("\n" + "=" * 75)
    print(" DEMONSTRATION COMPLETE: MCP CLIENT-SERVER LIFECYCLE VERIFIED!")
    print("=" * 75)

if __name__ == "__main__":
    asyncio.run(run_mcp_demonstration())
