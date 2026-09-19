// ============================================================================
// ZANGENSCHLOSSER-APP: SHELL / GLOBAL UI CONTROLLER (Modul: shell.js)
// ============================================================================
window.AppShell = (() => {

  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('ServiceWorker registriert:', reg.scope))
          .catch(err => console.log('ServiceWorker Fehler:', err));
      });
    }
  }

  function openTopMenu() { 
    const menu = document.getElementById('top_menu_modal');
    if (menu) menu.classList.remove('hidden'); 
  }

  function closeTopMenu() { 
    const menu = document.getElementById('top_menu_modal');
    if (menu) menu.classList.add('hidden'); 
  }

  // PIN-Login Modus Steuerung
  function openPinModal() {
    closeTopMenu();
    const pinModal = document.getElementById('pin_modal');
    const pinInput = document.getElementById('pin_input');
    if (pinModal) pinModal.classList.remove('hidden');
    if (pinInput) {
      pinInput.value = '';
      setTimeout(() => pinInput.focus(), 100);
    }
  }

  function closePinModal() {
    const pinModal = document.getElementById('pin_modal');
    if (pinModal) pinModal.classList.add('hidden');
  }

  function submitPinLogin() {
    const pinInput = document.getElementById('pin_input');
    const pin = pinInput ? pinInput.value.trim() : '';

    if (pin === '0633') {
      alert('Root-Modus aktiviert (Administrator).');
      closePinModal();
    } else if (pin === '0449') {
      alert('Benutzer-Modus aktiviert (Prüf-Ebene).');
      closePinModal();
    } else {
      alert('Ungültige PIN!');
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  }

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
    initServiceWorker();

    // Event-Listener für den Zahnrad-Auslöser im Top-Menü programmatisch absichern
    document.addEventListener('click', (e) => {
      // Prüfen, ob das Zahnrad im Top-Menü geklickt wurde
      if (e.target.closest('#top_menu_gear_btn') || e.target.matches('[data-action="open-pin"]')) {
        e.preventDefault();
        openPinModal();
      }
    });
  }

  return {
    init,
    openTopMenu,
    closeTopMenu,
    openPinModal,
    closePinModal,
    submitPinLogin,
    switchApp
  };
})();

// Globale Funktionsbrücken für direkte Aufrufe im Markup
window.openTopMenu = () => window.AppShell.openTopMenu();
window.closeTopMenu = () => window.AppShell.closeTopMenu();
window.openPinModal = () => window.AppShell.openPinModal();
window.closePinModal = () => window.AppShell.closePinModal();
window.submitPinLogin = () => window.AppShell.submitPinLogin();
window.switchApp = (a, t) => window.AppShell.switchApp(a, t);
