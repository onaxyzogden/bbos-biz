# Tech Module — CONTEXT.md

## Purpose
Technology stack dashboard: website monitoring, dark web breach detection, integrations, and email campaigns.

## File Inventory
| File | Description |
|------|-------------|
| TechOverview.jsx | Dashboard card with dark web monitoring summary, website health, radar SVG visualization |
| DarkWebTab.jsx | Email breach monitoring; toggle service; pie chart (open/cleared); monthly bar chart |
| WebsitesTab.jsx | Add/pause/resume website monitors; uptime stacked bar chart per day |
| IntegrationsTab.jsx | Grid of integration cards (Slack, Xero, etc.); toggle connect/disconnect |
| EmailCampaignsTab.jsx | Create/send campaigns; status filter (pending/sent); archive toggle |

## Store Dependencies
- **tech-store**: monitors[], breaches[], darkWebEmails[], campaigns[], integrations[]
- **auth-store**: user ("Added by")

## Key Patterns
- SVG radar with concentric rings and CSS sweep animation
- Pie/bar charts rendered as inline SVG (manual path calculations, no chart library)
- Dark web email management via slide-in panel
- Monitor status badges (active/paused) with color coding
- Zen icon SVG for empty states

## Gotchas
- `checkMonitor()` simulates status updates — no real HTTP calls
- Charts are hand-drawn SVG, not a charting library
