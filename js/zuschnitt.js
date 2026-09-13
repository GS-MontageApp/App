// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL ZUSCHNITTSRECHNER (Chain + Clear + Export v1.10.60)
// ============================================================================
window.ZuschnittApp = (() => {
  let state = {
    durchmesser: null,
    rfaktor: null,
    schenkel: [0, 0, 0, 0, 0],
    winkel: [0, 0, 0, 0]
  };

  function parseVal(idOrInput) {
    let raw = '';
    if (typeof idOrInput === 'string') {
      const el = document.getElementById(idOrInput);
      if (el) raw = el.value.trim();
    } else if (idOrInput && idOrInput.value !== undefined) {
      raw = idOrInput.value.trim();
    }
    if (!raw) return 0;
    const num = parseFloat(raw.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }

  function formatMm(val) {
    if (isNaN(val)) return '0,0 mm';
    return val.toFixed(1).replace('.', ',') + ' mm';
  }

  function calculate() {
    const dSelect = document.getElementById('zuschnitt_durchmesser');
    const rSelect = document.getElementById('zuschnitt_rfaktor');
    
    state.durchmesser = dSelect ? parseVal(dSelect) : 0;
    state.rfaktor = rSelect ? parseVal(rSelect) : 3;

    const inputs = document.querySelectorAll('#view-zuschnitt input[data-type]');
    const schenkelArr = [0,0,0,0,0];
    const winkelArr = [0,0,0,0];

    inputs.forEach(inp => {
      const type = inp.getAttribute('data-type');
      const idx = parseInt(inp.getAttribute('data-index'), 10);
      const val = parseVal(inp);
      if (type === 'schenkel' && !isNaN(idx)) schenkelArr[idx] = val;
      if (type === 'winkel' && !isNaN(idx)) winkelArr[idx] = val;
    });

    state.schenkel = schenkelArr;
    state.winkel = winkelArr;

    const radius = state.durchmesser > 0 ? state.durchmesser * state.rfaktor : 0;
    let rawSumLegs = schenkelArr.reduce((acc, curr) => acc + curr, 0);

    let totalDeduction = 0;
    winkelArr.forEach((w) => {
      if (w > 0 && radius > 0) {
        const rad = (w * Math.PI) / 180;
        const setBack = radius * Math.tan(rad / 2);
        totalDeduction += (setBack * 2);
      }
    });

    const totalLength = Math.max(0, rawSumLegs - totalDeduction);

    const outTotal = document.getElementById('zuschnitt_out_gesamtlänge');
    const outRadius = document.getElementById('zuschnitt_out_biegeradius');
    const outSum = document.getElementById('zuschnitt_out_summeschenkel');
    const outTitle = document.getElementById('zuschnitt_out_titel');

    if (outTotal) outTotal.textContent = formatMm(totalLength);
    if (outRadius) outRadius.textContent = radius > 0 ? formatMm(radius) : '-';
    if (outSum) outSum.textContent = formatMm(rawSumLegs);
    if (outTitle) {
      outTitle.innerHTML = state.durchmesser > 0 
        ? `Ergebnis – <b>Ø ${state.durchmesser}mm (R${state.rfaktor})</b>` 
        : `Ergebnis – <i>Parameter wählen</i>`;
    }

    return { totalLength, radius, rawSumLegs };
  }

  function clearGroupInputs(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return;
    group.querySelectorAll('input').forEach(inp => {
      if (!inp.disabled) {
        inp.value = '';
      }
    });
    calculate();
  }

  function generateExportText() {
    const res = calculate();
    let text = `🔧 *Dr. Zange – Baustellen-Zuschnitt*\n`;
    text += `• Rohr-Ø: ${state.durchmesser || '-'} mm\n`;
    text += `• Radius-Faktor: R${state.rfaktor || '-'}\n`;
    text += `• Gesamtzuschnittlänge: *${res.totalLength.toFixed(1)} mm*\n\n`;
    text += `*Schenkel & Bögen:*\n`;
    state.schenkel.forEach((s, idx) => {
      if (s > 0) text += `  - Schenkel ${idx+1}: ${s} mm\n`;
      if (idx < 4 && state.winkel[idx] > 0) {
        text += `  ↪️ Bogen ${idx+1}: ${state.winkel[idx]}°\n`;
      }
    });
    return text;
  }

  function exportWhatsApp() {
    const text = generateExportText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  async function copyClipboard() {
    const text = generateExportText();
    try {
      await navigator.clipboard.writeText(text);
      showToast('Zuschnitt in Zwischenablage kopiert!');
    } catch {
      showToast('Konnte nicht kopieren');
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('app_toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app_toast';
      toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl z-50 transition-opacity opacity-0 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.remove('opacity-0');
    setTimeout(() => {
      toast.classList.add('opacity-0');
    }, 2500);
  }

  function init() {
    const inputs = document.querySelectorAll('#view-zuschnitt input');
    inputs.forEach(inp => inp.addEventListener('input', calculate));
    const selects = document.querySelectorAll('#view-zuschnitt select');
    selects.forEach(sel => sel.addEventListener('change', calculate));

    // Clear Button Bindings
    const cBase = document.getElementById('zuschnitt_clear_base');
    const c1 = document.getElementById('zuschnitt_clear_1');
    const c2 = document.getElementById('zuschnitt_clear_2');
    const c3 = document.getElementById('zuschnitt_clear_3');
    if (cBase) cBase.addEventListener('click', () => clearGroupInputs('zuschnitt_base_group'));
    if (c1) c1.addEventListener('click', () => clearGroupInputs('zuschnitt_pair_1'));
    if (c2) c2.addEventListener('click', () => clearGroupInputs('zuschnitt_pair_2'));
    if (c3) c3.addEventListener('click', () => clearGroupInputs('zuschnitt_pair_3'));

    const btnWa = document.getElementById('zuschnitt_btn_whatsapp');
    const btnCopy = document.getElementById('zuschnitt_btn_copy');
    if (btnWa) btnWa.addEventListener('click', exportWhatsApp);
    if (btnCopy) btnCopy.addEventListener('click', copyClipboard);

    calculate();
  }

  return { init, calculate, exportWhatsApp, copyClipboard };
})();
