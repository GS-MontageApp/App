// ============================================================================
// ZANGENSCHLOSSER-APP: SHELL / GLOBAL UI CONTROLLER (v1.10.123)
// ============================================================================
window.AppShell = (() => {
  let currentRole = null; // 'master' | 'user' | null

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
          .then(reg => {
            console.log('ServiceWorker registriert:', reg.scope);
            reg.update();
          })
          .catch(err => console.log('ServiceWorker Fehler:', err));
      });
    }
  }

  function openTopMenu() { 
    checkInstallState();
    updateMenuUI();
    document.getElementById('top_menu_modal')?.classList.remove('hidden'); 
  }
  function closeTopMenu() { document.getElementById('top_menu_modal')?.classList.add('hidden'); }

  // --- ADMIN & PIN LOGIK (Direkter Aufruf per Click) ---
  function handleTitleClick() {
    closeTopMenu();
    openPinModal();
  }

  function openPinModal() {
    const modal = document.getElementById('pin_modal');
    const input = document.getElementById('pin_input');
    if (input) input.value = '';
    if (modal) modal.classList.remove('hidden');
    if (input) input.focus();
  }

  function closePinModal() {
    document.getElementById('pin_modal')?.classList.add('hidden');
  }

  function handleLogin() {
    const input = document.getElementById('pin_input');
    if (!input) return;
    const pin = input.value.trim();

    if (pin === '0633') {
      currentRole = 'master';
      applyRole('master');
      closePinModal();
      alert('Master-Modus aktiv (Vollzugriff).');
    } else if (pin === '0449') {
      currentRole = 'user';
      applyRole('user');
      closePinModal();
      alert('Benutzer-Modus aktiv (Prüfebene).');
    } else {
      alert('Falsche PIN!');
      input.value = '';
      input.focus();
    }
  }

  function handleLogout() {
    currentRole = null;
    applyRole(null);
    updateMenuUI();
    alert('Erfolgreich abgemeldet.');
  }

  function applyRole(role) {
    const header = document.querySelector('header');
    if (!header) return;

    header.classList.remove('role-header-master', 'role-header-user');

    if (role === 'master') {
      header.classList.add('role-header-master');
    } else if (role === 'user') {
      header.classList.add('role-header-user');
    }
    updateMenuUI();
  }

  function updateMenuUI() {
    const logoutContainer = document.getElementById('logout_container');
    if (!logoutContainer) return;

    if (currentRole) {
      logoutContainer.style.display = 'block';
    } else {
      logoutContainer.style.display = 'none';
    }
  }
  // -------------------------

  function openSubModal(type) {
    const titleEl = document.getElementById('sub_modal_title');
    const contentEl = document.getElementById('sub_modal_content');
    if (!contentEl) return;
    contentEl.innerHTML = '';

    if (type.startsWith('logbook-')) {
      const key = type.replace('logbook-', '');
      const titles = { master: 'Zangenschlosser App', etagen: 'Etagenrechner', zuschnitt: 'Zuschnittsrechner', drehwinkel: 'Verdrehwinkel' };
      if (titleEl) titleEl.textContent = `📜 Logbuch: ${titles[key] || key}`;
      
      const logs = [
        { version: "v1.10.123", date: "18.09.2026, 14:05 (MEZ)", text: "PIN-Dialog direkt per Klick auf den Menü-Titel angebunden.", border: "border-indigo-500" }
      ];

      let html = '<div class="space-y-3 pb-2 flex flex-col w-full">';
      logs.forEach(item => {
        html += `<div class="p-3 bg-slate-50 rounded-xl border-l-4 ${item.border} text-xs shrink-0 shadow-sm">
          <div class="flex justify-between font-bold text-slate-700"><span>Version ${item.version}</span><span>${item.date}</span></div>
          <p class="mt-1 text-slate-600 leading-relaxed">${item.text}</p>
        </div>`;
      });
      html += '</div>';
      contentEl.innerHTML = html;

    } else if (type === 'explanation') {
      if (titleEl) titleEl.textContent = '📖 Erklärung über die App';
      contentEl.innerHTML = `
        <div class="space-y-3 text-slate-700 text-sm">
          <p><strong>Zangenschlosser App (Dr. Zange)</strong> ist eine professionelle mobile Web-Applikation (PWA) für Techniker im Bereich Rohrleitung- und Hydraulikbau.</p>
          <div class="pt-2">
            <img src="./img/dr-zange.jpg" alt="Dr. Zange" class="rounded-xl shadow-md w-full object-cover">
          </div>
        </div>
      `;
    } else if (type === 'contact') {
      if (titleEl) titleEl.textContent = '✉️ Kontakt & Support';
      contentEl.innerHTML = `
        <div class="space-y-3 text-slate-700 text-sm">
          <p>Support & Feedback über dein internes Projekt-Team.</p>
          <p class="text-xs text-slate-500">Version: v1.10.123</p>
        </div>
      `;
    }
    document.getElementById('sub_modal')?.classList.remove('hidden');
  }

  function closeSubModal() { document.getElementById('sub_modal')?.classList.add('hidden'); }

  function switchApp(appName, appTitle) {
    document.querySelectorAll('.app-view').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => {
      el.classList.remove('text-indigo-600');
      el.classList.add('text-slate-400');
    });

    const targetView = document.getElementById('view-' + appName);
    if (targetView) targetView.classList.remove('hidden');

    const activeNav = document.getElementById('nav-' + appName);
    if (activeNav) {
      activeNav.classList.remove('text-slate-400');
      activeNav.classList.add('text-indigo-600');
    } else if (appName === 'foobar2' || appName === 'foobar3') {
      const mehrNav = document.getElementById('nav-mehr');
      if (mehrNav) {
        mehrNav.classList.remove('text-slate-400');
        mehrNav.classList.add('text-indigo-600');
      }
    }

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
    openSubModal, closeSubModal, switchApp,
    handleTitleClick, handleLogin, handleLogout, closePinModal
  };
})();

// Globale Brücken für HTML-OnClick-Attribut-Kompatibilität
window.closeDailySplash = () => window.AppShell.closeDailySplash();
window.openMehrModal = () => window.AppShell.openMehrModal();
window.closeMehrModal = () => window.AppShell.closeMehrModal();
window.selectMehrItem = (a, t) => window.AppShell.selectMehrItem(a, t);
window.installPWA = () => window.AppShell.installPWA();
window.openTopMenu = () => window.AppShell.openTopMenu();
window.closeTopMenu = () => window.AppShell.closeTopMenu();
window.openSubModal = (t) => window.AppShell.openSubModal(t);
window.closeSubModal = () => window.AppShell.closeSubModal();
window.switchApp = (a, t) => window.AppShell.switchApp(a, t);
window.handleTitleClick = () => window.AppShell.handleTitleClick();
window.handleLogin = () => window.AppShell.handleLogin();
window.handleLogout = () => window.AppShell.handleLogout();
window.closePinModal = () => window.AppShell.closePinModal();
