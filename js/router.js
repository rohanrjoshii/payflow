/**
 * PayFlow SPA Router
 * Hash-based routing for single page application navigation
 */

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.appContainer = null;
    this.onNavigate = null;
  }

  init(containerId) {
    this.appContainer = document.getElementById(containerId);
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const handler = this.routes.get(hash);

    if (handler) {
      if (this.currentRoute !== hash) {
        this.currentRoute = hash;

        // Animate page transition
        if (this.appContainer) {
          this.appContainer.style.opacity = '0';
          this.appContainer.style.transform = 'translateY(10px)';

          setTimeout(() => {
            this.appContainer.innerHTML = '';
            handler(this.appContainer);
            this.appContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            this.appContainer.style.opacity = '1';
            this.appContainer.style.transform = 'translateY(0)';

            // Update active nav link
            this.updateActiveNav(hash);

            // Trigger scroll animations
            this.initScrollAnimations();

            // Callback
            if (this.onNavigate) this.onNavigate(hash);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 200);
        }
      }
    } else {
      // Default to home
      this.navigate('/');
    }
  }

  updateActiveNav(hash) {
    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${hash}`) {
        link.classList.add('active');
      }
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }
}
