/**
 * PayFlow Infrastructure Page — v2
 * Multi-DC dashboard, uptime metrics, load distribution, Infrastructure DSL
 */

import { DATA_CENTERS, SLA_METRICS } from '../data/mock-data.js';
import { createScrollCounter } from '../utils/animations.js';

export function renderInfrastructurePage(container) {
  let selectedDC = null;

  container.innerHTML = `
    <!-- Infra Hero -->
    <section class="section bg-glow-top">
      <div class="container">
        <div class="section-header">
          <span class="section-label">// pillar 04 — distributed systems</span>
          <h2><span class="accent-word">99.999%</span> Available Infrastructure</h2>
          <p>Mission-critical payment infrastructure engineered for sovereign Indian scale — active-active multi-datacenter topology, declarative GitOps DSL, and sub-50ms edge consensus.</p>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Uptime Display -->
    <section class="section-sm">
      <div class="container">
        <div class="glass-card animate-on-scroll">
          <div class="uptime-display">
            <div class="uptime-value" id="uptimeValue" style="font-family: var(--font-display); font-weight: 700; color: var(--color-accent);">99.999%</div>
            <div class="uptime-label" style="font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.12em;">FIVE-NINES AVAILABILITY SLA</div>
            <div class="uptime-detail" style="font-family: var(--font-mono); color: var(--color-text-secondary);">&lt; ${SLA_METRICS.downtimePerYear} total allowable downtime per calendar year</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); margin-top: var(--space-6);">
            <div style="text-align: center; padding: var(--space-4); background: rgba(0, 0, 0, 0.3); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);" id="metric-p50">${SLA_METRICS.p50Latency}</div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">P50 LATENCY (MS)</div>
            </div>
            <div style="text-align: center; padding: var(--space-4); background: rgba(0, 0, 0, 0.3); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-secondary);" id="metric-p99">${SLA_METRICS.p99Latency}</div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">P99 LATENCY (MS)</div>
            </div>
            <div style="text-align: center; padding: var(--space-4); background: rgba(0, 0, 0, 0.3); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-green);" id="metric-tps">0</div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">ACTIVE PEAK TPS</div>
            </div>
            <div style="text-align: center; padding: var(--space-4); background: rgba(0, 0, 0, 0.3); border: 1px solid var(--color-border); border-radius: var(--radius-sm);">
              <div style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);" id="metric-services">0</div>
              <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-1);">ORCHESTRATED SERVICES</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Multi-DC Map -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// geographical distribution</span>
          <h2>Data Center <span class="accent-word">Topology</span></h2>
          <p>Active-active multi-region mesh across Indian metros. Low-latency edge PoPs handle handshake termination and biometric validation.</p>
        </div>

        <div class="animate-on-scroll" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--space-8); align-items: start;">
          <!-- Map -->
          <div class="india-map-container" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); aspect-ratio: auto; min-height: 480px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
              <span class="section-label" style="margin: 0;">// pan-india mesh</span>
              <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-tertiary);">CLICK MARKER FOR TELEMETRY</span>
            </div>

            <div style="position: relative; width: 100%; height: 380px; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden;">
              <!-- India outline representation -->
              <svg viewBox="0 0 200 280" style="width: 100%; height: 100%; opacity: 0.12;">
                <path d="M85 20 L100 15 L115 18 L130 25 L140 35 L145 50 L150 70 L148 90 L155 110 L160 130 L158 150 L155 170 L140 190 L130 210 L115 230 L105 250 L100 260 L95 255 L90 240 L80 220 L70 200 L60 180 L55 160 L50 140 L48 120 L50 100 L55 80 L60 60 L65 45 L75 30 Z"
                  fill="none" stroke="#00f0ff" stroke-width="1.5"/>
              </svg>

              ${DATA_CENTERS.map(dc => `
                <div class="dc-marker ${dc.role === 'Primary' ? 'primary' : dc.role === 'Edge' ? 'edge' : 'secondary'}"
                     id="dc-${dc.id}"
                     data-dc="${dc.id}"
                     style="left: ${dc.posX}%; top: ${dc.posY}%; cursor: pointer;"
                     title="${dc.name}">
                </div>
                <div style="position: absolute; left: ${dc.posX}%; top: calc(${dc.posY}% + 14px); transform: translateX(-50%); font-size: 10px; font-family: var(--font-mono); color: var(--color-text-tertiary); white-space: nowrap; pointer-events: none; text-align: center;">
                  ${dc.name.split(' ')[0]}
                </div>
              `).join('')}

              <!-- Connection lines between DCs -->
              <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
                <line x1="29%" y1="51%" x2="49%" y2="22%" stroke="rgba(0, 240, 255, 0.2)" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="29%" y1="51%" x2="53%" y2="72%" stroke="rgba(0, 240, 255, 0.2)" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="29%" y1="51%" x2="49%" y2="70%" stroke="rgba(0, 240, 255, 0.2)" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="49%" y1="22%" x2="49%" y2="58%" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" stroke-dasharray="3,3"/>
                <line x1="49%" y1="70%" x2="53%" y2="72%" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" stroke-dasharray="3,3"/>
              </svg>
            </div>

            <!-- Legend -->
            <div style="display: flex; gap: var(--space-6); justify-content: center; margin-top: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 11px; font-family: var(--font-mono); color: var(--color-text-secondary);">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span> Primary Region
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 11px; font-family: var(--font-mono); color: var(--color-text-secondary);">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-text-secondary); display: inline-block;"></span> Secondary Region
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 11px; font-family: var(--font-mono); color: var(--color-text-secondary);">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-green); display: inline-block;"></span> Edge PoP
              </div>
            </div>
          </div>

          <!-- DC Details Panel -->
          <div>
            <div class="dc-info-panel" id="dcInfoPanel" style="border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-bg-card); padding: var(--space-6);">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// telemetry inspector</span>
              <h4 style="margin-bottom: var(--space-4);">Cluster Telemetry</h4>
              <div id="dcInfoContent" style="color: var(--color-text-tertiary); font-size: var(--text-sm); font-family: var(--font-mono);">
                Select any region or edge marker on the map to inspect live health telemetry and synchronization lag.
              </div>
            </div>

            <!-- Load Distribution -->
            <div class="glass-card mt-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// live cluster balancing</span>
              <h4 style="margin-bottom: var(--space-4);">Traffic Load Allocation</h4>
              <div class="load-bars" id="loadBars">
                ${DATA_CENTERS.map(dc => `
                  <div class="load-bar-item" style="margin-bottom: var(--space-3);">
                    <span class="load-bar-label" style="font-family: var(--font-mono); font-size: 11px;">${dc.name.split(' ').slice(0, -1).join(' ') || dc.name}</span>
                    <div class="load-bar-track" style="height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-full); overflow: hidden;">
                      <div class="load-bar-fill" style="height: 100%; width: 0%; background: ${dc.role === 'Primary' ? 'var(--color-accent)' : dc.role === 'Edge' ? 'var(--color-green)' : 'var(--color-text-secondary)'}; transition: width 0.8s ease;" data-width="${dc.load}"></div>
                    </div>
                    <span class="load-bar-value" style="font-family: var(--font-mono); font-size: 11px; color: var(--color-text-white);">${dc.load}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Infrastructure DSL -->
    <section class="section">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">// infrastructure as code</span>
          <h2>Declarative <span class="accent-word">Infra DSL</span></h2>
          <p>Custom typed configuration language replacing boilerplate Kubernetes manifests and Terraform definitions across 5,000+ microservices.</p>
        </div>

        <div class="animate-on-scroll" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--space-8);">
          <div class="code-block">
            <div class="code-block-header">
              <div class="code-block-dots">
                <span class="code-block-dot red"></span>
                <span class="code-block-dot yellow"></span>
                <span class="code-block-dot green"></span>
              </div>
              <span class="code-block-title">payment-gateway.infra.dsl</span>
            </div>
            <div class="code-block-body">
<pre><span class="keyword">service</span> <span class="function">payment-gateway</span> {
  <span class="keyword">replicas</span>     = <span class="number">12</span>
  <span class="keyword">cpu</span>          = <span class="string">"4 cores"</span>
  <span class="keyword">memory</span>       = <span class="string">"16 GB"</span>
  <span class="keyword">autoscale</span>    = <span class="keyword">true</span>
  <span class="keyword">min_replicas</span> = <span class="number">6</span>
  <span class="keyword">max_replicas</span> = <span class="number">48</span>

  <span class="keyword">deploy</span> {
    <span class="keyword">strategy</span>  = <span class="string">"rolling"</span>
    <span class="keyword">max_surge</span> = <span class="string">"25%"</span>
    <span class="keyword">canary</span>    = <span class="keyword">true</span>
  }

  <span class="keyword">health</span> {
    <span class="keyword">endpoint</span>  = <span class="string">"/health"</span>
    <span class="keyword">interval</span>  = <span class="string">"5s"</span>
    <span class="keyword">threshold</span> = <span class="number">3</span>
  }

  <span class="keyword">multi_dc</span> {
    <span class="keyword">primary</span>   = [<span class="string">"mumbai-1"</span>, <span class="string">"mumbai-2"</span>]
    <span class="keyword">secondary</span> = [<span class="string">"chennai"</span>, <span class="string">"delhi"</span>]
    <span class="keyword">sync</span>      = <span class="string">"active-active"</span>
    <span class="keyword">failover</span>  = <span class="string">"auto"</span>
  }

  <span class="keyword">observability</span> {
    <span class="keyword">tracing</span>   = <span class="string">"opentelemetry"</span>
    <span class="keyword">alerts</span>    = [<span class="string">"pagerduty"</span>, <span class="string">"ops-slack"</span>]
  }
}</pre>
            </div>
          </div>

          <div>
            <div class="glass-card mb-6">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// architectural rationale</span>
              <h4 style="margin-bottom: var(--space-4);">Why a Custom DSL?</h4>
              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                <div style="padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-accent);">
                  <div style="font-size: var(--text-sm); font-weight: 600;">Unified Abstraction Layer</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Compiles to K8s CRDs, Envoy configs, and Prometheus alert rules automatically</div>
                </div>
                <div style="padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-text-secondary);">
                  <div style="font-size: var(--text-sm); font-weight: 600;">Static Type Checking</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Catches port conflicts and invalid routing flags at CI time before apply</div>
                </div>
                <div style="padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-sm); border-left: 2px solid var(--color-green);">
                  <div style="font-size: var(--text-sm); font-weight: 600;">5,000+ Services Managed</div>
                  <div style="font-size: var(--text-xs); color: var(--color-text-tertiary);">Zero config drift between staging, pre-prod, and production clusters</div>
                </div>
              </div>
            </div>

            <div class="glass-card">
              <span class="section-label" style="display: block; margin-bottom: var(--space-2);">// global telemetry</span>
              <h4 style="margin-bottom: var(--space-3);">Infrastructure Scope</h4>
              <div class="metric-row">
                <span class="metric-row-label">Managed Microservices</span>
                <span class="metric-row-value" style="font-family: var(--font-mono);">${SLA_METRICS.activeServices.toLocaleString()}</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Weekly Production Releases</span>
                <span class="metric-row-value" style="font-family: var(--font-mono);">${SLA_METRICS.deployments}</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Maximum Peak Capacity</span>
                <span class="metric-row-value" style="font-family: var(--font-mono);">${SLA_METRICS.tpsCapacity.toLocaleString()} TPS</span>
              </div>
              <div class="metric-row">
                <span class="metric-row-label">Active Mesh Nodes</span>
                <span class="metric-row-value" style="font-family: var(--font-mono);">${DATA_CENTERS.length} DCs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rail divider -->
    <div class="rail-line"></div>

    <!-- Key Infrastructure Stats -->
    <section class="section-sm">
      <div class="container">
        <div class="grid grid-3 animate-on-scroll">
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-accent);">&lt; 50ms</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Cross-Region Consensus Sync</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-green);">100,000</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">Engineered TPS Ceiling</div>
          </div>
          <div class="glass-card-sm glass-card" style="text-align: center;">
            <div style="font-size: var(--text-3xl); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);">-30%</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary); margin-top: var(--space-2);">P99 Latency via Edge PoPs</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Animate load bars
  setTimeout(() => {
    container.querySelectorAll('.load-bar-fill').forEach(bar => {
      const width = bar.dataset.width;
      bar.style.width = `${width}%`;
    });
  }, 400);

  // Animate metric counters
  setTimeout(() => {
    const tpsEl = document.getElementById('metric-tps');
    const servicesEl = document.getElementById('metric-services');
    if (tpsEl) createScrollCounter(tpsEl, SLA_METRICS.currentTps, '');
    if (servicesEl) createScrollCounter(servicesEl, SLA_METRICS.activeServices, '');
  }, 200);

  // DC marker click
  container.querySelectorAll('.dc-marker').forEach(marker => {
    marker.addEventListener('click', () => {
      const dcId = marker.dataset.dc;
      const dc = DATA_CENTERS.find(d => d.id === dcId);
      if (!dc) return;

      // Highlight selected
      container.querySelectorAll('.dc-marker').forEach(m => m.style.transform = '');
      marker.style.transform = 'scale(1.4)';

      const infoContent = document.getElementById('dcInfoContent');
      if (infoContent) {
        infoContent.innerHTML = `
          <div style="margin-bottom: var(--space-4);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
              <span style="font-size: var(--text-base); font-weight: 700; font-family: var(--font-display); color: var(--color-text-white);">${dc.name}</span>
              <span class="badge badge-${dc.role === 'Primary' ? 'blue' : dc.role === 'Edge' ? 'green' : 'violet'}">${dc.role.toUpperCase()}</span>
            </div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-tertiary);">${dc.lat}° N, ${dc.lng}° E</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-xs); font-family: var(--font-mono);">
            <div class="metric-row">
              <span class="metric-row-label">Cluster Utilization:</span>
              <span class="metric-row-value" style="color: ${dc.load > 30 ? 'var(--color-orange)' : 'var(--color-accent)'};">${dc.load}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-row-label">Active Pod Replicas:</span>
              <span class="metric-row-value">${dc.pods}</span>
            </div>
            <div class="metric-row">
              <span class="metric-row-label">Consensus State:</span>
              <span class="metric-row-value" style="color: var(--color-green);">IN_SYNC (P99 &lt; 8ms)</span>
            </div>
          </div>

          <div style="margin-top: var(--space-4); padding: var(--space-3); background: rgba(0, 0, 0, 0.4); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 11px; color: var(--color-text-secondary); font-family: var(--font-mono);">
            ${dc.role === 'Primary' ? 'Primary active-active write region with continuous Raft log replication.'
              : dc.role === 'Edge' ? 'Edge PoP terminating TLS handshakes, dropping handshake roundtrips by 30%.'
              : dc.role === 'DR' ? 'Disaster recovery target with automated DNS failover.'
              : 'Secondary active region handling traffic shunting from primary clusters.'}
          </div>
        `;
      }
    });
  });
}
