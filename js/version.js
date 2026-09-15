// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.10.68)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.69',
  date: '15.09.2026, 17:25 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
