# Portfolio Engineering & Styling Rules

## Typography Rule: Strictly Prohibit Monospace Fonts
- **DO NOT USE MONOSPACE FONTS ANYWHERE ON THIS WEBSITE.**
- **Prohibited fonts & utility classes**: `font-mono`, `monospace`, `JetBrains Mono`, `Consolas`, `Courier`, `ui-monospace`, `SF Mono`, or any monospaced font family.
- **Rule Scope**: Applies to all components, pages, modals, cards, tags, category labels, timestamps, architecture stacks, telemetry metrics, badges, headers, and body text across the entire codebase.
- **Approved Typography Hierarchy**:
  - **Headings & Hero Titles**: `Montserrat` (`font-['Montserrat',sans-serif]`)
  - **Body, UI Controls, Badges, Tags, Metadata, Category Labels, Tech Stacks, and Metrics**: `Plus Jakarta Sans` (`font-['Plus_Jakarta_Sans',sans-serif]`) or `Inter` (`font-sans`).
- **Tailwind Fallback Enforcement**: `fontFamily.mono` in `tailwind.config.js` and `tailwind.config.cjs` is explicitly mapped to `['"Plus Jakarta Sans"', 'Inter', 'sans-serif']` as a defense-in-depth safeguard against accidental monospace leakage.

## Editorial Header & Badge Minimalism Rules
- **Prohibit Artificial Section Eyebrows & Pseudo-Code Comment Syntax**:
  - Do NOT use numbered eyebrow pills like `• 01 // ...`, `• 03 // THE ENGINEERING LAB`, or double-slash `//` comment delimiters in section headers, badges, or metadata.
  - Section headers must be direct, clean, and start immediately with their bold headings (e.g. `GitHub Contribution Activity.`, `Selected Works.`, `About Me.`).
  - Use clean middots (`·`) instead of `//` when separating metadata items.
- **Availability Badge Wording**:
  - Keep status badges concise: use simply **`Available`** instead of verbose phrases such as `Available for Summer 2026/2027 Internships & Roles` or `Available '26/27`.
