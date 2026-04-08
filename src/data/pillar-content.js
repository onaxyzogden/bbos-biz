// Pillar dashboard content: Necessities / Needs / Embelishments (Daruriyyat / Hajiyyat / Tahsiniyyat)
// Each entry maps a subModuleId to its three-column content rows.
// Rows align index-by-index: necessities[0] pairs with needs[0] and embelishments[0].
// If a column has fewer items than others, extra rows render that cell as empty.

export const PILLAR_CONTENT = {
  faith: [
    {
      subModuleId: 'quran',
      necessities: ['Literacy / Translation'],
      needs: ['Divine Guidance'],
      embelishments: ['Memorization, beautiful recitation'],
    },
    {
      subModuleId: 'hadith',
      necessities: ['Scholarly verification'],
      needs: ['Clarification of law/ethics'],
      embelishments: ['Deep study of hadith sciences'],
    },
    {
      subModuleId: 'islamic-knowledge',
      label: 'Islamic Knowledge',
      necessities: [
        'Basic aqidah (creed) and fiqh of worship',
        'Access to qualified scholars and authentic sources',
        'Knowledge of halal and haram fundamentals',
      ],
      needs: [
        'Structured Islamic education — seerah, history, and law',
        'Ongoing intellectual engagement with the deen',
        'Understanding the Maqasid and principles behind rulings',
      ],
      embelishments: [
        'Formal Islamic scholarship (ijazah, seminary study)',
        'Authoring, teaching, and disseminating knowledge',
        'Mastery of Arabic for direct access to primary sources',
      ],
    },
    {
      subModuleId: 'community-engagement',
      label: 'Community Engagement',
      necessities: [
        'Attending Jumu\'ah and congregational prayers',
        'Fulfilling communal obligations (fard kifayah)',
        'Supporting local masjid and community services',
      ],
      needs: [
        'Active participation in community governance (shura)',
        'Volunteering for Islamic schools, charities, and events',
        'Building bridges with neighbours and interfaith groups',
      ],
      embelishments: [
        'Founding or leading community institutions',
        'Mentorship and youth development programs',
        'Da\'wah through exemplary character and service',
      ],
    },
    {
      subModuleId: 'ethical-living',
      label: 'Ethical Living',
      necessities: [
        'Avoiding major sins (kaba\'ir) in daily conduct',
        'Halal income, consumption, and relationships',
        'Truthfulness (sidq) and trustworthiness (amanah)',
      ],
      needs: [
        'Applying Islamic values to work, speech, and social interactions',
        'Regular self-accounting (muhasabah)',
        'Seeking knowledge of ethical rulings relevant to daily life',
      ],
      embelishments: [
        'Ihsan — excellence and beauty in every action',
        'Embodying prophetic character (khuluq) in all dealings',
        'Becoming a living example that draws others to the deen',
      ],
    },
  ],

  life: [
    {
      subModuleId: 'life-physical',
      label: 'Physical Health & Nutrition',
      necessities: [
        'Ensure all food/drink is Halal and meets basic caloric/nutritional requirements',
        'Halal food, clean water, sleep, and basic medical care',
        'Protection from physical harm and environmental dangers',
      ],
      needs: [
        'Establish a consistent exercise routine (3x weekly)',
        'Schedule annual health screenings',
        'Good representation of Islam through physical vitality',
      ],
      embelishments: [
        'Implement sleep optimization and nutrient timing',
        'Prioritize high-quality organic/Tayyib sources',
        'Preventative bio-hacking and longevity practices',
      ],
    },
    {
      subModuleId: 'life-mental',
      label: 'Mental & Emotional Well-being',
      necessities: [
        'Proactively seek Tayyib (wholesome) environments and habits',
        'Maintain mental clarity and spiritual peace',
        'Protection from substance abuse and harmful habits',
      ],
      needs: [
        'Practice daily reflection (Muraqaba) or journaling',
        'Process emotions and reduce stress through structured practices',
        'Integration of faith-based comfort with clinical support',
      ],
      embelishments: [
        'Engage in high-level cognitive training or professional coaching',
        'Achieve deep-work focus and emotional maturity',
        'Holistic wellness that integrates body, mind, and ruh (spirit)',
      ],
    },
    {
      subModuleId: 'life-safety',
      label: 'Safety & Security',
      necessities: [
        'Secure basic housing, clothing, and access to emergency medical care',
        'Protection of the body from physical harm',
        'Maintain safe and stable living environment',
      ],
      needs: [
        'Improve living/working conditions to reduce physical strain',
        'Address long-term environmental hazards',
        'Environmental stability for family and dependents',
      ],
      embelishments: [
        'Contribute to community safety initiatives',
        'Neighborhood watch or disaster relief preparedness',
        'Design systems that protect the vulnerable',
      ],
    },
    {
      subModuleId: 'life-social',
      label: 'Social Presence & Character',
      necessities: [
        'Uphold foundational manners (Adab)',
        'Fulfill basic social obligations to family and neighbors',
        'Basic etiquette in speech, dress, and conduct',
      ],
      needs: [
        'Build a reputation for honesty and reliability',
        'Integrity and trust in all professional and personal dealings',
        'Consistent good character across all social contexts',
      ],
      embelishments: [
        'Serve as a mentor or community leader',
        'Model Ihsan (excellence) in every social interaction',
        'Exemplary representation that inspires others',
      ],
    },
  ],

  intellect: [
    {
      subModuleId: 'intellect-learning',
      label: 'Learning & Literacy',
      necessities: [
        'Attain functional literacy and numeracy required for daily life and worship',
        'Access to books, courses, and reliable information',
        'Ability to distinguish truth from falsehood',
      ],
      needs: [
        'Dedicate time weekly to learning a new skill or deepening existing knowledge',
        'Structured continuous education beyond formal schooling',
        'A culture of lifelong curiosity and intellectual humility',
      ],
      embelishments: [
        'Author a piece of work or mentor others to pass on specialized knowledge',
        'Advanced study in specialized fields',
        'Contributing to scholarship and knowledge creation',
      ],
    },
    {
      subModuleId: 'intellect-thinking',
      label: 'Critical Thinking',
      necessities: [
        'Verify the source and accuracy of information before accepting or sharing it',
        'Resistance to misinformation and logical fallacies',
        'Application of Islamic principles of verification (tathabbut)',
      ],
      needs: [
        'Study foundational logic or frameworks to identify biases and improve decision-making',
        'Exposure to diverse perspectives and structured debate',
        'Analytical frameworks for complex decision-making',
      ],
      embelishments: [
        'Apply cross-disciplinary knowledge to solve complex, high-impact problems',
        'Advanced logic, rhetoric, and usul al-fiqh training',
        'Research methodology and academic writing',
      ],
    },
    {
      subModuleId: 'intellect-cognitive',
      label: 'Cognitive Integrity',
      necessities: [
        'Proactively seek intellectual nourishment and avoid inputs that dull or intoxicate the mind',
        'Protection from harmful media and addictive technologies',
        'Maintaining baseline mental clarity through rest and reflection',
      ],
      needs: [
        'Implement "Deep Work" sessions to build the capacity for sustained concentration',
        'Structured focus and attention training',
        'Regular digital detox and mindful consumption',
      ],
      embelishments: [
        'Achieve a state of high-level intuitive insight through disciplined mental practice',
        'Mastery of flow states for creative and analytical work',
        'Teaching others cognitive discipline and mental fitness',
      ],
    },
    {
      subModuleId: 'intellect-professional',
      label: 'Professional Mastery',
      necessities: [
        'Gain the basic certifications or skills required to perform your current job ethically',
        'Digital literacy and basic technology competence',
        'Communication and interpersonal skills for halal livelihood',
      ],
      needs: [
        'Pursue advanced training to become a Subject Matter Expert in your chosen field',
        'Project management and organizational excellence',
        'Adaptability to changing market and social needs',
      ],
      embelishments: [
        'Innovate within your craft to set new standards of excellence and social benefit',
        'Mentoring others and transferring expertise at scale',
        'Industry leadership that embodies Islamic values',
      ],
    },
  ],

  family: [
    {
      subModuleId: 'family',
      label: 'Relationship Building',
      necessities: [
        'Legal marriage as the foundation of the family unit',
        'Rights and duties of children, parents, and spouses',
        'Maintenance (nafaqah) — financial and physical provision',
      ],
      needs: [
        'Stability, tranquillity, and emotional safety within the home',
        'Righteous upbringing that preserves the faith of the next generation',
        'Functioning kinship networks that support members in need',
      ],
      embelishments: [
        'Emotional intelligence and deep marital bonding',
        'Formalised family legacy and values documentation',
        'Mentorship within extended family structures',
      ],
    },
    {
      subModuleId: 'neighbors',
      label: 'Neighbors',
      necessities: [
        'Not harming neighbors — noise, waste, obstruction, or hostility',
        'Returning greetings and maintaining respectful minimum relations',
      ],
      needs: [
        'Community safety and mutual recognition of rights',
        'A network of local support for those who need it most',
      ],
      embelishments: [
        'Proactive generosity — food, gifts, visits, and shared celebration',
        'Becoming a source of security and goodness for the whole street',
      ],
    },
    {
      subModuleId: 'community',
      label: 'Community',
      necessities: [
        'The Jama\'ah — congregational prayer as the anchor of community life',
        'Fulfilling communal obligations in education, charity, and leadership',
      ],
      needs: [
        'A thriving Islamic institutional infrastructure (schools, masajid, funds)',
        'Mutual support networks that ensure no community member is abandoned',
      ],
      embelishments: [
        'Islamic social entrepreneurship and community endowments (Waqf)',
        'Building systems that outlast individuals — generational institution-building',
      ],
    },
    {
      subModuleId: 'family-marriage',
      label: 'Foundations of Marriage',
      necessities: [
        'Legal & ethical union — valid marriage contract',
        'Basic rights fulfilled (maintenance/kindness)',
        'Clear understanding of spousal rights and obligations',
      ],
      needs: [
        'Emotional tranquility (Sakina) within the home',
        'Weekly quality time to strengthen the bond',
        'Constructive conflict resolution skills',
      ],
      embelishments: [
        'Partnership in virtue — shared spiritual or service projects',
        'Collaborative legacy-building as a family unit',
        'Deep marital bonding and emotional intelligence',
      ],
    },
    {
      subModuleId: 'family-parenting',
      label: 'Parenting & Mentorship',
      necessities: [
        'Basic provision & safety — food, shelter, safe environment',
        'Physical and moral development of children',
        'Teaching children the fundamentals of faith and worship',
      ],
      needs: [
        'Holistic Tarbiyah (education) — character, faith, and life skills',
        'Structured learning plan for Adab and Islamic values',
        'Consistent modelling of Islamic character at home',
      ],
      embelishments: [
        'Intergenerational wisdom — mentoring future leaders',
        'Raising children who contribute to the wider community',
        'Specialised Islamic parenting programs and retreats',
      ],
    },
    {
      subModuleId: 'family-kinship',
      label: 'Extended Family (Kinship)',
      necessities: [
        'Maintaining ties of kinship (Silat al-Rahim)',
        'Regular contact and basic support for parents and close relatives',
        'Honouring parents (birr al-walidayn) and caring for elders',
      ],
      needs: [
        'Proactive support — regular family gatherings',
        'Family Fund to assist relatives during transitions',
        'Structured mentorship between elders and youth',
      ],
      embelishments: [
        'Ancestral honor — documenting family history and values',
        'Preserving the identity and heritage of the lineage',
        'Cross-generational community service projects',
      ],
    },
    {
      subModuleId: 'family-home',
      label: 'Home Environment',
      necessities: [
        'Sanctity of the home — a place of prayer, safety, and basic order',
        'Secure basic housing and living conditions',
        'Protection from harmful influences within the home',
      ],
      needs: [
        'Wholesome atmosphere — curated media, aesthetics, and social circles',
        'Fostering peace and tranquility in the home environment',
        'Home as a space for family bonding and worship',
      ],
      embelishments: [
        'The Open House (hospitality) — a hub for community gathering',
        'Transforming the home into a centre for learning and dawah',
        'Aesthetic excellence that reflects Islamic values and beauty',
      ],
    },
  ],

  wealth: [
    {
      subModuleId: 'money',
      label: 'Money Management',
      necessities: [
        'Halal income — avoiding riba, fraud, and haram sources',
        'Basic budgeting and expense tracking',
        'Meeting financial obligations (nafaqah, debts)',
      ],
      needs: [
        'Financial independence and emergency savings',
        'Investment for growth and retirement',
        'Insurance and risk management within Islamic guidelines',
      ],
      embelishments: [
        'Ethical investing and social entrepreneurship',
        'Wealth-building for generational impact',
        'Advanced Islamic finance instruments (sukuk, mudarabah)',
      ],
    },
    {
      subModuleId: 'work',
      label: 'Projects & Work',
      necessities: [
        'Halal livelihood and honest dealing',
        'Fulfilling contractual obligations with excellence',
        'Time management and avoiding waste (israf) of effort',
      ],
      needs: [
        'Project planning and systematic execution',
        'Team collaboration and clear role definition',
        'Continuous improvement and operational efficiency',
      ],
      embelishments: [
        'Building systems that outlast individual effort',
        'Innovation and creative problem-solving',
        'Mentoring others in professional excellence',
      ],
    },
    {
      subModuleId: 'office',
      label: 'Office & Operations',
      necessities: [
        'Organised communication and documentation',
        'Meeting management and decision tracking',
        'Compliance with legal and regulatory requirements',
      ],
      needs: [
        'Streamlined workflows and internal processes',
        'Knowledge management and institutional memory',
        'Calendar coordination and resource scheduling',
      ],
      embelishments: [
        'Paperless, efficient, and green office operations',
        'Advanced analytics and reporting',
        'Culture of shura (consultation) in all decisions',
      ],
    },
    {
      subModuleId: 'tech',
      label: 'Technology',
      necessities: [
        'Website uptime and basic cybersecurity',
        'Data protection and privacy compliance',
        'Reliable infrastructure for daily operations',
      ],
      needs: [
        'Performance monitoring and optimization',
        'Technology stack management and updates',
        'Digital literacy for the team',
      ],
      embelishments: [
        'Advanced security hardening and threat detection',
        'Automation of repetitive tasks',
        'Innovation through emerging technologies',
      ],
    },
    {
      subModuleId: 'people',
      label: 'People & HR',
      necessities: [
        'Fair wages and timely payment (Islamic obligation)',
        'Clear job descriptions and expectations',
        'Safe working conditions',
      ],
      needs: [
        'Employee development and training programs',
        'Performance tracking with dignity and fairness',
        'Team cohesion and healthy workplace culture',
      ],
      embelishments: [
        'Profit-sharing and equity-based compensation',
        'Leadership development pipelines',
        'Workplace wellness and spiritual support programs',
      ],
    },
    {
      subModuleId: 'wealth-earning',
      label: 'Earning & Provision (Rizq)',
      necessities: [
        'Halal income — livelihood free from impermissible industries',
        'Honest dealing and fulfilling contractual obligations',
        'Meeting financial obligations (nafaqah, debts)',
      ],
      needs: [
        'Value expansion — diversified revenue streams for stability',
        'Cultivating high-income skills and expertise',
        'Financial independence and sustainable earning capacity',
      ],
      embelishments: [
        'Economic empowerment — creating ethical employment opportunities',
        'Mentorship programs that elevate the livelihoods of others',
        'Building halal industries and social enterprises',
      ],
    },
    {
      subModuleId: 'wealth-financial',
      label: 'Financial Literacy & Management',
      necessities: [
        'Financial purity — transition to interest-free accounts',
        'Eliminate all high-interest consumer debt',
        'Basic budgeting, saving, and zakat calculation knowledge',
      ],
      needs: [
        'Future resilience — 6-month emergency reserve',
        'Foundational Shariah-compliant investment portfolio',
        'Financial planning for family, education, and retirement',
      ],
      embelishments: [
        'Wealth optimization — advanced ethical financial planning',
        'Maximize asset growth within Islamic principles',
        'Teaching financial literacy to family and community',
      ],
    },
    {
      subModuleId: 'wealth-ownership',
      label: 'Ownership & Rights',
      necessities: [
        'Protection of heirs — legally sound Will (Wasiyyah)',
        'All major assets have clear, documented titles',
        'Understanding of Islamic inheritance (fara\'id) rules',
      ],
      needs: [
        'Transparent dealings — audit all contracts for clarity',
        'Eliminate ambiguity (Gharar) in business and personal agreements',
        'Fair trade, just pricing, and honest representation',
      ],
      embelishments: [
        'Generational legacy — Family Trust or comprehensive estate plan',
        'Multi-generational stability and ethical governance structures',
        'Estate and inheritance planning per Islamic law',
      ],
    },
    {
      subModuleId: 'wealth-circulation',
      label: 'Circulation & Impact',
      necessities: [
        'Mandatory purification — accurate annual Zakah calculation',
        'Prompt distribution using a structured framework',
        'Zakah al-Fitr and fulfilling pledged commitments (nadhr)',
      ],
      needs: [
        'Community circulation — invest in local SMEs and fair-trade businesses',
        'Regular voluntary Sadaqah integrated into financial planning',
        'Impact measurement to ensure giving reaches those in need',
      ],
      embelishments: [
        'Infinite return (Sadaqah Jariyah) — initiate or fund a Waqf',
        'Permanent, self-sustaining social benefit endowments',
        'Strategic philanthropy aligned with Maqasid priorities',
      ],
    },
  ],

  environment: [
    {
      subModuleId: 'env-resource',
      label: 'Resource Consumption (Water & Energy)',
      necessities: [
        'Anti-extravagance (Israf) — eliminate blatant waste of water and energy',
        'Turn off unused energy sources and minimize shower/wudu water waste',
        'Responsible water and energy use as a Quranic obligation',
      ],
      needs: [
        'Efficiency & conservation — upgrade to energy-efficient appliances',
        'Implement a household water-saving routine',
        'Reducing household and business carbon footprint',
      ],
      embelishments: [
        'Renewable independence — solar panels, EVs, and clean energy',
        'Transition home or transportation to renewable sources',
        'Leading community energy conservation initiatives',
      ],
    },
    {
      subModuleId: 'env-waste',
      label: 'Waste & Pollution Management',
      necessities: [
        'Harm reduction (Darar) — adhere to municipal recycling guidelines',
        'Safely dispose of toxic household chemicals',
        'Not causing corruption (fasad) on the earth',
      ],
      needs: [
        'Conscious consumption — phase out single-use plastics',
        'Establish a home composting system for organic waste',
        'Educating family on waste reduction habits',
      ],
      embelishments: [
        'Zero-waste lifestyle — near-zero waste household',
        'Advocate for municipal or corporate waste accountability',
        'Leading model zero-waste community initiatives',
      ],
    },
    {
      subModuleId: 'env-ecosystem',
      label: 'Ecosystem & Biodiversity',
      necessities: [
        'Respect for creation — avoid cruelty to animals',
        'Abstain from unnecessary destruction of local flora/fauna',
        'Obeying local environmental laws and regulations',
      ],
      needs: [
        'Active stewardship (Khilafah) — plant native species',
        'Support local pollinators and soil health in your community',
        'Active participation in conservation and cleanup efforts',
      ],
      embelishments: [
        'Ecological restoration — fund or participate in land rehabilitation',
        'Carbon sequestration projects and hima (conservation reserves)',
        'Cross-community and interfaith conservation partnerships',
      ],
    },
    {
      subModuleId: 'env-sourcing',
      label: 'Ethical Sourcing & Circularity',
      necessities: [
        'Ethical origins — ensure purchases are free from gross environmental exploitation',
        'Choosing halal and tayyib (wholesome) products',
        'Reducing unnecessary consumption',
      ],
      needs: [
        'Sustainable supply chains — shift to local, fair-trade, or regenerative sources',
        'Informed purchasing decisions considering source, impact, and ethics',
        'Supporting local and sustainable producers',
      ],
      embelishments: [
        'Circular economy innovation — build closed-loop systems where nothing is wasted',
        'Invest in businesses operating on circular models',
        'Creating consumer cooperatives guided by Islamic values',
      ],
    },
  ],

  // ── Standalone — Collective (Moontrance) ──
  collective: [
    {
      subModuleId: 'collective',
      label: 'The Collective — Moontrance',
      necessities: [
        'Land acquired through rigorous search with Spiritual Intentionality scoring',
        'Basic infrastructure: water, road access, shelter, and salah space',
        'Jama\'ah established — regular congregational worship on the land',
        'Halal food access — on-site production or verified supply chain',
        'Legal structure (waqf / trust) protecting land from private sale',
      ],
      needs: [
        'Five faith-designed experience offerings active and uncompromised',
        'Seasonal programming — Planting Faith, Carrying Through, Reckoning, Stillness',
        'Founding community present and participating in governance (shura)',
        'Revenue model sustainable without reliance on external charity',
        'Homeschool immersion and youth tarbiyah programmes operational',
      ],
      embelishments: [
        'Full residency model — families living on land year-round',
        'CSRA (Community-Supported Regenerative Agriculture) live',
        'Waqf endowment generating surplus for broader community benefit',
        'Self-sustaining ecosystem — land produces more than it consumes',
        'Replicable model for other Muslim communities',
      ],
    },
  ],
};
