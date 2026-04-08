# Office Module — CONTEXT.md

## Purpose
Workplace collaboration: calendar, documents, team chat, forum, and announcements.

## File Inventory
| File | Description |
|------|-------------|
| CalendarView.jsx | Month/week/day/agenda views; event categories with color filtering; upcoming sidebar |
| DocumentManager.jsx | File type tabs (PDF, DOCX, XLSX, etc.); document viewer/editor; FAB for uploads |
| TeamChat.jsx | Slack-like 3-pane layout: channels, messages, groups; rich toolbar (UI only) |
| Forum.jsx | Q&A threads with resolution status; reply threading; mark-resolved toggle |
| Announcements.jsx | Create/delete announcements; search filter; timestamp + author tracking |

## Store Dependencies
- **office-store**: channels[], messages[], events[], documents[], qaItems[], announcements[]
- **auth-store**: user (message authorship)

## Key Patterns
- Time formatting with `localeString` for calendar dates
- Category filtering via Set management (`activeFilters`)
- Inline form overlays with slide-in animations
- Message auto-scroll via `useRef` + `useEffect`
- Channel avatars derived from user initials
- Rich toolbar in TeamChat is buttons-only (no functional implementation yet)

## Gotchas
- Default channels ('General', 'Administration') are immutable (`isDefault: true`)
- Document viewer is basic preview — no real file storage integration
