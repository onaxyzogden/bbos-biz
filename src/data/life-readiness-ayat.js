/**
 * Maqasid OS — Life Module Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Qawī (The Strong) · Al-Laṭīf (The Subtle, Gentle)
 * Row distribution: 3 rows Al-Qawī (Q1–Q3) · 3 rows Al-Laṭīf (L1–L3)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: Q1 Q2 Q3 L1 L2 L3
 * 1 = YES · 0 = NOT YET
 *
 * Row definitions:
 *   Q1: Entering from an attended foundation vs. running on unacknowledged reserves
 *   Q2: Meeting difficulty honestly vs. managing through without attending to it
 *   Q3: Drawing from a replenished source vs. operating on discipline alone
 *   L1: Present enough to notice what is actually needed vs. proceeding on habit
 *   L2: Attending to body/mind/heart signals vs. overriding them for productivity
 *   L3: Holding those in care with full attentiveness vs. giving them what remains
 *
 * Usage: READINESS_AYAT_LIFE[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - ~38 unique ayat across 63 non-null entries
 * - Dominant themes by row:
 *     Q1=0 → da'f (human weakness), Allah's lightening (4:28, 30:54, 2:286, 8:66, 70:19)
 *     Q2=0 → sabr, musabara, haqq (2:153, 3:200, 16:127, 2:155, 94:5)
 *     Q3=0 → sakan, rahat, tawakkul (28:73, 30:23, 25:47, 33:3)
 *     L1=0 → ghaflah, yaqzah (50:22, 7:205, 59:18, 50:37, 21:1)
 *     L2=0 → self-witness, amanah al-nafs (75:14, 4:29, 7:31, 5:87, 91:7)
 *     L3=0 → haqq, silah, ri'ayah (66:6, 4:36, 4:1, 2:233, 17:26)
 * - Theological poles:
 *     000111 → depletion unacknowledged; attentiveness intact → rest, human limits
 *     111000 → strength sustained; attentiveness absent → Al-Laṭīf, subtle perception
 *     100001 → Q1 met, Q2–L2 not, L3 met → self and its honest responsibilities
 *     011110 → Q1 not met, Q2–L2 met, L3 not → foundational honesty without outer care
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all ≤ 20 words, 1st person, warm muhasabah register
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran (38 ayat, ar-simple-clean),
 *   fetch_translation (38 ayat, en-sahih-international),
 *   search_quran (8 queries)
 */

// ─── Canonical Ayah Data (private) ─────────────────────────────────────────
// Each const holds immutable ayah data; matrix entries spread these
// and add a key-specific `framing` field.

const _4_28 = {
  arabic: 'يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ ۚ وَخُلِقَ الْإِنسَانُ ضَعِيفًا',
  transliteration: "Yuridullahu an yukhaffifa 'ankum. Wa khuliqal-insanu da'ifa",
  translation: 'And Allāh wants to lighten for you [your difficulties]; and mankind was created weak.',
  source: 'An-Nisa 4:28',
  edition: 'en-sahih-international',
};

const _30_54 = {
  arabic: 'اللَّهُ الَّذِي خَلَقَكُم مِّن ضَعْفٍ ثُمَّ جَعَلَ مِن بَعْدِ ضَعْفٍ قُوَّةً ثُمَّ جَعَلَ مِن بَعْدِ قُوَّةٍ ضَعْفًا وَشَيْبَةً ۚ يَخْلُقُ مَا يَشَاءُ ۖ وَهُوَ الْعَلِيمُ الْقَدِيرُ',
  transliteration: "Allahul-ladhi khalaqakum min da'fin thumma ja'ala min ba'di da'fin quwwatan thumma ja'ala min ba'di quwwatin da'fan wa shaybah. Yakhluqu ma yasha'. Wa huwal-'alimul-qadir",
  translation: 'Allāh is the one who created you from weakness, then made after weakness strength, then made after strength weakness and white hair. He creates what He wills, and He is the Knowing, the Competent.',
  source: 'Ar-Rum 30:54',
  edition: 'en-sahih-international',
};

const _2_286 = {
  arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
  transliteration: "La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha maktasabat. Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna. Anta mawlana fansurna 'alal-qawmil-kafirin",
  translation: 'Allāh does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _8_66 = {
  arabic: 'الْآنَ خَفَّفَ اللَّهُ عَنكُمْ وَعَلِمَ أَنَّ فِيكُمْ ضَعْفًا ۚ فَإِن يَكُن مِّنكُم مِّائَةٌ صَابِرَةٌ يَغْلِبُوا مِائَتَيْنِ ۚ وَإِن يَكُن مِّنكُمْ أَلْفٌ يَغْلِبُوا أَلْفَيْنِ بِإِذْنِ اللَّهِ ۗ وَاللَّهُ مَعَ الصَّابِرِينَ',
  transliteration: "Al-ana khaffafallahu 'ankum wa 'alima anna fikum da'fa. Fa'in yakun minkum mi'atun sabiratun yaghlibu mi'atayn. Wa'in yakun minkum alfun yaghlibuu alfayni bi'idhnillah. Wallahu ma'as-sabirin",
  translation: 'Now, Allāh has lightened [the hardship] for you, and He knows that among you is weakness. So if there are from you one hundred [who are] steadfast, they will overcome two hundred. And if there are among you a thousand, they will overcome two thousand by permission of Allāh. And Allāh is with the steadfast.',
  source: 'Al-Anfal 8:66',
  edition: 'en-sahih-international',
};

const _70_19 = {
  arabic: 'إِنَّ الْإِنسَانَ خُلِقَ هَلُوعًا',
  transliteration: "Innal-insana khuliqa halu'a",
  translation: 'Indeed, mankind was created anxious:',
  source: 'Al-Ma\'arij 70:19',
  edition: 'en-sahih-international',
};

const _2_153 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
  transliteration: "Ya ayyuhal-ladhina amanus-ta'inu bis-sabri was-salah. Innallaha ma'as-sabirin",
  translation: 'O you who have believed, seek help through patience and prayer. Indeed, Allāh is with the patient.',
  source: 'Al-Baqarah 2:153',
  edition: 'en-sahih-international',
};

const _3_200 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',
  transliteration: "Ya ayyuhal-ladhina amanus-biru wa sabiru wa rabitu wattaqullaha la'allakum tuflihun",
  translation: 'O you who have believed, persevere and endure and remain stationed and fear Allāh that you may be successful.',
  source: 'Ali \'Imran 3:200',
  edition: 'en-sahih-international',
};

const _16_127 = {
  arabic: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ ۚ وَلَا تَحْزَنْ عَلَيْهِمْ وَلَا تَكُ فِي ضَيْقٍ مِّمَّا يَمْكُرُونَ',
  transliteration: "Wasbir wa ma sabruka illa billah. Wa la tahzan 'alayhim wa la taku fi dayqin mimma yamkurun",
  translation: 'And be patient, and your patience is not but through Allāh. And do not grieve over them and do not be in distress over what they conspire.',
  source: 'An-Nahl 16:127',
  edition: 'en-sahih-international',
};

const _2_155 = {
  arabic: 'وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ',
  transliteration: "Wa lanabluwannakum bishay'in minal-khawfi wal-ju'i wa naqsin minal-amwali wal-anfusi wath-thamarat. Wa bashshiris-sabirin",
  translation: 'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient,',
  source: 'Al-Baqarah 2:155',
  edition: 'en-sahih-international',
};

const _2_156 = {
  arabic: 'الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
  transliteration: "Alladhina idha asabathum musibatun qalu inna lillahi wa inna ilayhi raji'un",
  translation: 'Who, when disaster strikes them, say, "Indeed we belong to Allāh, and indeed to Him we will return."',
  source: 'Al-Baqarah 2:156',
  edition: 'en-sahih-international',
};

const _94_5 = {
  arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
  transliteration: "Fa inna ma'al-'usri yusra",
  translation: 'For indeed, with hardship [will be] ease.',
  source: 'Ash-Sharh 94:5',
  edition: 'en-sahih-international',
};

const _28_73 = {
  arabic: 'وَمِن رَّحْمَتِهِ جَعَلَ لَكُمُ اللَّيْلَ وَالنَّهَارَ لِتَسْكُنُوا فِيهِ وَلِتَبْتَغُوا مِن فَضْلِهِ وَلَعَلَّكُمْ تَشْكُرُونَ',
  transliteration: "Wa min rahmatihi ja'ala lakumul-layla wan-nahara litaskunu fihi wa litabtaghu min fadlihi wa la'allakum tashkurun",
  translation: 'And out of His mercy He made for you the night and the day that you may rest therein and [by day] seek from His bounty and [that] perhaps you will be grateful.',
  source: 'Al-Qasas 28:73',
  edition: 'en-sahih-international',
};

const _30_23 = {
  arabic: 'وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ وَابْتِغَاؤُكُم مِّن فَضْلِهِ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَسْمَعُونَ',
  transliteration: "Wa min ayatihi namaukukum bil-layli wan-nahari wabtighau'ukum min fadlih. Inna fi dhalika la'ayatin liqawmin yasma'un",
  translation: 'And of His signs is your sleep by night and day and your seeking of His bounty. Indeed in that are signs for a people who listen.',
  source: 'Ar-Rum 30:23',
  edition: 'en-sahih-international',
};

const _25_47 = {
  arabic: 'وَهُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِبَاسًا وَالنَّوْمَ سُبَاتًا وَجَعَلَ النَّهَارَ نُشُورًا',
  transliteration: "Wa huwal-ladhi ja'ala lakumul-layla libasan wan-nawma subatan wa ja'alan-nahara nushura",
  translation: 'And it is He who has made the night for you as clothing and sleep [a means for] rest and has made the day a resurrection.',
  source: 'Al-Furqan 25:47',
  edition: 'en-sahih-international',
};

const _33_3 = {
  arabic: 'وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا',
  transliteration: "Wa tawakkal 'alallah. Wa kafa billahi wakila",
  translation: 'And rely upon Allāh; and sufficient is Allāh as Disposer of affairs.',
  source: 'Al-Ahzab 33:3',
  edition: 'en-sahih-international',
};

const _50_22 = {
  arabic: 'لَّقَدْ كُنتَ فِي غَفْلَةٍ مِّنْ هَٰذَا فَكَشَفْنَا عَنكَ غِطَاءَكَ فَبَصَرُكَ الْيَوْمَ حَدِيدٌ',
  transliteration: "Laqad kunta fi ghflatin min hadha fakashafna 'anka ghita'aka fabasarukal-yawma hadid",
  translation: '[It will be said], "You were certainly in unmindfulness of this, and We have removed from you your cover, so your sight, this Day, is sharp."',
  source: 'Qaf 50:22',
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: 'وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ',
  transliteration: "Wadhkur rabbaka fi nafsika tadarru'an wa khifatan wa dunal-jahri minal-qawli bil-ghuduwwi wal-asal. Wa la takun minal-ghafilin",
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech - in the mornings and the evenings. And do not be among the heedless.',
  source: "Al-A'raf 7:205",
  edition: 'en-sahih-international',
};

const _59_18 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
  transliteration: "Ya ayyuhal-ladhina amanuttaqullaha waltandhur nafsun ma qaddamat lighad. Wattaqullaha. Innallaha khabirun bima ta'malun",
  translation: 'O you who have believed, fear Allāh. And let every soul look to what it has put forth for tomorrow - and fear Allāh. Indeed, Allāh is Aware of what you do.',
  source: 'Al-Hashr 59:18',
  edition: 'en-sahih-international',
};

const _50_37 = {
  arabic: 'إِنَّ فِي ذَٰلِكَ لَذِكْرَىٰ لِمَن كَانَ لَهُ قَلْبٌ أَوْ أَلْقَى السَّمْعَ وَهُوَ شَهِيدٌ',
  transliteration: "Inna fi dhalika ladhikra liman kana lahu qalbun aw alqas-sam'a wa huwa shahid",
  translation: 'Indeed in that is a reminder for whoever has a heart or who listens while he is present [in mind].',
  source: 'Qaf 50:37',
  edition: 'en-sahih-international',
};

const _21_1 = {
  arabic: 'اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُّعْرِضُونَ',
  transliteration: "Iqtaraba lin-nasi hisabuhum wa hum fi ghflatin mu'ridun",
  translation: '[The time of] their account has approached for the people, while they are in heedlessness turning away.',
  source: 'Al-Anbya 21:1',
  edition: 'en-sahih-international',
};

const _75_14 = {
  arabic: 'بَلِ الْإِنسَانُ عَلَىٰ نَفْسِهِ بَصِيرَةٌ',
  transliteration: "Balil-insanu 'ala nafsihi basira",
  translation: 'Rather, man, against himself, will be a witness,',
  source: 'Al-Qiyamah 75:14',
  edition: 'en-sahih-international',
};

const _4_29 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ ۚ وَلَا تَقْتُلُوا أَنفُسَكُمْ ۚ إِنَّ اللَّهَ كَانَ بِكُمْ رَحِيمًا',
  transliteration: "Ya ayyuhal-ladhina amanu la ta'kulu amwalakum baynakum bil-batili illa an takuna tijaratan 'an taradinminkum. Wa la taqtulu anfusakum. Innallaha kana bikum rahima",
  translation: 'O you who have believed, do not consume one another\'s wealth unjustly but only [in lawful] business by mutual consent. And do not kill yourselves [or one another]. Indeed, Allāh is to you ever Merciful.',
  source: 'An-Nisa 4:29',
  edition: 'en-sahih-international',
};

const _7_31 = {
  arabic: 'يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ',
  transliteration: "Ya bani adama khudhu zinatakum 'inda kulli masjidin wa kulu washrabu wa la tusrifu. Innahu la yuhibbul-musrifin",
  translation: 'O children of Adam, take your adornment at every masjid, and eat and drink, but be not excessive. Indeed, He likes not those who commit excess.',
  source: "Al-A'raf 7:31",
  edition: 'en-sahih-international',
};

const _5_87 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحَرِّمُوا طَيِّبَاتِ مَا أَحَلَّ اللَّهُ لَكُمْ وَلَا تَعْتَدُوا ۚ إِنَّ اللَّهَ لَا يُحِبُّ الْمُعْتَدِينَ',
  transliteration: "Ya ayyuhal-ladhina amanu la tuharrimu tayyibati ma ahallallahu lakum wa la ta'tadu. Innallaha la yuhibbul-mu'tadin",
  translation: 'O you who have believed, do not prohibit the good things which Allāh has made lawful to you and do not transgress. Indeed, Allāh does not like transgressors.',
  source: "Al-Ma'idah 5:87",
  edition: 'en-sahih-international',
};

const _91_7 = {
  arabic: 'وَنَفْسٍ وَمَا سَوَّاهَا',
  transliteration: "Wa nafsin wa ma sawwaha",
  translation: 'And [by] the soul and He who proportioned it',
  source: 'Ash-Shams 91:7',
  edition: 'en-sahih-international',
};

const _66_6 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu qu anfusakum wa ahlikum naran waquduha an-nasu wal-hijarah 'alayha mala'ikatun ghilathun shidadun la ya'sunallaha ma amarahum wa yaf'aluna ma yu'marun",
  translation: 'O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones, over which are [appointed] angels, harsh and severe; they do not disobey Allāh in what He commands them but do what they are commanded.',
  source: 'At-Tahrim 66:6',
  edition: 'en-sahih-international',
};

const _4_36 = {
  arabic: 'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا',
  transliteration: "Wa'budullaha wa la tushrikuu bihi shay'an. Wa bil-walidayni ihsanan wa bidhil-qurba wal-yatama wal-masakini wal-jari dhil-qurba wal-jaril-junubi was-sahibi bil-janbi wabnis-sabili wa ma malakat aymanukum. Innallaha la yuhibbu man kana mukhtalan fakhura",
  translation: 'Worship Allāh and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess. Indeed, Allāh does not like those who are self-deluding and boastful,',
  source: 'An-Nisa 4:36',
  edition: 'en-sahih-international',
};

const _4_1 = {
  arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
  transliteration: "Ya ayyuhan-nasu ittaqu rabbakumul-ladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan kathiran wa nisa'. Wattaqullahul-ladhi tasa'aluna bihi wal-arham. Innallaha kana 'alaykum raqiba",
  translation: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allāh, through whom you ask one another, and the wombs. Indeed Allāh is ever, over you, an Observer.',
  source: 'An-Nisa 4:1',
  edition: 'en-sahih-international',
};

const _2_233 = {
  arabic: 'وَالْوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ ۖ لِمَنْ أَرَادَ أَن يُتِمَّ الرَّضَاعَةَ ۚ وَعَلَى الْمَوْلُودِ لَهُ رِزْقُهُنَّ وَكِسْوَتُهُنَّ بِالْمَعْرُوفِ ۚ لَا تُكَلَّفُ نَفْسٌ إِلَّا وُسْعَهَا ۚ لَا تُضَارَّ وَالِدَةٌ بِوَلَدِهَا وَلَا مَوْلُودٌ لَّهُ بِوَلَدِهِ ۚ وَعَلَى الْوَارِثِ مِثْلُ ذَٰلِكَ',
  transliteration: "Wal-walidatu yurdi'na awladahunna hawlayni kamilayni liman arada an yutimmar-rada'ah. Wa 'alal-mawludi lahu rizquhunna wa kiswatuhunna bil-ma'ruf. La tukallafu nafsun illa wus'aha. La tudarra walidatun biwaladihaa wa la mawludun lahu biwaladih. Wa 'alal-warithi mithl dhalik",
  translation: 'Mothers may nurse their children two complete years for whoever wishes to complete the nursing period. Upon the father is their provision and their clothing according to what is acceptable. No person is charged with more than his capacity. No mother should be harmed through her child, and no father through his child. And upon the [father\'s] heir is [a duty] like that [of the father].',
  source: 'Al-Baqarah 2:233',
  edition: 'en-sahih-international',
};

const _17_26 = {
  arabic: 'وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا',
  transliteration: "Wa'ati dhal-qurba haqqahu wal-miskina wabnas-sabili wa la tubadhhir tabdhira",
  translation: 'And give the relative his right, and [also] the poor and the traveler, and do not spend wastefully.',
  source: 'Al-Isra 17:26',
  edition: 'en-sahih-international',
};

const _6_103 = {
  arabic: 'لَّا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ ۖ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
  transliteration: "La tudrikuhul-absaru wa huwa yudrikul-absar. Wa huwal-latiful-khabir",
  translation: 'Vision perceives Him not, but He perceives [all] vision; and He is the Subtle, the Aware.',
  source: "Al-An'am 6:103",
  edition: 'en-sahih-international',
};

const _67_14 = {
  arabic: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
  transliteration: "Ala ya'lamu man khalaqa wa huwal-latiful-khabir",
  translation: 'Does He who created not know, while He is the Subtle, the Aware?',
  source: 'Al-Mulk 67:14',
  edition: 'en-sahih-international',
};

const _31_16 = {
  arabic: 'يَا بُنَيَّ إِنَّهَا إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِي صَخْرَةٍ أَوْ فِي السَّمَاوَاتِ أَوْ فِي الْأَرْضِ يَأْتِ بِهَا اللَّهُ ۚ إِنَّ اللَّهَ لَطِيفٌ خَبِيرٌ',
  transliteration: "Ya bunayya innaha in taku mithqala habbatin min khardalin fatakun fi sakhrating aw fis-samawati aw fil-ardi ya'ti bihallah. Innallaha latifun khabir",
  translation: '[And Luqmān said], "O my son, indeed if it should be the weight of a mustard seed and should be within a rock or [anywhere] in the heavens or in the earth, Allāh will bring it forth. Indeed, Allāh is Subtle and Aware."',
  source: 'Luqman 31:16',
  edition: 'en-sahih-international',
};

const _12_100 = {
  arabic: 'إِنَّ رَبِّي لَطِيفٌ لِّمَا يَشَاءُ ۚ إِنَّهُ هُوَ الْعَلِيمُ الْحَكِيمُ',
  transliteration: "Inna rabbi latifun lima yasha'. Innahu huwal-'alimul-hakim",
  translation: 'Indeed, my Lord is Subtle in what He wills. Indeed, it is He who is the Knowing, the Wise.',
  source: 'Yusuf 12:100',
  edition: 'en-sahih-international',
};

const _39_9 = {
  arabic: 'أَمَّنْ هُوَ قَانِتٌ آنَاءَ اللَّيْلِ سَاجِدًا وَقَائِمًا يَحْذَرُ الْآخِرَةَ وَيَرْجُو رَحْمَةَ رَبِّهِ ۗ قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
  transliteration: "Amman huwa qanitun ana'al-layli sajidan wa qa'iman yadharul-akhirata wa yarju rahmata rabbih. Qul hal yastawi alladhina ya'lamuna walladhina la ya'lamun. Innama yatadhakkaru ulul-albab",
  translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing [in prayer], fearing the Hereafter and hoping for the mercy of his Lord, [like one who does not]? Say, "Are those who know equal to those who do not know?" Only they will remember [who are] people of understanding.',
  source: 'Az-Zumar 39:9',
  edition: 'en-sahih-international',
};

// ─── Readiness Ayat Matrix ───────────────────────────────────────────────────

export const READINESS_AYAT_LIFE = {

  // ═══ ALL YES — proceed ═══
  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  // Q1=0 only: depletion not named, all else present
  '011111': { ..._4_28,
    framing: 'I am carrying reserves I have not acknowledged — He already knows, and lightens.' },

  // Q2=0 only: managing through difficulty without meeting it honestly
  '101111': { ..._16_127,
    framing: 'I am getting past difficulty rather than meeting it — patience itself is only through Him.' },

  // Q3=0 only: running on discipline, not drawing from replenishment
  '110111': { ..._28_73,
    framing: 'I am expending without resting — He built the night itself as a mercy for restoration.' },

  // L1=0 only: attentiveness absent, habit leading instead of presence
  '111011': { ..._50_37,
    framing: 'I am proceeding without checking what I actually need — a present heart can still hear.' },

  // L2=0 only: overriding body/heart signals for productivity
  '111101': { ..._75_14,
    framing: 'I am overriding the signal — I am my own witness, and I already know what is true.' },

  // L3=0 only: those in my care getting what remains, not what is due
  '111110': { ..._66_6,
    framing: 'I am giving those I love what is left — they are my first trust, not my last.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // Q–Q pairs (both gaps within Al-Qawi)

  '001111': { ..._30_54,
    framing: 'I have not named my depletion or met what is hard — He created both weakness and strength.' },

  '010111': { ..._2_153,
    framing: 'I am managing through and drawing from an empty source — He is with the patient.' },

  '011011': { ..._4_28,
    framing: 'I carry unnamed exhaustion while proceeding on habit — He wants to lighten for me.' },

  '011101': { ..._2_286,
    framing: 'My foundation is unattended and I am overriding signals — He charges no soul beyond its capacity.' },

  '011110': { ..._2_155,
    framing: 'I am unaware of my depletion yet the hardship is real — good tidings await the patient.' },

  '100111': { ..._3_200,
    framing: 'I am not meeting the difficulty honestly nor replenishing — persevere, endure, and fear Allah.' },

  '101011': { ..._94_5,
    framing: 'I am managing through and proceeding on habit — with every hardship, ease is already present.' },

  '101101': { ..._75_14,
    framing: 'I manage through difficulty and override the signal — I am already a witness against myself.' },

  '101110': { ..._16_127,
    framing: 'I am managing through and giving those close to me what remains — patience is only through Allah.' },

  '110011': { ..._28_73,
    framing: 'I am not replenishing and proceed on habit — He made rest a mercy, not a luxury.' },

  '110101': { ..._5_87,
    framing: 'I am running on empty and overriding what I feel — do not make unlawful what He has allowed.' },

  '110110': { ..._4_36,
    framing: 'I am depleted and giving close ones only what remains — ihsan begins closest to home.' },

  '111001': { ..._50_22,
    framing: 'I am proceeding on habit without checking signals — one day the cover will be removed.' },

  '111010': { ..._7_31,
    framing: 'I am heedless of need and overriding what I feel — eat, drink, and do not be excessive.' },

  '111100': { ..._66_6,
    framing: 'I am present for everything except those I love most — they are the first trust to protect.' },

  // ═══ THREE NOT YET (3 zeros) — deeper gaps ═══

  // 0Q + 3L (all Al-Latif gaps, all Al-Qawi present) — CORNER
  // Theological pole: strength sustained; attentiveness entirely absent → Al-Laṭīf
  '111000': { ..._67_14,
    framing: 'My outer conditions are strong but I am absent within — does He who created not know?' },

  // 3Q + 0L (all Al-Qawi gaps, all Al-Latif present)
  '000111': { ..._30_54,
    framing: 'My foundation, honesty about hardship, and replenishment are all absent — I was made from weakness.' },

  '001011': { ..._2_286,
    framing: 'I name no depletion, manage through difficulty, and proceed on habit — He charges no soul beyond capacity.' },

  '001101': { ..._4_28,
    framing: 'I run on unnamed reserves, bypass difficulty, and override signals — He wants to lighten for me.' },

  '001110': { ..._2_155,
    framing: 'I carry unacknowledged depletion, bypass difficulty, and neglect those close — give tidings to the patient.' },

  '010011': { ..._3_200,
    framing: 'I bypass difficulty, run on empty, and proceed on habit — persevere, endure, remain stationed.' },

  '010101': { ..._94_5,
    framing: 'I bypass difficulty, run on empty, and override signals — with hardship, ease is already alongside.' },

  '010110': { ..._2_153,
    framing: 'I manage through difficulty, draw nothing, and give those close what remains — seek help through patience.' },

  '011001': { ..._59_18,
    framing: 'My foundation is unattended and I proceed heedlessly — let every soul look to what it has sent forward.' },

  '011010': { ..._7_31,
    framing: 'I carry unnamed depletion, proceed on habit, and override signals — eat, drink, do not be excessive.' },

  '011100': { ..._4_1,
    framing: 'My reserves are unnamed and I give close ones only the remains — the wombs have a claim upon you.' },

  '100011': { ..._8_66,
    framing: 'I manage through hardship, run on nothing, and proceed on habit — He already knows the weakness.' },

  '100101': { ..._75_14,
    framing: 'I meet no hardship directly, rest nothing, and ignore my signals — I am already a witness against myself.' },

  '100110': { ..._17_26,
    framing: 'I bypass hardship, draw from nothing, and give kin only what is left — give the relative his right.' },

  '101001': { ..._50_22,
    framing: 'I manage through difficulty and proceed on habit — the cover will be removed; see now while there is time.' },

  '101010': { ..._7_205,
    framing: 'I manage through, draw nothing, and override signals — do not be among the heedless.' },

  '101100': { ..._66_6,
    framing: 'I manage through, draw from nothing, and give close ones the remainder — protect your family as a trust.' },

  '110001': { ..._50_37,
    framing: 'I am depleted, proceed on habit, and give close ones what remains — a present heart can still listen.' },

  '110010': { ..._5_87,
    framing: 'I run on discipline, not replenishment, and override the signal — do not forbid what He has permitted.' },

  '110100': { ..._2_233,
    framing: 'I am depleted, overriding signals, and giving family only what is left — no person is charged beyond capacity.' },

  // ═══ FOUR NOT YET (4 zeros) ═══

  '000011': { ..._30_54,
    framing: 'Three foundations of vitality are absent yet I am still attending — He cycles from weakness to strength.' },

  '000101': { ..._2_286,
    framing: 'My three Al-Qawi conditions are absent and I override the signal — burden no soul beyond its capacity.' },

  '000110': { ..._4_36,
    framing: 'My three Al-Qawi conditions are absent and I neglect those nearest — ihsan is owed to those closest first.' },

  '001001': { ..._59_18,
    framing: 'I carry unnamed depletion, bypass difficulty, and proceed heedlessly — look to what the soul has sent forward.' },

  '001010': { ..._4_29,
    framing: 'I carry unnamed depletion, bypass difficulty, and override the signal — do not wrong your own soul.' },

  '001100': { ..._4_1,
    framing: 'I carry unnamed depletion, bypass difficulty, and neglect those I love — the wombs have a right upon you.' },

  '010001': { ..._21_1,
    framing: 'I bypass honesty, draw nothing, and proceed unaware — accounts approach while we remain in heedlessness.' },

  '010010': { ..._3_200,
    framing: 'I manage through, draw nothing, and override signals — persevere, endure, remain stationed, fear Allah.' },

  '010100': { ..._2_233,
    framing: 'I bypass difficulty, draw nothing, and give family what remains — no soul is charged beyond its capacity.' },

  '011000': { ..._8_66,
    framing: 'My foundation is unattended, I give close ones the remains, and I proceed on habit — He knows the weakness.' },

  '100001': { ..._33_3,
    framing: 'I meet no hardship, rest nothing, and proceed, yet close ones receive me — rely upon Allah; He is sufficient.' },

  '100010': { ..._91_7,
    framing: 'I bypass hardship, draw nothing, and override my signal — He proportioned the soul and knows what it carries.' },

  '100100': { ..._17_26,
    framing: 'I bypass hardship, draw nothing, and give kin only leftovers — give the relative his right.' },

  '101000': { ..._12_100,
    framing: 'I manage through, give close ones what remains, and ignore signals — He is Subtle in what He wills.' },

  '110000': { ..._25_47,
    framing: 'I am depleted, absent, and giving close ones what is left — He made sleep rest and day a resurrection.' },

  // ═══ FIVE NOT YET (5 zeros) ═══

  '000001': { ..._66_6,
    framing: 'Five conditions are absent — those in my care are still held; that one trust is the start.' },

  '000010': { ..._75_14,
    framing: 'Five conditions are absent — one signal still reaches me; I am my own witness.' },

  '000100': { ..._2_233,
    framing: 'Five conditions are absent — give what those in your care are due; that one right is already owed.' },

  '001000': { ..._30_23,
    framing: 'Five conditions are absent — He made sleep a sign; I need to become one who hears.' },

  '010000': { ..._94_5,
    framing: 'Five conditions are absent — even here, with this hardship, ease has already been placed alongside.' },

  '100000': { ..._2_155,
    framing: 'Five conditions are absent — hardship is the test; He has given good tidings to those who remain patient.' },

  // ═══ ALL NOT YET (0 zeros) — full depletion ═══

  '000000': { ..._4_28,
    framing: 'Every condition is absent — He created me weak, and He wants to lighten; I need not pretend otherwise.' },

};

// ─── Lookup Helper ───────────────────────────────────────────────────────────

export function lookupReadinessAyah(key) {
  return READINESS_AYAT_LIFE[key] || null;
}
