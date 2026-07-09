/* ============================================================
   PayOut — Shared UI Components
   ============================================================ */

const Components = {
  /* ── Navbar ── */
  navbar(options = {}) {
    const { showAuth = true, transparent = false } = options;
    const isLoggedIn = Store.get('auth.isLoggedIn');

    return `
      <nav class="container" style="display:flex;justify-content:space-between;align-items:center;padding-top:var(--stack-md);padding-bottom:var(--stack-md);${transparent ? 'background:transparent;' : ''}">
        <a href="#/" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
          <img src="${MockData.assets.iconMark}" alt="PayOut" style="width:40px;height:40px;object-fit:contain;">
          <img src="${MockData.assets.wordmark}" alt="PayOut" style="height:40px;width:auto;object-fit:contain;">
        </a>
        ${showAuth ? `
          <div style="display:flex;align-items:center;gap:24px;">
            <a href="#/help" class="text-on-surface-variant hide-mobile" style="font-size:14px;font-weight:600;transition:color 0.2s;">Help</a>
            ${isLoggedIn ? `
              <a href="#/dashboard" style="font-weight:700;font-size:14px;">Dashboard</a>
              <button onclick="Store.logout();Router.navigate('/')" class="btn-text" style="font-size:13px;">Log out</button>
            ` : `
              <a href="#/signin" style="font-weight:700;font-size:14px;transition:transform 0.2s;">Log in</a>
            `}
          </div>
        ` : ''}
      </nav>
    `;
  },

  /* ── Footer ── */
  footer() {
    return `
      <footer class="container" style="border-top:1px solid var(--color-outline-variant);padding-top:var(--stack-lg);padding-bottom:var(--stack-lg);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px;">
        <a href="#/" style="display:flex;align-items:center;gap:8px;opacity:0.8;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">
          <img src="${MockData.assets.footerIcon}" alt="PayOut" style="height:32px;width:auto;object-fit:contain;">
          <img src="${MockData.assets.footerWordmark}" alt="PayOut" style="height:32px;width:auto;object-fit:contain;">
        </a>
        <div style="display:flex;gap:24px;">
          <a href="#/help" class="text-on-surface-variant" style="font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color=''">Help</a>
          <a href="#" class="text-on-surface-variant" style="font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color=''">Terms</a>
          <a href="#" class="text-on-surface-variant" style="font-size:14px;transition:color 0.2s;" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color=''">Privacy</a>
        </div>
        <p class="text-on-surface-variant" style="font-size:14px;">© 2026 PayOut. All rights reserved.</p>
      </footer>
    `;
  },

  /* ── Fixed Brand Mark (Top-Left) ── */
  brandMark() {
    return `
      <div style="position:fixed;top:24px;left:24px;z-index:var(--z-fixed);">
        <a href="#/"><img src="${MockData.assets.brandMark}" alt="PayOut" style="height:40px;width:auto;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.1));"></a>
      </div>
    `;
  },

  /* ── Step Indicator ── */
  stepIndicator(current, total, label) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--space-sm);">
        <div style="width:24px;height:2px;background:var(--color-outline);border-radius:var(--radius-full);"></div>
        <span class="text-label-sm text-outline">Step ${current} of ${total} — ${label}</span>
      </div>
    `;
  },

  /* ── Receipt Paper ── */
  receiptPaper() {
    return `
      <div class="receipt-paper" style="width:100%;max-width:340px;transform:rotate(3deg);border-radius:4px;">
        <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px dashed var(--color-outline-variant);">
          <img src="${MockData.assets.receiptIcon}" alt="PayOut" style="height:40px;width:auto;margin:0 auto 8px;object-fit:contain;">
          <div style="display:flex;justify-content:center;margin-bottom:8px;">
            <img src="${MockData.assets.receiptWordmark}" alt="PayOut" style="width:140px;height:auto;object-fit:contain;">
          </div>
          <p class="font-mono" style="font-size:13px;color:var(--color-on-surface-variant);margin-top:4px;">RECEIPT NO. 00892</p>
        </div>
        <div class="font-mono" style="font-size:14px;display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;animation:printLine 0.5s ease-out forwards;" class="print-delay-1">
            <span>1 AD VIEW</span><span>$0.15</span>
          </div>
          <div style="display:flex;justify-content:space-between;color:var(--color-secondary);animation:printLine 0.5s ease-out forwards;" class="print-delay-2">
            <span>DISCOUNT APPLIED</span><span>-$0.05</span>
          </div>
          <div style="display:flex;justify-content:space-between;animation:printLine 0.5s ease-out forwards;" class="print-delay-3">
            <span>RIDER BONUS</span><span>$0.08</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding-bottom:16px;border-bottom:1px dashed var(--color-outline-variant);animation:printLine 0.5s ease-out forwards;" class="print-delay-4">
            <span>PLATFORM FEE</span><span>$0.02</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-weight:700;font-size:16px;padding-top:8px;animation:printLine 0.5s ease-out forwards;" class="print-delay-5">
            <span>TOTAL DISTRIBUTED</span><span>$0.30</span>
          </div>
        </div>
        <div style="margin-top:32px;text-align:center;animation:printLine 0.5s ease-out forwards;" class="print-delay-6">
          <p class="font-mono" style="font-size:12px;color:var(--color-on-surface-variant);">THANK YOU FOR PARTICIPATING</p>
        </div>
      </div>
    `;
  },

  /* ── Toast System ── */
  showToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = { success: 'check_circle', error: 'error', info: 'info' };
    toast.innerHTML = `
      <span class="material-symbols-outlined" style="font-size:20px;">${icons[type] || 'info'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 200);
    }, duration);
  },

  /* ── Modal ── */
  showModal(title, content, actions = '') {
    const existing = document.getElementById('modal-backdrop');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="btn-icon" onclick="Components.closeModal()">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div style="color:var(--color-on-surface-variant);font-size:14px;font-weight:500;line-height:1.6;margin-bottom:24px;">${content}</div>
        ${actions ? `<div style="display:flex;gap:12px;justify-content:flex-end;">${actions}</div>` : ''}
      </div>
    `;

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) Components.closeModal();
    });

    document.body.appendChild(backdrop);
  },

  closeModal() {
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.style.animation = 'fadeOut 0.2s ease-in forwards';
      setTimeout(() => backdrop.remove(), 200);
    }
  },

  /* ── Loading Skeleton ── */
  skeleton(type = 'card') {
    if (type === 'card') {
      return `<div class="skeleton skeleton-card"></div>`;
    }
    if (type === 'text') {
      return `
        <div class="skeleton skeleton-heading"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      `;
    }
    if (type === 'stats') {
      return `
        <div class="stats-grid">
          ${Array(4).fill('<div class="skeleton" style="height:100px;border-radius:var(--radius-default);"></div>').join('')}
        </div>
      `;
    }
    return '';
  },

  /* ── Empty State ── */
  emptyState(icon, title, description, actionText, actionHref) {
    return `
      <div class="empty-state">
        <span class="material-symbols-outlined empty-state-icon">${icon}</span>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-desc">${description}</p>
        ${actionText ? `<a href="${actionHref}" class="btn btn-primary" style="margin-top:16px;">${actionText}</a>` : ''}
      </div>
    `;
  },

  /* ── Google OAuth Button SVG ── */
  googleIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>`;
  },

  /* ── Sidebar (Dashboard) ── */
  sidebar(activePage = 'dashboard') {
    const links = [
      { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '#/dashboard' },
      { id: 'campaigns', icon: 'campaign', label: 'Campaigns', href: '#/dashboard' },
      { id: 'analytics', icon: 'analytics', label: 'Analytics', href: '#/dashboard' },
      { id: 'settings', icon: 'settings', label: 'Settings', href: '#/dashboard' },
      { id: 'help', icon: 'help', label: 'Help', href: '#/help' },
    ];

    return `
      <aside class="sidebar">
        <div class="sidebar-logo">
          <a href="#/" style="display:flex;align-items:center;gap:8px;">
            <img src="${MockData.assets.iconMark}" alt="PayOut" style="width:32px;height:32px;object-fit:contain;">
            <img src="${MockData.assets.wordmark}" alt="PayOut" style="height:28px;width:auto;object-fit:contain;">
          </a>
        </div>
        <nav class="sidebar-nav">
          ${links.map(l => `
            <a href="${l.href}" class="sidebar-link ${l.id === activePage ? 'active' : ''}">
              <span class="material-symbols-outlined">${l.icon}</span>
              ${l.label}
            </a>
          `).join('')}
        </nav>
        <div style="margin-top:auto;padding:var(--gutter);border-top:1px solid var(--color-outline-variant);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--color-surface-container-highest);display:flex;align-items:center;justify-content:center;">
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--color-outline);">person</span>
            </div>
            <div>
              <p style="font-size:13px;font-weight:700;">${Store.get('business.name') || 'My Business'}</p>
              <p style="font-size:11px;color:var(--color-outline);">Verified</p>
            </div>
          </div>
        </div>
      </aside>
    `;
  },

  /* ── Bottom Nav (Mobile Dashboard) ── */
  bottomNav(activePage = 'dashboard') {
    const items = [
      { id: 'dashboard', icon: 'dashboard', label: 'Home' },
      { id: 'campaigns', icon: 'campaign', label: 'Campaigns' },
      { id: 'analytics', icon: 'analytics', label: 'Analytics' },
      { id: 'settings', icon: 'settings', label: 'Settings' },
    ];

    return `
      <div class="bottom-nav">
        <div class="bottom-nav-items">
          ${items.map(i => `
            <a href="#/dashboard" class="bottom-nav-item ${i.id === activePage ? 'active' : ''}">
              <span class="material-symbols-outlined">${i.icon}</span>
              ${i.label}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
};
