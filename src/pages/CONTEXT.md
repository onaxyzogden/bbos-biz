# Pages — CONTEXT.md

## Purpose
60+ page components — pillar dashboards, pillar sub-pages, business module pages, and standalone views. All flat in one directory (no subdirectories).

## File Inventory by Category

**Pillar Dashboards (8):**
FaithDashboard, LifeDashboard, IntellectDashboard, FamilyDashboard, WealthDashboard, EnvironmentDashboard, UmmahDashboard, PillarDashboard (generic catch-all)

**Pillar Sub-Pages (26):**
- Faith: FaithCorePage, FaithGrowthPage, FaithExcellencePage, FaithShahadaPage, FaithSalahPage, FaithZakahPage, FaithSawmPage, FaithHajjPage
- Life: LifePhysicalPage, LifeMentalPage, LifeSafetyPage, LifeSocialPage
- Intellect: IntellectLearningPage, IntellectThinkingPage, IntellectCognitivePage, IntellectProfessionalPage
- Family: FamilyMarriagePage, FamilyParentingPage, FamilyKinshipPage, FamilyHomePage
- Wealth: WealthEarningPage, WealthFinancialPage, WealthOwnershipPage, WealthCirculationPage
- Environment: EnvironmentResourcePage, EnvironmentWastePage, EnvironmentEcosystemPage, EnvironmentSourcingPage

**Business Modules (7):** Work, Project, Money, People, Office, Tech, CRM

**Islamic Knowledge (4):** FivePillars, IslamicKnowledgePage, QuranPage, HadithPage

**Standalone (6):** Landing, Onboarding, Dashboard, Settings, ModulePlaceholder, ComingSoon

**Community (4):** FamilyPage, Neighbors, Community, CollectivePage

## Routing (defined in App.jsx)
- All app routes nested under `/app` (wrapped in AppShell + ProtectedRoute)
- Explicit dashboard routes: `/app/faith`, `/app/life`, etc.
- Sub-page routes: `/app/faith-salah`, `/app/life-physical`, etc.
- Business modules: `/app/work`, `/app/money`, `/app/people`, `/app/office`, `/app/tech`
- Project sub-routes: `/app/work/:projectId` with nested tabs (people, tasks, money, assets, office, tech)
- Catch-all: `/app/pillar/:pillarId` → PillarDashboard (reference table view)
- Fallback: `/:moduleId` → ModulePlaceholder

## Common Dashboard Pattern
All pillar dashboards share identical structure:
1. **Header**: Module badge, title with `<IslamicTerm>`, Quranic verse, progress bar
2. **Hero card**: Background image, gradient, CTA button
3. **Three-tier bento grid**: Necessities (left) | Needs (top-right) | Excellence (bottom-right)
4. **Footer**: Copyright, decorative icons
- Uses `useModulesProgress()` hook for tier progress
- Calls `ensureXxxProjects()` on mount to seed project data

**PillarDashboard.jsx** is NOT a dashboard UI — it renders a 4-column reference table (Aspect | Necessities | Needs | Embellishments).

## Store Dependencies
- `useThresholdStore` — ceremony completion tracking
- `useSettingsStore` — `valuesLayer` (islamic/universal), theme
- `useProjectStore` — project CRUD, `ensureFaithProjects()`, etc.
- `useTaskStore` — task loading
- Domain-specific stores for business modules

## Sub-Page Pattern
All pillar sub-pages gate behind CeremonyGate:
```jsx
if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-salah" />;
return <PillarBoard ... />;
```

## Naming Convention
- `{Pillar}Dashboard.jsx` — pillar overview
- `{Pillar}{SubTopic}Page.jsx` — pillar sub-page
- `{Module}.jsx` — business module (Work, Money, People, etc.)
