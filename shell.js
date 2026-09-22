// ============================================================================
// ZANGENSCHLOSSER-APP: SHELL / GLOBAL UI CONTROLLER (v1.12.4)
// ============================================================================
window.AppShell = (() => {
  function checkDailySplash() {
    const today = new Date().toISOString().split('T')[0];
    const lastSplash = localStorage.getItem('zangenschlosser_last_splash');
    const splashModal = document.getElementById('daily_splash_modal');
    if (!splashModal) return;

    if (lastSplash !== today) {
      splashModal.classList.remove('hidden');
    } else {
      splashModal.classList.add('hidden');
    }
  }
  function closeDailySplash() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('zangenschlosser_last_splash', today);
    document.getElementById('daily_splash_modal')?.classList.add('hidden');
  }

  function openMehrModal() { document.getElementById('mehr_modal')?.classList.remove('hidden'); }
  function closeMehrModal() { document.getElementById('mehr_modal')?.classList.add('hidden'); }
  function selectMehrItem(appName, appTitle) {
    closeMehrModal();
    switchApp(appName, appTitle);
  }

  function checkInstallState() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const installContainer = document.getElementById('install_container');
    if (isStandalone && installContainer) {
      installContainer.style.display = 'none';
    }
  }

  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  window.addEventListener('appinstalled', () => {
    const installContainer = document.getElementById('install_container');
    if (installContainer) installContainer.style.display = 'none';
    deferredPrompt = null;
  });

  function installPWA() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          document.getElementById('install_container').style.display = 'none';
        }
        deferredPrompt = null;
      });
    } else {
      alert('Die App ist bereits installiert oder wird in diesem Browser direkt über das Menü unterstützt.');
    }
  }

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => reg.update())
          .catch(err => console.log('ServiceWorker Fehler:', err));
      });
    }
  }

  function openTopMenu() { 
    checkInstallState();
    document.getElementById('top_menu_modal')?.classList.remove('hidden'); 
  }
  function closeTopMenu() { document.getElementById('top_menu_modal')?.classList.add('hidden'); }

  function switchApp(appName, appTitle) {
    document.querySelectorAll('.app-view').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => {
      el.classList.remove('text-indigo-600', 'text-yellow-400');
      el.classList.add('text-slate-400');
    });

    const targetView = document.getElementById('view-' + appName);
    if (targetView) targetView.classList.remove('hidden');

    const headerTitle = document.getElementById('header-title');
    if (headerTitle) headerTitle.textContent = appTitle;
    window.scrollTo(0, 0);
  }

  function init() {
    checkInstallState();
    checkDailySplash();
    initServiceWorker();
  }

  return {
    init,
    checkDailySplash, closeDailySplash,
    openMehrModal, closeMehrModal, selectMehrItem,
    installPWA, openTopMenu, closeTopMenu,
    switchApp
  };
})();

window.closeDailySplash = () => window.AppShell.closeDailySplash();
window.openMehrModal = () => window.AppShell.openMehrModal();
window.closeMehrModal = () => window.AppShell.closeMehrModal();
window.selectMehrItem = (a, t) => window.AppShell.selectMehrItem(a, t);
window.installPWA = () => window.AppShell.installPWA();
window.openTopMenu = () => window.AppShell.openTopMenu();
window.closeTopMenu = () => window.AppShell.closeTopMenu();
window.switchApp = (a, t) => window.AppShell.switchApp(a, t);
