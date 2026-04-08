# Zustand Stores — CONTEXT.md

## Purpose
13 Zustand stores managing all application state with manual localStorage persistence.

## File Inventory
| Store | Key State | Persistence Keys |
|-------|-----------|-----------------|
| app-store.js | `sidebarOpen`, `islamicPanelOpen`, `activeModule`, `expandedPillars`, `filters` | Mixed (safeGet/safeSet) |
| auth-store.js | `user: { name, ... } | null` | `auth_user` |
| task-store.js | `tasksByProject: { [projectId]: Task[] }` | `tasks_${projectId}` |
| project-store.js | `projects: Project[]` | `projects` |
| money-store.js | `expenses`, `invoices`, `categories`, `budgets`, `vendors`, `accounts`, `incomes`, `assets` | 8 keys + `invoiceCounter` |
| people-store.js | `employees`, `attendance`, `leaveRequests`, `timeEntries`, `departments` | 5 keys |
| contacts-store.js | `contacts`, `companies`, `hrRecords`, `absences`, `clockIns`, `salaries`, `docs`, `departments` + UI state | 7 keys |
| office-store.js | `channels`, `messages`, `events`, `documents`, `qaItems`, `announcements` | 6 keys |
| crm-store.js | `contacts`, `deals`, `pipeline` (stages), `activities` | 4 keys |
| tech-store.js | `monitors`, `darkWebEmails`, `breaches`, `integrations`, `campaigns` | 6 keys |
| settings-store.js | `theme`, `valuesLayer`, `attrLang` | Individual string keys |
| threshold-store.js | `niyyahDate`, `niyyahFocus[]`, `completedOpening`, `completedClosing`, `deferred` + ephemeral prayer state | Mixed |
| money-store.js | (see above) | (see above) |

## Architecture

**No Zustand persist middleware** — all stores use manual `safeGet`/`safeSet`/`safeGetJSON` from `services/storage.js`.

**Create pattern:**
```js
export const useXxxStore = create((set, get) => ({
  data: safeGetJSON('storage_key', defaultValue),
  action: (params) => set((s) => {
    const updated = [...s.data, newItem];
    safeSet('storage_key', updated);
    return { data: updated };
  }),
}));
```

**Init pattern** (for seeded data):
```js
function initDepartments() {
  const stored = safeGetJSON('people_departments', null);
  if (stored) return stored;
  persistDepartments(PRESET_DEPARTMENTS);
  return [...PRESET_DEPARTMENTS];
}
```

## Cross-Store Dependencies
- **task-store ← project-store**: seed functions write to task storage directly
- **contacts-store & people-store**: both maintain separate `departments` arrays (duplicated)
- **app-store ← task-store**: filters stored in app-store, applied by task-store's `getFilteredTasks()`
- **contacts-store vs crm-store**: two separate contact systems with no link

## Key Patterns
- No optimistic updates — all mutations persist immediately
- No rollback on storage errors
- Components read multiple stores independently via hooks (no cross-store subscriptions)
- Ephemeral vs persistent fields in threshold-store have no clear boundary marker

## Gotchas
- `departments` duplicated across people-store and contacts-store
- `task-store` silently creates empty array for non-existent projectId
- `money-store` invoiceCounter increments forever (no year-based reset)
- `app-store` redefines `safeGetJSON` locally (shadows service import)
- `tech-store` `checkMonitor()` simulates status — no real HTTP calls
- `project-store` runs BBOS column migration on every store creation (idempotent but wasteful)
