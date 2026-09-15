/**
 * ============================================================================
 * ZANGENSCHLOSSER APP (Dr. Zange) - Modul Tabellen (v1.10.68)
 * ============================================================================
 */

const TabellenApp = (() => {
  let isInitialized = false;

  const dataDin = [
    { baureihe: 'L', rohr: '6', einsteck: '7.0', mutter: 'M 12 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '8', einsteck: '7.5', mutter: 'M 14 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '10', einsteck: '7.5', mutter: 'M 16 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '12', einsteck: '7.5', mutter: 'M 18 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '15', einsteck: '8.5', mutter: 'M 22 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '18', einsteck: '9.5', mutter: 'M 26 x 1.5', pn: '315' },
    { baureihe: 'L', rohr: '22', einsteck: '11.0', mutter: 'M 30 x 2', pn: '160' },
    { baureihe: 'L', rohr: '28', einsteck: '11.5', mutter: 'M 36 x 2', pn: '160' },
    { baureihe: 'L', rohr: '35', einsteck: '13.5', mutter: 'M 45 x 2', pn: '160' },
    { baureihe: 'L', rohr: '42', einsteck: '14.5', mutter: 'M 52 x 2', pn: '160' },

    { baureihe: 'S', rohr: '6', einsteck: '7.0', mutter: 'M 14 x 1.5', pn: '630' },
    { baureihe: 'S', rohr: '8', einsteck: '7.5', mutter: 'M 16 x 1.5', pn: '630' },
    { baureihe: 'S', rohr: '10', einsteck: '7.5', mutter: 'M 18 x 1.5', pn: '630' },
    { baureihe: 'S', rohr: '12', einsteck: '7.5', mutter: 'M 20 x 1.5', pn: '630' },
    { baureihe: 'S', rohr: '14', einsteck: '9.0', mutter: 'M 22 x 1.5', pn: '630' },
    { baureihe: 'S', rohr: '16', einsteck: '9.5', mutter: 'M 24 x 1.5', pn: '400' },
    { baureihe: 'S', rohr: '20', einsteck: '11.5', mutter: 'M 30 x 2', pn: '400' },
    { baureihe: 'S', rohr: '25', einsteck: '13.0', mutter: 'M 36 x 2', pn: '400' },
    { baureihe: 'S', rohr: '30', einsteck: '14.5', mutter: 'M 42 x 2', pn: '400' },
    { baureihe: 'S', rohr: '38', einsteck: '16.0', mutter: 'M 52 x 2', pn: '315' }
  ];

  const dataL = [
    { ad: '6', wand: '1.0', lStahl: '18.0', lEdel: '18.5', l1Stahl: '7.0', l1Edel: '7.5', l2: '27.0', l3: '33.0' },
    { ad: '8', wand: '1.0', lStahl: '18.5', lEdel: '19.0', l1Stahl: '7.5', l1Edel: '8.0', l2: '27.5', l3: '34.0' },
    { ad: '10', wand: '1.25', lStahl: '18.5', lEdel: '19.0', l1Stahl: '7.5', l1Edel: '8.0', l2: '28.0', l3: '35.0' },
    { ad: '12', wand: '1.5', lStahl: '18.5', lEdel: '19.5', l1Stahl: '7.5', l1Edel: '8.5', l2: '29.0', l3: '36.0' },
    { ad: '15', wand: '1.5', lStahl: '21.0', lEdel: '21.5', l1Stahl: '8.5', l1Edel: '9.0', l2: '32.5', l3: '40.0' },
    { ad: '18', wand: '1.5', lStahl: '22.5', lEdel: '23.0', l1Stahl: '9.5', l1Edel: '10.0', l2: '35.5', l3: '43.0' },
    { ad: '22', wand: '2.0', lStahl: '25.0', lEdel: '26.0', l1Stahl: '11.0', l1Edel: '12.0', l2: '38.5', l3: '48.0' },
    { ad: '28', wand: '2.0', lStahl: '26.0', lEdel: '27.0', l1Stahl: '11.5', l1Edel: '12.5', l2: '41.5', l3: '51.0' },
    { ad: '35', wand: '2.5', lStahl: '29.5', lEdel: '30.5', l1Stahl: '13.5', l1Edel: '14.5', l2: '49.0', l3: '60.0' },
    { ad: '42', wand: '3.0', lStahl: '32.5', lEdel: '33.5', l1Stahl: '14.5', l1Edel: '15.5', l2: '53.0', l3: '64.0' }
  ];

  const dataS = [
    { ad: '6', wand: '1.5', lStahl: '18.0', lEdel: '18.5', l1Stahl: '7.0', l1Edel: '7.5', l2: '27.0', l3: '33.0' },
    { ad: '8', wand: '1.5', lStahl: '18.5', lEdel: '19.0', l1Stahl: '7.5', l1Edel: '8.0', l2: '27.5', l3: '34.0' },
    { ad: '10', wand: '1.5', lStahl: '18.5', lEdel: '19.0', l1Stahl: '7.5', l1Edel: '8.0', l2: '28.0', l3: '35.0' },
    { ad: '12', wand: '2.0', lStahl: '18.5', lEdel: '19.5', l1Stahl: '7.5', l1Edel: '8.5', l2: '29.5', l3: '37.0' },
    { ad: '14', wand: '2.5', lStahl: '21.5', lEdel: '22.5', l1Stahl: '9.0', l1Edel: '10.0', l2: '33.5', l3: '42.0' },
    { ad: '16', wand: '2.5', lStahl: '22.5', lEdel: '23.5', l1Stahl: '9.5', l1Edel: '10.5', l2: '34.5', l3: '43.0' },
    { ad: '20', wand: '3.0', lStahl: '26.5', lEdel: '27.5', l1Stahl: '11.5', l1Edel: '12.5', l2: '41.5', l3: '52.0' },
    { ad: '25', wand: '4.0', lStahl: '30.0', lEdel: '31.5', l1Stahl: '13.0', l1Edel: '14.5', l2: '47.0', l3: '59.0' },
    { ad: '30', wand: '4.0', lStahl: '33.5', lEdel: '35.0', l1Stahl: '14.5', l1Edel: '16.0', l2: '51.5', l3: '64.0' },
    { ad: '38', wand: '5.0', lStahl: '38.0', lEdel: '40.0', l1Stahl: '16.0', l1Edel: '18.0', l2: '58.5', l3: '73.0' }
  ];

  function init() {
    renderDinTable();
    renderLTable();
    renderSTable();
    isInitialized = true;
  }

  function renderDinTable() {
    const tbody = document.getElementById('eo_tbody_din');
    if (!tbody) return;
    tbody.innerHTML = '';

    dataDin.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 cursor-pointer transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-3">${row.baureihe}</td>
        <td class="py-2.5 px-3 font-semibold">${row.rohr} mm</td>
        <td class="py-2.5 px-3 text-indigo-600 font-bold">${row.einsteck} mm</td>
        <td class="py-2.5 px-3 text-slate-500">${row.mutter}</td>
        <td class="py-2.5 px-3 text-slate-500">${row.pn} bar</td>
      `;
      tr.onclick = () => selectRow(tbody, tr);
      if (idx === 0) selectRow(tbody, tr);
      tbody.appendChild(tr);
    });
  }

  function renderLTable() {
    const tbody = document.getElementById('eo_tbody_l');
    if (!tbody) return;
    tbody.innerHTML = '';

    dataL.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-emerald-100/40 cursor-pointer transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-2 font-bold">${row.ad} mm</td>
        <td class="py-2.5 px-2 text-slate-600">${row.wand}</td>
        <td class="py-2.5 px-2 font-semibold text-emerald-700">${row.lStahl}</td>
        <td class="py-2.5 px-2 text-slate-600">${row.lEdel}</td>
        <td class="py-2.5 px-2">${row.l1Stahl}</td>
        <td class="py-2.5 px-2 text-slate-600">${row.l1Edel}</td>
        <td class="py-2.5 px-2">${row.l2}</td>
        <td class="py-2.5 px-2">${row.l3}</td>
      `;
      tr.onclick = () => selectRow(tbody, tr);
      if (idx === 0) selectRow(tbody, tr);
      tbody.appendChild(tr);
    });
  }

  function renderSTable() {
    const tbody = document.getElementById('eo_tbody_s');
    if (!tbody) return;
    tbody.innerHTML = '';

    dataS.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-red-100/40 cursor-pointer transition-colors';
      tr.innerHTML = `
        <td class="py-2.5 px-2 font-bold">${row.ad} mm</td>
        <td class="py-2.5 px-2 text-slate-600">${row.wand}</td>
        <td class="py-2.5 px-2 font-semibold text-red-700">${row.lStahl}</td>
        <td class="py-2.5 px-2 text-slate-600">${row.lEdel}</td>
        <td class="py-2.5 px-2">${row.l1Stahl}</td>
        <td class="py-2.5 px-2 text-slate-600">${row.l1Edel}</td>
        <td class="py-2.5 px-2">${row.l2}</td>
        <td class="py-2.5 px-2">${row.l3}</td>
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

  function switchEoSub(subId) {
    document.querySelectorAll('.eo-sub-section').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`eo_sub_${subId}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('flex');
    }

    ['din', 'l', 's', 'drehmoment'].forEach(id => {
      const btn = document.getElementById(`eo_tab_${id}`);
      if (!btn) return;
      if (id === subId) {
        btn.className = 'flex-1 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold bg-[#005691] text-white transition-all shadow-sm';
      } else {
        btn.className = 'flex-1 py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold text-slate-600 hover:text-slate-900 transition-all';
      }
    });

    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
      const titles = {
        din: 'Tabellen | Einstecktiefe',
        l: 'Tabellen | EO-FORM L',
        s: 'Tabellen | EO-FORM S',
        drehmoment: 'Tabellen | Drehmoment'
      };
      headerTitle.textContent = titles[subId] || 'Tabellen';
    }
  }

  return {
    init,
    switchEoSub,
    get isInitialized() { return isInitialized; }
  };
})();

function switchEoSub(id) { TabellenApp.switchEoSub(id); }
