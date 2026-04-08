# People Module — CONTEXT.md

## Purpose
HR, contacts, recruitment, and sales pipeline management. Largest component folder (41 files) with master-detail pattern.

## File Inventory

**Page-Level Components:**
HRPage, ContactsPage, RecruitmentPage, SalesPipelinePage

**Detail Components:**
DetailPanel, DetailPanelHeader, DetailPanelTabs

**Contact/Employee UI:**
ContactCard, EmployeeCard, ContactsTable, ContactsToolbar, EmployeeList

**Forms & Modals:**
AddContactModal, AddEmployeeModal, AddDepartmentModal, EmployeeForm, EditSidePanel, ClockInModal

**Features:**
TimeTracker, LeaveManager, TeamInsights, AttendanceView, FloatingFAB

**Utilities:**
AvatarInitials, TypeBadge, CollapsibleSection

**tabs/ subfolder (11 files):**
AbsenceTab, ClockInsTab, CompanyInfoTab, CompanyNotesTab, CompanyPeopleTab, DocsTab, HRTab, PersonalTab, SalaryTab, SkillsTab, WorkTab

**Page-Level Tabs:**
TimesheetTab, SalariesTab, StatsTab, OrganizationTab

## Architecture
```
HRPage (5 tabs: employees, timesheet, salaries, stats, organization)
├── EmployeeCard[] (grid)
├── DetailPanel → DetailPanelHeader + DetailPanelTabs (11 tabs)
└── TimesheetTab / SalariesTab / StatsTab / OrganizationTab

ContactsPage
├── ContactsToolbar (search, filters)
├── ContactCard[] | ContactsTable (toggled by viewMode)
├── FloatingFAB → AddContactModal
└── DetailPanel

RecruitmentPage (kanban with job stages)
SalesPipelinePage (kanban with lead stages)
```

## Store Dependencies
- **people-store**: employees, departments, add/updateEmployee
- **contacts-store**: contacts, companies, selectedContactId, viewMode, panelOpen, selectContact
- **auth-store**: user

## Key Patterns
- **Master-detail**: DetailPanel shared across pages, triggered by card/row click, reads `selectedContactId`
- **Merge pattern**: HRPage merges people-store employees with contacts-store employee-type contacts, deduplicates by ID
- **ViewMode toggle**: ContactsPage supports 'cards' or 'table' view
- **Inline kanban**: RecruitmentPage and SalesPipelinePage use LEAD_STAGES/JOB_STAGES columns
- **Portal modals**: RecruitmentPage and SalesPipelinePage use createPortal for detail panels

## Data Shapes
- **Employee**: name, email, phone, role, department, employmentType, startDate, status, leaveBalance
- **Contact**: firstName, lastName, email, phone, jobTitle, contactType (employee/lead/contact/vendor), leadStatus, companyId
- **Company**: name, email, phone, contactType, status, logoColor

## Gotchas
- DetailPanel reads BOTH contacts and companies via selectedContactId (polymorphic)
- EmployeeForm reuses `.expense-form-*` CSS classes (from money module)
- RecruitmentPage and SalesPipelinePage store data in localStorage directly (not Zustand)
- Two levels of "tabs": page-level (Timesheet, Salaries, etc.) vs detail-panel tabs (Personal, Work, Skills, etc.)
