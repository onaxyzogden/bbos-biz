# Static Data — CONTEXT.md

## Purpose
40 files of static configuration, content, and seed data. No runtime state — all exports are constants or pure lookup functions.

## File Inventory by Type

**Maqasid & Module Definitions:**
- `maqasid.js` — MAQASID_PILLARS array (7 pillars), `getPillarById()`, `getPillarLabel()`, `getPillarStewardship()`
- `modules.js` — MODULES array (8 modules: people, work, money, tech, office, family, neighbors, community)
- `contact-config.js` — EMPLOYMENT_TYPES, LEAD_STAGES, getDisplayName, getAvatarColor

**Readiness Ayat (14 files):**
- `readiness-ayat-router.js` — Central registry: `lookupReadinessAyahByKey(readinessAyatKey, binaryKey)`
- Per-pillar: `{pillar}-readiness-ayat.js` (faith, life, intellect, wealth, environment, people)
- Legacy: `work-readiness-ayat.js`, `community-readiness-ayat.js`, `family-readiness-ayat.js`, `spirituality-readiness-ayat.js`, `rest-readiness-ayat.js`, `learning-readiness-ayat.js`

**Seed Tasks (5 files):**
- `{pillar}-seed-tasks.js` (faith, family, intellect, wealth, environment)
- Pattern: exports object with keys like `faith_shahada_core`, `faith_salah_growth`, etc.

**Module Overviews (6 files in module-overviews/):**
- `family-overview.js`, `community-overview.js`, `hadith-overview.js`, `quran-overview.js`, `neighbors-overview.js`, `collective-overview.js`

**Content & Configuration:**
- `pillar-content.js` — PILLAR_CONTENT lookup (necessities/needs/embellishments per pillar)
- `pillar-dashboard-data.js` — Dashboard metrics per pillar
- `five-pillars-content.js` — Islamic Five Pillars educational content
- `islamic-data.js` — PRESENCE_CONFIG, prayer data, DUA constants, PAUSE_QUESTIONS, DEFER_CONTENT, `getModuleData()`
- `islamic-glossary.js` — Islamic term definitions for tooltips
- `money-categories.js` — CURRENCIES, expense categories
- `people-departments.js` — EMPLOYEE_STATUSES, DEFAULT_LEAVE_BALANCE
- `g-labels.js` — Generic label definitions for GLabelBadge/GLabelPicker
- `bbos-pipeline.js`, `bbos-task-definitions.js`, `bbos-role-access.js` — BBOS pipeline config

## Key Data Shapes

**Pillar** (maqasid.js):
```js
{ id, order, sidebarLabel, universalLabel, stewardshipLabel, arabicRoot, arabicRootAr, rootAction, accentColor, icon, subModuleIds[], status, relationship, readinessAyatKey }
```

**Readiness Ayah** (per binary key):
```js
{ arabic, transliteration, translation, source: 'Surah X:Y', edition, framing }
```

**Seed Task**:
```js
{ title, priority: 'urgent'|'high'|'medium'|'low', tags[] }
```

## Readiness Ayat Routing
1. User answers 6 yes/no readiness questions → binary string (e.g., '100010')
2. `lookupReadinessAyahByKey(readinessAyatKey, binaryKey)` → looks up pillar registry
3. Returns Quranic ayah with Arabic, translation, and framing message
4. Returns `null` if key is '111111' (all YES) — no pause needed

## Naming Conventions
- Readiness files: `{pillar}-readiness-ayat.js`, exports: `READINESS_AYAT_{PILLAR}`
- Seed files: `{pillar}-seed-tasks.js`, exports: `{PILLAR}_SEED_TASKS`
- Binary keys: 6-char strings '000000' to '111110' ('111111' omitted = complete)
