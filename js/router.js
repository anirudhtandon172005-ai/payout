/* ============================================================
   PayOut — SPA Router (Hash-based)
   ============================================================ */

const Router = {
  routes: {},
  currentRoute: null,
  appElement: null,

  init(appElementId) {
    this.appElement = document.getElementById(appElementId);
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  },

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const route = this.matchRoute(hash);

    if (route && this.routes[route.path]) {
      // Page exit animation
      if (this.appElement.children.length > 0) {
        this.appElement.classList.add('page-exit');
        setTimeout(() => {
          this.appElement.classList.remove('page-exit');
          this.renderRoute(route);
        }, 200);
      } else {
        this.renderRoute(route);
      }
    } else {
      // 404 — redirect to home
      this.navigate('/');
    }
  },

  matchRoute(hash) {
    // Exact match first
    if (this.routes[hash]) {
      return { path: hash, params: {} };
    }
    // Pattern matching (e.g. /campaign/:id)
    for (const path of Object.keys(this.routes)) {
      const regex = new RegExp('^' + path.replace(/:([^/]+)/g, '([^/]+)') + '$');
      const match = hash.match(regex);
      if (match) {
        const paramNames = (path.match(/:([^/]+)/g) || []).map(p => p.slice(1));
        const params = {};
        paramNames.forEach((name, i) => { params[name] = match[i + 1]; });
        return { path, params };
      }
    }
    return null;
  },

  renderRoute(route) {
    this.currentRoute = route.path;
    window.scrollTo(0, 0);
    this.routes[route.path](this.appElement, route.params);
    this.appElement.classList.add('page-enter');
    setTimeout(() => {
      this.appElement.classList.remove('page-enter');
    }, 400);
  }
};
