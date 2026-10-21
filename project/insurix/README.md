# 🛡️ Insurix.India — Autonomous Insurance Auto-Renewal Negotiation Agent

> **"Smart Insurance for Every Indian Family"**  
> An AI-driven conversational and algorithmic insurance platform that eliminates renewal opacity, breaks loyalty penalties, negotiates premiums with multiple insurers simultaneously, unmasks fine-print policy traps, and assists policyholders via a multilingual voice assistant.

---

## 🧭 Executive Summary & The Problem

In India, insurance renewal is characterized by asymmetric information and consumer exploitation:
1. **The Loyalty Penalty**: Insurers frequently raise renewal premiums on existing, loyal customers while offering deep acquisition discounts to new buyers.
2. **The "NCB Trap"**: Compounding third-party (TP) statutory rate hikes often silently outpace No Claim Bonus (NCB) discounts, leaving consumers paying more despite zero claims.
3. **Hidden Fine-Print Friction**: Claim settlements are frequently slashed by 30–50% due to non-medical expense deductions, proportionate room-rent caps, and disease-specific waiting periods buried in 40-page policy wordings.
4. **Linguistic & Accessibility Barriers**: Millions of Indian vehicle owners and families struggle to navigate English-heavy insurance portals.

**Insurix.India** (built by Team FireFlies for the KLH Hackathon, Problem Statement #7) acts as an autonomous advocate for Indian policyholders by combining multi-party negotiation agents, empirical IRDAI actuarial datasets, and multilingual voice AI.

---

## 🏛️ System Architecture

```
[ Indian Policyholder / User ]
  ├── Browser GUI (14 Insurance Marketplace Categories)
  ├── Multilingual Voice Input (English, Hindi, Telugu via Web Speech & Azure)
  └── Policy Document Upload (PDF, DOCX, TXT)
              │
              ▼
   [ 1. Web Application & Routing Tier: Express 4.x & Node.js 18+ ]
         ├── IRDAI Master Engine (Real FY 2025-26 TP Rates, IDV Depreciation Curves)
         ├── RTO Master Directory (30+ States, 400+ Zones, 100+ Vehicle Models)
         └── Document Parsing Pipeline (Multer, PDF-Parse, Mammoth)
              │
              ▼
   [ 2. InsurGuard Predictive Intelligence Engine ]
         ├── "Loot-Shield": Claim Friction Scoring (IRDAI Disclosures + IIB Theft Index)
         ├── "Gap Analysis": Middle-Class Financial Fragility Index & Healthcare Inflation
         └── TCO Simulator: 5-Year Loyalty vs. Switcher Trajectory & NCB Trap Detection
              │
              ▼
   [ 3. Multi-Party AI Negotiation Engine ]
         ├── 3-Round Automated Bargaining Simulation (Initial Push ➔ Counter-Offers ➔ Best & Final)
         ├── Insurer-Specific Agents (HDFC ERGO, ICICI Lombard, Bajaj Allianz, Tata AIG, SBI General, Digit)
         └── Live Savings Meter & Policy Add-on Optimization
              │
              ▼
   [ 4. External Intelligence Services ]
         ├── OpenRouter: Google Gemini 2.0 Flash (Policy Decoder, System Prompts, Chat)
         └── Microsoft Azure Cognitive Services: Neural Text-to-Speech (TTS) & STT
              │
              ▼
   [ 5. Fulfillment & Checkout ] ──▶ Instant UPI Payment & Policy Issuance
```

---

## ⚡ Core Innovations & Features

### 1. 3-Round Automated Negotiation Engine (`/api/negotiate/*`)
Rather than passively accepting a renewal quote, the platform initiates an automated 3-round bargaining session across 6 leading insurers:
- **Round 1 (Initial Push)**: Solicits baseline quotes and challenges pricing using market competition.
- **Round 2 (Counter-Offers & Bundling)**: Insurers submit revised offers leveraging NCB retention bonuses, loyalty discounts, and zero-dep / consumables add-on bundles.
- **Round 3 (Best & Final Offer)**: AI mediator extracts maximum discounts up to each insurer's algorithmic discount cap (8–18%).
- **Interactive Stances**: Users can toggle between *Aggressive*, *Balanced*, or *Quick* negotiation strategies.
- **Live Visuals**: Includes real-time negotiation timeline, savings meter, and transparent breakdown of Own Damage (OD), Third Party (TP), and GST.

### 2. InsurGuard Predictive Intelligence Suite
- 🛡️ **Predictive Claim Settlement ("Loot-Shield")**:
  - Computes an objective **Claim Friction Score (0–100)** and estimates cashless approval turnaround time based on a weighted 3-variable formula:
    $$Score = f(W_1 \cdot \text{IRDAI Rejection Rate}, W_2 \cdot \text{IIB Theft/Overheads}, W_3 \cdot \text{Policy Quality Triggers})$$
- 🔍 **Holistic Vulnerability Assessment ("Gap Analysis")**:
  - Implements the *Middle-Class Financial Fragility Index*.
  - Projects whether a ₹5 Lakh health cover will cover major surgeries in 2031 under compounding 12% medical inflation.
  - Computes Human Life Value (HLV) and evaluates emergency survival runway in months.
- 📊 **Total Cost of Ownership (TCO) Simulator**:
  - Interactive 5-year financial projection using Chart.js.
  - Unmasks the **NCB Trap** where rising statutory third-party premiums outpace discounts, proving why switching insurers every 2–3 years saves money.

### 3. Multilingual AI Voice Assistant
- Seamless voice-first interface conversing in **English, Hindi, and Telugu**.
- Integrated with Azure Neural Speech Synthesis and OpenRouter Gemini 2.0 Flash.
- **Spoken Vehicle Extraction**: Listens to natural speech (e.g. *"Check insurance for my Activa TS08JM2665"*), extracts registration numbers, queries the RTO database, computes IDV and statutory TP rates, renders 6 live quotes, and guides the user through UPI payment.

### 4. AI Policy Decoder & Commission Transparency
- **Document Decoder**: Users drag and drop complex policy documents (PDF/Word). Gemini extracts exclusions, sub-limits, room-rent caps, and co-pays, rendering them with clean Red/Yellow/Green severity tags.
- **Commission Tracker**: Exposes hidden intermediary agent commissions across life, health, and motor products based on IRDAI public disclosures.

---

## 🛠️ Complete Tech Stack

| Component | Technologies |
|---|---|
| **Backend Framework** | Node.js (v18+), Express.js 4.x |
| **Document Processing** | Multer, pdf-parse, mammoth (Word extraction), Cheerio |
| **LLM Reasoning** | Google Gemini 2.0 Flash (via OpenRouter API) |
| **Speech Processing** | Microsoft Azure Cognitive Services (Neural TTS & STT), Web Speech API |
| **Frontend UI** | HTML5, CSS3 (Glassmorphic FinTech styling), Vanilla JavaScript, Chart.js |
| **Data Sources** | IRDAI Official FY 2025-26 TP Schedules, Insurance Information Bureau (IIB) Theft Index, RTO National Master Registry |

---

## 📸 Platform Visuals & Screenshots

Visual assets cataloged in [`screenshots/`](./screenshots/):
- `logo.png`: Official Insurix.India logo.
- `architecture-full.jpg`: Full 6-layer system architecture diagram.
- `architecture-db.png`: Database and entity schema diagram.
- `ui-homepage.png`: 14-category insurance marketplace dashboard.
- `ui-voice-assistant.png`: Multilingual voice assistant and RTO quote generator.
- `ui-negotiation.png`: 3-round automated multi-insurer negotiation arena.
- `ui-ai-tools.png`: AI Policy Decoder, commission tracker, and renewal oracle.
