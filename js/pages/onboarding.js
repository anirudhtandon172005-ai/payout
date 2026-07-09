/* ============================================================
   PayOut — Business Onboarding Page
   ============================================================ */

function renderOnboarding(container) {
  container.innerHTML = `
    ${Components.brandMark()}

    <main class="onboarding-container">
      <!-- Form State -->
      <div id="onboarding-form-state" style="display:flex;flex-direction:column;gap:var(--stack-lg);transition:opacity 0.4s ease-in-out;">
        <!-- Header -->
        <header style="display:flex;flex-direction:column;gap:var(--space-sm);margin-bottom:var(--stack-md);">
          <div style="width:24px;height:2px;background:var(--color-outline);border-radius:var(--radius-full);margin-bottom:8px;"></div>
          <p class="text-label-sm text-outline">STEP 1 OF 1 — SETUP</p>
          <h1 class="text-headline-lg" style="font-size:clamp(24px, 4vw, 32px);">Tell us about your business</h1>
        </header>

        <!-- Form -->
        <form id="onboarding-form" style="display:flex;flex-direction:column;gap:var(--stack-lg);" onsubmit="handleOnboardingSubmit(event)">
          <!-- Business Name -->
          <div class="input-group">
            <label class="input-label" for="business-name">BUSINESS NAME</label>
            <input type="text" id="business-name" class="input-field" placeholder="e.g. Acme Corp" required>
          </div>

          <!-- Category -->
          <div class="input-group">
            <label class="input-label" for="category">CATEGORY</label>
            <div class="select-wrapper">
              <select id="category" class="select-field" required>
                <option value="" disabled selected>Select category...</option>
                <option value="restaurant">Restaurant</option>
                <option value="retail">Retail</option>
                <option value="brand">Brand</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
              <span class="select-arrow material-symbols-outlined">expand_more</span>
            </div>
          </div>

          <!-- GSTIN or PAN -->
          <div class="input-group">
            <label class="input-label" for="tax-id">GSTIN OR PAN</label>
            <input type="text" id="tax-id" class="input-field" placeholder="Enter ID" required
              style="text-transform:uppercase;" oninput="this.value=this.value.toUpperCase()">
            <p id="tax-error" class="input-error">That doesn't match a GSTIN or PAN format. Double check and try again.</p>
          </div>

          <!-- Phone -->
          <div class="input-group">
            <label class="input-label" for="phone">PRIMARY CONTACT NUMBER</label>
            <div class="input-phone-wrapper">
              <span class="input-phone-prefix">+91</span>
              <input type="tel" id="phone" class="input-field" placeholder="98765 43210" required
                pattern="[0-9]{10}" maxlength="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
            </div>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Submit -->
          <button type="submit" class="btn btn-primary btn-full" id="onboarding-submit-btn">SUBMIT FOR VERIFICATION</button>
        </form>

        <!-- Footer -->
        <footer style="text-align:center;">
          <p style="font-size:14px;line-height:1.6;color:var(--color-outline);">Verification typically takes under 24 hours.<br>You'll be notified by email.</p>
        </footer>
      </div>

      <!-- Success State -->
      <div id="onboarding-success-state" class="onboarding-success">
        <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
          <img src="${MockData.assets.onboardingSuccess}" alt="PayOut" style="width:clamp(192px, 40vw, 256px);height:auto;object-fit:contain;margin-bottom:16px;">
          <h2 class="font-accent" style="font-size:clamp(32px, 5vw, 40px);color:var(--color-on-surface);line-height:1;letter-spacing:-0.02em;">Reserved.</h2>
          <p style="font-size:14px;color:var(--color-outline);max-width:320px;margin:0 auto;margin-top:16px;line-height:1.6;">Your business details have been securely submitted. Our team will review and verify your account shortly.</p>
        </div>
        <button class="btn btn-secondary" onclick="Router.navigate('/dashboard')" style="margin-top:var(--stack-lg);">Go to Dashboard</button>
      </div>
    </main>
  `;

  // Tax ID validation on blur
  const taxInput = document.getElementById('tax-id');
  const taxError = document.getElementById('tax-error');

  taxInput.addEventListener('blur', function () {
    const val = this.value.trim().toUpperCase();
    const isPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val);
    const isGstin = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val);

    if (val.length > 0 && !isPan && !isGstin) {
      taxError.classList.add('visible');
      taxInput.classList.add('error');
    } else {
      taxError.classList.remove('visible');
      taxInput.classList.remove('error');
    }
  });
}

function handleOnboardingSubmit(e) {
  e.preventDefault();

  const taxError = document.getElementById('tax-error');
  if (taxError.classList.contains('visible')) {
    document.getElementById('tax-id').focus();
    return;
  }

  const data = {
    name: document.getElementById('business-name').value,
    category: document.getElementById('category').value,
    taxId: document.getElementById('tax-id').value,
    phone: document.getElementById('phone').value
  };

  // Animate transition
  const formState = document.getElementById('onboarding-form-state');
  const successState = document.getElementById('onboarding-success-state');
  const btn = document.getElementById('onboarding-submit-btn');

  btn.innerHTML = '<span class="material-symbols-outlined animate-spin" style="font-size:20px;">refresh</span>';
  btn.disabled = true;

  setTimeout(() => {
    Store.completeOnboarding(data);

    formState.style.opacity = '0';
    formState.style.pointerEvents = 'none';

    setTimeout(() => {
      formState.style.display = 'none';
      successState.classList.add('visible');
      Components.showToast('Business submitted for verification', 'success');
    }, 400);
  }, 1200);
}
