/**
 * OGDEN — Family Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Wadud (The Most Loving) · Al-Haqq (The Truth)
 * Row distribution: 4 rows Al-Wadud (W1–W4) · 2 rows Al-Haqq (H1–H2)
 * v1.0 · 2026-04-05
 *
 * Key schema: 6-character binary string
 * Positions: W1 W2 W3 W4 H1 H2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   W1: Genuine warmth (trust, not task) vs depleted
 *   W2: Accepting person as they are vs carrying frustration
 *   W3: Love not contingent on behaviour vs keeping score
 *   W4: Curious about inner world vs already decided
 *   H1: Saying what is true vs performing
 *   H2: Making truth safe for them vs truth feels unsafe
 *
 * Usage: READINESS_AYAT_FAMILY[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 39 unique ayat across 63 non-null entries (max 3 keys per shared ayah)
 * - Shared ayat (3 uses): 13:28(3), 39:53(3), 2:286(3), 94:5-6(3)
 * - Shared ayat (2 uses): 66:6(2), 3:159(2), 4:1(2), 3:134(2), 30:21(2),
 *   61:2(2), 64:14(2), 48:4(2), 24:22(2), 7:199(2), 4:19(2), 4:128(2),
 *   42:43(2), 20:132(2), 64:16(2), 33:70(2), 94:5-6 counted above
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran(39 ayat, ar-simple-clean),
 *   fetch_translation(39 ayat, en-sahih-international),
 *   search_quran(6 queries), search_tafsir(0)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_263 = {
  arabic: 'قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ مِّن صَدَقَةٍ يَتْبَعُهَا أَذًى ۗ وَاللَّه�� غَنِيٌّ حَلِيمٌ',
  transliteration: 'Qawlun ma\'rufun wa maghfiratun khayrun min sadaqatin yatba\'uha adha. Wallahu ghaniyyun halim',
  translation: 'Kind speech and forgiveness are better than charity followed by injury. And Allah is Free of need and Forbearing.',
  source: 'Al-Baqarah 2:263',
  edition: 'en-sahih-international',
};

const _2_286 = {
  arabic: 'لَا يُكَلِّفُ اللَّه�� ن��فْسًا إِلَّا وُسْعَهَا �� لَهَا مَا كَسَبَتْ وَعَ��َيْهَا مَا اكْتَسَ��َتْ ۗ رَبَّن��ا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ ��َخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَ��ْتَهُ عَلَى الَّذِين�� مِن قَبْلِنَا ۚ رَبَّنَا ��َلَا تُحَمِّلْنَا مَا لَا طَاق��ةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّ�� وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
  transliteration: 'La yukallifullahu nafsan illa wus\'aha. Laha ma kasabat wa \'alayha maktasabat. Rabbana la tu\'akhidhna in nasina aw akhta\'na. Rabbana wa la tahmil \'alayna isran kama hamaltahu \'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa\'fu \'anna waghfir lana warhamna. Anta mawlana fansurna \'alal-qawmil-kafirin',
  translation: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _3_134 = {
  arabic: 'الَّذِينَ يُنفِقُونَ فِي ��لسَّرَّاءِ وَالضَّرَّاءِ وَالْكَاظِمِين�� الْغَيْظَ وَالْعَافِ��نَ عَنِ النَّاسِ ۗ وَاللَّهُ ي��حِبُّ الْمُحْسِنِينَ',
  transliteration: 'Alladhina yunfiquna fis-sarra\'i wad-darra\'i wal-kadhiminal-ghaytha wal-\'afina \'anin-nas. Wallahu yuhibbul-muhsinin',
  translation: 'Who spend [in the cause of Allah] during ease and hardship and who restrain anger and who pardon the people - and Allah loves the doers of good;',
  source: 'Al \'Imran 3:134',
  edition: 'en-sahih-international',
};

const _3_159 = {
  arabic: 'فَبِمَا رَحْمَةٍ مِ��نَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ ��َظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَ��ْلِكَ ۖ فَاعْفُ عَنْهُم�� وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَت��وَكَّلْ عَلَى اللَّهِ ۚ ��ِنَّ اللَّهَ يُحِبُّ ا��ْمُتَوَكِّلِينَ',
  transliteration: 'Fabima rahmatin minallahi linta lahum. Wa law kunta fazhzhan ghalidhal-qalbi lanfaddhu min hawlik. Fa\'fu \'anhum wastaghfir lahum wa shawirhum fil-amr. Fa idha \'azamta fatawakkal \'alallah. Innallaha yuhibbul-mutawakkilin',
  translation: 'So by mercy from Allah, [O Muhammad], you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you. So pardon them and ask forgiveness for them and consult them in the matter. And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].',
  source: 'Al \'Imran 3:159',
  edition: 'en-sahih-international',
};

const _4_1 = {
  arabic: 'يَ�� أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْ��ٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً �� وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِ��بًا',
  transliteration: 'Ya ayyuhan-nasu ittaqu rabbakumul-ladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan kathiran wa nisa\'a. Wattaqullahul-ladhi tasa\'aluna bihi wal-arham. Innallaha kana \'alaykum raqiba',
  translation: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed Allah is ever, over you, an Observer.',
  source: 'An-Nisa\' 4:1',
  edition: 'en-sahih-international',
};

const _4_9 = {
  arabic: 'وَلْيَخْشَ الَّذِينَ لَوْ تَرَكُوا مِنْ خَلْفِهِمْ ذُرِّيَّةً ضِعَافًا خَافُوا عَلَيْهِمْ فَلْيَتَّقُوا اللَّهَ وَلْيَقُولُ��ا قَوْلًا سَدِيدًا',
  transliteration: 'Wal-yakhshal-ladhina law taraku min khalfihim dhurriyyatan di\'afan khafu \'alayhim falyattaqullaha wal-yaqulu qawlan sadida',
  translation: 'And let those [executors and guardians] fear [injustice] as if they [themselves] had left weak offspring behind and feared for them. So let them fear Allah and speak words of appropriate justice.',
  source: 'An-Nisa\' 4:9',
  edition: 'en-sahih-international',
};

const _4_19 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَحِلُّ لَكُمْ أَن تَرِثُوا النِّسَاءَ ك��رْهًا ۖ وَلَا تَعْضُلُوهُن��ّ لِتَذْهَبُوا بِبَعْضِ مَا آتَيْتُمُوهُنَّ إِلَّا أَن يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ ۚ وَعَاشِرُوه��نَّ بِالْمَعْرُوفِ ۚ فَإِن كَرِهْتُمُوهُنَّ فَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَيَجْعَلَ اللَّهُ فِيهِ خَيْرًا كَثِيرًا',
  transliteration: 'Ya ayyuhal-ladhina amanu la yahillu lakum an tarithan-nisa\'a karha. Wa la ta\'duluhunna litadhhabu biba\'di ma ataytumuhunna illa an ya\'tina bifahishatin mubayyinah. Wa \'ashiruhunna bil-ma\'ruf. Fa in karihtumuhunna fa\'asa an takrahu shay\'an wa yaj\'alallahu fihi khayran kathira',
  translation: 'O you who have believed, it is not lawful for you to inherit women by compulsion. And do not make difficulties for them in order to take [back] part of what you gave them unless they commit a clear immorality. And live with them in kindness. For if you dislike them - perhaps you dislike a thing and Allah makes therein much good.',
  source: 'An-Nisa\' 4:19',
  edition: 'en-sahih-international',
};

const _4_36 = {
  arabic: 'وَاعْبُدُوا ��للَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَان��ا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ ��َالْمَسَاك��ينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُ��ُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيل�� وَمَا مَلَكَتْ أَيْمَانُكُ��ْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا',
  transliteration: 'Wa\'budullaha wa la tushriku bihi shay\'a. Wa bil-walidayni ihsana wa bidhil-qurba wal-yatama wal-masakini wal-jaril-dhil-qurba wal-jaril-junubi was-sahibi bil-janbi wabnis-sabili wa ma malakat aymanukum. Innallaha la yuhibbu man kana mukhtalan fakhura',
  translation: 'Worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess. Indeed, Allah does not like those who are self-deluding and boastful,',
  source: 'An-Nisa\' 4:36',
  edition: 'en-sahih-international',
};

const _4_128 = {
  arabic: 'وَإِنِ امْرَأ��ةٌ خَ��فَتْ مِن بَعْلِهَا نُشُوزًا أَوْ إِعْرَاضًا فَلَا جُنَاحَ عَلَيْهِمَا أَن يُصْلِحَا بَيْنَهُمَا صُلْحًا ۚ وَالصُّلْحُ خَيْرٌ ۗ وَأُحْضِرَتِ الْأَنفُسُ الشُّحَّ ۚ وَإِن تُحْسِنُوا وَتَتَّقُوا فَإِنَّ اللَّهَ كَانَ بِمَ�� تَعْمَلُونَ خَبِيرًا',
  transliteration: 'Wa inimra\'atun khafat min ba\'liha nushuzan aw i\'radan fala junaha \'alayhima an yusliha baynahuma sulha. Was-sulhu khayr. Wa uhdiratil-anfusush-shuhh. Wa in tuhsinu wa tattaqu fa innallaha kana bima ta\'maluna khabira',
  translation: 'And if a woman fears from her husband contempt or evasion, there is no sin upon them if they make terms of settlement between them - and settlement is best. And present in [human] souls is stinginess. But if you do good and fear Allah - then indeed Allah is ever, of what you do, Aware.',
  source: 'An-Nisa\' 4:128',
  edition: 'en-sahih-international',
};

const _4_135 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَ��ُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَ��لِدَيْنِ وَالْأَقْرَبِينَ ۚ إِن يَكُنْ غَنِيًّا أَوْ فَقِيرًا فَاللَّهُ أَوْلَىٰ بِهِمَا ۖ فَلَا تَت��ّبِعُوا الْهَوَىٰ أَن تَعْدِلُوا ۚ وَإِن تَلْوُوا أَوْ ��ُعْرِضُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا',
  transliteration: 'Ya ayyuhal-ladhina amanu kunu qawwamina bil-qisti shuhada\'a lillahi wa law \'ala anfusikum awil-walidayni wal-aqrabin. In yakun ghaniyyan aw faqiran fallahu awla bihima. Fala tattabi\'ul-hawa an ta\'dilu. Wa in talwu aw tu\'ridu fa innallaha kana bima ta\'maluna khabira',
  translation: 'O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives. Whether one is rich or poor, Allah is more worthy of both. So follow not [personal] inclination, lest you not be just. And if you distort [your testimony] or refuse [to give it], then indeed Allah is ever, of what you do, Aware.',
  source: 'An-Nisa\' 4:135',
  edition: 'en-sahih-international',
};

const _7_199 = {
  arabic: 'خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ وَأَعْرِضْ عَنِ الْجَاهِل��ينَ',
  transliteration: 'Khudhil-\'afwa wa\'mur bil-\'urfi wa a\'rid \'anil-jahilin',
  translation: 'Take what is given freely, enjoin what is good, and turn away from the ignorant.',
  source: 'Al-A\'raf 7:199',
  edition: 'en-sahih-international',
};

const _9_119 = {
  arabic: 'يَا أَيُّهَا ال��ّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّ��دِقِينَ',
  transliteration: 'Ya ayyuhal-ladhina amanu ittaqullaha wa kunu ma\'as-sadiqin',
  translation: 'O you who have believed, fear Allah and be with those who are true.',
  source: 'At-Tawbah 9:119',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: 'ال��ّذِينَ آمَنُوا وَتَطْمَئِنُّ ��ُلُوبُهُم بِذِكْرِ ا��لَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  transliteration: 'Alladhina amanu wa tatma\'innu qulubuhum bi dhikrillah. Ala bi dhikrillahi tatma\'innul-qulub',
  translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
  source: 'Ar-Ra\'d 13:28',
  edition: 'en-sahih-international',
};

const _16_125 = {
  arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ ۚ إِنَّ رَبَّكَ هُوَ أَع��لَمُ بِمَن ضَلَّ عَن سَبِيلِهِ ۖ وَهُوَ أَعْلَم�� بِالْمُهْتَد��ينَ',
  transliteration: 'Ud\'u ila sabili rabbika bil-hikmati wal-maw\'idhatil-hasanah. Wa jadilhum billati hiya ahsan. Inna rabbaka huwa a\'lamu biman dalla \'an sabilih. Wa huwa a\'lamu bil-muhtadin',
  translation: 'Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best. Indeed, your Lord is most knowing of who has strayed from His way, and He is most knowing of who is [rightly] guided.',
  source: 'An-Nahl 16:125',
  edition: 'en-sahih-international',
};

const _17_23 = {
  arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُد��وا إِلَّا إِ��َّاهُ وَبِال��وَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْ��ِبَرَ أَحَد��هُمَا أَوْ كِلَاهُ��َا فَلَا تَقُل لَّهُمَا ��ُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
  transliteration: 'Wa qada rabbuka alla ta\'budu illa iyyahu wa bil-walidayni ihsana. Imma yablughanna \'indakal-kibara ahaduhuma aw kilahuma fala taqul lahuma uffin wa la tanharhuma wa qul lahuma qawlan karima',
  translation: 'And your Lord has decreed that you worship not except Him, and to parents, good treatment. Whether one or both of them reach old age [while] with you, say not to them [so much as], "uff," and do not repel them but speak to them a noble word.',
  source: 'Al-Isra\' 17:23',
  edition: 'en-sahih-international',
};

const _17_28 = {
  arabic: 'وَإِمَّا تُعْرِضَنَّ عَنْهُمُ ابْتِغَاءَ رَحْمَةٍ مِّن رَّبِّكَ تَرْجُوهَا فَقُل لَّهُمْ قَوْلًا مَّيْسُورًا',
  transliteration: 'Wa imma tu\'ridanna \'anhumub-tigha\'a rahmatin min rabbika tarjuha faqul lahum qawlan maysura',
  translation: 'And if you [must] turn away from them awaiting mercy from your Lord which you expect, then speak to them a gentle word.',
  source: 'Al-Isra\' 17:28',
  edition: 'en-sahih-international',
};

const _17_53 = {
  arabic: 'وَقُل لِّعِبَادِي يَقُولُوا الَّتِي هِيَ أَحْسَنُ ۚ إِنَّ الشَّيْطَانَ يَنزَغُ بَيْنَهُمْ ۚ إِنَّ الشَّيْطَانَ كَانَ لِلْإِنسَانِ عَدُوًّا مُّبِينًا',
  transliteration: 'Wa qul li\'ibadi yaqulul-lati hiya ahsan. Innash-shaytana yanzaghu baynahum. Innash-shaytana kana lil-insani \'aduwwan mubina',
  translation: 'And tell My servants to say that which is best. Indeed, Satan induces [dissension] among them. Indeed Satan is ever, to mankind, a clear enemy.',
  source: 'Al-Isra\' 17:53',
  edition: 'en-sahih-international',
};

const _19_96 = {
  arabic: 'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا',
  transliteration: 'Innal-ladhina amanu wa \'amilus-salihati sayaj\'alu lahumur-Rahmanu wudda',
  translation: 'Indeed, those who have believed and done righteous deeds - the Most Merciful will appoint for them affection.',
  source: 'Maryam 19:96',
  edition: 'en-sahih-international',
};

const _20_44 = {
  arabic: 'فَقُولَا لَهُ قَوْلًا ل��ّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ',
  transliteration: 'Faqula lahu qawlan layyinan la\'allahu yatadhakkaru aw yakhsha',
  translation: 'And speak to him with gentle speech that perhaps he may be reminded or fear [Allah].',
  source: 'Ta-Ha 20:44',
  edition: 'en-sahih-international',
};

const _20_132 = {
  arabic: 'وَأْمُرْ أَهْلَكَ بِالصَّل��اةِ وَاصْطَبِرْ ع��لَيْهَا ۖ لَا نَسْأَلُكَ رِزْقًا ۖ نَّحْنُ نَرْزُقُكَ ۗ وَالْعَاقِبَةُ لِلتَّقْوَىٰ',
  transliteration: 'Wa\'mur ahlaka bis-salati wastabir \'alayha. La nas\'aluka rizqa. Nahnu narzuquk. Wal-\'aqibatu lit-taqwa',
  translation: 'And enjoin prayer upon your family [and people] and be steadfast therein. We ask you not for provision; We provide for you, and the [best] outcome is for [those of] righteousness.',
  source: 'Ta-Ha 20:132',
  edition: 'en-sahih-international',
};

const _22_24 = {
  arabic: 'وَهُدُوا إِلَى الطَّيِّبِ مِنَ الْقَوْلِ وَهُدُوا إِلَىٰ صِرَ��طِ الْحَمِيدِ',
  transliteration: 'Wa hudu ilat-tayyibi minal-qawli wa hudu ila siratil-Hamid',
  translation: 'And they had been guided [in worldly life] to good speech, and they were guided to the path of the Praiseworthy.',
  source: 'Al-Hajj 22:24',
  edition: 'en-sahih-international',
};

const _24_22 = {
  arabic: 'وَلَا يَأْتَلِ أُولُو الْفَضْلِ مِنكُمْ وَالسَّعَةِ أَن يُؤْتُوا أُولِي الْقُرْبَىٰ وَالْمَسَاكِينَ وَالْمُهَاجِرِينَ فِي سَبِيلِ اللَّهِ ۖ وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ ۗ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
  transliteration: 'Wa la ya\'tali ulul-fadli minkum was-sa\'ati an yu\'tu ulil-qurba wal-masakina wal-muhajirana fi sabilillah. Wal-ya\'fu wal-yasfahu. Ala tuhibbuna an yaghfirallahu lakum. Wallahu ghafurun rahim',
  translation: 'And let not those of virtue among you and wealth swear not to give [aid] to their relatives and the needy and the emigrants for the cause of Allah, and let them pardon and overlook. Would you not like that Allah should forgive you? And Allah is Forgiving and Merciful.',
  source: 'An-Nur 24:22',
  edition: 'en-sahih-international',
};

const _25_63 = {
  arabic: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا',
  transliteration: 'Wa \'ibadur-Rahmanil-ladhina yamshuna \'alal-ardi hawnan wa idha khatabahumul-jahiluna qalu salama',
  translation: 'And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace,',
  source: 'Al-Furqan 25:63',
  edition: 'en-sahih-international',
};

const _25_74 = {
  arabic: 'وَال��ّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
  transliteration: 'Walladhina yaquluna rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil-muttaqina imama',
  translation: 'And those who say, "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader [i.e., example] for the righteous."',
  source: 'Al-Furqan 25:74',
  edition: 'en-sahih-international',
};

const _30_21 = {
  arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِ��ُمْ أَزْوَاجًا لِّتَسْكُنُوا إِل��يْهَا وَ��َعَلَ بَيْنَكُم ��َّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ ��َآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  transliteration: 'Wa min ayatihi an khalaqa lakum min anfusikum azwajan litaskunu ilayha wa ja\'ala baynakum mawaddatan wa rahmah. Inna fi dhalika la\'ayatin liqawmin yatafakkarun',
  translation: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.',
  source: 'Ar-Rum 30:21',
  edition: 'en-sahih-international',
};

const _31_17 = {
  arabic: 'يَا ب��نَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ الْأُمُورِ',
  transliteration: 'Ya bunayya aqimis-salata wa\'mur bil-ma\'rufi wanha \'anil-munkari wasbir \'ala ma asabak. Inna dhalika min \'azmil-umur',
  translation: 'O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you. Indeed, [all] that is of the matters [requiring] resolve.',
  source: 'Luqman 31:17',
  edition: 'en-sahih-international',
};

const _33_70 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا',
  transliteration: 'Ya ayyuhal-ladhina amanut-taqullaha wa qulu qawlan sadida',
  translation: 'O you who have believed, fear Allah and speak words of appropriate justice.',
  source: 'Al-Ahzab 33:70',
  edition: 'en-sahih-international',
};

const _39_53 = {
  arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُ��ا عَلَىٰ أَنفُسِهِمْ لَا ت��قْنَطُوا مِن رَّحْ��َةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
  transliteration: 'Qul ya \'ibadiyalladhina asrafu \'ala anfusihim la taqnatu min rahmatillah. Innallaha yaghfirudh-dhunuba jami\'a. Innahu huwal-Ghafurur-Rahim',
  translation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
  source: 'Az-Zumar 39:53',
  edition: 'en-sahih-international',
};

const _42_43 = {
  arabic: 'وَلَمَن صَب��رَ وَغَفَرَ ��ِنَّ ذَٰلِك�� لَمِنْ عَزْمِ الْأُمُورِ',
  transliteration: 'Wa laman sabara wa ghafara inna dhalika lamin \'azmil-umur',
  translation: 'And whoever is patient and forgives - indeed, that is of the matters [worthy] of resolve.',
  source: 'Ash-Shura 42:43',
  edition: 'en-sahih-international',
};

const _46_15 = {
  arabic: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ ��ِحْسَانًا ۖ حَمَلَتْهُ أُمُّهُ كُرْهًا وَوَضَعَتْهُ كُرْهًا ۖ وَحَمْلُهُ وَفِصَالُهُ ثَلَاثُونَ شَهْرًا ۚ حَتَّىٰ إِذَا ��َلَغَ أَشُدَّهُ وَبَلَغَ أ��رْبَعِينَ سَنَةً قَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْ��ُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاه�� وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ و��إِنِّي ��ِنَ الْمُسْلِمِينَ',
  transliteration: 'Wa wassaynal-insana biwalidayhi ihsana. Hamalathu ummuhu kurhan wa wada\'athu kurha. Wa hamluhu wa fisaluhu thalathuna shahra. Hatta idha balagha ashuddahu wa balagha arba\'ina sanatan qala rabbi awzi\'ni an ashkura ni\'matakal-lati an\'amta \'alayya wa \'ala walidayya wa an a\'mala salihan tardahu wa aslih li fi dhurriyyati. Inni tubtu ilayka wa inni minal-muslimin',
  translation: 'And We have enjoined upon man, to his parents, good treatment. His mother carried him with hardship and gave birth to him with hardship, and his gestation and weaning [period] is thirty months. [He grows] until, when he reaches maturity and reaches [the age of] forty years, he says, "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to work righteousness of which You will approve and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims."',
  source: 'Al-Ahqaf 46:15',
  edition: 'en-sahih-international',
};

const _48_4 = {
  arabic: 'هُوَ الَّذِي أَنزَلَ السَّكِينَةَ فِي قُلُوبِ الْمُؤْمِنِينَ لِيَزْدَادُوا إِيمَانًا مَّعَ إِيمَانِهِمْ ۗ ��َلِلَّهِ جُنُودُ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا',
  transliteration: 'Huwal-ladhi anzalas-sakinata fi qulubil-mu\'minina liyazdadu imanan ma\'a imanihim. Wa lillahi junudus-samawati wal-ard. Wa kanallahu \'aliman hakima',
  translation: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their [present] faith. And to Allah belong the soldiers of the heavens and the earth, and ever is Allah Knowing and Wise.',
  source: 'Al-Fath 48:4',
  edition: 'en-sahih-international',
};

const _49_10 = {
  arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُ��ا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا الل��ّهَ لَعَلَّكُمْ تُرْح��مُونَ',
  transliteration: 'Innamal-mu\'minuna ikhwatun fa aslihu bayna akhawaykum. Wattaqullaha la\'allakum turhamun',
  translation: 'The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.',
  source: 'Al-Hujurat 49:10',
  edition: 'en-sahih-international',
};

const _49_12 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ ��لظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ و��لَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا ۚ أَيُحِبُّ أَحَدُكُ��ْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُو��ُ ۚ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ تَوَّابٌ رَّحِيمٌ',
  transliteration: 'Ya ayyuhal-ladhina amanuj-tanibu kathiran minazh-zhann. Inna ba\'dazh-zhanni ithm. Wa la tajassasu wa la yaghtab ba\'dukum ba\'da. Ayuhibbu ahadukum an ya\'kula lahma akhihi maytan fakarihtumuh. Wattaqullah. Innallaha tawwabun rahim',
  translation: 'O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin. And do not spy or backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it. And fear Allah; indeed, Allah is Accepting of Repentance and Merciful.',
  source: 'Al-Hujurat 49:12',
  edition: 'en-sahih-international',
};

const _61_2 = {
  arabic: 'يَا أَيُّهَا ��لَّ��ِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْع��لُونَ',
  transliteration: 'Ya ayyuhal-ladhina amanu lima taquluna ma la taf\'alun',
  translation: 'O you who have believed, why do you say what you do not do?',
  source: 'As-Saff 61:2',
  edition: 'en-sahih-international',
};

const _64_14 = {
  arabic: 'يَا أَي��ّهَا الَّذِينَ آمَنُوا إِنَّ مِنْ أَزْوَاجِكُمْ وَأَوْلَا��ِكُمْ عَدُوًّا لَّكُمْ فَاحْذَرُوهُمْ ۚ وَإِن تَعْفُوا وَتَصْفَحُوا وَتَ��ْفِرُوا فَإِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
  transliteration: 'Ya ayyuhal-ladhina amanu inna min azwajikum wa awladikum \'aduwwan lakum fahdharuhum. Wa in ta\'fu wa tasfahhu wa taghfiru fa innallaha ghafurun rahim',
  translation: 'O you who have believed, indeed, among your spouses and your children are enemies to you, so beware of them. But if you pardon and overlook and forgive - then indeed, Allah is Forgiving and Merciful.',
  source: 'At-Taghabun 64:14',
  edition: 'en-sahih-international',
};

const _64_16 = {
  arabic: 'فَاتَّقُوا اللَّهَ ��َا اسْتَطَعْتُمْ وَاسْم��عُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُس��كُمْ ۗ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِك�� هُمُ الْمُفْلِحُونَ',
  transliteration: 'Fattaqullaha mastata\'tum wasma\'u wa ati\'u wa anfiqu khayran li anfusikum. Wa man yuqa shuhha nafsihi fa ula\'ika humul-muflihun',
  translation: 'So fear Allah as much as you are able and listen and obey and spend [in the way of Allah]; it is better for your selves. And whoever is protected from the stinginess of his soul - it is those who will be the successful.',
  source: 'At-Taghabun 64:16',
  edition: 'en-sahih-international',
};

const _66_6 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ و��الْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
  transliteration: 'Ya ayyuhal-ladhina amanu qu anfusakum wa ahlikum naran waquduhannas-su wal-hijarah. \'Alayha mala\'ikatun ghiladhun shidadun la ya\'sunallaha ma amarahum wa yaf\'aluna ma yu\'marun',
  translation: 'O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones, over which are [appointed] angels, harsh and severe; they do not disobey Allah in what He commands them but do what they are commanded.',
  source: 'At-Tahrim 66:6',
  edition: 'en-sahih-international',
};

const _90_17 = {
  arabic: 'ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ',
  transliteration: 'Thumma kana minal-ladhina amanu wa tawassaw bis-sabri wa tawassaw bil-marhamah',
  translation: 'And then being among those who believed and advised one another to patience and advised one another to compassion.',
  source: 'Al-Balad 90:17',
  edition: 'en-sahih-international',
};

const _94_5_6 = {
  arabic: 'فَإِنَّ مَعَ الْعُسْرِ ��ُسْرًا · إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  transliteration: 'Fa inna ma\'al-\'usri yusra. Inna ma\'al-\'usri yusra',
  translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
  source: 'Ash-Sharh 94:5–6',
  edition: 'en-sahih-international',
};


// ═══════════���═══════════════════════��═══════════════════════
// READINESS AYAT MATRIX — 64 entries (63 non-null + 111111)
// Key: W1 W2 W3 W4 H1 H2  (1=YES, 0=NOT YET)
// ��════════════��═════════════════════════════════════════════

export const READINESS_AYAT_FAMILY = {

  // ─── ALL YES — proceed ───
  '111111': null,

  // ═══ FOUR CORNERS ═══

  // All NOT YET — deepest return point
  '000000': { ..._66_6,
    framing: 'I owe them more than what I am bringing right now — let me return to the trust.' },

  // Love present, truth absent
  '111100': { ..._33_70,
    framing: 'My love for them is real but I am not yet speaking from a truthful place.' },

  // Truth present, love absent
  '000011': { ..._3_159,
    framing: 'I will speak honestly but without gentleness my honesty will only wound.' },


  // ═══ SINGLE-ZERO ANCHORS (6) ═══

  // W1 off — depleted
  '011111': { ..._4_1,
    framing: 'I am here in body but my care has not yet arrived — they are a sacred trust.' },

  // W2 off — frustrated
  '101111': { ..._3_134,
    framing: 'I am carrying something unresolved that will colour how I see them.' },

  // W3 off — keeping score
  '110111': { ..._30_21,
    framing: 'I am treating love as something they must earn — but mawaddah was placed, not won.' },

  // W4 off — already decided
  '111011': { ..._49_12,
    framing: 'I have already written the script for this — but they deserve my curiosity.' },

  // H1 off — performing
  '111101': { ..._61_2,
    framing: 'I am about to say what sounds right rather than what is true inside me.' },

  // H2 off — truth unsafe
  '111110': { ..._20_44,
    framing: 'I need to make this a place where honesty can land without fear.' },


  // ═══ TWO ZEROS — SAME ATTRIBUTE (Al-Wadud pairs, 6) ═══

  // W1+W2 off — depleted + frustrated
  '001111': { ..._64_14,
    framing: 'I am depleted and carrying frustration — pardoning and overlooking begins with me.' },

  // W1+W3 off — depleted + keeping score
  '010111': { ..._13_28,
    framing: 'I am running empty and keeping count — I need remembrance before I can give.' },

  // W1+W4 off — depleted + already decided
  '011011': { ..._48_4,
    framing: 'I am depleted and have already decided how this goes — I need sakinah first.' },

  // W2+W3 off — frustrated + keeping score
  '100111': { ..._24_22,
    framing: 'I am frustrated and keeping a ledger — would I not want to be forgiven myself?' },

  // W2+W4 off — frustrated + already decided
  '101011': { ..._7_199,
    framing: 'I am frustrated and closed — let me accept what is offered and release what is not.' },

  // W3+W4 off — keeping score + already decided
  '110011': { ..._4_19,
    framing: 'I am counting and have already decided — perhaps what I resist holds hidden good.' },


  // ═══ TWO ZEROS — CROSS ATTRIBUTE (8) ═══

  // W1 + H1 off — depleted + performing
  '011101': { ..._17_28,
    framing: 'I am not fully here and about to perform — at least let my words be gentle.' },

  // W1 + H2 off — depleted + truth unsafe
  '011110': { ..._2_263,
    framing: 'I am depleted and truth does not feel safe — a kind word is better than harm.' },

  // W2 + H1 off — frustrated + performing
  '101101': { ..._4_135,
    framing: 'I am frustrated and about to say what is convenient — justice begins with myself.' },

  // W2 + H2 off — frustrated + truth unsafe
  '101110': { ..._17_53,
    framing: 'I am frustrated and truth feels dangerous — let me say what is best before the gap widens.' },

  // W3 + H1 off — keeping score + performing
  '110101': { ..._4_128,
    framing: 'I am keeping score and about to perform — but making peace is always better.' },

  // W3 + H2 off — keeping score + truth unsafe
  '110110': { ..._90_17,
    framing: 'I am counting and truth feels risky — patience and compassion are the return path.' },

  // W4 + H1 off — decided + performing
  '111001': { ..._22_24,
    framing: 'I have already decided and I am performing — I want to be guided to good speech.' },

  // W4 + H2 off — decided + truth unsafe
  '111010': { ..._25_63,
    framing: 'I have already decided and truth feels unsafe — gentleness even with difficulty.' },


  // ═══ THREE ZEROS (20) ═══

  // --- 3 in Wadud, 0 in Haqq (4) ---

  // W1+W2+W3 off — depleted + frustrated + keeping score
  '000111': { ..._39_53,
    framing: 'I have fallen short in presence, patience, and generosity — but His mercy has no limit.' },

  // W1+W2+W4 off — depleted + frustrated + decided
  '001011': { ..._2_286,
    framing: 'I am stretched beyond my capacity — I ask not to be burdened with what I cannot bear.' },

  // W1+W3+W4 off — depleted + score + decided
  '010011': { ..._94_5_6,
    framing: 'I am emptied, counting, and closed — but ease is woven into this very difficulty.' },

  // W2+W3+W4 off — frustrated + score + decided
  '100011': { ..._42_43,
    framing: 'I am frustrated, keeping score, and closed — patience and forgiveness require resolve.' },

  // --- 2 in Wadud + 1 in Haqq (12) ---

  // W1+W2 off + H1 off
  '001101': { ..._4_9,
    framing: 'I am depleted, frustrated, and about to say what is convenient — let me speak justly.' },

  // W1+W2 off + H2 off
  '001110': { ..._46_15,
    framing: 'I am depleted, frustrated, and truth is fragile — make righteous for me my family.' },

  // W1+W3 off + H1 off
  '010101': { ..._20_132,
    framing: 'I am running empty, counting, and performing — He provides; I need only be steadfast.' },

  // W1+W3 off + H2 off
  '010110': { ..._64_16,
    framing: 'I am depleted, keeping score, and truth is not safe — I give what I am able.' },

  // W1+W4 off + H1 off
  '011001': { ..._31_17,
    framing: 'I am depleted, closed, and performing — establishing what is right takes resolve.' },

  // W1+W4 off + H2 off
  '011010': { ..._49_10,
    framing: 'I am depleted, closed, and truth feels risky — we are still one family; make peace.' },

  // W2+W3 off + H1 off
  '100101': { ..._9_119,
    framing: 'I am frustrated, counting, and performing — I want to stand with those who are true.' },

  // W2+W3 off + H2 off
  '100110': { ..._4_36,
    framing: 'I am frustrated, keeping score, and truth is fragile — ihsan to those nearest is commanded.' },

  // W2+W4 off + H1 off
  '101001': { ..._33_70,
    framing: 'I am frustrated, closed, and about to perform — let me at least speak what is straight.' },

  // W2+W4 off + H2 off
  '101010': { ..._16_125,
    framing: 'I am frustrated, decided, and truth feels unsafe — wisdom and gentleness are the way.' },

  // W3+W4 off + H1 off
  '110001': { ..._61_2,
    framing: 'I am counting, closed, and about to perform — why would I say what I do not mean?' },

  // W3+W4 off + H2 off
  '110010': { ..._25_74,
    framing: 'I am counting, decided, and truth is fragile — grant us comfort in our families.' },

  // --- 1 in Wadud + 2 in Haqq (4) ---

  // W1 off + H1+H2 off
  '011100': { ..._17_23,
    framing: 'I am depleted and truth is absent both ways — at least let me speak a noble word.' },

  // W2 off + H1+H2 off
  '101100': { ..._7_199,
    framing: 'I am frustrated and truth has left — let me take what is given and release what is not.' },

  // W3 off + H1+H2 off
  '110100': { ..._4_128,
    framing: 'I am counting and truth is absent — settlement is better and souls carry stinginess.' },

  // W4 off + H1+H2 off
  '111000': { ..._19_96,
    framing: 'I am loving but closed and truth is absent — Al-Rahman appoints wudd for the sincere.' },


  // ═══ FOUR ZEROS (14, corner 000011 above) ═══

  // --- 3 in Wadud + 1 in Haqq (8) ---

  // W1+W2+W3 off + H1 off — only W4 and H2 remain
  '000101': { ..._66_6,
    framing: 'Almost nothing of what they need is present — I must protect them, starting with myself.' },

  // W1+W2+W3 off + H2 off — only W4 and H1 remain
  '000110': { ..._4_1,
    framing: 'I am nearly absent but still curious and truthful — they come from the same soul as me.' },

  // W1+W2+W4 off + H1 off — only W3 and H2 remain
  '001001': { ..._42_43,
    framing: 'My love is unconditional and truth is safe but little else — patience is resolve.' },

  // W1+W2+W4 off + H2 off — only W3 and H1 remain
  '001010': { ..._13_28,
    framing: 'I have unconditional love and will speak truth but am depleted inside — remember.' },

  // W1+W3+W4 off + H1 off — only W2 and H2 remain
  '010001': { ..._48_4,
    framing: 'I accept them as they are and truth is safe — but I need sakinah for the rest.' },

  // W1+W3+W4 off + H2 off — only W2 and H1 remain
  '010010': { ..._94_5_6,
    framing: 'I accept them and I will speak truth but so much else is absent — ease will come.' },

  // W2+W3+W4 off + H1 off — only W1 and H2 remain
  '100001': { ..._24_22,
    framing: 'My warmth is real and truth is safe but I am reactive and closed — let me pardon first.' },

  // W2+W3+W4 off + H2 off — only W1 and H1 remain
  '100010': { ..._64_14,
    framing: 'My warmth is real and I will speak truth — but frustration and scorekeeping remain.' },

  // --- 2 in Wadud + 2 in Haqq (6) ---

  // W1+W2 off + H1+H2 off
  '001100': { ..._2_286,
    framing: 'I am depleted, frustrated, and truth is absent entirely — do not burden me beyond my capacity.' },

  // W1+W3 off + H1+H2 off
  '010100': { ..._39_53,
    framing: 'I am depleted, keeping score, and truth is gone — do not despair of mercy.' },

  // W1+W4 off + H1+H2 off
  '011000': { ..._20_132,
    framing: 'I am depleted, closed, and truth is absent — return to what He provides and be steadfast.' },

  // W2+W3 off + H1+H2 off
  '100100': { ..._3_134,
    framing: 'I am frustrated, counting, and truth is absent — restraining anger is ihsan.' },

  // W2+W4 off + H1+H2 off
  '101000': { ..._4_19,
    framing: 'I am frustrated, decided, and truth is absent — live with them in kindness regardless.' },

  // W3+W4 off + H1+H2 off
  '110000': { ..._30_21,
    framing: 'I am keeping score, decided, and truth is absent — mawaddah and rahmah were placed as signs.' },


  // ═══ FIVE ZEROS (6) ═══

  // Only H2 remains (truth safe for them)
  '000001': { ..._3_159,
    framing: 'I have almost nothing to give but truth is still safe for them — I choose gentleness.' },

  // Only H1 remains (I will speak truth)
  '000010': { ..._64_16,
    framing: 'Almost everything is absent but I can still speak truth — I fear Allah as I am able.' },

  // Only W4 remains (curious about their inner world)
  '000100': { ..._2_286,
    framing: 'Almost everything is absent but curiosity remains — do not burden me beyond what I can bear.' },

  // Only W3 remains (love not contingent)
  '001000': { ..._39_53,
    framing: 'Almost everything is absent but my love is not conditional — His mercy covers all of this.' },

  // Only W2 remains (accepting them as they are)
  '010000': { ..._94_5_6,
    framing: 'Almost everything is absent but I accept them as they are — ease is coming.' },

  // Only W1 remains (genuine warmth)
  '100000': { ..._13_28,
    framing: 'Almost everything is absent but the warmth is still real — let remembrance steady my heart.' },

};
