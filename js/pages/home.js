/**
 * PayFlow Home Page — Disciplined v3
 * Near-black, single electric cyan accent, live payment transit hero, 5-step human story
 */

import { createScrollCounter } from '../utils/animations.js';

export function renderHomePage(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero" style="padding-top: var(--space-12); padding-bottom: var(--space-12);">
      <div class="container">
        <div class="hero-grid">
          <!-- Left: Editorial Headline -->
          <div class="hero-content">
            <div class="hero-label">// payment systems architecture</div>

            <h1 style="font-size: clamp(2.5rem, 5vw, 4.2rem); line-height: 1.0; margin-bottom: var(--space-6);">
              Powering<br>
              <span class="accent-word">India's Payments</span><br>
              at Scale.
            </h1>

            <p class="hero-description" style="margin-bottom: var(--space-8); font-size: var(--text-base);">
              An interactive breakdown of how large-scale payment platforms orchestrate a billion+ daily transactions 
              with five-nines uptime — from the client SDK to multi-region data centers.
            </p>

            <div class="hero-actions">
              <a href="#how-it-works" class="btn btn-primary btn-lg" id="btn-how-it-works">
                How Payments Travel ↓
              </a>
              <a href="#/sdk" class="btn btn-secondary btn-lg" id="btn-explore">
                Explore Architecture →
              </a>
            </div>
          </div>

          <!-- Right: Live Payment Transit Visualizer (Interactive Hero Idea) -->
          <div class="transit-simulator animate-on-scroll">
            <div class="transit-header">
              <div>
                <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-accent); font-weight: 700;">// LIVE TRANSIT ENGINE</span>
                <div style="font-size: var(--text-sm); font-weight: 600; color: var(--color-text-white); margin-top: 2px;">Test Payment Dispatcher</div>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-hero-pay">
                ⚡ Send ₹500
              </button>
            </div>

            <!-- Transit Nodes -->
            <div class="transit-nodes" id="transitNodes">
              <!-- Node 1 -->
              <div class="transit-node" id="tn-phone">
                <div class="transit-node-icon">01</div>
                <div style="flex: 1;">
                  <div style="font-size: var(--text-xs); font-weight: 600; color: var(--color-text-white);">Customer Phone</div>
                  <div style="font-size: 11px; color: var(--color-text-tertiary);">Tokenized biometric handshake</div>
                </div>
                <span class="badge" id="tn-badge-phone" style="font-size: 10px;">READY</span>
              </div>

              <div class="transit-line" id="tl-1"></div>

              <!-- Node 2 -->
              <div class="transit-node" id="tn-switch">
                <div class="transit-node-icon">02</div>
                <div style="flex: 1;">
                  <div style="font-size: var(--text-xs); font-weight: 600; color: var(--color-text-white);">PayFlow Core Switch</div>
                  <div style="font-size: 11px; color: var(--color-text-tertiary);">Signature validation & ML routing</div>
                </div>
                <span class="badge" id="tn-badge-switch" style="font-size: 10px;">STANDBY</span>
              </div>

              <div class="transit-line" id="tl-2"></div>

              <!-- Node 3 -->
              <div class="transit-node" id="tn-bank">
                <div class="transit-node-icon">03</div>
                <div style="flex: 1;">
                  <div style="font-size: var(--text-xs); font-weight: 600; color: var(--color-text-white);">Issuing Bank / NPCI CBS</div>
                  <div style="font-size: 11px; color: var(--color-text-tertiary);">Core banking debit authorization</div>
                </div>
                <span class="badge" id="tn-badge-bank" style="font-size: 10px;">STANDBY</span>
              </div>

              <div class="transit-line" id="tl-3"></div>

              <!-- Node 4 -->
              <div class="transit-node" id="tn-merchant">
                <div class="transit-node-icon">04</div>
                <div style="flex: 1;">
                  <div style="font-size: var(--text-xs); font-weight: 600; color: var(--color-text-white);">Merchant (FlipShop)</div>
                  <div style="font-size: 11px; color: var(--color-text-tertiary);">Instant settlement & order fulfillment</div>
                </div>
                <span class="badge" id="tn-badge-merchant" style="font-size: 10px;">STANDBY</span>
              </div>
            </div>

            <!-- Terminal Log Window -->
            <div class="transit-console" id="transitConsole">
              <span id="transitLogText">Click "⚡ Send ₹500" to simulate a real payment trip across nodes.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Stats Bar -->
    <section class="section-sm">
      <div class="container">
        <div class="home-stats animate-on-scroll">
          <div class="stat-card">
            <div class="stat-value" id="stat-txns">0</div>
            <div class="stat-label">daily transactions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="stat-uptime">0</div>
            <div class="stat-label">uptime SLA</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="stat-integrations">0</div>
            <div class="stat-label">banking integrations</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="stat-latency">0</div>
            <div class="stat-label">p50 switch latency</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- NON-TECH SECTION: How a Payment Actually Travels -->
    <section class="section" id="how-it-works">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// plain english explainer</span>
          <h2>How a Payment <span class="accent-word">Actually Travels</span></h2>
          <p>No monads, no distributed systems jargon. Here is what really happens in the ~2 seconds between you tapping "Pay" and your order being confirmed.</p>
        </div>

        <div class="story-grid animate-on-scroll" id="storyGrid">
          <!-- Step 1 -->
          <div class="story-card active" data-step="0">
            <div class="story-card-number">STEP 01</div>
            <h4>You Tap "Pay"</h4>
            <p>You’re buying coffee on FlipShop. You tap pay. Your phone locks your card or UPI handle in a digital safe and creates a one-time cryptographic token so your real details are never exposed.</p>
            <span class="story-card-badge">Elapsed: ~0ms</span>
          </div>

          <!-- Step 2 -->
          <div class="story-card" data-step="1">
            <div class="story-card-number">STEP 02</div>
            <h4>Phone Calls PayFlow</h4>
            <p>Your phone doesn't talk directly to a bank. In under 50ms, it reaches PayFlow's edge server. We check that nobody tampered with the amount and find the fastest bank route open right now.</p>
            <span class="story-card-badge">Elapsed: ~50ms</span>
          </div>

          <!-- Step 3 -->
          <div class="story-card" data-step="2">
            <div class="story-card-number">STEP 03</div>
            <h4>Checking with Your Bank</h4>
            <p>We knock on your bank's server (HDFC, SBI, or ICICI): <em>"Does this customer have ₹500, and did their fingerprint / UPI PIN match?"</em> The bank checks your ledger balance.</p>
            <span class="story-card-badge">Elapsed: ~800ms</span>
          </div>

          <!-- Step 4 -->
          <div class="story-card" data-step="3">
            <div class="story-card-number">STEP 04</div>
            <h4>The Green Light</h4>
            <p>Your bank approves! They place a hold on the ₹500 so you can't double-spend it. A signed digital receipt flies back across the banking network in under half a second.</p>
            <span class="story-card-badge">Elapsed: ~1.4s</span>
          </div>

          <!-- Step 5 -->
          <div class="story-card" data-step="4">
            <div class="story-card-number">STEP 05</div>
            <h4>Order Confirmed</h4>
            <p>The merchant gets instant proof of payment, your screen turns green with a checkmark, and your coffee order is confirmed. Total time taken: ~1.8 seconds.</p>
            <span class="story-card-badge">Status: Complete ✓</span>
          </div>
        </div>

        <!-- Interactive Story Detail Callout -->
        <div class="glass-card mt-8 animate-on-scroll" id="storyDetailBox" style="border-left: 2px solid var(--color-accent);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
            <span id="storyDetailTitle" style="font-family: var(--font-display); font-size: var(--text-base); font-weight: 700; color: var(--color-text-white);">
              Interactive Story: Click any step above to inspect its real-world mechanics
            </span>
            <span id="storyDetailMetric" style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent);">
              STEP 1 OF 5
            </span>
          </div>
          <p id="storyDetailText" style="font-size: var(--text-sm); color: var(--color-text-secondary); margin: 0;">
            Every single time you buy something online in India, this 5-hop choreography happens before you can even blink.
          </p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- The 4 Technical Pillars -->
    <section class="section" id="pillars-section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// technical architecture</span>
          <h2>The Four Pillars</h2>
          <p>The deep engineering behind keeping this 2-second payment journey reliable for 100M+ users daily.</p>
        </div>

        <div class="grid grid-2 animate-on-scroll">
          <a href="#/sdk" class="pillar-card" id="pillar-sdk">
            <span class="pillar-number">01</span>
            <span class="pillar-card-tag sdk">PILLAR 01 // CLIENT SDK</span>
            <h3>Frictionless Payments</h3>
            <p>Native mobile payment sheet with 1-click checkout. Declarative React markup compiled directly into 60fps Android & iOS views via the Presto engine.</p>
            <ul class="pillar-card-features">
              <li>1-Click Checkout Flow (&lt; 2.0s)</li>
              <li>Presto JSX → Native View Compiler</li>
              <li>Deterministic Finite State Machine</li>
              <li>Zero Bridge Thread Bottlenecks</li>
            </ul>
          </a>

          <a href="#/backend" class="pillar-card" id="pillar-backend">
            <span class="pillar-number">02</span>
            <span class="pillar-card-tag backend">PILLAR 02 // BACKEND ORCHESTRATION</span>
            <h3>Functional Programming</h3>
            <p>India's largest functional codebase in payments. Business logic expressed as composable, monadic pipelines with mathematical safety guarantees.</p>
            <ul class="pillar-card-features">
              <li>Monadic Pipeline: Validate → Enrich → Route → Settle</li>
              <li>Zero Runtime Null Crashes</li>
              <li>Polymorphic Payment Typeclass Algebra</li>
              <li>100+ Gateway & Bank Integrations</li>
            </ul>
          </a>

          <a href="#/datascience" class="pillar-card" id="pillar-ds">
            <span class="pillar-number">03</span>
            <span class="pillar-card-tag datascience">PILLAR 03 // INTELLIGENCE</span>
            <h3>Automated Operations</h3>
            <p>Machine learning models evaluating bank success rates, switch latencies, and transaction costs in real-time to pick the optimal payment route.</p>
            <ul class="pillar-card-features">
              <li>Dynamic Weighted ML Route Scoring</li>
              <li>Streaming Anomaly Detection (&lt; 5s TTD)</li>
              <li>Autonomous Self-Healing Traffic Shunting</li>
              <li>Predictive Payment Instrument Assist</li>
            </ul>
          </a>

          <a href="#/infrastructure" class="pillar-card" id="pillar-infra">
            <span class="pillar-number">04</span>
            <span class="pillar-card-tag infrastructure">PILLAR 04 // PLATFORM</span>
            <h3>Five-Nines Infrastructure</h3>
            <p>Mission-critical active-active multi-region mesh across Indian metros. Sub-50ms cross-DC synchronization and custom declarative Infra DSL.</p>
            <ul class="pillar-card-features">
              <li>99.999% Availability SLA (&lt; 5m downtime/year)</li>
              <li>Active-Active Multi-Region Pan-India Mesh</li>
              <li>Custom Infrastructure DSL for 5,000+ Services</li>
              <li>100,000 TPS Engineered Platform Ceiling</li>
            </ul>
          </a>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Minimal Tech Stack -->
    <section class="section-sm">
      <div class="container">
        <div class="section-header centered animate-on-scroll">
          <span class="section-label">// stack</span>
          <h2>Platform Technologies</h2>
        </div>

        <div class="tech-stack animate-on-scroll" style="justify-content: center;">
          <div class="tech-pill">PureScript</div>
          <div class="tech-pill">Haskell</div>
          <div class="tech-pill">React</div>
          <div class="tech-pill">Presto UI</div>
          <div class="tech-pill">Python ML</div>
          <div class="tech-pill">Kubernetes</div>
          <div class="tech-pill">Envoy Mesh</div>
          <div class="tech-pill">Kafka</div>
          <div class="tech-pill">PostgreSQL</div>
          <div class="tech-pill">Redis</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">
            PayFlow — Architectural explainer of high-throughput Indian payment systems.
          </p>
          <div class="footer-links">
            <a href="#/" class="footer-link">Home</a>
            <a href="#/sdk" class="footer-link">SDK</a>
            <a href="#/backend" class="footer-link">Backend</a>
            <a href="#/datascience" class="footer-link">Data Science</a>
            <a href="#/infrastructure" class="footer-link">Infrastructure</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Hero Live Payment Simulator Logic
  const payBtn = document.getElementById('btn-hero-pay');
  const consoleEl = document.getElementById('transitLogText');
  let isSimulating = false;

  const steps = [
    {
      nodeId: 'tn-phone',
      lineId: 'tl-1',
      badgeId: 'tn-badge-phone',
      log: '[T+042ms] Customer phone creates secure tokenized intent → Handshake initiated.'
    },
    {
      nodeId: 'tn-switch',
      lineId: 'tl-2',
      badgeId: 'tn-badge-switch',
      log: '[T+120ms] PayFlow Core Switch validates signature and evaluates optimal bank route.'
    },
    {
      nodeId: 'tn-bank',
      lineId: 'tl-3',
      badgeId: 'tn-badge-bank',
      log: '[T+240ms] HDFC Core Banking verifies balance & approves cryptographic debit hold.'
    },
    {
      nodeId: 'tn-merchant',
      lineId: null,
      badgeId: 'tn-badge-merchant',
      log: '[T+282ms] FlipShop receives instant 200 OK settlement confirmation. Complete ✓'
    }
  ];

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      payBtn.disabled = true;
      payBtn.textContent = 'Sending...';

      // Reset nodes
      steps.forEach(s => {
        const node = document.getElementById(s.nodeId);
        if (node) node.className = 'transit-node';
        if (s.lineId) {
          const line = document.getElementById(s.lineId);
          if (line) line.className = 'transit-line';
        }
        const badge = document.getElementById(s.badgeId);
        if (badge) {
          badge.textContent = 'WAITING';
          badge.className = 'badge';
        }
      });

      let currentStep = 0;

      function runNextStep() {
        if (currentStep < steps.length) {
          const s = steps[currentStep];
          const node = document.getElementById(s.nodeId);
          if (node) node.className = 'transit-node active';

          const badge = document.getElementById(s.badgeId);
          if (badge) {
            badge.textContent = 'PROCESSING';
            badge.className = 'badge badge-blue';
          }

          if (consoleEl) {
            consoleEl.textContent = s.log;
          }

          setTimeout(() => {
            if (node) node.className = 'transit-node completed';
            if (badge) {
              badge.textContent = 'DONE ✓';
              badge.className = 'badge badge-green';
            }
            if (s.lineId) {
              const line = document.getElementById(s.lineId);
              if (line) line.className = 'transit-line active';
            }

            currentStep++;
            if (currentStep < steps.length) {
              setTimeout(runNextStep, 250);
            } else {
              // Finished
              setTimeout(() => {
                if (consoleEl) {
                  consoleEl.innerHTML = '<span style="color: var(--color-green);">[ROUNDTRIP: 282ms] Transaction settled successfully. FlipShop balance +₹500.00</span>';
                }
                payBtn.disabled = false;
                payBtn.textContent = '⚡ Send Again';
                isSimulating = false;
              }, 300);
            }
          }, 350);
        }
      }

      runNextStep();
    });
  }

  // Interactive Story Cards Logic (Click/Hover)
  const storyCards = container.querySelectorAll('.story-card');
  const storyDetailTitle = document.getElementById('storyDetailTitle');
  const storyDetailText = document.getElementById('storyDetailText');
  const storyDetailMetric = document.getElementById('storyDetailMetric');

  const storyDetails = [
    {
      title: 'Step 1 Mechanics: Tokenization in Local Secure Enclave',
      text: 'Instead of transmitting your raw 16-digit card number or UPI MPIN over the open web, your phone’s operating system creates an encrypted, single-use token valid only for this merchant and this exact transaction amount.',
      metric: 'STEP 1 OF 5 // CLIENT SECURITY'
    },
    {
      title: 'Step 2 Mechanics: Dynamic Network Switch Routing',
      text: 'PayFlow terminates the secure TLS connection at edge PoPs in Mumbai or Delhi. Rather than sending requests blindly, an ML model checks which banking network has the lowest latency right now.',
      metric: 'STEP 2 OF 5 // 50MS SWITCH DISPATCH'
    },
    {
      title: 'Step 3 Mechanics: Core Banking System (CBS) Query',
      text: 'The payment switch opens a direct socket connection to the NPCI switch or your bank’s server to verify identity credentials and reserve the funds so they cannot be spent twice.',
      metric: 'STEP 3 OF 5 // BANK HOLD'
    },
    {
      title: 'Step 4 Mechanics: Signed Cryptographic Confirmation',
      text: 'The bank signs an authorization payload. If the bank is slow or drops the connection, PayFlow’s self-healing circuit breakers automatically retry without charging your account twice.',
      metric: 'STEP 4 OF 5 // IDEMPOTENT SIGNATURE'
    },
    {
      title: 'Step 5 Mechanics: Merchant Settlement & Fulfillment',
      text: 'FlipShop’s server receives a signed webhook callback confirming the funds are secured. The checkout screen shows green instantly, while batch financial settlement finishes overnight.',
      metric: 'STEP 5 OF 5 // SETTLED IN ~1.8S'
    }
  ];

  storyCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      storyCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const detail = storyDetails[index];
      if (detail && storyDetailTitle && storyDetailText && storyDetailMetric) {
        storyDetailTitle.textContent = detail.title;
        storyDetailText.textContent = detail.text;
        storyDetailMetric.textContent = detail.metric;
      }
    });
  });

  // Animated stat counters
  setTimeout(() => {
    const statTxns = document.getElementById('stat-txns');
    const statUptime = document.getElementById('stat-uptime');
    const statIntegrations = document.getElementById('stat-integrations');
    const statLatency = document.getElementById('stat-latency');

    if (statTxns) createScrollCounter(statTxns, 1.2, 'B+');
    if (statUptime) createScrollCounter(statUptime, 99.999, '%');
    if (statIntegrations) createScrollCounter(statIntegrations, 100, '+');
    if (statLatency) createScrollCounter(statLatency, 12, 'ms', '<');
  }, 100);
}
