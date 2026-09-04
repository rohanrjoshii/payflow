/**
 * PayFlow SPA Router
 * Robust hash-based routing for single page application navigation
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.appContainer = null;
    this.onNavigate = null;
    this.isNavigating = false;
  }

  init(containerId) {
    this.appContainer = document.getElementById(containerId);
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());
  }

  addRoute(path, handler) {
    // Register both with and without leading slash
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    this.routes.set(cleanPath, handler);
    this.routes.set(cleanPath.slice(1) || '/', handler);
  }

  navigate(path) {
    const targetHash = path.startsWith('/') ? '#' + path : '#/' + path;
    if (window.location.hash === targetHash) {
      // Force reload if same route
      this.handleRoute(true);
    } else {
      window.location.hash = targetHash;
    }
  }

  normalizePath(hash) {
    if (!hash || hash === '#' || hash === '#/') return '/';
    // Remove leading #
    let clean = hash.replace(/^#+/, '');
    // Ensure leading /
    if (!clean.startsWith('/')) clean = '/' + clean;
    // Remove trailing / if longer than 1
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return clean;
  }

  handleRoute(force = false) {
    const rawHash = window.location.hash;

    // In-page anchor link (e.g. #how-it-works) -> scroll smoothly without re-routing
    if (rawHash && !rawHash.startsWith('#/')) {
      const targetId = rawHash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const path = this.normalizePath(rawHash);

    // If already on route and container is not empty, avoid redundant re-render unless forced
    if (!force && this.currentRoute === path && this.appContainer && this.appContainer.innerHTML.trim() !== '') {
      return;
    }

    const handler = this.routes.get(path);

    if (handler && this.appContainer) {
      this.currentRoute = path;

      try {
        // Fast transition
        this.appContainer.style.opacity = '0.7';
        this.appContainer.innerHTML = '';
        
        // Execute page render
        handler(this.appContainer);

        // Animate in
        this.appContainer.style.opacity = '1';
        this.appContainer.style.transform = 'translateY(0)';

        // Update active nav link
        this.updateActiveNav(path);

        // Trigger scroll animations
        this.initScrollAnimations();

        // Callback
        if (this.onNavigate) this.onNavigate(path);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
      } catch (err) {
        console.error(`Error rendering route [${path}]:`, err);
        this.appContainer.style.opacity = '1';
      }
    } else if (!handler) {
      // Unknown route -> fallback to home
      console.warn(`Route not found: ${path}, redirecting to /`);
      this.navigate('/');
    }
  }

  updateActiveNav(path) {
    document.querySelectorAll('.navbar-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = this.normalizePath(href);
      if (linkPath === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initScrollAnimations() {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }
}
