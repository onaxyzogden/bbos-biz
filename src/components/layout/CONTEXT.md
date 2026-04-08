# Layout Components — CONTEXT.md

## Purpose
Root app shell, navigation, and modal orchestration. 5 components controlling responsive layout, sidebar navigation, and ambient features (prayer awareness, reflection journal).

## File Inventory
| File | Description |
|------|-------------|
| AppShell.jsx | Root layout: CSS Grid with sidebar + main + optional Islamic panel. Hosts SearchPalette, ThresholdModal, PrayerOverlay, PrayerWarning, NiyyahAct, ResumeOverlay, reflection journal |
| Sidebar.jsx | Left nav: MAQASID_PILLARS as collapsible groups with sub-modules, business module links |
| TopBar.jsx | Header: breadcrumb, contextual tabs (WORK_TABS for project sub-routes), search/Islamic panel/notification toggles |
| MobileNav.jsx | Bottom tab bar for mobile viewport |
| NotificationsPanel.jsx | Aggregates task completions, project creations, contact additions, events (uses portal) |

## Architecture
```
AppShell (CSS Grid)
├── TopBar
├── Sidebar (desktop) / MobileNav (mobile)
├── <Outlet /> (page content)
├── IslamicPanel (right sidebar, conditional)
└── Modals: SearchPalette, ThresholdModal, PrayerOverlay, PrayerWarning, NiyyahAct, ResumeOverlay
```

## Store Dependencies
- **app-store**: `sidebarOpen`, `searchOpen`, `islamicPanelOpen`, `activeModule`, `reflectionOpen`
- **project-store**: projects list (sidebar rendering)
- **task-store**: `loadTasks`
- **threshold-store**: prayer lock, resume state, niyyah tracking
- **settings-store**: `valuesLayer` (controls prayer features when 'islamic')
- **auth-store**: user (TopBar, NotificationsPanel)
- **contacts-store, people-store, office-store**: NotificationsPanel aggregation

## Key Patterns
- **Responsive grid**: dynamic column templates based on `sidebarOpen` + `islamicPanelOpen`
- **Mobile detection**: `useMobile()` hook; sidebar becomes overlay, MobileNav shown
- **Keyboard shortcuts**: Cmd+K → search, Cmd+I → Islamic panel (via `useKeyboard` hook)
- **Prayer awareness**: AppShell integrates `usePrayerTimes()` + inactivity tracking
- **Reflection journal**: built directly in AppShell, persists via `safeGetJSON`/`safeSet`
- **TopBar contextual tabs**: detects `/app/work/{projectId}` route for WORK_TABS

## Gotchas
- Sidebar collapse uses CSS class `.collapsed` + width CSS variables
- Prayer lock/warning only active when `valuesLayer === 'islamic'`
- Reflection panel close has 220ms animation delay
- NotificationsPanel uses createPortal
