// Pillar dashboard content: Necessities / Needs / Embelishments (Daruriyyat / Hajiyyat / Tahsiniyyat)
// Each entry maps a subModuleId to its three-column content rows.
// Rows align index-by-index: necessities[0] pairs with needs[0] and embelishments[0].
// If a column has fewer items than others, extra rows render that cell as empty.

export const PILLAR_CONTENT = {
  faith: [
    {
      subModuleId: 'five-pillars',
      necessities: [
        'Shahada — Sincere belief and oral declaration of the faith.',
        'Salat — Ritual purity (Wudu), facing the Kaaba, and specific daily timings.',
        'Zakat — Ownership of wealth above a minimum threshold (Nisab) for one year.',
        'Sawm — Abstaining from food/drink/bad habits from dawn to sunset during Ramadan.',
        'Hajj — Physical health and financial means to travel to Mecca.',
      ],
      needs: [
        'Establishes identity, purpose, and monotheism.',
        'Spiritual discipline, mindfulness, and direct connection to God.',
        'Social justice, purification of wealth, and poverty alleviation.',
        'Self-restraint, spiritual growth, and empathy for the hungry.',
        'Universal brotherhood, unity, and a spiritual "reset" or rebirth.',
      ],
      embelishments: [
        'Voluntary prayers (Sunnah/Nawafil)',
      ],
    },
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
      subModuleId: 'physical-wellness',
      label: 'Physical Wellness',
      necessities: [
        'Halal nutrition, basic hygiene, and safety',
        'Halal food, clean water, sleep, and basic medical care',
        'Protection from physical harm and environmental dangers',
      ],
      needs: [
        'Preservation of the body to fulfil worship and duties',
        'Regular exercise and preventative health measures',
        'Good representation of Islam through physical vitality',
      ],
      embelishments: [
        'Fitness optimization and athletic training',
        'Organic/Tayyib food sourcing and nutrition science',
        'Preventative bio-hacking and longevity practices',
      ],
    },
    {
      subModuleId: 'mental-health',
      label: 'Mental Health',
      necessities: [
        'Stress management and basic coping strategies',
        'Access to professional counseling when needed',
        'Protection from substance abuse and harmful habits',
      ],
      needs: [
        'Emotional well-being, resilience, and self-awareness',
        'Supportive relationships and community belonging',
        'Integration of faith-based comfort with clinical support',
      ],
      embelishments: [
        'Mindfulness practices rooted in Islamic dhikr and tafakkur',
        'Advanced emotional intelligence training',
        'Holistic wellness that integrates body, mind, and ruh (spirit)',
      ],
    },
    {
      subModuleId: 'spiritual-health',
      label: 'Spiritual Health',
      necessities: [
        'Regular salah and minimum dhikr',
        'Awareness of one\'s spiritual state (haal)',
        'Avoiding major spiritual diseases (kibr, hasad, riya\')',
      ],
      needs: [
        'Consistent connection between daily actions and divine purpose',
        'Guidance for spiritual growth from qualified sources',
        'Balance between dunya responsibilities and akhirah preparation',
      ],
      embelishments: [
        'Qiyam al-layl and voluntary worship as spiritual fuel',
        'Advanced tazkiyah (purification of the nafs)',
        'Living with constant awareness of Allah (muraqabah)',
      ],
    },
    {
      subModuleId: 'family-health',
      label: 'Family Health',
      necessities: [
        'Safe and stable home environment',
        'Basic healthcare for all family members',
        'Prevention of domestic harm and abuse',
      ],
      needs: [
        'Healthy communication patterns within the family',
        'Shared family wellness routines and habits',
        'Access to family counseling and support services',
      ],
      embelishments: [
        'Family fitness activities and shared healthy meals',
        'Proactive health screening and preventative care',
        'Intergenerational wellness traditions',
      ],
    },
  ],

  intellect: [
    {
      subModuleId: 'learning-resources',
      label: 'Learning Resources',
      necessities: [
        'Basic education and literacy',
        'Access to books, courses, and reliable information',
        'Ability to distinguish truth from falsehood',
      ],
      needs: [
        'Structured continuous learning beyond formal education',
        'Access to diverse subjects — Islamic and worldly sciences',
        'A culture of lifelong curiosity and intellectual humility',
      ],
      embelishments: [
        'Building a personal library and curated learning path',
        'Advanced study in specialized fields',
        'Contributing to scholarship and knowledge creation',
      ],
    },
    {
      subModuleId: 'skill-development',
      label: 'Skill Development',
      necessities: [
        'Employable skills for halal livelihood',
        'Digital literacy and basic technology competence',
        'Communication and interpersonal skills',
      ],
      needs: [
        'Mastering a craft or professional discipline',
        'Project management and organizational skills',
        'Adaptability to changing market and social needs',
      ],
      embelishments: [
        'Mentoring others and transferring expertise',
        'Cross-disciplinary skill integration',
        'Industry-recognized certifications and advanced training',
      ],
    },
    {
      subModuleId: 'critical-thinking',
      label: 'Critical Thinking',
      necessities: [
        'Ability to evaluate claims with evidence and reason',
        'Resistance to misinformation and logical fallacies',
        'Distinguishing between reliable and unreliable sources',
      ],
      needs: [
        'Analytical frameworks for decision-making',
        'Exposure to diverse perspectives and structured debate',
        'Application of Islamic principles of verification (tathabbut)',
      ],
      embelishments: [
        'Advanced logic, rhetoric, and usul al-fiqh training',
        'Research methodology and academic writing',
        'Teaching critical thinking to others',
      ],
    },
    {
      subModuleId: 'knowledge-sharing',
      label: 'Knowledge Sharing',
      necessities: [
        'Sharing what is known — "convey from me even one ayah"',
        'Teaching children and family members',
        'Warning against ignorance and misinformation',
      ],
      needs: [
        'Platforms and circles for peer learning (halaqat)',
        'Documenting and preserving institutional knowledge',
        'Cross-generational knowledge transfer',
      ],
      embelishments: [
        'Building knowledge-sharing institutions (schools, endowments)',
        'Publishing, podcasting, or digital content creation',
        'Mentorship networks that scale individual expertise',
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
      subModuleId: 'parenting-support',
      label: 'Parenting Support',
      necessities: [
        'Teaching children the fundamentals of faith and worship',
        'Providing a safe, stable, and loving environment',
        'Age-appropriate Islamic education from qualified teachers',
      ],
      needs: [
        'Consistent modelling of Islamic character at home',
        'Addressing children\'s emotional, social, and intellectual development',
        'Community of parents for mutual support and advice',
      ],
      embelishments: [
        'Specialised Islamic parenting courses and workshops',
        'Mentorship between experienced and new parents',
        'Family enrichment programs and parent-child retreats',
      ],
    },
    {
      subModuleId: 'family-planning',
      label: 'Family Planning',
      necessities: [
        'Knowledge of Islamic rulings on marriage, divorce, and family structure',
        'Financial readiness for family responsibilities',
        'Clear understanding of spousal rights and obligations',
      ],
      needs: [
        'Goal-setting for family growth and legacy',
        'Balanced approach to worldly planning and tawakkul',
        'Access to counseling for family transitions',
      ],
      embelishments: [
        'Comprehensive family vision and values documentation',
        'Estate and inheritance planning per Islamic law',
        'Multi-generational family governance structures',
      ],
    },
    {
      subModuleId: 'intergenerational-support',
      label: 'Intergenerational Support',
      necessities: [
        'Honouring parents (birr al-walidayn) and caring for elders',
        'Ensuring children receive righteous upbringing',
        'Maintaining kinship ties across generations',
      ],
      needs: [
        'Structured mentorship between elders and youth',
        'Shared family activities that bridge generations',
        'Support systems for elderly family members',
      ],
      embelishments: [
        'Family oral history and wisdom preservation',
        'Grandparent-grandchild learning programs',
        'Cross-generational community service projects',
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
      subModuleId: 'financial-literacy',
      label: 'Financial Literacy',
      necessities: [
        'Understanding of riba (interest) and how to avoid it',
        'Basic budgeting, saving, and debt management',
        'Knowledge of zakat obligations and calculation',
      ],
      needs: [
        'Financial planning for family, education, and retirement',
        'Understanding halal investment instruments',
        'Insurance alternatives compliant with Islamic principles',
      ],
      embelishments: [
        'Advanced Islamic finance education',
        'Teaching financial literacy to family and community',
        'Building community-level financial cooperatives',
      ],
    },
    {
      subModuleId: 'ethical-business',
      label: 'Ethical Business',
      necessities: [
        'Honest dealing — no deception, hoarding, or exploitation',
        'Fair trade and just pricing',
        'Halal products and services only',
      ],
      needs: [
        'Sustainable business practices that minimise harm',
        'Transparent supply chains and ethical sourcing',
        'Corporate social responsibility rooted in Islamic values',
      ],
      embelishments: [
        'B-Corp or social enterprise models guided by Maqasid',
        'Pioneering halal industries and Islamic economics',
        'Mentoring other Muslim entrepreneurs in ethical standards',
      ],
    },
    {
      subModuleId: 'charity-zakat',
      label: 'Charity & Zakat',
      necessities: [
        'Annual zakat calculation and distribution to eligible recipients',
        'Zakat al-Fitr before Eid al-Fitr',
        'Fulfilling pledged charitable commitments (nadhr)',
      ],
      needs: [
        'Regular voluntary sadaqah integrated into financial planning',
        'Supporting effective, transparent charitable organizations',
        'Impact measurement to ensure sadaqah reaches those in need',
      ],
      embelishments: [
        'Establishing a family waqf (endowment) for perpetual benefit',
        'Strategic philanthropy aligned with Maqasid priorities',
        'Volunteering time and expertise alongside financial giving',
      ],
    },
    {
      subModuleId: 'resource-management',
      label: 'Resource Management',
      necessities: [
        'Avoiding waste (israf) in all forms — time, money, materials',
        'Responsible use of shared resources',
        'Maintaining and protecting assets (amanah)',
      ],
      needs: [
        'Efficient allocation of resources across priorities',
        'Tracking consumption and identifying waste reduction opportunities',
        'Sustainable procurement and supply chain practices',
      ],
      embelishments: [
        'Circular economy practices and zero-waste targets',
        'Advanced resource analytics and optimization tools',
        'Sharing surplus resources with community (ta\'awun)',
      ],
    },
  ],

  environment: [
    {
      subModuleId: 'sustainability',
      label: 'Sustainability',
      necessities: [
        'Avoiding waste (israf) — a Quranic prohibition',
        'Responsible water and energy use',
        'Not causing corruption (fasad) on the earth',
      ],
      needs: [
        'Sustainable consumption and production patterns',
        'Reducing household and business carbon footprint',
        'Supporting renewable and clean energy initiatives',
      ],
      embelishments: [
        'Zero-waste lifestyle and circular economy participation',
        'Leading community sustainability initiatives',
        'Environmental education rooted in Islamic stewardship (khilafah)',
      ],
    },
    {
      subModuleId: 'conservation',
      label: 'Conservation',
      necessities: [
        'Protecting water sources, air quality, and soil',
        'Not harming animals or destroying vegetation needlessly',
        'Obeying local environmental laws and regulations',
      ],
      needs: [
        'Active participation in conservation and cleanup efforts',
        'Supporting wildlife and habitat protection',
        'Land stewardship and responsible agriculture',
      ],
      embelishments: [
        'Establishing hima (Islamic conservation reserves)',
        'Leading environmental activism rooted in Islamic principles',
        'Cross-community and interfaith conservation partnerships',
      ],
    },
    {
      subModuleId: 'ethical-consumption',
      label: 'Ethical Consumption',
      necessities: [
        'Choosing halal and tayyib (wholesome) products',
        'Avoiding products of exploitation and injustice',
        'Reducing unnecessary consumption',
      ],
      needs: [
        'Informed purchasing decisions — source, impact, and ethics',
        'Supporting local, fair-trade, and sustainable producers',
        'Educating family on conscious consumption habits',
      ],
      embelishments: [
        'Building halal + ethical supply chains from source to shelf',
        'Advocating for industry-wide ethical standards',
        'Creating consumer cooperatives guided by Islamic values',
      ],
    },
    {
      subModuleId: 'community-projects',
      label: 'Community Projects',
      necessities: [
        'Participating in local environmental cleanup and maintenance',
        'Supporting masjid and community green initiatives',
        'Teaching children environmental stewardship',
      ],
      needs: [
        'Organising community gardens, tree planting, and green spaces',
        'Collaborating with local government on environmental goals',
        'Building awareness of environmental Sunnah (e.g., planting trees)',
      ],
      embelishments: [
        'Establishing community endowments (waqf) for environmental projects',
        'Leading model eco-villages or green masjid projects',
        'Publishing and sharing environmental best practices',
      ],
    },
  ],
};
