/**
 * ============================================================================
 * ZANGENSCHLOSSER APP (Dr. Zange) - AppShell Controller (v1.11.2)
 * ============================================================================
 */

const AppShell = (() => {
  let currentView = 'etagen';
  let currentRole = null; // 'root' (0633) oder 'benutzer' (0449)

  function init() {
    console.log("AppShell initialized (v1.11.2)");
    setupEventListeners();
  }

  function setupEventListeners() {
    // Hier können globale Event-Listener bei Bedarf registriert werden
  }

  function switchApp(viewId, title) {
    currentView = viewId;
    
    // Alle Views ausblenden
    document.querySelectorAll('.app-view').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('block', 'flex');
    });

    // Gewünschte View einblenden
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add(viewId === 'eoform' ? 'flex' : 'block');
    }

    // Header-Titel & aktive Rolle aktualisieren
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      headerTitle.setAttribute('data-base-title', title);
      applyRoleUI();
    }

    // Aktiven Zustand der Navigations-Buttons aktualisieren
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('text-indigo-600', 'text-amber-500');
      btn.classList.add('text-slate-400');
    });

    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
      activeNav.classList.remove('text-slate-400');
      activeNav.classList.add('text-indigo-600');
    }
  }

  function openTopMenu() {
    const modal = document.getElementById('top_menu_modal');
    if (modal) {
      modal.classList.remove('hidden');
      const menuSub = document.getElementById('menu_version_subtitle');
      if (menuSub && window.APP_CONFIG) {
        menuSub.textContent = `${window.APP_CONFIG.version} — ${window.APP_CONFIG.date}`;
      }
      updateMenuUI();
    }
  }

  function closeTopMenu() {
    const modal = document.getElementById('top_menu_modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // --- ADMIN PIN & ROLLE LOGIK ---
  function triggerAdminLogin() {
    closeTopMenu();
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

    header.classList.remove('role-header-master', 'role-header-user');
    let baseTitle = headerTitle.getAttribute('data-base-title') || 'Zuschnittsrechner';

    if (currentRole === 'root') {
      header.classList.add('role-header-master');
      headerTitle.innerHTML = `<span>${baseTitle}</span> <span class="ml-2 font-mono text-xs text-red-600 font-bold">~/root</span>`;
    } else if (currentRole === 'benutzer') {
      header.classList.add('role-header-user');
      headerTitle.innerHTML = `<span>${baseTitle}</span> <span class="ml-2 font-mono text-xs text-emerald-600 font-bold">~/benutzer</span>`;
    } else {
      headerTitle.innerHTML = `<span>${baseTitle}</span>`;
    }
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

  function openMehrModal() {
    const modal = document.getElementById('mehr_modal');
    if (modal) modal.classList.remove('hidden');
  }

  function closeMehrModal() {
    const modal = document.getElementById('mehr_modal');
    if (modal) modal.classList.add('hidden');
  }

  function selectMehrItem(viewId, title) {
    closeMehrModal();
    switchApp(viewId, title);
  }

  function installPWA() {
    console.log("PWA Installation angefordert");
    alert("Die Web-App kann über die Browser-Menüoption 'Zum Startbildschirm hinzufügen' / 'Installieren' eingerichtet werden.");
    closeTopMenu();
  }

  return {
    init,
    switchApp,
    openTopMenu,
    closeTopMenu,
    openMehrModal,
    closeMehrModal,
    selectMehrItem,
    installPWA,
    triggerAdminLogin,
    verifyPin,
    logoutAdmin
  };
})();

// Globale Shortcuts für HTML-OnClick-Attribute
function openTopMenu() { AppShell.openTopMenu(); }
function closeTopMenu() { AppShell.closeTopMenu(); }
function openMehrModal() { AppShell.openMehrModal(); }
function closeMehrModal() { AppShell.closeMehrModal(); }
function selectMehrItem(v, t) { AppShell.selectMehrItem(v, t); }
function installPWA() { AppShell.installPWA(); }
function switchApp(v, t) { AppShell.switchApp(v, t); }
