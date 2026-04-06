// Quran module — Overview cards + Maqasid framework data.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 73:4, 4:82, 54:17, 29:45.

export const OVERVIEW = [
  {
    id: 'tilawah',
    name: 'Tilawah',
    arabic: 'التِّلَاوَة',
    meaning: 'Recitation',
    order: 1,
    ayahKey: '73:4',
    ayahArabic:
      'أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
    ayahTranslation:
      'or a little more; recite the Quran slowly and distinctly:',
    description:
      'Tilawah is the sacred act of reciting the Quran with correct pronunciation and measured rhythm (tartil). It is more than reading — it is an act of worship that brings the reciter into the presence of divine speech, each letter carrying its own reward.',
    conditions: [
      'Ritual purity (Wudu) before touching the Mus-haf',
      'Correct pronunciation from the articulation points (Makharij al-Huruf)',
      'Learning Tajwid rules from a qualified teacher',
      'Reciting with presence of heart (Khushu\u02bf)',
      'Beginning with Ta\u02bfawwudh (\u0623\u0639\u0648\u0630 \u0628\u0627\u0644\u0644\u0647) and Basmalah',
    ],
    virtues: [
      'Each letter earns ten rewards — the Prophet \uFDFA said: "Alif, Lam, Mim is three letters, each a reward" (Tirmidhi)',
      'Recitation elevates the reciter\u2019s rank in this life and the next',
      'The Quran will intercede for its companions on the Day of Judgment',
      'Beautifies the voice and the heart simultaneously',
    ],
  },
  {
    id: 'tadabbur',
    name: 'Tadabbur',
    arabic: 'التَّدَبُّر',
    meaning: 'Contemplation',
    order: 2,
    ayahKey: '4:82',
    ayahArabic:
      'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ ۚ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا',
    ayahTranslation:
      'Will they not think about this Quran? If it had been from anyone other than God, they would have found much inconsistency in it.',
    description:
      'Tadabbur is deep, reflective engagement with the Quran — understanding its meanings, sitting with its themes, and allowing its wisdom to transform the heart and conduct. Allah commands it directly; recitation without reflection is incomplete.',
    conditions: [
      'Arabic literacy or study with a reliable translation',
      'Study of classical tafsir alongside the text',
      'Slow, deliberate reading — not rushing through pages',
      'Returning repeatedly to the same passages over time',
      'Connecting verses to lived situations and decisions',
    ],
    virtues: [
      'Guards against misinterpretation and misapplication',
      'Deepens \u012Bm\u0101n through witnessing the Quran\u2019s inimitability (I\u02bfjaz)',
      'Unlocks the full guidance the Quran was sent to provide',
      'Foundation of Islamic wisdom, scholarship, and sound judgment',
    ],
  },
  {
    id: 'hifz',
    name: 'Hif\u1e93',
    arabic: 'الحِفْظ',
    meaning: 'Memorisation',
    order: 3,
    ayahKey: '54:17',
    ayahArabic:
      'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
    ayahTranslation:
      'We have made it easy to learn lessons from the Quran: will anyone take heed?',
    description:
      'Allah has made the Quran accessible for memorisation — a divine facilitation unique in human history. The Huffaz preserve the word of Allah in their hearts, embodying the living Quran across generations and transmitting it through an unbroken chain.',
    conditions: [
      'Consistent daily revision (mur\u0101ja\u02bfah) — memorisation without revision fades',
      'Learning from a qualified teacher with an authorised chain (sanad)',
      'Strong intention (niyyah) for Allah\u2019s pleasure, not status',
      'Patient, gradual progression — never rushing the foundation',
      'Maintaining memorisation throughout one\u2019s lifetime',
    ],
    virtues: [
      'The hafidh will intercede for 10 family members on the Day of Judgment (Abu Dawud)',
      'Parents of a hafidh are crowned with a light brighter than the sun (Tirmidhi)',
      'Elevates the bearer to the highest ranks in Paradise',
      'Preserves the Quran through human memory — a living chain since the Prophet \uFDFA',
    ],
  },
  {
    id: 'amal',
    name: 'Amal',
    arabic: 'العَمَل',
    meaning: 'Acting upon it',
    order: 4,
    ayahKey: '29:45',
    ayahArabic:
      'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ ۗ وَاللَّهُ يَعْلَمُ مَا تَصْنَعُونَ',
    ayahTranslation:
      '[Prophet], recite what has been revealed to you of the Scripture; keep up the prayer: prayer restrains outrageous and unacceptable behaviour. Remembering God is greater: God knows everything you are doing.',
    description:
      'The Quran is not only to be recited and memorised — it is a guide for action. Acting upon it means following its commands, avoiding its prohibitions, and allowing its worldview to govern every decision, relationship, and endeavour.',
    conditions: [
      'Translating Quranic knowledge into daily practice — not knowledge alone',
      'Acting on what is known before seeking more knowledge',
      'Following the commands even when they are difficult or costly',
      'Allowing Quranic principles to govern speech, wealth, and relationships',
      'Seeking knowledge of rulings from qualified scholars',
    ],
    virtues: [
      'The Quran as a lived reality is the highest form of engagement with it',
      'Transforms character towards prophetic manners (akhl\u0101q)',
      'Brings barakah into wealth, family, and time',
      'The true meaning of being among the People of the Quran (\u0100hl al-Qur\u02be\u0101n)',
    ],
  },
];

export const MAQASID = {
  label: 'Quran',
  necessities: [
    'Arabic literacy or access to a reliable translation',
    'A Mus-haf or verified digital edition',
    'Learning Tajwid to fulfil the obligation of correct recitation',
    'Basic tafsir study to understand what is recited',
  ],
  needs: [
    'Direct divine communication — guidance, comfort, and clarity',
    'Foundation for all Islamic law, ethics, and worldview',
    'Daily spiritual nourishment and dhikr',
    'A living connection to the Prophet \uFDFA through his recitation',
  ],
  embelishments: [
    'Full memorisation (Hifz) with an authorised chain (sanad)',
    'Beautiful recitation with mastery of Tajwid',
    'Teaching and transmitting the Quran to the next generation',
    'Advanced tafsir and Quranic sciences (\u02bful\u016Bm al-Qur\u02be\u0101n)',
  ],
};
