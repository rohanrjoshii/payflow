/**
 * PayFlow Animation Utilities
 * Scroll animations, counters, and canvas helpers
 */

/**
 * Animate a number counter from 0 to target
 */
export function animateCounter(element, target, duration = 2000, suffix = '', prefix = '') {
  const start = 0;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    if (isFloat) {
      element.textContent = `${prefix}${current.toFixed(3)}${suffix}`;
    } else {
      element.textContent = `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Create animated counter that triggers on scroll visibility
 */
export function createScrollCounter(element, target, suffix = '', prefix = '') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(element, target, 2000, suffix, prefix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(element);
}

/**
 * Draw a simple line chart on a canvas element
 */
export function drawLineChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const {
    lineColor = '#0066ff',
    fillColor = 'rgba(0, 102, 255, 0.08)',
    lineWidth = 2,
    padding = { top: 20, right: 20, bottom: 30, left: 50 },
    showDots = true,
    dotRadius = 3,
    showGrid = true,
    gridColor = 'rgba(148, 163, 184, 0.06)',
    labelColor = '#64748b',
    animate = true,
    anomalyIndices = [],
    anomalyColor = '#ef4444',
  } = options;

  const w = rect.width - padding.left - padding.right;
  const h = rect.height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const maxVal = Math.max(...values) * 1.1;
  const minVal = Math.min(...values) * 0.9;
  const range = maxVal - minVal;

  function xPos(i) {
    return padding.left + (i / (data.length - 1)) * w;
  }

  function yPos(val) {
    return padding.top + h - ((val - minVal) / range) * h;
  }

  // Grid lines
  if (showGrid) {
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * h;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + w, y);
      ctx.stroke();

      // Y-axis labels
      const labelVal = maxVal - (i / gridLines) * range;
      ctx.fillStyle = labelColor;
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(labelVal).toLocaleString(), padding.left - 8, y + 4);
    }
  }

  // X-axis labels
  if (data[0] && data[0].label) {
    ctx.fillStyle = labelColor;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    const labelStep = Math.max(1, Math.floor(data.length / 6));
    data.forEach((d, i) => {
      if (i % labelStep === 0) {
        ctx.fillText(d.label, xPos(i), rect.height - 8);
      }
    });
  }

  // Fill area
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(values[0]));
  for (let i = 1; i < values.length; i++) {
    ctx.lineTo(xPos(i), yPos(values[i]));
  }
  ctx.lineTo(xPos(values.length - 1), padding.top + h);
  ctx.lineTo(xPos(0), padding.top + h);
  ctx.closePath();

  const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + h);
  gradient.addColorStop(0, fillColor);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(xPos(0), yPos(values[0]));
  for (let i = 1; i < values.length; i++) {
    ctx.lineTo(xPos(i), yPos(values[i]));
  }
  ctx.stroke();

  // Dots
  if (showDots) {
    values.forEach((val, i) => {
      const isAnomaly = anomalyIndices.includes(i);
      ctx.beginPath();
      ctx.arc(xPos(i), yPos(val), isAnomaly ? dotRadius + 2 : dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = isAnomaly ? anomalyColor : lineColor;
      ctx.fill();

      if (isAnomaly) {
        // Outer ring for anomaly
        ctx.beginPath();
        ctx.arc(xPos(i), yPos(val), dotRadius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = anomalyColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }
}

/**
 * Draw a bar chart
 */
export function drawBarChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const {
    padding = { top: 20, right: 20, bottom: 40, left: 50 },
    barWidth = 0.6,
    labelColor = '#64748b',
  } = options;

  const w = rect.width - padding.left - padding.right;
  const h = rect.height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map(d => d.value)) * 1.15;
  const barW = (w / data.length) * barWidth;
  const gapW = (w / data.length) * (1 - barWidth);

  data.forEach((d, i) => {
    const x = padding.left + (w / data.length) * i + gapW / 2;
    const barH = (d.value / maxVal) * h;
    const y = padding.top + h - barH;

    // Bar gradient
    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, d.color || '#0066ff');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');

    // Rounded rect
    const radius = 4;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + barW - radius, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + radius);
    ctx.lineTo(x + barW, y + barH);
    ctx.lineTo(x, y + barH);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fillStyle = grad;
    ctx.fill();

    // Label
    ctx.fillStyle = labelColor;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, x + barW / 2, rect.height - 10);

    // Value on top
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(d.value + (d.suffix || ''), x + barW / 2, y - 8);
  });
}

/**
 * Create a typing animation effect
 */
export function typeWriter(element, text, speed = 30) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

/**
 * Particle background effect (lightweight)
 */
export function createParticleBackground(canvas, color = 'rgba(96, 165, 250, 0.3)') {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let animId;
  let particles = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  function createParticles() {
    const rect = canvas.getBoundingClientRect();
    particles = [];
    const count = Math.min(50, Math.floor(rect.width * rect.height / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = rect.width;
      if (p.x > rect.width) p.x = 0;
      if (p.y < 0) p.y = rect.height;
      if (p.y > rect.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles();
    draw();
  });

  return () => cancelAnimationFrame(animId);
}
