/**
 * MAQASID OS — Environment Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Wakīl (The Trustee) · Al-Ḥakīm (The All-Wise)
 * Row distribution: 2 rows Al-Wakīl (K1–K2) · 4 rows Al-Ḥakīm (H1–H4)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: K1 K2 H1 H2 H3 H4
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   K1: Aware what I hold is a trust (amanah), not mine vs treating resources as available for my use
 *   K2: Aware choices have consequences for the unseen and future vs attending only to present and visible
 *   H1: Seeing the full arc across time vs deciding on immediate and visible effects only
 *   H2: Willing to accept present cost for a future I will not personally witness vs deferring cost to others
 *   H3: Examining full chain of effects honestly vs accepting received framing without scrutiny
 *   H4: Acting from principle not trend vs performing environmentalism visibly while exempting hidden choices
 *
 * Usage: READINESS_AYAT_ENVIRONMENT[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 30 unique ayat across 63 non-null entries
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all ≤ 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Theological poles:
 *     001111 → khilafah/amanah (trust conditions unresolved; wisdom present)
 *     110000 → hikma/'aqibah (trusteeship acknowledged; wisdom absent)
 *     100001 → ikhlas (trusteeship present but performative)
 *     011110 → accountability and depth of intention
 *
 * Grounded with quran.ai: fetch_quran(30 ayat, ar-simple-clean),
 *   fetch_translation(30 ayat, en-sahih-international)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_30 = {
  arabic: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ',
  transliteration: "Wa idh qala rabbuka lil-mala'ikati inni ja'ilun fil-ardi khalifa. Qalu ataj'alu fiha man yufsidu fiha wa yasfikud-dima'. Wa nahnu nusabbihu bihamdika wa nuqaddisu lak. Qala inni a'lamu ma la ta'lamun",
  translation: 'And [mention, O Muhammad], when your Lord said to the angels, "Indeed, I will make upon the earth a successive authority." They said, "Will You place upon it one who causes corruption therein and sheds blood, while we exalt You with praise and declare Your perfection?" He [Allah] said, "Indeed, I know that which you do not know."',
  source: 'Al-Baqarah 2:30',
  edition: 'en-sahih-international',
};

const _2_205 = {
  arabic: 'وَإِذَا تَوَلَّىٰ سَعَىٰ فِي الْأَرْضِ لِيُفْسِدَ فِيهَا وَيُهْلِكَ الْحَرْثَ وَالنَّسْلَ ۗ وَاللَّهُ لَا يُحِبُّ الْفَسَادَ',
  transliteration: "Wa idha tawalla sa'a fil-ardi liyufsida fiha wa yuhlikal-hartha wan-nasl. Wallahu la yuhibbul-fasad",
  translation: 'And when he goes away, he strives throughout the land to cause corruption therein and destroy crops and animals. And Allah does not like corruption.',
  source: 'Al-Baqarah 2:205',
  edition: 'en-sahih-international',
};

const _4_135 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ ۚ إِن يَكُنْ غَنِيًّا أَوْ فَقِيرًا فَاللَّهُ أَوْلَىٰ بِهِمَا ۖ فَلَا تَتَّبِعُوا الْهَوَىٰ أَن تَعْدِلُوا ۚ وَإِن تَلْوُوا أَوْ تُعْرِضُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا',
  transliteration: "Ya ayyuhal-ladhina amanu kunu qawwamina bil-qisti shuhadaa'a lillahi wa law 'ala anfusikum awil-walidayni wal-aqrabin. In yakun ghaniyyan aw faqiran fallahu awla bihima. Fala tattabi'ul-hawa an ta'dilu. Wa in talwu aw tu'ridu fa innallaha kana bima ta'maluna khabira",
  translation: 'O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives. Whether one is rich or poor, Allah is more worthy of both. So follow not [personal] inclination, lest you not be just. And if you distort [your testimony] or refuse [to give it], then indeed Allah is ever, of what you do, Aware.',
  source: "An-Nisa' 4:135",
  edition: 'en-sahih-international',
};

const _6_141 = {
  arabic: 'وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ وَالزَّيْتُونَ وَالرُّمَّانَ مُتَشَابِهًا وَغَيْرَ مُتَشَابِهٍ ۚ كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ ۖ وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ',
  transliteration: "Wa huwallAdhi ansha'a jannatin ma'rushatin wa ghayra ma'rushatin wan-nakhla waz-zar'a mukhtalifan ukuluhu waz-zaytuna war-rummana mutashabihan wa ghayra mutashabih. Kulu min thamarihi idha athmara wa atu haqqahu yawma hasadihi wa la tusrifu. Innahu la yuhibbul-musrifin",
  translation: 'And He it is who causes gardens to grow, [both] trellised and untrellised, and palm trees and crops of different [kinds of] food and olives and pomegranates, similar and dissimilar. Eat of [each of] its fruit when it yields and give its due [zakah] on the day of its harvest. And be not excessive. Indeed, He does not like those who commit excess.',
  source: "Al-An'am 6:141",
  edition: 'en-sahih-international',
};

const _6_165 = {
  arabic: 'وَهُوَ الَّذِي جَعَلَكُمْ خَلَائِفَ الْأَرْضِ وَرَفَعَ بَعْضَكُمْ فَوْقَ بَعْضٍ دَرَجَاتٍ لِّيَبْلُوَكُمْ فِي مَا آتَاكُمْ ۗ إِنَّ رَبَّكَ سَرِيعُ الْعِقَابِ وَإِنَّهُ لَغَفُورٌ رَّحِيمٌ',
  transliteration: "Wa huwal-ladhi ja'alakum khala'ifal-ardi wa rafa'a ba'dakum fawqa ba'din darajatin liyabluwakum fi ma atakum. Inna rabbaka sari'ul-'iqabi wa innahu laghafururrahim",
  translation: 'And it is He who has made you successors upon the earth and has raised some of you above others in degrees [of rank] that He may try you through what He has given you. Indeed, your Lord is swift in penalty; but indeed, He is Forgiving and Merciful.',
  source: "Al-An'am 6:165",
  edition: 'en-sahih-international',
};

const _7_10 = {
  arabic: 'وَلَقَدْ مَكَّنَّاكُمْ فِي الْأَرْضِ وَجَعَلْنَا لَكُمْ فِيهَا مَعَايِشَ ۗ قَلِيلًا مَّا تَشْكُرُونَ',
  transliteration: "Wa laqad makkannakum fil-ardi wa ja'alna lakum fiha ma'ayish. Qalilan ma tashkurun",
  translation: 'And We have certainly established you upon the earth and made for you therein ways of livelihood. Little are you grateful.',
  source: "Al-A'raf 7:10",
  edition: 'en-sahih-international',
};

const _7_31 = {
  arabic: 'يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ',
  transliteration: "Ya bani adama khudhu zinatakum 'inda kulli masjiddin wa kulu washrabu wa la tusrifu. Innahu la yuhibbul-musrifin",
  translation: 'O children of Adam, take your adornment [i.e., wear your clothing] at every masjid, and eat and drink, but be not excessive. Indeed, He likes not those who commit excess.',
  source: "Al-A'raf 7:31",
  edition: 'en-sahih-international',
};

const _7_56 = {
  arabic: 'وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا ۚ إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
  transliteration: "Wa la tufsidu fil-ardi ba'da islahiha wad'uhu khawfan wa tama'a. Inna rahmata-llahi qaribun minal-muhsinin",
  translation: 'And cause not corruption upon the earth after its reformation. And invoke Him in fear and aspiration. Indeed, the mercy of Allah is near to the doers of good.',
  source: "Al-A'raf 7:56",
  edition: 'en-sahih-international',
};

const _7_85 = {
  arabic: 'وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ ۖ فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ مُّؤْمِنِينَ',
  transliteration: "Wa ila madyana akhahum shu'ayba. Qala ya qawmi-'budullaha ma lakum min ilahin ghayruhu. Qad ja'atkum bayyinatun min rabbikum. Fa awful-kayla wal-mizana wa la tabkhasu-n-nasa ashya'ahum wa la tufsidu fil-ardi ba'da islahiha. Dhalikum khayrun lakum in kuntum mu'minin",
  translation: 'And to [the people of] Madyan [We sent] their brother Shuayb. He said, "O my people, worship Allah; you have no deity other than Him. There has come to you clear evidence from your Lord. So fulfill the measure and weight and do not deprive people of their due and cause not corruption upon the earth after its reformation. That is better for you, if you should be believers.',
  source: "Al-A'raf 7:85",
  edition: 'en-sahih-international',
};

const _10_14 = {
  arabic: 'ثُمَّ جَعَلْنَاكُمْ خَلَائِفَ فِي الْأَرْضِ مِن بَعْدِهِمْ لِنَنظُرَ كَيْفَ تَعْمَلُونَ',
  transliteration: "Thumma ja'alnakum khala'ifa fil-ardi min ba'dihim linandhura kayfa ta'malun",
  translation: 'Then We made you successors in the land after them so that We may observe how you will do.',
  source: 'Yunus 10:14',
  edition: 'en-sahih-international',
};

const _11_61 = {
  arabic: 'وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَالِحًا ۚ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا فَاسْتَغْفِرُوهُ ثُمَّ تُوبُوا إِلَيْهِ ۚ إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ',
  transliteration: "Wa ila thamuda akhahum salihan. Qala ya qawmi-'budullaha ma lakum min ilahin ghayruhu. Huwa ansha'akum minal-ardi wa-sta'marakum fiha fastagfhiruhu thumma tubu ilayh. Inna rabbi qaribun mujib",
  translation: 'And to Thamud [We sent] their brother Salih. He said, "O my people, worship Allah; you have no deity other than Him. He has produced you from the earth and settled you in it, so ask forgiveness of Him and then repent to Him. Indeed, my Lord is near and responsive."',
  source: 'Hud 11:61',
  edition: 'en-sahih-international',
};

const _13_11 = {
  arabic: 'لَهُ مُعَقِّبَاتٌ مِّن بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِ يَحْفَظُونَهُ مِنْ أَمْرِ اللَّهِ ۗ إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ ۗ وَإِذَا أَرَادَ اللَّهُ بِقَوْمٍ سُوءًا فَلَا مَرَدَّ لَهُ ۚ وَمَا لَهُم مِّن دُونِهِ مِن وَالٍ',
  transliteration: "Lahu mu'aqqibatun min bayni yadayhi wa min khalfihi yahfadunahu min amrillah. Innallaha la yughayyiru ma biqawmin hatta yughayyiru ma bi-anfusihim. Wa idha aradallahu biqawmin su'an fala radda lahu wa ma lahum min dunihi min wal",
  translation: 'For him [i.e., each one] are successive [angels] before and behind him who protect him by the decree of Allah. Indeed, Allah will not change the condition of a people until they change what is in themselves. And when Allah intends for a people ill, there is no repelling it. And there is not for them besides Him any patron.',
  source: "Ar-Ra'd 13:11",
  edition: 'en-sahih-international',
};

const _17_26 = {
  arabic: 'وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا',
  transliteration: "Wa ati dhal-qurba haqqahu wal-miskina wabnas-sabili wa la tubaddhir tabdhira",
  translation: 'And give the relative his right, and [also] the poor and the traveler, and do not spend wastefully.',
  source: "Al-Isra' 17:26",
  edition: 'en-sahih-international',
};

const _17_27 = {
  arabic: 'إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ ۖ وَكَانَ الشَّيْطَانُ لِرَبِّهِ كَفُورًا',
  transliteration: "Innal-mubadhdh'irina kanu ikhwana-sh-shayatin. Wa kanash-shaytanu lirabbihi kafura",
  translation: 'Indeed, the wasteful are brothers of the devils, and ever has Satan been to his Lord ungrateful.',
  source: "Al-Isra' 17:27",
  edition: 'en-sahih-international',
};

const _17_35 = {
  arabic: 'وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ ۚ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا',
  transliteration: "Wa awful-kayla idha kiltum wa zinu bil-qistasil-mustaqim. Dhalika khayrun wa ahsanu ta'wila",
  translation: 'And give full measure when you measure, and weigh with an even [i.e., honest] balance. That is the best [way] and best in result.',
  source: "Al-Isra' 17:35",
  edition: 'en-sahih-international',
};

const _18_7 = {
  arabic: 'إِنَّا جَعَلْنَا مَا عَلَى الْأَرْضِ زِينَةً لَّهَا لِنَبْلُوَهُمْ أَيُّهُمْ أَحْسَنُ عَمَلًا',
  transliteration: "Inna ja'alna ma 'alal-ardi zinatallaha linabluwahum ayyuhum ahsanu 'amala",
  translation: 'Indeed, We have made that which is on the earth adornment for it that We may test them [as to] which of them is best in deed.',
  source: 'Al-Kahf 18:7',
  edition: 'en-sahih-international',
};

const _21_105 = {
  arabic: 'وَلَقَدْ كَتَبْنَا فِي الزَّبُورِ مِن بَعْدِ الذِّكْرِ أَنَّ الْأَرْضَ يَرِثُهَا عِبَادِيَ الصَّالِحُونَ',
  transliteration: "Wa laqad katabna fiz-zaburi min ba'did-dhikri annal-arda yarithuha 'ibadiya-s-salihun",
  translation: 'And We have already written in the book [of Psalms] after the [previous] mention that the land [of Paradise] is inherited by My righteous servants.',
  source: "Al-Anbiya' 21:105",
  edition: 'en-sahih-international',
};

const _25_67 = {
  arabic: 'وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا',
  transliteration: "Walladhina idha anfaqu lam yusrifu wa lam yaqturu wa kana bayna dhalika qawama",
  translation: 'And [they are] those who, when they spend, do so not excessively or sparingly but are ever, between that, [justly] moderate',
  source: 'Al-Furqan 25:67',
  edition: 'en-sahih-international',
};

const _26_183 = {
  arabic: 'وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ',
  transliteration: "Wa la tabkhasu-n-nasa ashya'ahum wa la ta'thaw fil-ardi mufsidina",
  translation: 'And do not deprive people of their due and do not commit abuse on earth, spreading corruption.',
  source: 'Ash-Shu\'ara 26:183',
  edition: 'en-sahih-international',
};

const _30_41 = {
  arabic: 'ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ لِيُذِيقَهُم بَعْضَ الَّذِي عَمِلُوا لَعَلَّهُمْ يَرْجِعُونَ',
  transliteration: "Dhaharal-fasadu fil-barri wal-bahri bima kasabat aydi-n-nasi liyudhiqahum ba'dal-ladhi 'amilu la'allahum yarji'un",
  translation: 'Corruption has appeared throughout the land and sea by [reason of] what the hands of people have earned so He [i.e., Allah] may let them taste part of [the consequence of] what they have done that perhaps they will return [to righteousness].',
  source: 'Ar-Rum 30:41',
  edition: 'en-sahih-international',
};

const _31_20 = {
  arabic: 'أَلَمْ تَرَوْا أَنَّ اللَّهَ سَخَّرَ لَكُم مَّا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَأَسْبَغَ عَلَيْكُمْ نِعَمَهُ ظَاهِرَةً وَبَاطِنَةً ۗ وَمِنَ النَّاسِ مَن يُجَادِلُ فِي اللَّهِ بِغَيْرِ عِلْمٍ وَلَا هُدًى وَلَا كِتَابٍ مُّنِيرٍ',
  transliteration: "Alam taraw annallaha sakhkhara lakum ma fis-samawati wa ma fil-ardi wa asbagha 'alaykum ni'amahu dhahiratan wa batinah. Wa minan-nasi man yujadilu fillahi bighayri 'ilmin wa la hudan wa la kitabin munir",
  translation: 'Do you not see that Allah has made subject to you whatever is in the heavens and whatever is in the earth and amply bestowed upon you His favors, [both] apparent and unapparent? But of the people is he who disputes about Allah without knowledge or guidance or an enlightening Book [from Him].',
  source: 'Luqman 31:20',
  edition: 'en-sahih-international',
};

const _35_39 = {
  arabic: 'هُوَ الَّذِي جَعَلَكُمْ خَلَائِفَ فِي الْأَرْضِ ۚ فَمَن كَفَرَ فَعَلَيْهِ كُفْرُهُ ۖ وَلَا يَزِيدُ الْكَافِرِينَ كُفْرُهُمْ عِندَ رَبِّهِمْ إِلَّا مَقْتًا ۖ وَلَا يَزِيدُ الْكَافِرِينَ كُفْرُهُمْ إِلَّا خَسَارًا',
  transliteration: "Huwal-ladhi ja'alakum khala'ifa fil-ard. Faman kafara fa'alayhi kufruh. Wa la yazidu-l-kafirinal-kufruhum 'inda rabbihim illa maqta. Wa la yazidull-kafirina kufruhum illa khusara",
  translation: 'It is He who has made you successors upon the earth. And whoever disbelieves - upon him will be [the consequence of] his disbelief. And the disbelief of the disbelievers does not increase them in the sight of their Lord except in hatred; and the disbelief of the disbelievers does not increase them except in loss.',
  source: 'Fatir 35:39',
  edition: 'en-sahih-international',
};

const _39_9 = {
  arabic: 'أَمَّنْ هُوَ قَانِتٌ آنَاءَ اللَّيْلِ سَاجِدًا وَقَائِمًا يَحْذَرُ الْآخِرَةَ وَيَرْجُو رَحْمَةَ رَبِّهِ ۗ قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
  transliteration: "Amman huwa qanitun ana'al-layli sajidan wa qa'iman yahdharul-akhirata wa yarju rahmata rabbih. Qul hal yastawi-l-ladhina ya'lamuna wal-ladhina la ya'lamun. Innama yatadhakkaru ulul-albab",
  translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing [in prayer], fearing the Hereafter and hoping for the mercy of his Lord, [like one who does not]? Say, "Are those who know equal to those who do not know?" Only they will remember [who are] people of understanding.',
  source: 'Az-Zumar 39:9',
  edition: 'en-sahih-international',
};

const _45_13 = {
  arabic: 'وَسَخَّرَ لَكُم مَّا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ جَمِيعًا مِّنْهُ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  transliteration: "Wa sakhkhara lakum ma fis-samawati wa ma fil-ardi jami'an minh. Inna fi dhalika la'ayatin liqawmin yatafakkarun",
  translation: 'And He has subjected to you whatever is in the heavens and whatever is on the earth - all from Him. Indeed in that are signs for a people who give thought.',
  source: 'Al-Jathiyah 45:13',
  edition: 'en-sahih-international',
};

const _49_6 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ',
  transliteration: "Ya ayyuhal-ladhina amanu in ja'akum fasiqun bimba'in fatabayyanu an tusibu qawman bijahalaatin fatusbihu 'ala ma fa'altum nadimin",
  translation: 'O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance and become, over what you have done, regretful.',
  source: 'Al-Hujurat 49:6',
  edition: 'en-sahih-international',
};

const _55_8 = {
  arabic: 'أَلَّا تَطْغَوْا فِي الْمِيزَانِ',
  transliteration: "Alla tatghaw fil-mizan",
  translation: 'That you not transgress within the balance.',
  source: 'Ar-Rahman 55:8',
  edition: 'en-sahih-international',
};

const _55_9 = {
  arabic: 'وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ',
  transliteration: "Wa aqimul-wazna bil-qisti wa la tukhsirul-mizan",
  translation: 'And establish weight in justice and do not make deficient the balance.',
  source: 'Ar-Rahman 55:9',
  edition: 'en-sahih-international',
};

const _57_7 = {
  arabic: 'آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ ۖ فَالَّذِينَ آمَنُوا مِنكُمْ وَأَنفَقُوا لَهُمْ أَجْرٌ كَبِيرٌ',
  transliteration: "Aminu billahi wa rasulihi wa anfaqu mimma ja'alakum mustakhlafina fih. Falladhina amanu minkum wa anfaqu lahum ajrun kabir",
  translation: 'Believe in Allah and His Messenger and spend out of that in which He has made you successive inheritors. For those who have believed among you and spent, there will be a great reward.',
  source: 'Al-Hadid 57:7',
  edition: 'en-sahih-international',
};

const _59_18 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu-ttaqullaha waltandhur nafsun ma qaddamat lighad. Wattaqullaha. Innallaha khabirun bima ta'malun",
  translation: 'O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow - and fear Allah. Indeed, Allah is Aware of what you do.',
  source: 'Al-Hashr 59:18',
  edition: 'en-sahih-international',
};

const _98_5 = {
  arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ',
  transliteration: "Wa ma umiru illa liya'budullaha mukhlisina lahud-dina hunafa'a wa yuqimus-salata wa yu'tuz-zakata. Wa dhalika dinul-qayyimah",
  translation: 'And they were not commanded except to worship Allah, [being] sincere to Him in religion, inclining to truth, and to establish prayer and to give zakah. And that is the correct religion.',
  source: 'Al-Bayyinah 98:5',
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────
// Key: K1 K2 H1 H2 H3 H4  (1=YES, 0=NOT YET)

export const READINESS_AYAT_ENVIRONMENT = {

  // ═══ ALL YES — proceed ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) ═══

  '011111': { ..._2_30,
    framing: 'Before I act, I need to settle whose trust this earth actually is.' },

  '101111': { ..._59_18,
    framing: 'I see who is here now — I have not yet looked to what I am sending forward.' },

  '110111': { ..._30_41,
    framing: 'Corruption from human hands appears slowly — I need to look further along the arc.' },

  '111011': { ..._55_9,
    framing: 'Establish justice in the balance — I am choosing ease now and deferring cost to others.' },

  '111101': { ..._49_6,
    framing: 'I have accepted the framing given to me — I need to investigate before I act.' },

  '111110': { ..._98_5,
    framing: 'My engagement follows what is visible and approved — I need to examine my actual motive.' },

  // ═══ TWO NOT YET (2 zeros) ═══

  // K1-K2 both absent (trust foundation entirely missing)
  '001111': { ..._6_165,
    framing: 'The earth was given as succession under trial — I have not yet entered that awareness.' },

  // K1 + one H absent
  '010111': { ..._57_7,
    framing: 'Spend from what you hold as a successor — I need to enter the trust and look to the future.' },

  '011011': { ..._11_61,
    framing: 'He produced us from the earth and charged us to tend it — and I need to weigh the cost.' },

  '011101': { ..._7_10,
    framing: 'We were established here with provision — I need to receive the trust and examine honestly.' },

  '011110': { ..._35_39,
    framing: 'The succession carries accountability — I need the trust awareness and principled intent.' },

  // K2 + one H absent
  '100111': { ..._59_18,
    framing: 'I know this is a trust — I need to look at what today sends toward an unseen tomorrow.' },

  '101011': { ..._2_205,
    framing: 'Destruction of harvest reaches those who are not present — I need to see the arc and bear the cost.' },

  '101101': { ..._17_26,
    framing: 'The right of those not here is real — I need to look ahead and scrutinize what I accept.' },

  '101110': { ..._13_11,
    framing: 'Conditions change when we change ourselves — I need forward vision and principled action.' },

  // H1 + one H absent
  '110011': { ..._30_41,
    framing: 'What human hands earn has consequences across land and sea — I need to bear cost and examine deeply.' },

  '110101': { ..._7_56,
    framing: 'Do not cause corruption after reformation — I need to see the arc and scrutinize my reasoning.' },

  '110110': { ..._45_13,
    framing: 'There are signs for those who give thought — I need to look further and act from principle.' },

  // H2 + one H absent
  '111001': { ..._25_67,
    framing: 'True moderation is between excess and withholding — honest scrutiny and principled action are both needed.' },

  '111010': { ..._7_31,
    framing: 'Eat and drink but do not be excessive — I need honest examination of my choices and my motivation.' },

  // H3 + H4 both absent
  '111100': { ..._7_85,
    framing: 'Fulfill the measure and do not corrupt the earth — honest scrutiny and sincere intent are both needed.' },

  // ═══ THREE NOT YET (3 zeros) ═══

  // K1-K2-H1 absent
  '000111': { ..._2_30,
    framing: 'The weight of khilafah on earth is entire — I need to receive it before acting here.' },

  // K1-K2-H2 absent
  '001011': { ..._6_165,
    framing: 'Succession is a trial through what we are given — I need to enter that weight and bear its cost.' },

  // K1-K2-H3 absent
  '001101': { ..._10_14,
    framing: 'We were made successors to be observed in our deeds — honest examination of my choices is also needed.' },

  // K1-K2-H4 absent
  '001110': { ..._35_39,
    framing: 'He made us khalifas on earth — I need the trust foundation and principled, not performed, action.' },

  // K1-H1-H2 absent
  '010011': { ..._57_7,
    framing: 'What I hold as successor needs spending wisely — I need the trust and a willingness to bear present cost.' },

  // K1-H1-H3 absent
  '010101': { ..._31_20,
    framing: 'His favors were amply bestowed — I need to receive the trust and examine whether I use them honestly.' },

  // K1-H1-H4 absent
  '010110': { ..._6_141,
    framing: 'Give the harvest its due and do not be excessive — trust awareness and principled action are both needed.' },

  // K1-H2-H3 absent
  '011001': { ..._7_85,
    framing: 'Do not corrupt the earth after its reformation — I need the trust awareness and both wisdom conditions.' },

  // K1-H2-H4 absent
  '011010': { ..._26_183,
    framing: 'Do not deprive people and do not corrupt — I need trust awareness, honest cost-bearing, and right motive.' },

  // K1-H3-H4 absent
  '011100': { ..._7_56,
    framing: 'Do not corrupt after reformation — I need the trust foundation along with scrutiny and sincerity.' },

  // K2-H1-H2 absent
  '100011': { ..._59_18,
    framing: 'Look to what you send forward — I hold the trust but arc, cost, and scrutiny are missing.' },

  // K2-H1-H3 absent
  '100101': { ..._21_105,
    framing: 'The earth belongs to the righteous servants — I need accountability, full arc-vision, and honest scrutiny.' },

  // K2-H1-H4 absent
  '100110': { ..._18_7,
    framing: 'Everything on earth is a test of who acts best — I need forward vision, arc-seeing, and sincere intent.' },

  // K2-H2-H3 absent
  '101001': { ..._2_205,
    framing: 'Corruption destroys crops and life for those not present — honest examination and principle are both needed.' },

  // K2-H2-H4 absent
  '101010': { ..._17_27,
    framing: 'The wasteful are counted among the ungrateful — I need to see the future, bear cost, and check my motive.' },

  // K2-H3-H4 absent
  '101100': { ..._49_6,
    framing: 'Investigate before acting, lest you harm through ignorance — future accountability and sincerity are needed.' },

  // H1-H2-H3 absent
  '110001': { ..._45_13,
    framing: 'There are signs for those who give thought — three dimensions of wisdom are still needed here.' },

  // H1-H2-H4 absent
  '110010': { ..._55_8,
    framing: 'Do not transgress the balance — seeing the arc, bearing present cost, and honest scrutiny are all needed.' },

  // H1-H3-H4 absent
  '110100': { ..._4_135,
    framing: 'Stand firm in justice even against yourself — seeing the arc and honest scrutiny and sincerity are needed.' },

  // H2-H3-H4 absent
  '111000': { ..._7_31,
    framing: 'Eat and drink without excess — willingness to bear cost, honest examination, and true motive are all needed.' },

  // ═══ FOUR NOT YET (4 zeros) ═══

  // 2 ones: K1-K2 yes, rest absent
  '110000': { ..._45_13,
    framing: 'I acknowledge the trust — all four dimensions of wisdom about consequences are still absent here.' },

  // 2 ones: K1-H1
  '101000': { ..._59_18,
    framing: 'I hold the trust and see the arc — but accountability to the future and three wisdom conditions are missing.' },

  // 2 ones: K1-H2
  '100100': { ..._57_7,
    framing: 'I hold the trust and accept cost — but forward accountability and honest scrutiny and motive need attending.' },

  // 2 ones: K1-H3
  '100010': { ..._13_11,
    framing: 'I hold the trust and scrutinize honestly — conditions will not change until we change what is within ourselves.' },

  // 2 ones: K1-H4
  '100001': { ..._98_5,
    framing: 'I hold the trust and act from principle — but future sight, arc-vision, cost-bearing, and scrutiny are absent.' },

  // 2 ones: K2-H1
  '011000': { ..._30_41,
    framing: 'I look forward and see the arc — but the trust foundation and three wisdom conditions are all still needed.' },

  // 2 ones: K2-H2
  '010100': { ..._17_27,
    framing: 'I look ahead and bear present cost — but the trust foundation, honest scrutiny, and motive are needed.' },

  // 2 ones: K2-H3
  '010010': { ..._6_141,
    framing: 'I look forward and examine honestly — but the trust foundation and three other wisdom conditions are absent.' },

  // 2 ones: K2-H4
  '010001': { ..._39_9,
    framing: 'Those who know are not equal to those who do not — I need trust, accountability, and wisdom here.' },

  // 2 ones: H1-H2
  '001100': { ..._7_56,
    framing: 'I see consequences and accept their cost — but the whole trust foundation is still unbuilt beneath this.' },

  // 2 ones: H1-H3
  '001010': { ..._26_183,
    framing: 'I see the arc and examine honestly — but the trust conditions and cost-bearing and principle are all absent.' },

  // 2 ones: H1-H4
  '001001': { ..._11_61,
    framing: 'He produced us from earth and charged us to build it — four foundational conditions still need attending.' },

  // 2 ones: H2-H3
  '000110': { ..._2_30,
    framing: 'I accept present cost and scrutinize honestly — but the trust and future accountability are still absent.' },

  // 2 ones: H2-H4
  '000101': { ..._6_165,
    framing: 'I bear present cost and act from principle — but the trust conditions and forward vision and arc-seeing are absent.' },

  // 2 ones: H3-H4
  '000011': { ..._10_14,
    framing: 'We were made successors to be observed — I scrutinize and act from principle, but need four more conditions.' },

  // ═══ FIVE NOT YET (5 zeros) ═══

  '100000': { ..._2_30,
    framing: 'Khilafah on earth is the weight I hold — all five other dimensions are still unresolved before me.' },

  '010000': { ..._59_18,
    framing: 'Let every soul look to what it sends forward — I sense tomorrow but all other conditions are absent.' },

  '001000': { ..._30_41,
    framing: 'Corruption has spread from what human hands earned — nearly every condition for wise action is still missing.' },

  '000100': { ..._55_9,
    framing: 'Establish weight in justice — I am willing to bear cost but all other foundations are still absent.' },

  '000010': { ..._49_6,
    framing: 'Investigate before acting — I can examine honestly but all surrounding conditions are still unresolved.' },

  '000001': { ..._98_5,
    framing: 'Only sincere worship was commanded of us — I bring principle but all five other conditions need attention.' },

  // ═══ ALL NOT YET (6 zeros) ═══

  '000000': { ..._6_165,
    framing: 'Every condition is unresolved — I need to receive the full weight of my position as khalifah on this earth.' },

};


// ─── Lookup Helper ────────────────────────────────────────────

export function lookupReadinessAyah(key) {
  return READINESS_AYAT_ENVIRONMENT[key] || null;
}
