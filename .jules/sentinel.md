## 2026-01-27 - [Client-Side Validation Enhancement]
**Vulnerability:** Contact form lacked input validation (email format) and length constraints (DoS risk).
**Learning:** Browser-native `type="email"` validation is insufficient for custom validation needs (e.g. strict TLD checks) and testing automated flows (Playwright triggers native tooltips which block JS handlers).
**Prevention:** Implemented defense-in-depth: HTML5 `maxLength` + JS validation with strict regex.
