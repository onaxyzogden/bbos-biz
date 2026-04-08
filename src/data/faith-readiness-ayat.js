/**
 * MAQASID OS — Faith Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Mutakabbir (The Supremely Great) · Al-Wakīl (The Trustee)
 * Row distribution: 4 rows Al-Mutakabbir (M1–M4) · 2 rows Al-Wakīl (W1–W2)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: M1 M2 M3 M4 W1 W2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   M1: Aware He needs nothing from me vs conscious how practice reflects on me
 *   M2: Worship between me and Allah vs seeking witness or validation from others
 *   M3: Holding spiritual state honestly vs inflating, performing, or claiming entitlement
 *   M4: Can receive correction without self-threat vs holding positions beyond the evidence
 *   W1: Acting from niyyah, releasing outcome vs holding result in my own hands
 *   W2: Actually turning toward Allah vs fulfilling form without presence
 *
 * Usage: READINESS_AYAT_FAITH[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 40 unique ayat across 63 non-null entries (max 2-3 keys per shared ayah)
 * - Shared ayat (2-3 uses): 35:15(3), 47:38(2), 4:142(2), 82:6(2), 29:6(2),
 *   49:17(2), 4:49(2), 23:2(2), 32:15(2), 7:206(2), 13:28(2), 3:173(2),
 *   65:3(2), 11:123(2), 31:22(2), 39:53(2), 57:16(2), 3:8(2), 39:3(2),
 *   17:37(2), 21:49(2), 2:45(2)
 * - Single-use ayat: 92:20, 107:6, 18:110, 40:14, 57:23, 4:143, 2:44, 50:33,
 *   26:89, 37:84, 7:205, 73:8, 6:162, 39:14, 98:5, 59:19, 39:7, 3:160, 8:2,
 *   16:96
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Hadith-supplemented framings: none
 * - Combinations flagged for scholarly review: none
 *
 * Grounded with quran.ai: fetch_quran(40 ayat, ar-simple-clean),
 *   fetch_translation(40 ayat, en-sahih-international),
 *   search_quran(4 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_44 = {
  arabic: 'أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ وَتَنسَوْنَ أَنفُسَكُمْ وَأَنتُمْ تَتْلُونَ الْكِتَابَ ۚ أَفَلَا تَعْقِلُونَ',
  transliteration: "Ata'murunan-nasa bil-birri wa tansawna anfusakum wa antum tatlunal-kitab. Afala ta'qilun",
  translation: 'Do you order righteousness of the people and forget yourselves while you recite the Scripture? Then will you not reason?',
  source: 'Al-Baqarah 2:44',
  edition: 'en-sahih-international',
};

const _2_45 = {
  arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
  transliteration: "Wasta'inu bis-sabri was-salah. Wa innaha lakabira-tun illa 'alal-khashi'in",
  translation: 'And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive [to Allah]',
  source: 'Al-Baqarah 2:45',
  edition: 'en-sahih-international',
};

const _3_8 = {
  arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
  transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah. Innaka antal-wahhab",
  translation: '[Who say], "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower."',
  source: "Ali 'Imran 3:8",
  edition: 'en-sahih-international',
};

const _3_160 = {
  arabic: 'إِن يَنصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ ۖ وَإِن يَخْذُلْكُمْ فَمَن ذَا الَّذِي يَنصُرُكُم مِّن بَعْدِهِ ۗ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ',
  transliteration: "In yansurkumullahu fala ghaliba lakum. Wa in yakhdhulkum faman dhalladhi yansurukum min ba'dih. Wa 'alallahi falyatawakkalil-mu'minun",
  translation: 'If Allah should aid you, no one can overcome you; but if He should forsake you, who is there that can aid you after Him? And upon Allah let the believers rely.',
  source: "Ali 'Imran 3:160",
  edition: 'en-sahih-international',
};

const _3_173 = {
  arabic: 'الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
  transliteration: "Alladhina qala lahumun-nasu innan-nasa qad jama'u lakum fakhshawhum fazadahum imanan wa qalu hasbunallahu wa ni'mal-wakil",
  translation: 'Those to whom people [i.e., hypocrites] said, "Indeed, the people have gathered against you, so fear them." But it [merely] increased them in faith, and they said, "Sufficient for us is Allah, and [He is] the best Disposer of affairs."',
  source: "Ali 'Imran 3:173",
  edition: 'en-sahih-international',
};

const _4_49 = {
  arabic: 'أَلَمْ تَرَ إِلَى الَّذِينَ يُزَكُّونَ أَنفُسَهُم ۚ بَلِ اللَّهُ يُزَكِّي مَن يَشَاءُ وَلَا يُظْلَمُونَ فَتِيلًا',
  transliteration: "Alam tara ilal-ladhina yuzakkuna anfusahum. Balillahu yuzakki man yasha'u wa la yuzlamuna fatila",
  translation: 'Have you not seen those who claim themselves to be pure? Rather, Allah purifies whom He wills, and injustice is not done to them, [even] as much as a thread [inside a date seed].',
  source: 'An-Nisa 4:49',
  edition: 'en-sahih-international',
};

const _4_142 = {
  arabic: 'إِنَّ الْمُنَافِقِينَ يُخَادِعُونَ اللَّهَ وَهُوَ خَادِعُهُمْ وَإِذَا قَامُوا إِلَى الصَّلَاةِ قَامُوا كُسَالَىٰ يُرَاءُونَ النَّاسَ وَلَا يَذْكُرُونَ اللَّهَ إِلَّا قَلِيلًا',
  transliteration: "Innal-munafiqina yukhadhi'unallaha wa huwa khadi'uhum. Wa idha qamu ilas-salati qamu kusala yura'unan-nasa wa la yadhkurunallaha illa qalila",
  translation: 'Indeed, the hypocrites [think to] deceive Allah, but He is deceiving them. And when they stand for prayer, they stand lazily, showing [themselves to] the people and not remembering Allah except a little,',
  source: 'An-Nisa 4:142',
  edition: 'en-sahih-international',
};

const _4_143 = {
  arabic: 'مُّذَبْذَبِينَ بَيْنَ ذَٰلِكَ لَا إِلَىٰ هَٰؤُلَاءِ وَلَا إِلَىٰ هَٰؤُلَاءِ ۚ وَمَن يُضْلِلِ اللَّهُ فَلَن تَجِدَ لَهُ سَبِيلًا',
  transliteration: "Mudhabdhabina bayna dhalika la ila ha'ula'i wa la ila ha'ula'. Wa man yudlilillahu falan tajida lahu sabila",
  translation: 'Wavering between them, [belonging] neither to these [i.e., the believers] nor to those [i.e., the disbelievers]. And whoever Allah sends astray - never will you find for him a way.',
  source: 'An-Nisa 4:143',
  edition: 'en-sahih-international',
};

const _6_162 = {
  arabic: 'قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ',
  transliteration: "Qul inna salati wa nusuki wa mahyaya wa mamati lillahi rabbil-'alamin",
  translation: 'Say, "Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds."',
  source: "Al-An'am 6:162",
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: 'وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ',
  transliteration: "Wadhkur rabbaka fi nafsika tadarru'an wa khifatan wa dunal-jahri minal-qawli bil-ghuduwwi wal-asal. Wa la takun minal-ghafilin",
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech - in the mornings and the evenings. And do not be among the heedless.',
  source: "Al-A'raf 7:205",
  edition: 'en-sahih-international',
};

const _7_206 = {
  arabic: 'إِنَّ الَّذِينَ عِندَ رَبِّكَ لَا يَسْتَكْبِرُونَ عَنْ عِبَادَتِهِ وَيُسَبِّحُونَهُ وَلَهُ يَسْجُدُونَ',
  transliteration: "Innal-ladhina 'inda rabbika la yastakbiruna 'an 'ibadatihi wa yusabbihunahu wa lahu yasjudun",
  translation: 'Indeed, those who are near your Lord [i.e., the angels] are not prevented by arrogance from His worship, and they exalt Him, and to Him they prostrate.',
  source: "Al-A'raf 7:206",
  edition: 'en-sahih-international',
};

const _8_2 = {
  arabic: 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آيَاتُهُ زَادَتْهُمْ إِيمَانًا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ',
  transliteration: "Innamal-mu'minunal-ladhina idha dhukiral-lahu wajilat qulubuhum wa idha tuliyat 'alayhim ayatuhu zadathum imanan wa 'ala rabbihim yatawakkalun",
  translation: 'The believers are only those who, when Allah is mentioned, their hearts become fearful, and when His verses are recited to them, it increases them in faith; and upon their Lord they rely -',
  source: 'Al-Anfal 8:2',
  edition: 'en-sahih-international',
};

const _11_123 = {
  arabic: 'وَلِلَّهِ غَيْبُ السَّمَاوَاتِ وَالْأَرْضِ وَإِلَيْهِ يُرْجَعُ الْأَمْرُ كُلُّهُ فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ ۚ وَمَا رَبُّكَ بِغَافِلٍ عَمَّا تَعْمَلُونَ',
  transliteration: "Wa lillahi ghaybus-samawati wal-ardi wa ilayhi yurja'ul-amru kulluhu fa'budhu wa tawakkal 'alayh. Wa ma rabbuka bighaflin 'amma ta'malun",
  translation: 'And to Allah belong the unseen [aspects] of the heavens and the earth and to Him will be returned the matter, all of it, so worship Him and rely upon Him. And your Lord is not unaware of that which you do.',
  source: 'Hud 11:123',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  transliteration: "Alladhina amanu wa tatma'innu qulubuhum bidhikrillah. Ala bidhikrillahi tatma'innul-qulub",
  translation: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.",
  source: "Ar-Ra'd 13:28",
  edition: 'en-sahih-international',
};

const _16_96 = {
  arabic: 'مَا عِندَكُمْ يَنفَدُ ۖ وَمَا عِندَ اللَّهِ بَاقٍ ۗ وَلَنَجْزِيَنَّ الَّذِينَ صَبَرُوا أَجْرَهُم بِأَحْسَنِ مَا كَانُوا يَعْمَلُونَ',
  transliteration: "Ma 'indakum yanfad. Wa ma 'indallahi baq. Wa lanajziyannalladhina sabaru ajrahum bi'ahsani ma kanu ya'malun",
  translation: 'Whatever you have will end, but what Allah has is lasting. And We will surely give those who were patient their reward according to the best of what they used to do.',
  source: 'An-Nahl 16:96',
  edition: 'en-sahih-international',
};

const _17_37 = {
  arabic: 'وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّكَ لَن تَخْرِقَ الْأَرْضَ وَلَن تَبْلُغَ الْجِبَالَ طُولًا',
  transliteration: "Wa la tamshi fil-ardi maraha. Innaka lan takhriqa-l-arda wa lan tablughal-jibala tula",
  translation: 'And do not walk upon the earth exultantly. Indeed, you will never tear the earth [apart], and you will never reach the mountains in height.',
  source: 'Al-Isra 17:37',
  edition: 'en-sahih-international',
};

const _21_49 = {
  arabic: 'الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ وَهُم مِّنَ السَّاعَةِ مُشْفِقُونَ',
  transliteration: "Alladhina yakhshawna rabbahum bil-ghaybi wa hum minas-sa'ati mushfiqun",
  translation: 'Who fear their Lord unseen, while they are of the Hour apprehensive.',
  source: 'Al-Anbya 21:49',
  edition: 'en-sahih-international',
};

const _23_2 = {
  arabic: 'الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
  transliteration: "Alladhina hum fi salatihim khashi'un",
  translation: 'They who are during their prayer humbly intent',
  source: "Al-Mu'minun 23:2",
  edition: 'en-sahih-international',
};

const _26_89 = {
  arabic: 'إِلَّا مَنْ أَتَى اللَّهَ بِقَلْبٍ سَلِيمٍ',
  transliteration: "Illa man atallaha biqalbin salim",
  translation: 'But only one who comes to Allah with a sound heart.',
  source: "Ash-Shu'ara 26:89",
  edition: 'en-sahih-international',
};

const _29_6 = {
  arabic: 'وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ ۚ إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ',
  transliteration: "Wa man jahada fa innama yujahidu linafsihi. Innallaha laghaniyyun 'anil-'alamin",
  translation: 'And whoever strives only strives for [the benefit of] himself. Indeed, Allah is Free from need of the worlds.',
  source: "Al-'Ankabut 29:6",
  edition: 'en-sahih-international',
};

const _31_22 = {
  arabic: 'وَمَن يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ ۗ وَإِلَى اللَّهِ عَاقِبَةُ الْأُمُورِ',
  transliteration: "Wa man yuslim wajhahu ilallahi wa huwa muhsinun faqadistamsaka bil-'urwatil-wuthqa. Wa ilallahi 'aqibatul-umur",
  translation: 'And whoever submits his face [i.e., self] to Allah while he is a doer of good - then he has grasped the most trustworthy handhold. And to Allah will be the outcome of [all] matters.',
  source: 'Luqman 31:22',
  edition: 'en-sahih-international',
};

const _32_15 = {
  arabic: 'إِنَّمَا يُؤْمِنُ بِآيَاتِنَا الَّذِينَ إِذَا ذُكِّرُوا بِهَا خَرُّوا سُجَّدًا وَسَبَّحُوا بِحَمْدِ رَبِّهِمْ وَهُمْ لَا يَسْتَكْبِرُونَ',
  transliteration: "Innama yu'minu bi ayatinal-ladhina idha dukkiru biha kharru sujjadan wa sabbahu bihamdi rabbihim wa hum la yastakbirun",
  translation: 'Only those believe in Our verses who, when they are reminded by them, fall down in prostration and exalt [Allah] with praise of their Lord, and they are not arrogant.',
  source: 'As-Sajdah 32:15',
  edition: 'en-sahih-international',
};

const _35_15 = {
  arabic: 'يَا أَيُّهَا النَّاسُ أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ ۖ وَاللَّهُ هُوَ الْغَنِيُّ الْحَمِيدُ',
  transliteration: "Ya ayyuhan-nasu antumul-fuqara'u ilallah. Wallahu huwal-ghaniyyul-hamid",
  translation: 'O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy.',
  source: 'Fatir 35:15',
  edition: 'en-sahih-international',
};

const _37_84 = {
  arabic: 'إِذْ جَاءَ رَبَّهُ بِقَلْبٍ سَلِيمٍ',
  transliteration: "Idh ja'a rabbahu biqalbin salim",
  translation: 'When he came to his Lord with a sound heart',
  source: 'As-Saffat 37:84',
  edition: 'en-sahih-international',
};

const _39_3 = {
  arabic: 'أَلَا لِلَّهِ الدِّينُ الْخَالِصُ ۚ وَالَّذِينَ اتَّخَذُوا مِن دُونِهِ أَوْلِيَاءَ مَا نَعْبُدُهُمْ إِلَّا لِيُقَرِّبُونَا إِلَى اللَّهِ زُلْفَىٰ إِنَّ اللَّهَ يَحْكُمُ بَيْنَهُمْ فِي مَا هُمْ فِيهِ يَخْتَلِفُونَ ۗ إِنَّ اللَّهَ لَا يَهْدِي مَنْ هُوَ كَاذِبٌ كَفَّارٌ',
  transliteration: "Ala lillahid-dinul-khalis. Walladhina-ttakhadhu min dunihi awliya'a ma na'buduhum illa liyuqarribuna ilallahi zulfa. Innallaha yahkumu baynahum fi ma hum fihi yakhtalifun. Innallaha la yahdi man huwa kadhibun kaffar",
  translation: 'Unquestionably, for Allah is the pure religion. And those who take protectors besides Him [say], "We only worship them that they may bring us nearer to Allah in position." Indeed, Allah will judge between them concerning that over which they differ. Indeed, Allah does not guide he who is a liar and [confirmed] disbeliever.',
  source: 'Az-Zumar 39:3',
  edition: 'en-sahih-international',
};

const _39_14 = {
  arabic: 'قُلِ اللَّهَ أَعْبُدُ مُخْلِصًا لَّهُ دِينِي',
  transliteration: "Qulillaha a'budu mukhlisan lahu dini",
  translation: 'Say, "Allah [alone] do I worship, sincere to Him in my religion,"',
  source: 'Az-Zumar 39:14',
  edition: 'en-sahih-international',
};

const _39_53 = {
  arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
  transliteration: "Qul ya 'ibadiyalladhina asrafu 'ala anfusihim la taqnatu min rahmatillah. Innallaha yaghfirudh-dhunuba jami'a. Innahu huwal-ghafurur-rahim",
  translation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
  source: 'Az-Zumar 39:53',
  edition: 'en-sahih-international',
};

const _40_14 = {
  arabic: 'فَادْعُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ',
  transliteration: "Fad'ullaha mukhlisina lahud-dina wa law karihal-kafirun",
  translation: 'So invoke Allah, [being] sincere to Him in religion, although the disbelievers dislike it.',
  source: 'Ghafir 40:14',
  edition: 'en-sahih-international',
};

const _47_38 = {
  arabic: 'هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ ۖ وَمَن يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَن نَّفْسِهِ ۚ وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ ۚ وَإِن تَتَوَلَّوْا يَسْتَبْدِلْ قَوْمًا غَيْرَكُمْ ثُمَّ لَا يَكُونُوا أَمْثَالَكُم',
  transliteration: "Ha antum ha'ula'i tud'awna litunfiqu fi sabilillahi faminkum man yabkhal. Wa man yabkhal fa innama yabkhalu 'an nafsih. Wallahul-ghaniyu wa antumul-fuqara'. Wa in tatawallau yastabdil qawman ghayrakum thumma la yakunu amthalakum",
  translation: 'Here you are - those invited to spend in the cause of Allah - but among you are those who withhold [out of greed]. And whoever withholds only withholds [benefit] from himself; and Allah is the Free of need, while you are the needy. And if you turn away [i.e., refuse], He will replace you with another people; then they will not be the likes of you.',
  source: 'Muhammad 47:38',
  edition: 'en-sahih-international',
};

const _49_17 = {
  arabic: 'يَمُنُّونَ عَلَيْكَ أَنْ أَسْلَمُوا ۖ قُل لَّا تَمُنُّوا عَلَيَّ إِسْلَامَكُم ۖ بَلِ اللَّهُ يَمُنُّ عَلَيْكُمْ أَنْ هَدَاكُمْ لِلْإِيمَانِ إِن كُنتُمْ صَادِقِينَ',
  transliteration: "Yamunnuna 'alayka an aslamu. Qul la tamunnu 'alayya islamakum. Balillahu yamunnu 'alaykum an hadakum lil-imani in kuntum sadiqin",
  translation: 'They consider it a favor to you that they have accepted Islam. Say, "Do not consider your Islam a favor to me. Rather, Allah has conferred favor upon you that He has guided you to the faith, if you should be truthful."',
  source: 'Al-Hujurat 49:17',
  edition: 'en-sahih-international',
};

const _50_33 = {
  arabic: 'مَّنْ خَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ وَجَاءَ بِقَلْبٍ مُّنِيبٍ',
  transliteration: "Man khashiyar-rahmana bil-ghaybi wa ja'a biqalbin munib",
  translation: 'Who feared the Most Merciful in the unseen and came with a heart returning [in repentance].',
  source: 'Qaf 50:33',
  edition: 'en-sahih-international',
};

const _57_16 = {
  arabic: 'أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ وَلَا يَكُونُوا كَالَّذِينَ أُوتُوا الْكِتَابَ مِن قَبْلُ فَطَالَ عَلَيْهِمُ الْأَمَدُ فَقَسَتْ قُلُوبُهُمْ ۖ وَكَثِيرٌ مِّنْهُمْ فَاسِقُونَ',
  transliteration: "Alam ya'ni lilladhina amanu an takhsha'a qulubuhum lidhikrillahi wa ma nazala minal-haqqi wa la yakunu kalladhina utul-kitaba min qablu fatala 'alayhimul-amadu faqasat qulubuhum wa kathirun minhum fasiqun",
  translation: 'Has the time not come for those who have believed that their hearts should become humbly submissive at the remembrance of Allah and what has come down of the truth? And let them not be like those who were given the Scripture before, and a long period passed over them, so their hearts hardened; and many of them are defiantly disobedient.',
  source: 'Al-Hadid 57:16',
  edition: 'en-sahih-international',
};

const _57_23 = {
  arabic: 'لِّكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ وَلَا تَفْرَحُوا بِمَا آتَاكُمْ ۗ وَاللَّهُ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
  transliteration: "Likayla ta'saw 'ala ma fatakum wa la tafrahu bima atakum. Wallahu la yuhibbu kulla mukhtalin fakhur",
  translation: 'In order that you not despair over what has eluded you and not exult [in pride] over what He has given you. And Allah does not like everyone self-deluded and boastful -',
  source: 'Al-Hadid 57:23',
  edition: 'en-sahih-international',
};

const _59_19 = {
  arabic: 'وَلَا تَكُونُوا كَالَّذِينَ نَسُوا اللَّهَ فَأَنسَاهُمْ أَنفُسَهُمْ ۚ أُولَٰئِكَ هُمُ الْفَاسِقُونَ',
  transliteration: "Wa la takunu kalladhina nasullaha fa ansahum anfusahum. Ula'ika humul-fasiqun",
  translation: 'And be not like those who forgot Allah, so He made them forget themselves. Those are the defiantly disobedient.',
  source: 'Al-Hashr 59:19',
  edition: 'en-sahih-international',
};

const _65_3 = {
  arabic: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا',
  transliteration: "Wa yarzuqhu min haythu la yahtasib. Wa man yatawakkal 'alallahi fahuwa hasbuh. Innallaha balighu amrih. Qad ja'alallahu likulli shay'in qadra",
  translation: 'And will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a [decreed] extent.',
  source: 'At-Talaq 65:3',
  edition: 'en-sahih-international',
};

const _73_8 = {
  arabic: 'وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا',
  transliteration: "Wadhkurisma rabbika wa tabattal ilayhi tabtila",
  translation: 'And remember the name of your Lord and devote yourself to Him with [complete] devotion.',
  source: 'Al-Muzzammil 73:8',
  edition: 'en-sahih-international',
};

const _82_6 = {
  arabic: 'يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ',
  transliteration: "Ya ayyuhal-insanu ma gharraka birabbika-l-karim",
  translation: 'O mankind, what has deceived you concerning your Lord, the Generous,',
  source: 'Al-Infitar 82:6',
  edition: 'en-sahih-international',
};

const _92_20 = {
  arabic: 'إِلَّا ابْتِغَاءَ وَجْهِ رَبِّهِ الْأَعْلَىٰ',
  transliteration: "Illa-btighaa'a wajhi rabbihil-a'la",
  translation: 'But only seeking the face [i.e., acceptance] of his Lord, Most High.',
  source: 'Al-Layl 92:20',
  edition: 'en-sahih-international',
};

const _98_5 = {
  arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ',
  transliteration: "Wa ma umiru illa liya'budullaha mukhlisina lahud-dina hunafa'a wa yuqimus-salata wa yu'tuz-zakata wa dhalika dinul-qayyimah",
  translation: 'And they were not commanded except to worship Allah, [being] sincere to Him in religion, inclining to truth, and to establish prayer and to give zakah. And that is the correct religion.',
  source: 'Al-Bayyinah 98:5',
  edition: 'en-sahih-international',
};

const _107_6 = {
  arabic: 'الَّذِينَ هُمْ يُرَاءُونَ',
  transliteration: "Alladhina hum yura'un",
  translation: 'Those who make show [of their deeds]',
  source: "Al-Ma'un 107:6",
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_FAITH = {

  // ═══ ALL YES — proceed ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  '011111': { ..._35_15,
    framing: 'My practice still carries a trace of self-importance — I am the one entirely in need of Him.' },

  '101111': { ..._107_6,
    framing: 'Part of me is still seeking witness — I want to return to worshipping without an audience.' },

  '110111': { ..._49_17,
    framing: 'I am reading my practice as something I have earned — guidance itself is His favour, not mine.' },

  '111011': { ..._3_8,
    framing: 'I am holding this position more tightly than evidence warrants — I can ask Him to steady my heart.' },

  '111101': { ..._65_3,
    framing: 'I have acted but I am still holding the outcome — whoever relies on Allah, He is sufficient.' },

  '111110': { ..._23_2,
    framing: 'The form is there but my heart has not arrived — I need the stillness of genuine khushu\'.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // M-M pairs (both gaps within Al-Mutakabbir)

  '001111': { ..._4_142,
    framing: 'I am standing for the form while watching to be seen — the heart is performing, not presenting.' },

  '010111': { ..._57_23,
    framing: 'I am seeking recognition while inflating my state — He does not love the self-deluded and boastful.' },

  '011011': { ..._82_6,
    framing: 'I approach feeling owed while still watching my image — what has deceived me about my Lord?' },

  '100111': { ..._32_15,
    framing: 'I seek witness and hold positions tightly — real faith falls prostrate, not arrogant.' },

  '101011': { ..._17_37,
    framing: 'I seek recognition and grip my positions firmly — I will never reach the mountains in my pride.' },

  '110011': { ..._7_206,
    framing: 'I inflate my state and hold positions defensively — those near Him are not blocked by arrogance.' },

  // M-W cross pairs (one gap in each attribute)

  '011101': { ..._39_3,
    framing: 'I hold my outcome and approach as though I am owed — pure religion belongs to Allah alone.' },

  '011110': { ..._50_33,
    framing: 'I approach feeling owed and my heart is not present — may I come with a returning heart.' },

  '101101': { ..._16_96,
    framing: 'I seek recognition and hold the outcome in my hands — what I have will end; what He has endures.' },

  '101110': { ..._21_49,
    framing: 'I seek recognition and drift without real presence — the sincere fear their Lord unseen.' },

  '110101': { ..._31_22,
    framing: 'I hold positions tightly and clutch the outcome — I can submit my face and release to Him.' },

  '110110': { ..._57_16,
    framing: 'I hold positions defensively and my heart is not submissive — has the time not yet come?' },

  '111001': { ..._3_160,
    framing: 'I cannot receive correction and I still grip the result — upon Allah let the believers rely.' },

  '111010': { ..._13_28,
    framing: 'I hold a position rigidly and fulfil the form without presence — hearts rest only in His remembrance.' },

  // W-W pair (both gaps within Al-Wakil) — CORNER

  '111100': { ..._11_123,
    framing: 'My heart seems oriented but I hold both the outcome and the presence — all matters return to Him.' },

  // ═══ THREE NOT YET (3 zeros) — deeper gaps ═══

  // 3M + 0W (three Al-Mutakabbir gaps, both Al-Wakil present)

  '000111': { ..._98_5,
    framing: 'I am performing, seeking witness, and feeling owed — I need to return to sincere worship alone.' },

  '001011': { ..._82_6,
    framing: 'I am performing, inflating my state, and gripping positions — what has deceived me about my Lord?' },

  '010011': { ..._7_206,
    framing: 'I seek recognition, inflate my state, and hold defensively — arrogance blocks approach to Him.' },

  '100011': { ..._4_49,
    framing: 'I seek witness, hold positions, and claim inner purity — only Allah purifies whom He wills.' },

  // 2M + 1W (two Al-Mutakabbir gaps + one Al-Wakil gap)

  '001101': { ..._39_14,
    framing: 'I am performing, inflating, and holding the outcome — let me declare: Allah alone, sincere.' },

  '001110': { ..._59_19,
    framing: 'I am performing, inflating my state, and absent in presence — forgetting Him means I forget myself.' },

  '010101': { ..._3_173,
    framing: 'I seek recognition, grip positions, and hold the outcome — sufficient for me is Allah, the best Trustee.' },

  '010110': { ..._4_143,
    framing: 'I seek recognition, hold positions, and lack genuine presence — wavering, belonging to neither side.' },

  '011001': { ..._29_6,
    framing: 'I feel owed, grip the outcome, and cannot receive correction — I am striving only for myself.' },

  '011010': { ..._37_84,
    framing: 'I feel owed and approach without a present heart — I need to come to Him with a sound heart.' },

  '100101': { ..._47_38,
    framing: 'I seek witness, hold the outcome, and claim inner purity — Allah is Free of need; I am the needy.' },

  '100110': { ..._40_14,
    framing: 'I seek witness, inflate inwardly, and lack genuine heart-presence — I can invoke Him, sincere.' },

  '101001': { ..._39_53,
    framing: 'I seek recognition, hold the outcome, and grip positions — I must not despair of His mercy.' },

  '101010': { ..._21_49,
    framing: 'I seek recognition and lack both genuine presence and surrender — the sincere fear their Lord unseen.' },

  '110001': { ..._65_3,
    framing: 'I inflate and hold positions while still clutching the result — whoever relies on Allah, He is enough.' },

  '110010': { ..._26_89,
    framing: 'I hold positions and fulfil the form without real presence — I need to come with a sound heart.' },

  // 1M + 2W (one Al-Mutakabbir gap + both Al-Wakil gaps)

  '011100': { ..._31_22,
    framing: 'I approach feeling owed while holding both the outcome and presence — I need to submit my face fully.' },

  '101100': { ..._8_2,
    framing: 'I seek recognition while holding both the outcome and presence — true believers rely upon their Lord.' },

  '110100': { ..._57_16,
    framing: 'I hold positions and lack both surrender and presence — has the time not come for my heart to soften?' },

  '111000': { ..._3_8,
    framing: 'I hold positions tightly and lack both surrender and turning — may He not let my heart deviate.' },

  // ═══ FOUR NOT YET (4 zeros) — significant gaps ═══

  // 4M + 0W — CORNER (all Al-Mutakabbir absent, both Al-Wakil present)

  '000011': { ..._35_15,
    framing: 'All four pride conditions are unresolved — yet I trust. I am entirely the one in need of Him.' },

  // 3M + 1W (three Al-Mutakabbir gaps + one Al-Wakil gap)

  '000101': { ..._47_38,
    framing: 'Nearly all humility is absent and I hold the outcome — Allah is the Free of need; I am the needy.' },

  '000110': { ..._73_8,
    framing: 'Nearly all humility is absent and I lack heart-presence — I can remember His name and devote fully.' },

  '001001': { ..._4_142,
    framing: 'I am performing, inflating, holding outcomes, and absent — standing lazily, showing to people.' },

  '001010': { ..._13_28,
    framing: 'I am performing, inflating, gripping positions, and drifting — hearts rest only in His remembrance.' },

  '010001': { ..._39_3,
    framing: 'I seek recognition, hold positions, grip outcomes, and inflate — pure religion belongs to Allah alone.' },

  '010010': { ..._32_15,
    framing: 'I seek recognition, hold positions, inflate, and lack presence — real faith prostrates without arrogance.' },

  '100001': { ..._29_6,
    framing: 'I seek witness, inflate, hold outcomes, and grip positions — I am striving only for myself.' },

  '100010': { ..._2_44,
    framing: 'I seek witness, inflate, hold positions, and lack presence — I know the way but have not embodied it.' },

  // 2M + 2W (two Al-Mutakabbir gaps + both Al-Wakil gaps)

  '001100': { ..._6_162,
    framing: 'I am performing and inflating, without surrender or turning — my prayer and living need to return to Him.' },

  '010100': { ..._39_53,
    framing: 'I seek recognition and grip positions, without surrender or presence — I must not despair of His mercy.' },

  '011000': { ..._49_17,
    framing: 'I approach feeling owed while lacking both surrender and presence — guidance itself is His favour.' },

  '100100': { ..._4_49,
    framing: 'I seek witness and inflate inwardly, without surrender or turning — only Allah purifies whom He wills.' },

  '101000': { ..._17_37,
    framing: 'I seek recognition and grip positions, without surrender or presence — I cannot reach the mountains.' },

  '110000': { ..._7_205,
    framing: 'I inflate and hold positions, without surrendering or turning — I can remember Him quietly, within myself.' },

  // ═══ FIVE NOT YET (5 zeros) — nearly absent ═══

  '100000': { ..._35_15,
    framing: 'Only awareness of His needlessness remains — everything else needs resetting. I am the one in need.' },

  '010000': { ..._3_173,
    framing: 'Only freedom from recognition-seeking stands — nearly everything is absent. Hasbunallah, the best Trustee.' },

  '001000': { ..._92_20,
    framing: 'Only honesty about my state remains — nearly everything needs resetting. I seek only His face.' },

  '000100': { ..._65_3,
    framing: 'Only my openness to correction remains — nearly everything is absent. He is sufficient for those who trust.' },

  '000010': { ..._11_123,
    framing: 'Only the act of surrender remains — I can build from here. All matters return to Him.' },

  '000001': { ..._50_33,
    framing: 'Only a trace of turning remains — I can build from here. May I come with a heart returning to Him.' },

  // ═══ ALL NOT YET — entirely absent ═══

  '000000': { ..._98_5,
    framing: 'My practice has become entirely about myself — I need to return to worshipping Him alone, sincere.' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupReadinessAyah(key) {
  return READINESS_AYAT_FAITH[key] || null;
}
