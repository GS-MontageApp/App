// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (Dr. Zange)
// ============================================================================
window.APP_CONFIG = {
  version: 'v1.10.60',
  date: '13.09.2026, 18:45'
};

console.log('✅ SSoT LOADED:', window.APP_CONFIG.version);

function renderSplashVersion() {
  const splashVer = document.getElementById('splash_version_text');
  if (splashVer && window.APP_CONFIG) {
    splashVer.style.whiteSpace = 'nowrap';
    splashVer.textContent = `${window.APP_CONFIG.version} | ${window.APP_CONFIG.date}`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSplashVersion);
} else {
  renderSplashVersion();
}
