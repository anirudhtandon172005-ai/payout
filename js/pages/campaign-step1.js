/* ============================================================
   PayOut — Campaign Step 1: Location & Time
   ============================================================ */

let campaignStep1State = {
  scope: 'local',
  duration: 3,
  currentStep: 22,
  isDragging: false,
  startX: 0,
  startLeft: 0
};

function renderCampaignStep1(container) {
  const draft = Store.get('campaignDraft');
  campaignStep1State.scope = draft.scope || 'local';
  campaignStep1State.duration = draft.duration || 3;
  campaignStep1State.currentStep = draft.timeStep || 22;

  container.innerHTML = `
    ${Components.brandMark()}

    <main class="campaign-container" style="min-height:100vh;">
      <!-- Header -->
      <header style="display:flex;flex-direction:column;gap:var(--space-sm);">
        ${Components.stepIndicator(1, 3, 'Campaign Setup')}
        <h1 class="text-headline-lg" style="font-size:clamp(20px, 3vw, 24px);margin-top:8px;">Where should this campaign run?</h1>
      </header>

      <!-- Scope Selection -->
      <section style="display:flex;flex-direction:column;gap:var(--stack-md);">
        <div class="grid grid-cols-2" style="gap:var(--gutter);">
          <!-- Local Card -->
          <label class="card-selectable ${campaignStep1State.scope === 'local' ? 'selected' : ''}" id="scope-local-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span style="font-weight:600;">Local</span>
              <input type="radio" name="scope" value="local" class="custom-radio" ${campaignStep1State.scope === 'local' ? 'checked' : ''}
                onchange="handleScopeChange('local')">
            </div>
            <p style="font-size:14px;color:var(--color-on-surface-variant);font-weight:500;margin-top:8px;">Reach people near a specific location</p>
          </label>

          <!-- National Card -->
          <label class="card-selectable ${campaignStep1State.scope === 'national' ? 'selected' : ''}" id="scope-national-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span style="font-weight:600;">National</span>
              <input type="radio" name="scope" value="national" class="custom-radio" ${campaignStep1State.scope === 'national' ? 'checked' : ''}
                onchange="handleScopeChange('national')">
            </div>
            <p style="font-size:14px;color:var(--color-on-surface-variant);font-weight:500;margin-top:8px;">Reach people across the country</p>
          </label>
        </div>
      </section>

      <!-- Local Details -->
      <section id="local-details" class="scope-details ${campaignStep1State.scope === 'local' ? 'visible' : 'hidden'}" style="display:flex;flex-direction:column;gap:var(--stack-md);">
        <label class="text-label-sm text-outline" style="letter-spacing:0.1em;">SET YOUR LOCATION</label>
        <div class="map-placeholder">
          <img src="${MockData.assets.mapPlaceholder}" alt="Map">
          <div class="map-pin">
            <span class="material-symbols-outlined" style="font-size:36px;color:var(--color-on-surface);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">location_on</span>
          </div>
          <div class="map-search">
            <span class="material-symbols-outlined" style="color:var(--color-outline);margin-right:8px;font-size:18px;">search</span>
            <input type="text" placeholder="Search location..." value="Downtown Business District"
              id="location-input" onchange="Store.set('campaignDraft.location', this.value)">
          </div>
        </div>
        <p style="font-size:14px;color:var(--color-outline);font-weight:500;margin-top:4px;">Your campaign covers a 20 km radius around this point.</p>
      </section>

      <!-- National Details -->
      <section id="national-details" class="scope-details ${campaignStep1State.scope === 'national' ? 'visible' : 'hidden'}" style="display:flex;flex-direction:column;gap:var(--stack-md);">
        <label class="text-label-sm text-outline" style="letter-spacing:0.1em;">REACH TIER</label>
        <div class="grid grid-cols-3" style="gap:var(--gutter);">
          ${['metro|Metro Cities', 'tier12|Tier 1 + 2', 'panindia|Pan-India'].map(item => {
            const [val, label] = item.split('|');
            return `
              <label class="card-selectable" style="padding:16px;display:flex;align-items:center;gap:12px;border-radius:12px;border-width:1px;">
                <input type="radio" name="tier" value="${val}" class="custom-radio" ${val === 'tier12' ? 'checked' : ''}
                  onchange="Store.set('campaignDraft.tier', '${val}')">
                <span style="font-size:14px;font-weight:600;">${label}</span>
              </label>
            `;
          }).join('')}
        </div>
      </section>

      <div class="divider"></div>

      <!-- Duration Selection -->
      <section style="display:flex;flex-direction:column;gap:var(--stack-md);">
        <h2 class="text-label-sm text-outline" style="letter-spacing:0.1em;">HOW LONG SHOULD THIS SLOT RUN?</h2>
        <div class="grid grid-cols-2" style="gap:var(--gutter);">
          <label class="card-selectable ${campaignStep1State.duration === 3 ? 'selected' : ''}" id="duration-3-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span style="font-weight:600;">3 HOURS</span>
              <input type="radio" name="duration" value="3" class="custom-radio" ${campaignStep1State.duration === 3 ? 'checked' : ''}
                onchange="handleDurationChange(3)">
            </div>
            <p style="font-size:14px;color:var(--color-on-surface-variant);font-weight:500;margin-top:8px;">Shorter window, tighter reach</p>
          </label>
          <label class="card-selectable ${campaignStep1State.duration === 5 ? 'selected' : ''}" id="duration-5-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span style="font-weight:600;">5 HOURS</span>
              <input type="radio" name="duration" value="5" class="custom-radio" ${campaignStep1State.duration === 5 ? 'checked' : ''}
                onchange="handleDurationChange(5)">
            </div>
            <p style="font-size:14px;color:var(--color-on-surface-variant);font-weight:500;margin-top:8px;">Longer window, broader reach</p>
          </label>
        </div>
      </section>

      <!-- Timeline Section -->
      <section style="display:flex;flex-direction:column;gap:var(--stack-md);margin-top:16px;">
        <h2 class="text-headline-lg" style="font-size:clamp(20px, 3vw, 24px);">Choose your time block</h2>
        <div class="timeline-track" id="timeline-container">
          <div class="timeline-handle" id="timeline-handle"
            style="left:${(campaignStep1State.currentStep / 48) * 100}%;width:${(campaignStep1State.duration / 24) * 100}%;"
            tabindex="0" role="slider" aria-label="Time block selector">
            <div class="timeline-handle-grip">
              <div class="timeline-handle-grip-line"></div>
              <div class="timeline-handle-grip-line"></div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:8px;">
          <p class="font-mono" style="font-size:18px;font-weight:600;" id="time-readout"></p>
        </div>
      </section>

      <!-- Price Display -->
      <section id="price-section" style="margin-top:32px;padding-top:32px;border-top:1px solid rgba(196,199,199,0.3);text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;transition:opacity 0.3s;">
        <h2 class="text-label-sm text-outline" style="letter-spacing:0.1em;">YOUR PRICE</h2>
        <p class="font-mono" style="font-size:40px;font-weight:700;" id="price-display"></p>
        <p style="font-size:14px;color:var(--color-outline);font-weight:500;margin-top:8px;">Based on expected reach during this window.</p>
      </section>

      <!-- Footer Actions -->
      <footer class="campaign-footer">
        <button class="btn btn-secondary" onclick="Components.showToast('Campaign saved as draft', 'info');Router.navigate('/dashboard')">SAVE FOR LATER</button>
        <button class="btn btn-primary" onclick="saveCampaignStep1();Router.navigate('/campaign/step2')">
          CONTINUE
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
        </button>
      </footer>
    </main>
  `;

  // Initialize timeline
  initTimeline();
  updateTimeReadout();
  updateCampaignPrice();
}

function handleScopeChange(scope) {
  campaignStep1State.scope = scope;
  Store.set('campaignDraft.scope', scope);

  document.getElementById('scope-local-card').classList.toggle('selected', scope === 'local');
  document.getElementById('scope-national-card').classList.toggle('selected', scope === 'national');

  document.getElementById('local-details').className = `scope-details ${scope === 'local' ? 'visible' : 'hidden'}`;
  document.getElementById('national-details').className = `scope-details ${scope === 'national' ? 'visible' : 'hidden'}`;
}

function handleDurationChange(hours) {
  campaignStep1State.duration = hours;
  Store.set('campaignDraft.duration', hours);

  document.getElementById('duration-3-card').classList.toggle('selected', hours === 3);
  document.getElementById('duration-5-card').classList.toggle('selected', hours === 5);

  const handle = document.getElementById('timeline-handle');
  handle.style.width = `${(hours / 24) * 100}%`;

  // Constrain step
  const maxStep = 48 - (hours * 2);
  if (campaignStep1State.currentStep > maxStep) {
    campaignStep1State.currentStep = maxStep;
    handle.style.left = `${(campaignStep1State.currentStep / 48) * 100}%`;
  }

  updateTimeReadout();
  updateCampaignPrice();
}

function getFormattedTime(stepIndex) {
  let hour = 6 + Math.floor(stepIndex / 2);
  let mins = (stepIndex % 2 === 0) ? '00' : '30';
  let period = 'AM';

  if (hour >= 24) { hour -= 24; period = 'AM'; }
  else if (hour >= 12) { period = 'PM'; if (hour > 12) hour -= 12; }
  if (hour === 0) hour = 12;

  return `${hour}:${mins} ${period}`;
}

function updateTimeReadout() {
  const startTime = getFormattedTime(campaignStep1State.currentStep);
  const endTime = getFormattedTime(campaignStep1State.currentStep + (campaignStep1State.duration * 2));
  const readout = document.getElementById('time-readout');
  if (readout) readout.innerText = `Selected window: ${startTime} – ${endTime}`;
}

function updateCampaignPrice() {
  let baseRate = campaignStep1State.duration === 3 ? 3000 : 4500;
  if (campaignStep1State.currentStep > 20 && campaignStep1State.currentStep < 36) {
    baseRate += 1200;
  }
  Store.set('campaignDraft.price', baseRate);
  Store.set('campaignDraft.timeStep', campaignStep1State.currentStep);

  const display = document.getElementById('price-display');
  if (display) display.innerText = MockData.formatCurrency(baseRate);
}

function initTimeline() {
  const container = document.getElementById('timeline-container');
  const handle = document.getElementById('timeline-handle');
  if (!container || !handle) return;

  handle.addEventListener('mousedown', (e) => startTimelineDrag(e, container, handle));
  handle.addEventListener('touchstart', (e) => startTimelineDrag(e.touches[0], container, handle), { passive: true });

  handle.addEventListener('keydown', (e) => {
    const maxStep = 48 - (campaignStep1State.duration * 2);
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (campaignStep1State.currentStep < maxStep) {
        campaignStep1State.currentStep++;
        handle.style.left = `${(campaignStep1State.currentStep / 48) * 100}%`;
        updateTimeReadout();
        updateCampaignPrice();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (campaignStep1State.currentStep > 0) {
        campaignStep1State.currentStep--;
        handle.style.left = `${(campaignStep1State.currentStep / 48) * 100}%`;
        updateTimeReadout();
        updateCampaignPrice();
      }
    }
  });
}

function startTimelineDrag(e, container, handle) {
  campaignStep1State.isDragging = true;
  campaignStep1State.startX = e.clientX;
  const rect = container.getBoundingClientRect();
  campaignStep1State.startLeft = handle.getBoundingClientRect().left - rect.left;

  const onDrag = (ev) => {
    if (!campaignStep1State.isDragging) return;
    const clientX = ev.clientX || (ev.touches && ev.touches[0].clientX);
    if (!clientX) return;

    const dx = clientX - campaignStep1State.startX;
    const rect = container.getBoundingClientRect();
    let newLeft = campaignStep1State.startLeft + dx;

    const maxLeft = rect.width - handle.offsetWidth;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;

    const percentage = newLeft / rect.width;
    const maxStep = 48 - (campaignStep1State.duration * 2);
    let targetStep = Math.round(percentage * 48);
    if (targetStep > maxStep) targetStep = maxStep;

    if (targetStep !== campaignStep1State.currentStep) {
      campaignStep1State.currentStep = targetStep;
      handle.style.left = `${(targetStep / 48) * 100}%`;
      updateTimeReadout();
    }
  };

  const endDrag = () => {
    campaignStep1State.isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);
    updateCampaignPrice();
  };

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag, { passive: true });
  document.addEventListener('touchend', endDrag);
}

function saveCampaignStep1() {
  const loc = document.getElementById('location-input');
  if (loc) Store.set('campaignDraft.location', loc.value);
}
