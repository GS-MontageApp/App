// ============================================================================
// ZANGENSCHLOSSER-APP: PROJEKT-LOGBÜCHER & HISTORIE
// ============================================================================
window.allLogbooks = {
  master: [
    { version: "v1.9.6", date: "13.09.2026, 01:45", text: "Testlauf mit dem 214x214 Pixel App-Icon für 'Dr. Zange' im Manifest und Service Worker integriert.", border: "border-indigo-500" },
    { version: "v1.9.5", date: "13.09.2026, 01:35", text: "Offizielles Branding angepasst: Kurzform 'Dr. Zange' für den Homescreen, Langform 'Zangenschlosser App'.", border: "border-slate-400" },
    { version: "v1.9.4", date: "13.09.2026, 01:10", text: "Erzwungenes Laden der externen changelogs.js via Cache-Buster und robustes Global-Scope-Fallback.", border: "border-slate-400" },
    { version: "v1.9.3", date: "13.09.2026, 00:45", text: "Saubere Wiederherstellung der externen changelogs.js Architektur mit robustem Cache-Busting.", border: "border-slate-400" },
    { version: "v1.9.0", date: "12.09.2026, 23:59", text: "Auslagerung der Logbücher in changelogs.js, Umbenennung in Zangenschlosser-App, automatisches Ausblenden des Installationsbuttons nach Installation.", border: "border-slate-400" },
    { version: "v1.8.0", date: "12.09.2026, 23:50", text: "Vollständige Wiederherstellung sämtlicher Einzel-Logbücher für alle Module inklusive v1.7.0 Optimierungen.", border: "border-slate-400" },
    { version: "v1.7.0", date: "12.09.2026, 23:40", text: "Header-Höhe halbiert, Verdrehwinkel-Bilder kompakt (120px) skaliert, PWA-Installations-Button oben im Menü integriert.", border: "border-slate-400" },
    { version: "v1.6.0", date: "12.09.2026, 23:30", text: "Verdrehwinkel-Bildpfade global auf den neuen Unterordner 'img/' umgestellt.", border: "border-slate-400" },
    { version: "v1.5.0", date: "12.09.2026, 23:25", text: "Vollständige Integration und Synchronisation des Zuschnittsrechner-Logbuchs.", border: "border-slate-400" },
    { version: "v1.4.0", date: "12.09.2026, 23:18", text: "Wiederherstellung sämtlicher originaler Versionsschritte für Etagenrechner und Verdrehwinkel.", border: "border-slate-400" },
    { version: "v1.0.0", date: "12.09.2026, 22:45", text: "Zusammenführung der Master-Suite mit iOS-konformer Tab-Bar und Header-Aktion.", border: "border-slate-400" }
  ],
  etagen: [
    { version: "v0.4.6", date: "12.09.2026, 22:25", text: "Kompletter Header entfernt, Box-Titel auf '3D-Isometrie Modell' verkürzt, Installations- und Speicher-Buttons im Footer entfernt.", border: "border-indigo-500" },
    { version: "v0.4.5", date: "12.09.2026, 15:30", text: "Persistenter DEV-System-Prompt und strikte Changelog-Regeln als unzerstörbarer Kommentarblock im HTML-Head verankert.", border: "border-slate-400" },
    { version: "v0.4.4", date: "12.09.2026, 15:15", text: "Linkes Rohrende halbrund geschlossen, rechtes Rohrende mit technischer Öffnung versehen; strikt ganzzahlige Ergebnisse.", border: "border-slate-400" },
    { version: "v0.4.3", date: "12.09.2026, 13:50", text: "3D-Isometrie Fixpunkt auf Standard (540) zurückgesetzt; dynamische Skalierung für flache Winkel aktiv.", border: "border-slate-400" },
    { version: "v0.4.2", date: "12.09.2026, 12:47", text: "Darstellungs-Bugfix für 90°-Bögen in der 3D-Isometrie behoben; axiales Maß und Winkelbegrenzung angepasst.", border: "border-slate-400" },
    { version: "v0.4.1", date: "12.09.2026, 12:20", text: "Lückenloses Changelog als JS-Array integriert; untere Trennlinie bei Eingabewerten beibehalten.", border: "border-slate-400" },
    { version: "v0.4.0", date: "12.09.2026, 11:46", text: "Experiment mit Sticky-Bereich durchgeführt.", border: "border-slate-400" },
    { version: "v0.3.9", date: "12.09.2026, 11:42", text: "Ergebnis-Bezeichnungen mit spezifischen Kürzeln in Klammern (NZ, C, T, R).", border: "border-slate-400" },
    { version: "v0.3.8", date: "12.09.2026, 11:23", text: "Beschriftung der Nachziehlänge bereinigt.", border: "border-slate-400" },
    { version: "v0.3.7", date: "12.09.2026, 11:22", text: "Nachziehlänge als wichtigster Faktor nach oben gesetzt.", border: "border-slate-400" },
    { version: "v0.3.6", date: "12.09.2026, 11:21", text: "Oberfläche auf deutsche Bezeichnungen umgestellt.", border: "border-slate-400" },
    { version: "v0.3.5", date: "10.09.2026, 13:45", text: "Formeln an Rolling-Offset-Standard angepasst.", border: "border-slate-400" },
    { version: "v0.3.4", date: "10.09.2026, 13:30", text: "Erste Korrekturen der Logik.", border: "border-slate-400" },
    { version: "v0.3.3", date: "10.09.2026, 13:11", text: "Favicon für Firefox ergänzt.", border: "border-slate-400" },
    { version: "v0.3.2", date: "10.09.2026, 12:50", text: "SVG-Icon integriert.", border: "border-slate-400" },
    { version: "v0.3.1", date: "10.09.2026, 12:38", text: "App-Icon und Changelog eingeführt.", border: "border-slate-400" },
    { version: "v0.3.0", date: "10.09.2026, 12:17", text: "PWA-Infrastruktur mit Service Worker.", border: "border-slate-400" },
    { version: "v0.2.0", date: "10.09.2026, 10:55", text: "Stabiles Basis-Setup mit LocalStorage.", border: "border-slate-400" }
  ],
  zuschnitt: [
    { version: "v0.7.2", date: "12.09.2026, 18:25", text: "Vorbereitung für Master-Suite: Globaler Header und Speicher-Button im Footer ersatzlos gestrichen für maximale Bildschirmfläche.", border: "border-red-500" },
    { version: "v0.7.1", date: "12.09.2026, 18:10", text: "Logbuch-Reihenfolge umgedreht (neueste Einträge oben) und Zeitstempel an die mitteleuropäische Ortszeit angepasst.", border: "border-slate-400" },
    { version: "v0.7.0", date: "12.09.2026, 18:00", text: "Logbuch vervollständigt; Startwert des Gesamtzuschnitts auf 0 mm gesetzt; Header dynamisch auf aktuelle Version umgestellt.", border: "border-slate-400" },
    { version: "v0.6.4", date: "12.09.2026, 17:45", text: "Platzhalter vor Parameterwahl auf kursiv gesetztes 'Rohrparameter wählen' umgestellt.", border: "border-slate-400" },
    { version: "v0.6.3", date: "12.09.2026, 17:35", text: "Einheit im Ergebnis-Titel vollständig ausgeschrieben: 'Millimeter' statt 'mm'.", border: "border-slate-400" },
    { version: "v0.6.2", date: "12.09.2026, 17:25", text: "Titel gestrafft ('Zuschnitt-' entfernt) und Rohrdurchmesser komplett inklusive Leerzeichen und Einheit unterstrichen.", border: "border-slate-400" },
    { version: "v0.6.1", date: "12.09.2026, 17:15", text: "Rohrdurchmesser-Hinweis direkt als Inline-Titel in die Ergebnis-Sektion verschoben.", border: "border-slate-400" },
    { version: "v0.6.0", date: "12.09.2026, 17:00", text: "Ergebnis-Sicherheits-Check mit Live-Hinweis zum gewählten Rohrdurchmesser integriert.", border: "border-slate-400" },
    { version: "v0.5.0", date: "12.09.2026, 16:40", text: "Freischaltlogik für Basis-Felder (Schenkel 1, Bogenwinkel 1, Schenkel 2) sowie einheitliche Lösch-Buttons ergänzt.", border: "border-slate-400" },
    { version: "v0.4.0", date: "12.09.2026, 16:20", text: "Poka-Yoke Schutz: Globale Parameter (Rohr-Ø und Radius-Faktor) erfordern zwingend eine aktive Benutzerauswahl.", border: "border-slate-400" },
    { version: "v0.3.0", date: "12.09.2026, 15:50", text: "Farbcodierung implementiert: Schenkel-Felder in sanftem Blauton, Biegewinkel-Felder in sanftem Grünton.", border: "border-slate-400" },
    { version: "v0.2.0", date: "12.09.2026, 15:30", text: "Einheiten ' mm' und ' Grad' direkt in die Felder integriert; Kontext-Smart-Scroll für den S24 implementiert.", border: "border-slate-400" },
    { version: "v0.1.0", date: "12.09.2026, 15:00", text: "Grundstruktur der Single-File App with Tailwind CSS und mobiler Ausrichtung erstellt.", border: "border-slate-400" }
  ],
  drehwinkel: [
    { version: "v0.4.61", date: "12.09.2026, 21:55", text: "Äußere Ring-Umrandung (stroke) der Drehräder auf Schwarz umgestellt.", border: "border-indigo-500" },
    { version: "v0.4.60", date: "12.09.2026, 21:52", text: "Markierungskreise (Punkte) auf den Drehrädern vollständig auf Schwarz umgestellt.", border: "border-slate-400" },
    { version: "v0.4.59", date: "12.09.2026, 21:50", text: "Vertikale y-Koordinaten der Gradzahlen auf den Drehrädern präzise zentriert.", border: "border-slate-400" },
    { version: "v0.4.58", date: "12.09.2026, 21:48", text: "Markierungskreise auf Schwarz umgestellt und Gradzahlen größenmäßig verdoppelt.", border: "border-slate-400" },
    { version: "v0.4.57", date: "12.09.2026, 21:46", text: "Gradzahlen auf den Drehrädern für verbesserte Lesbarkeit auf Schwarz umgestellt.", border: "border-slate-400" },
    { version: "v0.4.56", date: "12.09.2026, 21:44", text: "Umschalt-Buttons für Anschluss A nach rechts ausgelagert und übereinander gestapelt für optimierte Höhe.", border: "border-slate-400" },
    { version: "v0.4.55", date: "12.09.2026, 21:40", text: "Bildgalerie und Live-Wertebox zu einer gemeinsamen Karte verschmolzen; Gradzahlen vertikal unter die Anschluss-Beschriftungen gesetzt.", border: "border-slate-400" },
    { version: "v0.4.54", date: "12.09.2026, 21:12", text: "Kompletter Header-Bereich entfernt; App startet nun direkt mit der Bildgalerie.", border: "border-slate-400" },
    { version: "v0.4.53", date: "12.09.2026, 21:10", text: "Seitentitel im <head> dynamisch um den aktuellen Zeitstempel erweitert.", border: "border-slate-400" },
    { version: "v0.4.52", date: "12.09.2026, 21:05", text: "HTML-Speichern-Button im Footer entfernt und Live-Zeitstempel oben integriert.", border: "border-slate-400" },
    { version: "v0.4.51", date: "12.09.2026, 20:53", text: "Titel bereinigt und automatischen Zeitstempel-Download integriert.", border: "border-slate-400" },
    { version: "v0.4.50", date: "12.09.2026, 20:50", text: "Button-Beschriftung auf '45° | 90°' aktualisiert und Live-Werteboxen stabilisiert.", border: "border-slate-400" },
    { version: "v0.4.49", date: "12.09.2026, 20:40", text: "Benutzeroberfläche horizontal gespiegelt.", border: "border-slate-400" }
  ]
};
