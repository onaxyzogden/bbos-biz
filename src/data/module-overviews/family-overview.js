// Family module — Overview cards + Maqasid framework data.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 30:21, 66:6, 4:1.

export const OVERVIEW = [
  {
    id: 'nikah',
    name: 'Nik\u0101\u1e25',
    arabic: 'النِّكَاح',
    meaning: 'Marriage',
    order: 1,
    ayahKey: '30:21',
    ayahArabic:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    ayahTranslation:
      'Another of His signs is that He created spouses from among yourselves for you to live with in tranquillity: He ordained love and kindness between you. There truly are signs in this for those who reflect.',
    description:
      'Marriage in Islam is a sacred covenant (m\u012Bth\u0101q) and a divine sign. It is built on tranquillity (suk\u016Bn), love (mawaddah), and mercy (ra\u1e25mah) — three dimensions that sustain a home through all stages of life. It is the foundation upon which every other family relationship is built.',
    conditions: [
      'Mutual consent of both spouses — free and uncoerced',
      'Wali (guardian) for the bride as a condition of the marriage contract',
      'Mahr (dowry) — an obligation upon the husband, not a formality',
      'Two witnesses to the marriage contract',
      'Public announcement — secrecy invalidates the marriage',
      'Compatibility (\u2018kafa\u02bfah) in deen and character above all else',
    ],
    virtues: [
      'Completes half of one\u2019s deen — a prophetic declaration (Bayhaqi)',
      'Foundation of a stable, righteous home and a thriving community',
      'Lawful fulfilment of natural needs in a framework of honour',
      'The path to raising Muslim generations who carry the deen forward',
    ],
  },
  {
    id: 'tarbiyah',
    name: 'Tarbiyah',
    arabic: 'التَّرْبِيَة',
    meaning: 'Raising Children',
    order: 2,
    ayahKey: '66:6',
    ayahArabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
    ayahTranslation:
      'Believers, guard yourselves and your families against a Fire fuelled by people and stones, over which stand angels, stern and strong; angels who never disobey God\u2019s commands to them, but do as they are ordered:',
    description:
      'Tarbiyah is the purposeful nurturing of children in faith, character, and knowledge — guarding them from what harms and building them for what benefits. It is the highest trust (am\u0101nah) of parenthood and a direct Quranic obligation placed on every believing household.',
    conditions: [
      'Teaching the fundamentals of faith before teaching the world',
      'Modelling what you preach — children inherit habits, not lectures',
      'Age-appropriate Islamic education from qualified teachers',
      'Instilling love of prayer and Quran from the earliest age',
      'Protecting children from harmful environments and normative corruptions',
    ],
    virtues: [
      'A righteous child is a continuing charity (sadaqah j\u0101riyah) — Sahih Muslim',
      'Parents intercede for their children on the Day of Judgment',
      'The highest form of investment in the next generation of the Ummah',
      'Fulfils the fundamental duty of family stewardship entrusted by Allah',
    ],
  },
  {
    id: 'silat-al-rahim',
    name: 'Silat al-Ra\u1e25im',
    arabic: 'صِلَة الرَّحِم',
    meaning: 'Kinship Ties',
    order: 3,
    ayahKey: '4:1',
    ayahArabic:
      'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
    ayahTranslation:
      'People, be mindful of your Lord, who created you from a single soul, and from it created its mate, and from the pair of them spread countless men and women far and wide; be mindful of God, in whose name you make requests of one another. Beware of severing the ties of kinship: God is always watching over you.',
    description:
      'Silat al-Ra\u1e25im is the maintenance of kinship ties — with parents, siblings, extended family, and distant relatives. It is enjoined by Allah alongside taqwa at the very opening of Surah al-Nisa\u02bfand. Severing it is among the grave sins; maintaining it even when relatives cut you off is among the highest virtues.',
    conditions: [
      'Regular contact — visits, calls, or messages that affirm the relationship',
      'Giving gifts to relatives and sharing in their celebrations',
      'Providing genuine help to relatives who are in need',
      'Forgiving grievances and avoiding prolonged estrangement',
      'Maintaining ties even with those who cut you off — this is the highest silah',
    ],
    virtues: [
      'Extends lifespan and expands rizq — a prophetic promise (Bukhari & Muslim)',
      'Among the deeds most beloved to Allah',
      'A clear outward sign of \u012Bm\u0101n and taqwa',
      'Strengthens the community outward from the family unit',
    ],
  },
];

export const MAQASID = {
  label: 'Family',
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
};
