/**
 * ================================================================================
 * ZANGENSCHLOSSER APP (Dr. Zange) - Modul: Zuschnittsrechner (zuschnitt.js)
 * Version: v1.10.121
 * 
 * Beschreibung:
 * Berechnet die Gesamtzuschnittlänge von Rohren basierend auf realen, an der 
 * neutralen Faser gemessenen freien Schenkeln (Tangentenmaßen) und dem exakten 
 * Bogenmaß (ohne verdeckten Schnittpunkt-/Cutback-Versatz).
 * ================================================================================
 */

const ZuschnittApp = (function() {
    'use strict';

    function init() {
        console.log('[ZuschnittApp] Initialisiere Zuschnittsrechner (Tangentenmaß-Logik)...');
        setupEventListeners();
        calculateZuschnitt();
    }

    function setupEventListeners() {
        const durchmesserEl = document.getElementById('zuschnitt_durchmesser');
        const rfaktorEl = document.getElementById('zuschnitt_rfaktor');
        
        if (durchmesserEl) durchmesserEl.addEventListener('change', calculateZuschnitt);
        if (rfaktorEl) rfaktorEl.addEventListener('change', calculateZuschnitt);

        // Event-Listener für alle Schenkel- und Winkeleingaben
        const inputs = document.querySelectorAll('#view-zuschnitt input[data-type]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateAndChainInputs();
                calculateZuschnitt();
            });
        });

        // Lösch-Buttons der Kette
        const clearBase = document.getElementById('zuschnitt_clear_base');
        if (clearBase) {
            clearBase.addEventListener('click', () => {
                resetChainFrom(0);
            });
        }

        for (let i = 1; i <= 3; i++) {
            const clearBtn = document.getElementById(`zuschnitt_clear_${i}`);
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    resetChainFrom(i);
                });
            }
        }
    }

    // Steuert die dynamische Freigabe der Folge-Eingabefelder (Kettenlogik)
    function validateAndChainInputs() {
        const dInput = document.getElementById('zuschnitt_durchmesser');
        const rInput = document.getElementById('zuschnitt_rfaktor');
        const isGlobalValid = dInput && dInput.value && rInput && rInput.value;

        // Basis-Gruppe freigeben, wenn globale Parameter gewählt sind
        const baseSchenkel1 = document.querySelector('#zuschnitt_base_group input[data-type="schenkel"][data-index="0"]');
        const baseWinkel1 = document.querySelector('#zuschnitt_base_group input[data-type="winkel"][data-index="0"]');
        const baseSchenkel2 = document.querySelector('#zuschnitt_base_group input[data-type="schenkel"][data-index="1"]');

        if (baseSchenkel1) setInputState(baseSchenkel1, isGlobalValid);
        if (baseWinkel1) setInputState(baseWinkel1, isGlobalValid);

        // Kette prüfen und freischalten
        let pair1 = document.getElementById('zuschnitt_pair_1');
        let pair2 = document.getElementById('zuschnitt_pair_2');
        let pair3 = document.getElementById('zuschnitt_pair_3');

        if (pair1) {
            const hasWinkel1 = baseWinkel1 && parseFloat(baseWinkel1.value) > 0;
            if (hasWinkel1 && isGlobalValid) {
                pair1.classList.remove('hidden');
                pair1.classList.add('flex');
                if (baseSchenkel2) setInputState(baseSchenkel2, true);
            } else {
                pair1.classList.add('hidden');
                pair1.classList.remove('flex');
                if (baseSchenkel2) { baseSchenkel2.value = ''; setInputState(baseSchenkel2, false); }
            }
        }

        // Weitere Paare analog schalten...
        const winkel1 = document.querySelector('#zuschnitt_pair_1 input[data-type="winkel"]');
        const schenkel3 = document.querySelector('#zuschnitt_pair_1 input[data-type="schenkel"]');
        if (pair2) {
            const hasWinkel2 = winkel1 && parseFloat(winkel1.value) > 0 && pair1.classList.contains('flex');
            if (hasWinkel2) {
                pair2.classList.remove('hidden');
                pair2.classList.add('flex');
                if (schenkel3) setInputState(schenkel3, true);
            } else {
                pair2.classList.add('hidden');
                pair2.classList.remove('flex');
                if (schenkel3) { schenkel3.value = ''; setInputState(schenkel3, false); }
            }
        }

        const winkel2 = document.querySelector('#zuschnitt_pair_2 input[data-type="winkel"]');
        const schenkel4 = document.querySelector('#zuschnitt_pair_2 input[data-type="schenkel"]');
        if (pair3) {
            const hasWinkel3 = winkel2 && parseFloat(winkel2.value) > 0 && pair2.classList.contains('flex');
            if (hasWinkel3) {
                pair3.classList.remove('hidden');
                pair3.classList.add('flex');
                if (schenkel4) setInputState(schenkel4, true);
            } else {
                pair3.classList.add('hidden');
                pair3.classList.remove('flex');
                if (schenkel4) { schenkel4.value = ''; setInputState(schenkel4, false); }
            }
        }
    }

    function setInputState(input, enabled) {
        if (enabled) {
            input.removeAttribute('disabled');
            input.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
            input.classList.add('bg-white', 'text-slate-700');
        } else {
            input.setAttribute('disabled', 'true');
            input.classList.add('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
            input.classList.remove('bg-white', 'text-slate-700');
        }
    }

    function resetChainFrom(index) {
        if (index === 0) {
            const allInputs = document.querySelectorAll('#view-zuschnitt input[data-type]');
            allInputs.forEach(inp => { inp.value = ''; });
            document.getElementById('zuschnitt_durchmesser').value = '';
            document.getElementById('zuschnitt_rfaktor').value = '';
            validateAndChainInputs();
        }
        calculateZuschnitt();
    }

    /**
     * Kernberechnung nach dem echten Tangentenmaß-Prinzip (an neutraler Faser gemessen):
     * Gesamtzuschnitt = Summe der reinen geraden Schenkel (Tangenten) + Summe der Bogenmaße (an neutraler Faser).
     */
    function calculateZuschnitt() {
        const dVal = parseFloat(document.getElementById('zuschnitt_durchmesser')?.value);
        const rFaktor = parseFloat(document.getElementById('zuschnitt_rfaktor')?.value);

        const outGesamt = document.getElementById('zuschnitt_out_gesamtlänge_wert');
        const outRadius = document.getElementById('zuschnitt_out_biegeradius');
        const outSummeSchenkel = document.getElementById('zuschnitt_out_summeschenkel');
        const outTitel = document.getElementById('zuschnitt_out_titel');

        if (!dVal || !rFaktor || isNaN(dVal) || isNaN(rFaktor)) {
            if (outGesamt) outGesamt.textContent = '0 mm';
            if (outRadius) outRadius.textContent = '-';
            if (outSummeSchenkel) outSummeSchenkel.textContent = '0 mm';
            if (outTitel) outTitel.innerHTML = 'Ergebnis &ndash; <i>Parameter wählen</i>';
            return;
        }

        // Biegeradius an der neutralen Faser: R = Faktor * Rohr-Ø
        const radius = rFaktor * dVal;
        if (outRadius) outRadius.textContent = radius.toFixed(1) + ' mm (R' + radius + ')';

        // Alle aktiven Schenkel und Winkel einsammeln
        let summeSchenkel = 0;
        let summeBogenMaesse = 0;
        let bogenAnzahl = 0;

        const schenkelInputs = document.querySelectorAll('#view-zuschnitt input[data-type="schenkel"]');
        schenkelInputs.forEach(inp => {
            if (!inp.disabled && inp.value) {
                const val = parseFloat(inp.value.replace(',', '.'));
                if (!isNaN(val)) {
                    summeSchenkel += val;
                }
            }
        });

        const winkelInputs = document.querySelectorAll('#view-zuschnitt input[data-type="winkel"]');
        winkelInputs.forEach(inp => {
            if (!inp.disabled && inp.value) {
                const winkelVal = parseFloat(inp.value.replace(',', '.'));
                if (!isNaN(winkelVal) && winkelVal > 0) {
                    // Bogenmaß an der neutralen Faser: L_b = (PI * R * Winkel) / 180
                    const bogenMaß = (Math.PI * radius * winkelVal) / 180;
                    summeBogenMaesse += bogenMaß;
                    bogenAnzahl++;
                }
            }
        });

        // Gesamtzuschnittlänge = Reale freie Schenkel (Tangenten) + Bogenmaße an der neutralen Faser
        const gesamtlänge = summeSchenkel + summeBogenMaesse;

        if (outSummeSchenkel) outSummeSchenkel.textContent = summeSchenkel.toFixed(1) + ' mm';
        if (outGesamt) outGesamt.textContent = gesamtlänge.toFixed(1) + ' mm';
        if (outTitel) {
            outTitel.innerHTML = `Ergebnis &ndash; Tangenten-Modus (${bogenAnzahl} Bogen aktiv)`;
        }
    }

    return {
        init: init,
        calculate: calculateZuschnitt
    };
})();
