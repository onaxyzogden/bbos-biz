# Money Module — CONTEXT.md

## Purpose
Financial management: expenses, invoices, income, bank accounts, vendors, proposals, and assets. Tab-based layout with slide-in panels.

## File Inventory
| File | Description |
|------|-------------|
| MoneyDashboard.jsx | Main dashboard with balance cards, cost categories, goals, transactions |
| AccountsTab.jsx | Bank account management (add/edit via slide-in panel) |
| IncomeTab.jsx | Income tracking |
| ExpenseList.jsx | Expense list with status (unpaid/paid) |
| ExpensePanel.jsx | Slide-in form for adding/editing expenses |
| InvoiceList.jsx | Invoice management with line items |
| VendorsTab.jsx | Vendor directory |
| ProposalTab.jsx | Proposal tracking |
| AssetsTab.jsx | Asset inventory |

## Store Dependencies
- **money-store**: accounts, categories, vendors, expenses, invoices, incomes, assets, budgets, invoiceCounter, formatCurrency
- **auth-store**: user
- **settings-store**: theme/currency (optional)

## Key Patterns
- **Slide-in panels**: AccountPanel, ExpensePanel, InvoicePanel use `.money-slidein` with overlay + portal
- **Embeddable mode**: MoneyDashboard supports standalone rendering (used inside Project sub-route)
- **Currency support**: CURRENCIES list from data; transactions track currency code (CAD, USD, etc.)
- **Line items**: Invoices support dynamic items (description, qty, unitPrice, discount, tax) with `genLineItemId()`
- **Form classes**: `.money-field`, `.money-field-row`, `.money-field-divider` (collapsible sections)

## Data Shapes
- **Account**: bankName, currency, accountNumber, iban, swift, currentBalance, availableBalance, reservedBalance, dateOpened, isPayroll
- **Expense**: description, categoryId, amount, currency, dueDate, vendorId, note, tags[], status (unpaid/paid)
- **Invoice**: clientName, clientEmail, date, dueDate, currency, language, lineItems[], discountTotal, paymentAccountId, isRecurring, termsAndConditions, notes, status

## Gotchas
- Mixed CSS class naming: `.expense-*` and `.money-*` (inconsistent)
- InvoicePanel is 600px wide, ExpensePanel auto-width
- `formatCurrency` is a store-level utility (not component-local)
- Charts in MoneyDashboard use pure CSS stacked bars (no chart library)
- Payroll accounts have special handling (`isPayroll` flag)
