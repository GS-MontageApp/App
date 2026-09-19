// ============================================================================
// ZANGENSCHLOSSER-APP: SHELL / GLOBAL UI CONTROLLER (v1.11.2)
// ============================================================================
window.AppShell = (() => {
  let currentRole = null; // 'root' (0633) oder 'benutzer' (0449)

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
        navigator.serviceWorker.register('./sw.js').catch(err => console.log('ServiceWorker Fehler:', err));
      });
    }
  }

  // --- ADMIN PIN & MENÜ STEUERUNG ---
  function openTopMenu() {
    checkInstallState();
    updateMenuUI();
    document.getElementById('top_menu_modal')?.classList.remove('hidden');
  }
  function closeTopMenu() { document.getElementById('top_menu_modal')?.classList.add('hidden'); }

  function triggerAdminLogin() {
    closeTopMenu();
    // Erstelle ein modales PIN-Eingabefenster
    let pinModal = document.getElementById('admin_pin_modal');
    if (!pinModal) {
      pinModal = document.createElement('div');
      pinModal.id = 'admin_pin_modal';
      pinModal.className = 'fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4';
      pinModal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-xs w-full space-y-4 shadow-2xl text-slate-800 text-center animate-in fade-in duration-200">
          <h3 class="font-bold text-base text-slate-700">🔐 Admin / Prüf-Login</h3>
          <p class="text-xs text-slate-500">Bitte 4-stellige PIN eingeben</p>
          <input type="text" id="admin_pin_input" maxlength="4" inputmode="numeric" placeholder="••••" class="w-full text-center tracking-widest text-2xl bg-slate-50 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono">
          <div class="grid grid-cols-2 gap-2 pt-2">
            <button onclick="document.getElementById('admin_pin_modal').remove()" class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors">Abbrechen</button>
            <button onclick="window.AppShell.verifyPin()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm">Login</button>
          </div>
        </div>
      `;
      document.body.appendChild(pinModal);
    } else {
      pinModal.classList.remove('hidden');
    }
    setTimeout(() => {
      const input = document.getElementById('admin_pin_input');
      if (input) { input.value = ''; input.focus(); }
    }, 100);
  }

  function verifyPin() {
    const input = document.getElementById('admin_pin_input');
    if (!input) return;
    const pin = input.value.trim();

    if (pin === '0633') {
      currentRole = 'root';
      document.getElementById('admin_pin_modal')?.remove();
      applyRoleUI();
    } else if (pin === '0449') {
      currentRole = 'benutzer';
      document.getElementById('admin_pin_modal')?.remove();
      applyRoleUI();
    } else {
      alert('Falsche PIN!');
      input.value = '';
      input.focus();
    }
  }

  function logoutAdmin() {
    currentRole = null;
    applyRoleUI();
    closeTopMenu();
  }

  function applyRoleUI() {
    const header = document.querySelector('header');
    const headerTitle = document.getElementById('header-title');
    if (!header || !headerTitle) return;

    // Reset Klassen & Styles
    header.classList.remove('role-header-root', 'role-header-benutzer');
    
    // Aktuellen App-Titel ermitteln (Standard: Zuschnittsrechner)
    let baseTitle = headerTitle.getAttribute('data-base-title') || 'Zuschnittsrechner';

    if (currentRole === 'root') {
      header.classList.add('role-header-root');
      headerTitle.innerHTML = `<span class="truncate">${baseTitle}</span> <span class="ml-2 font-mono text-xs text-red-600 font-bold">~/root</span>`;
    } else if (currentRole === 'benutzer') {
      header.classList.add('role-header-benutzer');
      headerTitle.innerHTML = `<span class="truncate">${baseTitle}</span> <span class="ml-2 font-mono text-xs text-emerald-600 font-bold">~/benutzer</span>`;
    } else {
      headerTitle.innerHTML = `<span class="truncate">${baseTitle}</span>`;
    }
    updateMenuUI();
  }

  function updateMenuUI() {
    const menuList = document.querySelector('#top_menu_modal .space-y-3');
    if (!menuList) return;

    let logoutContainer = document.getElementById('admin_logout_container');
    if (currentRole) {
      if (!logoutContainer) {
        logoutContainer = document.createElement('div');
        logoutContainer.id = 'admin_logout_container';
        logoutContainer.className = 'pt-3 pb-3';
        logoutContainer.innerHTML = `
          <h4 class="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Sitzung (${currentRole.toUpperCase()})</h4>
          <button onclick="window.AppShell.logoutAdmin()" class="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-xl font-semibold text-red-700 transition-colors flex items-center justify-between shadow-sm">
            <span>🚪 Logout (${currentRole})</span>
            <span class="text-red-400">&rsaquo;</span>
          </button>
        `;
        menuList.prepend(logoutContainer);
      }
    } else {
      if (logoutContainer) logoutContainer.remove();
    }
  }

  function switchApp(appName, appTitle) {
    document.querySelectorAll('.app-view').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('block');
    });
    document.querySelectorAll('.nav-btn').forEach(el => {
      el.classList.remove('text-indigo-600');
      el.classList.add('text-slate-400');
    });

    const targetView = document.getElementById('view-' + appName);
    if (targetView) {
      targetView.classList.remove('hidden');
      targetView.classList.add('block');
    }

    const activeNav = document.getElementById('nav-' + appName);
    if (activeNav) {
      activeNav.classList.remove('text-slate-400');
      activeNav.classList.add('text-indigo-600');
    }

    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      headerTitle.setAttribute('data-base-title', appTitle);
      applyRoleUI(); // Hält den Rollen-Suffix ~/root oder ~/benutzer rechtsbündig aktuell
    }
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
    triggerAdminLogin, verifyPin, logoutAdmin,
    switchApp
  };
})();

// Globale Funktionsbrücken
window.closeDailySplash = () => window.AppShell.closeDailySplash();
window.openMehrModal = () => window.AppShell.openMehrModal();
window.closeMehrModal = () => window.AppShell.closeMehrModal();
window.selectMehrItem = (a, t) => window.AppShell.selectMehrItem(a, t);
window.installPWA = () => window.AppShell.installPWA();
window.openTopMenu = () => window.AppShell.openTopMenu();
window.closeTopMenu = () => window.AppShell.closeTopMenu();
window.switchApp = (a, t) => window.AppShell.switchApp(a, t);
