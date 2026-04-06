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
      embelishments: [],
    },
  ],

  life: [
    {
      subModuleId: 'life-wellness',
      label: 'Physical Wellness',
      necessities: [
        'Halal nutrition, basic hygiene, safety',
        'Halal food, water, sleep, and basic medical care.',
      ],
      needs: [
        'Preservation of the body and soul',
        'Ability to perform worship and fulfill daily duties.',
        'Good role model and image and representation of Islam',
      ],
      embelishments: [
        'Fitness optimization, organic/Tayyib food',
        'Athletic training, preventative bio-hacking, and choosing Tayyib (wholesome/organic) sources.',
      ],
    },
  ],

  intellect: [
    {
      subModuleId: 'intellect-skills',
      label: 'Skill Development',
      necessities: ['Education and literacy'],
      needs: ['Mental clarity and problem solving'],
      embelishments: ['Mastering a craft or specialized expertise'],
    },
  ],

  family: [
    {
      subModuleId: 'family-relationships',
      label: 'Relationship Building',
      necessities: ['Legal marriage, rights of children'],
      needs: ['Stability of the family unit'],
      embelishments: ['Emotional intelligence & deep bonding'],
    },
  ],

  wealth: [
    {
      subModuleId: 'wealth-finance',
      label: 'Financial Literacy',
      necessities: ['Avoiding interest (Riba) and debt'],
      needs: ['Financial independence and security'],
      embelishments: ['Ethical investing & social entrepreneurship'],
    },
  ],

  environment: [
    {
      subModuleId: 'environment-sustainability',
      label: 'Sustainability',
      necessities: ['Avoiding waste (Israf)'],
      needs: ['Preservation of Earth for future generations'],
      embelishments: ['Beautifying the environment (beautification)'],
    },
  ],
};
