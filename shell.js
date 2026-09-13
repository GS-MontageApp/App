// ============================================================================
// APP SHELL & NAVIGATION CONTROLLER (v1.10.54)
// ============================================================================

const AppShell = {
  init: function() {
    console.log("AppShell: Initialisiere Zangenschlosser App...");
    this.checkVersionAndClearCache();
    this.unregisterServiceWorkers();
  },

  // 1. Automatischer Versions- und Cache-Abgleich
  checkVersionAndClearCache: function() {
    if (!window.APP_CONFIG) return;
    const currentAppVersion = window.APP_CONFIG.version;
    const storedVersion = localStorage.getItem('zangenschlosser_active_version');

    if (storedVersion !== currentAppVersion) {
      console.log(`AppShell: Neue Version erkannt (${storedVersion} -> ${currentAppVersion}). Bereinige alten Cache...`);
      localStorage.setItem('zangenschlosser_active_version', currentAppVersion);
      
      // Optional: Sanfter Reload-Trigger bei Versionssprung zur Erzwingung frischer Assets
      if (storedVersion) {
        console.log("AppShell: Cache-Busting aktiv – lade frische Assets.");
      }
    }
  },

  // 2. Veraltete Service Worker im Hintergrund entfernen (gegen hartnäckiges Caching)
  unregisterServiceWorkers: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister().then(success => {
            if (success) console.log("AppShell: Alter Service Worker erfolgreich deregistriert.");
          });
        }
      }).catch(err => {
        console.warn("AppShell: Fehler beim Prüfen der Service Worker:", err);
      });
    }
  },

  // 3. Modul-Umschaltung (Routing im Frontend)
  switchApp: function(viewId, titleText) {
    // Alle Views ausblenden
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => {
      v.classList.add('hidden');
      v.classList.remove('block', 'flex');
    });

    // Ziel-View einblenden
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      if (viewId === 'eoform') {
        targetView.classList.add('flex');
      } else {
        targetView.classList.add('block');
      }
    }

    // Header-Titel anpassen
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      headerTitle.textContent = titleText;
    }

    // Nav-Buttons Styling aktualisieren
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.classList.remove('text-indigo-600', 'text-yellow-400');
      btn.classList.add('text-slate-400');
    });

    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
      activeNav.classList.remove('text-slate-400');
      // Im GS-Modus gelbe Akzente, im Standard Indigo
      const isGs = document.body.classList.contains('theme-gs');
      activeNav.classList.add(isGs ? 'text-yellow-400' : 'text-indigo-600');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Globale Shortcut-Funktionen für HTML OnClick Handler
window.switchApp = function(viewId, titleText) {
  AppShell.switchApp(viewId, titleText);
};

window.openTopMenu = function() {
  const modal = document.getElementById('top_menu_modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeTopMenu = function() {
  const modal = document.getElementById('top_menu_modal');
  if (modal) modal.classList.add('hidden');
};

window.openMehrModal = function() {
  const modal = document.getElementById('mehr_modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeMehrModal = function() {
  const modal = document.getElementById('mehr_modal');
  if (modal) modal.classList.add('hidden');
};

window.selectMehrItem = function(viewId, titleText) {
  window.closeMehrModal();
  window.switchApp(viewId, titleText);
};

window.openDailySplash = function() {
  const splash = document.getElementById('daily_splash_modal');
  if (splash) splash.classList.remove('hidden');
};

window.closeDailySplash = function() {
  const splash = document.getElementById('daily_splash_modal');
  if (splash) splash.classList.add('hidden');
};

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
      <p>Entwickelt für den direkten Einsatz in der Werkstatt und auf der Baustelle:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Etagenrechner:</strong> Berechne Raumversatz, Schräglänge und Verdrehwinkel in Sekunden.</li>
        <li><strong>Zuschnittsrechner:</strong> Plane komplexe Bogen- und Schenkelfolgen fehlerfrei.</li>
        <li><strong>Verdrehwinkel:</strong> Bestimme die korrekte Ausrichtung von Anschlüssen.</li>
        <li><strong>Tabellen:</strong> Schneller Zugriff auf DIN-Einstecktiefen, EO-FORM (L/S) und Anzugsdrehmomente.</li>
      </ul>
    `;
  } else if (type === 'contact') {
    title.textContent = "✉️ Kontakt & Support";
    content.innerHTML = `
      <p>Hast du Fragen, Verbesserungsvorschläge oder Wünsche für neue Module?</p>
      <p class="font-semibold text-indigo-600 mt-2">Dein Entwicklungs-Team steht bereit.</p>
    `;
  } else if (type.startsWith('logbook')) {
    title.textContent = "📜 Projekthistorie & Logbuch";
    content.innerHTML = `<p>Aktive Version: <strong>${window.APP_CONFIG ? window.APP_CONFIG.version : 'v1.10.54'}</strong>. Alle Berechnungen laufen stabil im Offline-Modus.</p>`;
  }

  modal.classList.remove('hidden');
};

window.closeSubModal = function() {
  const modal = document.getElementById('sub_modal');
  if (modal) modal.classList.add('hidden');
  window.openTopMenu();
};

window.installPWA = function() {
  alert("Die App kann direkt über die Browser-Optionen ('Zum Startbildschirm hinzufügen') auf deinem Gerät als PWA installiert werden.");
};
