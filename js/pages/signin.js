/* ============================================================
   PayOut — Sign In Page
   ============================================================ */

function renderSignIn(container) {
  container.innerHTML = `
    <!-- Fixed brand mark -->
    <div style="position:absolute;top:24px;left:24px;z-index:10;">
      <a href="#/"><img src="${MockData.assets.signinBrandMark}" alt="PayOut" style="width:40px;height:40px;object-fit:contain;"></a>
    </div>

    <div class="signin-container">
      <!-- Login Form Section -->
      <section class="signin-form-section">
        <!-- Logo -->
        <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:32px;">
          <img src="${MockData.assets.logoFull}" alt="PayOut Logo" style="height:80px;width:auto;object-fit:contain;">
        </div>

        <!-- Tagline -->
        <h2 class="text-label-sm" style="text-align:center;margin-bottom:48px;color:var(--color-on-surface-variant);">RESERVE ATTENTION WHERE IT MATTERS</h2>

        <!-- Google Button -->
        <button class="btn-google" style="margin-bottom:32px;" onclick="handleGoogleSignIn()">
          ${Components.googleIcon()}
          <span>Continue with Google</span>
        </button>

        <!-- Divider -->
        <div class="signin-divider">
          <div class="signin-divider-line"></div>
          <span class="signin-divider-text">or continue with mail</span>
          <div class="signin-divider-line"></div>
        </div>

        <!-- Email Form -->
        <form id="signin-form" style="width:100%;max-width:380px;display:flex;flex-direction:column;align-items:center;" onsubmit="handleEmailSignIn(event)">
          <div class="input-group" style="width:100%;margin-bottom:40px;">
            <label class="input-label" for="signin-email">EMAIL</label>
            <input
              type="email"
              id="signin-email"
              class="input-field"
              placeholder="address@domain.com"
              required
              autocomplete="email"
            >
          </div>
          <button type="submit" class="btn btn-primary" style="max-width:200px;">CONTINUE</button>
        </form>
      </section>

      <!-- Visual Section -->
      <section class="signin-visual-section">
        <img src="${MockData.assets.heroVisual}" alt="Promote WHERE IT Matters!!" style="max-width:100%;height:auto;max-height:500px;object-fit:contain;">
      </section>
    </div>
  `;
}

function handleGoogleSignIn() {
  // Simulate Google OAuth
  Store.login('user@gmail.com');
  Components.showToast('Signed in with Google', 'success');
  redirectAfterAuth();
}

function handleEmailSignIn(e) {
  e.preventDefault();
  const email = document.getElementById('signin-email').value;
  if (email) {
    Store.login(email);
    Components.showToast(`Signed in as ${email}`, 'success');
    redirectAfterAuth();
  }
}

function redirectAfterAuth() {
  setTimeout(() => {
    if (Store.get('business.isOnboarded')) {
      Router.navigate('/dashboard');
    } else {
      Router.navigate('/onboarding');
    }
  }, 500);
}
