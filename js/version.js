// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.10.121)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.121',
  date: '18.09.2026, 15:45 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
