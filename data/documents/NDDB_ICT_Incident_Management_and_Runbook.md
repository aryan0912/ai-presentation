# National Dairy Development Board (NDDB)
## ICT Operations Incident Management Runbook & Agent Guardrail Standard

- **Document Identifier**: `NDDB-IT-ITSM-RUNBOOK-v3`
- **Department**: Information & Communication Technology (ICT) Directorate
- **Classification**: Internal Technical Operations Runbook & Agentic Security Architecture
- **Effective Date**: January 1, 2026
- **Version**: 3.4.0
- **Audience**: ICT Operations Center (NOC), Database Administrators (DBAs), DevOps Engineers, AI Agent Architects, and Tier-1/Tier-2 Support Engineers.

---

### Section 1: Incident Priority Classification & Service Level Agreements (SLAs)

The NDDB ICT Directorate classifies all hardware, network, database, and telemetry anomalies according to four standardized priority tiers:

| Priority | Classification | Defining Criteria & Impact | Response SLA | Target Resolution SLA | Escalation Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | **Critical** | Major cold-chain failure at a bulk chilling center (e.g. BMC chiller failure, bulk milk temp excursion > 4.5°C), total loss of SCADA telemetry at central hub, direct threat of milk spoilage, or enterprise ERP outage affecting milk procurement. | **15 minutes** | **2 hours** | On-call Chiller Lead + NOC Duty Manager + CIO |
| **P2** | **Major** | Redundant sensor failure on cooling unit, database read-replica latency exceeding 300ms, non-critical telemetry packet drops from satellite BMCs, single network link degradation. | **30 minutes** | **4 hours** | Systems Analyst + Cold Chain Engineer |
| **P3** | **Moderate** | HR Self-Service Portal leave balance sync failure, scheduled batch reporting delays, non-urgent telemetry sensor drift (< 0.5°C), printer/peripherals outage. | **4 hours** | **24 hours** | Senior Systems Analyst (ICT) |
| **P4** | **Low** | Routine password resets, new employee badge provisioning, minor portal styling issues, informational feature requests. | **8 hours** | **3 business days** | Helpdesk Support Desk |

---

### Section 2: Automated Incident Protocol for Cold-Chain Telemetry Anomalies

#### 2.1 Autonomous Telemetry Surveillance Agent
An automated monitoring agent continuously analyzes incoming records from the `chiller_telemetry` table in the Neon PostgreSQL database. 

#### 2.2 Trigger Conditions for Automated Incident Generation
When the agent evaluates:
```text
IF (chiller_telemetry.temperature_celsius > 4.5°C 
    OR chiller_telemetry.discharge_pressure_bar > 18.5 bar)
   AND condition_duration >= 15 minutes
THEN:
   Invoke Ticketing API -> Create P1 Incident Ticket in incident_tickets table
   Trigger SMS/WhatsApp alerts to Lead Chiller Technician and Facility In-Charge
```

#### 2.3 Canonical Incident Ticket Structure (`INC-4471`)
For auditability and demonstration grounding, active incidents follow this exact format:
- **Ticket ID**: `INC-4471`
- **Facility**: `Anand Central BMC`
- **Affected Asset**: `CH-04` (Chiller Unit 4, Bay B, 10,000L capacity)
- **Severity**: `P1`
- **Title**: *"Compressor readings out of range at Anand Chilling Centre"*
- **Detailed Description**: *"Telemetry alert triggered: Chiller CH-04 discharge pressure spiked to 19.4 bar with milk temperature rising to 5.2°C exceeding threshold of 4.5°C. Risk of microbial proliferation in 10,000L raw milk batch."*
- **Reported By**: `IoT-Telemetry-Agent`
- **Assigned Team**: `Cold-Chain Engineering`
- **Current Status**: `INVESTIGATING`
- **Timestamp**: Auto-generated timestamp with current interval.

#### 2.4 Incident Resolution Workflow
1. Technician arrives on site at Anand BMC Bay B and acknowledges ticket `INC-4471`.
2. Follows SOP `SOP-NDDB-ENG-CH-2026-09` Section 3 (verifies condenser fan `KM2`, TXV bulb clamp, water pressure).
3. If necessary, switches to secondary cooling circuit.
4. Once milk temperature drops below 4.0°C for 30 consecutive minutes, technician updates ticket status to `RESOLVED` with root-cause notes.

---

### Section 3: Database Security & LLM Agent Guardrails

#### 3.1 Context & Risk Assessment
Modern LLM agents integrated with corporate databases (such as Text-to-SQL assistants or automated workflow bots) pose severe operational and security hazards if granted unrestricted SQL execution privileges. A naive agent given broad administrative access may:
- Accidentally drop operational tables (`DROP TABLE chillers CASCADE;`).
- Purge incident audit trails (`DELETE FROM incident_tickets;`).
- Expose sensitive personnel records through unconstrained `SELECT` queries.
- Inject malicious or malformed SQL queries via prompt injection.

#### 3.2 ICT Policy Clause `SEC-DBA-9.1`: Agentic Database Governance
To mitigate these critical risks, the NDDB ICT Directorate mandates strict adherence to **Clause `SEC-DBA-9.1`**:

> **Policy Clause `SEC-DBA-9.1` (SQL Agent Execution Limits)**:
> 1. **No Superuser / Admin Access for Autonomous Agents**: No autonomous AI agent, LLM tool, or LangGraph workflow shall connect to production or staging databases using a `SUPERUSER`, `CREATEROLE`, `DATABASE_OWNER`, or unrestricted read-write connection string.
> 2. **Prohibited SQL Verbs**: Autonomous text-to-SQL agents are strictly prohibited from executing Data Definition Language (DDL) or destructive Data Manipulation Language (DML) statements. Any query containing `DROP`, `DELETE`, `TRUNCATE`, `ALTER`, `GRANT`, `REVOKE`, or multi-statement delimiters (`;`) without parameterized review shall be immediately intercepted and aborted.
> 3. **Dual Connection Architecture**:
>    - **Safe Operational Queries**: Must utilize a restricted `readonly_user` account with `SELECT` permissions restricted exclusively to whitelisted operational views and tables (`employees`, `leave_balances`, `chillers`, `chiller_telemetry`, `incident_tickets`).
>    - **Transactional Mutations**: Must occur exclusively through strictly validated, parameterized stored procedures or dedicated microservice REST APIs (e.g., `POST /api/leaves/apply`, `POST /api/tickets/create`) that validate session authentication, caller roles, and business invariants before committing.

#### 3.3 Comparative Architecture: Naive vs. Guardrailed Agent

```
[NAIVE AGENT ARCHITECTURE - UNACCEPTABLE RISK]
User Prompt: "Reset the incident table"
     │
     ▼
LLM generates: "DROP TABLE incident_tickets;"
     │
     ▼ (Admin connection: neondb_owner)
PostgreSQL executes DDL -> CATASTROPHIC DATA LOSS!

─────────────────────────────────────────────────────────────────

[GUARDRAILED MCP AGENT ARCHITECTURE - NDDB STANDARD]
User Prompt: "What is the status of Chiller 4?"
     │
     ▼
LLM generates: Parameterized Tool Call -> get_chiller_telemetry(chiller_id="CH-04")
     │
     ▼
MCP Server Guardrail Interceptor:
  • Checks query AST / Regex for forbidden DDL keywords
  • Validates parameter bounds
  • Connects via readonly_user (SELECT ONLY)
     │
     ▼
PostgreSQL executes safely: Returns structured telemetry JSON
```

---

### Section 4: Golden Q&A Grounding Verification

This runbook, in conjunction with the HR Policy Manual and Chiller SOP, provides complete deterministic grounding for LLM agent benchmarks:
- **P1 Response SLA**: 15 minutes.
- **High Chiller Temp Action**: Autonomous raising of a P1 incident ticket assigned to Cold-Chain Engineering.
- **SQL Agent Guardrail Policy**: Clause `SEC-DBA-9.1` enforcing read-only dual-user architecture and parameterized tool abstraction.
