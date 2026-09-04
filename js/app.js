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

    // Handle initial route
    this.router.handleRoute();

    // Mobile nav toggle
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('navLinks');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
      });

      // Close mobile nav on link click
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('open');
        });
      });
    }

    console.log('🚀 PayFlow initialized');
  }

  initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  const app = new PayFlowApp();
  app.init();
});
