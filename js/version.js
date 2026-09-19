// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.11.2)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.11.2',
  date: '19.09.2026, 15:10 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
