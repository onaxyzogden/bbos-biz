# Maqasid OS V2.1

Islamic life operating system — manage work, money, people, and operations across the Seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah).
React 19 SPA · Zustand 5 · React Router 7 · Vite 8 · dnd-kit · Lucide icons · date-fns

## Amanah Gate
Before any work: confirm the task serves a halal purpose. If riba, gharar, or ethical concerns arise — STOP and flag. Full protocol: `docs/principles.md`

## Context-First Rule
Before reading or modifying ANY source file, FIRST read the CONTEXT.md for every domain your task touches (use the routing table below). CONTEXT.md files contain file inventories, architecture, store dependencies, key patterns, and gotchas — they eliminate the need for exploratory scanning. Only read individual source files for details the CONTEXT.md does not cover. This rule applies to subagents too — always include the relevant CONTEXT.md path(s) in subagent prompts.

## Routing Table — Load the Right CONTEXT.md

| Task Domain | Primary Location | Context File |
|---|---|---|
| App shell, sidebar, topbar, navigation | `src/components/layout/` | `src/components/layout/CONTEXT.md` |
| Work module (projects, tasks, kanban, gantt) | `src/components/work/` | `src/components/work/CONTEXT.md` |
| Money module (expenses, invoices, income) | `src/components/money/` | `src/components/money/CONTEXT.md` |
| People module (HR, contacts, attendance) | `src/components/people/` | `src/components/people/CONTEXT.md` |
| Office module (calendar, docs, chat, forum) | `src/components/office/` | `src/components/office/CONTEXT.md` |
| Tech module (websites, integrations, email) | `src/components/tech/` | `src/components/tech/CONTEXT.md` |
| CRM module (contacts, pipeline, deals) | `src/components/crm/` | `src/components/crm/CONTEXT.md` |
| Maqasid pillars & dashboards | `src/pages/` | `src/pages/CONTEXT.md` |
| Islamic UI (prayer, niyyah, ceremony, thresholds) | `src/components/islamic/` | `src/components/islamic/CONTEXT.md` |
| Shared components (search, labels, tables) | `src/components/shared/` | `src/components/shared/CONTEXT.md` |
| State management (Zustand stores) | `src/store/` | `src/store/CONTEXT.md` |
| Static data (ayat, seed tasks, pillar content) | `src/data/` | `src/data/CONTEXT.md` |
| Hooks & services | `src/hooks/` + `src/services/` | `src/hooks/CONTEXT.md` |
| Styles & design tokens | `src/styles/` | `src/styles/CONTEXT.md` |
| BBOS pipeline components | `src/components/bbos/` | `src/components/bbos/CONTEXT.md` |

## Naming Conventions
- **Components**: PascalCase (e.g. `KanbanBoard.jsx`)
- **Stores**: kebab-case with `-store` suffix (e.g. `task-store.js`)
- **Data files**: kebab-case descriptive (e.g. `faith-seed-tasks.js`)
- **CSS**: co-located, same name as component (e.g. `KanbanBoard.css`)
- **Hooks**: camelCase with `use` prefix (e.g. `useModuleProgress.js`)
- **Pages**: PascalCase, pillar prefix for sub-pages (e.g. `FaithSalahPage.jsx`)

## Cross-Cutting Rules
- Plan mode for any non-trivial task (3+ steps or irreversible changes)
- Use subagents for research/exploration to keep main context clean
- Never mark done without verification
- After any correction: update `tasks/lessons.md`
- Full workflow principles: `docs/principles.md`
