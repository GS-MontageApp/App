// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.10.123)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.123',
  date: '18.09.2026, 14:05 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
