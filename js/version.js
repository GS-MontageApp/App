// ============================================================================
// SINGLE SOURCE OF TRUTH: VERSION & BUILD
// ============================================================================
const APP_CONFIG = {
  version: 'v1.10.44',
  date: '13.09.2026, 19:00 (MEZ)'
};

// Global export for Window (Browser) and ServiceWorker (self)
if (typeof window !== 'undefined') window.APP_CONFIG = APP_CONFIG;
if (typeof self !== 'undefined') self.APP_CONFIG = APP_CONFIG;
```[cite: 6]

---

### 2. `index.html`
*(Ergänzt um das Skript `drehmoment.js`, die Sektion für die Drehmomenttabelle sowie die Erweiterung des Daumen-Docks und der Navigation)*
