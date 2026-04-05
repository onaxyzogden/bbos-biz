/**
 * OGDEN — Community Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Latif (The Subtly Kind) · Al-Jami' (The Gatherer)
 * Row distribution: 4 rows Al-Latif (L1–L4) · 2 rows Al-Jami' (J1–J2)
 * v1.0 · 2026-04-04
 *
 * Key schema: 6-character binary string
 * Positions: L1 L2 L3 L4 J1 J2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   L1: Genuine curiosity about what others carry vs not engaged with anyone's reality
 *   L2: Going deeper than visible vs responding to roles and appearances
 *   L3: Holding space for difference vs difference producing judgment or withdrawal
 *   L4: Giving rather than extracting vs here for what I can receive
 *   J1: Oriented toward the shared centre vs private interest driving
 *   J2: Contributing to cohesion vs carrying division into this space
 *
 * Usage: READINESS_AYAT_COMMUNITY[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 38 unique ayat across 63 non-null entries (max 3 keys per shared ayah)
 * - Shared ayat (3 uses): 3:103(3)
 * - Shared ayat (2 uses): 59:9(2), 50:22(2), 31:18(2), 107:7(2), 49:11(2),
 *   30:7(2), 41:34(2), 9:71(2), 22:24(2), 60:7(2), 25:63(2), 17:28(2),
 *   90:17(2), 7:199(2), 48:4(2), 5:2(2), 3:159(2), 15:47(2), 2:177(2),
 *   39:53(2), 2:286(2), 13:28(2), 8:63(2)
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Hadith-supplemented framings: none
 * - Combinations flagged for scholarly review: none
 *
 * Grounded with quran.ai: fetch_quran(38 ayat, ar-simple-clean),
 *   fetch_translation(38 ayat, en-sahih-international),
 *   search_quran(8 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_177 = {
  arabic: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَالْمُوفُونَ بِعَهْدِهِمْ إِذَا عَاهَدُوا ۖ وَالصَّابِرِينَ فِي الْبَأْسَاءِ وَالضَّرَّاءِ وَحِينَ الْبَأْسِ ۗ أُولَٰئِكَ الَّذِينَ صَدَقُوا ۖ وَأُولَٰئِكَ هُمُ الْمُتَّقُونَ',
  transliteration: 'Laysal-birra an tuwallu wujuhakum qibalal-mashriqi wal-maghribi wa lakinnal-birra man amana billahi wal-yawmil-akhiri wal-mala\'ikati wal-kitabi wan-nabiyyina wa atal-mala \'ala hubbihi dhawil-qurba wal-yatama wal-masakina wabnas-sabili was-sa\'ilina wa fir-riqabi wa aqamas-salata wa ataz-zakata wal-mufuna bi\'ahdihim idha \'ahadu was-sabirina fil-ba\'sa\'i wad-darra\'i wa hinal-ba\'s. Ula\'ikalladhina sadaqu wa ula\'ika humul-muttaqun',
  translation: 'Righteousness is not that you turn your faces toward the east or the west, but [true] righteousness is [in] one who believes in Allah, the Last Day, the angels, the Book, and the prophets and gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveler, those who ask [for help], and for freeing slaves; [and who] establishes prayer and gives zakah; [those who] fulfill their promise when they promise; and [those who] are patient in poverty and hardship and during battle. Those are the ones who have been true, and it is those who are the righteous.',
  source: 'Al-Baqarah 2:177',
  edition: 'en-sahih-international',
};

const _2_263 = {
  arabic: 'قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ مِّن صَدَقَةٍ يَتْبَعُهَا أَذًى ۗ وَاللَّهُ غَنِيٌّ حَلِيمٌ',
  transliteration: 'Qawlun ma\'rufun wa maghfiratun khayrun min sadaqatin yatba\'uha adha. Wallahu ghaniyyun halim',
  translation: 'Kind speech and forgiveness are better than charity followed by injury. And Allah is Free of need and Forbearing.',
  source: 'Al-Baqarah 2:263',
  edition: 'en-sahih-international',
};

const _2_286 = {
  arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
  transliteration: 'La yukallifullahu nafsan illa wus\'aha. Laha ma kasabat wa \'alayha maktasabat. Rabbana la tu\'akhidhna in nasina aw akhta\'na. Rabbana wa la tahmil \'alayna isran kama hamaltahu \'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa\'fu \'anna waghfir lana warhamna. Anta mawlana fansurna \'alal-qawmil-kafirin',
  translation: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _3_103 = {
  arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا ۚ وَاذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ إِذْ كُنتُمْ أَعْدَاءً فَأَلَّفَ بَيْنَ قُلُوبِهِمْ فَأَصْبَحْتُم بِنِعْمَتِهِ إِخْوَانًا وَكُنتُمْ عَلَىٰ شَفَا حُفْرَةٍ مِّنَ النَّارِ فَأَنقَذَكُم مِّنْهَا ۗ كَذَٰلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ لَعَلَّكُمْ تَهْتَدُونَ',
  transliteration: 'Wa\'tasimu bihablillahi jami\'an wa la tafarraqu. Wadhkuru ni\'matallahi \'alaykum idh kuntum a\'da\'an fa allafa bayna qulubikum fa asbahtum bini\'matihi ikhwana. Wa kuntum \'ala shafa hufratin minan-nari fa anqadhakum minha. Kadhalika yubayyinullahu lakum ayatihi la\'allakum tahtadun',
  translation: 'And hold firmly to the rope of Allah all together and do not become divided. And remember the favor of Allah upon you - when you were enemies and He brought your hearts together and you became, by His favor, brothers. And you were on the edge of a pit of the Fire, and He saved you from it. Thus does Allah make clear to you His verses that you may be guided.',
  source: 'Al \'Imran 3:103',
  edition: 'en-sahih-international',
};

const _3_159 = {
  arabic: 'فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ ۖ فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
  transliteration: 'Fabima rahmatin minallahi linta lahum. Wa law kunta fazhzhan ghalidhal-qalbi lanfaddhu min hawlik. Fa\'fu \'anhum wastaghfir lahum wa shawirhum fil-amr. Fa idha \'azamta fatawakkal \'alallah. Innallaha yuhibbul-mutawakkilin',
  translation: 'So by mercy from Allah, [O Muhammad], you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you. So pardon them and ask forgiveness for them and consult them in the matter. And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].',
  source: 'Al \'Imran 3:159',
  edition: 'en-sahih-international',
};

const _4_36 = {
  arabic: 'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا',
  transliteration: 'Wa\'budullaha wa la tushrik bihi shay\'a. Wa bil-walidayni ihsanan wa bidhil-qurba wal-yatama wal-masakini wal-jari dhil-qurba wal-jaril-junubi was-sahibi bil-janbi wabnis-sabili wa ma malakat aymanukum. Innallaha la yuhibbu man kana mukhtalan fakhura',
  translation: 'Worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess. Indeed, Allah does not like those who are self-deluding and boastful.',
  source: 'An-Nisa\' 4:36',
  edition: 'en-sahih-international',
};

const _4_114 = {
  arabic: 'لَّا خَيْرَ فِي كَثِيرٍ مِّن نَّجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ ۚ وَمَن يَفْعَلْ ذَٰلِكَ ابْتِغَاءَ مَرْضَاتِ اللَّهِ فَسَوْفَ نُؤْتِيهِ أَجْرًا عَظِيمًا',
  transliteration: 'La khayra fi kathirin min najwahum illa man amara bisadaqatin aw ma\'rufin aw islahin baynan-nas. Wa man yaf\'al dhalika ibtighaa\' mardatillahi fasawfa nu\'tihi ajran \'adhima',
  translation: 'No good is there in much of their private conversation, except for those who enjoin charity or that which is right or conciliation between people. And whoever does that seeking means to the approval of Allah - then We are going to give him a great reward.',
  source: 'An-Nisa\' 4:114',
  edition: 'en-sahih-international',
};

const _5_2 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحِلُّوا شَعَائِرَ اللَّهِ وَلَا الشَّهْرَ الْحَرَامَ وَلَا الْهَدْيَ وَلَا الْقَلَائِدَ وَلَا آمِّينَ الْبَيْتَ الْحَرَامَ يَبْتَغُونَ فَضْلًا مِّن رَّبِّهِمْ وَرِضْوَانًا ۚ وَإِذَا حَلَلْتُمْ فَاصْطَادُوا ۚ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ أَن صَدُّوكُمْ عَنِ الْمَسْجِدِ الْحَرَامِ أَن تَعْتَدُوا ۘ وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ ۚ وَاتَّقُوا اللَّهَ ۖ إِنَّ اللَّهَ شَدِيدُ الْعِقَابِ',
  transliteration: 'Ya ayyuhal-ladhina amanu la tuhillu sha\'a\'irallahi wa lash-shahral-harama wa lal-hadya wa lal-qala\'ida wa la amminnal-baytal-harama yabtaghuna fadlan min rabbihim wa ridwana. Wa idha halaltum fastaadu. Wa la yajrimannakum shana\'anu qawmin an saddukum \'anil-masjidil-harami an ta\'tadu. Wa ta\'awanu \'alal-birri wat-taqwa wa la ta\'awanu \'alal-ithmi wal-\'udwan. Wattaqullaha innallaha shadidul-\'iqab',
  translation: 'O you who have believed, do not violate the rites of Allah or [the sanctity of] the sacred month or [neglect the marking of] the sacrificial animals and garlanding [them] or [violate the safety of] those coming to the Sacred House seeking bounty from their Lord and [His] approval. But when you come out of ihram, then [you may] hunt. And do not let the hatred of a people for having obstructed you from al-Masjid al-Haram lead you to transgress. And cooperate in righteousness and piety, but do not cooperate in sin and aggression. And fear Allah; indeed, Allah is severe in penalty.',
  source: 'Al-Ma\'idah 5:2',
  edition: 'en-sahih-international',
};

const _7_56 = {
  arabic: 'وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا ۚ إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
  transliteration: 'Wa la tufsidu fil-ardi ba\'da islahiha wad\'uhu khawfan wa tama\'a. Inna rahmatallahi qaribun minal-muhsinin',
  translation: 'And cause not corruption upon the earth after its reformation. And invoke Him in fear and aspiration. Indeed, the mercy of Allah is near to the doers of good.',
  source: 'Al-A\'raf 7:56',
  edition: 'en-sahih-international',
};

const _7_199 = {
  arabic: 'خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ وَأَعْرِضْ عَنِ الْجَاهِلِينَ',
  transliteration: 'Khudhil-\'afwa wa\'mur bil-\'urfi wa a\'rid \'anil-jahilin',
  translation: 'Take what is given freely, enjoin what is good, and turn away from the ignorant.',
  source: 'Al-A\'raf 7:199',
  edition: 'en-sahih-international',
};

const _8_46 = {
  arabic: 'وَأَطِيعُوا اللَّهَ وَرَسُولَهُ وَلَا تَنَازَعُوا فَتَفْشَلُوا وَتَذْهَبَ رِيحُكُمْ ۖ وَاصْبِرُوا ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
  transliteration: 'Wa ati\'ullaha wa rasulahu wa la tanaza\'u fatafshaluwa tadhdhaba rihukum. Wasbiru. Innallaha ma\'as-sabirin',
  translation: 'And obey Allah and His Messenger, and do not dispute and [thus] lose courage and [then] your strength would depart; and be patient. Indeed, Allah is with the patient.',
  source: 'Al-Anfal 8:46',
  edition: 'en-sahih-international',
};

const _8_63 = {
  arabic: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ',
  transliteration: 'Wa allafa bayna qulubihim. Law anfaqta ma fil-ardi jami\'an ma allafta bayna qulubihim wa lakinnallaha allafa baynahum. Innahu \'azizun hakim',
  translation: 'And brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.',
  source: 'Al-Anfal 8:63',
  edition: 'en-sahih-international',
};

const _9_71 = {
  arabic: 'وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ ۚ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ وَيُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَيُطِيعُونَ اللَّهَ وَرَسُولَهُ ۚ أُولَٰئِكَ سَيَرْحَمُهُمُ اللَّهُ ۗ إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ',
  transliteration: 'Wal-mu\'minuna wal-mu\'minatu ba\'duhum awliya\'u ba\'d. Ya\'muruna bil-ma\'rufi wa yanhawna \'anil-munkari wa yuqimunas-salata wa yu\'tunaz-zakata wa yuti\'unallaha wa rasulah. Ula\'ika sayarhamuhumullah. Innallaha \'azizun hakim',
  translation: 'The believing men and believing women are allies of one another. They enjoin what is right and forbid what is wrong and establish prayer and give zakah and obey Allah and His Messenger. Those - Allah will have mercy upon them. Indeed, Allah is Exalted in Might and Wise.',
  source: 'At-Tawbah 9:71',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  transliteration: 'Alladhina amanu wa tatma\'innu qulubuhum bidhikrillah. Ala bidhikrillahi tatma\'innul-qulub',
  translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
  source: 'Ar-Ra\'d 13:28',
  edition: 'en-sahih-international',
};

const _15_47 = {
  arabic: 'وَنَزَعْنَا مَا فِي صُدُورِهِم مِّنْ غِلٍّ إِخْوَانًا عَلَىٰ سُرُرٍ مُّتَقَابِلِينَ',
  transliteration: 'Wa naza\'na ma fi sudurihim min ghillin ikhwanan \'ala sururin mutaqabilin',
  translation: 'And We will remove whatever is in their breasts of resentment, [so they will be] brothers, on thrones facing each other.',
  source: 'Al-Hijr 15:47',
  edition: 'en-sahih-international',
};

const _16_90 = {
  arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ',
  transliteration: 'Innallaha ya\'muru bil-\'adli wal-ihsani wa ita\'i dhil-qurba wa yanha \'anil-fahsha\'i wal-munkari wal-baghyi. Ya\'idhukum la\'allakum tadhakkarun',
  translation: 'Indeed, Allah orders justice and good conduct and giving [help] to relatives and forbids immorality and bad conduct and oppression. He admonishes you that perhaps you will be reminded.',
  source: 'An-Nahl 16:90',
  edition: 'en-sahih-international',
};

const _17_28 = {
  arabic: 'وَإِمَّا تُعْرِضَنَّ عَنْهُمُ ابْتِغَاءَ رَحْمَةٍ مِّن رَّبِّكَ تَرْجُوهَا فَقُل لَّهُمْ قَوْلًا مَّيْسُورًا',
  transliteration: 'Wa imma tu\'ridanna \'anhumub-tighaa\'a rahmatin min rabbika tarjuha faqul lahum qawlan maysura',
  translation: 'And if you [must] turn away from them [i.e., the needy] awaiting mercy from your Lord which you expect, then speak to them a gentle word.',
  source: 'Al-Isra\' 17:28',
  edition: 'en-sahih-international',
};

const _20_44 = {
  arabic: 'فَقُولَا لَهُ قَوْلًا لَّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ',
  transliteration: 'Faqula lahu qawlan layyinan la\'allahu yatadhakkaru aw yakhsha',
  translation: 'And speak to him with gentle speech that perhaps he may be reminded or fear [Allah].',
  source: 'Ta-Ha 20:44',
  edition: 'en-sahih-international',
};

const _22_24 = {
  arabic: 'وَهُدُوا إِلَى الطَّيِّبِ مِنَ الْقَوْلِ وَهُدُوا إِلَىٰ صِرَاطِ الْحَمِيدِ',
  transliteration: 'Wa hudu ilat-tayyibi minal-qawli wa hudu ila siratil-hamid',
  translation: 'And they had been guided [in worldly life] to good speech, and they were guided to the path of the Praiseworthy.',
  source: 'Al-Hajj 22:24',
  edition: 'en-sahih-international',
};

const _24_22 = {
  arabic: 'وَلَا يَأْتَلِ أُولُو الْفَضْلِ مِنكُمْ وَالسَّعَةِ أَن يُؤْتُوا أُولِي الْقُرْبَىٰ وَالْمَسَاكِينَ وَالْمُهَاجِرِينَ فِي سَبِيلِ اللَّهِ ۖ وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ ۗ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
  transliteration: 'Wa la ya\'tali ulul-fadli minkum was-sa\'ati an yu\'tu ulil-qurba wal-masakina wal-muhajarina fi sabilillah. Wal-ya\'fu wal-yasfahhu. Ala tuhibbuna an yaghfirallahu lakum. Wallahu ghafurun rahim',
  translation: 'And let not those of virtue among you and wealth swear not to give [aid] to their relatives and the needy and the emigrants for the cause of Allah, and let them pardon and overlook. Would you not like that Allah should forgive you? And Allah is Forgiving and Merciful.',
  source: 'An-Nur 24:22',
  edition: 'en-sahih-international',
};

const _25_63 = {
  arabic: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا',
  transliteration: 'Wa \'ibadur-rahmanilladhina yamshuna \'alal-ardi hawnan wa idha khatabahumul-jahiluna qalu salama',
  translation: 'And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace.',
  source: 'Al-Furqan 25:63',
  edition: 'en-sahih-international',
};

const _30_7 = {
  arabic: 'يَعْلَمُونَ ظَاهِرًا مِّنَ الْحَيَاةِ الدُّنْيَا وَهُمْ عَنِ الْآخِرَةِ هُمْ غَافِلُونَ',
  transliteration: 'Ya\'lamuna dhahiran minal-hayatid-dunya wa hum \'anil-akhirati hum ghafilun',
  translation: 'They know what is apparent of the worldly life, but they, of the Hereafter, are unaware.',
  source: 'Ar-Rum 30:7',
  edition: 'en-sahih-international',
};

const _31_18 = {
  arabic: 'وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
  transliteration: 'Wa la tusa\'\'ir khaddaka linnas wa la tamshi fil-ardi maraha. Innallaha la yuhibbu kulla mukhtalin fakhur',
  translation: 'And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful.',
  source: 'Luqman 31:18',
  edition: 'en-sahih-international',
};

const _39_53 = {
  arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
  transliteration: 'Qul ya \'ibadiyalladhina asrafu \'ala anfusihim la taqnatu min rahmatillah. Innallaha yaghfirudh-dhunuba jami\'a. Innahu huwal-ghafurur-rahim',
  translation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
  source: 'Az-Zumar 39:53',
  edition: 'en-sahih-international',
};

const _41_34 = {
  arabic: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
  transliteration: 'Wa la tastawil-hasanatu wa las-sayyi\'ah. Idfa\' billati hiya ahsanu fa idhal-ladhi baynaka wa baynahu \'adawatun ka\'annahu waliyyun hamim',
  translation: 'And not equal are the good deed and the bad. Repel [evil] by that [deed] which is better; and thereupon, the one whom between you and him is enmity [will become] as though he was a devoted friend.',
  source: 'Fussilat 41:34',
  edition: 'en-sahih-international',
};

const _42_38 = {
  arabic: 'وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
  transliteration: 'Walladhinas-tajabu lirabbihim wa aqamus-salata wa amruhum shura baynahum wa mimma razaqnahum yunfiqun',
  translation: 'And those who have responded to their Lord and established prayer and whose affair is [determined by] consultation among themselves, and from what We have provided them, they spend.',
  source: 'Ash-Shura 42:38',
  edition: 'en-sahih-international',
};

const _48_4 = {
  arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ ۗ وَلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا',
  transliteration: 'Huwal-ladhi anzalas-sakinata fi qulubil-mu\'minina liyazdadu imanan ma\'a imanihim. Wa lillahi junudus-samawati wal-ard. Wa kanallahu \'aliman hakima',
  translation: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their [present] faith. And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Knowing and Wise.',
  source: 'Al-Fath 48:4',
  edition: 'en-sahih-international',
};

const _49_10 = {
  arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ',
  transliteration: 'Innamal-mu\'minuna ikhwatun fa aslihu bayna akhawaykum. Wattaqullaha la\'allakum turhamun',
  translation: 'The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.',
  source: 'Al-Hujurat 49:10',
  edition: 'en-sahih-international',
};

const _49_11 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ وَلَا نِسَاءٌ مِّن نِّسَاءٍ عَسَىٰ أَن يَكُنَّ خَيْرًا مِّنْهُنَّ ۖ وَلَا تَلْمِزُوا أَنفُسَكُمْ وَلَا تَنَابَزُوا بِالْأَلْقَابِ ۖ بِئْسَ الِاسْمُ الْفُسُوقُ بَعْدَ الْإِيمَانِ ۚ وَمَن لَّمْ يَتُبْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ',
  transliteration: 'Ya ayyuhal-ladhina amanu la yaskhar qawmun min qawmin \'asa an yakunu khayran minhum wa la nisa\'un min nisa\'in \'asa an yakunna khayran minhunna. Wa la talmizu anfusakum wa la tanabazu bil-alqab. Bi\'sal-ismu al-fusuqu ba\'dal-iman. Wa man lam yatub fa ula\'ika humudh-dhalimun',
  translation: 'O you who have believed, let not a people ridicule [another] people; perhaps they may be better than them; nor let women ridicule [other] women; perhaps they may be better than them. And do not insult one another and do not call each other by [offensive] nicknames. Wretched is the name [i.e., mention] of disobedience after [one\'s] faith. And whoever does not repent - then it is those who are the wrongdoers.',
  source: 'Al-Hujurat 49:11',
  edition: 'en-sahih-international',
};

const _49_12 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ',
  transliteration: 'Ya ayyuhal-ladhina amanu-jtanibu kathiran minazh-zhanni inna ba\'dadh-dhanni ithm. Wa la tajassasu wa la yaghtab ba\'dukum ba\'da. Ayuhibbu ahadukum an ya\'kula lahma akhihi maytan fakarihtumuh. Wattaqullaha innallaha tawwabun rahim',
  translation: 'O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin. And do not spy or backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it. And fear Allah; indeed, Allah is Accepting of Repentance and Merciful.',
  source: 'Al-Hujurat 49:12',
  edition: 'en-sahih-international',
};

const _49_13 = {
  arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
  transliteration: 'Ya ayyuhan-nasu inna khalaqnakum min dhakarin wa untha wa ja\'alnakum shu\'uban wa qaba\'ila lita\'arafu. Inna akramakum \'indallahi atqakum. Innallaha \'alimun khabir',
  translation: 'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you. Indeed, Allah is Knowing and Aware.',
  source: 'Al-Hujurat 49:13',
  edition: 'en-sahih-international',
};

const _50_22 = {
  arabic: 'لَّقَدْ كُنتَ فِي غَفْلَةٍ مِّنْ هَٰذَا فَكَشَفْنَا عَنكَ غِطَاءَكَ فَبَصَرُكَ الْيَوْمَ حَدِيدٌ',
  transliteration: 'Laqad kunta fi ghaflatin min hadha fakashafna \'anka ghita\'aka fabasaruka al-yawma hadid',
  translation: 'You were certainly in unmindfulness of this, and We have removed from you your cover, so your sight, this Day, is sharp.',
  source: 'Qaf 50:22',
  edition: 'en-sahih-international',
};

const _59_9 = {
  arabic: 'وَالَّذِينَ تَبَوَّءُوا الدَّارَ وَالْإِيمَانَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِي صُدُورِهِمْ حَاجَةً مِّمَّا أُوتُوا وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
  transliteration: 'Walladhina tabawwa\'ud-dara wal-imana min qablihim yuhibbuna man hajara ilayhim wa la yajiduna fi sudurihim hajatan mimma utu wa yu\'thiruna \'ala anfusihim wa law kana bihim khasasah. Wa man yuqa shuhha nafsihi fa ula\'ika humul-muflihun',
  translation: 'And [also for] those who were settled in the Home [i.e., al-Madinah] and [adopted] the faith before them. They love those who emigrated to them and find not any want in their breasts of what they [i.e., the emigrants] were given but give [them] preference over themselves, even though they are in privation. And whoever is protected from the stinginess of his soul - it is those who will be the successful.',
  source: 'Al-Hashr 59:9',
  edition: 'en-sahih-international',
};

const _60_7 = {
  arabic: 'عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً ۚ وَاللَّهُ قَدِيرٌ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
  transliteration: '\'Asallahu an yaj\'ala baynakum wa baynal-ladhina \'adaytum minhum mawaddah. Wallahu qadir. Wallahu ghafurun rahim',
  translation: 'Perhaps Allah will put, between you and those to whom you have been enemies among them, affection. And Allah is competent, and Allah is Forgiving and Merciful.',
  source: 'Al-Mumtahanah 60:7',
  edition: 'en-sahih-international',
};

const _76_8 = {
  arabic: 'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا',
  transliteration: 'Wa yut\'imunat-ta\'ama \'ala hubbihi miskinan wa yatiman wa asira',
  translation: 'And they give food in spite of love for it to the needy, the orphan, and the captive.',
  source: 'Al-Insan 76:8',
  edition: 'en-sahih-international',
};

const _90_17 = {
  arabic: 'ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ',
  transliteration: 'Thumma kana minal-ladhina amanu wa tawasaw bis-sabri wa tawasaw bil-marhamah',
  translation: 'And then being among those who believed and advised one another to patience and advised one another to compassion.',
  source: 'Al-Balad 90:17',
  edition: 'en-sahih-international',
};

const _94_5_6 = {
  arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  transliteration: 'Fa inna ma\'al-\'usri yusra. Inna ma\'al-\'usri yusra',
  translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
  source: 'Ash-Sharh 94:5-6',
  edition: 'en-sahih-international',
};

const _107_7 = {
  arabic: 'وَيَمْنَعُونَ الْمَاعُونَ',
  transliteration: 'Wa yamna\'unal-ma\'un',
  translation: 'And withhold [simple] assistance.',
  source: 'Al-Ma\'un 107:7',
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_COMMUNITY = {

  // ═══ ALL YES — proceed ═══
  '111111': null,


  // ═══ ONE ZERO (6) — single gap ═══

  // L1 off: not engaged with anyone's reality
  '011111': { ..._4_36,
    framing: 'I need to see the specific people around me before I can truly be here.' },

  // L2 off: responding to roles and appearances
  '101111': { ..._49_12,
    framing: 'I am staying on surfaces — there is more beneath what I see than I have acknowledged.' },

  // L3 off: difference producing judgment or withdrawal
  '110111': { ..._49_13,
    framing: 'I was made to know what is different, not to withdraw from it.' },

  // L4 off: here for what I can receive
  '111011': { ..._59_9,
    framing: 'I came for what I could receive, but this space asks me to give first.' },

  // J1 off: private interest driving
  '111101': { ..._42_38,
    framing: 'I have not yet found the shared centre that holds us together.' },

  // J2 off: carrying division into this space
  '111110': { ..._4_114,
    framing: 'I am carrying something into this space that does not build — it fragments.' },


  // ═══ TWO ZEROS (15) ═══

  // — Two Al-Latif zeros, both Al-Jami' present —

  // L1+L2 off: not seeing anyone + responding to surfaces
  '001111': { ..._50_22,
    framing: 'I have not yet lifted the covering over my perception of the people here.' },

  // L1+L3 off: not seeing + difference divides
  '010111': { ..._31_18,
    framing: 'I am turning away from people rather than toward them.' },

  // L1+L4 off: not seeing + extracting
  '011011': { ..._107_7,
    framing: 'I arrived without genuine attention and without bringing anything to offer.' },

  // L2+L3 off: surfaces + difference divides
  '100111': { ..._49_11,
    framing: 'I am reading surfaces and letting what I see there divide me from others.' },

  // L2+L4 off: surfaces + extracting
  '101011': { ..._30_7,
    framing: 'I know only what is apparent here, and I came for what I could take.' },

  // L3+L4 off: difference + extracting
  '110011': { ..._41_34,
    framing: 'Difference is producing distance and I came here to receive, not to give.' },

  // — Both Al-Jami' zeros, all Al-Latif present — CORNER
  // J1+J2 off: private interest + carrying division (perception present, unity absent)
  '111100': { ..._8_46,
    framing: 'I see these people clearly, but I have not found what holds us together.' },

  // — Cross-attribute zeros (one L + one J) —

  // L1+J1 off: not seeing + private interest
  '011101': { ..._9_71,
    framing: 'I have not seen anyone yet and my own needs are leading me here.' },

  // L1+J2 off: not seeing + carrying division
  '011110': { ..._7_56,
    framing: 'I have not engaged with anyone, and what I carry here does not build.' },

  // L2+J1 off: surfaces + private interest
  '101101': { ..._22_24,
    framing: 'I am responding to surfaces and my own purposes are driving this engagement.' },

  // L2+J2 off: surfaces + carrying division
  '101110': { ..._16_90,
    framing: 'I see only what is visible and I bring something that divides into this space.' },

  // L3+J1 off: difference + private interest
  '110101': { ..._60_7,
    framing: 'Difference is creating distance and my needs are leading — not the community\'s.' },

  // L3+J2 off: difference + carrying division
  '110110': { ..._49_10,
    framing: 'Difference is dividing me and I carry that division into this shared space.' },

  // L4+J1 off: extracting + private interest
  '111001': { ..._76_8,
    framing: 'I came to receive and my own interest is driving — not the shared whole.' },

  // L4+J2 off: extracting + carrying division
  '111010': { ..._2_263,
    framing: 'I came to take, and what I carry into this space may cause harm.' },


  // ═══ THREE ZEROS (20) ═══

  // — Three Al-Latif zeros, both Al-Jami' present —

  // L1+L2+L3 off (only L4 present): not seeing + surfaces + difference
  '000111': { ..._25_63,
    framing: 'I am barely present — walking through people without truly seeing any of them.' },

  // L1+L2+L4 off (only L3 present): not seeing + surfaces + extracting
  '001011': { ..._17_28,
    framing: 'I have not arrived yet — not seeing, not going deeper, not giving.' },

  // L1+L3+L4 off (only L2 present): not seeing + difference + extracting
  '010011': { ..._90_17,
    framing: 'I am not yet among those who see, hold space, and give to this community.' },

  // L2+L3+L4 off (only L1 present): surfaces + difference + extracting
  '100011': { ..._7_199,
    framing: 'I carry curiosity but respond to surfaces, let difference divide, and came to take.' },

  // — Two Al-Latif zeros + J1 absent, J2 present —

  // L1+L2+J1 off: not seeing + surfaces + private interest
  '001101': { ..._48_4,
    framing: 'I am not seeing anyone, not going deeper, and my needs are driving me.' },

  // L1+L3+J1 off: not seeing + difference + private interest
  '010101': { ..._5_2,
    framing: 'I am not seeing people, difference divides me, and my interest is leading.' },

  // L1+L4+J1 off: not seeing + extracting + private interest
  '011001': { ..._20_44,
    framing: 'I have not seen anyone and came for myself — gentleness would open this.' },

  // L2+L3+J1 off: surfaces + difference + private interest
  '100101': { ..._3_159,
    framing: 'I am at the surface, difference divides, and my interest leads — not mercy.' },

  // L2+L4+J1 off: surfaces + extracting + private interest
  '101001': { ..._2_177,
    framing: 'I move through surfaces, came to receive, and my needs are leading.' },

  // L3+L4+J1 off: difference + extracting + private interest
  '110001': { ..._94_5_6,
    framing: 'Difference distances me, I came to receive, and my needs are leading — ease is near.' },

  // — Two Al-Latif zeros + J2 absent, J1 present —

  // L1+L2+J2 off: not seeing + surfaces + carrying division
  '001110': { ..._13_28,
    framing: 'I have not arrived in my perception, and I carry unrest into this space.' },

  // L1+L3+J2 off: not seeing + difference + carrying division
  '010110': { ..._8_63,
    framing: 'I have not engaged, difference divides, and I bring fragmentation here.' },

  // L1+L4+J2 off: not seeing + extracting + carrying division
  '011010': { ..._24_22,
    framing: 'I have not arrived with attention or gift, and what I carry divides.' },

  // L2+L3+J2 off: surfaces + difference + carrying division
  '100110': { ..._15_47,
    framing: 'I respond to surfaces, let difference divide, and carry resentment with me.' },

  // L2+L4+J2 off: surfaces + extracting + carrying division
  '101010': { ..._39_53,
    framing: 'I see only what is apparent, came to take, and carry division — mercy covers this.' },

  // L3+L4+J2 off: difference + extracting + carrying division
  '110010': { ..._2_286,
    framing: 'Difference distances me, I came to take, and I carry division — I am not asked for more.' },

  // — One Al-Latif zero + both Al-Jami' absent —

  // L1+J1+J2 off: not seeing + both unity absent
  '011100': { ..._9_71,
    framing: 'I have not seen anyone, and nothing orients me toward what we share.' },

  // L2+J1+J2 off: surfaces + both unity absent
  '101100': { ..._22_24,
    framing: 'I see only roles, my interest leads, and I carry no orientation toward the whole.' },

  // L3+J1+J2 off: difference + both unity absent
  '110100': { ..._60_7,
    framing: 'Difference divides me, my interest leads, and nothing orients me toward unity.' },

  // L4+J1+J2 off: extracting + both unity absent
  '111000': { ..._59_9,
    framing: 'I see everyone but came for myself, and nothing holds me to the shared centre.' },


  // ═══ FOUR ZEROS (15) ═══

  // — All Al-Latif absent, both Al-Jami' present — CORNER
  '000011': { ..._2_177,
    framing: 'I love the idea of community more than the people within it — righteousness is specific.' },

  // — Three Al-Latif zeros + J1 absent, J2 present —

  // L1+L2+L3+J1 off (only L4+J2): not seeing three ways + private interest
  '000101': { ..._25_63,
    framing: 'I give and build cohesion, but I have not truly seen anyone or gone beneath surfaces.' },

  // L1+L2+L4+J1 off (only L3+J2): not seeing + surfaces + extracting + private interest
  '001001': { ..._48_4,
    framing: 'I hold space for difference and build cohesion, but almost nothing else is present yet.' },

  // L1+L3+L4+J1 off (only L2+J2): not seeing + difference + extracting + private interest
  '010001': { ..._5_2,
    framing: 'I go deeper and contribute to cohesion, but I am blind to the rest — cooperate in good.' },

  // L2+L3+L4+J1 off (only L1+J2): surfaces + difference + extracting + private interest
  '100001': { ..._7_199,
    framing: 'I carry curiosity and cohesion, but surfaces, difference, and self-interest consume me.' },

  // — Three Al-Latif zeros + J2 absent, J1 present —

  // L1+L2+L3+J2 off (only L4+J1): not seeing three ways + carrying division
  '000110': { ..._13_28,
    framing: 'I give and orient toward the centre, but I see no one and carry division — hearts need rest.' },

  // L1+L2+L4+J2 off (only L3+J1): not seeing + surfaces + extracting + division
  '001010': { ..._17_28,
    framing: 'I hold space and orient toward the whole, but almost nothing else has arrived — speak gently.' },

  // L1+L3+L4+J2 off (only L2+J1): not seeing + difference + extracting + division
  '010010': { ..._90_17,
    framing: 'I go deeper and orient toward the centre, but I carry too much that divides — patience and compassion.' },

  // L2+L3+L4+J2 off (only L1+J1): surfaces + difference + extracting + division
  '100010': { ..._15_47,
    framing: 'I carry curiosity and orient toward the whole, but resentment fills much of the rest.' },

  // — Two Al-Latif zeros + both Al-Jami' absent —

  // L1+L2+J1+J2 off: not seeing + surfaces + both unity absent
  '001100': { ..._50_22,
    framing: 'I see nothing clearly and nothing holds me to the centre — a deep veil remains.' },

  // L1+L3+J1+J2 off: not seeing + difference + both unity absent
  '010100': { ..._31_18,
    framing: 'I turn away, difference divides me, and nothing orients me toward the whole.' },

  // L1+L4+J1+J2 off: not seeing + extracting + both unity absent
  '011000': { ..._107_7,
    framing: 'I brought neither perception nor gift, and the shared centre has not found me.' },

  // L2+L3+J1+J2 off: surfaces + difference + both unity absent
  '100100': { ..._49_11,
    framing: 'I see only what is apparent, difference distances me, and unity is entirely absent.' },

  // L2+L4+J1+J2 off: surfaces + extracting + both unity absent
  '101000': { ..._30_7,
    framing: 'I know only surfaces, I came to take, and the shared whole is nowhere in me.' },

  // L3+L4+J1+J2 off: difference + extracting + both unity absent
  '110000': { ..._41_34,
    framing: 'Difference distances me, I came to receive, and nothing holds me to the centre.' },


  // ═══ FIVE ZEROS (6) — single quality remains ═══

  // Only J2 remains (contributing to cohesion)
  '000001': { ..._3_103,
    framing: 'I have almost nothing — only a thread of cohesion connects me to this space.' },

  // Only J1 remains (oriented toward shared centre)
  '000010': { ..._8_63,
    framing: 'I orient toward the centre but see no one — only Allah can gather these hearts.' },

  // Only L4 remains (giving rather than extracting)
  '000100': { ..._39_53,
    framing: 'Almost everything is absent but I still came to give — do not despair of mercy.' },

  // Only L3 remains (holding space for difference)
  '001000': { ..._3_159,
    framing: 'Almost everything is absent but I hold space for difference — gentleness is from mercy.' },

  // Only L2 remains (going deeper than visible)
  '010000': { ..._2_286,
    framing: 'Almost everything is absent but I still go deeper — I am not burdened beyond what I bear.' },

  // Only L1 remains (genuine curiosity)
  '100000': { ..._3_103,
    framing: 'I carry a seed of curiosity, but everything else in me is scattered — hold fast.' },


  // ═══ ALL NOT YET — both absent ═══

  '000000': { ..._3_103,
    framing: 'I have arrived in community but brought none of myself — I need to be gathered first.' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupCommunityReadinessAyah(key) {
  return READINESS_AYAT_COMMUNITY[key] || null;
}
