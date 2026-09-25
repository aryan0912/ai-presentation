# Model Context Protocol (MCP) — Enterprise HR Portal Demo
## AI4IT (NDDB) — Day 5 Teaching & Demonstration Module

---

## 1. Why is this Approach Exceptionally Good for Day 5?

On **Day 5 ("Giving the Copilot Hands — Tools, Agents & the Engineering Landscape")**, attendees transition from reading text (RAG) to autonomous action.

Most tutorials explain tool-calling abstractly with bespoke, throwaway Python functions.
By introducing a real, working **Model Context Protocol (MCP)** server with an **Enterprise HR Portal**:

1. **Immediate Personal Resonance:** Every attendee understands HR portals, leaves, and employee registrations. It removes cognitive load so they focus 100% on the protocol mechanics.
2. **The "Plug-and-Play" Revelation:** Attendees can literally plug this exact Python file into **Claude Desktop**, **Cursor**, or an AI agent, and watch the AI automatically discover the tools and execute real database mutations without changing any client code!
3. **Live Cloud Database Persistence:** When an attendee registers as an employee (`register_employee`) or takes 3 days leave (`apply_for_leave`), it writes directly to NDDB's live **Neon Serverless PostgreSQL** database (`ep-wandering-water-b52fnnnb-pooler.c-7.us-east-2.aws.neon.tech/neondb`). Everyone in the room can see the live row updates in `employees`, `leave_balances`, and `leave_applications`!

---

## 2. What Problem Does MCP Solve? (The "USB-C Analogy")

### The Old Way: The "N × M" Integration Nightmare
Before MCP, if you had:
- **N AI Clients** (Claude Desktop, ChatGPT, Cursor, VS Code, Custom Web Copilot)
- **M Enterprise Systems** (PostgreSQL, Neon DB, SAP ERP, Chiller SCADA, Jira, Slack)

You had to write **$N \times M$ custom wrappers**!
Every AI platform had its own proprietary function calling schema, its own error formats, and its own authentication loops.

```
[Claude]    \      /  [Neon PostgreSQL]
[ChatGPT]  ───╳───   [SAP ERP]
[Cursor]    /      \  [Jira ITSM]
  (N Clients)           (M Systems)
  Requires N × M custom codebases!
```

### The MCP Way: The Universal USB-C Standard for AI
Anthropic open-sourced the **Model Context Protocol (MCP)** as an open standard based on **JSON-RPC 2.0**:
- You build **ONE MCP Server** for your enterprise system.
- **ANY MCP Client** can instantly connect, discover capabilities, and execute tools.

```
[Claude]    ─┐
[ChatGPT]   ──┼──►  [MCP Standard (JSON-RPC)]  ──►  [NDDB HR Server]  ──►  [Neon Serverless PostgreSQL]
[Cursor]    ─┘
```

---

## 3. Directory Contents & Architecture

```
mcp-explain/
├── server.py                   # The Core MCP Server connected to Neon PostgreSQL
├── test_client.py              # Standalone interactive client simulating an AI agent
├── claude_desktop_config.json  # Configuration snippet for Claude Desktop & Cursor
└── README.md                   # This comprehensive architectural & teaching guide
```

### The 4 Exposed Enterprise Tools (Backed by Neon PostgreSQL)

| Tool Name | Parameters | Target Neon DB Tables & Logic |
| :--- | :--- | :--- |
| `register_employee` | `employee_id`, `full_name`, `email`, `department`, `designation` | Inserts new record into `employees`; seeds initial 2026 allocations (12 Casual, 10 Sick, 18 Earned) into `leave_balances`; logs to `agent_audit_logs`. |
| `get_remaining_leaves` | `employee_id` | Queries live `leave_balances` joined with `employees` and recent `leave_applications`. |
| `apply_for_leave` | `employee_id`, `leave_type`, `days_count`, `reason` | Validates balance against `leave_balances`. If sufficient: increments `used_days`, inserts into `leave_applications`, and logs audit trail. If deficit: rejects cleanly. |
| `list_all_employees` | *None* | Generates an aggregated ASCII table from `employees` and `leave_balances`. |


---

## 4. How to Run the Demonstration

### Option 1: Standalone Interactive Test Client (Fastest & Universal)
Even if attendees don't have Claude Desktop installed, they can run the included Python test client to see the complete protocol lifecycle:

```bash
python mcp-explain/test_client.py
```

**What you will see in the terminal:**
1. **The MCP Handshake (`session.initialize()`):**
   Negotiates protocol version and client/server capabilities over standard I/O (`stdio`).
2. **Tool Discovery (`session.list_tools()`):**
   The server returns the JSON Schema for each tool (names, descriptions, parameter types).
3. **Execution of `register_employee`:**
   Registers a new employee (e.g., Sunita Verma).
4. **Execution of `get_remaining_leaves`:**
   Inspects the initial 40-day allocation.
5. **Execution of `apply_for_leave` (Approved):**
   Takes 3 days of Casual Leave. Balance drops from 12 to 9 days.
6. **Execution of `apply_for_leave` (Rejected):**
   Attempts to take 50 days. The server rejects it with an explicit deficit explanation.
7. **Final Registry Audit:**
   Prints the updated database table.

---

### Option 2: Live Integration with Claude Desktop

To let attendees talk to their local MCP server using Claude Desktop:

1. Open Claude Desktop's configuration file:
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add the configuration from `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "nddb-hr-portal": {
         "command": "python",
         "args": [
           "d:\\part2\\ai-presentation\\mcp-explain\\server.py"
         ],
         "env": {
           "PYTHONUNBUFFERED": "1"
         }
       }
     }
   }
   ```
3. Restart Claude Desktop.
4. Look for the 🔨 **Hammer Icon** in the bottom-right of the prompt input in Claude Desktop. Click it to verify all 4 NDDB HR tools are listed!
5. In Claude Desktop, type natural prompts:
   - *"Register me as an employee with ID NDDB-777, name Rajesh Sharma in Cold-Chain Engineering, email rajesh@nddb.coop"*
   - *"How many casual leaves do I have?"*
   - *"Apply for 2 days of casual leave for my cousin's wedding in Anand"*

---

## 5. Verbatim Instructor Delivery Script for Day 5

*[STAGE DIRECTION: Open `server.py` in VS Code. Display it on Screen 1. Open `test_client.py` on Screen 2. Stand center stage.]*

**SPEAKER:**
"Yesterday, we taught the machine how to predict tokens and retrieve RAG documents.
Today, we are going to teach the machine how to **act in the physical world**.

Now, if you want an AI to take an action—like checking a database or booking a train ticket—how do you do it?
Most people write custom Python functions. 
The problem is: if you write a custom function for OpenAI, it doesn't work in Claude. If you write it for Claude, it doesn't work in Cursor. If you change your frontend, you have to rewrite your API wrappers.

In November 2024, Anthropic open-sourced something that changed enterprise AI forever:
**The Model Context Protocol (MCP).**

Think of MCP as the **USB-C port for Artificial Intelligence**.
Just as a USB-C port lets you plug any mouse, keyboard, monitor, or hard drive into any laptop without opening up the motherboard... MCP lets you plug any database, API, or enterprise tool into any LLM!

Look at `mcp-explain/server.py` on my screen.
Notice how simple it is:
- We import `MCPServer` from the official `mcp` library.
- We define a Python function `apply_for_leave`.
- We add one single decorator: `@app.tool()`.

That’s it!
The moment you add `@app.tool()`, MCP inspects your Python type hints (`emp_id: str`, `days: int`), automatically generates a standard JSON Schema, and publishes it via JSON-RPC.

Now watch what happens when I run our client in the terminal:
*[Execute: `python mcp-explain/test_client.py`]*

Look at the console:
1. The AI client asked the server: *'What tools do you have?'*
2. The server responded with four tools: `register_employee`, `get_remaining_leaves`, `apply_for_leave`, and `list_all_employees`.
3. The AI client called `register_employee` for Sunita Verma.
4. Then it applied for 3 days of leave.
5. And when it tried to apply for 50 days, the server safely rejected it!

Notice: **The AI did not touch the database directly.**
The AI didn't have SQL write access. The AI communicated across an authenticated, structured protocol boundary.

Open `mcp-explain/` on your laptops right now. Run `test_client.py`. Register your own name as an employee in the system!"
