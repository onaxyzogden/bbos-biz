# Shared Components — CONTEXT.md

## Purpose
Reusable UI components used across multiple modules: search, labels, tables, tooltips, headers.

## File Inventory
| File | Description | Used By |
|------|-------------|---------|
| SearchPalette.jsx | Cmd+K command palette; searches projects & tasks; keyboard nav (arrows, Enter, Escape) | Global (via AppShell) |
| IslamicTerm.jsx | Portal-based hover tooltip for Islamic terms; smart positioning (above/below) | Throughout app |
| GLabelBadge.jsx | Displays G-Label (integrity label) badge | BbosTaskPanel |
| GLabelPicker.jsx | Dropdown picker for G-Labels; escape to close | BbosTaskPanel |
| MaqasidTable.jsx | Maqasid framework table (necessities/needs/embellishments rows) | Module pages (Quran, Hadith) |
| OverviewCards.jsx | Card grid for overview items; Quranic ayah/hadith references | FivePillars, module overviews |
| PillarHeader.jsx | Compact pillar label with stewardship phrase and Arabic root | Module page headers |
| ViewToggle.jsx | Two-button toggle (Overview/Framework); role="tablist" with aria-selected | Pages with dual views |

## Store Dependencies
- **app-store** (SearchPalette): `searchOpen`, `setSearchOpen`
- **project-store** (SearchPalette): `projects[]`
- **task-store** (SearchPalette): `searchAllTasks()`
- **settings-store** (PillarHeader): `valuesLayer`

## Key Patterns
- **Portal components**: IslamicTerm, SearchPalette use React portal to escape `overflow:hidden`
- **CSS variable cascading**: `--fp-accent`, `--pd-color`, `--ph-color` for dynamic theming
- **Memoized filtering**: SearchPalette filters on min 2 chars
- **Keyboard shortcuts**: Escape, Arrow keys, Enter for navigation
- **Smart tooltip positioning**: IslamicTerm flips above/below based on available space
- **Accessibility**: proper ARIA roles on ViewToggle and SearchPalette

## Gotchas
- IslamicTerm tooltip uses fixed positioning via portal — parent scroll doesn't break it
- SearchPalette has min 2-char threshold before showing results
- MaqasidTable reuses `PillarDashboard.css` styles
