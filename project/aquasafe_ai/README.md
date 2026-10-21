# 💧 AquaSafeAI — Edge AI & Predictive Water Contamination Platform

> **"Predict Today. Safer Tomorrow."**  
> An autonomous, edge-intelligent drinking water safety system that predicts water quality deterioration patterns, classifies contamination classes via on-device TinyML, explains anomalies using SHAP attributions, analyzes field test strips with Gemini Vision, and executes closed-loop pump shutoffs to protect public health.

---

## 🧭 Executive Summary & The Problem

Traditional water quality monitoring relies on centralized laboratory testing with a **24 to 48-hour latency window**. In municipal and rural (Gram Panchayat) water supplies, this latency creates a dangerous failure mode: contaminated water is consumed, distributed, and causes waterborne epidemics before the first test result is returned.

**AquaSafeAI** eliminates this latency by moving the intelligence to the point of consumption:
1. **Predictive, Not Reactive**: Identifies subtle multi-parameter drift before water reaches toxic thresholds.
2. **Edge-First (TinyML)**: Runs real-time neural inference on resource-constrained ESP32 microcontrollers without cloud dependency.
3. **Closed-Loop Safety Actuation**: Automatically trips an opto-isolated relay to block water flow immediately when chemical contaminants are detected.

---

## 📸 Real Hardware & Field Deployments

| Asset | Preview | Description |
|---|---|---|
| **Circuit Schematic & Pinout** | `circuit_schematic_wiring.jpg` | Complete labeled wiring diagram & pinout table for the 5-probe sensor array (pH SEN0161, Turbidity SEN0189, TDS SEN0244, Conductivity DFR0300, Temp DS18B20), OLED I2C display, status LEDs, and 5V power supply. |
| **Physical ESP32 Lab Prototype** | `esp32_breadboard_lab_prototype.jpg` | Fully assembled ESP32-WROOM-32 hardware prototype with sensor breakout boards, live metrics on OLED, tri-color status LEDs, and real-time probe beaker immersion testing. |
| **Indoor & Municipal Manifold** | `field_enclosure_pipe_deployment.jpg` | Production-grade IP-rated enclosure with transparent inline pipe manifold housing all 5 immersion sensors for tap-water and reservoir pipe monitoring. |
| **Field Wall-Mounted Installation** | `aquasafe_wall_mounted_unit.jpg` | Weather-proof wall installation with conduit piping running live telemetry (TDS 120 ppm, pH 7.4, Temp 26.8°C, Cond 245 µS/cm, Turbidity 0.8 NTU, "Water Quality: SAFE"). |

---

## 🏛️ System Architecture

```
[ Water Source / Pipe Sensor Array ]
  ├── Glass-Electrode pH Probe (SEN0161, 0-5V scaled to 0-3.3V)
  ├── Analog Turbidity Sensor (SEN0189, NTU)
  ├── Total Dissolved Solids (TDS) Probe (SEN0244, ppm)
  ├── Electrical Conductivity Probe (DFRobot DFR0300, µS/cm)
  └── Waterproof Temperature Sensor (DS18B20 1-Wire / MAX6675 SPI)
              │
              ▼
   [ 1. Edge Tier: ESP32-WROOM-32 & Arduino ]
         ├── Dual-Mode Intelligent Logging (Standard 5m ⇄ Fluctuation 30s)
         ├── Hardware EMA Noise Filter
         ├── TinyML Neural Network (TFLM C-Array)
         ├── 0.96" OLED I2C Display + Tri-Color Status LEDs (Good/Moderate/Poor)
         └── [ Local Safety Action: Isolated Relay ──▶ Block Solenoid/Pump ]
              │
              ▼ (JSON over HTTPS / WebSockets)
   [ 2. Backend Platform: FastAPI & SQLAlchemy ]
         ├── Ingestion Service & Data Quality Validator
         ├── Rolling Baseline Risk Engine (50-reading historical window)
         ├── Surrogate Model with SHAP Feature Explanations
         └── Multimodal Colorimetric Scanner (Gemini 1.5 Flash Vision)
              │
              ▼ (Realtime WebSockets)
   [ 3. Operator Mission Control: React + Vite + Tailwind ]
         ├── Live Telemetry Sparklines & Trajectory Forecasting
         ├── GIS Source Map & Device Fleet Management
         ├── SHAP Explainer Drawer & "What AI Sees" Panel
         ├── Field Test Kit (FTK) Camera Scanner
         └── Interactive Demo Simulation Injector
```

---

## 🧠 Core Engineering & Machine Learning Innovations

### 1. TinyML Neural Network Topology (On-Device Inference)
Deployed using TensorFlow Lite for Microcontrollers (TFLM) within the ESP32's 520KB SRAM:
- **Input Vector (4–5 features)**: `[Temperature, pH, TDS, Turbidity, Conductivity]`
- **Hidden Layers**: Two dense layers with ReLU activation:
  - Dense Layer 1: 20 neurons
  - Dense Layer 2: 10 neurons
- **Output Layer**: 3-neuron Softmax layer producing categorical contamination probabilities:
  1. `Normal (Safe)`: Baseline safe drinking water.
  2. `Rainwater Runoff`: Weather-induced turbidity/TDS elevation (non-toxic particulate load).
  3. `Chemical Contaminant`: Severe ionic and pH anomalies indicative of industrial effluents or heavy metals.

### 2. Intelligent Dual-Mode Logging Algorithm
Standard edge monitoring devices suffer rapid flash/SD card wear and high energy consumption by writing data at fixed high frequencies (86,400 write operations/day).  
AquaSafeAI implements a dynamic sampling algorithm:
- **Standard Mode**: Low-frequency logging (every 5 minutes) during baseline environmental stability.
- **Fluctuation-Based Mode**: Triggered automatically when sensor rate-of-change ($\Delta$) exceeds variance bounds, accelerating sampling to every 30 seconds during active contamination events.
- **Result**: Reduces write cycles and power consumption by >80% while capturing full temporal resolution during crises.

### 3. Explainable AI (XAI) with SHAP Attributions
Instead of an opaque 0–100 risk score, AquaSafeAI computes parameter-level attribution factors:
- **Low pH (< 6.5)**: $\rightarrow$ Flags risk of acidic leaching and heavy metal/arsenic mobilization.
- **High Turbidity (> 5.0 NTU)**: $\rightarrow$ Flags microbial/bacterial particulate carrying capacity.
- **High TDS (> 500 ppm)**: $\rightarrow$ Flags dissolved ion saturation and salinity intrusion.

### 4. Multimodal Colorimetric Field Test Kit Scanner (Gemini Vision)
In rural areas lacking in-line digital probes, operators use chemical Field Test Kits (FTKs).  
AquaSafeAI includes an AI vision scanner (`ColorimetryService`):
- Analyzes photos of test strips and water sample discoloration.
- Quantifies estimated **Arsenic ($\mu g/L$)**, **Fluorine ($mg/L$)**, and **Fecal Contamination Probability (0.0–1.0)**.
- Generates hydrogeological plain-language explanations for village operators.

### 5. Closed-Loop Hardware Interception
When contamination exceeds safety thresholds:
1. Backend or Edge TinyML issues an immediate `BLOCK_FLOW` command.
2. The microcontroller triggers GPIO 26 to actuate an opto-isolated relay.
3. The valve shuts or pump cuts power, preventing toxic water from reaching the distribution network.

---

## 🛠️ Complete Tech Stack

| Tier | Technologies |
|---|---|
| **Edge Hardware & Firmware** | ESP32-WROOM-32, Arduino Uno, C++, Arduino Core, TensorFlow Lite Micro, FreeRTOS |
| **Sensors & Actuators** | pH SEN0161, Turbidity SEN0189, TDS SEN0244, Conductivity DFR0300, DS18B20 Temp, 0.96" OLED I2C, 12V Solenoid Valve / Relay |
| **Backend Services** | Python 3.11+, FastAPI, SQLAlchemy, PostgreSQL / SQLite, WebSockets, Pydantic v2 |
| **Machine Learning** | TensorFlow/Keras, TFLite Converter, Scikit-Learn (Isolation Forest), SHAP |
| **Vision & AI** | Google Gemini 1.5 Flash (Field Test Kit colorimetry analysis) |
| **Frontend Dashboard** | React 18, TypeScript, Vite, Tailwind CSS, Recharts, Lucide React |
| **Cloud Synchronization** | Google Firebase Realtime Database |

---

## 📊 Visual Graphs & Asset Inventory

Visual assets cataloged in [`graphs/`](./graphs/), [`hardware/`](./hardware/), and [`screenshots/`](./screenshots/):
- `circuit_schematic_wiring.jpg`: Hardware wiring schematic & pinout specification for all 5 probes.
- `esp32_breadboard_lab_prototype.jpg`: Physical ESP32 laboratory breadboard with beaker probe testing.
- `field_enclosure_pipe_deployment.jpg`: Dual industrial manifold render (indoor faucet & outdoor water treatment).
- `aquasafe_wall_mounted_unit.jpg`: Field wall-mounted AquaSafe unit displaying real-time water safety status.
- `graph_dataset_classes.png`: 6,000-point 3-class distribution across pH and Turbidity feature space.
- `graph_dual_logging.png`: Waveform illustrating dynamic transition between Standard and Fluctuation modes.
- `graph_softmax_probs.png`: Softmax output trajectory shifting from Normal to Chemical Contamination over time.
- `graph_noise_reduction.png`: Exponential Moving Average (EMA) filtering raw analog sensor noise.
- `graph_isolation_forest.png`: Multi-dimensional anomaly scoring decision boundary.
- `graph_reconstruction_error.png`: Autoencoder reconstruction error during sudden water quality drift.
