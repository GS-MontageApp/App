// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL VERDREHWINKEL (Raum-Trigonometrie v1.10.65)
// ============================================================================
window.DrehwinkelApp = (() => {
  function parseVal(id) {
    const el = document.getElementById(id);
    if (!el || !el.value) return 0;
    const num = parseFloat(el.value.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }

  function formatDeg(val) {
    if (isNaN(val)) return '0,0 °';
    return val.toFixed(1).replace('.', ',') + ' °';
  }

  function calculate() {
    const v1 = parseVal('dw_v1'); // Höhenversatz Ebene 1
    const h1 = parseVal('dw_h1'); // Seitenversatz Ebene 1
    const v2 = parseVal('dw_v2'); // Höhenversatz Ebene 2
    const h2 = parseVal('dw_h2'); // Seitenversatz Ebene 2

    // Raumwinkel / Projektionsvektoren je Ebene
    const angle1 = h1 !== 0 || v1 !== 0 ? Math.atan2(v1, h1) * (180 / Math.PI) : 0;
    const angle2 = h2 !== 0 || v2 !== 0 ? Math.atan2(v2, h2) * (180 / Math.PI) : 0;

    // Relativer Verdrehwinkel zwischen den beiden Raumebenen
    let twist = Math.abs(angle2 - angle1);
    while (twist > 180) twist = 360 - twist;

    // Differenzvektor Raummaß (Spatial Hypotenuse projection)
    const totalV = Math.sqrt(v1*v1 + v2*v2);
    const totalH = Math.sqrt(h1*h1 + h2*h2);
    const spatialTwist = (totalH !== 0 || totalV !== 0) ? Math.atan2(totalV, totalH) * (180 / Math.PI) : 0;

    // DOM Updates
    const outTwist = document.getElementById('dw_out_twist');
    const outVec1 = document.getElementById('dw_out_vec1');
    const outVec2 = document.getElementById('dw_out_vec2');

    if (outTwist) outTwist.textContent = formatDeg(twist);
    if (outVec1) outVec1.textContent = formatDeg(angle1);
    if (outVec2) outVec2.textContent = formatDeg(angle2);
  }

  function init() {
    const inputs = ['dw_v1', 'dw_h1', 'dw_v2', 'dw_h2'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });
    calculate();
  }

  return { init, calculate };
})();
