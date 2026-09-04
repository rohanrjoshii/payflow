/**
 * PayFlow Data Science Page — v2
 * Intelligent routing, anomaly detection, self-healing, payment assist
 */

import { GATEWAYS, ANOMALY_TYPES } from '../data/mock-data.js';
import { drawLineChart } from '../utils/animations.js';

export function renderDataSciencePage(container) {
  let routingInterval = null;
  let anomalyInterval = null;
  let healingStep = -1;

  container.innerHTML = `
    <!-- DS Hero -->
    <section class="section bg-glow-top">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// pillar 03 — data intelligence</span>
          <h2>Intelligence from <span class="accent-word">Billion Transactions</span></h2>
          <p>Real-time ML telemetry and reinforcement routing across India's banking rails — driving automated anomaly mitigation and self-healing operations.</p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Intelligent Routing -->
    <section class="section-sm">
      <div class="container">
        <div class="section-header animate-on-scroll" style="margin-bottom: var(--space-6);">
          <span class="section-label">// dynamic path optimization</span>
          <h3>Intelligent Traffic Routing</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
            The ML routing model continuously scores every bank gateway across four weighted dimensions to route every single transaction along its highest-probability success path.
          </p>
        </div>

        <div class="animate-on-scroll" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--space-6);">
          <!-- Gateway Grid -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
              <span class="section-label">// live gateway telemetry</span>
              <button class="btn btn-primary btn-sm" id="btn-route-txn">Route Transaction →</button>
            </div>
            <div class="gateway-grid" id="gatewayGrid" style="grid-template-columns: 1fr;">
              ${GATEWAYS.map(gw => `
                <div class="gateway-card" id="gw-${gw.id}" data-id="${gw.id}">
                  <div class="gateway-card-header">
                    <span class="gateway-card-name" style="font-family: var(--font-display);">${gw.name}</span>
                    <span class="status-dot ${gw.status} pulse"></span>
                  </div>
                  <div class="gateway-card-metric">
                    <span>Success Rate</span>
                    <span style="font-family: var(--font-mono); font-weight: 600; color: ${gw.successRate > 95 ? 'var(--color-green)' : gw.successRate > 92 ? 'var(--color-orange)' : 'var(--color-red)'};">${gw.successRate}%</span>
                  </div>
                  <div class="gateway-card-metric">
                    <span>P50 Latency</span>
                    <span style="font-family: var(--font-mono);">${gw.latency}ms</span>
                  </div>
                  <div class="gateway-card-metric">
                    <span>Switch Cost</span>
                    <span style="font-family: var(--font-mono);">₹${gw.cost}</span>
                  </div>
                  <div class="gateway-card-metric">
                    <span>Active Load</span>
                    <span style="font-family: var(--font-mono);">${gw.load}%</span>
                  </div>
                  <div class="progress-bar" style="margin-top: var(--space-2);">
                    <div class="progress-bar-fill" style="width: ${gw.load}%; background: ${gw.load > 30 ? 'var(--color-orange)' : 'var(--color-accent)'}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Routing Decision -->
          <div>
            <div class="glass-card" id="routingDecision">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// routing inference</span>
              <h4 style="margin-bottom: var(--space-4);">Real-Time ML Decision</h4>
              <div id="routingContent" style="color: var(--color-text-tertiary); font-size: var(--text-sm); font-family: var(--font-mono);">
                Awaiting transaction trigger. Click "Route Transaction →" to compute real-time gateway coefficients.
              </div>
            </div>

            <!-- Routing Algorithm -->
            <div class="glass-card mt-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// mathematical model</span>
              <h4 style="margin-bottom: var(--space-4);">Scoring Objective Function</h4>
              <div class="code-block">
                <div class="code-block-body">
<pre><span class="function">gatewayScore</span> :: <span class="type">Gateway</span> → <span class="type">Double</span>
<span class="function">gatewayScore</span> gw =
    <span class="number">0.40</span> <span class="operator">*</span> gw.successRate
  <span class="operator">+</span> <span class="number">0.25</span> <span class="operator">*</span> (<span class="number">1.0</span> <span class="operator">-</span> normalize gw.latency)
  <span class="operator">+</span> <span class="number">0.20</span> <span class="operator">*</span> (<span class="number">1.0</span> <span class="operator">-</span> normalize gw.cost)
  <span class="operator">+</span> <span class="number">0.15</span> <span class="operator">*</span> (<span class="number">1.0</span> <span class="operator">-</span> gw.currentLoad)

<span class="comment">-- Coefficients dynamically recalibrated</span>
<span class="comment">-- via gradient descent on rolling 30-day window</span></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Anomaly Detection -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// real-time telemetry</span>
          <h2>Statistical <span class="accent-word">Anomaly Detection</span></h2>
          <p>Streaming time-series models continuously audit TPS volume, latency spikes, and failure signatures within &lt;5 seconds.</p>
        </div>

        <div class="animate-on-scroll">
          <div class="anomaly-chart-container">
            <canvas class="anomaly-chart-canvas" id="anomalyChart"></canvas>
            <div class="anomaly-alert" id="anomalyAlert" style="font-family: var(--font-mono); font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.1em;">
              [ALERT] ANOMALY DETECTED // HIGH DROP-OFF RATE
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: var(--space-4); margin-top: var(--space-4);">
            <button class="btn btn-primary btn-sm" id="btn-start-anomaly">Start Monitoring Stream</button>
            <button class="btn btn-secondary btn-sm" id="btn-inject-anomaly">Simulate Injected Failure</button>
          </div>
        </div>

        <!-- Anomaly Types Table -->
        <div class="glass-card mt-8 animate-on-scroll">
          <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// detection heuristics</span>
          <h4 style="margin-bottom: var(--space-4);">Automated Response Matrix</h4>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm);">
              <thead>
                <tr style="border-bottom: 1px solid var(--color-border);">
                  <th style="text-align: left; padding: var(--space-3); color: var(--color-text-tertiary); font-weight: 600; font-size: var(--text-xs); font-family: var(--font-mono); letter-spacing: 0.05em;">ANOMALY TYPE</th>
                  <th style="text-align: left; padding: var(--space-3); color: var(--color-text-tertiary); font-weight: 600; font-size: var(--text-xs); font-family: var(--font-mono); letter-spacing: 0.05em;">SEVERITY</th>
                  <th style="text-align: left; padding: var(--space-3); color: var(--color-text-tertiary); font-weight: 600; font-size: var(--text-xs); font-family: var(--font-mono); letter-spacing: 0.05em;">TRIGGER THRESHOLD</th>
                  <th style="text-align: left; padding: var(--space-3); color: var(--color-text-tertiary); font-weight: 600; font-size: var(--text-xs); font-family: var(--font-mono); letter-spacing: 0.05em;">AUTONOMOUS ACTION</th>
                </tr>
              </thead>
              <tbody>
                ${ANOMALY_TYPES.map(a => `
                  <tr style="border-bottom: 1px solid var(--color-border);">
                    <td style="padding: var(--space-3); font-weight: 500;">${a.type}</td>
                    <td style="padding: var(--space-3);"><span class="badge badge-${a.severity === 'critical' ? 'red' : a.severity === 'warning' ? 'orange' : 'blue'}">${a.severity.toUpperCase()}</span></td>
                    <td style="padding: var(--space-3); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary);">${a.threshold}</td>
                    <td style="padding: var(--space-3); font-size: var(--text-xs); color: var(--color-text-tertiary); font-family: var(--font-mono);">${a.action}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Self-Healing -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// closed-loop automation</span>
          <h2>Autonomous <span class="accent-word">Self-Healing</span></h2>
          <p>When an upstream banking rail degrades, the control plane orchestrates zero-touch rerouting within seconds.</p>
        </div>

        <div class="animate-on-scroll" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8);">
          <!-- Timeline -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
              <span class="section-label">// incident resolution lifecycle</span>
              <button class="btn btn-primary btn-sm" id="btn-start-healing">Simulate Failure Cascade →</button>
            </div>
            <div class="healing-timeline" id="healingTimeline">
              <div class="healing-step" id="heal-0">
                <span class="healing-step-time">T+0s</span>
                <span class="healing-step-dot"></span>
                <div class="healing-step-content">
                  <h4 style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-red);">[CRITICAL] Gateway Degradation Detected</h4>
                  <p>Razorpay success rate falls to 45% (SLA baseline: &gt;90%)</p>
                </div>
              </div>
              <div class="healing-step" id="heal-1">
                <span class="healing-step-time">T+2s</span>
                <span class="healing-step-dot"></span>
                <div class="healing-step-content">
                  <h4 style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-accent);">[TRIAGE] ML Classification</h4>
                  <p>Isolated systemic bank outage confirmed. Confidence metric: 97.4%</p>
                </div>
              </div>
              <div class="healing-step" id="heal-2">
                <span class="healing-step-time">T+3s</span>
                <span class="healing-step-dot"></span>
                <div class="healing-step-content">
                  <h4 style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-orange);">[EXECUTE] Traffic Shunting</h4>
                  <p>100% active traffic shifted to Paytm PG (97.2%) + PayU (95.2%)</p>
                </div>
              </div>
              <div class="healing-step" id="heal-3">
                <span class="healing-step-time">T+5s</span>
                <span class="healing-step-dot"></span>
                <div class="healing-step-content">
                  <h4 style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-green);">[RESTORED] Baseline Normalized</h4>
                  <p>Platform success rate restored to 96.8%. Telemetry alert dispatched.</p>
                </div>
              </div>
              <div class="healing-step" id="heal-4">
                <span class="healing-step-time">T+30m</span>
                <span class="healing-step-dot"></span>
                <div class="healing-step-content">
                  <h4 style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-green);">[RECOVERY] Canary Health Probe</h4>
                  <p>Health checks pass. Gradual canary reinjection: 10% → 50% → 100%.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Impact metrics -->
          <div>
            <div class="glass-card mb-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// sla preservation</span>
              <h4 style="margin-bottom: var(--space-4);">Self-Healing Impact</h4>
              <div class="metric-row">
                <span class="metric-row-label">Time to Detect (TTD)</span>
                <span class="metric-row-value" style="color: var(--color-green);">&lt; 5 seconds</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Autonomous Failover</span>
                <span class="metric-row-value" style="color: var(--color-green);">&lt; 3 seconds</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Transactions Preserved</span>
                <span class="metric-row-value" style="color: var(--color-accent);">~50,000 / incident</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Manual Ops Reduction</span>
                <span class="metric-row-value" style="color: var(--color-text-white);">80%</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">MTTR (Historical vs Self-Healed)</span>
                <span class="metric-row-value" style="color: var(--color-green);">30 min → 5 sec</span>
              </div>
            </div>

            <!-- Payment Assist -->
            <div class="glass-card">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// client recommendation</span>
              <h4 style="margin-bottom: var(--space-3);">Intelligent Payment Assist</h4>
              <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-bottom: var(--space-4);">
                Context-aware ML engine recommends optimal payment instruments per customer based on historical bank uptime and transaction size.
              </p>
              <div style="padding: var(--space-4); background: rgba(0, 240, 255, 0.03); border-radius: var(--radius-sm); border: 1px solid rgba(0, 240, 255, 0.15);">
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-accent); margin-bottom: var(--space-1);">OPTIMAL RECOMMENDATION</div>
                <div style="font-size: var(--text-sm); font-weight: 600; color: var(--color-text-white);">UPI Intent via Google Pay</div>
                <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-top: var(--space-1); font-family: var(--font-mono);">
                  Confidence 98.2% for user bank (SBI) during evening peak volume
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Key Stats -->
    <section class="section-sm">
      <div class="container">
        <div class="grid grid-4 animate-on-scroll">
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);">10,000+</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">TPS Monitored</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-green);">+3.8%</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">Net Success Boost</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);">&lt; 5s</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">Anomaly TTD</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);">80%</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">Zero-Touch Ops</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Routing simulation
  const routeBtn = document.getElementById('btn-route-txn');
  const routingContent = document.getElementById('routingContent');

  if (routeBtn) {
    routeBtn.addEventListener('click', () => {
      // Clear previous selection
      container.querySelectorAll('.gateway-card').forEach(c => c.classList.remove('selected'));

      // Score each gateway
      const scored = GATEWAYS.map(gw => {
        const normLatency = gw.latency / 100;
        const normCost = gw.cost / 3;
        const score = (0.4 * (gw.successRate / 100)) + (0.25 * (1 - normLatency)) + (0.20 * (1 - normCost)) + (0.15 * (1 - gw.load / 100));
        return { ...gw, score: score.toFixed(4) };
      }).sort((a, b) => b.score - a.score);

      // Animate selection — highlight each one briefly
      let idx = 0;
      const scanInterval = setInterval(() => {
        container.querySelectorAll('.gateway-card').forEach(c => c.classList.remove('selected'));
        const gwEl = document.getElementById(`gw-${scored[idx].id}`);
        if (gwEl) gwEl.classList.add('selected');
        idx++;

        if (idx >= scored.length) {
          clearInterval(scanInterval);
          // Final selection
          setTimeout(() => {
            container.querySelectorAll('.gateway-card').forEach(c => c.classList.remove('selected'));
            const winner = scored[0];
            const winEl = document.getElementById(`gw-${winner.id}`);
            if (winEl) winEl.classList.add('selected');

            routingContent.innerHTML = `
              <div style="margin-bottom: var(--space-4);">
                <span class="badge badge-green">[SELECTED ROUTE: 200 OK]</span>
              </div>
              <div style="font-size: var(--text-base); font-weight: 700; color: var(--color-text-primary); margin-bottom: var(--space-3); font-family: var(--font-display);">
                ${winner.name} (Score: ${winner.score})
              </div>
              <div style="display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-xs); font-family: var(--font-mono);">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--color-text-tertiary);">Success Coefficient:</span>
                  <span style="color: var(--color-green);">${winner.successRate}%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--color-text-tertiary);">P50 Latency Metric:</span>
                  <span>${winner.latency}ms</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--color-text-tertiary);">Transaction Cost:</span>
                  <span>₹${winner.cost}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--color-text-tertiary);">Cluster Utilization:</span>
                  <span>${winner.load}%</span>
                </div>
              </div>
              <div style="margin-top: var(--space-4); padding: var(--space-2) var(--space-3); background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: var(--radius-sm); font-size: 11px; color: var(--color-green);">
                Optimal score selected in 1.4ms runtime.
              </div>
            `;
          }, 300);
        }
      }, 300);
    });
  }

  // Anomaly detection chart
  const canvas = document.getElementById('anomalyChart');
  const alertEl = document.getElementById('anomalyAlert');
  const startBtn = document.getElementById('btn-start-anomaly');
  const injectBtn = document.getElementById('btn-inject-anomaly');

  let chartPoints = [];
  const maxPoints = 50;
  let isMonitoring = false;
  let baseSuccess = 96.5;

  // Initialize data
  for (let i = 0; i < maxPoints; i++) {
    chartPoints.push(baseSuccess + (Math.random() - 0.5) * 2);
  }

  function renderChart() {
    if (!canvas) return;
    drawLineChart(canvas, chartPoints, {
      color: '#00f0ff',
      alertColor: '#ef4444',
      alertThreshold: 90,
    });
  }

  renderChart();

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (isMonitoring) {
        clearInterval(anomalyInterval);
        isMonitoring = false;
        startBtn.textContent = 'Start Monitoring Stream';
        if (alertEl) alertEl.classList.remove('show');
        return;
      }

      isMonitoring = true;
      startBtn.textContent = 'Stop Monitoring Stream';

      anomalyInterval = setInterval(() => {
        chartPoints.shift();
        const noise = (Math.random() - 0.48) * 1.5;
        const newPoint = Math.min(99.5, Math.max(70, chartPoints[chartPoints.length - 1] + noise));
        chartPoints.push(newPoint);
        renderChart();

        if (newPoint < 90 && alertEl) {
          alertEl.classList.add('show');
        } else if (alertEl) {
          alertEl.classList.remove('show');
        }
      }, 500);
    });
  }

  if (injectBtn) {
    injectBtn.addEventListener('click', () => {
      // Drop the success rate
      for (let i = 0; i < 8; i++) {
        chartPoints[chartPoints.length - 1 - i] = 72 + Math.random() * 8;
      }
      renderChart();
      if (alertEl) alertEl.classList.add('show');

      // Auto-recover after 4 seconds
      setTimeout(() => {
        for (let i = 0; i < maxPoints; i++) {
          chartPoints[i] = baseSuccess + (Math.random() - 0.5) * 2;
        }
        renderChart();
        if (alertEl) alertEl.classList.remove('show');
      }, 4000);
    });
  }

  // Self-healing simulation
  const healBtn = document.getElementById('btn-start-healing');
  if (healBtn) {
    healBtn.addEventListener('click', () => {
      healingStep = -1;
      healBtn.disabled = true;

      // Reset
      for (let i = 0; i < 5; i++) {
        const step = document.getElementById(`heal-${i}`);
        if (step) step.className = 'healing-step';
      }

      const healInterval = setInterval(() => {
        healingStep++;

        if (healingStep >= 5) {
          clearInterval(healInterval);
          healBtn.disabled = false;
          return;
        }

        for (let i = 0; i < 5; i++) {
          const step = document.getElementById(`heal-${i}`);
          if (!step) continue;
          step.className = 'healing-step';
          if (i < healingStep) step.classList.add('completed');
          if (i === healingStep) step.classList.add('active');
        }
      }, 1200);
    });
  }
}
