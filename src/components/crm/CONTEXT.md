# CRM Module — CONTEXT.md

## Purpose
Customer relationship management: contacts, deal pipeline, and activity logging.

## File Inventory
| File | Description |
|------|-------------|
| ContactList.jsx | CRUD interface with search/filter by contact type; inline edit forms |
| DealPipeline.jsx | Kanban-style deal stages with drag-to-stage; value totals per stage |
| DealPipeline.css | Pipeline column layout, deal card styles, animations |
| ActivityLog.jsx | Log/filter/manage activities (calls, emails, meetings, notes) tied to contacts/deals |

## Store Dependencies
- **crm-store**: contacts[], deals[], activities[], pipeline[] (stages), CRUD methods
- **auth-store**: user (authorship)

## Key Patterns
- Form overlays use `.expense-form-*` CSS classes (shared pattern)
- Memoized filtering/sorting on every render
- Contact/deal maps for quick lookups in tables
- Color-coded deal stages from `stage.color`
- Activity types from ACTIVITY_TYPES constant; contact types from CONTACT_TYPES
- CRM contacts are separate from people-store contacts (no link between systems)

## Gotchas
- Two separate contact systems exist: crm-store (sales) vs contacts-store (HR/people)
- Deal pipeline is NOT using dnd-kit — uses manual drag-to-stage buttons
