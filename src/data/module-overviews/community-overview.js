// Community module — Overview cards + Maqasid framework data.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 3:110, 49:10, 5:2.

export const OVERVIEW = [
  {
    id: 'ummah',
    name: 'Ummah',
    arabic: 'الأُمَّة',
    meaning: 'The Muslim Community',
    order: 1,
    ayahKey: '3:110',
    ayahArabic:
      'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ وَتُؤْمِنُونَ بِاللَّهِ ۗ وَلَوْ آمَنَ أَهْلُ الْكِتَابِ لَكَانَ خَيْرًا لَّهُم ۚ مِّنْهُمُ الْمُؤْمِنُونَ وَأَكْثَرُهُمُ الْفَاسِقُونَ',
    ayahTranslation:
      '[Believers], you are the best community singled out for people: you order what is right, forbid what is wrong, and believe in God. If the People of the Book had also believed, it would have been better for them.',
    description:
      'The Ummah is distinguished not by ethnicity or geography but by its active commitment to good and its principled restraint of evil — for the benefit of all humanity. This collective obligation (far\u1e0d kif\u0101yah) requires organised, visible, and courageous community presence in every era.',
    conditions: [
      'Active participation in congregational worship (Jama\u02bfah) as its foundation',
      'Commanding good (Amr bil-Ma\u02bfr\u016Bf) with wisdom, timing, and kindness',
      'Forbidding wrong (Nahy \u02bfan al-Munkar) through appropriate, proportionate means',
      'Unity around the fundamentals of deen — not manufactured uniformity',
      'Visible presence in society as a witness (\u015Bah\u012Bd) community for humanity',
    ],
    virtues: [
      'The highest communal praise in the Quran — \u201Cthe best community singled out for people\u201D',
      'A divine mandate to serve and benefit all of humanity, not just Muslims',
      'Source of collective barakah when its members fulfil their duty',
      'Ensures Islamic institutions, education, and care remain alive across generations',
    ],
  },
  {
    id: 'ukhuwwah',
    name: 'Ukhuwwah',
    arabic: 'الأُخُوَّة',
    meaning: 'Brotherhood & Sisterhood',
    order: 2,
    ayahKey: '49:10',
    ayahArabic:
      'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ',
    ayahTranslation:
      'The believers are brothers, so make peace between your two brothers and be mindful of God, so that you may be given mercy.',
    description:
      'The bond of \u012Bm\u0101n creates a brotherhood and sisterhood that transcends blood, tribe, and nationality. This bond carries mutual rights, active peacemaking between Muslims, and the prophetic duty to love for your brother what you love for yourself — a standard that reshapes every community interaction.',
    conditions: [
      'Resolving disputes promptly — not allowing estrangement beyond three days (Hadith)',
      'Visiting the sick, attending funerals, accepting invitations, and returning greetings',
      'Making du\u02bfaa for fellow Muslims in their absence',
      'Covering faults rather than exposing them publicly',
      'Neither envying, despising, nor turning your back on a fellow believer',
    ],
    virtues: [
      'Allah declares the believers are brothers — the highest social bond in Islam',
      'Peacemaking between believers is elevated above voluntary worship (Hadith — Abu Dawud)',
      'Active brotherhood earns the shade of Allah on the Day of Judgment',
      'The strength and unity of the Ummah is proportional to the quality of this bond',
    ],
  },
  {
    id: 'taawun',
    name: 'Ta\u02bfaw\u016Bn',
    arabic: 'التَّعَاوُن',
    meaning: 'Mutual Cooperation',
    order: 3,
    ayahKey: '5:2',
    ayahArabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحِلُّوا شَعَائِرَ اللَّهِ وَلَا الشَّهْرَ الْحَرَامَ وَلَا الْهَدْيَ وَلَا الْقَلَائِدَ وَلَا آمِّينَ الْبَيْتَ الْحَرَامَ يَبْتَغُونَ فَضْلًا مِّن رَّبِّهِمْ وَرِضْوَانًا ۚ وَإِذَا حَلَلْتُمْ فَاصْطَادُوا ۚ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ أَن صَدُّوكُمْ عَنِ الْمَسْجِدِ الْحَرَامِ أَن تَعْتَدُوا ۘ وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ ۚ وَاتَّقُوا اللَّهَ ۖ إِنَّ اللَّهَ شَدِيدُ الْعِقَابِ',
    ayahTranslation:
      '\u2026help one another to do what is right and good; do not help one another towards sin and hostility. Be mindful of God, for His punishment is severe.',
    description:
      'Ta\u02bfaw\u016Bn is the Islamic framework of structured collective cooperation — pooling resources, skills, and effort toward what is righteous, while actively refusing to enable what harms. It is the social and economic engine of a thriving, self-sufficient Muslim community.',
    conditions: [
      'Building cooperative institutions: schools, masjids, funds, and ethical businesses',
      'Defining \u201Cbirr\u201D (righteousness) and taqwa as the criteria — not profit or convenience',
      'Actively refusing cooperation in harmful, unethical, or haram activities',
      'Sharing skills and resources within the community before seeking externally',
      'Seeking halal income and ethical business partnerships as a community standard',
    ],
    virtues: [
      'Structured cooperation multiplies the capacity of every individual',
      'Foundation of Islamic economic institutions: Zakat, Waqf, and mutual aid',
      'Ensures no member of the community is abandoned in need',
      'A living proof of Islam\u2019s complete social, economic, and ethical system',
    ],
  },
];

export const MAQASID = {
  label: 'Community',
  necessities: [
    'The Jama\u02bfah — congregational prayer as the anchor of community life',
    'Fulfilling communal obligations (far\u1e0d kif\u0101yah) in education, charity, and leadership',
    'Preventing internal harm — backbiting, envy, and communal division',
  ],
  needs: [
    'A thriving Islamic institutional infrastructure (schools, masajid, funds)',
    'Collective da\u02bfwah and a visible, principled public presence',
    'Mutual support networks that ensure no community member is abandoned',
  ],
  embelishments: [
    'Islamic social entrepreneurship and community endowments (Waqf)',
    'Interfaith and civic engagement as a witness (\u015Bah\u012Bd) community',
    'Building systems that outlast individuals — generational institution-building',
  ],
};
