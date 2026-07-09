/* ============================================================
   PayOut — Help / Support Page
   ============================================================ */

function renderHelp(container) {
  const isLoggedIn = Store.get('auth.isLoggedIn');

  container.innerHTML = `
    ${isLoggedIn ? '' : Components.brandMark()}

    ${isLoggedIn ? '' : Components.navbar()}

    <main class="help-container">
      <!-- Header -->
      <header style="margin-bottom:var(--space-3xl);">
        <div style="width:24px;height:2px;background:var(--color-outline);border-radius:var(--radius-full);margin-bottom:8px;"></div>
        <p class="text-label-sm text-outline" style="margin-bottom:4px;">SUPPORT</p>
        <h1 class="text-headline-lg" style="font-size:clamp(24px, 4vw, 32px);">How can we help?</h1>
      </header>

      <!-- FAQ Section -->
      <section style="margin-bottom:var(--space-3xl);">
        <h2 style="font-size:var(--text-headline-lg-mobile);font-weight:700;margin-bottom:var(--stack-lg);">Frequently Asked Questions</h2>
        <div id="faq-list">
          ${MockData.faqs.map((faq, i) => `
            <div class="accordion-item" id="faq-${i}">
              <div class="accordion-header" onclick="toggleFaq(${i})">
                <span>${faq.q}</span>
                <span class="material-symbols-outlined">expand_more</span>
              </div>
              <div class="accordion-body">
                <div class="accordion-content">${faq.a}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Contact Section -->
      <section style="margin-bottom:var(--space-3xl);">
        <h2 style="font-size:var(--text-headline-lg-mobile);font-weight:700;margin-bottom:var(--stack-lg);">Get in Touch</h2>
        <div class="contact-grid">
          <div class="contact-card">
            <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:24px;">mail</span>
            <p style="font-weight:700;">Email</p>
            <p style="font-size:14px;color:var(--color-outline);">support@payout.in</p>
            <p style="font-size:12px;color:var(--color-outline-variant);">We respond within 4 hours</p>
          </div>
          <div class="contact-card">
            <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:24px;">call</span>
            <p style="font-weight:700;">Phone</p>
            <p style="font-size:14px;color:var(--color-outline);">+91 80-4567-8901</p>
            <p style="font-size:12px;color:var(--color-outline-variant);">Mon–Fri, 9 AM – 6 PM IST</p>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section>
        <h2 style="font-size:var(--text-headline-lg-mobile);font-weight:700;margin-bottom:var(--stack-lg);">Send us a message</h2>
        <form id="help-form" style="display:flex;flex-direction:column;gap:var(--stack-lg);" onsubmit="handleHelpSubmit(event)">
          <div class="input-group">
            <label class="input-label" for="help-name">YOUR NAME</label>
            <input type="text" id="help-name" class="input-field" placeholder="Full name" required
              value="${Store.get('business.name') || ''}">
          </div>
          <div class="input-group">
            <label class="input-label" for="help-email">EMAIL ADDRESS</label>
            <input type="email" id="help-email" class="input-field" placeholder="you@business.com" required
              value="${Store.get('auth.user')?.email || ''}">
          </div>
          <div class="input-group">
            <label class="input-label" for="help-message">MESSAGE</label>
            <textarea id="help-message" class="input-field" placeholder="How can we help you?" required
              rows="4" style="resize:vertical;min-height:100px;border-bottom-width:1px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start;">SEND MESSAGE</button>
        </form>
      </section>

      ${isLoggedIn ? `
        <div style="margin-top:var(--space-3xl);text-align:center;">
          <a href="#/dashboard" class="btn-text">← Back to Dashboard</a>
        </div>
      ` : ''}
    </main>

    ${isLoggedIn ? '' : Components.footer()}
  `;
}

function toggleFaq(index) {
  const item = document.getElementById(`faq-${index}`);
  if (item) {
    // Close all others
    document.querySelectorAll('.accordion-item.open').forEach(el => {
      if (el !== item) el.classList.remove('open');
    });
    item.classList.toggle('open');
  }
}

function handleHelpSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="material-symbols-outlined animate-spin" style="font-size:18px;">refresh</span>';
  btn.disabled = true;

  setTimeout(() => {
    Components.showToast('Message sent! We\'ll get back to you shortly.', 'success');
    btn.innerHTML = 'SEND MESSAGE';
    btn.disabled = false;
    document.getElementById('help-message').value = '';
  }, 1000);
}
