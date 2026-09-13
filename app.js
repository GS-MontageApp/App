window.App = (() => {
  const state = { currentView: 'eoform', currentEoSub: 'din' };

  // --- Views Renderer ---
  const views = {
    etagen: () => `
      <div class="bg-white p-5 rounded-2xl shadow-sm space-y-4">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Etagenrechner (3D-Isometrie)</h2>
        <p class="text-xs text-slate-600">Berechnung von Höhenversatz (V), Seitenversatz (H), Schräglänge (T) und Nachziehlänge (NZ).</p>
      </div>
    `,
    zuschnitt: () => `
      <div class="bg-white p-5 rounded-2xl shadow-sm space-y-4">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zuschnittsrechner (Rohr-Ø-Kette)</h2>
        <p class="text-xs text-slate-600">Schenkel-Ketten-Berechnung mit Cutback-Abzug.</p>
      </div>
    `,
    drehwinkel: () => `
      <div class="bg-white p-5 rounded-2xl shadow-sm space-y-4">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verdrehwinkel & Armaturen-Dial</h2>
        <p class="text-xs text-slate-600">Winkelscheibe (0–315°) und Armaturen-Galerie (Anschluss A/B).</p>
      </div>
    `,
    eoform: () => `
      <!-- Subview 1: Einstecktiefe Standard -->
      <section id="eo_sub_din" class="eo-sub-section bg-white p-5 rounded-2xl shadow-sm space-y-4 ${state.currentEoSub !== 'din' ? 'hidden' : ''}">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grundmaße & Einstecktiefe (DIN 2353 / ISO 8434-1)</h2>
        <div class="overflow-x-auto max-h-[50vh]">
          <table class="w-full text-left text-xs border-collapse whitespace-nowrap">
            <thead class="sticky top-0 bg-white z-10 shadow-xs">
              <tr class="border-b border-slate-200 text-slate-500 uppercase">
                <th class="py-2.5 px-2 bg-white">Baureihe</th>
                <th class="py-2.5 px-2 bg-white">Rohr-Ø</th>
                <th class="py-2.5 px-2 bg-white">Einstecktiefe (l₁)</th>
                <th class="py-2.5 px-2 bg-white">Überwurfmutter</th>
                <th class="py-2.5 px-2 bg-white">PN (Stahl max.)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
              <tr class="bg-emerald-50/70" data-row-id="din-6l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">6L</td><td class="py-2.5 px-2 font-mono">7,0 mm</td><td class="py-2.5 px-2">M12x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-8l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">8L</td><td class="py-2.5 px-2 font-mono">7,0 mm</td><td class="py-2.5 px-2">M14x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-10l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">10L</td><td class="py-2.5 px-2 font-mono">7,5 mm</td><td class="py-2.5 px-2">M16x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-12l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">12L</td><td class="py-2.5 px-2 font-mono">7,5 mm</td><td class="py-2.5 px-2">M18x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-15l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">15L</td><td class="py-2.5 px-2 font-mono">10,0 mm</td><td class="py-2.5 px-2">M22x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-18l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">18L</td><td class="py-2.5 px-2 font-mono">10,0 mm</td><td class="py-2.5 px-2">M26x1,5</td><td class="py-2.5 px-2">315 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-22l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">22L</td><td class="py-2.5 px-2 font-mono">11,5 mm</td><td class="py-2.5 px-2">M30x2</td><td class="py-2.5 px-2">160 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-28l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">28L</td><td class="py-2.5 px-2 font-mono">11,5 mm</td><td class="py-2.5 px-2">M36x2</td><td class="py-2.5 px-2">160 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-35l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">35L</td><td class="py-2.5 px-2 font-mono">14,0 mm</td><td class="py-2.5 px-2">M45x2</td><td class="py-2.5 px-2">160 bar</td></tr>
              <tr class="bg-emerald-50/70" data-row-id="din-42l"><td class="py-2.5 px-2">Leicht (L)</td><td class="py-2.5 px-2 font-bold">42L</td><td class="py-2.5 px-2 font-mono">14,0 mm</td><td class="py-2.5 px-2">M52x2</td><td class="py-2.5 px-2">160 bar</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-6s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">6S</td><td class="py-2.5 px-2 font-mono">7,0 mm</td><td class="py-2.5 px-2">M14x1,5</td><td class="py-2.5 px-2">630 bar*</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-8s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">8S</td><td class="py-2.5 px-2 font-mono">7,0 mm</td><td class="py-2.5 px-2">M16x1,5</td><td class="py-2.5 px-2">630 bar*</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-10s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">10S</td><td class="py-2.5 px-2 font-mono">7,5 mm</td><td class="py-2.5 px-2">M18x1,5</td><td class="py-2.5 px-2">630 bar*</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-12s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">12S</td><td class="py-2.5 px-2 font-mono">7,5 mm</td><td class="py-2.5 px-2">M20x1,5</td><td class="py-2.5 px-2">630 bar*</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-14s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">14S</td><td class="py-2.5 px-2 font-mono">7,5 mm</td><td class="py-2.5 px-2">M22x1,5</td><td class="py-2.5 px-2">630 bar*</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-16s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">16S</td><td class="py-2.5 px-2 font-mono">8,5 mm</td><td class="py-2.5 px-2">M24x1,5</td><td class="py-2.5 px-2">400 bar</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-20s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">20S</td><td class="py-2.5 px-2 font-mono">10,5 mm</td><td class="py-2.5 px-2">M30x2</td><td class="py-2.5 px-2">400 bar</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-25s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">25S</td><td class="py-2.5 px-2 font-mono">12,0 mm</td><td class="py-2.5 px-2">M36x2</td><td class="py-2.5 px-2">400 bar</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-30s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">30S</td><td class="py-2.5 px-2 font-mono">13,5 mm</td><td class="py-2.5 px-2">M42x2</td><td class="py-2.5 px-2">250 bar</td></tr>
              <tr class="bg-red-50/70" data-row-id="din-38s"><td class="py-2.5 px-2 font-bold text-slate-800">Schwer (S)</td><td class="py-2.5 px-2 font-bold text-indigo-700">38S</td><td class="py-2.5 px-2 font-mono">16,0 mm</td><td class="py-2.5 px-2">M52x2</td><td class="py-2.5 px-2">250 bar</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Subview 2: EO-Form L -->
      <section id="eo_sub_l" class="eo-sub-section bg-white p-5 rounded-2xl shadow-sm space-y-4 ${state.currentEoSub !== 'l' ? 'hidden' : ''}">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Parker EO2-FORM | EO-Form L Umformwerte</h2>
      </section>

      <!-- Subview 3: EO-Form-S -->
      <section id="eo_sub_s" class="eo-sub-section bg-white p-5 rounded-2xl shadow-sm space-y-4 ${state.currentEoSub !== 's' ? 'hidden' : ''}">
        <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Parker EO2-FORM | EO-Form-S Umformwerte</h2>
      </section>

      <!-- Daumengerechte Sub-Nav unten -->
      <section class="bg-white p-2 rounded-2xl shadow-sm flex gap-1 border border-slate-200 mt-auto sticky bottom-14 z-20">
        <button onclick="App.switchEoSub('din')" id="eo_tab_din" class="flex-1 py-2.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold ${state.currentEoSub === 'din' ? 'bg-[#005691] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'} transition-all">Einstecktiefe</button>
        <button onclick="App.switchEoSub('l')" id="eo_tab_l" class="flex-1 py-2.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold ${state.currentEoSub === 'l' ? 'bg-[#005691] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'} transition-all">EO-Form L</button>
        <button onclick="App.switchEoSub('s')" id="eo_tab_s" class="flex-1 py-2.5 px-1 rounded-xl text-[11px] sm:text-xs font-bold ${state.currentEoSub === 's' ? 'bg-[#005691] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'} transition-all">EO-Form-S</button>
      </section>
    </div>
  `,

  switchView(viewId) {
    state.currentView = viewId;
    ['etagen', 'zuschnitt', 'drehwinkel', 'eoform'].forEach(v => {
      const container = document.getElementById('view-' + v);
      if (container) {
        if (v === viewId) {
          container.innerHTML = views[v]();
          container.classList.remove('hidden');
        } else {
          container.classList.add('hidden');
        }
      }
    });
    if (viewId === 'eoform') initTableInteractions();
  },

  switchEoSub(sub) {
    state.currentEoSub = sub;
    this.switchView('eoform');
  },

  initTableInteractions() {
    document.querySelectorAll('#view-eoform tbody tr').forEach((row, index) => {
      row.style.cursor = 'pointer';
      const rowId = row.getAttribute('data-row-id') || ('row-' + index);
      const subKey = state.currentEoSub;
      
      if (localStorage.getItem('drzange_row_sel_' + subKey) === rowId) {
        row.classList.add('row-selected');
      }

      row.addEventListener('click', () => {
        row.closest('tbody').querySelectorAll('tr.row-selected').forEach(r => r.classList.remove('row-selected'));
        row.classList.add('row-selected');
        localStorage.setItem('drzange_row_sel_' + subKey, rowId);
      });
    });
  },

  openLogbookModal(type) {
    const container = document.getElementById('logbook-content');
    container.innerHTML = '';
    const list = window.allLogbooks && window.allLogbooks[type] ? window.allLogbooks[type] : [];
    list.forEach(entry => {
      const div = document.createElement('div');
      div.className = `p-3 rounded-xl border-l-4 bg-slate-50 space-y-1 ${entry.border || 'border-slate-400'}`;
      div.innerHTML = `<div class="flex justify-between text-[10px] text-slate-500 font-semibold"><span>${entry.version}</span><span>${entry.date}</span></div><div class="text-slate-700">${entry.text}</div>`;
      container.appendChild(div);
    });
    document.getElementById('logbook-modal').classList.remove('hidden');
  },

  closeLogbookModal() {
    document.getElementById('logbook-modal').classList.add('hidden');
  },

  init() {
    this.switchView('eoform');
  }
});

window.addEventListener('DOMContentLoaded', () => App.init());
