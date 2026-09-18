/**
 * ============================================================================
 * ZANGENSCHLOSSER APP (Dr. Zange) - AppShell Controller (v1.10.64)
 * ============================================================================
 */

const AppShell = (() => {
  let currentView = 'etagen';

  function init() {
    console.log("AppShell initialized (v1.10.64)");
    
    // Event-Listener für Navigation und Modals vorbereiten
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

    // Header-Titel aktualisieren
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      headerTitle.textContent = title;
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
      // Versions-Subtitle im Menü aktualisieren falls vorhanden
      const menuSub = document.getElementById('menu_version_subtitle');
      if (menuSub && window.APP_CONFIG) {
        menuSub.textContent = `${window.APP_CONFIG.version} — ${window.APP_CONFIG.date}`;
      }
    }
  }

  function closeTopMenu() {
    const modal = document.getElementById('top_menu_modal');
    if (modal) {
      modal.classList.add('hidden');
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
    // Fallback falls kein native prompt vorliegt
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
    installPWA
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
