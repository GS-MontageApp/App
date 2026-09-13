// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL TABELLEN (DIN / EO-FORM L / EO-FORM-S) v1.10.39
// ============================================================================
window.TabellenApp = (() => {
  const dinData = [
    { type: 'Leicht (L)', od: '6L', l1: '7,0 mm', nut: 'M12x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '8L', l1: '7,0 mm', nut: 'M14x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '10L', l1: '7,5 mm', nut: 'M16x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '12L', l1: '7,5 mm', nut: 'M18x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '15L', l1: '10,0 mm', nut: 'M22x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '18L', l1: '10,0 mm', nut: 'M26x1,5', pn: '315 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '22L', l1: '11,5 mm', nut: 'M30x2', pn: '160 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '28L', l1: '11,5 mm', nut: 'M36x2', pn: '160 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '35L', l1: '14,0 mm', nut: 'M45x2', pn: '160 bar', cls: 'bg-emerald-50/70' },
    { type: 'Leicht (L)', od: '42L', l1: '14,0 mm', nut: 'M52x2', pn: '160 bar', cls: 'bg-emerald-50/70' },
    { type: 'Schwer (S)', od: '6S', l1: '7,0 mm', nut: 'M14x1,5', pn: '630 bar*', cls: 'bg-red-50/70 group-start-s', bold: true },
    { type: 'Schwer (S)', od: '8S', l1: '7,0 mm', nut: 'M16x1,5', pn: '630 bar*', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '10S', l1: '7,5 mm', nut: 'M18x1,5', pn: '630 bar*', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '12S', l1: '7,5 mm', nut: 'M20x1,5', pn: '630 bar*', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '14S', l1: '7,5 mm', nut: 'M22x1,5', pn: '630 bar*', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '16S', l1: '8,5 mm', nut: 'M24x1,5', pn: '400 bar', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '20S', l1: '10,5 mm', nut: 'M30x2', pn: '400 bar', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '25S', l1: '12,0 mm', nut: 'M36x2', pn: '400 bar', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '30S', l1: '13,5 mm', nut: 'M42x2', pn: '250 bar', cls: 'bg-red-50/70', bold: true },
    { type: 'Schwer (S)', od: '38S', l1: '16,0 mm', nut: 'M52x2', pn: '250 bar', cls: 'bg-red-50/70', bold: true }
  ];

  const eoFormLData = [
    { od: '6L', s: '1.0', lStahl: '6.0', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.0', l2: '90', l3: '63', group: 'group-start-l' },
    { od: '6L', s: '1.5', lStahl: '6.0', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.0', l2: '', l3: '' },
    { od: '6L', s: '2.0', lStahl: '5.5', lEdel: '—', l1Stahl: '12.5', l1Edel: '—', l2: '', l3: '' },
    { od: '8L', s: '1.0', lStahl: '5.5', lEdel: '5.5', l1Stahl: '12.5', l1Edel: '12.5', l2: '92', l3: '65', group: 'group-start-l' },
    { od: '8L', s: '1.5', lStahl: '5.5', lEdel: '5.5', l1Stahl: '12.5', l1Edel: '12.5', l2: '', l3: '' },
    { od: '8L', s: '2.0', lStahl: '5.0', lEdel: '—', l1Stahl: '12.0', l1Edel: '—', l2: '', l3: '' },
    { od: '8L', s: '2.5', lStahl: '4.5', lEdel: '—', l1Stahl: '11.5', l1Edel: '—', l2: '', l3: '' },
    { od: '10L', s: '1.0', lStahl: '5.5', lEdel: '5.5', l1Stahl: '12.5', l1Edel: '12.5', l2: '95', l3: '68', group: 'group-start-l' },
    { od: '10L', s: '1.5', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.0', l1Edel: '13.0', l2: '', l3: '' },
    { od: '10L', s: '2.0', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.0', l1Edel: '13.0', l2: '', l3: '' },
    { od: '12L', s: '1.0', lStahl: '4.5', lEdel: '5.0', l1Stahl: '11.5', l1Edel: '12.0', l2: '95', l3: '70', group: 'group-start-l' },
    { od: '12L', s: '1.5', lStahl: '5.0', lEdel: '5.5', l1Stahl: '12.0', l1Edel: '12.5', l2: '', l3: '' },
    { od: '12L', s: '2.0', lStahl: '5.0', lEdel: '5.5', l1Stahl: '12.0', l1Edel: '12.5', l2: '', l3: '' },
    { od: '15L', s: '1.0', lStahl: '5.0', lEdel: '6.5', l1Stahl: '12.0', l1Edel: '13.5', l2: '102', l3: '75', group: 'group-start-l' },
    { od: '15L', s: '1.5', lStahl: '5.0', lEdel: '6.5', l1Stahl: '12.0', l1Edel: '13.5', l2: '', l3: '' },
    { od: '15L', s: '2.0', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.0', l1Edel: '13.0', l2: '', l3: '' },
    { od: '15L', s: '2.5', lStahl: '5.0', lEdel: '—', l1Stahl: '12.0', l1Edel: '—', l2: '', l3: '' },
    { od: '18L', s: '1.5', lStahl: '5.5', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.5', l2: '110', l3: '80', group: 'group-start-l' },
    { od: '18L', s: '2.0', lStahl: '5.5', lEdel: '6.5', l1Stahl: '13.0', l1Edel: '14.0', l2: '', l3: '' },
    { od: '18L', s: '2.5', lStahl: '6.0', lEdel: '—', l1Stahl: '14.0', l1Edel: '—', l2: '', l3: '' },
    { od: '18L', s: '3.0', lStahl: '6.0', lEdel: '6.5', l1Stahl: '14.0', l1Edel: '14.0', l2: '', l3: '' },
    { od: '22L', s: '1.5', lStahl: '6.0', lEdel: '6.0', l1Stahl: '13.5', l1Edel: '13.5', l2: '120', l3: '90', group: 'group-start-l' },
    { od: '22L', s: '2.0', lStahl: '6.5', lEdel: '7.0', l1Stahl: '14.0', l1Edel: '14.5', l2: '', l3: '' },
    { od: '22L', s: '2.5', lStahl: '6.5', lEdel: '7.0', l1Stahl: '14.0', l1Edel: '14.5', l2: '', l3: '' },
    { od: '22L', s: '3.0', lStahl: '7.0', lEdel: '7.5', l1Stahl: '14.5', l1Edel: '15.0', l2: '', l3: '' },
    { od: '28L', s: '1.5', lStahl: '5.5', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.5', l2: '140', l3: '98', group: 'group-start-l' },
    { od: '28L', s: '2.0', lStahl: '5.5', lEdel: '7.0', l1Stahl: '13.0', l1Edel: '14.5', l2: '', l3: '' },
    { od: '28L', s: '2.5', lStahl: '7.0', lEdel: '7.5', l1Stahl: '14.5', l1Edel: '15.0', l2: '', l3: '' },
    { od: '28L', s: '3.0', lStahl: '7.0', lEdel: '—', l1Stahl: '14.5', l1Edel: '—', l2: '', l3: '' },
    { od: '28L', s: '4.0', lStahl: '6.5', lEdel: '—', l1Stahl: '14.0', l1Edel: '—', l2: '', l3: '' },
    { od: '35L', s: '2.0', lStahl: '7.0', lEdel: '8.5', l1Stahl: '17.5', l1Edel: '19.0', l2: '170', l3: '115', group: 'group-start-l' },
    { od: '35L', s: '2.5', lStahl: '7.5', lEdel: '9.5', l1Stahl: '18.0', l1Edel: '20.0', l2: '', l3: '' },
    { od: '35L', s: '3.0', lStahl: '8.5', lEdel: '10.5', l1Stahl: '19.0', l1Edel: '21.0', l2: '', l3: '' },
    { od: '42L', s: '2.0', lStahl: '7.5', lEdel: '7.5', l1Stahl: '18.5', l1Edel: '18.5', l2: '190', l3: '125', group: 'group-start-l' },
    { od: '42L', s: '3.0', lStahl: '9.0', lEdel: '10.5', l1Stahl: '20.0', l1Edel: '21.5', l2: '', l3: '' },
    { od: '42L', s: '4.0', lStahl: '9.0', lEdel: '10.5', l1Stahl: '20.0', l1Edel: '21.5', l2: '', l3: '' },
    { od: '42L', s: '5.0', lStahl: '10.0', lEdel: '—', l1Stahl: '21.0', l1Edel: '—', l2: '', l3: '' }
  ];

  const eoFormSData = [
    { od: '6S', s: '1.0', lStahl: '6.0', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.0', l2: '92', l3: '65', group: 'group-start-s' },
    { od: '6S', s: '1.5', lStahl: '6.0', lEdel: '6.0', l1Stahl: '13.0', l1Edel: '13.0', l2: '', l3: '' },
    { od: '6S', s: '2.0', lStahl: '5.5', lEdel: '—', l1Stahl: '12.5', l1Edel: '—', l2: '', l3: '' },
    { od: '8S', s: '1.0', lStahl: '5.5', lEdel: '5.5', l1Stahl: '12.5', l1Edel: '12.5', l2: '92', l3: '68', group: 'group-start-s' },
    { od: '8S', s: '1.5', lStahl: '5.5', lEdel: '5.5', l1Stahl: '12.5', l1Edel: '12.5', l2: '', l3: '' },
    { od: '8S', s: '2.0', lStahl: '5.0', lEdel: '—', l1Stahl: '12.0', l1Edel: '—', l2: '', l3: '' },
    { od: '10S', s: '1.5', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.0', l1Edel: '13.5', l2: '100', l3: '70', group: 'group-start-s' },
    { od: '10S', s: '2.0', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.0', l1Edel: '13.5', l2: '', l3: '' },
    { od: '12S', s: '1.5', lStahl: '5.0', lEdel: '6.5', l1Stahl: '12.5', l1Edel: '14.0', l2: '100', l3: '72', group: 'group-start-s' },
    { od: '12S', s: '2.0', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.5', l1Edel: '13.5', l2: '', l3: '' },
    { od: '12S', s: '2.5', lStahl: '5.0', lEdel: '6.0', l1Stahl: '12.5', l1Edel: '13.5', l2: '', l3: '' },
    { od: '12S', s: '3.0', lStahl: '4.5', lEdel: '4.5', l1Stahl: '12.0', l1Edel: '12.0', l2: '', l3: '' },
    { od: '16S', s: '2.0', lStahl: '5.5', lEdel: '6.5', l1Stahl: '13.5', l1Edel: '15.0', l2: '135', l3: '98', group: 'group-start-s' },
    { od: '16S', s: '2.5', lStahl: '5.5', lEdel: '6.5', l1Stahl: '13.5', l1Edel: '15.0', l2: '', l3: '' },
    { od: '16S', s: '3.0', lStahl: '5.0', lEdel: '6.5', l1Stahl: '13.0', l1Edel: '15.0', l2: '', l3: '' },
    { od: '20S', s: '2.0', lStahl: '7.0', lEdel: '7.0', l1Stahl: '17.5', l1Edel: '18.5', l2: '155', l3: '112', group: 'group-start-s' },
    { od: '20S', s: '2.5', lStahl: '7.0', lEdel: '8.0', l1Stahl: '17.5', l1Edel: '18.5', l2: '', l3: '' },
    { od: '20S', s: '3.0', lStahl: '7.0', lEdel: '8.0', l1Stahl: '17.5', l1Edel: '18.5', l2: '', l3: '' },
    { od: '20S', s: '3.5', lStahl: '7.0', lEdel: '—', l1Stahl: '17.5', l1Edel: '—', l2: '', l3: '' },
    { od: '25S', s: '2.0', lStahl: '8.5', lEdel: '8.5', l1Stahl: '20.5', l1Edel: '20.5', l2: '140', l3: '98', group: 'group-start-s' },
    { od: '25S', s: '2.5', lStahl: '8.5', lEdel: '9.0', l1Stahl: '20.5', l1Edel: '21.0', l2: '', l3: '' },
    { od: '25S', s: '3.0', lStahl: '8.0', lEdel: '9.5', l1Stahl: '20.0', l1Edel: '21.5', l2: '', l3: '' },
    { od: '25S', s: '4.0', lStahl: '8.5', lEdel: '9.5', l1Stahl: '20.5', l1Edel: '21.5', l2: '', l3: '' },
    { od: '30S', s: '3.0', lStahl: '8.5', lEdel: '9.5', l1Stahl: '22.0', l1Edel: '23.0', l2: '165', l3: '122', group: 'group-start-s' },
    { od: '30S', s: '4.0', lStahl: '9.5', lEdel: '10.0', l1Stahl: '23.0', l1Edel: '23.5', l2: '', l3: '' },
    { od: '30S', s: '5.0', lStahl: '8.5', lEdel: '9.0', l1Stahl: '22.0', l1Edel: '22.5', l2: '', l3: '' },
    { od: '38S', s: '3.0', lStahl: '10.0', lEdel: '9.5', l1Stahl: '26.0', l1Edel: '25.5', l2: '190', l3: '135', group: 'group-start-s' },
    { od: '38S', s: '4.0', lStahl: '10.0', lEdel: '11.0', l1Stahl: '26.0', l1Edel: '27.0', l2: '', l3: '' },
    { od: '38S', s: '5.0', lStahl: '11.0', lEdel: '12.5', l1Stahl: '27.0', l1Edel: '28.5', l2: '', l3: '' },
    { od: '38S', s: '6.0', lStahl: '11.5', lEdel: '12.5', l1Stahl: '27.5', l1Edel: '28.5', l2: '', l3: '' },
    { od: '38S', s: '7.0', lStahl: '11.5', lEdel: '12.5', l1Stahl: '27.5', l1Edel: '28.5', l2: '', l3: '' }
  ];

  function renderTables() {
    const dinTbody = document.getElementById('eo_tbody_din');
    if (dinTbody) {
      dinTbody.innerHTML = dinData.map(r => `
        <tr class="${r.cls || ''}">
          <td class="py-2.5 px-2 ${r.bold ? 'font-bold text-slate-800' : ''}">${r.type}</td>
          <td class="py-2.5 px-2 font-bold ${r.od.endsWith('S') ? 'text-indigo-700' : ''}">${r.od}</td>
          <td class="py-2.5 px-2 font-mono">${r.l1}</td>
          <td class="py-2.5 px-2">${r.nut}</td>
          <td class="py-2.5 px-2">${r.pn}</td>
        </tr>
      `).join('');
    }

    const lTbody = document.getElementById('eo_tbody_l');
    if (lTbody) {
      lTbody.innerHTML = eoFormLData.map(r => `
        <tr class="bg-emerald-50/50 ${r.group || ''}">
          <td class="py-2 px-2 font-bold">${r.od}</td>
          <td class="py-2 px-2">${r.s}</td>
          <td class="py-2 px-2">${r.lStahl}</td>
          <td class="py-2 px-2">${r.lEdel}</td>
          <td class="py-2 px-2">${r.l1Stahl}</td>
          <td class="py-2 px-2">${r.l1Edel}</td>
          <td class="py-2 px-2">${r.l2 || ''}</td>
          <td class="py-2 px-2">${r.l3 || ''}</td>
        </tr>
      `).join('');
    }

    const sTbody = document.getElementById('eo_tbody_s');
    if (sTbody) {
      sTbody.innerHTML = eoFormSData.map(r => `
        <tr class="bg-red-50/50 ${r.group || ''}">
          <td class="py-2 px-2 font-bold">${r.od}</td>
          <td class="py-2 px-2">${r.s}</td>
          <td class="py-2 px-2">${r.lStahl}</td>
          <td class="py-2 px-2">${r.lEdel}</td>
          <td class="py-2 px-2">${r.l1Stahl}</td>
          <td class="py-2 px-2">${r.l1Edel}</td>
          <td class="py-2 px-2">${r.l2 || ''}</td>
          <td class="py-2 px-2">${r.l3 || ''}</td>
        </tr>
      `).join('');
    }
  }

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
    renderTables();
    initTableInteractions();
    switchEoSub('din');
  }

  return { init, switchEoSub };
})();

window.switchEoSub = (subKey) => window.TabellenApp.switchEoSub(subKey);
