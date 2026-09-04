# PayFlow

> **A visual, interactive architectural explainer of large-scale payment platforms in India.**

👉 **Live Interactive Demo**: **[https://rohanrjoshii.github.io/payflow/](https://rohanrjoshii.github.io/payflow/)**

---

> [!NOTE]
> **What This Project Is**: PayFlow is an **interactive architecture showcase and visual explainer**—not a live payment processing gateway. It was built to communicate and visualize how modern Indian payment systems (inspired by platforms like Juspay) handle 1B+ transactions daily with 99.999% availability, bridging the gap between high-level payment journeys and deep distributed systems design.

---

## ⚡ What's Inside

1. **Interactive Hero Simulator**: Click to dispatch a test payment and watch the transaction packet travel in real time across the Phone, PayFlow Switch, Issuing Bank, and Merchant with millisecond latency telemetry.
2. **"How a Payment Actually Travels" (Plain-English Guide)**: A 5-step, jargon-free visual story explaining what really happens in the ~1.8 seconds between tapping "Pay" and receiving a receipt.
3. **The Four Architecture Deep-Dives**:
   - **Pillar 01 — Client SDK**: 1-click checkout, Presto UI engine (compiling declarative JSX directly to native views at 60fps), and deterministic state machines.
   - **Pillar 02 — Core Backend**: Pure functional programming (PureScript / Haskell), monadic pipelines (`Validate >=> Enrich >=> Route >=> Settle`), zero runtime null crashes, and a unified payment typeclass algebra.
   - **Pillar 03 — Data Intelligence**: ML route scoring across success rate, latency, cost, and load; streaming statistical anomaly detection; and automated self-healing traffic shunting.
   - **Pillar 04 — Infrastructure Platform**: Active-Active multi-region mesh across Indian metros, sub-50ms cross-region consensus, edge TLS termination, and a custom Infrastructure DSL.

---

## 🛠️ Actual Implementation Stack (How this site is built)

This project runs 100% in the client's browser with **zero backend server required**:

| Layer | Technology | Details |
|---|---|---|
| **Structure** | Semantic HTML5 | Clean document outline, accessibility attributes |
| **Styling** | Vanilla CSS3 | Custom Properties (CSS variables), CSS Grid, Flexbox, Keyframe animations |
| **Logic** | Vanilla JavaScript (ES6+) | Native ES Modules (`import`/`export`), zero npm runtime packages |
| **Routing** | Client-Side Hash Router | Hash-based SPA routing (`#/`, `#/sdk`, `#/backend`, etc.) |
| **Visualizations** | HTML5 Canvas API | Hardware-accelerated streaming anomaly time-series chart |
| **Hosting** | GitHub Pages | Free, static HTTPS delivery with global CDN |

---

## 🏛️ Conceptual Tech Stack (The Systems Being Explained)

| Layer | Technologies | What It Does |
|---|---|---|
| **Client SDK** | Presto UI, React JSX, Mobile Secure Enclave | Compiles declarative markup directly to 60fps native Android/iOS views without bridge overhead; hardware-backed tokenization. |
| **Core Backend** | PureScript, Haskell, Akka Actor Model | Mathematical business logic expressed as composable monadic pipelines with compile-time safety and zero null exceptions. |
| **Data Intelligence** | Python, Scikit-learn, Streaming EWMA | Dynamic 4-factor objective function scoring gateways in real-time; sub-5-second anomaly detection and autonomous rerouting. |
| **Infrastructure** | Multi-DC Mesh, Kubernetes, Envoy, Infra DSL | Active-active Pan-India topology (Mumbai, Chennai, Bangalore, Delhi) with sub-50ms sync and declarative GitOps management. |

---

## 🚀 Running Locally

Because this is a pure static web application using ES Modules, any local static file server will run it:

```bash
# Using npx (Node.js)
npx serve . -l 3000

# OR using Python
python3 -m http.server 3000

# OR using VS Code
# Right click index.html -> "Open with Live Server"
```
Then open `http://localhost:3000` in your browser.
