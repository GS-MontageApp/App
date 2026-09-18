// ============================================================================
// ZANGENSCHLOSSER-APP: MODUL ETAGENRECHNER
// ============================================================================
window.EtagenApp = (() => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;
  const inputIds = ['etagen_v', 'etagen_h', 'etagen_a', 'etagen_d', 'etagen_r'];

  function init() {
    inputIds.forEach(id => {
      const saved = localStorage.getItem('etagen_' + id);
      if (saved !== null) {
        const el = document.getElementById(id);
        if (el) el.value = saved;
      }
    });
    calculate();

    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if(el) {
        el.addEventListener('input', function() {
          if (id === 'etagen_a') {
            let val = parseFloat(this.value.replace(',', '.')) || 0;
            if (val < 0) this.value = '0';
            if (val > 180) this.value = '180';
          }
          localStorage.setItem('etagen_' + id, el.value);
          calculate();
        });
        el.addEventListener('change', () => {
          localStorage.setItem('etagen_' + id, el.value);
          calculate();
        });
        el.addEventListener('focus', function() {
          setTimeout(() => { this.setSelectionRange(0, 9999); }, 50);
        });
      }
    });
  }

  function calculate() {
    const v = parseFloat(document.getElementById('etagen_v')?.value.replace(',', '.')) || 0;
    const h = parseFloat(document.getElementById('etagen_h')?.value.replace(',', '.')) || 0;
    const a = parseFloat(document.getElementById('etagen_a')?.value.replace(',', '.')) || 0;
    const d = parseFloat(document.getElementById('etagen_d')?.value.replace(',', '.')) || 0;
    const rFaktor = parseFloat(document.getElementById('etagen_r')?.value) || 3;

    const rBiege = d * rFaktor;
    const c = Math.sqrt((h * h) + (v * v));

    let travel = 0, run = 0, t_cutback = 0;

    if (a !== 0) {
      const angleRad = toRad(a);
      if (Math.abs(a - 90) < 0.001) {
        travel = c; 
        run = 0;
        const radHalfA = toRad(45);
        t_cutback = c - (2 * rBiege * (Math.tan(radHalfA) - toRad(45)));
      } else {
        travel = c / Math.sin(angleRad);
        run = c / Math.tan(angleRad);
        const radHalfA = angleRad / 2;
        t_cutback = travel - (2 * rBiege * (Math.tan(radHalfA) - radHalfA));
      }
    }

    let f = (v !== 0 || h !== 0) ? toDeg(Math.atan2(h, v)) : 0;
    const anreisumfang = (d * Math.PI * Math.abs(f)) / 360;

    const outT = document.getElementById('etagen_out_t');
    const outC = document.getElementById('etagen_out_c');
    const outTravel = document.getElementById('etagen_out_travel');
    const outRun = document.getElementById('etagen_out_run');
    const outF = document.getElementById('etagen_out_f');
    const outAnreis = document.getElementById('etagen_out_anreisumfang');

    if (outT) outT.textContent = Math.round(t_cutback).toLocaleString('de-DE') + ' mm';
    if (outC) outC.textContent = Math.round(c).toLocaleString('de-DE') + ' mm';
    if (outTravel) outTravel.textContent = Math.round(travel).toLocaleString('de-DE') + ' mm';
    if (outRun) outRun.textContent = Math.round(run).toLocaleString('de-DE') + ' mm';
    if (outF) outF.textContent = Math.round(f).toLocaleString('de-DE') + ' °';
    if (outAnreis) outAnreis.textContent = Math.round(anreisumfang).toLocaleString('de-DE') + ' mm';

    drawBoxAndLines(v, h, a, c, travel, t_cutback);
  }

  function drawBoxAndLines(v, h, a, c, travel, t) {
    const container = document.getElementById('etagen_gfx_container');
    if (!container) return;
    container.innerHTML = '';

    let depthVal = (a > 0 && Math.abs(a - 90) >= 0.001) ? (c / Math.tan(toRad(a))) : 0;
    if (a > 0 && a < 14) depthVal = depthVal * (a / 14);
    
    const isoCos = Math.cos(toRad(30)), isoSin = Math.sin(toRad(30));
    const testPxH = h, testPxV = v, testPxT = Math.max(depthVal, 0);

    const localMinX = -testPxT * isoCos, localMaxX = testPxH * isoCos;
    const localMinY = -testPxV - testPxT * isoSin, localMaxY = 0;

    const baseWidth = Math.abs(localMaxX - localMinX) || 1;
    const baseHeight = Math.abs(localMaxY - localMinY) || 1;

    let scale = Math.min((1000 * 0.90) / baseWidth, (580 * 0.90) / baseHeight);
    scale = Math.min(scale, 4.5);

    const pxH = h * scale, pxV = v * scale, pxT = Math.max(depthVal * scale, 0);
    const scaledLocalMinX = -pxT * isoCos, scaledLocalMaxX = pxH * isoCos;
    const scaledLocalMinY = -pxV - pxT * isoSin, scaledLocalMaxY = 0;

    const objWidth = scaledLocalMaxX - scaledLocalMinX;
    const objHeight = scaledLocalMaxY - scaledLocalMinY;

    const originX = 500 - (scaledLocalMinX + objWidth / 2);
    const originY = 290 - (scaledLocalMinY + objHeight / 2);

    const A = { x: originX, y: originY };
    const B = { x: A.x + pxH * isoCos, y: A.y - pxH * isoSin };
    const C_pt = { x: B.x, y: B.y - pxV };
    const D = { x: A.x, y: A.y - pxV };

    const A_back = { x: A.x - pxT * isoCos, y: A.y - pxT * isoSin };
    const B_back_fixed = { x: B.x - pxT * isoCos, y: B.y - pxT * isoSin };
    const C_back = { x: C_pt.x - pxT * isoCos, y: C_pt.y - pxT * isoSin };
    const D_back = { x: D.x - pxT * isoCos, y: D.y - pxT * isoSin };

    const extLen = pxT === 0 ? 0 : 100;
    const P_in = { x: A_back.x - extLen * isoCos, y: A_back.y - extLen * isoSin };
    const P_out = { x: C_pt.x + extLen * isoCos, y: C_pt.y + extLen * isoSin };

    const createLine = (p1, p2, color = '#64748b', width = '3', dash = '6,6') => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      el.setAttribute('x1', p1.x); el.setAttribute('y1', p1.y);
      el.setAttribute('x2', p2.x); el.setAttribute('y2', p2.y);
      el.setAttribute('stroke', color); el.setAttribute('stroke-width', width);
      if (dash) el.setAttribute('stroke-dasharray', dash);
      return el;
    };

    const createTextLabel = (text, p, color, offsetX = 0, offsetY = 0, fontSize = '48') => {
      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', p.x + offsetX); txt.setAttribute('y', p.y + offsetY);
      txt.setAttribute('fill', color); txt.setAttribute('font-size', fontSize);
      txt.setAttribute('font-weight', '900'); txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('dominant-baseline', 'central');
      txt.textContent = text;
      return txt;
    };

    container.appendChild(createLine(A, B));
    container.appendChild(createLine(B, C_pt));
    container.appendChild(createLine(C_pt, D));
    container.appendChild(createLine(D, A));
    
    if (pxT > 0) {
      container.appendChild(createLine(A_back, B_back_fixed));
      container.appendChild(createLine(B_back_fixed, C_back));
      container.appendChild(createLine(C_back, D_back));
      container.appendChild(createLine(D_back, A_back));
      container.appendChild(createLine(A, A_back));
      container.appendChild(createLine(B, B_back_fixed));
      container.appendChild(createLine(C_pt, C_back));
      container.appendChild(createLine(D, D_back));
    }

    if (a > 0 && pxT > 0) {
      const arcGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const vR = { x: A.x - A_back.x, y: A.y - A_back.y };
      const vT = { x: C_pt.x - A_back.x, y: C_pt.y - A_back.y };
      const lenR = Math.sqrt(vR.x * vR.x + vR.y * vR.y);
      const lenT = Math.sqrt(vT.x * vT.x + vT.y * vT.y);
      const rArc = 180;
      const pR = { x: A_back.x + (vR.x / lenR) * rArc, y: A_back.y + (vR.y / lenR) * rArc };
      const pT = { x: A_back.x + (vT.x / lenT) * rArc, y: A_back.y + (vT.y / lenT) * rArc };

      const wedge = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      wedge.setAttribute('points', `${A_back.x},${A_back.y} ${pR.x},${pR.y} ${pT.x},${pT.y}`);
      wedge.setAttribute('fill', 'rgba(254, 240, 138, 0.6)');
      wedge.setAttribute('stroke', '#ca8a04'); wedge.setAttribute('stroke-width', '2.5');
      arcGroup.appendChild(wedge);

      const midX = (vR.x / lenR + vT.x / lenT) / 2;
      const midY = (vR.y / lenR + vT.y / lenT) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY);
      arcGroup.appendChild(createTextLabel(`${a}°`, { x: A_back.x + (midX / midLen) * 100, y: A_back.y + (midY / midLen) * 100 }, '#854d0e', 0, 0, '40'));
      container.appendChild(arcGroup);
    }

    const pipeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const dPath = pxT === 0 ? `M ${A.x - 100} ${A.y - 100} L ${A.x} ${A.y} L ${C_pt.x} ${C_pt.y} L ${C_pt.x + 100} ${C_pt.y + 100}` : `M ${P_in.x} ${P_in.y} L ${A_back.x} ${A_back.y} L ${C_pt.x} ${C_pt.y} L ${P_out.x} ${P_out.y}`;
    
    const pipeOuter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pipeOuter.setAttribute('d', dPath); pipeOuter.setAttribute('fill', 'none');
    pipeOuter.setAttribute('stroke', '#64748b'); pipeOuter.setAttribute('stroke-width', '36');
    pipeOuter.setAttribute('stroke-linecap', 'round'); pipeOuter.setAttribute('stroke-linejoin', 'round'); pipeOuter.setAttribute('opacity', '0.7');

    const pipeInner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pipeInner.setAttribute('d', dPath); pipeInner.setAttribute('fill', 'none');
    pipeInner.setAttribute('stroke', '#e2e8f0'); pipeInner.setAttribute('stroke-width', '22');
    pipeInner.setAttribute('stroke-linecap', 'round'); pipeInner.setAttribute('stroke-linejoin', 'round');

    const createPipeEnd = (p) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const outerRing = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      outerRing.setAttribute('cx', p.x); outerRing.setAttribute('cy', p.y);
      outerRing.setAttribute('rx', '13'); outerRing.setAttribute('ry', '18');
      outerRing.setAttribute('fill', '#94a3b8'); outerRing.setAttribute('stroke', '#475569'); outerRing.setAttribute('stroke-width', '3');
      const innerHole = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      innerHole.setAttribute('cx', p.x); innerHole.setAttribute('cy', p.y);
      innerHole.setAttribute('rx', '7'); innerHole.setAttribute('ry', '11');
      innerHole.setAttribute('fill', '#334155');
      g.appendChild(outerRing); g.appendChild(innerHole);
      return g;
    };

    pipeGroup.appendChild(pipeOuter);
    pipeGroup.appendChild(pipeInner);
    pipeGroup.appendChild(createPipeEnd(pxT === 0 ? { x: C_pt.x + 100, y: C_pt.y + 100 } : P_out));
    container.appendChild(pipeGroup);

    if (h > 0) container.appendChild(createLine(A, B, '#0284c7', '6', null));
    if (v > 0) container.appendChild(createLine(B, C_pt, '#16a34a', '6', null));
    if (c > 0) container.appendChild(createLine(A, C_pt, '#dc2626', '6', null));
    if (Math.abs(a - 90) >= 0.001 && pxT > 0) container.appendChild(createLine(A_back, A, '#ea580c', '6', null));
    if (t > 0 || a > 0) container.appendChild(createLine(pxT === 0 ? A : A_back, C_pt, '#ec4899', '6', null));

    if (h > 0) container.appendChild(createTextLabel('H', { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, '#0284c7', 20, 28));
    if (v > 0) container.appendChild(createTextLabel('V', { x: (B.x + C_pt.x) / 2, y: (B.y + C_pt.y) / 2 }, '#16a34a', 28, 0));
    if (c > 0) container.appendChild(createTextLabel('C', { x: (A.x + C_pt.x) / 2, y: (A.y + C_pt.y) / 2 }, '#dc2626', -35, 10));
    if (Math.abs(a - 90) >= 0.001 && pxT > 0) container.appendChild(createTextLabel('R', { x: (A_back.x + A.x) / 2, y: (A_back.y + A.y) / 2 }, '#ea580c', -25, 28));
    if (t > 0 || a > 0) container.appendChild(createTextLabel('T', { x: ((pxT === 0 ? A.x : A_back.x) + C_pt.x) / 2, y: ((pxT === 0 ? A.y : A_back.y) + C_pt.y) / 2 }, '#ec4899', 0, -28));
  }

  return { init };
})();
