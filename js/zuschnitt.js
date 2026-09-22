// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL ZUSCHNITTSRECHNER (v1.12.4)
// ============================================================================
window.ZuschnittApp = (() => {
  function init() {
    const dEl = document.getElementById('zuschnitt_durchmesser');
    const rEl = document.getElementById('zuschnitt_rfaktor');
    if (!dEl || !rEl) return;

    dEl.addEventListener('change', function() {
      this.classList.remove('bg-amber-50', 'border-amber-300');
      this.classList.add('bg-slate-50', 'border-slate-300');
      checkParameters();
    });

    rEl.addEventListener('change', function() {
      this.classList.remove('bg-amber-50', 'border-amber-300');
      this.classList.add('bg-slate-50', 'border-slate-300');
      checkParameters();
    });

    const clearBaseBtn = document.getElementById('zuschnitt_clear_base');
    if (clearBaseBtn) clearBaseBtn.addEventListener('click', clearBaseGroup);
    
    const clear1 = document.getElementById('zuschnitt_clear_1');
    const clear2 = document.getElementById('zuschnitt_clear_2');
    const clear3 = document.getElementById('zuschnitt_clear_3');
    if (clear1) clear1.addEventListener('click', () => clearPair(1));
    if (clear2) clear2.addEventListener('click', () => clearPair(2));
    if (clear3) clear3.addEventListener('click', () => clearPair(3));

    const allInputs = Array.from(document.querySelectorAll('#view-zuschnitt input[type="text"]'));
    allInputs.forEach((input) => {
      input.addEventListener('focus', function() {
        if (this.hasAttribute('disabled')) return;
        this.value = this.value.replace(' mm', '').replace(' Grad', '');
        setTimeout(() => { 
          this.setSelectionRange(0, 9999); 
          const myWrapper = this.closest('.input-wrapper, div[id^="zuschnitt_pair_"], div[id="zuschnitt_base_group"]');
          if (myWrapper) myWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      });

      input.addEventListener('input', function() {
        if (this.hasAttribute('disabled')) return;
        let originalVal = this.value;
        let cleaned = originalVal.replace(/[^0-9.,+\-*/\s]/g, '');
        let tokens = cleaned.split(/([+\-*/])/);
        let lastToken = tokens[tokens.length - 1];
        let parts = lastToken.split(/[.,]/);
        if (parts.length > 2) {
          lastToken = parts[0] + ',' + parts.slice(1).join('');
          parts = lastToken.split(/[.,]/);
        }
        if (parts.length === 2 && parts[1].length > 1) {
          parts[1] = parts[1].substring(0, 1);
          lastToken = parts[0] + ',' + parts[1];
        }
        tokens[tokens.length - 1] = lastToken;
        let finalCleaned = tokens.join('');
        if (finalCleaned !== originalVal) {
          this.value = finalCleaned;
        }

        updateVisibility();
        calculateZuschnitt();
      });

      input.addEventListener('blur', function() {
        if (this.hasAttribute('disabled')) return;
        const type = this.getAttribute('data-type');
        let rawInput = this.value.trim();
        if (!rawInput) return;

        let cleanExpr = rawInput.replace(' mm', '').replace(' Grad', '').trim();
        let evaluatedVal = evaluateMathExpression(cleanExpr);

        if (evaluatedVal !== null && !isNaN(evaluatedVal)) {
          let rounded = Math.round(evaluatedVal * 10) / 10;
          if (type === 'winkel') {
            rounded = Math.min(Math.max(rounded, 1), 180);
          }
          let roundedStr = rounded.toFixed(1).replace('.', ',');
          if (/[+\-*/]/.test(cleanExpr)) {
            this.value = `${cleanExpr} = ${roundedStr} ${type === 'winkel' ? 'Grad' : 'mm'}`;
          } else {
            this.value = roundedStr + (type === 'winkel' ? ' Grad' : ' mm');
          }
        }

        updateVisibility();
        calculateZuschnitt();
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.blur();
          const visibleInputs = Array.from(document.querySelectorAll('#view-zuschnitt input[type="text"]')).filter(inp => !inp.hasAttribute('disabled') && !inp.closest('.hidden'));
          const currentIndex = visibleInputs.indexOf(this);
          if (currentIndex !== -1 && currentIndex + 1 < visibleInputs.length) {
            visibleInputs[currentIndex + 1].focus();
          }
        }
      });
    });

    checkParameters();
  }

  function evaluateMathExpression(expr) {
    try {
      if (!expr) return null;
      let normalized = expr.toString().replace(/,/g, '.');
      let sanitized = normalized.replace(/[^0-9.\+\-\*\/\(\)\s]/g, '');
      if (!sanitized.trim()) return null;
      let result = Function('"use strict"; return (' + sanitized + ')')();
      return typeof result === 'number' && !isNaN(result) ? result : null;
    } catch (e) {
      let fallback = parseFloat(expr.toString().replace(/,/g, '.'));
      return isNaN(fallback) ? null : fallback;
    }
  }

  function checkParameters() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value;
    const rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    const baseInputs = document.querySelectorAll('#zuschnitt_base_group input[type="text"]');

    if (dVal && rVal) {
      baseInputs.forEach(inp => {
        inp.removeAttribute('disabled');
        inp.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        const type = inp.getAttribute('data-type');
        if (type === 'schenkel') inp.classList.add('bg-sky-50', 'border-sky-200');
        if (type === 'winkel') inp.classList.add('bg-emerald-50', 'border-emerald-200');
      });
    } else {
      baseInputs.forEach(inp => {
        inp.setAttribute('disabled', 'true');
        inp.className = 'w-full bg-slate-200 border border-slate-300 rounded-lg p-2.5 text-base text-slate-400 cursor-not-allowed focus:outline-none transition-colors';
        inp.value = '';
      });
    }
    updateVisibility();
    calculateZuschnitt();
  }

  function updateVisibility() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value;
    const rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    const pair1 = document.getElementById('zuschnitt_pair_1');
    const pair2 = document.getElementById('zuschnitt_pair_2');
    const pair3 = document.getElementById('zuschnitt_pair_3');

    if (!dVal || !rVal || !pair1 || !pair2 || !pair3) {
      if (pair1) pair1.classList.add('hidden');
      if (pair2) pair2.classList.add('hidden');
      if (pair3) pair3.classList.add('hidden');
      return;
    }

    const s2El = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="1"]');
    const w1El = document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="0"]');
    const s2Val = getCleanVal(s2El?.value);
    const w1Val = getCleanVal(w1El?.value);

    if (s2Val !== '' && w1Val !== '') pair1.classList.remove('hidden');
    else { pair1.classList.add('hidden'); pair2.classList.add('hidden'); pair3.classList.add('hidden'); return; }

    const w2Val = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="1"]')?.value);
    const s3Val = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="2"]')?.value);
    if (w2Val !== '' && s3Val !== '') pair2.classList.remove('hidden');
    else { pair2.classList.add('hidden'); pair3.classList.add('hidden'); return; }

    const w3Val = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="2"]')?.value);
    const s4Val = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="3"]')?.value);
    if (w3Val !== '' && s4Val !== '') pair3.classList.remove('hidden');
    else pair3.classList.add('hidden');
  }

  function clearBaseGroup() {
    const s0 = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="0"]');
    const w0 = document.querySelector('#view-zuschnitt input[data-type="winkel"][data-index="0"]');
    const s1 = document.querySelector('#view-zuschnitt input[data-type="schenkel"][data-index="1"]');
    if (s0) s0.value = '';
    if (w0) w0.value = '';
    if (s1) s1.value = '';
    clearPair(1);
  }

  function clearPair(pairNum) {
    const startIndex = pairNum === 1 ? 1 : (pairNum === 2 ? 2 : 3);
    const schenkelIdx = pairNum === 1 ? 2 : (pairNum === 2 ? 3 : 4);
    
    document.querySelectorAll('#view-zuschnitt input[data-type="winkel"]').forEach((inp, idx) => {
      if (idx >= startIndex) inp.value = '';
    });
    document.querySelectorAll('#view-zuschnitt input[data-type="schenkel"]').forEach((inp, idx) => {
      if (idx >= schenkelIdx) inp.value = '';
    });
    updateVisibility();
    calculateZuschnitt();
  }

  function getCleanVal(str) {
    if (!str) return '';
    let rawStr = str.toString();
    if (rawStr.includes('=')) {
      let parts = rawStr.split('=');
      let rightSide = parts[1].replace(' mm', '').replace(' Grad', '').trim();
      let num = parseFloat(rightSide.replace(',', '.'));
      return isNaN(num) ? '' : (Math.round(num * 10) / 10);
    }
    let cleanExpr = rawStr.replace(' mm', '').replace(' Grad', '').trim();
    let evaluated = evaluateMathExpression(cleanExpr);
    if (evaluated === null || isNaN(evaluated)) return '';
    return Math.round(evaluated * 10) / 10;
  }

  function calculateZuschnitt() {
    const dVal = document.getElementById('zuschnitt_durchmesser')?.value;
    const rVal = document.getElementById('zuschnitt_rfaktor')?.value;
    const titelEl = document.getElementById('zuschnitt_out_titel');
    const gesamtValEl = document.getElementById('zuschnitt_out_gesamtlänge_wert');
    const biegeEl = document.getElementById('zuschnitt_out_biegeradius');
    const summeEl = document.getElementById('zuschnitt_out_summeschenkel');

    if (!dVal || !rVal) {
      if (gesamtValEl) gesamtValEl.textContent = "0,0 mm";
      if (titelEl) titelEl.innerHTML = "Ergebnis &ndash; <i>Parameter wählen</i>";
      if (biegeEl) biegeEl.textContent = "-";
      if (summeEl) summeEl.textContent = "0,0 mm";
      return;
    } else {
      if (titelEl) titelEl.innerHTML = `Ergebnis &ndash; für <u><b>${dVal} Millimeter</b></u> Rohr`;
    }

    const schenkelInputs = document.querySelectorAll('#view-zuschnitt input[data-type="schenkel"]');
    const winkelInputs = document.querySelectorAll('#view-zuschnitt input[data-type="winkel"]');

    let rawSchenkelVals = [];
    schenkelInputs.forEach((inp) => {
      const v = getCleanVal(inp.value);
      rawSchenkelVals.push(typeof v === 'number' ? v : 0);
    });

    const rBiege = parseFloat(dVal) * parseFloat(rVal);

    // --- PREPROCESSING / ADAPTER-SCHICHT ---
    // Übergibt die CAD-konform aufbereiteten Zwischenwerte an den bestehenden Rechenweg
    let processedSchenkelVals = [...rawSchenkelVals];
    let winkelVals = [];
    winkelInputs.forEach((inp) => {
      let alpha = getCleanVal(inp.value);
      winkelVals.push(typeof alpha === 'number' ? alpha : 0);
    });

    // Automatische Vorverarbeitung für Schenkel 1 (Index 0):
    // Rohmaß abzüglich Tangentenabzug plus halber Bogenanteil
    if (rawSchenkelVals[0] > 0 && winkelVals[0] > 0) {
      let alpha1 = winkelVals[0];
      let angleRad1 = (alpha1 * Math.PI) / 180;
      let tangent1 = rBiege * Math.tan(angleRad1 / 2);
      let bogenMaß1 = angleRad1 * rBiege;
      
      processedSchenkelVals[0] = rawSchenkelVals[0] - tangent1 + (bogenMaß1 / 2);
    }
    // ----------------------------------------

    let sumSchenkel = 0;
    processedSchenkelVals.forEach(v => sumSchenkel += v);

    let totalCutback = 0, totalBogenMaß = 0;
    winkelInputs.forEach((inp, idx) => {
      if (rawSchenkelVals[idx + 1] === undefined || rawSchenkelVals[idx + 1] === 0) return;
      let alpha = getCleanVal(inp.value);
      if (typeof alpha === 'number' && alpha > 0) {
        alpha = Math.min(Math.max(alpha, 1), 180);
        const angleRad = (alpha * Math.PI) / 180;
        totalCutback += (2 * rBiege * Math.tan(angleRad / 2));
        totalBogenMaß += angleRad * rBiege;
      }
    });

    let gesamtlänge = sumSchenkel - totalCutback + totalBogenMaß;

    if (gesamtValEl) gesamtValEl.textContent = gesamtlänge.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mm';
    if (biegeEl) biegeEl.textContent = rBiege.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mm';
    if (summeEl) summeEl.textContent = sumSchenkel.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mm';
  }

  return { init, checkParameters, calculateZuschnitt };
})();
