# AquaSafeAI

Predict Today. Safer Tomorrow.

AquaSafeAI is an AI-powered early warning platform for water-quality deterioration. Instead of reacting to unsafe water, AquaSafeAI predicts deterioration patterns before they reach critical levels, allowing operators to investigate early.

> **Safety note:** this repository is a prototype, not a certified drinking-water safety system. The current classifier is a transparent server-side heuristic; it must not be represented as a trained TinyML contaminant classifier until a validated model, calibration process, and field test evidence are supplied.

## Technology Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts, Lucide React
- **Backend**: Python, FastAPI, SQLAlchemy, PostgreSQL, WebSockets
- **AI Engine**: Rolling baseline heuristic multi-parameter anomaly detection
- **Hardware Integration**: Support for ESP32/Arduino via HTTP POST

## Setup Instructions

### 1. Database
The project runs locally with SQLite by default (`backend/aquasafe.db`). For PostgreSQL, copy `backend/.env.example` to `backend/.env`, set `DATABASE_URL`, then use the provided container:
```bash
docker compose up -d
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt # (or install directly via pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic pydantic-settings websockets)

# Optional: copy environment variables to use PostgreSQL or tune safety controls
copy .env.example .env

# Seed the initial database (creates the tables and initial Water Source)
python seed.py

# Run the API server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Demo Flow

The system includes a deterministic Demo Simulator that bypasses hardware to inject data directly into the AI pipeline.

To run the Golden Demo:
1. Open the Frontend Dashboard (`http://localhost:5173`).
2. Observe the **Healthy Baseline** (Risk ~0%).
3. Click **Gradual Deterioration** in the Simulation Controls.
4. Watch as the Live Telemetry chart plots rising values.
5. Watch the **AI Deterioration Risk** climb from LOW -> MODERATE -> HIGH -> CRITICAL.
6. Read the **AI Insights** explanation dynamically updating to explain *why* the risk is increasing.
7. Observe the **High Risk Alert** pop up in the active alerts panel.
8. **Acknowledge** the alert.
9. Click **Simulate Recovery** to watch the source stabilize.

## Hardware Integration
An example C++ script for ESP32 is provided in `backend/hardware/esp32_example.cpp`. Ensure the device is registered first and sends a JSON payload to `/api/v1/ingest/readings` matching `IngestPayload`.

When a registered physical device receives a critical prediction, the backend enqueues a deduplicated `BLOCK_FLOW` command. The controller polls `GET /api/v1/devices/{device_uid}/commands/next`, actuates its isolated relay, and must acknowledge the command. This creates a traceable closed-loop safety path; verify relay polarity, fail-safe behavior, credentials, and local regulations before connecting any pump.

Physical devices also receive `SET_SAMPLING_INTERVAL` commands: the normal cadence is five minutes and the fluctuation mode is 30 seconds once the multi-parameter risk score reaches the configured threshold. Both intervals are configurable in `backend/.env`.

## Architecture
- **Ingestion Service**: Validates all incoming hardware and simulation payloads.
- **Risk Engine**: Fetches a 50-reading historical baseline, computes % deviations, generates a 0-100 risk score, and derives an English explanation.
- **Alert Service**: State machine that escalates or deduplicates alerts based on AI predictions.
- **Realtime Service**: FastAPI WebSockets instantly push the newly calculated state to all React clients.
