// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL ZUSCHNITTSRECHNER (Inkl. Cutback-Test v1.13.0)
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

    // Event Listener für Cutback-Test Dropdowns
    const cbD = document.getElementById('zuschnitt_cutback_durchmesser');
    const cbR = document.getElementById('zuschnitt_cutback_rfaktor');
    if (cbD) cbD.addEventListener('change', calculateCutbackTest);
    if (cbR) cbR.addEventListener('change', calculateCutbackTest);

    const clearBaseBtn = document.getElementById('zuschnitt_clear_base');
    if (clearBaseBtn) clearBaseBtn.addEventListener('click', clearBaseGroup);
    
    const clearCutbackBtn = document.getElementById('zuschnitt_cutback_clear');
    if (clearCutbackBtn) clearCutbackBtn.addEventListener('click', clearCutbackGroup);

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

        if (this.getAttribute('data-type')?.startsWith('cutback')) {
          calculateCutbackTest();
        } else {
          updateVisibility();
          calculateZuschnitt();
        }
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
          if (type && type.includes('winkel')) {
            rounded = Math.min(Math.max(rounded, 1), 180);
          }
          let roundedStr = rounded.toFixed(1).replace('.', ',');
          let unitLabel = (type && type.includes('winkel')) ? 'Grad' : 'mm';

          if (/[+\-*/]/.test(cleanExpr)) {
            this.value = `${cleanExpr} = ${roundedStr} ${unitLabel}`;
          } else {
            this.value = roundedStr + ' ' + unitLabel;
          }
        }

        if (type && type.startsWith('cutback')) {
          calculateCutbackTest();
        } else {
          updateVisibility();
          calculateZuschnitt();
        }
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.blur();
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
    // (Standard Logik für Paare unverändert)
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

  function clearCutbackGroup() {
    document.querySelectorAll('#view-zuschnitt input[data-type^="cutback"]').forEach(inp => inp.value = '');
    const cbValEl = document.getElementById('zuschnitt_cutback_out_wert');
    if (cbValEl) cbValEl.textContent = '0,0 mm';
  }

  function clearPair(pairNum) {
    // (Unverändert)
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
    // (Hauptberechnung unverändert)
  }

  // NEU: Berechnungslogik für den Cutback-Test (Schenkel 1, Winkel 1, Schenkel 2)
  function calculateCutbackTest() {
    const dVal = document.getElementById('zuschnitt_cutback_durchmesser')?.value;
    const rVal = document.getElementById('zuschnitt_cutback_rfaktor')?.value;
    const outValEl = document.getElementById('zuschnitt_cutback_out_wert');
    if (!outValEl) return;

    if (!dVal || !rVal) {
      outValEl.textContent = "0,0 mm (Parameter wählen)";
      return;
    }

    const s1 = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="cutback_schenkel"][data-index="0"]')?.value);
    const w1 = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="cutback_winkel"][data-index="0"]')?.value);
    const s2 = getCleanVal(document.querySelector('#view-zuschnitt input[data-type="cutback_schenkel"][data-index="1"]')?.value);

    let sumSchenkel = (typeof s1 === 'number' ? s1 : 0) + (typeof s2 === 'number' ? s2 : 0);
    let totalCutback = 0;
    let totalBogenMaß = 0;

    if (typeof w1 === 'number' && w1 > 0 && sumSchenkel > 0) {
      let alpha = Math.min(Math.max(w1, 1), 180);
      const angleRad = (alpha * Math.PI) / 180;
      const rBiege = parseFloat(dVal) * parseFloat(rVal);
      totalCutback = (2 * rBiege * Math.tan(angleRad / 2));
      totalBogenMaß = angleRad * rBiege;
    }

    let gesamtlänge = sumSchenkel - totalCutback + totalBogenMaß;
    outValEl.textContent = gesamtlänge.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mm';
  }

  return { init, checkParameters, calculateZuschnitt, calculateCutbackTest };
})();
