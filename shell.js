// ============================================================================
// APP SHELL & NAVIGATION CONTROLLER (v1.10.57)
// ============================================================================

const AppShell = {
  init: function() {
    console.log("AppShell: Initialisiere Zangenschlosser App...");
    this.checkVersionAndForceReload();
    this.unregisterServiceWorkers();
  },

  // 1. Zwingender Auto-Reload bei Versionswechsel (Schlägt jeden Browser-Cache)
  checkVersionAndForceReload: function() {
    if (!window.APP_CONFIG) return;
    const currentAppVersion = window.APP_CONFIG.version;
    const storedVersion = localStorage.getItem('zangenschlosser_active_version');

    if (!storedVersion) {
      // Erster Start oder frisch zurückgesetzt
      localStorage.setItem('zangenschlosser_active_version', currentAppVersion);
      return;
    }

    if (storedVersion !== currentAppVersion) {
      console.log(`AppShell: Neue Version entdeckt! Alt: ${storedVersion}, Neu: ${currentAppVersion}. Erzwinge Cache-Refresh...`);
      localStorage.setItem('zangenschlosser_active_version', currentAppVersion);
      
      // Cache-Busting Reload ausführen mit einem zufälligen Query-Parameter
      setTimeout(() => {
        window.location.href = window.location.pathname + '?v=' + Date.now();
      }, 100);
    }
  },

  // 2. Veraltete Service Worker im Hintergrund entfernen
  unregisterServiceWorkers: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister().then(success => {
            if (success) console.log("AppShell: Alter Service Worker deregistriert.");
          });
        }
      }).catch(err => {
        console.warn("AppShell: Fehler bei Service Workern:", err);
      });
    }
  },

  // 3. Modul-Umschaltung (Routing im Frontend)
  switchApp: function(viewId, titleText) {
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('block', 'flex');
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      if (viewId === 'eoform') {
        targetView.classList.add('flex');
      } else {
        targetView.classList.add('block');
      }
    }

    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      headerTitle.textContent = titleText;
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.classList.remove('text-indigo-600', 'text-yellow-400');
      btn.classList.add('text-slate-400');
    });

    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
      activeNav.classList.remove('text-slate-400');
      const isGs = document.body.classList.contains('theme-gs');
      activeNav.classList.add(isGs ? 'text-yellow-400' : 'text-indigo-600');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Globale Shortcut-Funktionen für HTML OnClick Handler
window.switchApp = (v, t) => AppShell.switchApp(v, t);
window.openTopMenu = () => document.getElementById('top_menu_modal')?.classList.remove('hidden');
window.closeTopMenu = () => document.getElementById('top_menu_modal')?.classList.add('hidden');
window.openMehrModal = () => document.getElementById('mehr_modal')?.classList.remove('hidden');
window.closeMehrModal = () => document.getElementById('mehr_modal')?.classList.add('hidden');
window.selectMehrItem = (v, t) => { window.closeMehrModal(); window.switchApp(v, t); };
window.openDailySplash = () => document.getElementById('daily_splash_modal')?.classList.remove('hidden');
window.closeDailySplash = () => document.getElementById('daily_splash_modal')?.classList.add('hidden');

window.openSubModal = function(type) {
  window.closeTopMenu();
  const modal = document.getElementById('sub_modal');
  const title = document.getElementById('sub_modal_title');
  const content = document.getElementById('sub_modal_content');
  if (!modal || !title || !content) return;

  if (type === 'explanation') {
    title.textContent = "📖 Über die Zangenschlosser App";
    content.innerHTML = `
      <p>Die <strong>Zangenschlosser App (Dr. Zange)</strong> ist dein professioneller Begleiter für präzise Rohr- und Hydraulikberechnungen.</p>
      <p class="mt-2">Version: <strong>${window.APP_CONFIG ? window.APP_CONFIG.version : 'v1.10.57'}</strong></p>
    `;
  } else if (type === 'contact') {
    title.textContent = "✉️ Kontakt & Support";
    content.innerHTML = `<p>Support über dein internes Projekt-Team.</p>`;
  } else if (type.startsWith('logbook')) {
    title.textContent = "📜 Projekthistorie & Logbuch";
    content.innerHTML = `<p>Aktives Anti-Cache System aktiv in Version <strong>${window.APP_CONFIG ? window.APP_CONFIG.version : 'v1.10.57'}</strong>.</p>`;
  }
  modal.classList.remove('hidden');
};

window.closeSubModal = function() {
  document.getElementById('sub_modal')?.classList.add('hidden');
  window.openTopMenu();
};

window.installPWA = function() {
  alert("Die App kann über die Browser-Optionen als PWA installiert werden.");
};
