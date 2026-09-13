// ============================================================================
// ZANGENSCHLOSSER-APP: PROJEKT-LOGBÜCHER & HISTORIE (MEZ Berlin)
// ============================================================================
window.allLogbooks = {
  master: [
    { version: "v1.10.32", date: "13.09.2026, 12:45 (MEZ)", text: "Einstecktiefe-Tabelle mit whitespace-nowrap gegen Textumbrüche auf mobilen Geräten ausgestattet.", border: "border-indigo-500" },
    { version: "v1.10.31", date: "13.09.2026, 12:15 (MEZ)", text: "Tabellen-Segment-Buttons in EO-Form L / EO-Form-S benannt; Rohr-Ø-Gruppierungsblöcke mit Block-Divider ergänzt; Soft-Grün/Rot & Touch-Row-Outline aktiv.", border: "border-indigo-500" },
    { version: "v1.10.29", date: "13.09.2026, 12:05 (MEZ)", text: "Tabellen-Segment-Labels auf Einstecktiefe, EU Form L, EU Form S angepasst; Footer-Tab auf Tabellen umbenannt; LOS-Hinweis auf Splash ersatzlos entfernt.", border: "border-slate-400" },
    { version: "v1.10.21", date: "13.09.2026, 13:15", text: "EO-Form Modul mit 3-in-1 Segmented Control (DIN 2353, EO-L, EO-S) und sticky Table-Headern ausgestattet.", border: "border-slate-400" },
    { version: "v1.10.19", date: "13.09.2026, 12:45", text: "Tab-Benennung und Header konsistent auf exakten Parker-Standard 'EO-Form' (EO2-FORM Umformtabelle) korrigiert.", border: "border-slate-400" },
    { version: "v1.10.18", date: "13.09.2026, 12:30", text: "Foobar 1 Tab durch EU-Form (Parker EO2-FORM Umform- & Längenzugabetabelle für Baureihe L) ersetzt.", border: "border-slate-400" },
    { version: "v1.10.16", date: "13.09.2026, 12:00", text: "Startbild-Splash auf klassisches Vollbild-Artwork-Touch (Option A) umgestellt; oberer Anker der Ansichten für Firefox-Box-Model-Parität harmonisiert.", border: "border-slate-400" },
    { version: "v1.10.11", date: "13.09.2026, 11:30", text: "Startbild-Splash um Daumen/Hand-Hitbox (ca. 48%x72%) über Gerätemetropole ergänzt.", border: "border-slate-400" },
    { version: "v1.10.5", date: "13.09.2026, 10:15", text: "App-Shell von justify-between auf flex-1 Flow umgestellt gegen Desktop-Vertical-Drift.", border: "border-slate-400" },
    { version: "v1.10.4", date: "13.09.2026, 10:00", text: "Startbildschirm-X-Button oben rechts, Versions-Badge unten rechts platziert; Layout-Parität auf p-5 Card-Anker harmonisiert.", border: "border-slate-400" },
    { version: "v1.10.3", date: "13.09.2026, 09:45", text: "Visueller Paritäts-Anker oben für all Cards/Views umgesetzt.", border: "border-slate-400" },
    { version: "v1.10.2", date: "13.09.2026, 09:35", text: "Seitenversatz-Beschriftung im Formular und isometrisches SVG-Label von h auf Großbuchstaben (H) geändert.", border: "border-slate-400" },
    { version: "v1.10.1", date: "13.09.2026, 09:25", text: "Versions- und Datums-Badge am unteren Rand des Startbild-Overlays integriert.", border: "border-slate-400" },
    { version: "v1.10.0", date: "13.09.2026, 09:20", text: "Footer auf 4 Haupttabs + Mehr-Overflow-Modal umgebaut.", border: "border-slate-400" },
    { version: "v1.9.8", date: "13.09.2026, 02:15", text: "Startbild-Splash-Screen für Testzwecke auf jeden Start eingestellt.", border: "border-slate-400" },
    { version: "v1.9.7", date: "13.09.2026, 01:55", text: "Tägliches Willkommens-Splash-Screen mit dem 'Dr. Zange' Artwork integriert.", border: "border-slate-400" },
    { version: "v1.9.6", date: "13.09.2026, 01:45", text: "Testlauf mit dem 214x214 Pixel App-Icon für 'Dr. Zange' im Manifest und Service Worker integriert.", border: "border-slate-400" },
    { version: "v1.9.5", date: "13.09.2026, 01:35", text: "Offizielles Branding angepasst: Kurzform 'Dr. Zange' für den Homescreen, Langform 'Zangenschlosser App'.", border: "border-slate-400" },
    { version: "v1.9.4", date: "13.09.2026, 01:10", text: "Erzwungenes Laden der externen changelogs.js via Cache-Buster und robustes Global-Scope-Fallback.", border: "border-slate-400" },
    { version: "v1.9.3", date: "13.09.2026, 00:45", text: "Saubere Wiederherstellung der externen changelogs.js Architektur mit robustem Cache-Busting.", border: "border-slate-400" },
    { version: "v1.9.0", date: "12.09.2026, 23:59", text: "Auslagerung der Logbücher in changelogs.js, Umbenennung in Zangenschlosser-App.", border: "border-slate-400" },
    { version: "v1.8.0", date: "12.09.2026, 23:50", text: "Vollständige Wiederherstellung sämtlicher Einzel-Logbücher für alle Module.", border: "border-slate-400" },
    { version: "v1.7.0", date: "12.09.2026, 23:40", text: "Header-Höhe halbiert, Verdrehwinkel-Bilder kompakt (120px) skaliert.", border: "border-slate-400" },
    { version: "v1.6.0", date: "12.09.2026, 23:30", text: "Verdrehwinkel-Bildpfade global auf den neuen Unterordner 'img/' umgestellt.", border: "border-slate-400" },
    { version: "v1.5.0", date: "12.09.2026, 23:25", text: "Vollständige Integration und Synchronisation des Zuschnittsrechner-Logbuchs.", border: "border-slate-400" },
    { version: "v1.4.0", date: "12.09.2026, 23:18", text: "Wiederherstellung sämtlicher originaler Versionsschritte für Etagenrechner und Verdrehwinkel.", border: "border-slate-400" },
    { version: "v1.0.0", date: "12.09.2026, 22:45", text: "Zusammenführung der Master-Suite mit iOS-konformer Tab-Bar und Header-Aktion.", border: "border-slate-400" }
  ],
  etagen: [{ version: "v0.4.6", date: "12.09.2026, 22:25", text: "Header verkürzt.", border: "border-indigo-500" }],
  zuschnitt: [{ version: "v0.7.2", date: "12.09.2026, 18:25", text: "Header gestrichen.", border: "border-red-500" }],
  drehwinkel: [{ version: "v0.4.61", date: "12.09.2026, 21:55", text: "Ring-Stroke auf Schwarz.", border: "border-indigo-500" }],
  tabellen: [
    { version: "v1.10.32", date: "13.09.2026, 12:45 (MEZ)", text: "whitespace-nowrap für ungestörte Mobil-Darstellung in Einstecktiefe-Tabelle ergänzt.", border: "border-indigo-500" }
  ]
};
