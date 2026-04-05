/**
 * OGDEN — Spirituality Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Ghani (The Self-Sufficient) · Al-Qarib (The Near)
 * Row distribution: 4 rows Al-Ghani (G1–G4) · 2 rows Al-Qarib (Q1–Q2)
 * v1.0 · 2026-04-05
 *
 * Key schema: 6-character binary string
 * Positions: G1 G2 G3 G4 Q1 Q2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   G1: Aware He needs nothing from me vs performing for my image
 *   G2: Worship between me and Allah vs conscious of being seen
 *   G3: Holding spiritual state honestly vs comparing / inflating
 *   G4: Here as a servant vs approaching with entitlement from prior devotion
 *   Q1: Actually turning vs fulfilling form without presence
 *   Q2: Responding to His nearness vs treating nearness as destination
 *
 * Usage: READINESS_AYAT_SPIRITUALITY[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 40 unique ayat across 63 non-null entries (max 2 keys per shared ayah)
 * - Shared ayat (2 uses): 2:264(2), 39:3(2), 39:7(2), 32:15(2), 21:49(2),
 *   35:15(2), 4:142(2), 59:19(2), 2:45(2), 2:186(2), 82:6(2), 66:8(2),
 *   7:206(2), 107:5(2), 4:143(2), 57:23(2), 9:118(2), 49:17(2), 7:205(2),
 *   50:33(2), 4:146(2), 37:84(2), 73:8(2)
 * - Single-use ayat: 98:5, 39:14, 18:110, 107:6, 92:20, 4:49, 29:6, 23:2,
 *   50:16, 31:22, 18:28, 2:115, 13:28, 22:31, 17:37, 56:85, 26:89
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Hadith-supplemented framings: none
 * - Combinations flagged for scholarly review: none
 *
 * Grounded with quran.ai: fetch_quran(40 ayat, ar-simple-clean),
 *   fetch_translation(40 ayat, en-sahih-international),
 *   search_quran(8 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_45 = {
  arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
  transliteration: "Wasta'inu bis-sabri was-salah. Wa innaha lakabira-tun illa 'alal-khashi'in",
  translation: 'And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive [to Allah]',
  source: 'Al-Baqarah 2:45',
  edition: 'en-sahih-international',
};

const _2_115 = {
  arabic: 'وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ ۚ إِنَّ اللَّهَ وَاسِعٌ عَلِيمٌ',
  transliteration: "Wa lillahil-mashriqu wal-maghrib. Fa aynama tuwallu fa thamma wajhullah. Innallaha wasi'un 'alim",
  translation: 'And to Allah belongs the east and the west. So wherever you [might] turn, there is the Face of Allah. Indeed, Allah is all-Encompassing and Knowing.',
  source: 'Al-Baqarah 2:115',
  edition: 'en-sahih-international',
};

const _2_186 = {
  arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ',
  transliteration: "Wa idha sa'alaka 'ibadi 'anni fa inni qarib. Ujibu da'watad-da'i idha da'an. Falyastajibu li walyu'minu bi la'allahum yarshudun",
  translation: 'And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me [by obedience] and believe in Me that they may be [rightly] guided.',
  source: 'Al-Baqarah 2:186',
  edition: 'en-sahih-international',
};

const _2_264 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ كَالَّذِي يُنفِقُ مَالَهُ رِئَاءَ النَّاسِ وَلَا يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ۖ فَمَثَلُهُ كَمَثَلِ صَفْوَانٍ عَلَيْهِ تُرَابٌ فَأَصَابَهُ وَابِلٌ فَتَرَكَهُ صَلْدًا ۖ لَّا يَقْدِرُونَ عَلَىٰ شَيْءٍ مِّمَّا كَسَبُوا ۗ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الْكَافِرِينَ',
  transliteration: "Ya ayyuhal-ladhina amanu la tubtilu sadaqatikum bil-manni wal-adha kalladhi yunfiqu malahu ri'a'an-nasi wa la yu'minu billahi wal-yawmil-akhir. Famathaluhu kamathali safwanin 'alayhi turabun fa asabahu wabilun fatarakahu salda. La yaqdiruna 'ala shay'in mimma kasabu. Wallahu la yahdil-qawmal-kafirin",
  translation: 'O you who have believed, do not invalidate your charities with reminders [of it] or injury as does one who spends his wealth [only] to be seen by the people and does not believe in Allah and the Last Day. His example is like that of a [large] smooth stone upon which is dust and is hit by a downpour that leaves it bare. They are unable [to keep] anything of what they have earned. And Allah does not guide the disbelieving people.',
  source: 'Al-Baqarah 2:264',
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

const _4_146 = {
  arabic: 'إِلَّا الَّذِينَ تَابُوا وَأَصْلَحُوا وَاعْتَصَمُوا بِاللَّهِ وَأَخْلَصُوا دِينَهُمْ لِلَّهِ فَأُولَٰئِكَ مَعَ الْمُؤْمِنِينَ ۖ وَسَوْفَ يُؤْتِ اللَّهُ الْمُؤْمِنِينَ أَجْرًا عَظِيمًا',
  transliteration: "Illal-ladhina tabu wa aslahu wa'tasamu billahi wa akhlasu dinahum lillahi fa ula'ika ma'al-mu'minin. Wa sawfa yu'tillahul-mu'minina ajran 'adhima",
  translation: 'Except for those who repent, correct themselves, hold fast to Allah, and are sincere in their religion for Allah, for those will be with the believers. And Allah is going to give the believers a great reward.',
  source: 'An-Nisa 4:146',
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: 'وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ',
  transliteration: "Wadhkur rabbaka fi nafsika tadarru'an wa khifatan wa dunal-jahri minal-qawli bil-ghuduwwi wal-asal. Wa la takun minal-ghafilin",
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech - in the mornings and the evenings. And do not be among the heedless.',
  source: 'Al-A\'raf 7:205',
  edition: 'en-sahih-international',
};

const _7_206 = {
  arabic: 'إِنَّ الَّذِينَ عِندَ رَبِّكَ لَا يَسْتَكْبِرُونَ عَنْ عِبَادَتِهِ وَيُسَبِّحُونَهُ وَلَهُ يَسْجُدُونَ',
  transliteration: "Innal-ladhina 'inda rabbika la yastakbiruna 'an 'ibadatihi wa yusabbihunahu wa lahu yasjudun",
  translation: 'Indeed, those who are near your Lord [i.e., the angels] are not prevented by arrogance from His worship, and they exalt Him, and to Him they prostrate.',
  source: 'Al-A\'raf 7:206',
  edition: 'en-sahih-international',
};

const _9_118 = {
  arabic: 'وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ وَضَاقَتْ عَلَيْهِمْ أَنفُسُهُمْ وَظَنُّوا أَن لَّا مَلْجَأَ مِنَ اللَّهِ إِلَّا إِلَيْهِ ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا ۚ إِنَّ اللَّهَ هُوَ التَّوَّابُ الرَّحِيمُ',
  transliteration: "Wa 'alath-thalathatil-ladhina khullifu hatta idha daqat 'alayhimul-ardu bima rahubat wa daqat 'alayhim anfusuhum wa dhannu an la malja'a minallahi illa ilayh. Thumma taba 'alayhim liyatubu. Innallaha huwat-tawwabur-rahim",
  translation: 'And [He also forgave] the three who were left alone [i.e., boycotted, regretting their error] to the point that the earth closed in on them in spite of its vastness and their souls confined [i.e., anguished] them and they were certain that there is no refuge from Allah except in Him. Then He turned to them so they could repent. Indeed, Allah is the Accepting of Repentance, the Merciful.',
  source: 'At-Tawbah 9:118',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  transliteration: "Alladhina amanu wa tatma'innu qulubuhum bidhikrillah. Ala bidhikrillahi tatma'innul-qulub",
  translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
  source: 'Ar-Ra\'d 13:28',
  edition: 'en-sahih-international',
};

const _17_37 = {
  arabic: 'وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّكَ لَن تَخْرِقَ الْأَرْضَ وَلَن تَبْلُغَ الْجِبَالَ طُولًا',
  transliteration: "Wa la tamshi fil-ardi maraha. Innaka lan takhriqa-l-arda wa lan tablughal-jibala tula",
  translation: 'And do not walk upon the earth exultantly. Indeed, you will never tear the earth [apart], and you will never reach the mountains in height.',
  source: 'Al-Isra 17:37',
  edition: 'en-sahih-international',
};

const _18_28 = {
  arabic: 'وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ الْحَيَاةِ الدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُ عَن ذِكْرِنَا وَاتَّبَعَ هَوَاهُ وَكَانَ أَمْرُهُ فُرُطًا',
  transliteration: "Wasbir nafsaka ma'al-ladhina yad'una rabbahum bil-ghadati wal-'ashiyyi yuriduna wajhah. Wa la ta'du 'aynaka 'anhum turidu zinatal-hayatid-dunya. Wa la tuti' man aghfalna qalbahu 'an dhikrina wattaba'a hawahu wa kana amruhu furuta",
  translation: 'And keep yourself patient [by being] with those who call upon their Lord in the morning and the evening, seeking His face [i.e., acceptance]. And let not your eyes pass beyond them, desiring adornments of the worldly life, and do not obey one whose heart We have made heedless of Our remembrance and who follows his desire and whose affair is ever [in] neglect.',
  source: 'Al-Kahf 18:28',
  edition: 'en-sahih-international',
};

const _18_110 = {
  arabic: 'قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا',
  transliteration: "Qul innama ana basharun mithlukum yuha ilayya annama ilahukum ilahun wahid. Faman kana yarju liqa'a rabbihi falya'mal 'amalan salihan wa la yushrik bi'ibadati rabbihi ahada",
  translation: 'Say, "I am only a man like you, to whom has been revealed that your god is one God. So whoever would hope for the meeting with his Lord - let him do righteous work and not associate in the worship of his Lord anyone."',
  source: 'Al-Kahf 18:110',
  edition: 'en-sahih-international',
};

const _21_49 = {
  arabic: 'الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ وَهُم مِّنَ السَّاعَةِ مُشْفِقُونَ',
  transliteration: "Alladhina yakhshawna rabbahum bil-ghaybi wa hum minas-sa'ati mushfiqun",
  translation: 'Who fear their Lord unseen, while they are of the Hour apprehensive.',
  source: 'Al-Anbya 21:49',
  edition: 'en-sahih-international',
};

const _22_31 = {
  arabic: 'حُنَفَاءَ لِلَّهِ غَيْرَ مُشْرِكِينَ بِهِ ۚ وَمَن يُشْرِكْ بِاللَّهِ فَكَأَنَّمَا خَرَّ مِنَ السَّمَاءِ فَتَخْطَفُهُ الطَّيْرُ أَوْ تَهْوِي بِهِ الرِّيحُ فِي مَكَانٍ سَحِيقٍ',
  transliteration: "Hunafa'a lillahi ghayra mushrikina bih. Wa man yushrik billahi faka'annama kharra minas-sama'i fatakhtafuhut-tayru aw tahwi bihir-rihu fi makanin sahiq",
  translation: 'Inclining [only] to Allah, not associating [anything] with Him. And he who associates with Allah - it is as though he had fallen from the sky and was snatched by the birds or the wind carried him down into a remote place.',
  source: 'Al-Hajj 22:31',
  edition: 'en-sahih-international',
};

const _23_2 = {
  arabic: 'الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
  transliteration: "Alladhina hum fi salatihim khashi'un",
  translation: 'They who are during their prayer humbly intent',
  source: 'Al-Mu\'minun 23:2',
  edition: 'en-sahih-international',
};

const _26_89 = {
  arabic: 'إِلَّا مَنْ أَتَى اللَّهَ بِقَلْبٍ سَلِيمٍ',
  transliteration: "Illa man atallaha biqalbin salim",
  translation: 'But only one who comes to Allah with a sound heart.',
  source: 'Ash-Shu\'ara 26:89',
  edition: 'en-sahih-international',
};

const _29_6 = {
  arabic: 'وَمَن جَاهَدَ فَإِنَّمَا يُجَاهِدُ لِنَفْسِهِ ۚ إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ',
  transliteration: "Wa man jahada fa innama yujahidu linafsihi. Innallaha laghaniyyun 'anil-'alamin",
  translation: 'And whoever strives only strives for [the benefit of] himself. Indeed, Allah is Free from need of the worlds.',
  source: 'Al-\'Ankabut 29:6',
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

const _39_7 = {
  arabic: 'إِن تَكْفُرُوا فَإِنَّ اللَّهَ غَنِيٌّ عَنكُمْ ۖ وَلَا يَرْضَىٰ لِعِبَادِهِ الْكُفْرَ ۖ وَإِن تَشْكُرُوا يَرْضَهُ لَكُمْ ۗ وَلَا تَزِرُ وَازِرَةٌ وِزْرَ أُخْرَىٰ ۗ ثُمَّ إِلَىٰ رَبِّكُم مَّرْجِعُكُمْ فَيُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ ۚ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ',
  transliteration: "In takfuru fa innallaha ghaniyyun 'ankum. Wa la yarda li'ibadihil-kufr. Wa in tashkuru yardahu lakum. Wa la taziru waziratun wizra ukhra. Thumma ila rabbikum marji'ukum fayunabbi'ukum bima kuntum ta'malun. Innahu 'alimun bidhatissudur",
  translation: 'If you disbelieve - indeed, Allah is Free from need of you. And He does not approve for His servants disbelief. And if you are grateful, He approves [i.e., likes] it for you; and no bearer of burdens will bear the burden of another. Then to your Lord is your return, and He will inform you about what you used to do. Indeed, He is Knowing of that within the breasts.',
  source: 'Az-Zumar 39:7',
  edition: 'en-sahih-international',
};

const _39_14 = {
  arabic: 'قُلِ اللَّهَ أَعْبُدُ مُخْلِصًا لَّهُ دِينِي',
  transliteration: "Qulillaha a'budu mukhlisan lahu dini",
  translation: 'Say, "Allah [alone] do I worship, sincere to Him in my religion,',
  source: 'Az-Zumar 39:14',
  edition: 'en-sahih-international',
};

const _49_17 = {
  arabic: 'يَمُنُّونَ عَلَيْكَ أَنْ أَسْلَمُوا ۖ قُل لَّا تَمُنُّوا عَلَيَّ إِسْلَامَكُم ۖ بَلِ اللَّهُ يَمُنُّ عَلَيْكُمْ أَنْ هَدَاكُمْ لِلْإِيمَانِ إِن كُنتُمْ صَادِقِينَ',
  transliteration: "Yamunnuna 'alayka an aslamu. Qul la tamunnu 'alayya islamakum. Balillahu yamunnu 'alaykum an hadakum lil-imani in kuntum sadiqin",
  translation: 'They consider it a favor to you that they have accepted Islam. Say, "Do not consider your Islam a favor to me. Rather, Allah has conferred favor upon you that He has guided you to the faith, if you should be truthful."',
  source: 'Al-Hujurat 49:17',
  edition: 'en-sahih-international',
};

const _50_16 = {
  arabic: 'وَلَقَدْ خَلَقْنَا الْإِنسَانَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',
  transliteration: "Wa laqad khalaqnal-insana wa na'lamu ma tuwaswisu bihi nafsuh. Wa nahnu aqrabu ilayhi min hablil-warid",
  translation: 'And We have already created man and know what his soul whispers to him, and We are closer to him than [his] jugular vein.',
  source: 'Qaf 50:16',
  edition: 'en-sahih-international',
};

const _50_33 = {
  arabic: 'مَّنْ خَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ وَجَاءَ بِقَلْبٍ مُّنِيبٍ',
  transliteration: "Man khashiyar-rahmana bil-ghaybi wa ja'a biqalbin munib",
  translation: 'Who feared the Most Merciful in the unseen and came with a heart returning [in repentance].',
  source: 'Qaf 50:33',
  edition: 'en-sahih-international',
};

const _56_85 = {
  arabic: 'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنكُمْ وَلَٰكِن لَّا تُبْصِرُونَ',
  transliteration: "Wa nahnu aqrabu ilayhi minkum wa lakin la tubsirun",
  translation: 'And We [i.e., Our angels] are nearer to him than you, but you do not see -',
  source: 'Al-Waqi\'ah 56:85',
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

const _66_8 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا عَسَىٰ رَبُّكُمْ أَن يُكَفِّرَ عَنكُمْ سَيِّئَاتِكُمْ وَيُدْخِلَكُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ يَوْمَ لَا يُخْزِي اللَّهُ النَّبِيَّ وَالَّذِينَ آمَنُوا مَعَهُ ۖ نُورُهُمْ يَسْعَىٰ بَيْنَ أَيْدِيهِمْ وَبِأَيْمَانِهِمْ يَقُولُونَ رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
  transliteration: "Ya ayyuhal-ladhina amanu tubu ilallahi tawbatan nasuha. 'Asa rabbukum an yukaffira 'ankum sayyi'atikum wa yudkhilakum jannatin tajri min tahtihal-anhar",
  translation: 'O you who have believed, repent to Allah with sincere repentance. Perhaps your Lord will remove from you your misdeeds and admit you into gardens beneath which rivers flow [on] the Day when Allah will not disgrace the Prophet and those who believed with him. Their light will proceed before them and on their right; they will say, "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent."',
  source: 'At-Tahrim 66:8',
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

const _107_5 = {
  arabic: 'الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ',
  transliteration: "Alladhina hum 'an salatihim sahun",
  translation: '[But] who are heedless of their prayer -',
  source: 'Al-Ma\'un 107:5',
  edition: 'en-sahih-international',
};

const _107_6 = {
  arabic: 'الَّذِينَ هُمْ يُرَاءُونَ',
  transliteration: "Alladhina hum yura'un",
  translation: 'Those who make show [of their deeds]',
  source: 'Al-Ma\'un 107:6',
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_SPIRITUALITY = {

  // ═══ ALL YES — both present ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  '011111': { ..._107_6,
    framing: 'My practice still carries traces of performance — I need to return to the One I came for.' },

  '101111': { ..._92_20,
    framing: 'I notice part of me seeking witness — I can return to seeking only His face.' },

  '110111': { ..._4_49,
    framing: 'I am measuring my state against others — only He purifies whom He wills.' },

  '111011': { ..._29_6,
    framing: 'I am approaching as though my effort is owed — my striving is only for myself.' },

  '111101': { ..._23_2,
    framing: 'I am fulfilling the form but my presence has not arrived — I need the stillness of khushu\'.' },

  '111110': { ..._50_16,
    framing: 'I am reaching toward Him as though He were far — He is already closer than I imagine.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // G-G pairs (both gaps within Al-Ghani)

  '001111': { ..._2_264,
    framing: 'I am shaping this practice around being seen — I need to return to sincerity before I continue.' },

  '010111': { ..._39_3,
    framing: 'I am performing and measuring — but sincere religion belongs only to Allah.' },

  '011011': { ..._39_7,
    framing: 'I am performing and feeling owed — He is utterly free from need of me.' },

  '100111': { ..._32_15,
    framing: 'I am seeking witness while comparing states — real faith falls prostrate without arrogance.' },

  '101011': { ..._21_49,
    framing: 'I am conscious of being seen and feel entitled — the sincere fear their Lord unseen.' },

  '110011': { ..._35_15,
    framing: 'I am measuring and claiming — I am the one entirely in need of Allah.' },

  // G-Q cross pairs (one gap in each attribute)

  '011101': { ..._4_142,
    framing: 'I am performing without presence — standing for the form while the heart is elsewhere.' },

  '011110': { ..._31_22,
    framing: 'I am performing and reaching rather than receiving — I can submit my face to Him completely.' },

  '101101': { ..._18_28,
    framing: 'I am conscious of being seen and my heart drifts — I can return to those who seek His face.' },

  '101110': { ..._2_115,
    framing: 'I seek recognition and treat His nearness as distant — yet wherever I turn, there He is.' },

  '110101': { ..._59_19,
    framing: 'I am comparing and absent — forgetting Him means I forget even myself.' },

  '110110': { ..._13_28,
    framing: 'I am comparing and reaching — but hearts find their rest only in His remembrance.' },

  '111001': { ..._2_45,
    framing: 'I approach with entitlement and without presence — I can seek help through patience and prayer.' },

  '111010': { ..._2_186,
    framing: 'I feel owed and treat Him as distant — yet He says: I am near.' },

  // Q-Q pair (both gaps within Al-Qarib) — CORNER

  '111100': { ..._73_8,
    framing: 'My heart is right but my presence has not arrived — I need to remember His name and devote fully.' },

  // ═══ THREE NOT YET (3 zeros) — deeper gaps ═══

  // 3G + 0Q (three Al-Ghani gaps, both Al-Qarib present)

  '000111': { ..._39_14,
    framing: 'I am performing, seeking witness, and comparing — let me declare: Allah alone, sincere.' },

  '001011': { ..._82_6,
    framing: 'I am performing, seeking recognition, and feeling entitled — what has deceived me concerning my Lord?' },

  '010011': { ..._66_8,
    framing: 'I am performing, comparing, and entitled — I need sincere repentance before I begin.' },

  '100011': { ..._7_206,
    framing: 'I seek witness, compare, and claim entitlement — those near Him are not prevented by arrogance.' },

  // 2G + 1Q (two Al-Ghani gaps + one Al-Qarib gap)

  '001101': { ..._107_5,
    framing: 'I am performing, seeking recognition, and absent from my prayer — I have become sahun.' },

  '001110': { ..._22_31,
    framing: 'I am performing and seeking recognition while reaching — I need to incline only to Allah.' },

  '010101': { ..._4_143,
    framing: 'I am performing, comparing, and absent — wavering between, belonging to neither side.' },

  '010110': { ..._57_23,
    framing: 'I am performing, comparing, and reaching for distance — He does not love self-delusion.' },

  '011001': { ..._9_118,
    framing: 'I am performing, entitled, and absent — there is no refuge from Allah except in Him.' },

  '011010': { ..._49_17,
    framing: 'I am performing, entitled, and treating nearness as distant — guidance itself is His favour.' },

  '100101': { ..._17_37,
    framing: 'I seek witness, compare, and lack presence — I cannot reach the mountains in my pride.' },

  '100110': { ..._56_85,
    framing: 'I seek witness, compare, and treat nearness as distant — He is nearer than I see.' },

  '101001': { ..._7_205,
    framing: 'I seek recognition, feel entitled, and lack presence — I can remember Him within myself, humbly.' },

  '101010': { ..._50_33,
    framing: 'I seek recognition, feel entitled, and reach for distance — may I come with a returning heart.' },

  '110001': { ..._4_146,
    framing: 'I compare, feel entitled, and lack presence — I can repent, correct myself, and hold fast.' },

  '110010': { ..._26_89,
    framing: 'I compare, feel entitled, and treat nearness as distant — may I come with a sound heart.' },

  // 1G + 2Q (one Al-Ghani gap + both Al-Qarib gaps)

  '011100': { ..._37_84,
    framing: 'I am performing while absent from the One already here — I need a sound heart to begin.' },

  '101100': { ..._7_205,
    framing: 'I am conscious of being seen and lack both presence and orientation — I can remember Him quietly.' },

  '110100': { ..._59_19,
    framing: 'I am comparing without presence or orientation — I must not become one who forgot Him.' },

  '111000': { ..._35_15,
    framing: 'I approach with entitlement and without turning or receiving — I am entirely the one in need.' },

  // ═══ FOUR NOT YET (4 zeros) — significant gaps ═══

  // 4G + 0Q — CORNER (all Al-Ghani absent, both Al-Qarib present)

  '000011': { ..._18_110,
    framing: 'I am turned toward Him but still watching myself turn — let me not associate anyone in worship.' },

  // 3G + 1Q (three Al-Ghani gaps + one Al-Qarib gap)

  '000101': { ..._4_142,
    framing: 'Nearly all humility is absent and I lack presence — I am standing lazily, showing to people.' },

  '000110': { ..._39_3,
    framing: 'Nearly all humility is absent and I treat nearness as distant — pure religion belongs to Allah alone.' },

  '001001': { ..._107_5,
    framing: 'I am performing, seeking recognition, entitled, and absent — heedless of my own prayer entirely.' },

  '001010': { ..._82_6,
    framing: 'I am performing, seeking recognition, entitled, and reaching — what has distracted me from my Lord?' },

  '010001': { ..._4_143,
    framing: 'I am performing, comparing, entitled, and absent — wavering without belonging.' },

  '010010': { ..._66_8,
    framing: 'I am performing, comparing, entitled, and reaching — I need a sincere return before anything else.' },

  '100001': { ..._2_45,
    framing: 'I seek witness, compare, claim entitlement, and lack presence — patience and prayer can restore me.' },

  '100010': { ..._7_206,
    framing: 'I seek witness, compare, claim entitlement, and treat nearness as distant — arrogance blocks worship.' },

  // 2G + 2Q (two Al-Ghani gaps + both Al-Qarib gaps)

  '001100': { ..._2_264,
    framing: 'I am performing and seeking recognition without any turning — my deeds risk becoming bare stone.' },

  '010100': { ..._57_23,
    framing: 'I am performing and comparing without presence or orientation — I must not exult in what I imagine.' },

  '011000': { ..._39_7,
    framing: 'I am performing and entitled without turning or receiving — He needs nothing from my practice.' },

  '100100': { ..._32_15,
    framing: 'I seek witness and compare without presence or orientation — real faith prostrates without pride.' },

  '101000': { ..._21_49,
    framing: 'I seek recognition and feel entitled without turning or receiving — the sincere worship unseen.' },

  '110000': { ..._9_118,
    framing: 'I compare and feel entitled without turning or receiving — there is no refuge except returning to Him.' },

  // ═══ FIVE NOT YET (5 zeros) — nearly absent ═══

  '100000': { ..._50_33,
    framing: 'Only my honesty about non-performance remains — everything else has drifted. May I come with a returning heart.' },

  '010000': { ..._4_146,
    framing: 'Only my freedom from seeking recognition stands — I can repent, correct myself, and hold fast to Him.' },

  '001000': { ..._37_84,
    framing: 'Only my honesty about my state remains — nearly everything else needs resetting. I need a sound heart.' },

  '000100': { ..._49_17,
    framing: 'Only my lack of entitlement stands — nearly everything else is absent. Guidance is His favour alone.' },

  '000010': { ..._73_8,
    framing: 'Only my presence remains — I can build from here. Let me remember His name and devote fully.' },

  '000001': { ..._2_186,
    framing: 'Only my awareness of His nearness remains — I can build from here. He says: I am near.' },

  // ═══ ALL NOT YET — both absent ═══

  '000000': { ..._98_5,
    framing: 'My practice has become about myself — I need to return to worshipping Him alone, sincerely.' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupSpiritualityReadinessAyah(key) {
  return READINESS_AYAT_SPIRITUALITY[key] || null;
}
