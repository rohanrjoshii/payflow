# PayFlow

> A visual architecture explainer of India's big payment gateways

👉 [Live Demo](https://rohanrjoshii.github.io/payflow/)
---

> [!NOTE]
> What this project is: PayFlow is an interactive architecture showcase and visual explainer - and not a live payment processing gateway. This was done as an effort to explain how modern Indian payment gateways (inspired by JusPay) process 1B+ transactions daily with 99.999% availability by bridging the gap between a payment journey and distributed systems design.
---

## ⚡ What's what

1. Interactive hero simulator that lets you spawn a test payment and see the transaction packet make its journey across the Phone, PayFlow Switch, Issuing Bank, and Merchant in real time with millisecond level telemetry
2. How a payment actually travels guide (in jargon-free explanations) - a 5 step journey of what really happens in the ~1.8 seconds between tapping Pay and getting a receipt
3. The 4 pillars of the architecture:
1. SDK: Everything that powers 1-tap checkout, Presto's UI engine (which compiles JSX to declarative native views at 60fps) + deterministic state machines
2. Core: Everything that powers the business logic in PureScript, Haskell and monadic pipes (Validate >=> Enrich >=> Route >=> Settle). Zero runtime null crashes. Unified payment type class algebra.
3. Data Intelligence: ML based route scoring across success rate, latency, cost and load, streaming statistical anomaly detection and self healing traffic shifting
4. Infrastructure: Active-active India wide multi-region mesh, sub 50ms consensus across regions, edge TLS termination, Infrastructure DSL
---

## 🛠️ Actual implementation stack (How this site is built)

Nothing runs on a backend. This entire app runs in your browser. All the cool interactivity you see is powered by your device's JS engine. Below is the stack used for building this site itself.

| Layer | Tech | Details |
|---|---|---|
| Structure | Semantic HTML5 | Proper document outline and accessibility |
| Styling | Vanilla CSS3 | Custom Properties (CSS variables), CSS Grid, Flexbox, Keyframe animations |
| Logic | Vanilla JavaScript (ES6+) | Native ES modules (import/export), no npm packages |
| Routing | Client Side Hash Router | #/ sdk | backend etc |
| Visualizations | HTML5 Canvas API | Hardware accelerated streaming anomaly time series chart |
| Hosting | GitHub Pages | CDN over HTTPS |
---

## 🏛️ Conceptual tech stack (The things that we are explaining)

| Layer | Technologies | Description |
|---|---|---|
| Client SDK | Presto, React JSX, Mobile Secure Enclave | Compile JSX to 60fps native Android/iOS Android Views directly without bridges |
| Core Backend | PureScript, Haskell, Akka Actor Model | Express business logic as mathematical functions through monadic pipes (Validate >=> Enrich >=> Route >=> Settle). Compile-time null safety |
| Data Intelligence | Python, Scikit-learn, Streaming EWMA | Anomaly detection and traffic shifting across 4 factors (success rate, latency, cost, load) at sub 5 second resolution |
| Infrastructure | Multi-DC Mesh, Kubernetes, Envoy, Infra DSL | Active-active Pan-India topology (Mumbai, Chennai, Bangalore, Delhi) with <50ms consensus |
---

## 🚀 Running the app locally

Since this is a static site (no backend required) it can be run on any local static server. The code uses native ES modules. So you need a server that serves ES modules correctly (ExpressJS etc)

```bash
# Using npx
npx serve . -l 3000

# Using Python
python3 -m http.server 3000

# Using VS Code
# Right click index.html -> Open with Live Server
```
Then navigate to: http://localhost:3000
