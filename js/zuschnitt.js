window.ZuschnittApp = (() => {
  function init() {
    ['zuschnitt_durchmesser', 'zuschnitt_rfaktor'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', checkParameters);
    });
    const clearBaseBtn = document.getElementById('zuschnitt_clear_base');
    if (clearBaseBtn) clearBaseBtn.addEventListener('click', clearBaseGroup);
    
   .forEach(n => {
      const btn = document.getElementById('zuschnitt_clear_' + n);
      if (btn) btn.addEventListener('click', () => clearPair(n));
    });

    document.querySelectorAll('#view-zuschnitt input[type="text"]').forEach(input => {
      input.addEventListener('focus', function() {
        if (!this.hasAttribute('disabled')) this.value = this.value.replace(' mm', '').replace(' Grad', '');
      });
      input.addEventListener('blur', function() {
        if (this.hasAttribute('disabled')) return;
        let val = (this.value || '').replace(',', '.').trim();
        if (val !== '') {
          if (this.getAttribute('data-type') === 'schenkel') this.value = val + ' mm';
          if (this.getAttribute('data-type') === 'winkel') this.value = Math.min(Math.max(parseFloat(val) || 0, 1), 180) + ' Grad';
        }
      });
      input.addEventListener('input', () => { updateVisibility(); calculateZuschnitt(); });
    });
    checkParameters();
  }

  function checkParameters() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value, rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    document.querySelectorAll('#zuschnitt_base_group input[type="text"]').forEach(inp => {
      if (dVal && rVal) {
        inp.removeAttribute('disabled');
        inp.className = 'w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-base text-slate-800';
      } else {
        inp.setAttribute('disabled', 'true');
        inp.className = 'w-full bg-slate-200 border border-slate-300 rounded-lg p-2.5 text-base text-slate-400 cursor-not-allowed';
        inp.value = '';
      }
    });
    updateVisibility();
    calculateZuschnitt();
  }

  function updateVisibility() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value, rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    if (!dVal || !rVal) {
      ['zuschnitt_pair_1', 'zuschnitt_pair_2', 'zuschnitt_pair_3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });
      return;
    }
    const s2 = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="1"]')?.value;
    const w1 = document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="0"]')?.value;
    document.getElementById('zuschnitt_pair_1')?.classList.toggle('hidden', !s2 || !w1);

    const w2 = document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="1"]')?.value;
    const s3 = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="2"]')?.value;
    document.getElementById('zuschnitt_pair_2')?.classList.toggle('hidden', !w2 || !s3);

    const w3 = document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="2"]')?.value;
    const s4 = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="3"]')?.value;
    document.getElementById('zuschnitt_pair_3')?.classList.toggle('hidden', !w3 || !s4);
  }

  function clearBaseGroup() {
    document.querySelectorAll('#zuschnitt_base_group input').forEach(i => i.value = '');
    clearPair(1);
  }

  function clearPair(n) {
    const startIndex = n === 1 ? 1 : (n === 2 ? 2 : 3);
    const schenkelIdx = n === 1 ? 2 : (n === 2 ? 3 : 4);
    document.querySelectorAll('#view-zuschnitt input[data-type="winkel"]').forEach((inp, idx) => { if (idx >= startIndex) inp.value = ''; });
    document.querySelectorAll('#view-zuschnitt input[data-type="schenkel"]').forEach((inp, idx) => { if (idx >= schenkelIdx) inp.value = ''; });
    updateVisibility();
    calculateZuschnitt();
  }

  function getCleanVal(str) {
    return str ? str.replace(' mm', '').replace(' Grad', '').replace(',', '.').trim() : '';
  }

  function calculateZuschnitt() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value;
    const rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    const titelEl = document.getElementById('zuschnitt_out_titel');
    if (!dVal || !rVal) {
      document.getElementById('zuschnitt_out_gesamtlänge').textContent = "0 mm";
      if (titelEl) titelEl.innerHTML = "Ergebnis &ndash; <i>Parameter wählen</i>";
      document.getElementById('zuschnitt_out_biegeradius').textContent = "-";
      document.getElementById('zuschnitt_out_summeschenkel').textContent = "0 mm";
      return;
    }
    if (titelEl) titelEl.innerHTML = `Ergebnis &ndash; für <u><b>${dVal} Millimeter</b></u> Rohr`;
    let sumSchenkel = 0, schenkelVals = [];
    document.querySelectorAll('#view-zuschnitt input[data-type="schenkel"]').forEach(inp => {
      const v = parseFloat(getCleanVal(inp.value)) || 0;
      schenkelVals.push(v);
      sumSchenkel += v;
    });
    let totalCutback = 0, totalBogenMaß = 0;
    const rBiege = parseFloat(dVal) * parseFloat(rVal);
    document.querySelectorAll('#view-zuschnitt input[data-type="winkel"]').forEach((inp, idx) => {
      if (!schenkelVals[idx + 1]) return;
      let alpha = Math.min(Math.max(parseFloat(getCleanVal(inp.value)) || 0, 1), 180);
      if (alpha > 0) {
        const rad = (alpha * Math.PI) / 180;
        totalCutback += (2 * rBiege * Math.tan(rad / 2));
        totalBogenMaß += rad * rBiege;
      }
    });
    document.getElementById('zuschnitt_out_gesamtlänge').textContent = Math.round(sumSchenkel - totalCutback + totalBogenMaß).toLocaleString('de-DE') + ' mm';
    document.getElementById('zuschnitt_out_biegeradius').textContent = Math.round(rBiege).toLocaleString('de-DE') + ' mm';
    document.getElementById('zuschnitt_out_summeschenkel').textContent = Math.round(sumSchenkel).toLocaleString('de-DE') + ' mm';
  }

  return { init };
})();
