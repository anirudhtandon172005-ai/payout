/* ============================================================
   PayOut — App Initialization
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Register routes
  Router.register('/', renderLanding);
  Router.register('/signin', renderSignIn);
  Router.register('/onboarding', renderOnboarding);
  Router.register('/campaign/step1', renderCampaignStep1);
  Router.register('/campaign/step2', renderCampaignStep2);
  Router.register('/campaign/step3', renderCampaignStep3);
  Router.register('/dashboard', renderDashboard);
  Router.register('/help', renderHelp);

  // Initialize router
  Router.init('app');
});
