// Hadith module — Overview cards + Maqasid framework data.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 33:21, 59:7, 4:80.

export const OVERVIEW = [
  {
    id: 'uswa',
    name: 'Uswa',
    arabic: 'الأُسْوَة',
    meaning: 'The Prophetic Model',
    order: 1,
    ayahKey: '33:21',
    ayahArabic:
      'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ وَذَكَرَ اللَّهَ كَثِيرًا',
    ayahTranslation:
      'The Messenger of God is an excellent model for those of you who put your hope in God and the Last Day and remember Him often.',
    description:
      'The Prophet \uFDFA is the living interpretation of the Quran — his words, actions, approvals, and character form the Sunnah. Studying hadith is the primary means by which we access this model and integrate it into worship, character, and every dimension of life.',
    conditions: [
      'Relying on authenticated collections (the Six Books — Kutub al-Sittah)',
      'Distinguishing Sahih (sound), Hasan (good), and Da\u02bfif (weak) hadith',
      'Understanding the context of a hadith (asb\u0101b al-wur\u016Bd)',
      'Learning from a qualified scholar, not isolated texts',
      'Never acting on a hadith that contradicts the Quran or established Sunnah',
    ],
    virtues: [
      'Direct access to prophetic guidance on every dimension of life',
      'Complements and clarifies the Quran — the two revelations are inseparable',
      'Source of Sunnah prayers, voluntary fasts, supplications, and manners',
      'Preserving the legacy of the best of creation across 1,400 years',
    ],
  },
  {
    id: 'dirayah',
    name: 'Dir\u0101yah',
    arabic: 'الدِّرَايَة',
    meaning: 'The Science of Hadith',
    order: 2,
    ayahKey: '59:7',
    ayahArabic:
      'مَّا أَفَاءَ اللَّهُ عَلَىٰ رَسُولِهِ مِنْ أَهْلِ الْقُرَىٰ فَلِلَّهِ وَلِلرَّسُولِ وَلِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَابْنِ السَّبِيلِ كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ ۚ وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا ۚ وَاتَّقُوا اللَّهَ ۖ إِنَّ اللَّهَ شَدِيدُ الْعِقَابِ',
    ayahTranslation:
      '\u2026so accept whatever the Messenger gives you, and abstain from whatever he forbids you. Be mindful of God: God is severe in punishment.',
    description:
      'Dir\u0101yah is the critical science of verifying and understanding hadith — examining chains of narration (isn\u0101d), narrator reliability (rij\u0101l), textual consistency (matn), and legal application. It guards the Sunnah from fabrication and ensures only what the Prophet \uFDFA truly said reaches us.',
    conditions: [
      'Study of Isn\u0101d — tracing the chain of narrators back to the Prophet \uFDFA',
      'Knowledge of Rij\u0101l — narrator biographies, reliability, and memory',
      'Learning to grade hadith by their chain strength',
      'Awareness of abrogated versus standing narrations',
      'Checking matn (text) for consistency with the Quran and sound principles',
    ],
    virtues: [
      'Protects the Ummah from fabricated hadith and religious innovation',
      'Enables sound fiqh derivation directly from prophetic authority',
      'A mark of intellectual excellence and devotion to the Prophet \uFDFA',
      'The hadith sciences are among the most rigorous verification systems ever developed',
    ],
  },
  {
    id: 'ittiba',
    name: 'Ittib\u0101\u02bf',
    arabic: 'الاتِّبَاع',
    meaning: 'Following the Sunnah',
    order: 3,
    ayahKey: '4:80',
    ayahArabic:
      'مَّن يُطِعِ الرَّسُولَ فَقَدْ أَطَاعَ اللَّهَ ۖ وَمَن تَوَلَّىٰ فَمَا أَرْسَلْنَاكَ عَلَيْهِمْ حَفِيظًا',
    ayahTranslation:
      'Whoever obeys the Messenger obeys God. If some pay no heed, We have not sent you to be their keeper.',
    description:
      'Ittib\u0101\u02bf is the practical embodiment of the Sunnah in daily life — prayer, fasting, manners, speech, business dealings, and family life. To follow the Prophet \uFDFA is, by divine declaration, to obey Allah. Knowledge of hadith without practice is incomplete.',
    conditions: [
      'Prioritising Sunnah acts in worship — voluntary prayers, fasts, and dhikr',
      'Modelling prophetic character in dealings, speech, and patience',
      'Making the Sunnah a conscious lens for daily decisions',
      'Learning rulings and their application from qualified scholars',
      'Distinguishing binding Sunnah from preferred practices and cultural habit',
    ],
    virtues: [
      'Obedience to the Messenger \uFDFA is obedience to Allah directly (4:80)',
      'Source of the purest character — the Prophet \uFDFA was described as "the walking Quran"',
      'Transforms knowledge into lived religion',
      '"Leave what puts you in doubt for what does not" — a prophetic principle of certainty (Jami at-Tirmidhi 2518)',
    ],
  },
];

export const MAQASID = {
  label: 'Hadith & Sunnah',
  necessities: [
    'Access to authenticated collections (Bukhari, Muslim, Kutub al-Sittah)',
    'Scholarly verification — never acting on isolated or unverified narrations',
    'Basic understanding of hadith grading (Sahih, Hasan, Da\u02bfif)',
  ],
  needs: [
    'Clarification of Quranic commands through prophetic practice',
    'Legal and ethical guidance on matters the Quran addresses generally',
    'Access to the prophetic model for character, worship, and daily life',
  ],
  embelishments: [
    'Deep study of the hadith sciences (Mustala\u1e25 al-Hadith)',
    'Memorisation of core hadith collections',
    'Teaching and transmitting hadith with its chain of narration',
  ],
};
