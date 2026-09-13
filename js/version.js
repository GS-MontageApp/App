// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.45',
  date: '13.09.2026, 19:40 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
