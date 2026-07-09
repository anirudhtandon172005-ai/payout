/* ============================================================
   PayOut — Vendor Dashboard (NEW)
   ============================================================ */

function renderDashboard(container) {
  const businessName = Store.get('business.name') || 'My Business';
  const greeting = MockData.getGreeting();
  const stats = MockData.getTotalStats();
  const userCampaigns = Store.get('campaigns') || [];
  const allCampaigns = [...userCampaigns, ...MockData.campaigns];

  container.innerHTML = `
    <div class="dashboard-layout">
      ${Components.sidebar('dashboard')}

      <main class="dashboard-content">
        <!-- Welcome Header -->
        <header style="margin-bottom:var(--stack-lg);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
            <div>
              <p class="text-label-sm text-outline" style="margin-bottom:4px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <h1 style="font-size:clamp(24px, 4vw, 32px);font-weight:700;">${greeting}, <span class="font-accent" style="font-size:clamp(28px, 4.5vw, 36px);">${businessName}</span></h1>
            </div>
            <a href="#/campaign/step1" class="btn btn-primary">
              <span class="material-symbols-outlined" style="font-size:18px;">add</span>
              New Campaign
            </a>
          </div>
        </header>

        <!-- Stats Grid -->
        <section class="stats-grid" style="margin-bottom:var(--stack-lg);">
          <div class="stat-card">
            <p class="stat-card-label">Active Campaigns</p>
            <p class="stat-card-value">${stats.active}</p>
            <p class="stat-card-sub">running now</p>
          </div>
          <div class="stat-card">
            <p class="stat-card-label">Total Views</p>
            <p class="stat-card-value">${stats.totalViews.toLocaleString()}</p>
            <p class="stat-card-sub">across all campaigns</p>
          </div>
          <div class="stat-card">
            <p class="stat-card-label">Amount Spent</p>
            <p class="stat-card-value">${MockData.formatCurrency(stats.totalSpent)}</p>
            <p class="stat-card-sub">lifetime</p>
          </div>
          <div class="stat-card">
            <p class="stat-card-label">Avg. Cost/View</p>
            <p class="stat-card-value">₹${stats.avgCost}</p>
            <p class="stat-card-sub">blended rate</p>
          </div>
        </section>

        <!-- Campaigns Section -->
        <section style="margin-bottom:var(--stack-lg);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--stack-md);">
            <h2 style="font-size:var(--text-headline-lg-mobile);font-weight:700;">Your Campaigns</h2>
            <button class="btn-text" style="font-size:12px;">View all</button>
          </div>

          ${allCampaigns.length > 0 ? `
            <div class="campaign-list">
              ${allCampaigns.map(c => `
                <div class="campaign-card" onclick="viewCampaignDetail('${c.id}')">
                  <div style="width:48px;height:48px;border-radius:12px;background:var(--color-surface-container-highest);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <span class="material-symbols-outlined" style="font-size:24px;color:var(--color-outline);">
                      ${c.scope === 'local' ? 'location_on' : 'public'}
                    </span>
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                      <p style="font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</p>
                      <span class="badge ${MockData.getStatusBadgeClass(c.status)}">${c.status}</span>
                    </div>
                    <p style="font-size:13px;color:var(--color-outline);font-weight:500;">
                      ${c.location || c.tier || ''} · ${c.window} · ${c.duration}
                    </p>
                  </div>
                  <div style="text-align:right;flex-shrink:0;" class="hide-mobile">
                    <p class="font-mono" style="font-weight:700;font-size:15px;">${c.views.toLocaleString()} views</p>
                    <p style="font-size:12px;color:var(--color-outline);">${MockData.formatCurrency(c.spent)} of ${MockData.formatCurrency(c.totalBudget)}</p>
                  </div>
                  <span class="material-symbols-outlined" style="color:var(--color-outline-variant);font-size:20px;flex-shrink:0;">chevron_right</span>
                </div>
              `).join('')}
            </div>
          ` : Components.emptyState(
            'campaign',
            'No campaigns yet',
            'Create your first campaign to start reaching customers in your area.',
            'Create Campaign',
            '#/campaign/step1'
          )}
        </section>

        <!-- Recent Activity -->
        <section>
          <h2 style="font-size:var(--text-headline-lg-mobile);font-weight:700;margin-bottom:var(--stack-md);">Recent Activity</h2>
          <div class="activity-feed">
            ${MockData.activity.map(a => `
              <div class="activity-item">
                <div class="activity-dot ${a.active ? 'active' : ''}"></div>
                <div style="flex:1;">
                  <p style="font-size:14px;font-weight:600;">${a.message}</p>
                  <p style="font-size:12px;color:var(--color-outline);margin-top:2px;">${a.time}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </main>

      ${Components.bottomNav('dashboard')}
    </div>
  `;
}

function viewCampaignDetail(id) {
  const allCampaigns = [...(Store.get('campaigns') || []), ...MockData.campaigns];
  const campaign = allCampaigns.find(c => c.id === id);
  if (!campaign) return;

  Components.showModal(
    campaign.name,
    `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="badge ${MockData.getStatusBadgeClass(campaign.status)}">${campaign.status}</span>
          <span style="font-size:13px;color:var(--color-outline);">Created ${new Date(campaign.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="divider"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <p class="text-label-sm text-outline" style="margin-bottom:4px;">SCOPE</p>
            <p style="font-weight:600;">${campaign.scope === 'local' ? campaign.location : campaign.tier}</p>
          </div>
          <div>
            <p class="text-label-sm text-outline" style="margin-bottom:4px;">WINDOW</p>
            <p class="font-mono" style="font-weight:600;">${campaign.window}</p>
          </div>
          <div>
            <p class="text-label-sm text-outline" style="margin-bottom:4px;">VIEWS</p>
            <p class="font-mono" style="font-weight:700;font-size:20px;">${campaign.views.toLocaleString()}</p>
          </div>
          <div>
            <p class="text-label-sm text-outline" style="margin-bottom:4px;">BUDGET</p>
            <p class="font-mono" style="font-weight:700;font-size:20px;">${MockData.formatCurrency(campaign.spent)} / ${MockData.formatCurrency(campaign.totalBudget)}</p>
          </div>
        </div>
        <div class="divider"></div>
        <div>
          <p class="text-label-sm text-outline" style="margin-bottom:4px;">CREATIVE</p>
          <p style="font-weight:600;">${campaign.creative}</p>
        </div>
      </div>
    `,
    `<button class="btn btn-primary btn-sm" onclick="Components.closeModal()">Close</button>`
  );
}
