// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (Dr. Zange)
// ============================================================================
window.APP_CONFIG = {
  version: 'v1.10.57',
  date: '13.09.2026, 18:00'
};

console.log('✅ SSoT LOADED:', window.APP_CONFIG.version);

function renderSplashVersion() {
  const splashVer = document.getElementById('splash_version_text');
  if (splashVer && window.APP_CONFIG) {
    splashVer.innerHTML = `<span class="block font-bold text-white">${window.APP_CONFIG.version}</span><span class="block text-[9px] text-white/75 font-mono">${window.APP_CONFIG.date}</span>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSplashVersion);
} else {
  renderSplashVersion();
}
