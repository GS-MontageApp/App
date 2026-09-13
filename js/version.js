// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.57',
  date: '13.09.2026, 21:25 (MEZ)'
};

if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
