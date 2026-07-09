/* ============================================================
   PayOut — Mock Data
   ============================================================ */

const MockData = {
  // Brand asset URLs from Stitch CDN
  assets: {
    iconMark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdTc5egbzQ9IMRDyCeknptto_wi2QZslfa-3kBdo8LvFte5PcRKFu3jlyIPUYGUiviKLUWjO5n6zhCx9UAU_yyVihvJ0w9hQ1KHTnkrnc4b21UEAoDvMzEQcM5XvO1a7kFXi4xsMEq_EDRZtbxxpLYNEP00nDAMBgq3EigIeUbRoEH0ef1iONSlfclpTsxrKZanEvBrPflDq7HAfrcXejTL3T8Iyo4RTCSSpOc2purziPL5lwE-7g0D_Edfk9IseuWuJY',
    wordmark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEFzFZWu01dbZcLsol5j1UOl_aQ0-UM1VZo8zFd-fx2kTPkUXBNKslsjpz8X4x1miU4CBiIG6jl-SaADZm8hVISjW56lE9D0b5eA5cHKDWJaGJe0ZF3l4uv4PqbRHkRFmx0e0E415wITq2r0TEehylb3YQ3YZNcXu1QwQ8HJ1HiPlQBcSefv22NkoiqWhabU66ZqomqCmfNXtJd5sM1KTf4baGKWNXZkfRCsnWPlvDgD0rNkc-tqUwXyNl_-Sg4BPiwPo',
    logoFull: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuDLzbFC3_QxpohNWDOLg8F9ZggFkKZiYEqc95cLvJZVXX8ss3KwV1piblAB8vjXRP1INPof8dGkFkFNnolZ-igz_WK05eZVDO5bZFUzBvG2as1Rj2dJrMopUbytIJNPG08AW15Sfg7RiwBK77XmF2tWbXVat_pUYCvdXcVzM4NI7X9_Cy-cqIm1kqGaCWD34rZXWnv938a_kd6m1qfxRM013RMWQsPOw0ochb6-irWt4XLtAWDaH9u2q8ebpFP_aTfUc',
    receiptIcon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqnGTEM8a9918oGQpSF3y3eeINkoULEYdYQndkkC4XyvPNPxaqqQAW5j1ECeHOY8v6FP3uxmV3drgSZW54oNlUchK79FW99mn8dkMyCoq-wV8dhLY9_qnHfgwMtz7jjBhoIGOvA0gTuD5y8WzjdvmJ1GYzD-VkoEohWxaHPhqoL42ZiJBi6nxN9IqPkLCClx6vHi1TIBqicUXlrq5Z5Ou6ghDuL54LFcdsqc8uNe1C2DhEbjDPMaTA0_Rb2n1cMGADIA',
    receiptWordmark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfOcy6tnjfzoNUxuExGfz2K39TPhvyzUv84w1c0kYsVdWkppk_V50Seq-CW4wB06ZMHRXpjnWVHGR5ebmrgSNKPsiGMgJ9CvX1lmB3428BJizL-A5onW-plqIVzmAhYuBe8gCsDQ2gtSM2caxRb9Qmy7kJ55HFT20g0vVE2Jo0Q95dliW4_cWMPd7XobQN3FSNruBsNALC-g_oUHjBFjz4q-xD3nKTa-nIalaEqYG-8HrAPvnJBbPgWhyuECEm4nuU9ns',
    heroVisual: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCejUB_Os6tcHIRd8o9XviKPYcfxlD00gjcAnR1VXrhDjdwu5OWfJrcSam2quJ7G0qIKoHelMAvOL0SRooKFGKmQ1FjH_Tkpyv8kusESyAJeNyylPKg79pb7KONSvBYqBgk_AJaQFoo3IGTuLFlpiFUFo3gXTHU44BFPMVSPxaHtdypfELrRj6GwnCf8wDntvVN-vy094znkuoDVDNoS7cTNDMSLamvZWmXTwcqzipCI_u5uoRxKxmSQIaGAUMA5YddJF4',
    mapPlaceholder: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgqA2EuqB1VbJpEJ89aN8O_VNUdDsczTQj48CFtLrKrDeL49CGCN7tdqINWwCXAQ24CsXkcBRhMLhAiy5_z-SSz53oz7UTGd-k0ATXOjq8SICu6YvEnAzvuTb0lInGee-Ye7_DpjGxieggAExdqxOEEbcJAqmypxNwA4QujVRlHPiW5jckXe4u2tturzaNij_i8tbuwF9CTYJgGj2SZ5Gr8dtyeTz_uhZTN3mCmuLzrJ3IcFbmdKctPA',
    creativeSample: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8st9kWgbcor_JudL8Pw8XK7jcnFl6JVb4wmtcFLLFzoH3aYC5AVx4h7C9Zvt3Mfm0w2I-KHCjkewprIVyGUE7V6VwmPZt_lEy7Q--IBZfn7HOzIPa21stwrp9CHDkmYGa86skFmN66nyyTijqFtv4Jm-GPCozk439rIwHFvHeJOCbC3XCvZa9yRtm-9iJJt-mSAfBweXDQ8zm0N4TyDcHBkSloMypc7SzL0HkIjqREiHYOigrbNjQpg',
    growthVisual: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5q7TRw6XNCWkOeNKC4s6XOob579s8-UjHaQZUFCPIpVge7eoGrAqweR2FgAupXcjInmN6XXRQYEymt9xEqBPBrWIUIaC5eNWrygs1w7PHjOcF40ydF6sE7YNxmG-UfgWHEhN-oRV0rRoyT92NZ6fqJpZjA0TXSNk7O-ELQQgKJ_WCuaAevFEBHmHV_PQazoe63lev4gDMe5QyK__eaqtANOXB4FPLWopf2vA1TVuPEABvIiNlO6LoAEx5w2DQC6Rxy-0',
    onboardingSuccess: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQcXy0CLHyh6-MvXK2IihbDE7DLlFJPBWiwoaie3ZIvXKIOK3POJMc9z4RutBnXnS4wKfdzlcMPcch4zI2bPspW0f3xB0_uFZxxqUx3GnbhQXUM1-ZbybrZFuztaGzq8W_1v91EQJ8NvkfexWNC5UKZli7ILmIN0A6OrABivS1tUDPOfEAfYaouf9ehdcPnCEygbm3ruNSpqxYxrUu7_4GaBlkArw0aP2EZPlmTzS3my0FK5RNV2TtyucysYSLBrtuOhY',
    footerIcon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBacyVLqC7P8LVWD1O4uXEf8VgwVZaCDLIlMceNrJhFmznnR2cnnSqm_hfDgZX22SLk8Ofv_Cjdln7e6HVx0OVGHPq47GgnP7KLNJq9mYF41wHngQFvhnoC4ZalqSTm6kIe-F22IohXQT6UOJRFkTPQaLkEWLijCOEFQHm7mcYcpKbc0ZCFqmYNNoqLwkoY-wQutCCNd1qsrWrNHlhO4DO7B_n6JPzl2nl1_1vTcIjFKUESf5SGIQKNjadSBw0TIFd0q3w',
    footerWordmark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkqGXpjZ9Cip3i0RgY7NZwu2Xpxda9qaWCrT8qRONsn_iimG-50qsJZ-h3zIJNO5tBRc-C9_WlNb4hW3BoJI_nEupzmXHl9K3Au-LGWamNlMuTl-5Z0LtqLepFbpKjhF1thwlaw4g88N0Uhj6ufRk03QEh8ccSPBT2YZDKkH-p0MOSwYoootKSGPgV0r8Y64UQfJoLLqYJP3aMPVJYpVuxswplp35M3uwQcGzK_Fr8gQX7xA30DWF1JGEPyKFFymWD35Q',
    brandMark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLSrhGKZdJkzsLZa8xmWoez2L-jwYRNhQ99ZKHdA1kbghoVbPc2pRbkadE9O0ubeimKV38pl-XSjAqi8Q6OZgY8GFuvwI6UTMsMTFNcgx0Q9FiEcLqnjkWpPbPU4uD7KZybGmHMn2KFzXK_F4B_yd5xF344QmkbeAgAfiL0VJNVfB86dgWqk3tukrj9zlTvBU4UDZ-IkRWe8Hj31RoKMuJA31eNJiJJ4_wgg2KXOlgOVA2rMJ-Gae_mwuQrLqJkFsCxxM',
    payBtn: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtfcXgWMwvG8nENlRo7fXUWCzq9zqILNA0iO0yihPrKgJyfTUVelgRGEXU0KTrnEF7PvWMbjHjqac48_xFJ_4YikkZWf6b4niVxRSl5dttPhl-I5-KouOch71LQclYfhuajInWuxjFYvDmSlkNOMRcWyHXWfqxaQZmTVXrOfal9M27MBYikqXbEEkcBkKy5pw5hYZug14PVMxt-N1OEdhb0nSrkJzD_kTQhjgXzvWwSEra1T6W2Y0XKBRUfYre5wUWs_s',
    signinBrandMark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBicbtgbtUVKBCEGY7Yai8YxKetptitG32VCaSW7UVsB3_2Kk3PmHTz5cylpWzhIcBNgfaJVI2Im2Z0rnAwp-LseoqvXsq5L56zsg0uiiEN6Usq1YC85FNSh0mXvnsvFTcXicey9uJUWyRp-gG39kl6ZqPE8woPQk1dO3fpGRA3-25iuro2LOhYgsejuNFmrhEY9VN9YKhpsMCmVxwqEUNWEInosLCUNJUEsdTcXtfSrwnSsv5868RCikT0bcsjTlCTNFU',
  },

  // Sample campaigns for dashboard
  campaigns: [
    {
      id: 'camp-001',
      name: 'Weekend Lunch Special',
      status: 'active',
      scope: 'local',
      location: 'Koramangala, Bengaluru',
      radius: 5,
      window: '11:30 AM – 2:30 PM',
      duration: '3 hours',
      totalBudget: 4200,
      spent: 2840,
      views: 568,
      creative: 'lunch-special-banner.jpg',
      createdAt: '2026-07-05T10:30:00Z',
      startDate: '2026-07-06'
    },
    {
      id: 'camp-002',
      name: 'Grand Opening — Indiranagar',
      status: 'active',
      scope: 'local',
      location: 'Indiranagar, Bengaluru',
      radius: 10,
      window: '5:00 PM – 8:00 PM',
      duration: '3 hours',
      totalBudget: 8500,
      spent: 3200,
      views: 1240,
      creative: 'grand-opening-v2.png',
      createdAt: '2026-07-04T14:00:00Z',
      startDate: '2026-07-05'
    },
    {
      id: 'camp-003',
      name: 'Monsoon Sale — Pan India',
      status: 'completed',
      scope: 'national',
      tier: 'Tier 1 + 2',
      window: '4:00 PM – 9:00 PM',
      duration: '5 hours',
      totalBudget: 25000,
      spent: 25000,
      views: 12450,
      creative: 'monsoon-sale-final.jpg',
      createdAt: '2026-06-28T09:00:00Z',
      startDate: '2026-06-29'
    },
    {
      id: 'camp-004',
      name: 'New Menu Launch',
      status: 'pending',
      scope: 'local',
      location: 'HSR Layout, Bengaluru',
      radius: 3,
      window: '12:00 PM – 3:00 PM',
      duration: '3 hours',
      totalBudget: 3500,
      spent: 0,
      views: 0,
      creative: 'menu-launch-poster.jpg',
      createdAt: '2026-07-07T08:00:00Z',
      startDate: '2026-07-08'
    }
  ],

  // Activity feed for dashboard
  activity: [
    { type: 'campaign_started', message: 'Weekend Lunch Special went live', time: '2 hours ago', active: true },
    { type: 'payment', message: 'Payment of ₹4,200 processed successfully', time: '5 hours ago', active: false },
    { type: 'campaign_completed', message: 'Monsoon Sale — Pan India completed with 12,450 views', time: '2 days ago', active: false },
    { type: 'verification', message: 'Business verification approved', time: '3 days ago', active: true },
    { type: 'campaign_started', message: 'Grand Opening — Indiranagar went live', time: '3 days ago', active: false },
  ],

  // FAQ data
  faqs: [
    {
      q: 'How does PayOut work?',
      a: 'PayOut connects your business with delivery riders in your area. When riders display your ad during deliveries, nearby consumers see your promotion. You pay per verified view, and riders earn a portion of each view — creating a transparent, win-win advertising ecosystem.'
    },
    {
      q: 'How much does a campaign cost?',
      a: 'Pricing depends on your chosen scope (local or national), time window, and duration. Local campaigns start from ₹3/view during off-peak hours. Evening slots in metro areas are premium at ₹8/view. You set your total budget, and we optimize delivery within that amount.'
    },
    {
      q: 'How long does business verification take?',
      a: 'Verification typically completes within 24 hours. We verify your GSTIN or PAN details to ensure compliance. You\'ll receive an email notification once your account is approved and ready to create campaigns.'
    },
    {
      q: 'What creative formats are supported?',
      a: 'We accept JPG, PNG, and SVG files. Recommended dimensions are 1080×1920px (9:16 portrait) for mobile ad placements. Maximum file size is 5MB. Your creative should be clear, high-contrast, and readable at small sizes.'
    },
    {
      q: 'Can I edit a campaign after launching?',
      a: 'Active campaigns cannot be modified, but you can pause them at any time. To make changes, pause the campaign, create a new one with updated settings, and launch it. Any unused budget from the paused campaign will be refunded to your account.'
    },
    {
      q: 'How are views counted and verified?',
      a: 'Views are counted when a consumer\'s device is within the rider\'s Bluetooth/NFC range for at least 3 seconds. We use cryptographic proof-of-proximity to prevent fraud. You can see real-time view counts on your campaign dashboard.'
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept all major Indian payment methods through Razorpay: UPI, credit/debit cards, net banking, and popular wallets. All transactions are secured with 256-bit encryption.'
    }
  ],

  // Helper functions
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  },

  formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  },

  getStatusBadgeClass(status) {
    const map = {
      active: 'badge-active',
      pending: 'badge-pending',
      completed: 'badge-completed',
      paused: 'badge-error'
    };
    return map[status] || 'badge-completed';
  },

  getTotalStats() {
    const campaigns = this.campaigns;
    const active = campaigns.filter(c => c.status === 'active').length;
    const totalViews = campaigns.reduce((sum, c) => sum + c.views, 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const avgCost = totalViews > 0 ? (totalSpent / totalViews).toFixed(2) : '0.00';
    return { active, totalViews, totalSpent, avgCost };
  }
};
