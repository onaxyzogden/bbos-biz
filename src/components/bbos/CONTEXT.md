# BBOS Pipeline Components — CONTEXT.md

## Purpose
Barakah Business Operating System pipeline UI: stage visualization, role-based access, and structured task panels.

## File Inventory
| File | Description |
|------|-------------|
| BbosPipelineHeader.jsx | Visual stage pipeline header (INT, QAL, STR, etc.); current/past/filtered states |
| BbosRoleBadge.jsx | Role abbreviation badge styled with role.color and role.bg |
| BbosRolePicker.jsx | Dropdown picker for BBOS roles (all/OP/FD/etc.); uses BbosRoleBadge |
| BbosTaskPanel.jsx | Full task detail panel: purpose, theological rationale, field forms, G-Label, AI draft |

## Store/Data Dependencies
- **task-store**: `getTask()`, `updateTask()`, `updateBbosFieldData()`, `deleteTask()`
- **auth-store**: user
- **data/bbos-pipeline.js**: stage definitions
- **data/bbos-task-definitions.js**: `getBbosTaskDef()` (fields, validation, AI draft config)
- **data/bbos-role-access.js**: `getTaskAccessLevel(bbosRole, bbosTaskType)`

## Key Patterns
- Tasks have `bbosTaskType` field (e.g., 'INT_001', 'QAL_S1') linking to task definitions
- `bbosFieldData` object maps field IDs to user-entered values
- AI draft status: `_aiDraftStatus` ('none', 'pending', 'accepted', 'rejected')
- G-Label assignment via `task.gLabel` field
- Collapsible rationale section (theological context)
- Local field state with debounced saves (300ms)
- Form field types: textarea, text, select, number — mapped from task definition
- Mobile: full-screen overlay; desktop: slide-in-right sidebar

## Gotchas
- AI draft generation is placeholder (pending real integration)
- Validation flags from task definition shown as alert cards
- Role access levels: 'V' (view-only), 'E' (edit), '-' (hidden)
