# Hooks & Services — CONTEXT.md

## Purpose
Custom React hooks (5) and utility services (3) shared across the app.

## Hooks

| File | Description |
|------|-------------|
| useInactivity.js | Monitors user activity (mousemove, keydown, click, scroll, touchstart); triggers `onInactive` after timeout (default 20min); throttles events (30s); handles tab visibility |
| useKeyboard.js | Listens for Cmd+K (search), Cmd+I (Islamic panel), Escape; calls handler(e) |
| useMobile.js | Tracks window width vs 768px breakpoint; returns boolean |
| useModuleProgress.js | Aggregates task completion by moduleId; returns `{ total, completed, pct }` |
| usePrayerTimes.js | Fetches from Aladhan API (method 2); reverse geocodes via Nominatim; calculates active prayer window (5min before to 10min after); polls every 30s; caches to localStorage |

## Services

| File | Description |
|------|-------------|
| id.js | 30+ ID generator factories using `nanoid`: `genProjectId()`, `genTaskId()`, `genExpenseId()`, etc. Pattern: `'prefix_' + nanoid(length)` |
| storage.js | localStorage wrapper with `'bbiz_'` prefix: `safeSet`, `safeGet`, `safeGetJSON`, `safeRemove`, `listKeys(prefix)`, `exportAll()`, `importAll()`, `clearAll()`. All ops wrapped in try/catch |
| migration.js | Runs before React mounts (sync). Schema v5.0 — unified contacts model. Migrates old people_employees → ContactRecord + HRRecord. Stamps schema version for rollback safety |

## Key Dependencies
- **usePrayerTimes**: Aladhan API (external), Nominatim API (external), localStorage cache
- **useModuleProgress**: task-store, project-store
- **useInactivity**: DOM event listeners
- **storage.js**: used by ALL Zustand stores for persistence

## Gotchas
- usePrayerTimes precision timer fires exactly when prayer window opens (not approximate)
- migration.js runs on every app load but is idempotent (checks schema version)
- storage.js `'bbiz_'` prefix means raw `localStorage.getItem()` won't find keys
- useModuleProgress checks both `task.completedAt` and `columnId.endsWith('_done')`
