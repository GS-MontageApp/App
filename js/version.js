// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD (Dr. Zange) - v1.10.64
// ============================================================================
window.APP_CONFIG = {
  version: 'v1.10.64',
  date: '13.09.2026, 19:15',
  buildHash: 'zange-64-force'
};

console.log('✅ SSoT LOADED:', window.APP_CONFIG.version, '| Hash:', window.APP_CONFIG.buildHash);

function enforceCacheBusting() {
  const storedVersion = localStorage.getItem('dr_zange_version');
  if (storedVersion && storedVersion !== window.APP_CONFIG.version) {
    console.🔄 ('Neue Version erkannt! Erzwinge Cache-Clean...');
    localStorage.setItem('dr_zange_version', window.APP_CONFIG.version);
    // Optional: Service Worker unregisteren falls vorhanden
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
  } else {
    localStorage.setItem('dr_zange_version', window.APP_CONFIG.version);
  }
}

function renderSplashVersion() {
  enforceCacheBusting();
  const splashVer = document.getElementById('splash_version_text');
  if (splashVer && window.APP_CONFIG) {
    splashVer.style.whiteSpace = 'nowrap';
    splashVer.textContent = `${window.APP_CONFIG.version} | ${window.APP_CONFIG.date}`;
  }
  // Update Header badge falls vorhanden
  const headerTitle = document.getElementById('header-title');
  if (headerTitle && !document.getElementById('live-version-badge')) {
    const badge = document.createElement('span');
    badge.id = 'live-version-badge';
    badge.className = 'ml-2 text-[10px] font-mono text-slate-400 font-normal';
    badge.textContent = `(${window.APP_CONFIG.version})`;
    headerTitle.appendChild(badge);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSplashVersion);
} else {
  renderSplashVersion();
}
