// Neighbors module — Overview cards + Maqasid framework data.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayah 4:36.
// Hadith reference for card 2 (Husn al-Jiwar) cited from Sunan al-Tirmidhi 1944.

export const OVERVIEW = [
  {
    id: 'haqq-al-jar',
    name: 'Haqq al-J\u0101r',
    arabic: 'حَقُّ الجَار',
    meaning: 'Rights of Neighbors',
    order: 1,
    ayahKey: '4:36',
    ayahArabic:
      'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا',
    ayahTranslation:
      'Worship God; join nothing with Him. Be good to your parents, to relatives, to orphans, to the needy, to neighbours near and far, to travellers in need, and to your slaves. God does not like arrogant, boastful people,',
    description:
      'The rights of neighbors are so fundamental that Allah placed them immediately after worshipping Him and honouring parents. Both the close neighbor (adjoining household) and the distant neighbor (building or street) carry specific rights of safety, respect, and proactive care that are not optional.',
    conditions: [
      'Not harming neighbors with noise, waste, bad smells, or obstruction',
      'Protecting their property, privacy, and reputation',
      'Greeting them and maintaining consistently respectful relations',
      'Not withholding help when they genuinely need it',
      'Special care for elderly, sick, or struggling neighbors',
    ],
    virtues: [
      'Jibril (AS) urged it so persistently, the Prophet \uFDFA thought the neighbor would become an heir (Sahih al-Bukhari 6014, Sahih Muslim 2624)',
      '"He whose neighbor is not safe from his harm is not a true believer" — a prophetic standard (Sahih al-Bukhari 6016)',
      'A source of community safety, mutual trust, and peace',
      'Brings barakah to the entire neighborhood through righteous presence',
    ],
  },
  {
    id: 'husn-al-jiwar',
    name: '\u1e24usn al-Jiw\u0101r',
    arabic: 'حُسْن الجِوَار',
    meaning: 'Excellence in Neighbourliness',
    order: 2,
    hadithText:
      'The best of companions with Allah is the one who is best to his companion, and the best of neighbours with Allah is the one who is best to his neighbour.',
    hadithRef: 'Sunan al-Tirmidhi 1944 (Graded Sahih)',
    description:
      'Husn al-Jiwar goes far beyond avoiding harm — it is the proactive excellence of being the neighbor everyone hopes for: generous, dependable, protective of dignity, and genuinely kind. It is among the clearest outward expressions of Islamic character and one of the most powerful forms of lived da\u02bfwah.',
    conditions: [
      'Sharing food and gifts with neighbors, especially during festivities',
      'Visiting in illness, sharing in grief, and celebrating with them in joy',
      'Speaking well of them in their absence — never exposing faults',
      'Patient forbearance with their shortcomings and inconveniences',
      'Being the source of goodness and security for those around you',
    ],
    virtues: [
      'The best neighbor in Allah\u2019s sight — a prophetic ranking (Tirmidhi 1944)',
      'A living, observable example of Islamic character to non-Muslim neighbors',
      'Transforms a street or building into a genuine community of trust',
      'Opens hearts to Islam through consistent, principled, generous conduct',
    ],
  },
];

export const MAQASID = {
  label: 'Neighbors',
  necessities: [
    'Not harming neighbors — noise, waste, obstruction, or hostility',
    'Returning greetings and maintaining respectful minimum relations',
    'Not transgressing on their property, privacy, or dignity',
  ],
  needs: [
    'Community safety and mutual recognition of rights',
    'A network of local support for those who need it most',
    'A healthy, trusting social environment for raising families',
  ],
  embelishments: [
    'Proactive generosity — food, gifts, visits, and shared celebration',
    'Becoming a source of security and goodness for the whole street',
    'Making neighbors one of the first forms of da\u02bfwah through lived character',
  ],
};
