/**
 * OGDEN — Rest Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: As-Salam (The Source of Peace) · Al-Ghaffar (The Repeatedly Forgiving)
 * Row distribution: 4 rows As-Salam (S1–S4) · 2 rows Al-Ghaffar (G1–G2)
 * v1.0 · 2026-04-05
 *
 * Key schema: 6-character binary string
 * Positions: S1 S2 S3 S4 G1 G2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   S1: Mind has set down what it carried vs still running in background
 *   S2: Present in this moment vs planning, anticipating, bracing
 *   S3: Choosing stillness over stimulation vs reaching for distraction
 *   S4: Rest as complete in itself vs rest as instrumental (to perform later)
 *   G1: Entrusted the unfinished to Allah vs guilt about undone
 *   G2: Resting without self-accusation vs rehearsing failures
 *
 * Usage: READINESS_AYAT_REST[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 35 unique ayat across 63 non-null entries (max 2 keys per shared ayah)
 * - All ayat used exactly 1 or 2 times; none exceeds 3
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran(35 ayat, ar-simple-clean),
 *   fetch_translation(35 ayat, en-sahih-international),
 *   search_quran(6 queries), search_tafsir(0)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_286 = {
  arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
  transliteration: 'La yukallifullahu nafsan illa wus\'aha. Laha ma kasabat wa \'alayha maktasabat. Rabbana la tu\'akhidhna in nasina aw akhta\'na. Rabbana wa la tahmil \'alayna isran kama hamaltahu \'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa\'fu \'anna waghfir lana warhamna. Anta mawlana fansurna \'alal-qawmil-kafirin',
  translation: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _4_110 = {
  arabic: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
  transliteration: 'Wa man ya\'mal su\'an aw yazhlim nafsahu thumma yastaghfirillaha yajidillaha ghafuran rahima',
  translation: 'And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah will find Allah Forgiving and Merciful.',
  source: 'An-Nisa\' 4:110',
  edition: 'en-sahih-international',
};

const _6_127 = {
  arabic: 'لَهُمْ دَارُ السَّلَامِ عِندَ رَبِّهِمْ ۖ وَهُوَ وَلِيُّهُم بِمَا كَانُوا يَعْمَلُونَ',
  transliteration: 'Lahum darus-salami \'inda rabbihim wa huwa waliyyuhum bima kanu ya\'malun',
  translation: 'For them will be the Home of Peace with their Lord. And He will be their protecting friend because of what they used to do.',
  source: 'Al-An\'am 6:127',
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: 'وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ',
  transliteration: 'Wadhkur rabbaka fi nafsika tadarru\'an wa khifatan wa dunal-jahri minal-qawli bil-ghuduwwi wal-asal wa la takun minal-ghafilin',
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech - in the mornings and the evenings. And do not be among the heedless.',
  source: 'Al-A\'raf 7:205',
  edition: 'en-sahih-international',
};

const _8_11 = {
  arabic: 'إِذْ يُغَشِّيكُمُ النُّعَاسَ أَمَنَةً مِّنْهُ وَيُنَزِّلُ عَلَيْكُم مِّنَ السَّمَاءِ مَاءً لِّيُطَهِّرَكُم بِهِ وَيُذْهِبَ عَنكُمْ رِجْزَ الشَّيْطَانِ وَلِيَرْبِطَ عَلَىٰ قُلُوبِكُمْ وَيُثَبِّتَ بِهِ الْأَقْدَامَ',
  transliteration: 'Idh yughashshikumun-nu\'asa amanatan minhu wa yunazzilu \'alaykum minas-sama\'i ma\'an liyutahhirakum bihi wa yudhhiba \'ankum rijzash-shaytani wa liyarbita \'ala qulubikum wa yuthabbita bihil-aqdam',
  translation: '[Remember] when He overwhelmed you with drowsiness [giving] security from Him and sent down upon you from the sky, rain by which to purify you and remove from you the evil [suggestions] of Satan and to make steadfast your hearts and plant firmly thereby your feet.',
  source: 'Al-Anfal 8:11',
  edition: 'en-sahih-international',
};

const _9_51 = {
  arabic: 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ',
  transliteration: 'Qul lan yusibana illa ma kataballahu lana huwa mawlana. Wa \'alallahi falyatawakkalil-mu\'minun',
  translation: 'Say, "Never will we be struck except by what Allah has decreed for us; He is our protector." And upon Allah let the believers rely.',
  source: 'At-Tawbah 9:51',
  edition: 'en-sahih-international',
};

const _9_118 = {
  arabic: 'وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ وَضَاقَتْ عَلَيْهِمْ أَنفُسُهُمْ وَظَنُّوا أَن لَّا مَلْجَأَ مِنَ اللَّهِ إِلَّا إِلَيْهِ ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا ۚ إِنَّ اللَّهَ هُوَ التَّوَّابُ الرَّحِيمُ',
  transliteration: 'Wa \'alath-thalathatil-ladhina khullifu hatta idha daqat \'alayhimul-ardu bima rahubat wa daqat \'alayhim anfusuhum wa dhannu an la malja\'a minallahi illa ilayh. Thumma taba \'alayhim liyatubu. Innallaha huwat-Tawwabur-Rahim',
  translation: 'And [He also forgave] the three who were left alone to the point that the earth closed in on them in spite of its vastness and their souls confined them and they were certain that there is no refuge from Allah except in Him. Then He turned to them so they could repent. Indeed, Allah is the Accepting of Repentance, the Merciful.',
  source: 'At-Tawbah 9:118',
  edition: 'en-sahih-international',
};

const _9_129 = {
  arabic: 'فَإِن تَوَلَّوْا فَقُلْ حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
  transliteration: 'Fa in tawallaw faqul hasbiyallahu la ilaha illa Hu. \'Alayhi tawakkaltu wa huwa Rabbul-\'Arshil-\'Adhim',
  translation: 'But if they turn away, say, "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne."',
  source: 'At-Tawbah 9:129',
  edition: 'en-sahih-international',
};

const _10_67 = {
  arabic: 'هُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِتَسْكُنُوا فِيهِ وَالنَّهَارَ مُبْصِرًا ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَسْمَعُونَ',
  transliteration: 'Huwal-ladhi ja\'ala lakumul-layla litaskunu fihi wan-nahara mubsira. Inna fi dhalika la\'ayatin liqawmin yasma\'un',
  translation: 'It is He who made for you the night to rest therein and the day, giving sight. Indeed in that are signs for a people who listen.',
  source: 'Yunus 10:67',
  edition: 'en-sahih-international',
};

const _11_123 = {
  arabic: 'وَلِلَّهِ غَيْبُ السَّمَاوَاتِ وَالْأَرْضِ وَإِلَيْهِ يُرْجَعُ الْأَمْرُ كُلُّهُ فَاعْبُدْهُ وَتَوَكَّلْ عَلَيْهِ ۚ وَمَا رَبُّكَ بِغَافِلٍ عَمَّا تَعْمَلُونَ',
  transliteration: 'Wa lillahi ghaibus-samawati wal-ard. Wa ilayhi yurja\'ul-amru kulluhu fa\'budhu wa tawakkal \'alayh. Wa ma rabbuka bighaflin \'amma ta\'malun',
  translation: 'And to Allah belong the unseen [aspects] of the heavens and the earth and to Him will be returned the matter, all of it, so worship Him and rely upon Him. And your Lord is not unaware of that which you do.',
  source: 'Hud 11:123',
  edition: 'en-sahih-international',
};

const _12_53 = {
  arabic: 'وَمَا أُبَرِّئُ نَفْسِي ۚ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ إِلَّا مَا رَحِمَ رَبِّي ۚ إِنَّ رَبِّي غَفُورٌ رَّحِيمٌ',
  transliteration: 'Wa ma ubarri\'u nafsi. Innan-nafsa la\'ammaratun bis-su\'i illa ma rahima Rabbi. Inna Rabbi Ghafurun Rahim',
  translation: 'And I do not acquit myself. Indeed, the soul is a persistent enjoiner of evil, except those upon which my Lord has mercy. Indeed, my Lord is Forgiving and Merciful.',
  source: 'Yusuf 12:53',
  edition: 'en-sahih-international',
};

const _12_92 = {
  arabic: 'قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ',
  transliteration: 'Qala la tathriba \'alaykumul-yawm. Yaghfirullahu lakum wa huwa arhamur-rahimin',
  translation: 'He said, "No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful."',
  source: 'Yusuf 12:92',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  transliteration: 'Alladhina amanu wa tatma\'innu qulubuhum bi dhikrillah. Ala bi dhikrillahi tatma\'innul-qulub',
  translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
  source: 'Ar-Ra\'d 13:28',
  edition: 'en-sahih-international',
};

const _14_12 = {
  arabic: 'وَمَا لَنَا أَلَّا نَتَوَكَّلَ عَلَى اللَّهِ وَقَدْ هَدَانَا سُبُلَنَا ۚ وَلَنَصْبِرَنَّ عَلَىٰ مَا آذَيْتُمُونَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُتَوَكِّلُونَ',
  transliteration: 'Wa ma lana alla natawakkala \'alallahi wa qad hadana subulana. Wa lanasbiranna \'ala ma adhaitumuna. Wa \'alallahi falyatawakkalil-mutawakkilun',
  translation: 'And why should we not rely upon Allah while He has guided us to our [good] ways. And we will surely be patient against whatever harm you should cause us. And upon Allah let those who would rely [indeed] rely.',
  source: 'Ibrahim 14:12',
  edition: 'en-sahih-international',
};

const _15_56 = {
  arabic: 'قَالَ وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ',
  transliteration: 'Qala wa man yaqnatu min rahmati rabbihi illad-dallun',
  translation: 'He said, "And who despairs of the mercy of his Lord except for those astray?"',
  source: 'Al-Hijr 15:56',
  edition: 'en-sahih-international',
};

const _18_28 = {
  arabic: 'وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ الْحَيَاةِ الدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُ عَن ذِكْرِنَا وَاتَّبَعَ هَوَاهُ وَكَانَ أَمْرُهُ فُرُطًا',
  transliteration: 'Wasbir nafsaka ma\'al-ladhina yad\'una rabbahum bil-ghadati wal-\'ashiyyi yuriduna wajhah. Wa la ta\'du \'aynaka \'anhum turidu zinatal-hayatid-dunya. Wa la tuti\' man aghfalna qalbahu \'an dhikrina wattaba\'a hawahu wa kana amruhu furuta',
  translation: 'And keep yourself patient [by being] with those who call upon their Lord in the morning and the evening, seeking His face. And let not your eyes pass beyond them, desiring adornments of the worldly life, and do not obey one whose heart We have made heedless of Our remembrance and who follows his desire and whose affair is ever [in] neglect.',
  source: 'Al-Kahf 18:28',
  edition: 'en-sahih-international',
};

const _23_62 = {
  arabic: 'وَلَا نُكَلِّفُ نَفْسًا إِلَّا وُسْعَهَا ۖ وَلَدَيْنَا كِتَابٌ يَنطِقُ بِالْحَقِّ ۚ وَهُمْ لَا يُظْلَمُونَ',
  transliteration: 'Wa la nukallifu nafsan illa wus\'aha wa ladayna kitabun yantiqu bil-haqq. Wa hum la yuzhlamun',
  translation: 'And We charge no soul except [with that within] its capacity, and with Us is a record which speaks with truth; and they will not be wronged.',
  source: 'Al-Mu\'minun 23:62',
  edition: 'en-sahih-international',
};

const _24_37 = {
  arabic: 'رِجَالٌ لَّا تُلْهِيهِمْ تِجَارَةٌ وَلَا بَيْعٌ عَن ذِكْرِ اللَّهِ وَإِقَامِ الصَّلَاةِ وَإِيتَاءِ الزَّكَاةِ ۙ يَخَافُونَ يَوْمًا تَتَقَلَّبُ فِيهِ الْقُلُوبُ وَالْأَبْصَارُ',
  transliteration: 'Rijalun la tulhihim tijaratun wa la bay\'un \'an dhikrillahi wa iqamis-salati wa ita\'iz-zakah. Yakhafuna yawman tataqallabu fihil-qulubu wal-absar',
  translation: '[Are] men whom neither commerce nor sale distracts from the remembrance of Allah and performance of prayer and giving of zakah. They fear a Day in which the hearts and eyes will [fearfully] turn about.',
  source: 'An-Nur 24:37',
  edition: 'en-sahih-international',
};

const _25_47 = {
  arabic: 'وَهُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِبَاسًا وَالنَّوْمَ سُبَاتًا وَجَعَلَ النَّهَارَ نُشُورًا',
  transliteration: 'Wa huwal-ladhi ja\'ala lakumul-layla libasan wan-nawma subatan wa ja\'alan-nahara nushura',
  translation: 'And it is He who has made the night for you as clothing and sleep [a means for] rest and has made the day a resurrection.',
  source: 'Al-Furqan 25:47',
  edition: 'en-sahih-international',
};

const _28_73 = {
  arabic: 'وَمِن رَّحْمَتِهِ جَعَلَ لَكُمُ اللَّيْلَ وَالنَّهَارَ لِتَسْكُنُوا فِيهِ وَلِتَبْتَغُوا مِن فَضْلِهِ وَلَعَلَّكُمْ تَشْكُرُونَ',
  transliteration: 'Wa min rahmatihi ja\'ala lakumul-layla wan-nahara litaskunu fihi wa litabtaghu min fadlihi wa la\'allakum tashkurun',
  translation: 'And out of His mercy He made for you the night and the day that you may rest therein and [by day] seek from His bounty and [that] perhaps you will be grateful.',
  source: 'Al-Qasas 28:73',
  edition: 'en-sahih-international',
};

const _30_23 = {
  arabic: 'وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ وَابْتِغَاؤُكُم مِّن فَضْلِهِ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَسْمَعُونَ',
  transliteration: 'Wa min ayatihi manamukum bil-layli wan-nahari wabtigha\'ukum min fadlih. Inna fi dhalika la\'ayatin liqawmin yasma\'un',
  translation: 'And of His signs is your sleep by night and day and your seeking of His bounty. Indeed in that are signs for a people who listen.',
  source: 'Ar-Rum 30:23',
  edition: 'en-sahih-international',
};

const _31_22 = {
  arabic: 'وَمَن يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ ۗ وَإِلَى اللَّهِ عَاقِبَةُ الْأُمُورِ',
  transliteration: 'Wa man yuslim wajhahu ilallahi wa huwa muhsinun faqadistamsaka bil-\'urwatil-wuthqa. Wa ilallahi \'aqibatul-umur',
  translation: 'And whoever submits his face to Allah while he is a doer of good - then he has grasped the most trustworthy handhold. And to Allah will be the outcome of [all] matters.',
  source: 'Luqman 31:22',
  edition: 'en-sahih-international',
};

const _33_3 = {
  arabic: 'وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا',
  transliteration: 'Wa tawakkal \'alallah. Wa kafa billahi wakila',
  translation: 'And rely upon Allah; and sufficient is Allah as Disposer of affairs.',
  source: 'Al-Ahzab 33:3',
  edition: 'en-sahih-international',
};

const _35_35 = {
  arabic: 'الَّذِي أَحَلَّنَا دَارَ الْمُقَامَةِ مِن فَضْلِهِ لَا يَمَسُّنَا فِيهَا نَصَبٌ وَلَا يَمَسُّنَا فِيهَا لُغُوبٌ',
  transliteration: 'Alladhi ahallana daral-muqamati min fadlihi la yamassuna fiha nasabun wa la yamassuna fiha lughub',
  translation: 'He who has settled us in the home of duration out of His bounty. There touches us not in it any fatigue, and there touches us not in it weariness [of mind].',
  source: 'Fatir 35:35',
  edition: 'en-sahih-international',
};

const _39_42 = {
  arabic: 'اللَّهُ يَتَوَفَّى الْأَنفُسَ حِينَ مَوْتِهَا وَالَّتِي لَمْ تَمُتْ فِي مَنَامِهَا ۖ فَيُمْسِكُ الَّتِي قَضَىٰ عَلَيْهَا الْمَوْتَ وَيُرْسِلُ الْأُخْرَىٰ إِلَىٰ أَجَلٍ مُّسَمًّى ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  transliteration: 'Allahu yatawaffal-anfusa hina mawtiha wallati lam tamut fi manamiha fa yumsikul-lati qada \'alayhal-mawta wa yursilul-ukhra ila ajalin musamman. Inna fi dhalika la\'ayatin liqawmin yatafakkarun',
  translation: 'Allah takes the souls at the time of their death, and those that do not die [He takes] during their sleep. Then He keeps those for which He has decreed death and releases the others for a specified term. Indeed in that are signs for a people who give thought.',
  source: 'Az-Zumar 39:42',
  edition: 'en-sahih-international',
};

const _39_53 = {
  arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
  transliteration: 'Qul ya \'ibadiyalladhina asrafu \'ala anfusihim la taqnatu min rahmatillah. Innallaha yaghfirudh-dhunuba jami\'a. Innahu huwal-Ghafurur-Rahim',
  translation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
  source: 'Az-Zumar 39:53',
  edition: 'en-sahih-international',
};

const _42_10 = {
  arabic: 'وَمَا اخْتَلَفْتُمْ فِيهِ مِن شَيْءٍ فَحُكْمُهُ إِلَى اللَّهِ ۚ ذَٰلِكُمُ اللَّهُ رَبِّي عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
  transliteration: 'Wa makhtalaftum fihi min shay\'in fahukmuhu ilallah. Dhalikumullahu Rabbi \'alayhi tawakkaltu wa ilayhi unib',
  translation: 'And in anything over which you disagree - its ruling is [to be referred] to Allah. "That is Allah, my Lord; upon Him I have relied, and to Him I turn back."',
  source: 'Ash-Shura 42:10',
  edition: 'en-sahih-international',
};

const _48_4 = {
  arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ ۗ وَلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا',
  transliteration: 'Huwal-ladhi anzalas-sakinata fi qulubil-mu\'minina liyazdadu imanan ma\'a imanihim. Wa lillahi junudus-samawati wal-ard. Wa kanallahu \'aliman hakima',
  translation: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their [present] faith. And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Knowing and Wise.',
  source: 'Al-Fath 48:4',
  edition: 'en-sahih-international',
};

const _56_89 = {
  arabic: 'فَرَوْحٌ وَرَيْحَانٌ وَجَنَّتُ نَعِيمٍ',
  transliteration: 'Fa rawhun wa rayhanun wa jannatu na\'im',
  translation: 'Then [for him is] rest and bounty and a garden of pleasure.',
  source: 'Al-Waqi\'ah 56:89',
  edition: 'en-sahih-international',
};

const _63_9 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُلْهِكُمْ أَمْوَالُكُمْ وَلَا أَوْلَادُكُمْ عَن ذِكْرِ اللَّهِ ۚ وَمَن يَفْعَلْ ذَٰلِكَ فَأُولَٰئِكَ هُمُ الْخَاسِرُونَ',
  transliteration: 'Ya ayyuhal-ladhina amanu la tulhikum amwalukum wa la awladukum \'an dhikrillah. Wa man yaf\'al dhalika fa ula\'ika humul-khasirun',
  translation: 'O you who have believed, let not your wealth and your children divert you from the remembrance of Allah. And whoever does that - then those are the losers.',
  source: 'Al-Munafiqun 63:9',
  edition: 'en-sahih-international',
};

const _65_3 = {
  arabic: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا',
  transliteration: 'Wa yarzuqhu min haythu la yahtasib. Wa man yatawakkal \'alallahi fa huwa hasbuh. Innallaha balighu amrih. Qad ja\'alallahu likulli shay\'in qadra',
  translation: 'And will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a [decreed] extent.',
  source: 'At-Talaq 65:3',
  edition: 'en-sahih-international',
};

const _66_8 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا عَسَىٰ رَبُّكُمْ أَن يُكَفِّرَ عَنكُمْ سَيِّئَاتِكُمْ وَيُدْخِلَكُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ يَوْمَ لَا يُخْزِي اللَّهُ النَّبِيَّ وَالَّذِينَ آمَنُوا مَعَهُ ۖ نُورُهُمْ يَسْعَىٰ بَيْنَ أَيْدِيهِمْ وَبِأَيْمَانِهِمْ يَقُولُونَ رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
  transliteration: 'Ya ayyuhal-ladhina amanu tubu ilallahi tawbatan nasuha. \'Asa rabbukum an yukaffira \'ankum sayyi\'atikum wa yudkhilakum jannatin tajri min tahtihal-anhar. Yawma la yukhzillahun-nabiyya walladhina amanu ma\'ah. Nuruhum yas\'a bayna aydihim wa bi aymanihim yaquluna Rabbana atmim lana nurana waghfir lana. Innaka \'ala kulli shay\'in qadir',
  translation: 'O you who have believed, repent to Allah with sincere repentance. Perhaps your Lord will remove from you your misdeeds and admit you into gardens beneath which rivers flow on the Day when Allah will not disgrace the Prophet and those who believed with him. Their light will proceed before them and on their right; they will say, "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent."',
  source: 'At-Tahrim 66:8',
  edition: 'en-sahih-international',
};

const _78_9 = {
  arabic: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا',
  transliteration: 'Wa ja\'alna nawmakum subata',
  translation: 'And made your sleep [a means for] rest.',
  source: 'An-Naba\' 78:9',
  edition: 'en-sahih-international',
};

const _89_27_28 = {
  arabic: 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ · ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',
  transliteration: 'Ya ayyatuhan-nafsul-mutma\'innah. Irji\'i ila rabbiki radiyatan mardiyyah',
  translation: '"O reassured soul, return to your Lord, well-pleased and pleasing [to Him]."',
  source: 'Al-Fajr 89:27–28',
  edition: 'en-sahih-international',
};

const _94_5_6 = {
  arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا · إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  transliteration: 'Fa inna ma\'al-\'usri yusra. Inna ma\'al-\'usri yusra',
  translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
  source: 'Ash-Sharh 94:5–6',
  edition: 'en-sahih-international',
};


// ═══════════════════════════════════════════════════════════
// READINESS AYAT MATRIX — 64 entries (63 non-null + 111111)
// Key: S1 S2 S3 S4 G1 G2  (1=YES, 0=NOT YET)
// ═══════════════════════════════════════════════════════════

export const READINESS_AYAT_REST = {

  // ─── ALL YES — proceed ───
  '111111': null,

  // ═══ FOUR CORNERS ═══

  // All NOT YET — deepest return point
  '000000': { ..._13_28,
    framing: 'I have stopped moving but nothing inside me has stopped — my heart needs remembrance first.' },

  // Peace present, forgiveness absent
  '111100': { ..._39_53,
    framing: 'I am genuinely still but guilt has followed me here — I have not given myself permission.' },

  // Forgiveness present, peace absent
  '000011': { ..._89_27_28,
    framing: 'I have permission but I have not yet arrived — my soul is invited to return.' },


  // ═══ SINGLE-ZERO ANCHORS (6) ═══

  // S1 off — mind still running
  '011111': { ..._48_4,
    framing: 'My mind is still running — I need the sakinah that only He can send into my heart.' },

  // S2 off — planning / bracing
  '101111': { ..._65_3,
    framing: 'I am bracing for what comes next instead of receiving this rest — He is sufficient.' },

  // S3 off — reaching for stimulation
  '110111': { ..._7_205,
    framing: 'I am reaching for something to fill the stillness rather than being present within it.' },

  // S4 off — rest as instrumental
  '111011': { ..._30_23,
    framing: 'I am resting to perform later, not as trust — but my sleep itself is a sign from Him.' },

  // G1 off — guilt about undone
  '111101': { ..._2_286,
    framing: 'I carry guilt about what is unfinished — but I was never asked to bear more than I can.' },

  // G2 off — self-judgment
  '111110': { ..._12_53,
    framing: 'I am rehearsing what I should have done differently — my soul accuses and I need His mercy.' },


  // ═══ TWO ZEROS — SAME ATTRIBUTE (As-Salam pairs, 6) ═══

  // S1+S2 off — running + planning
  '001111': { ..._33_3,
    framing: 'My mind runs and I am bracing for what comes next — I need to rely and let go.' },

  // S1+S3 off — running + stimulation
  '010111': { ..._63_9,
    framing: 'My mind runs and I reach for distraction — I cannot let this time be diverted.' },

  // S1+S4 off — running + instrumental
  '011011': { ..._28_73,
    framing: 'My mind runs and I treat rest as a tool — but this rest was made as mercy.' },

  // S2+S3 off — planning + stimulation
  '100111': { ..._24_37,
    framing: 'I am planning and reaching for distraction — neither commerce nor busyness should take this.' },

  // S2+S4 off — planning + instrumental
  '101011': { ..._9_51,
    framing: 'I am planning and resting instrumentally — nothing will strike me except what He has decreed.' },

  // S3+S4 off — stimulation + instrumental
  '110011': { ..._25_47,
    framing: 'I fill the quiet and treat rest as means — sleep was made as covering and as rest.' },


  // ═══ TWO ZEROS — CROSS ATTRIBUTE (8) ═══

  // S1 + G1 off — running + guilt
  '011101': { ..._10_67,
    framing: 'My mind runs and guilt is present — but the night was made for me to find sukun.' },

  // S1 + G2 off — running + self-judgment
  '011110': { ..._94_5_6,
    framing: 'My mind runs and I am judging myself — with this difficulty ease is already here.' },

  // S2 + G1 off — planning + guilt
  '101101': { ..._42_10,
    framing: 'I am planning ahead and guilt holds me — upon Him I rely and to Him I return.' },

  // S2 + G2 off — planning + self-judgment
  '101110': { ..._9_118,
    framing: 'I am bracing and rehearsing failures — my soul feels confined but He turns toward me.' },

  // S3 + G1 off — stimulation + guilt
  '110101': { ..._18_28,
    framing: 'I reach for stimulation and guilt weighs — I want to follow remembrance, not heedlessness.' },

  // S3 + G2 off — stimulation + self-judgment
  '110110': { ..._14_12,
    framing: 'I reach for distraction and sit in judgment — why would I not rely on Him instead?' },

  // S4 + G1 off — instrumental + guilt
  '111001': { ..._23_62,
    framing: 'I rest to perform and guilt is here — I was never charged beyond my capacity.' },

  // S4 + G2 off — instrumental + self-judgment
  '111010': { ..._4_110,
    framing: 'I rest instrumentally and rehearse my failures — seeking His forgiveness, I find Him near.' },


  // ═══ THREE ZEROS (20) ═══

  // --- 3 in As-Salam, 0 in Al-Ghaffar (4) ---

  // S1+S2+S3 off
  '000111': { ..._11_123,
    framing: 'My mind runs, I plan, and I reach for stimulation — I need to worship Him and let go.' },

  // S1+S2+S4 off
  '001011': { ..._31_22,
    framing: 'My mind runs, I plan, and I rest only to recover — let me surrender the outcome to Him.' },

  // S1+S3+S4 off
  '010011': { ..._35_35,
    framing: 'My mind runs, I seek stimulation, and I rest as a tool — He promises rest without weariness.' },

  // S2+S3+S4 off
  '100011': { ..._78_9,
    framing: 'I plan, I fill the quiet, and I rest as a tool — but He made my sleep as sabat.' },

  // --- 2 in As-Salam + 1 in Al-Ghaffar (12) ---

  // S1+S2 off + G1 off
  '001101': { ..._56_89,
    framing: 'My mind runs, I plan, and guilt holds me — rest and bounty are what He promises.' },

  // S1+S2 off + G2 off
  '001110': { ..._9_129,
    framing: 'My mind runs, I plan, and I accuse myself — sufficient for me is Allah alone.' },

  // S1+S3 off + G1 off
  '010101': { ..._39_42,
    framing: 'My mind runs, I reach for distraction, and guilt is here — He holds my soul in sleep.' },

  // S1+S3 off + G2 off
  '010110': { ..._12_92,
    framing: 'My mind runs, I reach for stimulation, and I judge myself — no blame upon me today.' },

  // S1+S4 off + G1 off
  '011001': { ..._6_127,
    framing: 'My mind runs, I rest as a tool, and guilt sits with me — the Home of Peace awaits.' },

  // S1+S4 off + G2 off
  '011010': { ..._66_8,
    framing: 'My mind runs, I rest instrumentally, and I rehearse failures — sincere return is all He asks.' },

  // S2+S3 off + G1 off
  '100101': { ..._8_11,
    framing: 'I plan, I reach for distraction, and guilt weighs — He gave drowsiness itself as security.' },

  // S2+S3 off + G2 off
  '100110': { ..._15_56,
    framing: 'I plan, I reach for distraction, and I judge myself — who despairs of mercy except the lost?' },

  // S2+S4 off + G1 off
  '101001': { ..._48_4,
    framing: 'I plan, I rest only to recover, and guilt holds — I need sakinah before anything else.' },

  // S2+S4 off + G2 off
  '101010': { ..._13_28,
    framing: 'I plan, I rest instrumentally, and I rehearse failures — remembrance is where my heart settles.' },

  // S3+S4 off + G1 off
  '110001': { ..._2_286,
    framing: 'I seek stimulation, rest instrumentally, and guilt is here — I was not asked to bear this alone.' },

  // S3+S4 off + G2 off
  '110010': { ..._30_23,
    framing: 'I fill the quiet, I rest as a tool, and I judge myself — my sleep is His sign.' },

  // --- 1 in As-Salam + 2 in Al-Ghaffar (4) ---

  // S1 off + G1+G2 off
  '011100': { ..._65_3,
    framing: 'My mind is still running while guilt and self-judgment fill this space — He is sufficient.' },

  // S2 off + G1+G2 off
  '101100': { ..._28_73,
    framing: 'I plan ahead and both guilt and judgment hold me — this rest was made from His mercy.' },

  // S3 off + G1+G2 off
  '110100': { ..._7_205,
    framing: 'I reach for distraction while guilt and judgment sit with me — I do not want to be heedless.' },

  // S4 off + G1+G2 off
  '111000': { ..._25_47,
    framing: 'I rest only to recover while guilt and judgment accompany me — sleep was made as rest itself.' },


  // ═══ FOUR ZEROS (14, corner 000011 above) ═══

  // --- 3 in As-Salam + 1 in Al-Ghaffar (8) ---

  // S1+S2+S3 off + G1 off — only S4 and G2 remain
  '000101': { ..._33_3,
    framing: 'Almost no peace is here and guilt weighs — I rely upon Allah and He suffices me.' },

  // S1+S2+S3 off + G2 off — only S4 and G1 remain
  '000110': { ..._42_10,
    framing: 'Almost no peace is here and I judge myself — upon Him I have relied.' },

  // S1+S2+S4 off + G1 off — only S3 and G2 remain
  '001001': { ..._23_62,
    framing: 'I am restless, planning, and resting as a tool while guilt holds — I was not charged beyond capacity.' },

  // S1+S2+S4 off + G2 off — only S3 and G1 remain
  '001010': { ..._94_5_6,
    framing: 'I am restless, planning, and resting instrumentally while judging myself — ease is already woven in.' },

  // S1+S3+S4 off + G1 off — only S2 and G2 remain
  '010001': { ..._9_51,
    framing: 'I am restless, filling quiet, and resting as tool while guilt is here — nothing strikes except His decree.' },

  // S1+S3+S4 off + G2 off — only S2 and G1 remain
  '010010': { ..._63_9,
    framing: 'I am restless, reaching for distraction, resting instrumentally, and judging — do not let this be diverted.' },

  // S2+S3+S4 off + G1 off — only S1 and G2 remain
  '100001': { ..._10_67,
    framing: 'I plan, fill quiet, and rest as tool while guilt remains — the night was made for sukun.' },

  // S2+S3+S4 off + G2 off — only S1 and G1 remain
  '100010': { ..._24_37,
    framing: 'I plan, reach for distraction, and rest as tool while judging myself — true rest is not distracted.' },

  // --- 2 in As-Salam + 2 in Al-Ghaffar (6) ---

  // S1+S2 off + G1+G2 off
  '001100': { ..._39_53,
    framing: 'My mind runs, I plan, and both guilt and judgment hold me — do not despair of His mercy.' },

  // S1+S3 off + G1+G2 off
  '010100': { ..._11_123,
    framing: 'My mind runs, I reach for distraction, guilt and judgment hold — I worship Him and let go.' },

  // S1+S4 off + G1+G2 off
  '011000': { ..._35_35,
    framing: 'My mind runs, I rest to recover, guilt and judgment are present — He promises rest without fatigue.' },

  // S2+S3 off + G1+G2 off
  '100100': { ..._18_28,
    framing: 'I plan, I seek distraction, guilt and judgment hold me — I follow remembrance, not neglect.' },

  // S2+S4 off + G1+G2 off
  '101000': { ..._9_118,
    framing: 'I plan, rest instrumentally, guilt and judgment sit with me — my soul is confined but He turns.' },

  // S3+S4 off + G1+G2 off
  '110000': { ..._31_22,
    framing: 'I fill quiet, rest as tool, guilt and judgment present — I submit this to Allah and hold firm.' },


  // ═══ FIVE ZEROS (6) ═══

  // Only G2 remains (not judging self)
  '000001': { ..._4_110,
    framing: 'Almost nothing is here but I am not judging myself — I seek forgiveness and find Him near.' },

  // Only G1 remains (unfinished entrusted)
  '000010': { ..._12_92,
    framing: 'Almost nothing is here but the unfinished is entrusted — no blame upon me today.' },

  // Only S4 remains (rest as complete)
  '000100': { ..._39_42,
    framing: 'Almost nothing is here but I trust rest as complete — He holds my soul even in sleep.' },

  // Only S3 remains (choosing stillness)
  '001000': { ..._14_12,
    framing: 'Almost nothing is here but I choose stillness over stimulation — why not rely on Him?' },

  // Only S2 remains (present, not planning)
  '010000': { ..._56_89,
    framing: 'Almost nothing is here but I am present, not planning — rest and bounty are His promise.' },

  // Only S1 remains (mind has set down)
  '100000': { ..._8_11,
    framing: 'Almost nothing is here but my mind has set down what it carried — drowsiness as security from Him.' },

};
