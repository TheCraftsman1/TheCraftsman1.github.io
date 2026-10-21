# 🛡️ SIRA — Autonomous AI Software Incident Response Agent (PS-61)

> **"Don't just detect software incidents. Understand them, explain them, safely fix them, verify the solution, and learn from them."**  
> An autonomous, vendor-neutral incident response platform that turns noisy log streams into structured incidents, investigates root causes using bounded LLM tool calling, executes tiered human-in-the-loop remediations, and enforces cryptographic SHA-256 hash-chained audit trails.

---

## 🎯 Project Identity & Scope

- **Problem Statement ID**: PS-61 — *AI Software Incident Response Agent*
- **Target Domain**: Agentic AI, Autonomous SRE, Web Development, Cybersecurity
- **Industry**: Cybersecurity / Enterprise Software Engineering / Security Operations (SOC)
- **Deployment Topology**: Dual AWS EC2 Virtual Machines (VM-A: Attacker/Kali Linux $\leftrightarrow$ VM-B: Victim Application + Defensive Agent Platform)

---

## 🏛️ Core Architectural Principle: Deterministic Detection + Bounded Reasoning

A critical architectural differentiator of SIRA is its separation of concerns:
> **Deterministic code detects and correlates. The LLM only reasons over structured incident data.**

1. **No Raw Log Dumps into LLMs**: Feeding 50,000 raw log lines directly into an LLM is slow, cost-prohibitive, non-deterministic, and prone to hallucinations.
2. **From-Scratch Drain 3.0 Tree Parser**: High-volume unstructured logs are parsed into deterministic templates in sub-millisecond time.
3. **Two-Tier Statistical Anomaly Detection**: Combines online streaming statistical bounds (**EWMA + Median Absolute Deviation**) with unsupervised **Isolation Forest** algorithms for high-precision, low-false-positive alerts.
4. **Temporal Correlation Engine**: Clusters multi-service events (HTTP access logs, authentication logs, application traces) into unified incident candidates.
5. **Bounded Agentic Investigation**: The LLM acts as an investigator equipped with a strict, read-only toolset (`query_logs`, `get_recent_deploys`, `find_similar_incidents`, `get_service_dependencies`, `get_runbook`) to rank root-cause hypotheses with evidence citations.

---

## 🔄 End-to-End Incident Lifecycle

```
[ Raw Application / System Logs ]
              │
              ▼
   [ 1. Ingestion Engine ] ──▶ WebSocket / Log File Watchers
              │
              ▼
   [ 2. Drain 3.0 Parser ] ──▶ Structured Log Templates & Novelty Detection
              │
              ▼
   [ 3. Anomaly Detection ] ──▶ EWMA + MAD Statistical Limits & Isolation Forest
              │
              ▼
   [ 4. Correlation Engine ] ──▶ Multi-service Temporal Window Aggregation
              │
              ▼
   [ 5. Structured Incident Candidate ]
              │
              ▼
   [ 6. Agentic LLM Investigator ] ──▶ Bounded Tool Calls (`query_logs`, `get_runbook`, etc.)
              │
              ▼
   [ 7. 3-Tier Action Gating ]
         ├─ Tier 1: Read-Only (Automated log queries)
         ├─ Tier 2: Reversible (Temporary rate limiting, flagged sessions)
         └─ Tier 3: Sensitive (Firewall IP blocks, rollbacks) ──▶ [ Human Approval ]
              │
              ▼
   [ 8. Orchestrated Execution ] ──▶ n8n Workflows + Telegram Bot + CallMeBot Audio Dispatch
              │
              ▼
   [ 9. Cryptographic Audit Trail ] ──▶ SHA-256 Hash-Chained SQLite Ledger
```

---

## ✅ PS-61 Deliverables Compliance Matrix

| # | Deliverable | How SIRA Implements It |
|---|---|---|
| 1 | **Incident Creation and Intake** | Automated webhook ingestion, log file tailers, and manual operator intake API. |
| 2 | **Log & Alert Integration** | Ingestion pipeline for Apache/Nginx access logs, auth logs, application logs, and system metrics. |
| 3 | **Automated Incident Classification** | Categorizes events into brute force, SQL injection, credential stuffing, DDoS, service degradation, or configuration drift. |
| 4 | **Severity and Priority Assessment** | Dynamic scoring based on blast radius, error rate spikes, affected services, and asset criticality. |
| 5 | **Event & Log Correlation** | Multi-service temporal clustering linking authentication spikes with subsequent database query errors. |
| 6 | **Anomaly & Error Detection** | Streaming EWMA/MAD statistical thresholds paired with an Isolation Forest baseline model. |
| 7 | **Root-Cause Analysis Assistance** | LLM investigator ranks probable causes with confidence percentages and direct evidence IDs. |
| 8 | **Similar/Historical Incidents** | Retrieval subsystem matching incident vector embeddings and Drain log templates against past resolutions. |
| 9 | **AI-Generated Summaries** | Plain-language executive briefs alongside deep technical post-mortems. |
| 10 | **Recommended Investigation & Remediation** | Step-by-step interactive runbooks generated dynamically based on identified attack signatures. |
| 11 | **Automated Response Workflows** | n8n automation pipeline orchestrating mitigation steps across services. |
| 12 | **Assignment & Escalation Management** | Routing based on incident domain with automated on-call rotation triggers. |
| 13 | **Incident Status & Lifecycle Tracking** | Finite state machine: `NEW` $\rightarrow$ `CORRELATED` $\rightarrow$ `INVESTIGATING` $\rightarrow$ `AWAITING_APPROVAL` $\rightarrow$ `MITIGATING` $\rightarrow$ `RESOLVED`. |
| 14 | **Human Approval Before Sensitive Actions** | Explicit operator gating in the SOC Dashboard and Telegram Bot before executing firewall IP bans or rollbacks. |
| 15 | **Evidence & Investigation Timeline** | Chronological visual timeline linking raw log templates, anomaly detection points, agent thoughts, and approvals. |
| 16 | **Notifications & Escalation Alerts** | Automated instant audio phone dispatch via CallMeBot and rich alerts via Telegram API. |
| 17 | **Incident Dashboard** | Cyber-aesthetic mission control built with React, Vite, Tailwind CSS, 3D Sentinel canvas, and live sparklines. |
| 18 | **Search and Filtering** | Real-time filtering by severity, status, IP, service tag, or log template. |
| 19 | **Historical Knowledge Base** | Searchable vector store of resolved incidents, accepted mitigations, and post-mortem learnings. |
| 20 | **Resolution & Post-Incident Docs** | Automatic markdown export of post-mortems with timeline, root cause, blast radius, and preventative measures. |
| 21 | **Incident Analytics and Reports** | MTTA (Mean Time to Acknowledge), MTTR (Mean Time to Resolve), false-positive metrics, and attack distribution charts. |
| 22 | **Cryptographic Audit Trail** | SHA-256 hash-chained immutable ledger recording every alert, LLM hypothesis, operator approval, and remediation execution. |

---

## 🖥️ Live Validation: The Dual-VM Attack & Defense Lab

To ensure SIRA was not evaluated solely on synthetic toy data, it was deployed and tested in an isolated AWS EC2 environment:

1. **VM-A (Attacker / Kali Linux)**:
   - Armed with penetration testing tools: `Hydra` (distributed brute force), `sqlmap` (blind SQL injection), `gobuster`/`nikto` (directory and endpoint scanning), and `hey` (concurrency/DoS load generation).
   - Generates authentic attack noise with natural network latency and timing variations.
2. **VM-B (Victim / Target Application & Defensive SIRA Platform)**:
   - Hosts the college portal target application (`FastAPI`, SQLite, JWT auth).
   - Runs SIRA's ingestion engine, Drain 3.0 parser, anomaly detectors, agentic LLM triage, and the SOC Command Center web application.

---

## 📸 Existing Platform Visuals in Repository

Visual assets currently cataloged in [`screenshots/`](./screenshots/):
- `soc_dashboard.png`: Autonomous SOC Command Center & live telemetry feed.
- `ai_mitigation_intercept.png`: Active threat interception with confidence scores and evidence citations.
- `aws_ec2_instances.png`: Dual-cloud AWS EC2 infrastructure topology.
- `on_call_audio_dispatch.png`: Real-time phone call and Telegram alert dispatch to on-call engineer.
- `n8n_workflow.png`: Multi-branch orchestration flow with human approval gating.
- `devil.png`: Cyber-aesthetic sentinel emblem.
