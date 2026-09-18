// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL DREHMOMENTTABELLE (8.8 / 10.9 / 12.9) (v1.10.127)
// ============================================================================
window.DrehmomentApp = (() => {
  const STORAGE_KEY = 'zangenschlosser_drehmoment_selections_v1';

  const drehmomentData = [
    { gewinde: 'M3', m88: '1,4 Nm', m109: '2,0 Nm', m129: '2,4 Nm' },
    { gewinde: 'M4', m88: '3,3 Nm', m109: '4,8 Nm', m129: '5,6 Nm' },
    { gewinde: 'M5', m88: '6,5 Nm', m109: '9,5 Nm', m129: '11,2 Nm' },
    { gewinde: 'M6', m88: '11,3 Nm', m109: '16,5 Nm', m129: '19,3 Nm' },
    { gewinde: 'M8', m88: '27,3 Nm', m109: '40,1 Nm', m129: '46,9 Nm' },
    { gewinde: 'M10', m88: '54 Nm', m109: '79 Nm', m129: '93 Nm' },
    { gewinde: 'M12', m88: '93 Nm', m109: '137 Nm', m129: '160 Nm' },
    { gewinde: 'M14', m88: '148 Nm', m109: '218 Nm', m129: '255 Nm' },
    { gewinde: 'M16', m88: '230 Nm', m109: '338 Nm', m129: '395 Nm' },
    { gewinde: 'M18', m88: '329 Nm', m109: '469 Nm', m129: '549 Nm' },
    { gewinde: 'M20', m88: '464 Nm', m109: '661 Nm', m129: '773 Nm' },
    { gewinde: 'M24', m88: '798 Nm', m109: '1.136 Nm', m129: '1.329 Nm' }
  ];

  function getStoredSelection() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function saveStoredSelection(rowIndex) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rowIndex));
  }

  function applyStoredSelection() {
    const tbody = document.getElementById('eo_tbody_drehmoment');
    if (!tbody) return;
    const storedIndex = getStoredSelection();
    if (storedIndex !== null && storedIndex !== undefined) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(r => r.classList.remove('row-selected'));
      if (rows[storedIndex]) {
        rows[storedIndex].classList.add('row-selected');
      }
    }
  }

  function renderTable() {
    const tbody = document.getElementById('eo_tbody_drehmoment');
    if (!tbody) return;
    tbody.innerHTML = drehmomentData.map(r => `
      <tr class="bg-amber-50/55">
        <td class="py-2.5 px-3 font-bold">${r.gewinde}</td>
        <td class="py-2.5 px-3">${r.m88}</td>
        <td class="py-2.5 px-3">${r.m109}</td>
        <td class="py-2.5 px-3">${r.m129}</td>
      </tr>
    `).join('');
    applyStoredSelection();
  }

  function initInteractions() {
    const tbody = document.getElementById('eo_tbody_drehmoment');
    if (!tbody || tbody.dataset.persistentBound) return;
    tbody.dataset.persistentBound = 'true';
    tbody.style.cursor = 'pointer';

    tbody.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (!row || !tbody.contains(row)) return;

      tbody.querySelectorAll('tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      row.classList.add('row-selected');

      const rows = Array.from(tbody.querySelectorAll('tr'));
      const index = rows.indexOf(row);
      saveStoredSelection(index);
    });

    applyStoredSelection();
  }

  function init() {
    renderTable();
    initInteractions();
  }

  return { init };
})();
