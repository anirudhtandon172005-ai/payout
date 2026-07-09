/* ============================================================
   PayOut — Campaign Step 2: Creative Upload (NEW)
   ============================================================ */

function renderCampaignStep2(container) {
  container.innerHTML = `
    ${Components.brandMark()}

    <main class="campaign-container" style="min-height:100vh;">
      <!-- Header -->
      <header style="display:flex;flex-direction:column;gap:var(--space-sm);">
        ${Components.stepIndicator(2, 3, 'Creative')}
        <h1 class="text-headline-lg" style="font-size:clamp(20px, 3vw, 24px);margin-top:8px;">Upload your campaign artwork</h1>
      </header>

      <!-- Upload Zone -->
      <div id="upload-zone" class="upload-zone" onclick="document.getElementById('file-input').click()"
        ondragover="event.preventDefault();this.classList.add('drag-over')"
        ondragleave="this.classList.remove('drag-over')"
        ondrop="handleFileDrop(event)">
        <span class="material-symbols-outlined" style="font-size:48px;color:var(--color-outline-variant);">cloud_upload</span>
        <div>
          <p style="font-weight:700;font-size:16px;margin-bottom:4px;">Drop your file here</p>
          <p style="font-size:14px;color:var(--color-outline);font-weight:500;">or click to browse</p>
        </div>
        <p style="font-size:12px;color:var(--color-outline-variant);margin-top:8px;">JPG, PNG, SVG · Max 5MB · Recommended 1080×1920</p>
        <input type="file" id="file-input" accept="image/jpeg,image/png,image/svg+xml"
          style="display:none;" onchange="handleFileSelect(event)">
      </div>

      <!-- Upload Preview (hidden initially) -->
      <div id="upload-preview" class="upload-preview">
        <img id="preview-image" class="upload-preview-image" src="" alt="Creative preview">
        <div class="upload-preview-info">
          <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:20px;">image</span>
          <div style="flex:1;min-width:0;">
            <p style="font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" id="preview-filename"></p>
            <p style="font-size:12px;color:var(--color-outline);" id="preview-dimensions"></p>
          </div>
          <button class="btn-icon" onclick="removeCreative()" title="Remove">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Creative Guidelines -->
      <section style="margin-top:8px;">
        <div class="accordion-item" id="guidelines-accordion">
          <div class="accordion-header" onclick="toggleGuidelines()">
            <span>Creative guidelines</span>
            <span class="material-symbols-outlined">expand_more</span>
          </div>
          <div class="accordion-body">
            <div class="accordion-content" style="display:flex;flex-direction:column;gap:16px;">
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:18px;margin-top:2px;">aspect_ratio</span>
                <div>
                  <p style="font-weight:700;font-size:14px;margin-bottom:2px;">Dimensions</p>
                  <p>Recommended 1080×1920px (9:16 portrait). Minimum 540×960px.</p>
                </div>
              </div>
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:18px;margin-top:2px;">photo_library</span>
                <div>
                  <p style="font-weight:700;font-size:14px;margin-bottom:2px;">File Types</p>
                  <p>JPG, PNG, or SVG. Use PNG for logos with transparency.</p>
                </div>
              </div>
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:18px;margin-top:2px;">visibility</span>
                <div>
                  <p style="font-weight:700;font-size:14px;margin-bottom:2px;">Readability</p>
                  <p>Use large, high-contrast text. Your ad will be viewed from 1–3 meters away on a rider's device.</p>
                </div>
              </div>
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <span class="material-symbols-outlined" style="color:var(--color-outline);font-size:18px;margin-top:2px;">block</span>
                <div>
                  <p style="font-weight:700;font-size:14px;margin-bottom:2px;">Restrictions</p>
                  <p>No misleading claims, no competitor trademarks, no regulated content (alcohol, tobacco).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Ad Preview Mockup -->
      <section id="ad-mockup-section" style="display:none;margin-top:16px;">
        <h3 class="text-label-sm text-outline" style="letter-spacing:0.1em;margin-bottom:var(--stack-md);">AD PREVIEW</h3>
        <div style="display:flex;justify-content:center;">
          <div style="width:200px;background:var(--color-charcoal);border-radius:24px;padding:8px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="background:var(--color-surface-container-highest);border-radius:18px;overflow:hidden;aspect-ratio:9/16;display:flex;align-items:center;justify-content:center;">
              <img id="mockup-image" src="" alt="Ad preview" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div style="display:flex;justify-content:center;margin-top:6px;">
              <div style="width:40px;height:4px;background:var(--color-outline);border-radius:2px;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Actions -->
      <footer class="campaign-footer">
        <button class="btn btn-secondary" onclick="Router.navigate('/campaign/step1')">
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_back</span>
          BACK
        </button>
        <button class="btn btn-primary" id="step2-continue" onclick="handleStep2Continue()">
          CONTINUE
          <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span>
        </button>
      </footer>
    </main>
  `;

  // Restore creative if exists
  const existingCreative = Store.get('campaignDraft.creative');
  if (existingCreative) {
    showCreativePreview(existingCreative, Store.get('campaignDraft.creativeName') || 'uploaded-file.jpg');
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function handleFileDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  if (file.size > 5 * 1024 * 1024) {
    Components.showToast('File too large. Maximum 5MB.', 'error');
    return;
  }

  if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
    Components.showToast('Invalid file type. Use JPG, PNG, or SVG.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    Store.set('campaignDraft.creative', dataUrl);
    Store.set('campaignDraft.creativeName', file.name);
    showCreativePreview(dataUrl, file.name, file.size);
  };
  reader.readAsDataURL(file);
}

function showCreativePreview(dataUrl, filename, fileSize) {
  document.getElementById('upload-zone').style.display = 'none';

  const preview = document.getElementById('upload-preview');
  preview.classList.add('visible');

  const img = document.getElementById('preview-image');
  img.src = dataUrl;

  document.getElementById('preview-filename').textContent = filename;

  img.onload = function () {
    const dims = `${this.naturalWidth}×${this.naturalHeight}`;
    const size = fileSize ? ` · ${(fileSize / 1024).toFixed(0)}KB` : '';
    document.getElementById('preview-dimensions').textContent = dims + size;
  };

  // Show mockup
  document.getElementById('ad-mockup-section').style.display = 'block';
  document.getElementById('mockup-image').src = dataUrl;

  Components.showToast('Creative uploaded', 'success');
}

function removeCreative() {
  Store.set('campaignDraft.creative', null);
  Store.set('campaignDraft.creativeName', '');

  document.getElementById('upload-zone').style.display = '';
  document.getElementById('upload-preview').classList.remove('visible');
  document.getElementById('ad-mockup-section').style.display = 'none';
  document.getElementById('file-input').value = '';
}

function toggleGuidelines() {
  document.getElementById('guidelines-accordion').classList.toggle('open');
}

function handleStep2Continue() {
  const creative = Store.get('campaignDraft.creative');
  if (!creative) {
    // Use sample creative for demo purposes
    Store.set('campaignDraft.creative', MockData.assets.creativeSample);
    Store.set('campaignDraft.creativeName', 'promo-banner-final.jpg');
    Components.showToast('Using sample creative for demo', 'info');
  }
  Router.navigate('/campaign/step3');
}
