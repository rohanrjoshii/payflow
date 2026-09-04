/**
 * PayFlow SDK Page — v2
 * Interactive payment demo, state machine visualization, Presto framework explainer
 */

export function renderSDKPage(container) {
  let currentState = 0;
  const states = ['IDLE', 'INITIATED', 'AUTHENTICATING', 'AUTHORIZED', 'CAPTURED', 'SETTLED'];
  let stateInterval = null;
  let activeMethod = 'upi';

  container.innerHTML = `
    <!-- SDK Hero -->
    <section class="section bg-glow-top">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// pillar 01 — client sdk</span>
          <h2>Frictionless <span class="accent-word">1-Click Payments</span></h2>
          <p>Building UI/UX experiences that enable frictionless user payments and enable merchants to manage payment options seamlessly.</p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Interactive Payment Demo -->
    <section class="section-sm">
      <div class="container">
        <div class="section-header animate-on-scroll" style="margin-bottom: var(--space-6);">
          <span class="section-label">// interactive checkout simulation</span>
          <h3>Native Payment Sheet</h3>
        </div>

        <div class="payment-demo-container animate-on-scroll">
          <!-- Phone Mockup -->
          <div>
            <div class="phone-mockup">
              <div class="phone-notch"></div>
              <div class="phone-screen">
                <div style="text-align: center; margin-bottom: var(--space-4);">
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--font-mono);">Amount Payable</div>
                  <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white); margin-top: var(--space-1);">₹2,499</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-secondary); margin-top: 2px;">Merchant: FlipShop Express</div>
                </div>

                <hr class="divider" style="margin: var(--space-3) 0;">

                <!-- Payment Method Tabs -->
                <div class="payment-methods" id="paymentMethods">
                  <button class="payment-method active" data-method="upi" id="method-upi">
                    <div class="payment-method-icon" style="font-family: var(--font-mono); font-size: 11px; font-weight: 700;">UPI</div>
                    <div>Instant</div>
                  </button>
                  <button class="payment-method" data-method="card" id="method-card">
                    <div class="payment-method-icon" style="font-family: var(--font-mono); font-size: 11px; font-weight: 700;">CARD</div>
                    <div>Credit/Debit</div>
                  </button>
                  <button class="payment-method" data-method="wallet" id="method-wallet">
                    <div class="payment-method-icon" style="font-family: var(--font-mono); font-size: 11px; font-weight: 700;">WAL</div>
                    <div>Balance</div>
                  </button>
                </div>

                <!-- UPI Form -->
                <div class="payment-form mt-6" id="form-upi">
                  <div class="form-group">
                    <label class="form-label">Virtual Payment Address (VPA)</label>
                    <input type="text" class="form-input" placeholder="yourname@upi" value="user@oksbi" id="upi-input">
                  </div>
                  <div style="padding: var(--space-2) var(--space-3); background: rgba(34, 197, 94, 0.08); border-radius: var(--radius-sm); border: 1px solid rgba(34, 197, 94, 0.2);">
                    <span style="font-size: var(--text-xs); color: var(--color-green); font-family: var(--font-mono);">[1-CLICK READY] Saved token detected</span>
                  </div>
                  <button class="btn btn-primary w-full" id="btn-pay" style="margin-top: var(--space-2);">
                    Pay ₹2,499 →
                  </button>
                </div>

                <!-- Card Form -->
                <div class="payment-form mt-6" id="form-card" style="display:none;">
                  <div class="form-group">
                    <label class="form-label">Card Number</label>
                    <input type="text" class="form-input" placeholder="4111 1111 1111 1111" id="card-input">
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Expiry</label>
                      <input type="text" class="form-input" placeholder="MM/YY">
                    </div>
                    <div class="form-group">
                      <label class="form-label">CVV</label>
                      <input type="text" class="form-input" placeholder="***">
                    </div>
                  </div>
                  <button class="btn btn-primary w-full" id="btn-pay-card" style="margin-top: var(--space-2);">
                    Pay ₹2,499 →
                  </button>
                </div>

                <!-- Wallet Form -->
                <div class="payment-form mt-6" id="form-wallet" style="display:none;">
                  <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                    <div class="payment-method active" style="cursor: default; flex: none; justify-content: space-between;">
                      <span style="font-size: var(--text-sm); font-weight: 500;">PhonePe</span>
                      <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent);">₹4,200</span>
                    </div>
                    <div class="payment-method" style="cursor: default; flex: none; justify-content: space-between;">
                      <span style="font-size: var(--text-sm); font-weight: 500;">Paytm Wallet</span>
                      <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary);">₹1,850</span>
                    </div>
                    <div class="payment-method" style="cursor: default; flex: none; justify-content: space-between;">
                      <span style="font-size: var(--text-sm); font-weight: 500;">Amazon Pay</span>
                      <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary);">₹3,100</span>
                    </div>
                  </div>
                  <button class="btn btn-primary w-full" id="btn-pay-wallet" style="margin-top: var(--space-4);">
                    Pay ₹2,499 →
                  </button>
                </div>

                <!-- Payment Result Overlay -->
                <div id="paymentResult" style="display:none; position:absolute; inset:0; background: var(--color-bg-primary); border-radius: 28px; display: none; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-4); padding: var(--space-6);">
                  <div id="resultBadge" style="font-family: var(--font-mono); font-size: var(--text-xs); padding: 4px 10px; border-radius: var(--radius-sm);"></div>
                  <div id="resultTitle" style="font-size: var(--text-lg); font-weight: 700; font-family: var(--font-display); text-align: center;"></div>
                  <div id="resultDesc" style="font-size: var(--text-xs); color: var(--color-text-secondary); text-align: center; font-family: var(--font-mono);"></div>
                  <button class="btn btn-secondary btn-sm" id="btn-reset" style="margin-top: var(--space-2);">Reset Checkout</button>
                </div>
              </div>
            </div>
          </div>

          <!-- State Machine & Info -->
          <div>
            <div class="glass-card mb-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// deterministic lifecycle</span>
              <h4 style="margin-bottom: var(--space-2);">Payment State Machine</h4>
              <p style="font-size: var(--text-sm); color: var(--color-text-tertiary); margin-bottom: var(--space-4);">
                Every payment executes through a strict, zero-ambiguity finite state automaton. Click "Pay" to watch the transitions.
              </p>
              <div class="state-machine" id="stateMachine">
                ${states.map((s, i) => `
                  <span class="state-node ${i === 0 ? 'current' : ''}" id="state-${s}">${s}</span>
                  ${i < states.length - 1 ? '<span class="state-arrow">→</span>' : ''}
                `).join('')}
              </div>
              <div id="stateDescription" style="margin-top: var(--space-4); padding: var(--space-3); background: rgba(0, 0, 0, 0.4); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-accent);">
                STATUS: IDLE — Awaiting user payment initiation
              </div>
            </div>

            <!-- 1-Click Flow -->
            <div class="glass-card mb-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// latency breakdown</span>
              <h4 style="margin-bottom: var(--space-3);">1-Click Checkout Execution</h4>
              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-accent);">
                  <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-accent); font-weight: 700;">01</span>
                  <div>
                    <div style="font-size: var(--text-sm); font-weight: 600;">Saved Instrument Detection</div>
                    <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Tokenized card/UPI retrieved locally from Presto secure storage</div>
                  </div>
                  <span class="badge badge-blue" style="margin-left: auto;">~50ms</span>
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-text-secondary);">
                  <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-secondary); font-weight: 700;">02</span>
                  <div>
                    <div style="font-size: var(--text-sm); font-weight: 600;">Biometric / PIN Auth</div>
                    <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Hardware-backed key store signature with zero redirect</div>
                  </div>
                  <span class="badge badge-violet" style="margin-left: auto;">~800ms</span>
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-green);">
                  <span style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-green); font-weight: 700;">03</span>
                  <div>
                    <div style="font-size: var(--text-sm); font-weight: 600;">Direct Bank Capture</div>
                    <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Optimistic settlement via direct NPCI / Switch socket</div>
                  </div>
                  <span class="badge badge-green" style="margin-left: auto;">~1.2s</span>
                </div>
              </div>
              <div style="margin-top: var(--space-4); padding: var(--space-3); background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: var(--radius-sm); text-align: center;">
                <span style="font-size: var(--text-xs); font-family: var(--font-mono); font-weight: 600; color: var(--color-green);">BENCHMARK: ~2.0s Total Latency — 40% Reduction in Drop-offs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Presto Framework -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// mobile runtime</span>
          <h2>Presto: <span class="accent-word">React → Native</span></h2>
          <p>React-like declarative markup compiled directly to native Android and iOS views without JavaScript thread bottlenecks.</p>
        </div>

        <div class="framework-comparison animate-on-scroll">
          <div>
            <div class="code-comparison-label" style="color: var(--color-accent); font-family: var(--font-mono);">
              JSX SOURCE [DEVELOPER WRITE]
            </div>
            <div class="code-block">
              <div class="code-block-header">
                <div class="code-block-dots">
                  <span class="code-block-dot red"></span>
                  <span class="code-block-dot yellow"></span>
                  <span class="code-block-dot green"></span>
                </div>
                <span class="code-block-title">PaymentSheet.jsx</span>
              </div>
              <div class="code-block-body">
<pre><span class="keyword">const</span> <span class="function">PaymentSheet</span> = ({ amount, merchant }) <span class="operator">=></span> (
  <span class="operator">&lt;</span><span class="type">LinearLayout</span> orientation=<span class="string">"vertical"</span><span class="operator">&gt;</span>
    <span class="operator">&lt;</span><span class="type">AmountHeader</span> value={amount} <span class="operator">/&gt;</span>
    <span class="operator">&lt;</span><span class="type">PaymentMethods</span>
      methods={[<span class="string">'upi'</span>, <span class="string">'card'</span>, <span class="string">'wallet'</span>]}
      onSelect={handleMethodSelect}
    <span class="operator">/&gt;</span>
    <span class="operator">&lt;</span><span class="type">SavedInstruments</span>
      userId={user.id}
      oneClick={<span class="keyword">true</span>}
    <span class="operator">/&gt;</span>
    <span class="operator">&lt;</span><span class="type">PayButton</span>
      amount={amount}
      onPay={initiatePayment}
    <span class="operator">/&gt;</span>
  <span class="operator">&lt;/</span><span class="type">LinearLayout</span><span class="operator">&gt;</span>
);</pre>
              </div>
            </div>
          </div>

          <div>
            <div class="code-comparison-label" style="color: var(--color-green); font-family: var(--font-mono);">
              PRESTO COMPILED [NATIVE EXECUTION]
            </div>
            <div class="code-block">
              <div class="code-block-header">
                <div class="code-block-dots">
                  <span class="code-block-dot red"></span>
                  <span class="code-block-dot yellow"></span>
                  <span class="code-block-dot green"></span>
                </div>
                <span class="code-block-title">NativeView.purs</span>
              </div>
              <div class="code-block-body">
<pre><span class="keyword">module</span> <span class="type">PaymentSheet</span> <span class="keyword">where</span>

<span class="function">paymentSheet</span> :: <span class="type">PaymentConfig</span> → <span class="type">PrestoDOM</span>
<span class="function">paymentSheet</span> config =
  <span class="function">linearLayout</span>
    [ <span class="function">orientation</span> <span class="string">VERTICAL</span>
    , <span class="function">height</span> <span class="type">MATCH_PARENT</span>
    , <span class="function">background</span> <span class="string">"#050508"</span>
    ]
    [ <span class="function">amountHeader</span> config.amount
    , <span class="function">paymentMethods</span> config.methods
    , <span class="function">savedInstruments</span> config.userId
    , <span class="function">payButton</span> config.amount
    ]
<span class="comment">-- Directly invokes Android/iOS UIKit without bridge overhead</span></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Rendering Pipeline -->
        <div class="glass-card mt-8 animate-on-scroll">
          <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// compiler pipeline</span>
          <h4 style="margin-bottom: var(--space-4);">Presto Execution Graph</h4>
          <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-3); flex-wrap: wrap;">
            <div class="flow-node">Declarative JSX</div>
            <span class="flow-arrow">→</span>
            <div class="flow-node">Pure Virtual Tree</div>
            <span class="flow-arrow">→</span>
            <div class="flow-node">Presto Diff Engine</div>
            <span class="flow-arrow">→</span>
            <div class="flow-node">Native JNI / C++ Hook</div>
            <span class="flow-arrow">→</span>
            <div class="flow-node success">60fps Native View</div>
          </div>
          <p style="text-align: center; margin-top: var(--space-4); font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary);">
            Zero React Native Bridge Latency • Direct Host Platform Threading • 100% Deterministic GC
          </p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Key Metrics -->
    <section class="section-sm">
      <div class="container">
        <div class="grid grid-3 animate-on-scroll">
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);">&lt; 2.0s</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">1-Click Checkout Latency</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-green);">40%</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Cart Abandonment Reduction</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);">60 fps</div>
            <div style="font-size: var(--text-xs); font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Fluid Native Rendering</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Payment method switching
  const methodBtns = container.querySelectorAll('.payment-method[data-method]');
  const forms = {
    upi: document.getElementById('form-upi'),
    card: document.getElementById('form-card'),
    wallet: document.getElementById('form-wallet'),
  };

  methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      methodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMethod = btn.dataset.method;
      Object.values(forms).forEach(f => { if (f) f.style.display = 'none'; });
      const targetForm = forms[activeMethod];
      if (targetForm) targetForm.style.display = 'flex';
    });
  });

  // Payment flow simulation
  const stateDescriptions = {
    'IDLE': 'Awaiting user payment initiation',
    'INITIATED': 'Payment intent created, validating cryptographic signature...',
    'AUTHENTICATING': 'Biometric verification verified with secure enclave...',
    'AUTHORIZED': 'Issuing bank confirmed balance and authorized hold',
    'CAPTURED': 'Funds successfully captured via gateway switch socket',
    'SETTLED': 'Transaction settled to merchant account — Completed',
  };

  function simulatePayment() {
    currentState = 0;
    updateStateMachine();

    stateInterval = setInterval(() => {
      currentState++;
      if (currentState >= states.length) {
        clearInterval(stateInterval);
        showPaymentResult(true);
        return;
      }
      updateStateMachine();
    }, 1100);
  }

  function updateStateMachine() {
    states.forEach((s, i) => {
      const node = document.getElementById(`state-${s}`);
      if (!node) return;
      node.className = 'state-node';
      if (i < currentState) node.classList.add('completed');
      if (i === currentState) node.classList.add('current');
    });

    const descEl = document.getElementById('stateDescription');
    if (descEl) {
      descEl.textContent = `STATUS: ${states[currentState]} — ${stateDescriptions[states[currentState]]}`;
    }
  }

  function showPaymentResult(success) {
    const result = document.getElementById('paymentResult');
    if (!result) return;
    result.style.display = 'flex';
    
    const badge = document.getElementById('resultBadge');
    if (badge) {
      badge.textContent = success ? 'SUCCESS 200' : 'ERROR 504';
      badge.style.background = success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      badge.style.color = success ? 'var(--color-green)' : 'var(--color-red)';
      badge.style.border = success ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)';
    }

    document.getElementById('resultTitle').textContent = success ? 'Transaction Approved' : 'Payment Failed';
    document.getElementById('resultDesc').textContent = success
      ? 'REF: TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase() + ' • SETTLED'
      : 'Switch timeout. Automatic failover initiated.';
  }

  // Bind pay buttons
  ['btn-pay', 'btn-pay-card', 'btn-pay-wallet'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', simulatePayment);
  });

  // Reset
  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      clearInterval(stateInterval);
      currentState = 0;
      updateStateMachine();
      const result = document.getElementById('paymentResult');
      if (result) result.style.display = 'none';
    });
  }
}
