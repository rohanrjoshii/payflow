/**
 * PayFlow Main Application Controller
 * Initializes router, navbar, and all page routes
 */

import { Router } from './router.js';
import { renderHomePage } from './pages/home.js';
import { renderSDKPage } from './pages/sdk.js';
import { renderBackendPage } from './pages/backend.js';
import { renderDataSciencePage } from './pages/datascience.js';
import { renderInfrastructurePage } from './pages/infrastructure.js';

class PayFlowApp {
  constructor() {
    this.router = new Router();
  }

  init() {
    // Setup navbar scroll behavior
    this.initNavbar();

    // Setup router
    this.router.init('app');

    // Register routes
    this.router.addRoute('/', renderHomePage);
    this.router.addRoute('/sdk', renderSDKPage);
    this.router.addRoute('/backend', renderBackendPage);
    this.router.addRoute('/datascience', renderDataSciencePage);
    this.router.addRoute('/infrastructure', renderInfrastructurePage);

    // Initial navigation based on current hash
    this.router.handleRoute();

    // Setup mobile nav toggle & direct click listeners
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('navLinks');
    if (toggle && nav) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('open');
      });

      // Close mobile nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          nav.classList.remove('open');
        }
      });
    }

    // Intercept nav links to guarantee routing triggers
    document.querySelectorAll('.navbar a, .footer a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#/')) {
          const path = href.slice(1);
          this.router.navigate(path);
          if (nav) nav.classList.remove('open');
        }
      });
    });

    console.log('🚀 PayFlow initialized successfully');
  }

  initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

// Robust boot: handles both DOMContentLoaded and already-loaded states
function boot() {
  const app = new PayFlowApp();
  app.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  // Document already ready (common with type="module" or cached loads)
  boot();
}
