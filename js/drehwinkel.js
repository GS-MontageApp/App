// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL VERDREHWINKEL
// ============================================================================
window.DrehwinkelApp = (() => {
  const assets = {
    'a-0': 'img/a-0.png', 'a-45': 'img/a-45.png', 'a-90': 'img/a-90.png', 'a-135': 'img/a-135.png',
    'a-180': 'img/a-180.png', 'a-225': 'img/a-225.png', 'a-270': 'img/a-270.png', 'a-315': 'img/a-315.png',
    'a-f': 'img/a-f.png', 'b-0': 'img/b-0.png', 'b-45': 'img/b-45.png', 'b-90': 'img/b-90.png',
    'b-135': 'img/b-135.png', 'b-180': 'img/b-180.png', 'b-225': 'img/b-225.png', 'b-270': 'img/b-270.png',
    'b-315': 'img/b-315.png', 'b-f': 'img/b-0.png'
  };

  let state = { angleA: 0, angleB: 0, isGeradeA: true };
  const gueltigeWerte = [0, 45, 90, 135, 180, 225, 270, 315];

  function init() {
    const btnGerade = document.getElementById('dw_btn_gerade');
    const btn90 = document.getElementById('dw_btn_90');
    if (btnGerade) btnGerade.addEventListener('click', () => setAnschlussAType('gerade'));
    if (btn90) btn90.addEventListener('click', () => setAnschlussAType('90'));

    document.querySelectorAll('.dw-dial').forEach(dial => {
      let isDragging = false;
      dial.addEventListener('pointerdown', (e) => {
        isDragging = true;
        dial.setPointerCapture(e.pointerId);
        handleInteraction(e, dial);
      });
      dial.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        handleInteraction(e, dial);
      });
      dial.addEventListener('pointerup', (e) => {
        isDragging = false;
        if (dial.hasPointerCapture(e.pointerId)) {
          dial.releasePointerCapture(e.pointerId);
        }
      });
    });

    setAnschlussAType('gerade');
    updateVisualisierung('a', 0);
    updateVisualisierung('b', 0);
  }

  function updateGallery() {
    let keyA = state.isGeradeA ? 'a-f' : `a-${state.angleA}`;
    const imgA = document.getElementById('dw_img_a');
    if (imgA) imgA.src = assets[keyA] || assets['a-f'];
    let keyB = `b-${state.angleB}`;
    const imgB = document.getElementById('dw_img_b');
    if (imgB) imgB.src = assets[keyB] || assets['b-0'];
  }

  function setAnschlussAType(type) {
    state.isGeradeA = (type === 'gerade');
    const dialA = document.getElementById('dw_dial_a');
    const outA = document.getElementById('dw_out_a');
    const btnGerade = document.getElementById('dw_btn_gerade');
    const btn90 = document.getElementById('dw_btn_90');

    if (state.isGeradeA) {
      if (dialA) { dialA.style.opacity = '0.4'; dialA.style.pointerEvents = 'none'; }
      if (btnGerade) btnGerade.className = 'flex-1 py-1 px-1.5 rounded-lg bg-[#005691] text-white transition-all text-center flex items-center justify-center';
      if (btn90) btn90.className = 'flex-1 py-1 px-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all text-center flex items-center justify-center';
      if (outA) { outA.textContent = '0°'; outA.className = 'text-base font-extrabold text-slate-400 font-mono w-16 text-center transition-all'; }
    } else {
      if (dialA) { dialA.style.opacity = '1'; dialA.style.pointerEvents = 'auto'; }
      if (btn90) btn90.className = 'flex-1 py-1 px-1.5 rounded-lg bg-[#005691] text-white transition-all text-center flex items-center justify-center';
      if (btnGerade) btnGerade.className = 'flex-1 py-1 px-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all text-center flex items-center justify-center';
      if (outA) { outA.textContent = state.angleA + '°'; outA.className = 'text-base font-extrabold text-[#005691] font-mono w-16 text-center transition-all'; }
    }
    updateGallery();
  }

  function updateVisualisierung(anschluss, grad) {
    const radius = 85;
    let mappedDeg = (360 - grad + 180) % 360;
    let rad = (mappedDeg - 90) * (Math.PI / 180);

    const endX = 100 + radius * Math.cos(rad);
    const endY = 100 + radius * Math.sin(rad);

    if (anschluss === 'a') {
      state.angleA = grad;
      const outA = document.getElementById('dw_out_a');
      if (!state.isGeradeA && outA) outA.textContent = grad + '°';
      let pointer = document.querySelector('#dw_dial_a line');
      if (pointer) { pointer.setAttribute('x2', endX); pointer.setAttribute('y2', endY); }
    } else {
      state.angleB = grad;
      const outB = document.getElementById('dw_out_b');
      if (outB) outB.textContent = grad + '°';
      let pointer = document.querySelector('#dw_dial_b line');
      if (pointer) { pointer.setAttribute('x2', endX); pointer.setAttribute('y2', endY); }
    }
    updateGallery();
  }

  function handleInteraction(e, dialElement) {
    const rect = dialElement.getBoundingClientRect();
    const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);

    let userDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (userDeg < 0) userDeg += 360;
    if (userDeg >= 360) userDeg -= 360;
    userDeg = (360 - userDeg + 180) % 360;

    let naechsterSchritt = gueltigeWerte.reduce((prev, curr) => (Math.abs(curr - userDeg) < Math.abs(prev - userDeg) ? curr : prev));
    if (userDeg >= 337.5 || userDeg < 22.5) naechsterSchritt = 0;

    updateVisualisierung(dialElement.dataset.anschluss, naechsterSchritt);
  }

  return { init };
})();
