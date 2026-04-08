# Work Module — CONTEXT.md

## Purpose
Project and task management with Kanban, List, and Gantt views. Uses dnd-kit for drag-and-drop.

## File Inventory
| File | Description |
|------|-------------|
| ProjectBoard.jsx | View-switching hub (board/list/gantt), manages filters and side panel |
| KanbanBoard.jsx | DndContext orchestrator with drag-drop across columns |
| KanbanColumn.jsx | Droppable column wrapper with sortable cards and quick-add |
| KanbanCard.jsx | Sortable task card with priority/due-date/subtask badges |
| ListView.jsx | Table view grouping tasks by column |
| GanttView.jsx | Timeline view with zoom controls (day/week/month) |
| FilterBar.jsx | Pill-based filter UI for priorities, due dates, tags |
| TaskDetailPanel.jsx | Right-side panel for editing task details, subtasks, tags |
| PillarBoard.jsx | Board variant for pillar sub-pages (behind CeremonyGate) |

## Architecture
```
ProjectBoard
├── BbosPipelineHeader (if BBOS enabled)
├── FilterBar
└── KanbanBoard | ListView | GanttView (switched by `view` state)
    └── TaskDetailPanel (when selectedTaskId set)
```

## Store Dependencies
- **task-store**: `tasksByProject`, `getFilteredTasks`, `moveTask`, `createTask`, `updateTask`, `deleteTask`, `addSubtask`, `toggleSubtask`, `removeSubtask`
- **project-store**: `getProject`
- **app-store**: `filters[projectId]`, `setFilters`, `clearFilters`, `getActiveFilterCount`
- **auth-store**: `user` (assignee initials in TaskDetailPanel)

## Key Patterns
- **dnd-kit sensors**: PointerSensor (5px distance), TouchSensor (200ms delay, 5px tolerance)
- **Collision detection**: `pointerWithin` strategy
- **View-only cards**: `accessLevel === 'V'` disables drag via `useSortable({ disabled: true })`
- **Auto-save**: TaskDetailPanel debounces text inputs at 300ms
- **BBOS integration**: Tasks filterable by `bbosStage`; role access via `getTaskAccessLevel()`

## Common Tasks
- Add new view type → add case in ProjectBoard's view switch + ViewToggle options
- Add task field → update task-store shape + TaskDetailPanel form + KanbanCard display
- Change column behavior → modify KanbanColumn (droppable) + KanbanBoard drag handlers

## Gotchas
- Moving to "Done" column does NOT auto-set `completedAt` — component must handle this
- Gantt undated tasks render at bottom without bars
- View-only card opacity hardcoded to 0.55
- No concurrent drag support (single `activeId`)
