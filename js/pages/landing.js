/* ============================================================
   PayOut — Landing Page
   ============================================================ */

function renderLanding(container) {
  container.innerHTML = `
    ${Components.navbar()}

    <main class="container" style="padding-bottom:128px;">
      <!-- Hero Section -->
      <section class="landing-hero">
        <div style="order:2;display:flex;flex-direction:column;align-items:flex-start;gap:32px;animation:fadeInUp 0.8s ease-out forwards;">
          <span class="text-label-sm text-on-surface-variant" style="letter-spacing:0.1em;">FOR RESTAURANTS, BRANDS & LOCAL BUSINESS</span>
          <div style="position:relative;">
            <h1 class="text-headline-lg" style="font-size:clamp(20px, 4vw, 36px);line-height:1.2;">Every ad here pays someone real.</h1>
            <span class="font-accent" style="font-size:clamp(18px, 3vw, 28px);color:var(--color-secondary);position:absolute;bottom:-32px;right:0;transform:rotate(-5deg);">everybody wins.</span>
          </div>
          <a href="#/signin" class="btn btn-primary" style="margin-top:16px;">LIST YOUR BUSINESS</a>
        </div>

        <div style="order:1;display:flex;justify-content:center;animation:fadeInUp 0.8s ease-out 0.2s both;" class="landing-receipt-wrapper">
          ${Components.receiptPaper()}
        </div>
      </section>

      <!-- CTA Section -->
      <section class="landing-cta-section">
        <span class="font-accent" style="font-size:clamp(18px, 3vw, 28px);color:var(--color-secondary);transform:rotate(-3deg);position:absolute;top:48px;margin-left:192px;">ready when you are.</span>
        <h2 class="text-headline-lg" style="font-size:clamp(20px, 4vw, 36px);max-width:640px;margin-top:16px;">List your business in two minutes.</h2>
        <a href="#/signin" class="btn btn-primary">LIST YOUR BUSINESS</a>
      </section>
    </main>

    ${Components.footer()}
  `;
}
