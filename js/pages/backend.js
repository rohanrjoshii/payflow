/**
 * PayFlow Backend Page — v2
 * FP pipeline visualizer, code comparison, API integration map
 */

import { PIPELINE_STAGES, INTEGRATIONS } from '../data/mock-data.js';

export function renderBackendPage(container) {
  let activeStage = -1;
  let pipelineInterval = null;

  container.innerHTML = `
    <!-- Backend Hero -->
    <section class="section bg-glow-top">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// pillar 02 — core backend</span>
          <h2>Functional Programming <span class="accent-word">at Scale</span></h2>
          <p>The largest functional programming codebase in Indian fintech — business logic expressed as pure, composable mathematical functions with compile-time safety guarantees.</p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Monadic Pipeline Visualizer -->
    <section class="section-sm">
      <div class="container">
        <div class="section-header animate-on-scroll" style="margin-bottom: var(--space-6);">
          <span class="section-label">// execution graph</span>
          <h3>Monadic Payment Pipeline</h3>
          <p style="font-size: var(--text-sm); color: var(--color-text-tertiary);">
            Every incoming transaction flows through an algebraic pipeline where each stage is a pure function transforming payment state.
          </p>
        </div>

        <div class="glass-card animate-on-scroll">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
            <div>
              <span class="badge badge-blue" id="pipelineStatus">IDLE / READY</span>
            </div>
            <button class="btn btn-primary btn-sm" id="btn-run-pipeline">
              Execute Pipeline →
            </button>
          </div>

          <div class="pipeline-stages" id="pipelineStages">
            ${PIPELINE_STAGES.map((stage, i) => `
              <div class="pipeline-stage" id="stage-${stage.id}" data-index="${i}">
                <span class="pipeline-stage-icon" style="font-family: var(--font-mono); font-size: 11px; font-weight: 700;">0${i+1}</span>
                <span class="pipeline-stage-name">${stage.name}</span>
              </div>
              ${i < PIPELINE_STAGES.length - 1 ? '<div class="pipeline-connector"></div>' : ''}
            `).join('')}
          </div>

          <!-- Stage detail panel -->
          <div id="stageDetail" style="margin-top: var(--space-6); padding: var(--space-4); background: rgba(0, 0, 0, 0.4); border-radius: var(--radius-sm); border: 1px solid var(--color-border); display: none;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h4 id="stageDetailName" style="font-size: var(--text-base); margin-bottom: var(--space-2); font-family: var(--font-display);"></h4>
                <p id="stageDetailDesc" style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-bottom: var(--space-3);"></p>
              </div>
              <span class="badge badge-blue" id="stageDetailTime">~50ms</span>
            </div>
            <div style="padding: var(--space-3); background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent);" id="stageDetailType"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Code Comparison -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// paradigm comparison</span>
          <h2>Imperative vs <span class="accent-word">Functional Logic</span></h2>
          <p>The same payment routing pipeline expressed imperatively vs purely functional. FP yields mathematically provable safety with zero null-pointer risks.</p>
        </div>

        <div class="code-comparison animate-on-scroll">
          <div>
            <div class="code-comparison-label" style="color: var(--color-text-tertiary); font-family: var(--font-mono);">
              JAVA 17 [IMPERATIVE / MUTABLE STATE]
            </div>
            <div class="code-block">
              <div class="code-block-header">
                <div class="code-block-dots">
                  <span class="code-block-dot red"></span>
                  <span class="code-block-dot yellow"></span>
                  <span class="code-block-dot green"></span>
                </div>
                <span class="code-block-title">PaymentRouter.java</span>
              </div>
              <div class="code-block-body">
<pre><span class="keyword">public</span> <span class="type">PaymentResult</span> <span class="function">processPayment</span>(
    <span class="type">PaymentRequest</span> request) {
  <span class="comment">// 1. Validation</span>
  <span class="keyword">if</span> (request.getAmount() &lt;= <span class="number">0</span>) {
    <span class="keyword">throw new</span> <span class="type">ValidationException</span>(<span class="string">"Invalid amount"</span>);
  }
  <span class="keyword">if</span> (request.getMerchant() == <span class="keyword">null</span>) {
    <span class="keyword">throw new</span> <span class="type">ValidationException</span>(<span class="string">"Missing merchant"</span>);
  }

  <span class="comment">// 2. Mutable state &amp; side effects</span>
  <span class="type">MerchantConfig</span> config = configService
    .<span class="function">getConfig</span>(request.getMerchant());
  <span class="type">RiskScore</span> risk = riskService
    .<span class="function">score</span>(request);

  <span class="comment">// 3. Imperative routing loop</span>
  <span class="type">Gateway</span> gateway = <span class="keyword">null</span>;
  <span class="keyword">for</span> (<span class="type">Gateway</span> g : gateways) {
    <span class="keyword">if</span> (g.supports(request.getMethod())
        &amp;&amp; g.getSuccessRate() &gt; <span class="number">0.9</span>) {
      gateway = g;
      <span class="keyword">break</span>;
    }
  }
  <span class="keyword">if</span> (gateway == <span class="keyword">null</span>) {
    <span class="keyword">throw new</span> <span class="type">RoutingException</span>(<span class="string">"No gateway available"</span>);
  }

  <span class="comment">// 4. Exception-driven control flow</span>
  <span class="keyword">try</span> {
    <span class="keyword">return</span> gateway.<span class="function">charge</span>(request);
  } <span class="keyword">catch</span> (<span class="type">Exception</span> e) {
    logger.<span class="function">error</span>(e);
    <span class="keyword">throw</span> e;
  }
}</pre>
              </div>
            </div>
          </div>

          <div>
            <div class="code-comparison-label" style="color: var(--color-accent); font-family: var(--font-mono);">
              PURESCRIPT [MONADIC / COMPILE-TIME SAFE]
            </div>
            <div class="code-block">
              <div class="code-block-header">
                <div class="code-block-dots">
                  <span class="code-block-dot red"></span>
                  <span class="code-block-dot yellow"></span>
                  <span class="code-block-dot green"></span>
                </div>
                <span class="code-block-title">PaymentRouter.purs</span>
              </div>
              <div class="code-block-body">
<pre><span class="function">processPayment</span>
  :: <span class="type">PaymentRequest</span>
  → <span class="type">ExceptT PaymentError</span>
      (<span class="type">ReaderT Config</span>
        (<span class="type">WriterT</span> [<span class="type">AuditLog</span>] <span class="type">IO</span>))
      <span class="type">PaymentResult</span>
<span class="function">processPayment</span> =
      <span class="function">validate</span>
  <span class="operator">&gt;=&gt;</span> <span class="function">enrich</span>
  <span class="operator">&gt;=&gt;</span> <span class="function">route</span>
  <span class="operator">&gt;=&gt;</span> <span class="function">process</span>
  <span class="operator">&gt;=&gt;</span> <span class="function">settle</span>

<span class="comment">-- Pure, deterministic composition.</span>
<span class="comment">-- Error states encoded in types, not runtime exceptions.</span>
<span class="comment">-- Zero possible NullPointerExceptions at compile time.</span>
<span class="comment">-- The type signature is the single source of truth.</span></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- FP Benefits -->
        <div class="grid grid-3 mt-8 animate-on-scroll">
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);">3×</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Code Conciseness</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-green);">0</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Runtime Null Crashes</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);">100%</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Type-Safe Contract Coverage</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- API Integrations -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// interface abstraction</span>
          <h2>Unified <span class="accent-word">Payment Algebra</span></h2>
          <p>A unified typeclass algebra abstracting 100+ gateways, banks, networks, and protocols into one polymorphic API.</p>
        </div>

        <div class="animate-on-scroll">
          <!-- Category tabs -->
          <div class="tabs mb-6" id="integrationTabs">
            <button class="tab active" data-cat="all">All</button>
            <button class="tab" data-cat="Card Network">Cards</button>
            <button class="tab" data-cat="UPI">UPI</button>
            <button class="tab" data-cat="Bank">Banks</button>
            <button class="tab" data-cat="Wallet">Wallets</button>
            <button class="tab" data-cat="BNPL">BNPL</button>
            <button class="tab" data-cat="Compliance">Compliance</button>
            <button class="tab" data-cat="Auth">Auth</button>
          </div>

          <div class="integration-map" id="integrationMap">
            ${INTEGRATIONS.map(i => `
              <div class="integration-node" data-cat="${i.category}">
                <div style="font-size: 10px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-bottom: 2px;">${i.category.toUpperCase()}</div>
                <div style="font-weight: 600; font-size: var(--text-sm);">${i.name}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Unified Algebra -->
        <div class="glass-card mt-8 animate-on-scroll">
          <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// typeclass specification</span>
          <h4 style="margin-bottom: var(--space-4);">Polymorphic Payment Typeclass</h4>
          <div class="code-block">
            <div class="code-block-header">
              <div class="code-block-dots">
                <span class="code-block-dot red"></span>
                <span class="code-block-dot yellow"></span>
                <span class="code-block-dot green"></span>
              </div>
              <span class="code-block-title">PaymentAlgebra.purs</span>
            </div>
            <div class="code-block-body">
<pre><span class="keyword">class</span> <span class="type">PaymentGateway</span> gateway <span class="keyword">where</span>
  <span class="function">authorize</span>   :: <span class="type">Payment</span> → gateway → <span class="type">IO AuthResult</span>
  <span class="function">capture</span>     :: <span class="type">AuthResult</span> → gateway → <span class="type">IO CaptureResult</span>
  <span class="function">refund</span>      :: <span class="type">CaptureResult</span> → <span class="type">Amount</span> → gateway → <span class="type">IO RefundResult</span>
  <span class="function">healthCheck</span> :: gateway → <span class="type">IO HealthStatus</span>

<span class="comment">-- Razorpay, NPCI UPI, HDFC PG, Axis, Stripe all conform identically</span>
<span class="keyword">instance</span> <span class="type">PaymentGateway Razorpay</span> <span class="keyword">where</span> ...
<span class="keyword">instance</span> <span class="type">PaymentGateway NPCI_UPI</span> <span class="keyword">where</span> ...
<span class="keyword">instance</span> <span class="type">PaymentGateway HDFC_PG</span>  <span class="keyword">where</span> ...</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Pipeline animation
  const runBtn = document.getElementById('btn-run-pipeline');
  const statusBadge = document.getElementById('pipelineStatus');
  const stageDetail = document.getElementById('stageDetail');
  const stageTimes = [45, 110, 75, 180, 50];

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (pipelineInterval) {
        clearInterval(pipelineInterval);
      }

      activeStage = -1;
      // Reset all stages
      PIPELINE_STAGES.forEach(s => {
        const el = document.getElementById(`stage-${s.id}`);
        if (el) el.className = 'pipeline-stage';
      });
      container.querySelectorAll('.pipeline-connector').forEach(c => c.classList.remove('active'));

      statusBadge.textContent = 'EXECUTING MONADIC CHAIN...';
      statusBadge.className = 'badge badge-orange';
      runBtn.disabled = true;

      pipelineInterval = setInterval(() => {
        activeStage++;

        if (activeStage >= PIPELINE_STAGES.length) {
          clearInterval(pipelineInterval);
          statusBadge.textContent = 'COMPLETED (200 OK)';
          statusBadge.className = 'badge badge-green';
          runBtn.disabled = false;
          return;
        }

        // Update stages
        PIPELINE_STAGES.forEach((s, i) => {
          const el = document.getElementById(`stage-${s.id}`);
          if (!el) return;
          el.className = 'pipeline-stage';
          if (i < activeStage) el.classList.add('completed');
          if (i === activeStage) el.classList.add('active');
        });

        // Update connectors
        const connectors = container.querySelectorAll('.pipeline-connector');
        connectors.forEach((c, i) => {
          c.classList.toggle('active', i < activeStage);
        });

        // Show stage detail
        const stage = PIPELINE_STAGES[activeStage];
        if (stageDetail) {
          stageDetail.style.display = 'block';
          document.getElementById('stageDetailName').textContent = `0${activeStage+1}. ${stage.name}`;
          document.getElementById('stageDetailDesc').textContent = stage.description;
          document.getElementById('stageDetailType').textContent = stage.fp;
          document.getElementById('stageDetailTime').textContent = `~${stageTimes[activeStage]}ms`;
        }
      }, 1200);
    });
  }

  // Integration tabs filtering
  const integrationTabs = container.querySelectorAll('#integrationTabs .tab');
  const integrationNodes = container.querySelectorAll('#integrationMap .integration-node');

  integrationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      integrationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      integrationNodes.forEach(node => {
        if (cat === 'all' || node.dataset.cat === cat) {
          node.style.display = '';
          node.style.animation = 'scaleIn 0.25s ease';
        } else {
          node.style.display = 'none';
        }
      });
    });
  });
}
