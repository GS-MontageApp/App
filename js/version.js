// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (v1.10.44)
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.44',
  date: '13.09.2026, 16:28'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
