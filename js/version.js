// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.11.1)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.11.1',
  date: '19.09.2026, 14:30 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
