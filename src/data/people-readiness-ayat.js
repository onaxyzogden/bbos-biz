/**
 * Maqasid OS — People Module Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Raḥīm (The Merciful) · Al-Jāmiʿ (The Gatherer)
 * Row distribution: 4 rows Al-Raḥīm (R1–R4) · 2 rows Al-Jāmiʿ (J1–J2)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: R1 R2 R3 R4 J1 J2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   R1: Genuinely attentive to the person vs responding only to their role
 *   R2: Holding difference without letting it become distance or judgment
 *   R3: Adding to this person rather than primarily extracting
 *   R4: Holding difficulty without letting it justify hardness
 *   J1: Oriented toward shared good rather than private agenda
 *   J2: Words and presence build cohesion rather than carry division
 *
 * Usage: READINESS_AYAT_PEOPLE[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 38 unique ayat across 63 non-null entries (max 2 keys per shared ayah)
 * - Shared ayat (2 uses): 49:13(2), 3:159(2), 59:9(2), 42:43(2), 5:8(2),
 *   4:135(2), 3:103(2), 49:10(2), 8:63(2), 9:71(2), 4:114(2), 4:36(2),
 *   16:90(2), 3:134(2), 41:34(2), 3:92(2), 49:9(2), 60:7(2), 28:54(2),
 *   30:21(2), 16:126(2)
 * - Single-use ayat: 80:1, 49:11, 49:12, 7:199, 76:8, 2:207, 47:38, 64:16,
 *   16:127, 4:149, 13:22, 24:22, 42:38, 21:107, 2:177, 2:263, 4:1
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all ≤ 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Grounded with quran.ai: fetch_quran(38 ayat, ar-simple-clean),
 *   fetch_translation(38 ayat, en-sahih-international),
 *   search_quran(6 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_177 = {
  arabic: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَالْمُوفُونَ بِعَهْدِهِمْ إِذَا عَاهَدُوا ۖ وَالصَّابِرِينَ فِي الْبَأْسَاءِ وَالضَّرَّاءِ وَحِينَ الْبَأْسِ ۗ أُولَٰئِكَ الَّذِينَ صَدَقُوا ۖ وَأُولَٰئِكَ هُمُ الْمُتَّقُونَ',
  transliteration: "Laysal-birra an tuwallu wujuhakum qibalal-mashriqi wal-maghrib. Walakinnal-birra man amana billahi wal-yawmil-akhiri wal-mala'ikati wal-kitabi wan-nabiyyina wa atal-mala 'ala hubbihi dhawil-qurba wal-yatama wal-masakina wabnas-sabili was-sa'ilina wa fir-riqabi wa aqamas-salata wa ataz-zakata wal-mufuna bi'ahdihim idha 'ahadu was-sabirina fil-ba'sa'i wad-darra'i wa hinal-ba's. Ula'ikal-ladhina sadaqu wa ula'ika humul-muttaqun",
  translation: 'Righteousness is not that you turn your faces toward the east or the west, but [true] righteousness is [in] one who believes in Allāh, the Last Day, the angels, the Book, and the prophets and gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveler, those who ask [for help], and for freeing slaves; [and who] establishes prayer and gives zakāh; [those who] fulfill their promise when they promise; and [those who] are patient in poverty and hardship and during battle. Those are the ones who have been true, and it is those who are the righteous.',
  source: 'Al-Baqarah 2:177',
  edition: 'en-sahih-international',
};

const _2_207 = {
  arabic: 'وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ ۗ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ',
  transliteration: "Wa minan-nasi man yashri nafsahu-btighaa'a mardhatillah. Wallahu ra'ufun bil-'ibad",
  translation: 'And of the people is he who sells himself, seeking means to the approval of Allāh. And Allāh is Kind to [His] servants.',
  source: 'Al-Baqarah 2:207',
  edition: 'en-sahih-international',
};

const _2_263 = {
  arabic: 'قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ مِّن صَدَقَةٍ يَتْبَعُهَا أَذًى ۗ وَاللَّهُ غَنِيٌّ حَلِيمٌ',
  transliteration: "Qawlun ma'rufun wa maghfiratun khayrun min sadaqatin yatba'uha adha. Wallahu ghaniyyun halim",
  translation: 'Kind speech and forgiveness are better than charity followed by injury. And Allāh is Free of need and Forbearing.',
  source: 'Al-Baqarah 2:263',
  edition: 'en-sahih-international',
};

const _3_92 = {
  arabic: 'لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ',
  transliteration: "Lan tanaalul-birra hatta tunfiqu mimma tuhibbun. Wa ma tunfiqu min shay'in fa innallaha bihi 'alim",
  translation: 'Never will you attain the good [reward] until you spend [in the way of Allāh] from that which you love. And whatever you spend - indeed, Allāh is Knowing of it.',
  source: "Ali 'Imran 3:92",
  edition: 'en-sahih-international',
};

const _3_103 = {
  arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا ۚ وَاذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ إِذْ كُنتُمْ أَعْدَاءً فَأَلَّفَ بَيْنَ قُلُوبِكُمْ فَأَصْبَحْتُم بِنِعْمَتِهِ إِخْوَانًا وَكُنتُمْ عَلَىٰ شَفَا حُفْرَةٍ مِّنَ النَّارِ فَأَنقَذَكُم مِّنْهَا ۗ كَذَٰلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ لَعَلَّكُمْ تَهْتَدُونَ',
  transliteration: "Wa'tasimuu bihablillahi jami'an wa la tafarraqu. Wadhkuru ni'matallahi 'alaykum idh kuntum a'da'an fa'allafa bayna qulubikum fa'asbahtum bini'matihi ikhwana. Wa kuntum 'ala shafa hufrating minan-nari fa anqadhakum minha. Kadhalika yubayyinullahu lakum ayatihi la'allakum tahtadun",
  translation: 'And hold firmly to the rope of Allāh all together and do not become divided. And remember the favor of Allāh upon you - when you were enemies and He brought your hearts together and you became, by His favor, brothers. And you were on the edge of a pit of the Fire, and He saved you from it. Thus does Allāh make clear to you His verses that you may be guided.',
  source: "Ali 'Imran 3:103",
  edition: 'en-sahih-international',
};

const _3_134 = {
  arabic: 'الَّذِينَ يُنفِقُونَ فِي السَّرَّاءِ وَالضَّرَّاءِ وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ',
  transliteration: "Alladhina yunfiquna fis-sarra'i wad-darra'i wal-kadhiminal-ghaytha wal-'afina 'anin-nas. Wallahu yuhibbul-muhsinin",
  translation: 'Who spend [in the cause of Allāh] during ease and hardship and who restrain anger and who pardon the people - and Allāh loves the doers of good;',
  source: "Ali 'Imran 3:134",
  edition: 'en-sahih-international',
};

const _3_159 = {
  arabic: 'فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ ۖ فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
  transliteration: "Fabima rahmatim minallahi linta lahum. Wa law kunta fadhdhan ghalidhhal-qalbi lan-fadhdhu min hawlik. Fa'fu 'anhum wastaghfir lahum wa shawirhum fil-amr. Fa idha 'azamta fatawakkal 'alallah. Innallaha yuhibbul-mutawakkilin",
  translation: 'So by mercy from Allāh, [O Muḥammad], you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you. So pardon them and ask forgiveness for them and consult them in the matter. And when you have decided, then rely upon Allāh. Indeed, Allāh loves those who rely [upon Him].',
  source: "Ali 'Imran 3:159",
  edition: 'en-sahih-international',
};

const _4_1 = {
  arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
  transliteration: "Ya ayyuhan-nasu-ttaqu rabbakumul-ladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan kathiran wa nisa'a. Wattaqullahallladhi tasa'aluna bihi wal-arham. Innallaha kana 'alaykum raqiba",
  translation: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allāh, through whom you ask one another, and the wombs. Indeed Allāh is ever, over you, an Observer.',
  source: 'An-Nisa 4:1',
  edition: 'en-sahih-international',
};

const _4_36 = {
  arabic: 'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا',
  transliteration: "Wa'budullaha wa la tushrikuu bihi shay'an. Wa bil-walidayni ihsanan wa bidhil-qurba wal-yatama wal-masakini wal-jari dhil-qurba wal-jaril-junubi was-sahibi bil-janbi wabnis-sabili wa ma malakat aymanukum. Innallaha la yuhibbu man kana mukhtalan fakhura",
  translation: 'Worship Allāh and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess. Indeed, Allāh does not like those who are self-deluding and boastful,',
  source: 'An-Nisa 4:36',
  edition: 'en-sahih-international',
};

const _4_114 = {
  arabic: 'لَّا خَيْرَ فِي كَثِيرٍ مِّن نَّجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ ۚ وَمَن يَفْعَلْ ذَٰلِكَ ابْتِغَاءَ مَرْضَاتِ اللَّهِ فَسَوْفَ نُؤْتِيهِ أَجْرًا عَظِيمًا',
  transliteration: "La khayra fi kathirin min najwahum illa man amara bisadaqatin aw ma'rufin aw islahim baynan-nas. Wa man yaf'al dhalika-btighaa'a mardhatillahi fasawfa nu'tihi ajran 'adhima",
  translation: 'No good is there in much of their private conversation, except for those who enjoin charity or that which is right or conciliation between people. And whoever does that seeking means to the approval of Allāh - then We are going to give him a great reward.',
  source: 'An-Nisa 4:114',
  edition: 'en-sahih-international',
};

const _4_135 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ ۚ إِن يَكُنْ غَنِيًّا أَوْ فَقِيرًا فَاللَّهُ أَوْلَىٰ بِهِمَا ۖ فَلَا تَتَّبِعُوا الْهَوَىٰ أَن تَعْدِلُوا ۚ وَإِن تَلْوُوا أَوْ تُعْرِضُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا',
  transliteration: "Ya ayyuhal-ladhina amanuu kunu qawwamina bil-qisti shuhadaa'a lillahi wa law 'ala anfusikum awil-walidayni wal-aqrabin. In yakun ghaniyyan aw faqiran fallahu awla bihima. Fala tattabi'ul-hawa an ta'dilu. Wa in talwu aw tu'ridhu fa innallaha kana bima ta'maluna khabira",
  translation: 'O you who have believed, be persistently standing firm in justice, witnesses for Allāh, even if it be against yourselves or parents and relatives. Whether one is rich or poor, Allāh is more worthy of both. So follow not [personal] inclination, lest you not be just. And if you distort [your testimony] or refuse [to give it], then indeed Allāh is ever, of what you do, Aware.',
  source: 'An-Nisa 4:135',
  edition: 'en-sahih-international',
};

const _4_149 = {
  arabic: 'إِن تُبْدُوا خَيْرًا أَوْ تُخْفُوهُ أَوْ تَعْفُوا عَن سُوءٍ فَإِنَّ اللَّهَ كَانَ عَفُوًّا قَدِيرًا',
  transliteration: "In tubdu khayran aw tukhfuhu aw ta'fu 'an su'in fa innallaha kana 'afuwwan qadira",
  translation: 'If [instead] you show [some] good or conceal it or pardon an offense - indeed, Allāh is ever Pardoning and Competent.',
  source: 'An-Nisa 4:149',
  edition: 'en-sahih-international',
};

const _5_8 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ ۖ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu kunu qawwamina lillahi shuhadaa'a bil-qist. Wa la yajrimannakum shana'anu qawmin 'ala alla ta'dilu. I'dilu huwa aqrabu lit-taqwa. Wattaqullaha innallaha khabirun bima ta'malun",
  translation: 'O you who have believed, be persistently standing firm for Allāh, witnesses in justice, and do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness. And fear Allāh; indeed, Allāh is [fully] Aware of what you do.',
  source: "Al-Ma'idah 5:8",
  edition: 'en-sahih-international',
};

const _7_199 = {
  arabic: 'خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ وَأَعْرِضْ عَنِ الْجَاهِلِينَ',
  transliteration: "Khudhi-l-'afwa wa'mur bil-'urfi wa a'ridh 'anil-jahilin",
  translation: 'Take what is given freely, enjoin what is good, and turn away from the ignorant.',
  source: "Al-A'raf 7:199",
  edition: 'en-sahih-international',
};

const _8_63 = {
  arabic: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ',
  transliteration: "Wa allafa bayna qulubihim. Law anfaqta ma fil-ardhi jami'an ma allafta bayna qulubihim walakin-nallaha allafa baynahum. Innahu 'azizun hakim",
  translation: 'And brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allāh brought them together. Indeed, He is Exalted in Might and Wise.',
  source: 'Al-Anfal 8:63',
  edition: 'en-sahih-international',
};

const _9_71 = {
  arabic: 'وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ ۚ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ وَيُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَيُطِيعُونَ اللَّهَ وَرَسُولَهُ ۚ أُولَٰئِكَ سَيَرْحَمُهُمُ اللَّهُ ۗ إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
  transliteration: "Wal-mu'minuna wal-mu'minatu ba'dhuhum awliya'u ba'dh. Ya'muruna bil-ma'rufi wa yanhawna 'anil-munkari wa yuqimunas-salata wa yu'tunaz-zakata wa yuti'unallaha wa rasulah. Ula'ika sayarhamuhumulllah. Innallaha 'azizun hakim",
  translation: 'The believing men and believing women are allies of one another. They enjoin what is right and forbid what is wrong and establish prayer and give zakāh and obey Allāh and His Messenger. Those - Allāh will have mercy upon them. Indeed, Allāh is Exalted in Might and Wise.',
  source: 'At-Tawbah 9:71',
  edition: 'en-sahih-international',
};

const _13_22 = {
  arabic: 'وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ أُولَٰئِكَ لَهُمْ عُقْبَى الدَّارِ',
  transliteration: "Walladhina sabaru-btighaa'a wajhi rabbihim wa aqamus-salata wa anfaqu mimma razaqnahum sirran wa 'alaniyatan wa yadra'una bil-hasanatis-sayyi'ah. Ula'ika lahum 'uqbad-dar",
  translation: 'And those who are patient, seeking the face [i.e., acceptance] of their Lord, and establish prayer and spend from what We have provided for them secretly and publicly and prevent evil with good - those will have the good consequence of [this] home -',
  source: "Ar-Ra'd 13:22",
  edition: 'en-sahih-international',
};

const _16_90 = {
  arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ',
  transliteration: "Innallaha ya'muru bil-'adli wal-ihsani wa ita'i dhil-qurba wa yanha 'anil-fahsha'i wal-munkari wal-baghyi. Ya'idhukum la'allakum tadhakkarun",
  translation: 'Indeed, Allāh orders justice and good conduct and giving [help] to relatives and forbids immorality and bad conduct and oppression. He admonishes you that perhaps you will be reminded.',
  source: 'An-Nahl 16:90',
  edition: 'en-sahih-international',
};

const _16_126 = {
  arabic: 'وَإِنْ عَاقَبْتُمْ فَعَاقِبُوا بِمِثْلِ مَا عُوقِبْتُم بِهِ ۖ وَلَئِن صَبَرْتُمْ لَهُوَ خَيْرٌ لِّلصَّابِرِينَ',
  transliteration: "Wa in 'aqabtum fa'aqubu bimithli ma 'uqibtum bih. Wa la'in sabartum lahuwa khayrun lis-sabirin",
  translation: 'And if you punish [an enemy, O believers], punish with an equivalent of that with which you were harmed. But if you are patient - it is better for those who are patient.',
  source: 'An-Nahl 16:126',
  edition: 'en-sahih-international',
};

const _16_127 = {
  arabic: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ ۚ وَلَا تَحْزَنْ عَلَيْهِمْ وَلَا تَكُ فِي ضَيْقٍ مِّمَّا يَمْكُرُونَ',
  transliteration: "Wasbir wa ma sabruka illa billah. Wa la tahzan 'alayhim wa la taku fi dhayqin mimma yamkurun",
  translation: 'And be patient, [O Muḥammad], and your patience is not but through Allāh. And do not grieve over them and do not be in distress over what they conspire.',
  source: 'An-Nahl 16:127',
  edition: 'en-sahih-international',
};

const _21_107 = {
  arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
  transliteration: "Wa ma arsalnaka illa rahmatan lil-'alamin",
  translation: 'And We have not sent you, [O Muḥammad], except as a mercy to the worlds.',
  source: 'Al-Anbya 21:107',
  edition: 'en-sahih-international',
};

const _24_22 = {
  arabic: 'وَلَا يَأْتَلِ أُولُو الْفَضْلِ مِنكُمْ وَالسَّعَةِ أَن يُؤْتُوا أُولِي الْقُرْبَىٰ وَالْمَسَاكِينَ وَالْمُهَاجِرِينَ فِي سَبِيلِ اللَّهِ ۖ وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ ۗ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
  transliteration: "Wa la ya'tali ulul-fadhli minkum was-sa'ati an yu'tu ulil-qurba wal-masakina wal-muhajirina fi sabilillah. Walya'fu walyasfahuu. Ala tuhibbuna an yaghfirallahu lakum. Wallahu ghafurun rahim",
  translation: 'And let not those of virtue among you and wealth swear not to give [aid] to their relatives and the needy and the emigrants for the cause of Allāh, and let them pardon and overlook. Would you not like that Allāh should forgive you? And Allāh is Forgiving and Merciful.',
  source: 'An-Nur 24:22',
  edition: 'en-sahih-international',
};

const _28_54 = {
  arabic: 'أُولَٰئِكَ يُؤْتَوْنَ أَجْرَهُم مَّرَّتَيْنِ بِمَا صَبَرُوا وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
  transliteration: "Ula'ika yu'tawna ajrahum marratayni bima sabaru wa yadra'una bil-hasanatis-sayyi'ata wa mimma razaqnahum yunfiqun",
  translation: 'Those will be given their reward twice for what they patiently endured and [because] they avert evil through good, and from what We have provided them they spend.',
  source: 'Al-Qasas 28:54',
  edition: 'en-sahih-international',
};

const _30_21 = {
  arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  transliteration: "Wa min ayatihi an khalaqa lakum min anfusikum azwajan litaskunuu ilayha wa ja'ala baynakum mawaddatan wa rahmah. Inna fi dhalika la ayatin liqawmin yatafakkarun",
  translation: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
  source: 'Ar-Rum 30:21',
  edition: 'en-sahih-international',
};

const _41_34 = {
  arabic: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
  transliteration: "Wa la tastawil-hasanatu wa las-sayyi'ah. Id-fa' billati hiya ahsanu fa idhal-ladhi baynaka wa baynahu 'adawatun ka'annahu waliyyun hamim",
  translation: 'And not equal are the good deed and the bad. Repel [evil] by that [deed] which is better; and thereupon, the one whom between you and him is enmity [will become] as though he was a devoted friend.',
  source: 'Fussilat 41:34',
  edition: 'en-sahih-international',
};

const _42_38 = {
  arabic: 'وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
  transliteration: "Walladhina-stajabu lirabbihim wa aqamus-salata wa amruhum shura baynahum wa mimma razaqnahum yunfiqun",
  translation: 'And those who have responded to their Lord and established prayer and whose affair is [determined by] consultation among themselves, and from what We have provided them, they spend,',
  source: 'Ash-Shura 42:38',
  edition: 'en-sahih-international',
};

const _42_43 = {
  arabic: 'وَلَمَن صَبَرَ وَغَفَرَ إِنَّ ذَٰلِكَ لَمِنْ عَزْمِ الْأُمُورِ',
  transliteration: "Wa laman sabara wa ghafara inna dhalika lamin 'azmil-umur",
  translation: 'And whoever is patient and forgives - indeed, that is of the matters [worthy] of resolve.',
  source: 'Ash-Shura 42:43',
  edition: 'en-sahih-international',
};

const _47_38 = {
  arabic: 'هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ ۖ وَمَن يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَن نَّفْسِهِ ۚ وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ ۚ وَإِن تَتَوَلَّوْا يَسْتَبْدِلْ قَوْمًا غَيْرَكُمْ ثُمَّ لَا يَكُونُوا أَمْثَالَكُم',
  transliteration: "Ha antum ha'ula'i tud'awna litunfiqu fi sabilillahi faminakum man yabkhal. Wa man yabkhal fa innama yabkhalu 'an nafsih. Wallahul-ghaniyu wa antumul-fuqara'. Wa in tatawallaw yastabdil qawman ghayrakum thumma la yakunu amthalakum",
  translation: 'Here you are - those invited to spend in the cause of Allāh - but among you are those who withhold [out of greed]. And whoever withholds only withholds [benefit] from himself; and Allāh is the Free of need, while you are the needy. And if you turn away [i.e., refuse], He will replace you with another people; then they will not be the likes of you.',
  source: 'Muhammad 47:38',
  edition: 'en-sahih-international',
};

const _49_9 = {
  arabic: 'وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا ۖ فَإِن بَغَتْ إِحْدَاهُمَا عَلَى الْأُخْرَىٰ فَقَاتِلُوا الَّتِي تَبْغِي حَتَّىٰ تَفِيءَ إِلَىٰ أَمْرِ اللَّهِ ۚ فَإِن فَاءَتْ فَأَصْلِحُوا بَيْنَهُمَا بِالْعَدْلِ وَأَقْسِطُوا ۖ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ',
  transliteration: "Wa in ta'ifatani minal-mu'minina-qtatalu fa aslihuu baynahuma. Fa in baghat ihdahuma 'alal-ukhra faqatilul-lati tabghi hatta tafi'a ila amrillah. Fa in fa'at fa aslihuu baynahuma bil-'adli wa aqsitu. Innallaha yuhibbul-muqsitin",
  translation: 'And if two factions among the believers should fight, then make settlement between the two. But if one of them oppresses the other, then fight against the one that oppresses until it returns to the ordinance of Allāh. And if it returns, then make settlement between them in justice and act justly. Indeed, Allāh loves those who act justly.',
  source: 'Al-Hujurat 49:9',
  edition: 'en-sahih-international',
};

const _49_10 = {
  arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ',
  transliteration: "Innamal-mu'minuna ikhwatun fa aslihuu bayna akhawaykum. Wattaqullaha la'allakum turhamun",
  translation: 'The believers are but brothers, so make settlement between your brothers. And fear Allāh that you may receive mercy.',
  source: 'Al-Hujurat 49:10',
  edition: 'en-sahih-international',
};

const _49_11 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ وَلَا نِسَاءٌ مِّن نِّسَاءٍ عَسَىٰ أَن يَكُنَّ خَيْرًا مِّنْهُنَّ ۖ وَلَا تَلْمِزُوا أَنفُسَكُمْ وَلَا تَنَابَزُوا بِالْأَلْقَابِ ۖ بِئْسَ الِاسْمُ الْفُسُوقُ بَعْدَ الْإِيمَانِ ۚ وَمَن لَّمْ يَتُبْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu la yaskhur qawmun min qawmin 'asa an yakunu khayran minhum wa la nisa'un min nisa'in 'asa an yakuna khayran minhunna. Wa la talmizu anfusakum wa la tanabazu bil-alqab. Bi'sal-ismu-l-fusuqu ba'dal-iman. Wa man lam yatub fa ula'ika humudh-dhalimun",
  translation: "O you who have believed, let not a people ridicule [another] people; perhaps they may be better than them; nor let women ridicule [other] women; perhaps they may be better than them. And do not insult one another and do not call each other by [offensive] nicknames. Wretched is the name [i.e., mention] of disobedience after [one's] faith. And whoever does not repent - then it is those who are the wrongdoers.",
  source: 'Al-Hujurat 49:11',
  edition: 'en-sahih-international',
};

const _49_12 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ',
  transliteration: "Ya ayyuhal-ladhina amanuj-tanibu kathiran minadh-dhann. Inna ba'dhad-dhanni ithm. Wa la tajassasu wa la yaghtab ba'dhukum ba'dha. Ayuhibbu ahadukum an ya'kula lahma akhihi maytan fakarihtumuuh. Wattaqullaha innallaha tawwabun rahim",
  translation: 'O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin. And do not spy or backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it. And fear Allāh; indeed, Allāh is Accepting of Repentance and Merciful.',
  source: 'Al-Hujurat 49:12',
  edition: 'en-sahih-international',
};

const _49_13 = {
  arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
  transliteration: "Ya ayyuhan-nasu inna khalaqnakum min dhakarin wa untha wa ja'alnakum shu'uban wa qaba'ila lita'arafu. Inna akramakum 'indallahi atqakum. Innallaha 'alimun khabir",
  translation: 'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allāh is the most righteous of you. Indeed, Allāh is Knowing and Aware.',
  source: 'Al-Hujurat 49:13',
  edition: 'en-sahih-international',
};

const _59_9 = {
  arabic: 'وَالَّذِينَ تَبَوَّءُوا الدَّارَ وَالْإِيمَانَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِي صُدُورِهِمْ حَاجَةً مِّمَّا أُوتُوا وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
  transliteration: "Walladhina tabawwa'ud-dara wal-imana min qablihim yuhibbuna man hajara ilayhim wa la yajiduna fi sudurihim hajatan mimma utu wa yu'thiruna 'ala anfusihim wa law kana bihim khasasah. Wa man yuqa shuhha nafsihi fa ula'ika humul-muflihun",
  translation: 'And [also for] those who were settled in the Home [i.e., al-Madīnah] and [adopted] the faith before them. They love those who emigrated to them and find not any want in their breasts of what they [i.e., the emigrants] were given but give [them] preference over themselves, even though they are in privation. And whoever is protected from the stinginess of his soul - it is those who will be the successful.',
  source: 'Al-Hashr 59:9',
  edition: 'en-sahih-international',
};

const _60_7 = {
  arabic: 'عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً ۚ وَاللَّهُ قَدِيرٌ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
  transliteration: "Asallahu an yaj'ala baynakum wa baynal-ladhina 'adaytum minhum mawaddah. Wallahu qadir. Wallahu ghafurun rahim",
  translation: 'Perhaps Allāh will put, between you and those to whom you have been enemies among them, affection. And Allāh is competent, and Allāh is Forgiving and Merciful.',
  source: 'Al-Mumtahanah 60:7',
  edition: 'en-sahih-international',
};

const _64_16 = {
  arabic: 'فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ وَاسْمَعُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ ۗ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
  transliteration: "Fattaqullaha masta-ta'tum wasma'u wa ati'u wa anfiqu khayran li'anfusikum. Wa man yuqa shuhha nafsihi fa ula'ika humul-muflihun",
  translation: 'So fear Allāh as much as you are able and listen and obey and spend [in the way of Allāh]; it is better for your selves. And whoever is protected from the stinginess of his soul - it is those who will be the successful.',
  source: 'At-Taghabun 64:16',
  edition: 'en-sahih-international',
};

const _76_8 = {
  arabic: 'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا',
  transliteration: "Wa yut'imunath-tha'ama 'ala hubbihi miskianan wa yatiiman wa asira",
  translation: 'And they give food in spite of love for it to the needy, the orphan, and the captive,',
  source: 'Al-Insan 76:8',
  edition: 'en-sahih-international',
};

const _80_1 = {
  arabic: 'عَبَسَ وَتَوَلَّىٰ',
  transliteration: "'Abasa wa tawalla",
  translation: 'He [i.e., the Prophet (ﷺ)] frowned and turned away',
  source: "'Abasa 80:1",
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_PEOPLE = {

  // ═══ ALL YES — fully present ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  '011111': { ..._49_12,
    framing: 'I am letting assumption shape how I see this person — I can choose to arrive openly.' },

  '101111': { ..._49_11,
    framing: 'What is unfamiliar about this person is becoming distance — I can hold it with curiosity instead.' },

  '110111': { ..._47_38,
    framing: 'I am here more to receive than to give — what I withhold I withhold from myself.' },

  '111011': { ..._42_43,
    framing: 'I am letting this relationship\'s difficulty excuse hardness — patience and forgiveness are the resolve.' },

  '111101': { ..._4_114,
    framing: 'My own interests are directing this more than the well-being of us — I can reorient toward what holds us.' },

  '111110': { ..._49_10,
    framing: 'I am carrying something that divides — I can choose to arrive as the brother or sister I am called to be.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // R-R pairs (both gaps within Al-Raḥīm)

  '001111': { ..._76_8,
    framing: 'I am not truly seeing this person and hold back what they need — they gave food despite love for it.' },

  '010111': { ..._3_159,
    framing: 'I am letting difference become distance — mercy leans toward them rather than away.' },

  '011011': { ..._41_34,
    framing: 'I am not fully attending and difficulty has made me hard — the better response transforms what divides us.' },

  '100111': { ..._2_263,
    framing: 'I am extracting and letting difference become judgment — kind speech and pardon are a better offering.' },

  '101011': { ..._16_126,
    framing: 'Difference is producing judgment and I am letting difficulty justify hardness — patience is the better path.' },

  '110011': { ..._28_54,
    framing: 'I am extracting and using difficulty as permission for hardness — averting harm with good earns double reward.' },

  // R-J cross pairs (one gap in each attribute)

  '011101': { ..._49_13,
    framing: 'I see only the role and my own interests are driving this — we were made peoples and tribes to know each other.' },

  '011110': { ..._3_103,
    framing: 'I see only the role and carry division — let me hold the rope that holds us all together.' },

  '101101': { ..._4_36,
    framing: 'Difference is producing withdrawal and private interest directs me — ihsan is owed to the companion at my side.' },

  '101110': { ..._60_7,
    framing: 'Unfamiliarity creates distance and division is in what I bring — Allah can put affection where I see none.' },

  '110101': { ..._21_107,
    framing: 'I am here to take and my own agenda is driving this — I was sent as mercy, not as extraction.' },

  '110110': { ..._13_22,
    framing: 'I am here to extract and carry division — patience and giving together are what the home requires.' },

  '111001': { ..._4_135,
    framing: 'I am not oriented toward the shared good and I am carrying division — I must not follow personal inclination here.' },

  '111010': { ..._42_38,
    framing: 'My private interests direct me and division shapes what I bring — the community resolves its affairs by shura.' },

  // J-J pair (both gaps within Al-Jāmiʿ) — CORNER

  '111100': { ..._9_71,
    framing: 'I am present with this person but my contribution fragments rather than builds — believers are each other\'s allies.' },

  // ═══ THREE NOT YET (3 zeros) — deeper gaps ═══

  // 3R + 0J (three Al-Raḥīm gaps, both Al-Jāmiʿ present)

  '000111': { ..._30_21,
    framing: 'I am procedural, withdrawing, and extracting — He placed mawaddah and mercy between us as a sign.' },

  '001011': { ..._3_134,
    framing: 'I am not attending, extracting, and difficulty has made me hard — restrain anger and pardon; Allah loves the good-doers.' },

  '010011': { ..._16_127,
    framing: 'Difference is distance, giving is absent, and hardness has settled in — patience is only through Allah; do not be in distress.' },

  '100011': { ..._4_149,
    framing: 'I am not seeing the person, difficulty has hardened me, and mercy is absent — show good, conceal it, or pardon; Allah pardons.' },

  // 2R + 1J (two Al-Raḥīm gaps + one Al-Jāmiʿ gap)

  '001101': { ..._59_9,
    framing: 'I am not seeing this person, I am extracting, and my interests direct me — the Ansar gave preference even in privation.' },

  '001110': { ..._8_63,
    framing: 'I am not attending, extracting, and division is in what I bring — only Allah can join hearts; I cannot do it by keeping.' },

  '010101': { ..._49_13,
    framing: 'Difference is producing withdrawal and my agenda is driving this — we were made peoples and tribes to know each other.' },

  '010110': { ..._41_34,
    framing: 'Difference is distance and I am carrying division — repelling with what is better turns enemies into devoted friends.' },

  '011001': { ..._4_114,
    framing: 'I see only the role and private interest directs me — conciliation seeking Allah\'s approval is the only real good here.' },

  '011010': { ..._3_103,
    framing: 'I see only the role and am carrying fragmentation — hold the rope together and do not become divided.' },

  '100101': { ..._2_207,
    framing: 'I am extracting, my interests direct me, and I am not attending — the one who gives himself entirely is the model.' },

  '100110': { ..._64_16,
    framing: 'I am here to take and carrying division — giving is better for you; whoever is guarded from his soul\'s greed succeeds.' },

  '101001': { ..._42_43,
    framing: 'Difference becomes distance, private interest leads, and difficulty hardens — patient forgiveness is the matter of resolve.' },

  '101010': { ..._16_90,
    framing: 'Difference produces withdrawal and division is in what I carry — Allah commands justice and good conduct and forbids oppression.' },

  '110001': { ..._3_92,
    framing: 'I am here to extract and my agenda drives this — I will not attain the good until I give from what I love.' },

  '110010': { ..._49_9,
    framing: 'I am extracting and carrying division — make settlement in justice; Allah loves those who act justly.' },

  // 1R + 2J (one Al-Raḥīm gap + both Al-Jāmiʿ gaps)

  '011100': { ..._4_1,
    framing: 'I see only the role but am present and merciful within it — we came from one soul; the common origin calls me back.' },

  '101100': { ..._60_7,
    framing: 'Difference creates distance and both communal orientations are absent — Allah can still put affection where I see none.' },

  '110100': { ..._5_8,
    framing: 'I am here to take and both communal dimensions are absent — do not let personal feeling prevent justice for this person.' },

  '111000': { ..._9_71,
    framing: 'I am present with this person but both communal dimensions are absent — believers are allies; I am called to be one.' },

  // ═══ FOUR NOT YET (4 zeros) — significant gaps ═══

  // 4R + 0J — CORNER (all Al-Raḥīm absent, both Al-Jāmiʿ present)

  '000011': { ..._30_21,
    framing: 'All four relational dimensions are absent yet I am oriented toward the shared — He placed affection and mercy as a sign; I begin there.' },

  // 3R + 1J

  '000101': { ..._3_159,
    framing: 'Nearly all rahmah is absent and private interest leads — a harsh heart disperses people; mercy is the only way forward.' },

  '000110': { ..._49_11,
    framing: 'Rahmah is largely absent and division is in what I bring — do not ridicule; perhaps they are better than I imagine.' },

  '001001': { ..._76_8,
    framing: 'I am not seeing, I am taking, and private agenda leads — they give food in spite of love for it; this is the standard.' },

  '001010': { ..._8_63,
    framing: 'I am not attending, I am extracting, and division shapes me — no spending in the earth can join hearts; only Allah can.' },

  '010001': { ..._2_263,
    framing: 'Difference is distance, personal interest leads, and mercy is largely absent — kind speech and forgiveness outweigh wounded charity.' },

  '010010': { ..._28_54,
    framing: 'Difference is distance and division is in what I carry — those who avert harm with good and give receive their reward twice.' },

  '100001': { ..._42_38,
    framing: 'I am not attending, my interest leads, and cohesion is absent — their affair is shura; I need to enter as one who belongs.' },

  '100010': { ..._16_90,
    framing: 'I am not attending and division enters through me — Allah orders justice, good conduct, and giving; oppression is what He forbids.' },

  // 2R + 2J

  '001100': { ..._59_9,
    framing: 'I am not seeing, I am extracting, and both communal orientations are absent — the Ansar gave preference even in privation.' },

  '010100': { ..._4_36,
    framing: 'Difference is distance and both communal dimensions are absent — ihsan is owed to every companion at my side; boasting is not loved.' },

  '011000': { ..._13_22,
    framing: 'I see only the role and both communal dimensions are missing — patience seeking His face and averting harm with good are the path.' },

  '100100': { ..._3_92,
    framing: 'I am extracting and both communal orientations are absent — I will not reach the good until I spend from what I love.' },

  '101000': { ..._5_8,
    framing: 'Difference produces withdrawal and both communal gaps are present — do not let antipathy prevent justice; that is nearer to taqwa.' },

  '110000': { ..._49_9,
    framing: 'I am extracting and both communal dimensions are absent — make settlement justly; Allah loves those who act with equity.' },

  // ═══ FIVE NOT YET (5 zeros) — nearly absent ═══

  '100000': { ..._3_134,
    framing: 'Only my awareness of what I carry remains — I can restrain anger, pardon, and spend even now.' },

  '010000': { ..._7_199,
    framing: 'Only freedom from procedural seeing stands — take what is given freely, enjoin good, turn from the ignorant.' },

  '001000': { ..._2_177,
    framing: 'Only my attentiveness remains; nearly all else needs resetting — true righteousness gives in spite of love for what it gives.' },

  '000100': { ..._4_135,
    framing: 'Only my gentleness with difficulty stands — follow not personal inclination; be firm in justice for Allah.' },

  '000010': { ..._42_38,
    framing: 'Only orientation toward the shared good remains — let consultation and giving shape what I enter.' },

  '000001': { ..._21_107,
    framing: 'Only my awareness of cohesion remains — I was sent as mercy; I can build from that single thread.' },

  // ═══ ALL NOT YET — both absent ═══

  '000000': { ..._24_22,
    framing: 'I have reduced this person to a role and this space to extraction — let me pardon and overlook; would I not love for Allah to forgive me?' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupReadinessAyah(key) {
  return READINESS_AYAT_PEOPLE[key] || null;
}
