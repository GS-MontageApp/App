// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.12.4)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.12.4',
  date: '22.09.2026, 19:00 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
