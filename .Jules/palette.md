## 2026-01-27 - Icon-only Links and Form Labels
**Learning:** The application heavily relies on icon-only links (social media) and visual labeling for forms without semantic association.
**Action:** Systematically check all icon-buttons and form inputs for accessible names and label associations.

## 2026-10-21 - [Zero Monospace Font Rule]
**Learning:** Monospace fonts (`font-mono`, `JetBrains Mono`, `Consolas`, `ui-monospace`) make production architecture labels, telemetry badges, and project metadata look dated/technical rather than sleek and editorial.
**Rule & Action:** Strictly forbid monospace fonts across the entire website. All UI elements, tags, category headers, metrics, and body text must use `Plus Jakarta Sans` (`font-['Plus_Jakarta_Sans',sans-serif]`) or `Inter` (`font-sans`), with `Montserrat` reserved for primary headings. `fontFamily.mono` in Tailwind config is mapped to `Plus Jakarta Sans` to guarantee no accidental monospace fallback.

## 2026-10-21 - [Header Eyebrows & Status Badge Minimalism]
**Learning:** Cluttered section eyebrows with numbered prefixes and pseudo-code comment delimiters (`• 03 // THE ENGINEERING LAB`) and overly specific status strings (`Available for Summer 2026/2027 Internships & Roles`) introduce visual clutter.
**Rule & Action:** Remove numbered/double-slash eyebrow tags from section headers, allowing titles to begin cleanly and directly. Keep availability pills concise and punchy with just `Available`.
