/* ============================================================
   PayOut — Campaign Step 3: Review & Pay
   ============================================================ */

function renderCampaignStep3(container) {
  const draft = Store.get('campaignDraft');
  const price = MockData.formatCurrency(draft.price || 4200);
  const startTime = getFormattedTime(draft.timeStep || 22);
  const endTime = getFormattedTime((draft.timeStep || 22) + ((draft.duration || 3) * 2));
  const scope = draft.scope === 'local'
    ? `Local · ${draft.radius || 20} km radius`
    : `National · ${draft.tier === 'tier12' ? 'Tier 1 + 2' : draft.tier === 'metro' ? 'Metro Cities' : 'Pan-India'}`;

  container.innerHTML = `
    <!-- Header -->
    <header style="padding:var(--stack-md) var(--margin-mobile);display:flex;align-items:center;">
      <a href="#/"><img src="${MockData.assets.payBtn}" alt="PayOut" style="width:40px;height:40px;object-fit:contain;"></a>
    </header>

    <!-- Main Content -->
    <main style="flex:1;padding:var(--stack-lg) var(--margin-mobile);max-width:var(--container-max);margin:0 auto;width:100%;display:flex;gap:var(--margin-desktop);align-items:center;" class="checkout-layout" id="checkout-view">

      <!-- Left Column: Checkout Details -->
      <div class="checkout-content" id="checkout-content" style="transition:opacity 0.3s;">
        <div style="margin-bottom:var(--stack-lg);">
          ${Components.stepIndicator(3, 3, 'Review & Pay')}
          <h1 class="text-headline-lg" style="font-size:clamp(20px, 3vw, 24px);margin-top:12px;">Review your campaign</h1>
        </div>

        <!-- Summary Card -->
        <div class="card-summary" style="margin-bottom:var(--stack-lg);">
          <!-- Campaign -->
          <div style="display:flex;align-items:flex-start;gap:var(--stack-md);padding:var(--space-sm) 0;">
            <span class="material-symbols-outlined text-outline">location_on</span>
            <div>
              <p class="text-label-sm text-outline" style="margin-bottom:4px;">CAMPAIGN</p>
              <p style="font-weight:600;">${scope}</p>
            </div>
          </div>

          <div class="divider" style="margin:var(--space-sm) 0;"></div>

          <!-- Window -->
          <div style="display:flex;align-items:flex-start;gap:var(--stack-md);padding:var(--space-sm) 0;">
            <span class="material-symbols-outlined text-outline">schedule</span>
            <div>
              <p class="text-label-sm text-outline" style="margin-bottom:4px;">WINDOW</p>
              <p class="font-mono" style="font-weight:700;">${startTime} – ${endTime}</p>
              <p style="font-size:14px;color:var(--color-outline-variant);margin-top:4px;">${draft.duration || 3} hour slot</p>
            </div>
          </div>

          <div class="divider" style="margin:var(--space-sm) 0;"></div>

          <!-- Creative -->
          <div style="display:flex;align-items:center;gap:var(--stack-md);padding:var(--space-sm) 0;">
            <div style="width:48px;height:48px;border-radius:8px;overflow:hidden;background:var(--color-surface-variant);flex-shrink:0;">
              <img src="${draft.creative || MockData.assets.creativeSample}" alt="Creative" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div>
              <p class="text-label-sm text-outline" style="margin-bottom:4px;">CREATIVE</p>
              <p style="font-weight:600;max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${draft.creativeName || 'promo-banner-final.jpg'}</p>
            </div>
          </div>
        </div>

        <!-- Total Section -->
        <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid var(--color-charcoal);padding-bottom:var(--space-sm);margin-bottom:var(--stack-lg);">
          <div>
            <h3 class="text-label-sm" style="color:var(--color-charcoal);margin-bottom:8px;">TOTAL</h3>
            <p style="font-size:14px;color:var(--color-outline-variant);">Includes all platform fees.</p>
          </div>
          <span class="font-mono" style="font-size:clamp(28px, 5vw, 40px);font-weight:700;line-height:1;">${price}</span>
        </div>

        <!-- Payment Method -->
        <div style="margin-bottom:var(--stack-lg);">
          <h3 class="text-label-sm" style="color:var(--color-charcoal);margin-bottom:var(--space-sm);">PAYMENT METHOD</h3>
          <div class="payment-placeholder">
            <span class="material-symbols-outlined text-outline">credit_card</span>
            <span style="font-size:14px;color:var(--color-outline-variant);font-weight:600;">Secure Checkout via Razorpay</span>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--stack-md);">
          <button class="btn btn-primary btn-full" id="pay-btn" onclick="handlePayment()">
            PAY ${price}
          </button>
          <button class="btn-text" onclick="Router.navigate('/campaign/step1')">Edit campaign</button>
        </div>
      </div>

      <!-- Right Column: Visual -->
      <div class="checkout-visual" id="artwork-column">
        <img src="${MockData.assets.growthVisual}" alt="A system made for your growth"
          style="max-width:100%;height:auto;object-fit:contain;filter:drop-shadow(0 4px 16px rgba(0,0,0,0.1));">
      </div>
    </main>
  `;
}

function handlePayment() {
  const btn = document.getElementById('pay-btn');
  btn.innerHTML = '<span class="material-symbols-outlined animate-spin" style="font-size:20px;">refresh</span>';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    const draft = Store.get('campaignDraft');
    const content = document.getElementById('checkout-content');
    const main = document.getElementById('checkout-view');

    content.style.opacity = '0';

    setTimeout(() => {
      // Create the campaign
      const newCampaign = {
        id: 'camp-' + Date.now(),
        name: Store.get('business.name') + ' Campaign',
        status: 'pending',
        scope: draft.scope,
        location: draft.location || 'Downtown Business District',
        radius: draft.radius || 20,
        tier: draft.tier,
        window: `${getFormattedTime(draft.timeStep)} – ${getFormattedTime(draft.timeStep + (draft.duration * 2))}`,
        duration: `${draft.duration} hours`,
        totalBudget: draft.price,
        spent: 0,
        views: 0,
        creative: draft.creativeName || 'promo-banner-final.jpg',
        createdAt: new Date().toISOString(),
        startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
      };

      Store.addCampaign(newCampaign);
      Store.resetCampaignDraft();

      // Show success
      content.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;padding:48px 0;animation:fadeInUp 0.6s ease-out;">
          <div style="width:64px;height:64px;border-radius:50%;background:rgba(46,125,50,0.1);display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="font-size:32px;color:var(--color-success);">check_circle</span>
          </div>
          <h2 class="font-accent" style="font-size:40px;line-height:1;">Reserved.</h2>
          <p style="font-size:14px;color:var(--color-outline);max-width:360px;line-height:1.6;">
            Your campaign has been submitted and payment processed. It will go live within the hour.
          </p>
          <div style="display:flex;gap:16px;margin-top:16px;">
            <a href="#/dashboard" class="btn btn-primary">View Dashboard</a>
            <a href="#/campaign/step1" class="btn btn-secondary">New Campaign</a>
          </div>
        </div>
      `;
      content.style.opacity = '1';

      Components.showToast('Payment successful! Campaign is live.', 'success');
    }, 300);
  }, 1500);
}
