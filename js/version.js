// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (Dr. Zange)
// ============================================================================
window.APP_CONFIG = {
  version: 'v1.10.54',
  date: '13.09.2026, 17:35'
};

console.log('✅ SSoT LOADED:', window.APP_CONFIG.version);

document.addEventListener('DOMContentLoaded', () => {
  const splashVer = document.getElementById('splash_version_text');
  if (splashVer && window.APP_CONFIG) {
    splashVer.textContent = `${window.APP_CONFIG.version} | ${window.APP_CONFIG.date}`;
  }
});
