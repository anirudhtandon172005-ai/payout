/* ============================================================
   PayOut — State Management
   ============================================================ */

const Store = {
  _state: {
    auth: {
      isLoggedIn: false,
      user: null
    },
    business: {
      isOnboarded: false,
      name: '',
      category: '',
      taxId: '',
      phone: ''
    },
    campaignDraft: {
      scope: 'local',
      location: 'Downtown Business District',
      radius: 20,
      tier: 'tier12',
      duration: 3,
      timeStep: 22,
      creative: null,
      creativeName: '',
      price: 4200
    },
    campaigns: [],
    notifications: []
  },

  _listeners: [],

  getState() {
    return this._state;
  },

  get(key) {
    const keys = key.split('.');
    let val = this._state;
    for (const k of keys) {
      if (val === undefined) return undefined;
      val = val[k];
    }
    return val;
  },

  set(key, value) {
    const keys = key.split('.');
    let obj = this._state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this._notify(key, value);
    this._persist();
  },

  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter(l => l !== callback);
    };
  },

  _notify(key, value) {
    this._listeners.forEach(cb => cb(key, value, this._state));
  },

  _persist() {
    try {
      localStorage.setItem('payout_state', JSON.stringify(this._state));
    } catch (e) { /* ignore */ }
  },

  _restore() {
    try {
      const saved = localStorage.getItem('payout_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this._state = { ...this._state, ...parsed };
      }
    } catch (e) { /* ignore */ }
  },

  // Auth helpers
  login(email) {
    this.set('auth.isLoggedIn', true);
    this.set('auth.user', { email, name: email.split('@')[0] });
  },

  logout() {
    this.set('auth.isLoggedIn', false);
    this.set('auth.user', null);
    this.set('business.isOnboarded', false);
    localStorage.removeItem('payout_state');
  },

  completeOnboarding(data) {
    this.set('business.isOnboarded', true);
    this.set('business.name', data.name);
    this.set('business.category', data.category);
    this.set('business.taxId', data.taxId);
    this.set('business.phone', data.phone);
  },

  resetCampaignDraft() {
    this.set('campaignDraft', {
      scope: 'local',
      location: 'Downtown Business District',
      radius: 20,
      tier: 'tier12',
      duration: 3,
      timeStep: 22,
      creative: null,
      creativeName: '',
      price: 4200
    });
  },

  addCampaign(campaign) {
    const campaigns = this.get('campaigns') || [];
    campaigns.unshift(campaign);
    this.set('campaigns', campaigns);
  },

  init() {
    this._restore();
  }
};

Store.init();
