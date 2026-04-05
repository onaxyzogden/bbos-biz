/**
 * OGDEN — Learning Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-'Alim (The All-Knowing) · Al-Basir (The All-Seeing)
 * Row distribution: 4 rows Al-'Alim (A1–A4) · 2 rows Al-Basir (B1–B2)
 * v1.0 · 2026-04-05
 *
 * Key schema: 6-character binary string
 * Positions: A1 A2 A3 A4 B1 B2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   A1: Entering with honest acknowledgment of not fully knowing vs approaching to confirm
 *   A2: Open to being corrected, even by unexpected sources vs filtering through existing positions
 *   A3: Holding current knowledge lightly, not as identity vs being wrong feels threatening
 *   A4: Receiving knowledge as trust from Allah vs here for personal gain
 *   B1: Curious enough to sit with difficulty vs wanting conclusion without complexity
 *   B2: Asking why not just what, seeking the root vs satisfied with surface
 *
 * Usage: READINESS_AYAT_LEARNING[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 36 unique ayat across 63 non-null entries (max 3 keys per shared ayah)
 * - Reuse distribution: 10 used 1x, 25 used 2x, 1 used 3x (40:83)
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran(36 ayat, ar-simple-clean),
 *   fetch_translation(36 ayat, en-sahih-international),
 *   search_quran(6 queries), search_tafsir(0)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_32 = {
  arabic: 'قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا ۖ إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ',
  transliteration: 'Qalu subhanaka la \'ilma lana illa ma \'allamtana innaka antal-\'Alimul-Hakim',
  translation: 'They said, "Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise."',
  source: 'Al-Baqarah 2:32',
  edition: 'en-sahih-international',
};

const _2_44 = {
  arabic: 'أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ وَتَنسَوْنَ أَنفُسَكُمْ وَأَنتُمْ تَتْلُونَ الْكِتَابَ ۚ أَفَلَا تَعْقِلُونَ',
  transliteration: 'Ata\'muruna-nnasa bil-birri wa tansawna anfusakum wa antum tatluna-l-kitab, afala ta\'qilun',
  translation: 'Do you order righteousness of the people and forget yourselves while you recite the Scripture? Then will you not reason?',
  source: 'Al-Baqarah 2:44',
  edition: 'en-sahih-international',
};

const _2_45 = {
  arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
  transliteration: 'Wasta\'inu bis-sabri was-salah, wa innaha lakabira illa \'alal-khashi\'in',
  translation: 'And seek help through patience and prayer; and indeed, it is difficult except for the humbly submissive [to Allah].',
  source: 'Al-Baqarah 2:45',
  edition: 'en-sahih-international',
};

const _2_170 = {
  arabic: 'وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا أَلْفَيْنَا عَلَيْهِ آبَاءَنَا ۗ أَوَلَوْ كَانَ آبَاؤُهُمْ لَا يَعْقِلُونَ شَيْئًا وَلَا يَهْتَدُونَ',
  transliteration: 'Wa idha qila lahumuttabi\'u ma anzalallahu qalu bal nattabi\'u ma alfayna \'alayhi aba\'ana, awalaw kana aba\'uhum la ya\'qiluna shay\'an wa la yahtadun',
  translation: 'And when it is said to them, "Follow what Allah has revealed," they say, "Rather, we will follow that which we found our fathers doing." Even though their fathers understood nothing, nor were they guided?',
  source: 'Al-Baqarah 2:170',
  edition: 'en-sahih-international',
};

const _2_269 = {
  arabic: 'يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ',
  transliteration: 'Yu\'til-hikmata man yasha\', wa man yu\'tal-hikmata faqad utiya khayran kathira, wa ma yadhdhakkaru illa ulul-albab',
  translation: 'He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good. And none will remember except those of understanding.',
  source: 'Al-Baqarah 2:269',
  edition: 'en-sahih-international',
};

const _3_7 = {
  arabic: 'هُوَ الَّذِي أَنزَلَ عَلَيْكَ الْكِتَابَ مِنْهُ آيَاتٌ مُّحْكَمَاتٌ هُنَّ أُمُّ الْكِتَابِ وَأُخَرُ مُتَشَابِهَاتٌ ۖ فَأَمَّا الَّذِينَ فِي قُلُوبِهِمْ زَيْغٌ فَيَتَّبِعُونَ مَا تَشَابَهَ مِنْهُ ابْتِغَاءَ الْفِتْنَةِ وَابْتِغَاءَ تَأْوِيلِهِ ۗ وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللَّهُ ۗ وَالرَّاسِخُونَ فِي الْعِلْمِ يَقُولُونَ آمَنَّا بِهِ كُلٌّ مِّنْ عِندِ رَبِّنَا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ',
  transliteration: 'Huwal-ladhi anzala \'alaykal-kitaba minhu ayatun muhkamatun hunna ummul-kitabi wa ukharu mutashabihat. Fa\'ammal-ladhina fi qulubihim zayghun fayattabi\'una ma tashabaha minhub-tigha\'al-fitnati wab-tigha\'a ta\'wilih. Wa ma ya\'lamu ta\'wilahu illallah. War-rasikhuna fil-\'ilmi yaquluna amanna bihi kullun min \'indi Rabbina. Wa ma yadhdhakkaru illa ulul-albab',
  translation: 'It is He who has sent down to you the Book; in it are verses that are precise - they are the foundation of the Book - and others unspecific. As for those in whose hearts is deviation from truth, they will follow that of it which is unspecific, seeking discord and seeking an interpretation suitable to them. And no one knows its true interpretation except Allah. But those firm in knowledge say, "We believe in it. All of it is from our Lord." And no one will be reminded except those of understanding.',
  source: 'Ali \'Imran 3:7',
  edition: 'en-sahih-international',
};

const _3_190 = {
  arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
  transliteration: 'Inna fi khalqis-samawati wal-ardi wakhtilafil-layli wan-nahari la-ayatil-li-ulil-albab',
  translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.',
  source: 'Ali \'Imran 3:190',
  edition: 'en-sahih-international',
};

const _7_146 = {
  arabic: 'سَأَصْرِفُ عَنْ آيَاتِيَ الَّذِينَ يَتَكَبَّرُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ وَإِن يَرَوْا كُلَّ آيَةٍ لَّا يُؤْمِنُوا بِهَا وَإِن يَرَوْا سَبِيلَ الرُّشْدِ لَا يَتَّخِذُوهُ سَبِيلًا وَإِن يَرَوْا سَبِيلَ الْغَيِّ يَتَّخِذُوهُ سَبِيلًا ۚ ذَٰلِكَ بِأَنَّهُمْ كَذَّبُوا بِآيَاتِنَا وَكَانُوا عَنْهَا غَافِلِينَ',
  transliteration: 'Sa-asrifu \'an ayatiyal-ladhina yatakabbaruna fil-ardi bighayril-haqq, wa in yaraw kulla ayatin la yu\'minu biha, wa in yaraw sabilar-rushdi la yattakhidhuhu sabila, wa in yaraw sabilal-ghayyi yattakhidhuhu sabila. Dhalika bi-annahum kadhdhabu bi-ayatina wa kanu \'anha ghafilin',
  translation: 'I will turn away from My signs those who are arrogant upon the earth without right; and if they should see every sign, they will not believe in it. And if they see the way of consciousness, they will not adopt it as a way; but if they see the way of error, they will adopt it as a way. That is because they have denied Our signs and they were heedless of them.',
  source: 'Al-A\'raf 7:146',
  edition: 'en-sahih-international',
};

const _10_39 = {
  arabic: 'بَلْ كَذَّبُوا بِمَا لَمْ يُحِيطُوا بِعِلْمِهِ وَلَمَّا يَأْتِهِمْ تَأْوِيلُهُ ۚ كَذَٰلِكَ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ ۖ فَانظُرْ كَيْفَ كَانَ عَاقِبَةُ الظَّالِمِينَ',
  transliteration: 'Bal kadhdhabu bima lam yuhitu bi-\'ilmihi wa lamma ya\'tihim ta\'wiluh. Kadhalika kadhdhab-alladhina min qablihim, fanzhur kayfa kana \'aqibatuz-zhalimin',
  translation: 'Rather, they have denied that which they encompass not in knowledge and whose interpretation has not yet come to them. Thus did those before them deny. Then observe how was the end of the wrongdoers.',
  source: 'Yunus 10:39',
  edition: 'en-sahih-international',
};

const _12_76 = {
  arabic: 'فَبَدَأَ بِأَوْعِيَتِهِمْ قَبْلَ وِعَاءِ أَخِيهِ ثُمَّ اسْتَخْرَجَهَا مِن وِعَاءِ أَخِيهِ ۚ كَذَٰلِكَ كِدْنَا لِيُوسُفَ ۖ مَا كَانَ لِيَأْخُذَ أَخَاهُ فِي دِينِ الْمَلِكِ إِلَّا أَن يَشَاءَ اللَّهُ ۚ نَرْفَعُ دَرَجَاتٍ مَّن نَّشَاءُ ۗ وَفَوْقَ كُلِّ ذِي عِلْمٍ عَلِيمٌ',
  transliteration: 'Fabada\'a bi-aw\'iyatihim qabla wi\'a\'i akhih, thummas-takhrajaha min wi\'a\'i akhih. Kadhalika kidna li-Yusuf. Ma kana liya\'khudha akhahu fi dinil-maliki illa an yasha\'allah. Narfa\'u darajatin man nasha\'. Wa fawqa kulli dhi \'ilmin \'alim',
  translation: 'So he began the search with their bags before the bag of his brother; then he extracted it from the bag of his brother. Thus did We plan for Joseph. He could not have taken his brother within the law of the king except that Allah willed. We raise in degrees whom We will, but over every possessor of knowledge is one more knowing.',
  source: 'Yusuf 12:76',
  edition: 'en-sahih-international',
};

const _17_36 = {
  arabic: 'وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا',
  transliteration: 'Wa la taqfu ma laysa laka bihi \'ilm. Innas-sam\'a wal-basara wal-fu\'ada kullu ula\'ika kana \'anhu mas\'ula',
  translation: 'And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart - about all those one will be questioned.',
  source: 'Al-Isra\' 17:36',
  edition: 'en-sahih-international',
};

const _17_85 = {
  arabic: 'وَيَسْأَلُونَكَ عَنِ الرُّوحِ ۖ قُلِ الرُّوحُ مِنْ أَمْرِ رَبِّي وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا',
  transliteration: 'Wa yas\'alunaka \'anir-ruh. Qulir-ruhu min amri Rabbi wa ma utitum minal-\'ilmi illa qalila',
  translation: 'And they ask you about the soul. Say, "The soul is of the affair of my Lord. And mankind have not been given of knowledge except a little."',
  source: 'Al-Isra\' 17:85',
  edition: 'en-sahih-international',
};

const _17_109 = {
  arabic: 'وَيَخِرُّونَ لِلْأَذْقَانِ يَبْكُونَ وَيَزِيدُهُمْ خُشُوعًا',
  transliteration: 'Wa yakhirruna lil-adhqani yabkuna wa yaziduhum khushu\'a',
  translation: 'And they fall upon their faces weeping, and it increases them in humble submission.',
  source: 'Al-Isra\' 17:109',
  edition: 'en-sahih-international',
};

const _18_66 = {
  arabic: 'قَالَ لَهُ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا',
  transliteration: 'Qala lahu Musa hal attabi\'uka \'ala an tu\'allimani mimma \'ullimta rushda',
  translation: 'Moses said to him, "May I follow you on the condition that you teach me from what you have been taught of sound judgement?"',
  source: 'Al-Kahf 18:66',
  edition: 'en-sahih-international',
};

const _18_68 = {
  arabic: 'وَكَيْفَ تَصْبِرُ عَلَىٰ مَا لَمْ تُحِطْ بِهِ خُبْرًا',
  transliteration: 'Wa kayfa tasbiru \'ala ma lam tuhit bihi khubra',
  translation: 'And how can you have patience for what you do not encompass in knowledge?',
  source: 'Al-Kahf 18:68',
  edition: 'en-sahih-international',
};

const _18_69 = {
  arabic: 'قَالَ سَتَجِدُنِي إِن شَاءَ اللَّهُ صَابِرًا وَلَا أَعْصِي لَكَ أَمْرًا',
  transliteration: 'Qala satajiduni in sha\'allahu sabiran wa la a\'si laka amra',
  translation: 'Moses said, "You will find me, if Allah wills, patient, and I will not disobey you in any order."',
  source: 'Al-Kahf 18:69',
  edition: 'en-sahih-international',
};

const _18_103_104 = {
  arabic: 'قُلْ هَلْ نُنَبِّئُكُم بِالْأَخْسَرِينَ أَعْمَالًا ﴿١٠٣﴾ الَّذِينَ ضَلَّ سَعْيُهُمْ فِي الْحَيَاةِ الدُّنْيَا وَهُمْ يَحْسَبُونَ أَنَّهُمْ يُحْسِنُونَ صُنْعًا',
  transliteration: 'Qul hal nunabbi\'ukum bil-akhsarina a\'mala. Alladhina dalla sa\'yuhum fil-hayatid-dunya wa hum yahsabuna annahum yuhsinuna sun\'a',
  translation: 'Say, "Shall we inform you of the greatest losers as to their deeds? Those whose effort is lost in worldly life, while they think that they are doing well in work."',
  source: 'Al-Kahf 18:103–104',
  edition: 'en-sahih-international',
};

const _20_114 = {
  arabic: 'فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا',
  transliteration: 'Fata\'alallahul-Malikul-Haqq. Wa la ta\'jal bil-Qur\'ani min qabli an yuqda ilayka wahyuh. Wa qul Rabbi zidni \'ilma',
  translation: 'So high above all is Allah, the Sovereign, the Truth. And do not hasten with recitation of the Quran before its revelation is completed to you, and say, "My Lord, increase me in knowledge."',
  source: 'Ta-Ha 20:114',
  edition: 'en-sahih-international',
};

const _22_54 = {
  arabic: 'وَلِيَعْلَمَ الَّذِينَ أُوتُوا الْعِلْمَ أَنَّهُ الْحَقُّ مِن رَّبِّكَ فَيُؤْمِنُوا بِهِ فَتُخْبِتَ لَهُ قُلُوبُهُمْ ۗ وَإِنَّ اللَّهَ لَهَادِ الَّذِينَ آمَنُوا إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
  transliteration: 'Wa liya\'lamal-ladhina utul-\'ilma annahu-l-haqqu min Rabbika fayu\'minu bihi fatukhbita lahu qulubuhum. Wa innallaha lahadi-lladhina amanu ila siratim-mustaqim',
  translation: 'And so those who were given knowledge may know that it is the truth from your Lord and therefore believe in it, and their hearts humbly submit to it. And indeed is Allah the Guide of those who have believed to a straight path.',
  source: 'Al-Hajj 22:54',
  edition: 'en-sahih-international',
};

const _25_73 = {
  arabic: 'وَالَّذِينَ إِذَا ذُكِّرُوا بِآيَاتِ رَبِّهِمْ لَمْ يَخِرُّوا عَلَيْهَا صُمًّا وَعُمْيَانًا',
  transliteration: 'Walladhina idha dukkiru bi-ayati Rabbihim lam yakhirru \'alayha summan wa \'umyana',
  translation: 'And those who, when reminded of the verses of their Lord, do not fall upon them deaf and blind.',
  source: 'Al-Furqan 25:73',
  edition: 'en-sahih-international',
};

const _27_14 = {
  arabic: 'وَجَحَدُوا بِهَا وَاسْتَيْقَنَتْهَا أَنفُسُهُمْ ظُلْمًا وَعُلُوًّا ۚ فَانظُرْ كَيْفَ كَانَ عَاقِبَةُ الْمُفْسِدِينَ',
  transliteration: 'Wa jahadu biha wastayqanat-ha anfusuhum zhulman wa \'uluwwa. Fanzhur kayfa kana \'aqibatul-mufsidin',
  translation: 'And they rejected them, while their inner selves were convinced thereof, out of injustice and haughtiness. So see how was the end of the corrupters.',
  source: 'An-Naml 27:14',
  edition: 'en-sahih-international',
};

const _29_43 = {
  arabic: 'وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ ۖ وَمَا يَعْقِلُهَا إِلَّا الْعَالِمُونَ',
  transliteration: 'Wa tilkal-amthalu nadribuha lin-nas, wa ma ya\'qiluha illal-\'alimun',
  translation: 'And these examples We present to the people, but none will understand them except those of knowledge.',
  source: 'Al-\'Ankabut 29:43',
  edition: 'en-sahih-international',
};

const _31_18 = {
  arabic: 'وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
  transliteration: 'Wa la tusa\'\'ir khaddaka lin-nasi wa la tamshi fil-ardi maraha. Innallaha la yuhibbu kulla mukhtalin fakhur',
  translation: 'And do not turn your cheek in contempt toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful.',
  source: 'Luqman 31:18',
  edition: 'en-sahih-international',
};

const _35_28 = {
  arabic: 'وَمِنَ النَّاسِ وَالدَّوَابِّ وَالْأَنْعَامِ مُخْتَلِفٌ أَلْوَانُهُ كَذَٰلِكَ ۗ إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ ۗ إِنَّ اللَّهَ عَزِيزٌ غَفُورٌ',
  transliteration: 'Wa minan-nasi wad-dawwabbi wal-an\'ami mukhtalifun alwanuhu kadhalik. Innama yakhsha-llaha min \'ibadihil-\'ulama\'. Innallaha \'Azizun Ghafur',
  translation: 'And among people and moving creatures and grazing livestock are various colors similarly. Only those fear Allah, from among His servants, who have knowledge. Indeed, Allah is Exalted in Might and Forgiving.',
  source: 'Fatir 35:28',
  edition: 'en-sahih-international',
};

const _39_9 = {
  arabic: 'أَمَّنْ هُوَ قَانِتٌ آنَاءَ اللَّيْلِ سَاجِدًا وَقَائِمًا يَحْذَرُ الْآخِرَةَ وَيَرْجُو رَحْمَةَ رَبِّهِ ۗ قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
  transliteration: 'Amman huwa qanitun ana\'al-layli sajidan wa qa\'iman yahdharul-akhirata wa yarju rahmata Rabbih. Qul hal yastawil-ladhina ya\'lamuna walladhina la ya\'lamun. Innama yatadhakkaru ulul-albab',
  translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing in prayer, fearing the Hereafter and hoping for the mercy of his Lord, like one who does not? Say, "Are those who know equal to those who do not know?" Only they will remember who are people of understanding.',
  source: 'Az-Zumar 39:9',
  edition: 'en-sahih-international',
};

const _39_18 = {
  arabic: 'الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ ۚ أُولَٰئِكَ الَّذِينَ هَدَاهُمُ اللَّهُ ۖ وَأُولَٰئِكَ هُمْ أُولُو الْأَلْبَابِ',
  transliteration: 'Alladhina yastami\'unal-qawla fayattabi\'una ahsanah. Ula\'ikal-ladhina hadahumullahu wa ula\'ika hum ulul-albab',
  translation: 'Who listen to speech and follow the best of it. Those are the ones Allah has guided, and those are people of understanding.',
  source: 'Az-Zumar 39:18',
  edition: 'en-sahih-international',
};

const _39_22 = {
  arabic: 'أَفَمَن شَرَحَ اللَّهُ صَدْرَهُ لِلْإِسْلَامِ فَهُوَ عَلَىٰ نُورٍ مِّن رَّبِّهِ ۚ فَوَيْلٌ لِّلْقَاسِيَةِ قُلُوبُهُم مِّن ذِكْرِ اللَّهِ ۚ أُولَٰئِكَ فِي ضَلَالٍ مُّبِينٍ',
  transliteration: 'Afaman sharahallahu sadrahu lil-islami fahuwa \'ala nurim-min Rabbih. Fawaylul-lil-qasiyati qulubuhum min dhikrillah. Ula\'ika fi dalalim-mubin',
  translation: 'So is one whose breast Allah has expanded to accept Islam and he is upon a light from his Lord like one whose heart rejects it? Then woe to those whose hearts are hardened against the remembrance of Allah. Those are in manifest error.',
  source: 'Az-Zumar 39:22',
  edition: 'en-sahih-international',
};

const _40_35 = {
  arabic: 'الَّذِينَ يُجَادِلُونَ فِي آيَاتِ اللَّهِ بِغَيْرِ سُلْطَانٍ أَتَاهُمْ ۖ كَبُرَ مَقْتًا عِندَ اللَّهِ وَعِندَ الَّذِينَ آمَنُوا ۚ كَذَٰلِكَ يَطْبَعُ اللَّهُ عَلَىٰ كُلِّ قَلْبِ مُتَكَبِّرٍ جَبَّارٍ',
  transliteration: 'Alladhina yujadiluna fi ayatillahi bighayri sultanin atahum, kabura maqtan \'indallahi wa \'indal-ladhina amanu. Kadhalika yatba\'ullahu \'ala kulli qalbi mutakabbirin jabbar',
  translation: 'Those who dispute concerning the signs of Allah without an authority having come to them - great is hatred of them in the sight of Allah and in the sight of those who have believed. Thus does Allah seal over every heart belonging to an arrogant tyrant.',
  source: 'Ghafir 40:35',
  edition: 'en-sahih-international',
};

const _40_83 = {
  arabic: 'فَلَمَّا جَاءَتْهُمْ رُسُلُهُم بِالْبَيِّنَاتِ فَرِحُوا بِمَا عِندَهُم مِّنَ الْعِلْمِ وَحَاقَ بِهِم مَّا كَانُوا بِهِ يَسْتَهْزِئُونَ',
  transliteration: 'Falamma ja\'at-hum rusuluhum bil-bayyinati farihu bima \'indahum minal-\'ilmi wa haqa bihim ma kanu bihi yastahzi\'un',
  translation: 'And when their messengers came to them with clear proofs, they merely rejoiced in what they had of knowledge, but they were enveloped by what they used to ridicule.',
  source: 'Ghafir 40:83',
  edition: 'en-sahih-international',
};

const _45_8 = {
  arabic: 'يَسْمَعُ آيَاتِ اللَّهِ تُتْلَىٰ عَلَيْهِ ثُمَّ يُصِرُّ مُسْتَكْبِرًا كَأَن لَّمْ يَسْمَعْهَا ۖ فَبَشِّرْهُ بِعَذَابٍ أَلِيمٍ',
  transliteration: 'Yasma\'u ayatillahi tutla \'alayhi thumma yusirru mustakbiran ka\'an lam yasma\'ha, fabash-shirhu bi-\'adhabin alim',
  translation: 'Who hears the verses of Allah recited to him, then persists arrogantly as if he had not heard them. So give him tidings of a painful punishment.',
  source: 'Al-Jathiyah 45:8',
  edition: 'en-sahih-international',
};

const _47_16 = {
  arabic: 'وَمِنْهُم مَّن يَسْتَمِعُ إِلَيْكَ حَتَّىٰ إِذَا خَرَجُوا مِنْ عِندِكَ قَالُوا لِلَّذِينَ أُوتُوا الْعِلْمَ مَاذَا قَالَ آنِفًا ۚ أُولَٰئِكَ الَّذِينَ طَبَعَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَاتَّبَعُوا أَهْوَاءَهُمْ',
  transliteration: 'Wa minhum man yastami\'u ilayka hatta idha kharaju min \'indika qalu lilladhina utul-\'ilma madha qala anifa. Ula\'ikal-ladhina taba\'allahu \'ala qulubihim wattaba\'u ahwa\'ahum',
  translation: 'And among them are those who listen to you, until when they depart from you, they say to those who were given knowledge, "What has he said just now?" Those are the ones of whom Allah has sealed over their hearts and who have followed their own desires.',
  source: 'Muhammad 47:16',
  edition: 'en-sahih-international',
};

const _50_33 = {
  arabic: 'مَّنْ خَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ وَجَاءَ بِقَلْبٍ مُّنِيبٍ',
  transliteration: 'Man khashiyar-Rahmana bil-ghaybi wa ja\'a bi-qalbin munib',
  translation: 'Who feared the Most Merciful in the unseen and came with a heart returning in repentance.',
  source: 'Qaf 50:33',
  edition: 'en-sahih-international',
};

const _54_3 = {
  arabic: 'وَكَذَّبُوا وَاتَّبَعُوا أَهْوَاءَهُمْ ۚ وَكُلُّ أَمْرٍ مُّسْتَقِرٌّ',
  transliteration: 'Wa kadhdhabu wattaba\'u ahwa\'ahum. Wa kullu amrin mustaqirr',
  translation: 'And they denied and followed their inclinations. But for every matter is a time of settlement.',
  source: 'Al-Qamar 54:3',
  edition: 'en-sahih-international',
};

const _57_16 = {
  arabic: 'أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ وَمَا نَزَلَ مِنَ الْحَقِّ وَلَا يَكُونُوا كَالَّذِينَ أُوتُوا الْكِتَابَ مِن قَبْلُ فَطَالَ عَلَيْهِمُ الْأَمَدُ فَقَسَتْ قُلُوبُهُمْ ۖ وَكَثِيرٌ مِّنْهُمْ فَاسِقُونَ',
  transliteration: 'Alam ya\'ni lilladhina amanu an takhsha\'a qulubuhum lidhikrillahi wa ma nazala minal-haqq, wa la yakunu kalladhina utul-kitaba min qablu fatala \'alayhimul-amadu faqasat qulubuhum, wa kathirum-minhum fasiqun',
  translation: 'Has the time not come for those who have believed that their hearts should become humbly submissive at the remembrance of Allah and what has come down of the truth? And let them not be like those who were given the Scripture before, and a long period passed over them, so their hearts hardened; and many of them are defiantly disobedient.',
  source: 'Al-Hadid 57:16',
  edition: 'en-sahih-international',
};

const _58_11 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قِيلَ لَكُمْ تَفَسَّحُوا فِي الْمَجَالِسِ فَافْسَحُوا يَفْسَحِ اللَّهُ لَكُمْ ۖ وَإِذَا قِيلَ انشُزُوا فَانشُزُوا يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ',
  transliteration: 'Ya ayyuhal-ladhina amanu idha qila lakum tafassahu fil-majalisi fafsahu yafsahillahu lakum. Wa idha qilanshuzu fanshazu yarfa\'illahul-ladhina amanu minkum walladhina utul-\'ilma darajat. Wallahu bima ta\'maluna Khabir',
  translation: 'O you who have believed, when you are told, "Space yourselves" in assemblies, then make space; Allah will make space for you. And when you are told, "Arise," then arise; Allah will raise those who have believed among you and those who were given knowledge, by degrees. And Allah is Aware of what you do.',
  source: 'Al-Mujadila 58:11',
  edition: 'en-sahih-international',
};

const _96_1_5 = {
  arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴿٢﴾ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ﴿٣﴾ الَّذِي عَلَّمَ بِالْقَلَمِ ﴿٤﴾ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
  transliteration: 'Iqra\' bismi Rabbikal-ladhi khalaq. Khalaqal-insana min \'alaq. Iqra\' wa Rabbukal-Akram. Alladhi \'allama bil-qalam. \'Allamal-insana ma lam ya\'lam',
  translation: 'Recite in the name of your Lord who created – Created man from a clinging substance. Recite, and your Lord is the most Generous – Who taught by the pen – Taught man that which he knew not.',
  source: 'Al-\'Alaq 96:1–5',
  edition: 'en-sahih-international',
};


// ─── Matrix Export ──────────────────────────────────────────

export const READINESS_AYAT_LEARNING = {

  // ═══ CORNERS ═══════════════════════════════════════════════

  '111111': null,

  '000000': {
    ..._39_9,
    framing: 'I arrived full of what I already know — I cannot receive because I have not yet emptied myself.',
  },

  '111100': {
    ..._18_68,
    framing: 'I am humble but I want the quick answer — how can I be patient with what I cannot grasp?',
  },

  '000011': {
    ..._18_103_104,
    framing: 'My curiosity is sharp but my humility has not arrived — I may be seeking deeply for the wrong reason.',
  },

  // ═══ SINGLE ZEROS (5 bits set) ════════════════════════════

  '011111': {
    ..._2_32,
    framing: 'I am arriving certain rather than open — I need to remember that what I know was given, not earned.',
  },

  '101111': {
    ..._39_18,
    framing: 'I am filtering through what I already hold — I want to follow the best of it, not the familiar.',
  },

  '110111': {
    ..._57_16,
    framing: 'Being wrong feels like a threat right now — I am asking my heart to soften before I continue.',
  },

  '111011': {
    ..._35_28,
    framing: 'I am here for what this knowledge does for me — I want to receive it as something sacred instead.',
  },

  '111101': {
    ..._18_69,
    framing: 'I am reaching for the quick answer — I want to sit with difficulty the way a real student does.',
  },

  '111110': {
    ..._3_190,
    framing: 'I am satisfied with the surface — there are signs here for those who look more deeply.',
  },

  // ═══ TWO ZEROS — SAME ATTRIBUTE (Al-'Alim pairs) ═════════

  '001111': {
    ..._2_170,
    framing: 'I am following what I already believe and filtering out the rest — I need to set that down.',
  },

  '010111': {
    ..._40_83,
    framing: 'I am satisfied with what I already know and my identity depends on it — I came full.',
  },

  '011011': {
    ..._17_36,
    framing: 'I am pursuing confirmation for personal benefit — I owe this knowledge more honesty than that.',
  },

  '100111': {
    ..._40_35,
    framing: 'I am disputing from a position I cannot let go of — my pride has closed the door.',
  },

  '101011': {
    ..._54_3,
    framing: 'I am following my preferences and filtering truth through them — inclination is not the same as insight.',
  },

  '110011': {
    ..._22_54,
    framing: 'My heart has not yet submitted to what this knowledge asks of me — I am guarding myself, not receiving.',
  },

  // ═══ TWO ZEROS — CROSS ATTRIBUTE ═════════════════════════

  '011101': {
    ..._7_146,
    framing: 'I came to confirm and I want it quickly — my arrogance is turning me away from the signs.',
  },

  '011110': {
    ..._47_16,
    framing: 'I arrived certain and I am skimming the surface — my heart is sealed against what I do not know.',
  },

  '101101': {
    ..._10_39,
    framing: 'I am denying what I have not yet understood and I lack the patience to sit with it.',
  },

  '101110': {
    ..._45_8,
    framing: 'I hear but persist in what I already hold — I am not truly listening, just attending.',
  },

  '110101': {
    ..._2_45,
    framing: 'Being wrong feels threatening and I want the easy answer — I need patience and humility together.',
  },

  '110110': {
    ..._25_73,
    framing: 'I am protecting my identity and accepting only the surface — I do not want to be deaf and blind.',
  },

  '111001': {
    ..._18_66,
    framing: 'I am here for gain and I want the shortcut — I need to approach as Musa approached: teach me.',
  },

  '111010': {
    ..._29_43,
    framing: 'I am here for personal benefit and I am not going deep — real understanding requires more than attendance.',
  },

  // ═══ THREE ZEROS — 3 Al-'Alim, 0 Basir ══════════════════

  '000111': {
    ..._39_22,
    framing: 'My chest has not yet opened — I am confirming, filtering, and guarded, but I still sense the light beyond.',
  },

  '001011': {
    ..._27_14,
    framing: 'I am confirming and filtering for personal gain — I reject outwardly what my inner self knows is true.',
  },

  '010011': {
    ..._12_76,
    framing: 'I came certain, my identity tied to knowing, seeking gain — above every knower is One who knows more.',
  },

  '100011': {
    ..._17_85,
    framing: 'I am filtering, guarded, and self-serving even while I ask — I have been given only a little knowledge.',
  },

  // ═══ THREE ZEROS — 2 Al-'Alim + B1 absent ════════════════

  '001101': {
    ..._20_114,
    framing: 'I am confirming, filtering, and rushing — I need to slow down and ask my Lord to increase me.',
  },

  '010101': {
    ..._50_33,
    framing: 'I arrived certain, guarded, and wanting the quick answer — I need to come with a returning heart.',
  },

  '011001': {
    ..._58_11,
    framing: 'I am confirming for my own benefit and rushing past difficulty — elevation through knowledge is from Allah alone.',
  },

  '100101': {
    ..._2_45,
    framing: 'I filter, guard my identity, and rush — patience and humility together are what this learning asks of me.',
  },

  '101001': {
    ..._31_18,
    framing: 'I filter for personal benefit and rush past difficulty — something in me has turned its cheek away.',
  },

  '110001': {
    ..._3_7,
    framing: 'My identity and ambition rush me past what is hard — those grounded in knowledge say: all from our Lord.',
  },

  // ═══ THREE ZEROS — 2 Al-'Alim + B2 absent ════════════════

  '001110': {
    ..._2_269,
    framing: 'I confirm, filter, and stay at the surface — wisdom is given to those who are willing to be changed.',
  },

  '010110': {
    ..._17_109,
    framing: 'I arrived certain and guarded at the surface — true encountering of knowledge increases me in humility.',
  },

  '011010': {
    ..._96_1_5,
    framing: 'I seek to confirm what benefits me without depth — everything I know was taught in my Lord\'s name.',
  },

  '100110': {
    ..._40_35,
    framing: 'I filter, guard my identity, and stay shallow — I am disputing what I have no authority to dismiss.',
  },

  '101010': {
    ..._2_44,
    framing: 'I filter for gain and only skim — I am reading the knowledge without letting it read me.',
  },

  '110010': {
    ..._22_54,
    framing: 'I guard my identity and stay at the surface — my heart has not yet submitted to what is here.',
  },

  // ═══ THREE ZEROS — 1 Al-'Alim + B1 B2 both absent ════════

  '011100': {
    ..._29_43,
    framing: 'I came to confirm, I rush, and I stay shallow — real understanding demands I slow down and look again.',
  },

  '101100': {
    ..._25_73,
    framing: 'I filter, rush, and skim — I do not want to encounter what is being taught deaf and blind.',
  },

  '110100': {
    ..._57_16,
    framing: 'My identity guards me while I rush past depth — has the time not come for my heart to soften?',
  },

  '111000': {
    ..._35_28,
    framing: 'I seek gain, rush, and skim the surface — knowledge that produces awe of Allah requires more than this.',
  },

  // ═══ FOUR ZEROS — Al-'Alim pairs only ════════════════════

  '110000': {
    ..._20_114,
    framing: 'I am open to correction but everything else resists — my Lord, increase me in the knowledge that changes me.',
  },

  '101000': {
    ..._54_3,
    framing: 'I acknowledge my limits and hold lightly but I filter, seek gain, rush, and skim — I follow inclination.',
  },

  '100100': {
    ..._17_85,
    framing: 'I acknowledge and receive as trust but I filter and guard — I have been given only a little.',
  },

  '011000': {
    ..._40_83,
    framing: 'I accept correction and hold lightly but I confirm and seek gain — I rejoice in what I already have.',
  },

  '010100': {
    ..._39_22,
    framing: 'I accept correction and receive as trust but I confirm, guard, rush, and skim — my heart needs expansion.',
  },

  '001100': {
    ..._10_39,
    framing: 'I hold lightly and receive as trust but I confirm and filter — I deny what I have not grasped.',
  },

  // ═══ FOUR ZEROS — 1 Al-'Alim + B1 ═══════════════════════

  '100010': {
    ..._27_14,
    framing: 'I can be patient but I filter and guard my position — I reject what I know is true.',
  },

  '010010': {
    ..._7_146,
    framing: 'I accept correction and can be patient, but I confirm, guard, and seek gain — arrogance turns me from signs.',
  },

  '001010': {
    ..._45_8,
    framing: 'I hold lightly and can be patient, but I confirm, filter, and seek gain — I hear without truly hearing.',
  },

  '000110': {
    ..._2_32,
    framing: 'I receive as trust and sit with difficulty, but I confirm and filter — I know only what He teaches.',
  },

  // ═══ FOUR ZEROS — 1 Al-'Alim + B2 ═══════════════════════

  '100001': {
    ..._12_76,
    framing: 'I acknowledge my limits and ask why, but I filter and guard — above every knower is One more knowing.',
  },

  '010001': {
    ..._47_16,
    framing: 'I accept correction and ask why, but I confirm, guard, and seek gain — my heart follows desire, not truth.',
  },

  '001001': {
    ..._3_7,
    framing: 'I hold lightly and ask why, but I confirm and filter — I want to be grounded, not merely sharp.',
  },

  '000101': {
    ..._18_66,
    framing: 'I receive as trust and ask why, but I confirm and filter — I need to follow and be taught.',
  },

  // ═══ FIVE ZEROS (1 bit set) ══════════════════════════════

  '100000': {
    ..._39_9,
    framing: 'I acknowledge my limits but little else is open — are those who know equal to those who do not?',
  },

  '010000': {
    ..._18_68,
    framing: 'I accept correction but everything else resists — how can I be patient with what I do not yet know?',
  },

  '001000': {
    ..._18_103_104,
    framing: 'I hold knowledge lightly but little else is ready — my effort may be lost while I think I succeed.',
  },

  '000100': {
    ..._96_1_5,
    framing: 'I receive as trust but everything else is absent — the One who teaches by the pen taught me.',
  },

  '000010': {
    ..._40_83,
    framing: 'I sit with difficulty but little else is ready — I must not rejoice in what I think I know.',
  },

  '000001': {
    ..._3_190,
    framing: 'I ask why but almost nothing else is present — I need to become someone the signs can reach.',
  },
};
