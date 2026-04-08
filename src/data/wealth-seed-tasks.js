// Seed tasks for Wealth pillar submodules (Hifz al-Mal).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const WEALTH_SEED_TASKS = {
  // ── EARNING & PROVISION (RIZQ) ──
  wealth_earning_core: [
    { title: 'Audit all income sources — confirm each is free from riba, haram industries, and deception', priority: 'urgent', tags: ['halal-income', 'audit'] },
    { title: 'Identify and exit any employment, contract, or investment that involves haram activity', priority: 'urgent', tags: ['halal-income', 'action'] },
    { title: 'Learn the Islamic conditions for halal earnings — avoid riba, gharar, maysir, and oppression', priority: 'high', tags: ['fiqh', 'halal-income'] },
    { title: 'Ensure your income consistently covers the fard needs of your dependants (nafaqah)', priority: 'high', tags: ['provision', 'obligation'] },
    { title: 'Make tawbah and resolve any past haram earnings — consult a scholar if needed', priority: 'medium', tags: ['tawbah', 'purification'] },
  ],
  wealth_earning_growth: [
    { title: 'Identify and develop a high-income skill aligned with your calling and halal principles', priority: 'high', tags: ['skill-building', 'income'] },
    { title: 'Diversify income — build a second halal revenue stream (consulting, rentals, or business)', priority: 'high', tags: ['income', 'stability'] },
    { title: 'Track your income and expenses monthly — use a simple halal-aware budgeting system', priority: 'medium', tags: ['budgeting', 'planning'] },
    { title: 'Negotiate a raise or contract rate increase aligned with your market value', priority: 'medium', tags: ['income', 'negotiation'] },
  ],
  wealth_earning_excellence: [
    { title: 'Create ethical employment — hire and mentor someone, generating income for others', priority: 'medium', tags: ['employment', 'impact'] },
    { title: 'Build a business that operates as an act of worship — clear mission, halal model, community benefit', priority: 'medium', tags: ['business', 'mission'] },
    { title: 'Document and share your halal career or business journey to mentor others', priority: 'low', tags: ['mentorship', 'dawah'] },
  ],

  // ── FINANCIAL LITERACY & MANAGEMENT ──
  wealth_financial_core: [
    { title: 'Close all interest-bearing (riba) accounts and migrate to Islamic or interest-free alternatives', priority: 'urgent', tags: ['riba', 'banking'] },
    { title: 'List all debts — prioritise eliminating high-interest consumer debt immediately', priority: 'urgent', tags: ['debt', 'riba'] },
    { title: 'Create a written monthly budget — income, fixed expenses, zakah allocation, and savings', priority: 'high', tags: ['budgeting', 'planning'] },
    { title: 'Learn the basics of Islamic finance — riba prohibition, murabaha, musharakah, and ijara', priority: 'high', tags: ['islamic-finance', 'study'] },
    { title: 'Build a 1-month emergency cash buffer as a starting safety net', priority: 'high', tags: ['emergency-fund', 'savings'] },
  ],
  wealth_financial_growth: [
    { title: 'Build a 6-month emergency fund in a halal, liquid account', priority: 'high', tags: ['emergency-fund', 'savings'] },
    { title: 'Open a Shariah-compliant investment account — research halal ETFs, sukuk, or Islamic funds', priority: 'high', tags: ['investing', 'halal'] },
    { title: 'Set clear financial goals — 1-year, 5-year, and 10-year targets with milestones', priority: 'medium', tags: ['planning', 'goals'] },
    { title: 'Study a foundational personal finance book — filtered for Islamic compatibility (avoid riba-based advice)', priority: 'medium', tags: ['study', 'financial-literacy'] },
  ],
  wealth_financial_excellence: [
    { title: 'Engage a qualified Islamic financial planner to optimise your asset allocation and estate plan', priority: 'medium', tags: ['planning', 'expert'] },
    { title: 'Develop a multi-asset halal portfolio (equities, real estate, sukuk, gold)', priority: 'medium', tags: ['investing', 'diversification'] },
    { title: 'Achieve full financial independence — passive income covers all living expenses without active work', priority: 'low', tags: ['financial-independence', 'goals'] },
  ],

  // ── OWNERSHIP & RIGHTS ──
  wealth_ownership_core: [
    { title: 'Draft an Islamic Will (Wasiyyah) — ensure your estate distributes according to Quran 4:11–12', priority: 'urgent', tags: ['wasiyyah', 'estate'] },
    { title: 'Confirm all major assets (property, vehicles, accounts) have clear, legitimate title in your name', priority: 'high', tags: ['ownership', 'legal'] },
    { title: 'Learn the Islamic rules of ownership — what you can and cannot own, and your obligations as an owner', priority: 'high', tags: ['fiqh', 'ownership'] },
    { title: 'Identify any property or assets obtained through unclear or disputed means — resolve them', priority: 'high', tags: ['ownership', 'integrity'] },
    { title: 'Ensure all contracts you have signed are free from gharar (ambiguity) and zulm (injustice)', priority: 'medium', tags: ['contracts', 'fiqh'] },
  ],
  wealth_ownership_growth: [
    { title: 'Audit all business and personal contracts — add clarity, fairness, and Islamic compliance where missing', priority: 'high', tags: ['contracts', 'transparency'] },
    { title: 'Research and purchase your first Shariah-compliant asset — property, gold, or halal equity', priority: 'medium', tags: ['investing', 'ownership'] },
    { title: 'Establish proper business documentation — contracts, receipts, and records for all transactions', priority: 'medium', tags: ['business', 'integrity'] },
    { title: 'Learn inheritance law (fara\'id) — know how your estate will be divided and plan accordingly', priority: 'medium', tags: ['faraid', 'estate'] },
  ],
  wealth_ownership_excellence: [
    { title: 'Establish a family trust or multi-generational estate plan with a qualified Islamic scholar and lawyer', priority: 'medium', tags: ['estate', 'legacy'] },
    { title: 'Transfer assets to joint or trust ownership to protect heirs and avoid probate complications', priority: 'low', tags: ['estate', 'planning'] },
    { title: 'Set up a structured charitable ownership vehicle — waqf, foundation, or endowment', priority: 'low', tags: ['waqf', 'legacy'] },
  ],

  // ── CIRCULATION & IMPACT ──
  wealth_circulation_core: [
    { title: 'Calculate your zakah precisely — nisab, hawl, and applicable categories (cash, gold, trade goods)', priority: 'urgent', tags: ['zakah', 'fard'] },
    { title: 'Distribute zakah to eligible recipients immediately — do not delay beyond the hawl date', priority: 'urgent', tags: ['zakah', 'obligation'] },
    { title: 'Pay any outstanding zakah from previous years — make up missed obligations with a scholar\'s guidance', priority: 'urgent', tags: ['zakah', 'qada'] },
    { title: 'Establish a dedicated zakah account or envelope — separate and earmark zakah funds before spending', priority: 'high', tags: ['zakah', 'planning'] },
    { title: 'Learn the eight eligible recipients of zakah (Surah At-Tawbah 9:60) and identify local options', priority: 'medium', tags: ['zakah', 'fiqh'] },
  ],
  wealth_circulation_growth: [
    { title: 'Establish a regular sadaqah habit — automate a monthly charitable contribution, however small', priority: 'high', tags: ['sadaqah', 'habit'] },
    { title: 'Direct investment or purchasing power toward local Muslim businesses and ethical community ventures', priority: 'medium', tags: ['community', 'impact'] },
    { title: 'Give interest-free loans (qard hasan) to family or community members in need', priority: 'medium', tags: ['qard-hasan', 'community'] },
    { title: 'Research and identify a local sadaqah jariyah project to contribute to consistently', priority: 'medium', tags: ['sadaqah-jariyah', 'planning'] },
  ],
  wealth_circulation_excellence: [
    { title: 'Formally establish or fund a waqf (endowment) — a permanent asset dedicated to ongoing benefit', priority: 'medium', tags: ['waqf', 'sadaqah-jariyah'] },
    { title: 'Create a family sadaqah fund — a shared pot your household contributes to and distributes together', priority: 'low', tags: ['sadaqah', 'family'] },
    { title: 'Build a legacy wealth strategy: 1/3 for heirs, 1/3 for charity, 1/3 reinvested in community impact', priority: 'low', tags: ['legacy', 'planning'] },
  ],
};
