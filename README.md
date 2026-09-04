# PayFlow — Large-Scale Payment Platform Architecture

An interactive architectural explainer of high-throughput Indian payment systems (inspired by production platforms like Juspay), showcasing how modern platforms process 1B+ transactions daily with five-nines (99.999%) availability.

---

## ⚡ Live Demo
Hosted directly on GitHub Pages with zero backend dependencies:
👉 **[Launch PayFlow Live](https://rohanrjoshii.github.io/payflow/)**

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

## 🏛️ The Architecture Being Explained (Conceptual Tech Stack)

The project walks through the real-world four-pillar architecture of India's payment rails:

### 1. Client SDK (Payment Experience)
- **Presto Framework**: Functional UI compiler turning declarative JSX into 60fps native Android & iOS views without JavaScript bridge overhead.
- **Client Security**: Hardware-backed KeyStore/Secure Enclave for local tokenization and biometric authentication.
- **Finite State Automaton**: Strict deterministic lifecycle (`IDLE` → `INITIATED` → `AUTHENTICATING` → `AUTHORIZED` → `CAPTURED` → `SETTLED`).

### 2. Core Backend (Business Logic & Orchestration)
- **Functional Programming**: PureScript / Haskell for mathematical correctness and zero runtime null errors.
- **Monadic Pipelines**: State transformations expressed as clean mathematical compositions (`validate >=> enrich >=> route >=> process >=> settle`).
- **Payment Algebra**: Unified typeclass interface abstracting 100+ gateways, card networks, and UPI providers into one polymorphic API.

### 3. Data Science & Telemetry (Intelligence Layer)
- **ML Route Scoring**: 4-factor real-time objective function balancing success rates, switch latencies, costs, and cluster loads.
- **Streaming Anomaly Detection**: Real-time time-series monitoring catching bank degradations in `< 5 seconds`.
- **Closed-Loop Self-Healing**: Automated traffic shunting away from failing gateways to healthy fallbacks with zero manual intervention.

### 4. Distributed Infrastructure (Five-Nines SLA)
- **Topology**: Active-Active multi-region mesh across Indian metros (Mumbai, Chennai, Bangalore, Delhi) with sub-50ms sync.
- **Edge PoPs**: Handshake & TLS termination at the edge, reducing P99 latency by 30%.
- **Infrastructure DSL**: Custom declarative language replacing boilerplate Kubernetes and Terraform across 5,000+ microservices.

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
