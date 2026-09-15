/**
 * ============================================================================
 * ZANGENSCHLOSSER APP (Dr. Zange) - Modul Drehmoment (v1.10.68)
 * ============================================================================
 */

const DrehmomentApp = (() => {
  let isInitialized = false;

  const dataDrehmoment = [
    { gewinde: 'M 4', nm88: '3.0', nm109: '4.4', nm129: '5.1' },
    { gewinde: 'M 5', nm88: '5.9', nm109: '8.7', nm129: '10.0' },
    { gewinde: 'M 6', nm88: '10.1', nm109: '15.0', nm129: '17.6' },
    { gewinde: 'M 8', nm88: '24.6', nm109: '36.5', nm129: '43.0' },
    { gewinde: 'M 10', nm88: '48.0', nm109: '72.0', nm129: '84.0' },
    { gewinde: 'M 12', nm88: '84.0', nm109: '123.0', nm129: '145.0' },
    { gewinde: 'M 14', nm88: '133.0', nm109: '195.0', nm129: '230.0' },
    { gewinde: 'M 16', nm88: '200.0', nm109: '300.0', nm129: '355.0' },
    { gewinde: 'M 18', nm88: '275.0', nm109: '395.0', nm129: '460.0' },
    { gewinde: 'M 20', nm88: '390.0', nm109: '560.0', nm129: '650.0' },
    { gewinde: 'M 22', nm88: '530.0', nm109: '760.0', nm129: '880.0' },
    { gewinde: 'M 24', nm88: '670.0', nm109: '960.0', nm129: '1120.0' }
  ];

  function init() {
    renderDrehmomentTable();
    isInitialized = true;
  }

  function renderDrehmomentTable() {
    const tbody = document.getElementById('eo_tbody_drehmoment');
    if (!tbody) return;
    tbody.innerHTML = '';

    dataDrehmoment.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-amber-100/40 cursor-pointer transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-3 font-bold">${row.gewinde}</td>
        <td class="py-2.5 px-3 text-amber-800 font-semibold">${row.nm88}</td>
        <td class="py-2.5 px-3 text-slate-700">${row.nm109}</td>
        <td class="py-2.5 px-3 text-slate-700">${row.nm129}</td>
      `;
      tr.onclick = () => selectRow(tbody, tr);
      if (idx === 0) selectRow(tbody, tr);
      tbody.appendChild(tr);
    });
  }

  function selectRow(tbody, tr) {
    tbody.querySelectorAll('tr').forEach(r => r.classList.remove('row-selected'));
    tr.classList.add('row-selected');
  }

  return {
    init,
    get isInitialized() { return isInitialized; }
  };
})();
