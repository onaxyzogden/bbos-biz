/**
 * Maqasid OS — Intellect Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Fattāḥ (The Opener) · Al-ʿAlīm (The All-Knowing)
 * Row distribution: 2 rows Al-Fattāḥ (F1–F2) · 4 rows Al-ʿAlīm (A1–A4)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: F1 F2 A1 A2 A3 A4
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   F1: Willing to be genuinely surprised vs approaching to confirm
 *   F2: Holding understanding as provisional vs defending unsettled positions
 *   A1: Engaging to understand and apply vs accumulating without accountability
 *   A2: Honest about limits of knowledge vs speaking beyond what evidence supports
 *   A3: Holding knowledge as trust with accountability vs treating it as personal property
 *   A4: Critical thinking as path to truth vs performance of sophistication
 *
 * Usage: READINESS_AYAT_INTELLECT[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 24 unique ayat across 63 non-null entries (max 2 uses per ayah)
 * - Shared ayat (2 uses): 47:24(2), 45:23(3), 39:22(2), 6:125(2), 2:32(1),
 *   22:54(2), 39:9(2), 3:66(3), 62:5(3), 30:7(2), 20:114(2), 96:5(2),
 *   17:36(2), 53:28(2), 10:36(2), 49:12(2), 8:27(2), 23:8(2), 4:58(2),
 *   33:72(3), 49:6(3), 39:18(2), 34:46(3), 12:111(2)
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Combinations flagged for scholarly review: none
 *
 * Grounded with quran.ai: fetch_quran(24 ayat, ar-simple-clean),
 *   fetch_translation(24 ayat, en-sahih-international),
 *   search_quran(8 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

// F1=0 pool — opening the heart to genuine discovery

const _47_24 = {
  arabic: 'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا',
  transliteration: "Afala yatadabbarunal-Qur'ana am 'ala qulubin aqfaluha",
  translation: "Then do they not reflect upon the Qur'ān, or are there locks upon [their] hearts?",
  source: 'Muhammad 47:24',
  edition: 'en-sahih-international',
};

const _45_23 = {
  arabic: 'أَفَرَأَيْتَ مَنِ اتَّخَذَ إِلَٰهَهُ هَوَاهُ وَأَضَلَّهُ اللَّهُ عَلَىٰ عِلْمٍ وَخَتَمَ عَلَىٰ سَمْعِهِ وَقَلْبِهِ وَجَعَلَ عَلَىٰ بَصَرِهِ غِشَاوَةً فَمَن يَهْدِيهِ مِن بَعْدِ اللَّهِ ۚ أَفَلَا تَذَكَّرُونَ',
  transliteration: "Afara'ayta manit-takhadha ilahahu hawahu wa adallahullahu 'ala 'ilmin wa khatama 'ala sam'ihi wa qalbihi wa ja'ala 'ala basarihi ghishawah. Faman yahdihi min ba'dillah. Afala tadhakkarun",
  translation: 'Have you seen he who has taken as his god his [own] desire, and Allāh has sent him astray due to knowledge and has set a seal upon his hearing and his heart and put over his vision a veil? So who will guide him after Allāh? Then will you not be reminded?',
  source: 'Al-Jathiyah 45:23',
  edition: 'en-sahih-international',
};

const _39_22 = {
  arabic: 'أَفَمَن شَرَحَ اللَّهُ صَدْرَهُ لِلْإِسْلَامِ فَهُوَ عَلَىٰ نُورٍ مِّن رَّبِّهِ ۚ فَوَيْلٌ لِّلْقَاسِيَةِ قُلُوبُهُم مِّن ذِكْرِ اللَّهِ ۚ أُولَٰئِكَ فِي ضَلَالٍ مُّبِينٍ',
  transliteration: "Afaman sharaha-llahu sadrahu lil-islami fahuwa 'ala nurin min rabbih. Fawaylun lil-qasiyati qulubuhu min dhikrillah. Ula'ika fi dalalin mubin",
  translation: 'So is one whose breast Allāh has expanded to [accept] Islām and he is upon [i.e., guided by] a light from his Lord [like one whose heart rejects it]? Then woe to those whose hearts are hardened against the remembrance of Allāh. Those are in manifest error.',
  source: 'Az-Zumar 39:22',
  edition: 'en-sahih-international',
};

const _6_125 = {
  arabic: 'فَمَن يُرِدِ اللَّهُ أَن يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ ۖ وَمَن يُرِدْ أَن يُضِلَّهُ يَجْعَلْ صَدْرَهُ ضَيِّقًا حَرَجًا كَأَنَّمَا يَصَّعَّدُ فِي السَّمَاءِ ۚ كَذَٰلِكَ يَجْعَلُ اللَّهُ الرِّجْسَ عَلَى الَّذِينَ لَا يُؤْمِنُونَ',
  transliteration: "Faman yuridillahu an yahdiyahu yashrah sadrahu lil-islam. Wa man yurid an yudillahu yaj'al sadrahu dayyiqan harajan ka'annama yassa''adu fis-sama'. Kadhalika yaj'alullahu-r-rijsa 'alal-ladhina la yu'minun",
  translation: 'So whoever Allāh wants to guide - He expands his breast to [contain] Islām; and whoever He wants to send astray - He makes his breast tight and constricted as though he were climbing into the sky. Thus does Allāh place defilement upon those who do not believe.',
  source: "Al-An'am 6:125",
  edition: 'en-sahih-international',
};

// F2=0 pool — holding understanding with humility

const _2_32 = {
  arabic: 'قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا ۖ إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ',
  transliteration: "Qalu subhanaka la 'ilma lana illa ma 'allamtana. Innaka antal-'alimul-hakim",
  translation: 'They said, "Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise."',
  source: 'Al-Baqarah 2:32',
  edition: 'en-sahih-international',
};

const _22_54 = {
  arabic: 'وَلِيَعْلَمَ الَّذِينَ أُوتُوا الْعِلْمَ أَنَّهُ الْحَقُّ مِن رَّبِّكَ فَيُؤْمِنُوا بِهِ فَتُخْبِتَ لَهُ قُلُوبُهُمْ ۗ وَإِنَّ اللَّهَ لَهَادِ الَّذِينَ آمَنُوا إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
  transliteration: "Waliya'lamal-ladhina util-'ilma annahu-l-haqqu min rabbika fayu'minu bihi fatakhbita lahu qulubuhum. Wa innallaha lahadi-l-ladhina amanu ila siratin mustaqim",
  translation: 'And so those who were given knowledge may know that it is the truth from your Lord and [therefore] believe in it, and their hearts humbly submit to it. And indeed is Allāh the Guide of those who have believed to a straight path.',
  source: 'Al-Hajj 22:54',
  edition: 'en-sahih-international',
};

const _39_9 = {
  arabic: 'أَمَّنْ هُوَ قَانِتٌ آنَاءَ اللَّيْلِ سَاجِدًا وَقَائِمًا يَحْذَرُ الْآخِرَةَ وَيَرْجُو رَحْمَةَ رَبِّهِ ۗ قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
  transliteration: "Amman huwa qanitun ana'al-layli sajidan wa qa'iman yahdharul-akhirata wa yarju rahmata rabbih. Qul hal yastawi-l-ladhina ya'lamuna wal-ladhina la ya'lamun. Innama yatadhakkaru ulul-albab",
  translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing [in prayer], fearing the Hereafter and hoping for the mercy of his Lord, [like one who does not]? Say, "Are those who know equal to those who do not know?" Only they will remember [who are] people of understanding.',
  source: 'Az-Zumar 39:9',
  edition: 'en-sahih-international',
};

const _3_66 = {
  arabic: 'هَا أَنتُمْ هَٰؤُلَاءِ حَاجَجْتُمْ فِيمَا لَكُم بِهِ عِلْمٌ فَلِمَ تُحَاجُّونَ فِيمَا لَيْسَ لَكُم بِهِ عِلْمٌ ۚ وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ',
  transliteration: "Ha antum ha'ula'i hajjajtum fima lakum bihi 'ilmun falima tuhajjuna fima laysa lakum bihi 'ilm. Wallahu ya'lamu wa antum la ta'lamun",
  translation: 'Here you are - those who have argued about that of which you have [some] knowledge, but why do you argue about that of which you have no knowledge? And Allāh knows, while you know not.',
  source: "Ali 'Imran 3:66",
  edition: 'en-sahih-international',
};

// A1=0 pool — knowledge engaged for application, not mere possession

const _62_5 = {
  arabic: 'مَثَلُ الَّذِينَ حُمِّلُوا التَّوْرَاةَ ثُمَّ لَمْ يَحْمِلُوهَا كَمَثَلِ الْحِمَارِ يَحْمِلُ أَسْفَارًا ۚ بِئْسَ مَثَلُ الْقَوْمِ الَّذِينَ كَذَّبُوا بِآيَاتِ اللَّهِ ۚ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ',
  transliteration: "Mathalu-l-ladhina hummilut-tawrata thumma lam yahmiluha kamathali-l-himari yahmilu asfara. Bi'sa mathalu-l-qawmi-l-ladhina kadhdhabu bi'ayatillah. Wallahu la yahdil-qawma-z-zalimin",
  translation: 'The example of those who were entrusted with the Torah and then did not take it on is like that of a donkey who carries volumes [of books]. Wretched is the example of the people who deny the signs of Allāh. And Allāh does not guide the wrongdoing people.',
  source: "Al-Jumu'ah 62:5",
  edition: 'en-sahih-international',
};

const _30_7 = {
  arabic: 'يَعْلَمُونَ ظَاهِرًا مِّنَ الْحَيَاةِ الدُّنْيَا وَهُمْ عَنِ الْآخِرَةِ هُمْ غَافِلُونَ',
  transliteration: "Ya'lamuna zahiran minal-hayatid-dunya wa hum 'anil-akhirati hum ghafilun",
  translation: 'They know what is apparent of the worldly life, but they, of the Hereafter, are unaware.',
  source: 'Ar-Rum 30:7',
  edition: 'en-sahih-international',
};

const _20_114 = {
  arabic: 'فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا',
  transliteration: "Fata'alallahu-l-maliku-l-haqq. Wa la ta'jal bil-Qur'ani min qabli an yuqda ilayka wahyuhu wa qur-rabbi zidni 'ilma",
  translation: 'So high [above all] is Allāh, the Sovereign, the Truth. And, [O Muḥammad], do not hasten with [recitation of] the Qur\'ān before its revelation is completed to you, and say, "My Lord, increase me in knowledge."',
  source: 'Ta-Ha 20:114',
  edition: 'en-sahih-international',
};

const _96_5 = {
  arabic: 'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
  transliteration: "'Allama-l-insana ma lam ya'lam",
  translation: 'Taught man that which he knew not.',
  source: "Al-'Alaq 96:5",
  edition: 'en-sahih-international',
};

// A2=0 pool — honest about the limits of knowledge

const _17_36 = {
  arabic: 'وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا',
  transliteration: "Wa la taqfu ma laysa laka bihi 'ilm. Innas-sam'a wal-basara wal-fu'ada kullu ula'ika kana 'anhu mas'ula",
  translation: 'And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart - about all those [one] will be questioned.',
  source: 'Al-Isra 17:36',
  edition: 'en-sahih-international',
};

const _53_28 = {
  arabic: 'وَمَا لَهُم بِهِ مِنْ عِلْمٍ ۖ إِن يَتَّبِعُونَ إِلَّا الظَّنَّ ۖ وَإِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا',
  transliteration: "Wa ma lahum bihi min 'ilm. In yattabi'una illaz-zanna wa innaz-zanna la yughnin minal-haqqi shay'a",
  translation: 'And they have thereof no knowledge. They follow not except assumption, and indeed, assumption avails not against the truth at all.',
  source: 'An-Najm 53:28',
  edition: 'en-sahih-international',
};

const _10_36 = {
  arabic: 'وَمَا يَتَّبِعُ أَكْثَرُهُمْ إِلَّا ظَنًّا ۚ إِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا ۚ إِنَّ اللَّهَ عَلِيمٌ بِمَا يَفْعَلُونَ',
  transliteration: "Wa ma yattabi'u aktharuhum illa dhanna. Innaz-zanna la yughnin minal-haqqi shay'a. Innallaha 'alimun bima yaf'alun",
  translation: 'And most of them follow not except assumption. Indeed, assumption avails not against the truth at all. Indeed, Allāh is Knowing of what they do.',
  source: 'Yunus 10:36',
  edition: 'en-sahih-international',
};

const _49_12 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ',
  transliteration: "Ya ayyuhal-ladhina amanuj-tanibu kathiran minaz-zann. Inna ba'daz-zanni ithm. Wa la tajassasu wa la yaghtab ba'dukum ba'da. Ayuhibbu ahadukum an ya'kula lahma akhihi maytan fakarihtumuhu. Wattaqullaha. Innallaha tawwabur-rahim",
  translation: 'O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin. And do not spy or backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it. And fear Allāh; indeed, Allāh is Accepting of Repentance and Merciful.',
  source: 'Al-Hujurat 49:12',
  edition: 'en-sahih-international',
};

// A3=0 pool — knowledge as amanah (trust), not personal possession

const _8_27 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَخُونُوا اللَّهَ وَالرَّسُولَ وَتَخُونُوا أَمَانَاتِكُمْ وَأَنتُمْ تَعْلَمُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu la takhunullaha war-rasula wa takhunu amanatikum wa antum ta'lamun",
  translation: 'O you who have believed, do not betray Allāh and the Messenger or betray your trusts while you know [the consequence].',
  source: 'Al-Anfal 8:27',
  edition: 'en-sahih-international',
};

const _23_8 = {
  arabic: 'وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ',
  transliteration: "Wal-ladhina hum li'amanatihim wa 'ahdihim ra'un",
  translation: 'And they who are to their trusts and their promises attentive',
  source: "Al-Mu'minun 23:8",
  edition: 'en-sahih-international',
};

const _4_58 = {
  arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ ۚ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُم بِهِ ۗ إِنَّ اللَّهَ كَانَ سَمِيعًا بَصِيرًا',
  transliteration: "Innallaha ya'murukum an tu'addul-amanati ila ahliha wa idha hakamtum baynan-nasi an tahkumu bil-'adl. Innallaha ni'imma ya'idhukum bih. Innallaha kana sami'an basira",
  translation: 'Indeed, Allāh commands you to render trusts to whom they are due and when you judge between people to judge with justice. Excellent is that which Allāh instructs you. Indeed, Allāh is ever Hearing and Seeing.',
  source: 'An-Nisa 4:58',
  edition: 'en-sahih-international',
};

const _33_72 = {
  arabic: 'إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا وَأَشْفَقْنَ مِنْهَا وَحَمَلَهَا الْإِنسَانُ ۖ إِنَّهُ كَانَ ظَلُومًا جَهُولًا',
  transliteration: "Inna 'aradnal-amanata 'alas-samawati wal-ardi wal-jibali faabayna an yahmilnaha wa ashfaqna minha wa hamalahal-insan. Innahu kana dhaluman jahula",
  translation: 'Indeed, We offered the Trust to the heavens and the earth and the mountains, and they declined to bear it and feared it; but man [undertook to] bear it. Indeed, he was unjust and ignorant.',
  source: 'Al-Ahzab 33:72',
  edition: 'en-sahih-international',
};

// A4=0 pool — critical thinking as path to truth, not performance

const _49_6 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ',
  transliteration: "Ya ayyuhal-ladhina amanu in ja'akum fasiqun binaba'in fatabayyanuu an tusibuu qawman bijahalahin fatusbihu 'ala ma fa'altum nadimin",
  translation: 'O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance and become, over what you have done, regretful.',
  source: 'Al-Hujurat 49:6',
  edition: 'en-sahih-international',
};

const _39_18 = {
  arabic: 'الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ ۚ أُولَٰئِكَ الَّذِينَ هَدَاهُمُ اللَّهُ ۖ وَأُولَٰئِكَ هُمْ أُولُو الْأَلْبَابِ',
  transliteration: "Alladhina yastami'unal-qawla fayattabi'una ahsanah. Ula'ikal-ladhina hadahumullah. Wa ula'ika hum ulul-albab",
  translation: 'Who listen to speech and follow the best of it. Those are the ones Allāh has guided, and those are people of understanding.',
  source: 'Az-Zumar 39:18',
  edition: 'en-sahih-international',
};

const _34_46 = {
  arabic: 'قُلْ إِنَّمَا أَعِظُكُم بِوَاحِدَةٍ ۖ أَن تَقُومُوا لِلَّهِ مَثْنَىٰ وَفُرَادَىٰ ثُمَّ تَتَفَكَّرُوا ۚ مَا بِصَاحِبِكُم مِّن جِنَّةٍ ۚ إِنْ هُوَ إِلَّا نَذِيرٌ لَّكُم بَيْنَ يَدَيْ عَذَابٍ شَدِيدٍ',
  transliteration: "Qul innama a'idhukum biwahidah. An taqumu lillahi mathna wa furada thumma tatafakkaru. Ma bisahibikum min jinnah. In huwa illa nadhirun lakum bayna yaday 'adhabin shadid",
  translation: 'Say, "I only advise you of one [thing] - that you stand for Allāh, [seeking truth] in pairs and individually, and then give thought." There is not in your companion any madness. He is only a warner to you before a severe punishment.',
  source: 'Saba 34:46',
  edition: 'en-sahih-international',
};

const _12_111 = {
  arabic: 'لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ ۗ مَا كَانَ حَدِيثًا يُفْتَرَىٰ وَلَٰكِن تَصْدِيقَ الَّذِي بَيْنَ يَدَيْهِ وَتَفْصِيلَ كُلِّ شَيْءٍ وَهُدًى وَرَحْمَةً لِّقَوْمٍ يُؤْمِنُونَ',
  transliteration: "Laqad kana fi qasasihim 'ibratun li'ulil-albab. Ma kana hadithan yuftara walakin tasdiqal-ladhi bayna yadayhi wa tafsilakulla shay'in wa hudan wa rahmatan liqawmin yu'minun",
  translation: "There was certainly in their stories a lesson for those of understanding. Never was it [i.e., the Qur'ān] a narration invented, but a confirmation of what was before it and a detailed explanation of all things and guidance and mercy for a people who believe.",
  source: 'Yusuf 12:111',
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_INTELLECT = {

  // ═══ ALL YES — all conditions met ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  '011111': { ..._47_24,
    framing: 'I notice I am arriving with the answer already settled — I want to come back open.' },

  '101111': { ..._2_32,
    framing: 'I am holding this position more tightly than the evidence warrants — only You truly know.' },

  '110111': { ..._62_5,
    framing: 'I am gathering without intending to act — I need to reconnect to why this knowledge matters.' },

  '111011': { ..._17_36,
    framing: 'I am speaking beyond what I actually know — my hearing and heart will be asked about this.' },

  '111101': { ..._8_27,
    framing: 'I am treating what I know as mine alone — this knowledge is a trust I am accountable for.' },

  '111110': { ..._39_18,
    framing: 'I am using my thinking to hold distance — I want to let reasoning lead me closer to truth.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // F-F pair (both gaps in Al-Fattāḥ)

  '001111': { ..._45_23,
    framing: 'My desire has become my compass — I need to pause before it seals what I can still hear.' },

  // F1-A pairs

  '010111': { ..._22_54,
    framing: 'Real knowledge arrives with humility — its truth softens the heart that is open to receive it.' },

  '011011': { ..._3_66,
    framing: 'I am arriving to confirm and speaking past my evidence — Allāh knows what I do not.' },

  '011101': { ..._23_8,
    framing: 'I am closed to revision and treating knowing as ownership — both need to be released.' },

  '011110': { ..._49_6,
    framing: 'I want to be genuinely open and to investigate sincerely — not to perform either.' },

  // F2-A pairs

  '100111': { ..._39_22,
    framing: 'I am holding my current view and accumulating more — a hardened heart receives no light.' },

  '101011': { ..._10_36,
    framing: 'I am provisional in belief but not in speech — I follow assumption past where it can carry me.' },

  '101101': { ..._4_58,
    framing: 'I am open to learning but not to responsibility — knowledge demands delivery to its rightful owners.' },

  '101110': { ..._34_46,
    framing: 'I want to hold my thinking lightly and orient it toward truth, standing for Allāh.' },

  // A-A pairs

  '110011': { ..._53_28,
    framing: 'I am accumulating and speaking beyond my evidence — assumption cannot carry me to truth.' },

  '110101': { ..._33_72,
    framing: 'I am collecting what I know without attending to the weight of carrying it faithfully.' },

  '110110': { ..._39_9,
    framing: 'Those who know and those who merely hold knowledge are not equal — I want to truly know.' },

  '111001': { ..._49_12,
    framing: 'I am speaking beyond what I know and treating it carelessly — some assumption is sin.' },

  '111010': { ..._12_111,
    framing: 'I want my reasoning to reach truth, not to be used as a shield against being taught.' },

  '111100': { ..._20_114,
    framing: 'I am applying knowledge and honest about limits — but I need intention and purpose before proceeding.' },

  // ═══ THREE NOT YET (3 zeros) — triple gaps ═══

  '000111': { ..._45_23,
    framing: 'My desire is the guide and my position is settled — I am closed to what I might still discover.' },

  '001011': { ..._3_66,
    framing: 'I am approaching to confirm and speaking past my limits — Allāh knows what I have not admitted.' },

  '001101': { ..._8_27,
    framing: 'I am closed, accumulating without purpose, and unaccountable — betraying what I know I carry.' },

  '001110': { ..._49_6,
    framing: 'I am arriving to confirm and performing investigation rather than doing it — pause here first.' },

  '010011': { ..._53_28,
    framing: 'I am defending a position and speaking from assumption — assumption does not reach the truth.' },

  '010101': { ..._23_8,
    framing: 'I am holding a position I have not revisited and treating knowing as mine — trusts require attending to.' },

  '010110': { ..._22_54,
    framing: 'I am defending settled positions and using thinking as a shield — hearts that truly know submit.' },

  '011001': { ..._17_36,
    framing: 'I am closed, collecting without use, and overreaching — my hearing and heart are both accountable.' },

  '011010': { ..._39_18,
    framing: 'I want to be genuinely open, to learn for use, and let the best of what I hear guide me.' },

  '011100': { ..._20_114,
    framing: 'I am entering without openness and without clarity of whose service this learning is for.' },

  '100011': { ..._10_36,
    framing: 'I am open to surprise yet accumulating and speaking from assumption — zann cannot reach truth.' },

  '100101': { ..._4_58,
    framing: 'I am willing to be surprised but collecting without intention and without accountability for what I carry.' },

  '100110': { ..._34_46,
    framing: 'I am open but not yet grounded in purpose or sincerity — stand for Allāh, then give thought.' },

  '101001': { ..._49_12,
    framing: 'I am holding things provisionally but speaking past that and not attending to what I carry.' },

  '101010': { ..._30_7,
    framing: 'I hold views loosely but accumulate without using and think for appearances — surface only.' },

  '101100': { ..._33_72,
    framing: 'I am provisional but carrying knowledge without intention or accountability for how it is held.' },

  '110001': { ..._62_5,
    framing: 'I am open and humble, but carrying knowledge unacted-on and speaking without honest limits.' },

  '110010': { ..._39_9,
    framing: 'I am open and honest but gathering without purpose and thinking as performance — these are not equal.' },

  '110100': { ..._96_5,
    framing: 'What I know was given to me — I need intention and accountability before I can carry it forward.' },

  '111000': { ..._49_6,
    framing: 'My relationship with knowing is intact; it is how I use and share it that needs examination now.' },

  // ═══ FOUR NOT YET (4 zeros) — quadruple gaps ═══

  '000011': { ..._45_23,
    framing: 'I am closed on every entry point to knowing — desire has sealed what could still be opened.' },

  '000101': { ..._6_125,
    framing: 'My chest is tight where it could be expanded — I need Al-Fattāḥ to open before I continue.' },

  '000110': { ..._47_24,
    framing: 'I am closed, defending, and using thinking as a wall — are there locks upon my heart?' },

  '001001': { ..._17_36,
    framing: 'I am arriving to confirm and speaking past limits, with knowledge unaccountable — pause fully here.' },

  '001010': { ..._62_5,
    framing: 'I am closed, collecting without use, and thinking as performance — carrying books, not living them.' },

  '001100': { ..._39_22,
    framing: 'I am resisting guidance and accumulating without stewardship — a hardened heart finds no light.' },

  '010001': { ..._3_66,
    framing: 'I am defending what I have not revisited and speaking beyond its edges — Allāh knows what I do not.' },

  '010010': { ..._30_7,
    framing: 'I am holding settled views, collecting surface knowledge, and performing thought — this is the apparent only.' },

  '010100': { ..._22_54,
    framing: 'I need to hold what I know as provisional and to know that trust in knowledge must be answered for.' },

  '011000': { ..._20_114,
    framing: 'I want openness in how I enter and clarity in whose service this knowledge is being taken on.' },

  '100001': { ..._34_46,
    framing: 'I am open but not yet applying, accountable, or seeking sincerely — stand for Allāh and then reflect.' },

  '100010': { ..._39_9,
    framing: 'I am open but not applying, not yet using what I know, and not yet thinking for truth.' },

  '100100': { ..._33_72,
    framing: 'I am open to being surprised, but the Trust I carry requires both intention and accountability.' },

  '101000': { ..._8_27,
    framing: 'I am holding things provisionally but not accountable for them — do not betray what you know you carry.' },

  '110000': { ..._96_5,
    framing: 'I am open and humble; I need to ask what this knowledge is for and who it serves.' },

  // ═══ FIVE NOT YET (5 zeros) — quintuple gaps ═══

  '000001': { ..._47_24,
    framing: 'Almost everything about my approach to knowing needs re-examination — are there locks upon my heart?' },

  '000010': { ..._49_6,
    framing: 'Nearly every dimension of knowing is misaligned — I want to investigate before I am regretful.' },

  '000100': { ..._33_72,
    framing: 'Only my accountability remains intact — the Trust was offered to mountains; man chose to carry it.' },

  '001000': { ..._62_5,
    framing: 'I am closed in spirit, defensive, overreaching, and unaccountable — carrying books without bearing them.' },

  '010000': { ..._3_66,
    framing: 'I hold knowledge as settled and mine — why argue beyond what I know? Allāh knows what I do not.' },

  '100000': { ..._6_125,
    framing: 'I am open but everything else in my relationship with knowing needs attending — expand before entering.' },

  // ═══ ALL NOT YET (6 zeros) — full pause ═══

  '000000': { ..._45_23,
    framing: 'Every dimension of knowing is closed — desire has become the guide; I need to pause fully before proceeding.' },

};

export function lookupReadinessAyah(key) {
  return READINESS_AYAT_INTELLECT[key] || null;
}
