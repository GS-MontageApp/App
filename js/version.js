// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.10.122)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.122',
  date: '18.09.2026, 13:45 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
