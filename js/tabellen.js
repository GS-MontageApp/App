// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL TABELLEN (DIN / EO-FORM L / EO-FORM-S)
// ============================================================================
window.TabellenApp = (() => {
  function switchEoSub(subKey) {
    document.querySelectorAll('.eo-sub-section').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('#view-eoform section button').forEach(btn => {
      btn.classList.remove('bg-[#005691]', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-600', 'hover:text-slate-900');
    });

    const targetSub = document.getElementById('eo_sub_' + subKey);
    if (targetSub) targetSub.classList.remove('hidden');

    const activeBtn = document.getElementById('eo_tab_' + subKey);
    if (activeBtn) {
      activeBtn.classList.remove('text-slate-600', 'hover:text-slate-900');
      activeBtn.classList.add('bg-[#005691]', 'text-white', 'shadow-sm');
    }

    const badge = document.getElementById('header-badge');
    if (badge) {
      badge.classList.remove('hidden');
      if (subKey === 'din') badge.textContent = 'Einstecktiefe';
      if (subKey === 'l') badge.textContent = 'EO-Form L';
      if (subKey === 's') badge.textContent = 'EO-Form-S';
    }
  }

  function initTableInteractions() {
    document.querySelectorAll('#view-eoform tbody tr').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        const tbody = row.closest('tbody');
        tbody.querySelectorAll('tr.row-selected').forEach(r => r.classList.remove('row-selected'));
        row.classList.add('row-selected');
      });
    });
  }

  function init() {
    initTableInteractions();
    switchEoSub('din');
  }

  return { init, switchEoSub };
})();

// Globale Brücke für bestehende HTML-Onclick-Aufrufe
window.switchEoSub = (subKey) => window.TabellenApp.switchEoSub(subKey);
