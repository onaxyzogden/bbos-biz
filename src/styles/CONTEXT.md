# Styles & Design Tokens — CONTEXT.md

## Purpose
Global styling: design token system, base reset, and landing page styles. All component CSS is co-located with components (not here).

## File Inventory
| File | Description |
|------|-------------|
| tokens.css | Full design token system (CSS custom properties); light-first with dark theme override |
| global.css | Base reset, typography, utility classes |
| landing.css | Landing page specific styles |

## Token Categories (tokens.css)

**Surfaces**: `--bg`, `--bg2`, `--bg3`, `--bg4`, `--surface`, `--surface-hover`
**Borders**: `--border`, `--border2`
**Text**: `--text` (#1a1d21), `--text2` (#5f6b7a), `--text3` (#8b95a2)
**Primary (Teal)**: `--primary` (#4ab8a8), `--primary-hover`, `--primary-dark`, `--primary-bg` (8%), `--primary-bg2` (15%), `--primary-border` (30%)
**Accent (Gold)**: `--accent` (#c9a05a — BBOS brand), `--accent2`, `--accent-bg`, `--accent-border`
**Kanban**: `--col-todo`, `--col-progress` (#3b82f6), `--col-review` (#f59e0b), `--col-done` (#22c55e) + `-bg` variants
**Priorities**: `--pri-urgent` (#ef4444), `--pri-high`, `--pri-medium`, `--pri-low` + `-bg` variants
**Semantic**: `--success`, `--warning`, `--danger` + `-bg` and `-border` variants
**Glassmorphism**: `--glass`, `--glass-border`, `--glass-blur` (16px)
**Shadows**: `--shadow-xs` through `--shadow-xl`, `--shadow-teal`
**Radii**: `--radius-xs` (4px) → `--radius-full`
**Spacing**: `--space-1` (4px) → `--space-16` (64px) in 4px increments
**Layout**: `--topbar-h` (56px), `--sidebar-w` (248px), `--sidebar-w-collapsed` (64px), `--islamic-panel-w` (280px)
**Transitions**: `--ease`, `--duration` (200ms), `--duration-lg` (300ms)
**Module Colors (18)**: work, money, people, office, tech, crm, faith pillars, submodules
**Pillar Colors (7)**: `--pillar-faith` through `--pillar-ummah` + `-bg` (8%) and `-border` (25%) variants

## Font Stack
DM Sans (primary), Manrope, Noto Serif, Space Grotesk, Amiri (Arabic), JetBrains Mono (code) — all Google Fonts imports.

## Key Rules
- **Always use CSS custom properties** — never hardcode colors/spacing
- Light-first design; dark theme via `[data-theme="dark"]` selector
- Consistent opacity: 8% for `-bg` variants, 25-30% for `-border` in light; higher in dark
- All component CSS is co-located with its component file, NOT in this folder
