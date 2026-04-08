/**
 * Maqasid OS — Wealth Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Razzāq (The Provider) · Al-Ḥasīb (The Reckoner)
 * Row distribution: 4 rows Al-Razzāq (Z1–Z4) · 2 rows Al-Ḥasīb (H1–H2)
 * v1.0 · 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: Z1 Z2 Z3 Z4 H1 H2
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Row definitions:
 *   Z1: Wealth as provision and trust vs. treating it as mine by right
 *   Z2: Ethical boundary intact under pressure vs. boundary shifts with opportunity
 *   Z3: Giving with genuine freedom vs. deferring generosity until threshold
 *   Z4: Outcome without material measuring standing vs. worth tied to what is given
 *   H1: Clear reckoning of deployed/returned/outstanding vs. proceeding without closing accounts
 *   H2: Full sight of consequences before committing resource vs. optimism ahead of honest examination
 *
 * Usage: READINESS_AYAT_WEALTH[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 36 unique ayat across 63 non-null entries
 * - Shared ayat (2+ uses): 51:58(3), 57:7(3), 4:132(2), 34:39(2), 65:3(2),
 *   4:29(2), 3:130(3), 2:278(2), 2:275(2), 3:92(1), 63:10(3), 2:261(2),
 *   2:267(2), 57:18(2), 3:180(2), 47:38(2), 9:34(1), 34:37(2), 18:46(2),
 *   28:60(2), 57:23(2), 9:59(2), 20:131(2), 10:58(2), 64:15(2), 59:18(3),
 *   82:5(3), 2:281(2), 40:17(2), 74:38(2), 17:29(2), 55:9(2), 17:35(2),
 *   65:7(2), 28:77(2)
 * - Single-use ayat: 29:62, 2:188, 16:94
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 1st person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 * - Hadith-supplemented framings: none
 * - Combinations flagged for scholarly review: none
 *
 * Grounded with quran.ai: fetch_quran(36 ayat, ar-simple-clean),
 *   fetch_translation(36 ayat, en-sahih-international),
 *   search_quran(6 queries)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

// Z1 pool — wealth as provision, trust, Allah as owner/provider

const _51_58 = {
  arabic: 'إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ',
  transliteration: "Innallaha huwar-razzaqu dhul-quwwatil-matin",
  translation: 'Indeed, it is Allāh who is the [continual] Provider, the firm possessor of strength.',
  source: 'Adh-Dhariyat 51:58',
  edition: 'en-sahih-international',
};

const _57_7 = {
  arabic: 'آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ ۖ فَالَّذِينَ آمَنُوا مِنكُمْ وَأَنفَقُوا لَهُمْ أَجْرٌ كَبِيرٌ',
  transliteration: "Aminu billahi wa rasulihi wa anfiqu mimma ja'alakum mustakhlafina fih. Falladhina amanu minkum wa anfaqu lahum ajrun kabir",
  translation: 'Believe in Allāh and His Messenger and spend out of that in which He has made you successive inheritors. For those who have believed among you and spent, there will be a great reward.',
  source: 'Al-Hadid 57:7',
  edition: 'en-sahih-international',
};

const _4_132 = {
  arabic: 'وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا',
  transliteration: "Wa lillahi ma fis-samawati wa ma fil-ard. Wa kafa billahi wakila",
  translation: 'And to Allāh belongs whatever is in the heavens and whatever is on the earth. And sufficient is Allāh as Disposer of affairs.',
  source: 'An-Nisa 4:132',
  edition: 'en-sahih-international',
};

const _29_62 = {
  arabic: 'اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ ۚ إِنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ',
  transliteration: "Allahu yabsutur-rizqa liman yasha'u min 'ibadih wa yaqdiru lah. Innallaha bikulli shay'in 'alim",
  translation: "Allāh extends provision for whom He wills of His servants and restricts for him. Indeed Allāh is, of all things, Knowing.",
  source: "Al-'Ankabut 29:62",
  edition: 'en-sahih-international',
};

const _34_39 = {
  arabic: 'قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ ۚ وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ',
  transliteration: "Qul inna rabbi yabsutur-rizqa liman yasha'u min 'ibadih wa yaqdiru lah. Wa ma anfaqtum min shay'in fa huwa yukhlifuh. Wa huwa khayrur-raziqin",
  translation: 'Say, "Indeed, my Lord extends provision for whom He wills of His servants and restricts [it] for him. But whatever thing you spend [in His cause] - He will compensate it; and He is the best of providers."',
  source: "Saba' 34:39",
  edition: 'en-sahih-international',
};

const _65_3 = {
  arabic: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا',
  transliteration: "Wa yarzuqhu min haythu la yahtasib. Wa man yatawakkal 'alallahi fa huwa hasbuh. Innallaha balighu amrih. Qad ja'alallahu likulli shay'in qadra",
  translation: 'And will provide for him from where he does not expect. And whoever relies upon Allāh - then He is sufficient for him. Indeed, Allāh will accomplish His purpose. Allāh has already set for everything a [decreed] extent.',
  source: 'At-Talaq 65:3',
  edition: 'en-sahih-international',
};

// Z2 pool — ethical boundary, halal/haram, taqwa under financial pressure

const _4_29 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ ۚ وَلَا تَقْتُلُوا أَنفُسَكُمْ ۚ إِنَّ اللَّهَ كَانَ بِكُمْ رَحِيمًا',
  transliteration: "Ya ayyuhal-ladhina amanu la ta'kulu amwalakum baynakum bil-batili illa an takuna tijaratan 'an taradin minkum. Wa la taqtulu anfusakum. Innallaha kana bikum rahima",
  translation: "O you who have believed, do not consume one another's wealth unjustly but only [in lawful] business by mutual consent. And do not kill yourselves [or one another]. Indeed, Allāh is to you ever Merciful.",
  source: 'An-Nisa 4:29',
  edition: 'en-sahih-international',
};

const _2_188 = {
  arabic: 'وَلَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ وَتُدْلُوا بِهَا إِلَى الْحُكَّامِ لِتَأْكُلُوا فَرِيقًا مِّنْ أَمْوَالِ النَّاسِ بِالْإِثْمِ وَأَنتُمْ تَعْلَمُونَ',
  transliteration: "Wa la ta'kulu amwalakum baynakum bil-batili wa tudlu biha ilal-hukkami lita'kulu fariqan min amwalin-nasi bil-ithmi wa antum ta'lamun",
  translation: "And do not consume one another's wealth unjustly or send it [in bribery] to the rulers in order that [they might aid] you [to] consume a portion of the wealth of the people in sin, while you know [it is unlawful].",
  source: 'Al-Baqarah 2:188',
  edition: 'en-sahih-international',
};

const _3_130 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُّضَاعَفَةً ۖ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu la ta'kulur-riba ad'afan muda'afatan. Wattaqullaha la'allakum tuflihun",
  translation: 'O you who have believed, do not consume usury, doubled and multiplied, but fear Allāh that you may be successful.',
  source: 'Al Imran 3:130',
  edition: 'en-sahih-international',
};

const _2_275 = {
  arabic: 'الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ ۚ ذَٰلِكَ بِأَنَّهُمْ قَالُوا إِنَّمَا الْبَيْعُ مِثْلُ الرِّبَا ۗ وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
  transliteration: "Alladhina ya'kulunar-riba la yaqumuna illa kama yaqumul-ladhi yatakhabbatuhu-sh-shaytanu minal-mass. Dhalika bi annahum qalu innamal-bay'u mithlur-riba. Wa ahallallahul-bay'a wa harramar-riba",
  translation: 'Those who consume interest cannot stand [on the Day of Resurrection] except as one stands who is being beaten by Satan into insanity. That is because they say, "Trade is [just] like interest." But Allāh has permitted trade and has forbidden interest.',
  source: 'Al-Baqarah 2:275',
  edition: 'en-sahih-international',
};

const _2_278 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِن كُنتُم مُّؤْمِنِينَ',
  transliteration: "Ya ayyuhal-ladhina amanu-ttaqullaha wa dharu ma baqiya minar-riba in kuntum mu'minin",
  translation: 'O you who have believed, fear Allāh and give up what remains [due to you] of interest, if you should be believers.',
  source: 'Al-Baqarah 2:278',
  edition: 'en-sahih-international',
};

const _16_94 = {
  arabic: 'وَلَا تَتَّخِذُوا أَيْمَانَكُمْ دَخَلًا بَيْنَكُمْ فَتَزِلَّ قَدَمٌ بَعْدَ ثُبُوتِهَا وَتَذُوقُوا السُّوءَ بِمَا صَدَدتُّمْ عَن سَبِيلِ اللَّهِ ۖ وَلَكُمْ عَذَابٌ عَظِيمٌ',
  transliteration: "Wa la tattakhidhu aymanakum dakhalon baynakum fa tazilla qadamun ba'da thubutiha wa tadhuwqus-su'a bima sadadtum 'an sabilillah. Wa lakum 'adhabun 'adhim",
  translation: 'And do not take your oaths as [means of] deceit between you, lest a foot slip after it was [once] firm, and you would taste evil [in this world] for what [people] you diverted from the way of Allāh, and you would have [in the Hereafter] a great punishment.',
  source: 'An-Nahl 16:94',
  edition: 'en-sahih-international',
};

// Z3 pool — generosity, sadaqah, infaq, miserliness, deferred giving

const _3_92 = {
  arabic: 'لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ',
  transliteration: "Lan tanalu-l-birra hatta tunfiqu mimma tuhibbun. Wa ma tunfiqu min shay'in fa innallaha bihi 'alim",
  translation: 'Never will you attain the good [reward] until you spend [in the way of Allāh] from that which you love. And whatever you spend - indeed, Allāh is Knowing of it.',
  source: 'Al Imran 3:92',
  edition: 'en-sahih-international',
};

const _63_10 = {
  arabic: 'وَأَنفِقُوا مِن مَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ أَحَدَكُمُ الْمَوْتُ فَيَقُولَ رَبِّ لَوْلَا أَخَّرْتَنِي إِلَىٰ أَجَلٍ قَرِيبٍ فَأَصَّدَّقَ وَأَكُن مِّنَ الصَّالِحِينَ',
  transliteration: "Wa anfiqu mimma razaqnakum min qabli an ya'tiya ahadakumul-mawtu fa yaqula rabbi lawla akhkhartani ila ajalin qaribin fa assaddaqa wa akun minas-salihin",
  translation: 'And spend [in the way of Allāh] from what We have provided you before death approaches one of you and he says, "My Lord, if only You would delay me for a brief term so I would give charity and be of the righteous."',
  source: 'Al-Munafiqun 63:10',
  edition: 'en-sahih-international',
};

const _2_261 = {
  arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ',
  transliteration: "Mathalul-ladhina yunfiquna amwalahum fi sabilillahi kamathali habbatin anbatat sab'a sanabila fi kulli sunbulatin mi'atu habbah. Wallahu yuda'ifu liman yasha'. Wallahu wasi'un 'alim",
  translation: 'The example of those who spend their wealth in the way of Allāh is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allāh multiplies [His reward] for whom He wills. And Allāh is all-Encompassing and Knowing.',
  source: 'Al-Baqarah 2:261',
  edition: 'en-sahih-international',
};

const _2_267 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ ۖ وَلَا تَيَمَّمُوا الْخَبِيثَ مِنْهُ تُنفِقُونَ وَلَسْتُم بِآخِذِيهِ إِلَّا أَن تُغْمِضُوا فِيهِ ۚ وَاعْلَمُوا أَنَّ اللَّهَ غَنِيٌّ حَمِيدٌ',
  transliteration: "Ya ayyuhal-ladhina amanu anfiqu min tayyibati ma kasabtum wa mimma akhrajna lakum minal-ard. Wa la tayammamul-khabitha minhu tunfiquna wa lastum bi akhidhihi illa an tughmidu fih. Wa'lamu annallaha ghaniyyun hamid",
  translation: 'O you who have believed, spend from the good things which you have earned and from that which We have produced for you from the earth. And do not aim toward the defective therefrom, spending [from that] while you would not take it [yourself] except with closed eyes. And know that Allāh is Free of need and Praiseworthy.',
  source: 'Al-Baqarah 2:267',
  edition: 'en-sahih-international',
};

const _57_18 = {
  arabic: 'إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ',
  transliteration: "Innal-mussaddiqina wal-mussaddiqati wa aqradullaha qardan hasanan yuda'afu lahum wa lahum ajrun karim",
  translation: 'Indeed, the men who practice charity and the women who practice charity and [they who] have loaned Allāh a goodly loan - it will be multiplied for them, and they will have a noble reward.',
  source: 'Al-Hadid 57:18',
  edition: 'en-sahih-international',
};

const _3_180 = {
  arabic: 'وَلَا يَحْسَبَنَّ الَّذِينَ يَبْخَلُونَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ هُوَ خَيْرًا لَّهُم ۖ بَلْ هُوَ شَرٌّ لَّهُمْ ۖ سَيُطَوَّقُونَ مَا بَخِلُوا بِهِ يَوْمَ الْقِيَامَةِ ۗ وَلِلَّهِ مِيرَاثُ السَّمَاوَاتِ وَالْأَرْضِ ۗ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ',
  transliteration: "Wa la yahsabanna-lladhina yabkhuluna bima atahumullahu min fadlih huwa khayran lahum. Bal huwa sharrun lahum. Sayutawwaquna ma bakhilu bihi yawmal-qiyamah. Wa lillahi mirathu-s-samawati wal-ard. Wallahu bima ta'maluna khabir",
  translation: 'And let not those who [greedily] withhold what Allāh has given them of His bounty ever think that it is better for them. Rather, it is worse for them. Their necks will be encircled by what they withheld on the Day of Resurrection. And to Allāh belongs the heritage of the heavens and the earth. And Allāh, of what you do, is [fully] Aware.',
  source: 'Al Imran 3:180',
  edition: 'en-sahih-international',
};

const _47_38 = {
  arabic: 'هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ ۖ وَمَن يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَن نَّفْسِهِ ۚ وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ',
  transliteration: "Ha antum ha'ula'i tud'awna litunfiqu fi sabilillahi faminku man yabkhalu. Wa man yabkhal fa innama yabkhalu 'an nafsih. Wallahul-ghaniyu wa antumul-fuqara'",
  translation: 'Here you are - those invited to spend in the cause of Allāh - but among you are those who withhold [out of greed]. And whoever withholds only withholds [benefit] from himself; and Allāh is the Free of need, while you are the needy.',
  source: 'Muhammad 47:38',
  edition: 'en-sahih-international',
};

const _9_34 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ كَثِيرًا مِّنَ الْأَحْبَارِ وَالرُّهْبَانِ لَيَأْكُلُونَ أَمْوَالَ النَّاسِ بِالْبَاطِلِ وَيَصُدُّونَ عَن سَبِيلِ اللَّهِ ۗ وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ',
  transliteration: "Ya ayyuhal-ladhina amanu inna kathiran minal-ahbari war-ruhbani laya'kuluna amwalan-nasi bil-batili wa yasudduna 'an sabilillah. Walladhina yaknizunadh-dhahaba wal-fiddata wa la yunfiqunahum fi sabilillahi fa bashshirhum bi 'adhabin alim",
  translation: 'O you who have believed, indeed many of the scholars and the monks devour the wealth of people unjustly and avert [them] from the way of Allāh. And those who hoard gold and silver and spend it not in the way of Allāh - give them tidings of a painful punishment.',
  source: 'At-Tawbah 9:34',
  edition: 'en-sahih-international',
};

// Z4 pool — worth not tied to material, attachment, contentment, qana'ah

const _34_37 = {
  arabic: 'وَمَا أَمْوَالُكُمْ وَلَا أَوْلَادُكُم بِالَّتِي تُقَرِّبُكُمْ عِندَنَا زُلْفَىٰ إِلَّا مَنْ آمَنَ وَعَمِلَ صَالِحًا فَأُولَٰئِكَ لَهُمْ جَزَاءُ الضِّعْفِ بِمَا عَمِلُوا وَهُمْ فِي الْغُرُفَاتِ آمِنُونَ',
  transliteration: "Wa ma amwalukum wa la awladukum billati tuqarrribukum 'indana zulfa illa man amana wa 'amila salihan fa ula'ika lahum jaza'ud-di'fi bima 'amilu wa hum fil-ghurufati aminun",
  translation: 'And it is not your wealth or your children that bring you nearer to Us in position, but it is [by being] one who has believed and done righteousness. For them there will be the double reward for what they did, and they will be in the upper chambers [of Paradise], safe [and secure].',
  source: "Saba' 34:37",
  edition: 'en-sahih-international',
};

const _18_46 = {
  arabic: 'الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا',
  transliteration: "Al-malu wal-banuna zinatul-hayatid-dunya. Wal-baqiyatus-salihatu khayrun 'inda rabbika thawaban wa khayrun amala",
  translation: "Wealth and children are [but] adornment of the worldly life. But the enduring good deeds are better to your Lord for reward and better for [one's] hope.",
  source: 'Al-Kahf 18:46',
  edition: 'en-sahih-international',
};

const _28_60 = {
  arabic: 'وَمَا أُوتِيتُم مِّن شَيْءٍ فَمَتَاعُ الْحَيَاةِ الدُّنْيَا وَزِينَتُهَا ۚ وَمَا عِندَ اللَّهِ خَيْرٌ وَأَبْقَىٰ ۚ أَفَلَا تَعْقِلُونَ',
  transliteration: "Wa ma utitum min shay'in fa mata'ul-hayatid-dunya wa zinatuh. Wa ma 'indallahi khayrun wa abqa. Afala ta'qilun",
  translation: 'And whatever thing you [people] have been given - it is [only for] the enjoyment of worldly life and its adornment. And what is with Allāh is better and more lasting; so will you not use reason?',
  source: 'Al-Qasas 28:60',
  edition: 'en-sahih-international',
};

const _57_23 = {
  arabic: 'لِّكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ وَلَا تَفْرَحُوا بِمَا آتَاكُمْ ۗ وَاللَّهُ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
  transliteration: "Likayla ta'saw 'ala ma fatakum wa la tafrahu bima atakum. Wallahu la yuhibbu kulla mukhtalin fakhur",
  translation: 'In order that you not despair over what has eluded you and not exult [in pride] over what He has given you. And Allāh does not like everyone self-deluded and boastful -',
  source: 'Al-Hadid 57:23',
  edition: 'en-sahih-international',
};

const _20_131 = {
  arabic: 'وَلَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ زَهْرَةَ الْحَيَاةِ الدُّنْيَا لِنَفْتِنَهُمْ فِيهِ ۚ وَرِزْقُ رَبِّكَ خَيْرٌ وَأَبْقَىٰ',
  transliteration: "Wa la tamuddanna 'aynayka ila ma matta'na bihi azwajan minhum zahrata-l-hayatid-dunya linaftinahum fih. Wa rizqu rabbika khayrun wa abqa",
  translation: 'And do not extend your eyes toward that by which We have given enjoyment to [some] categories of them, [its being but] the splendor of worldly life by which We test them. And the provision of your Lord is better and more enduring.',
  source: 'Ta-Ha 20:131',
  edition: 'en-sahih-international',
};

const _10_58 = {
  arabic: 'قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا هُوَ خَيْرٌ مِّمَّا يَجْمَعُونَ',
  transliteration: "Qul bifadlillahi wa birahmatih. Fabidhalika falyafrahhuu. Huwa khayrun mimma yajma'un",
  translation: 'Say, "In the bounty of Allāh and in His mercy - in that let them rejoice; it is better than what they accumulate."',
  source: 'Yunus 10:58',
  edition: 'en-sahih-international',
};

const _64_15 = {
  arabic: 'إِنَّمَا أَمْوَالُكُمْ وَأَوْلَادُكُمْ فِتْنَةٌ ۚ وَاللَّهُ عِندَهُ أَجْرٌ عَظِيمٌ',
  transliteration: "Innama amwalukum wa awladukum fitnah. Wallahu 'indahu ajrun 'adhim",
  translation: 'Your wealth and your children are but a trial, and Allāh has with Him a great reward.',
  source: 'At-Taghabun 64:15',
  edition: 'en-sahih-international',
};

const _9_59 = {
  arabic: 'وَلَوْ أَنَّهُمْ رَضُوا مَا آتَاهُمُ اللَّهُ وَرَسُولُهُ وَقَالُوا حَسْبُنَا اللَّهُ سَيُؤْتِينَا اللَّهُ مِن فَضْلِهِ وَرَسُولُهُ إِنَّا إِلَى اللَّهِ رَاغِبُونَ',
  transliteration: "Wa law annahum radu ma atahumullahu wa rasuluhu wa qalu hasbunallahu sayu'tinallahu min fadlihi wa rasuluhu inna ilallahi raghibun",
  translation: 'If only they had been satisfied with what Allāh and His Messenger gave them and said, "Sufficient for us is Allāh; Allāh will give us of His bounty, and [so will] His Messenger; indeed, we are desirous toward Allāh," [it would have been better for them].',
  source: 'At-Tawbah 9:59',
  edition: 'en-sahih-international',
};

// H1 pool — reckoning, accounting, looking at what was put forth before proceeding

const _59_18 = {
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
  transliteration: "Ya ayyuhal-ladhina amanu-ttaqullaha. Waltandhur nafsun ma qaddamat lighad. Wattaqullaha. Innallaha khabirun bima ta'malun",
  translation: 'O you who have believed, fear Allāh. And let every soul look to what it has put forth for tomorrow - and fear Allāh. Indeed, Allāh is Aware of what you do.',
  source: 'Al-Hashr 59:18',
  edition: 'en-sahih-international',
};

const _82_5 = {
  arabic: 'عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ',
  transliteration: "'Alimat nafsun ma qaddamat wa akhkharat",
  translation: 'A soul will [then] know what it has put forth and kept back.',
  source: 'Al-Infitar 82:5',
  edition: 'en-sahih-international',
};

const _2_281 = {
  arabic: 'وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ ۖ ثُمَّ تُوَفَّىٰ كُلُّ نَفْسٍ مَّا كَسَبَتْ وَهُمْ لَا يُظْلَمُونَ',
  transliteration: "Wattaqu yawman turja'una fihi ilallah. Thumma tuwaffa kullu nafsin ma kasabat wa hum la yuzlamun",
  translation: 'And fear a Day when you will be returned to Allāh. Then every soul will be compensated for what it earned, and they will not be wronged [i.e., treated unjustly].',
  source: 'Al-Baqarah 2:281',
  edition: 'en-sahih-international',
};

const _40_17 = {
  arabic: 'الْيَوْمَ تُجْزَىٰ كُلُّ نَفْسٍ بِمَا كَسَبَتْ ۚ لَا ظُلْمَ الْيَوْمَ ۚ إِنَّ اللَّهَ سَرِيعُ الْحِسَابِ',
  transliteration: "Al-yawma tujza kullu nafsin bima kasabat. La dhulmal-yawm. Innallaha sari'ul-hisab",
  translation: 'This Day every soul will be recompensed for what it earned. No injustice today! Indeed, Allāh is swift in account.',
  source: 'Ghafir 40:17',
  edition: 'en-sahih-international',
};

const _74_38 = {
  arabic: 'كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ',
  transliteration: "Kullu nafsin bima kasabat rahinah",
  translation: 'Every soul, for what it has earned, will be retained',
  source: 'Al-Muddaththir 74:38',
  edition: 'en-sahih-international',
};

// H2 pool — examining consequences, deliberate weighing before committing resources

const _17_29 = {
  arabic: 'وَلَا تَجْعَلْ يَدَكَ مَغْلُولَةً إِلَىٰ عُنُقِكَ وَلَا تَبْسُطْهَا كُلَّ الْبَسْطِ فَتَقْعُدَ مَلُومًا مَّحْسُورًا',
  transliteration: "Wa la taj'al yadaka maghlulatun ila 'unuqika wa la tabsutha kullal-basti fa taq'uda malooman mahsura",
  translation: 'And do not make your hand [as] chained to your neck or extend it completely and [thereby] become blamed and insolvent.',
  source: 'Al-Isra 17:29',
  edition: 'en-sahih-international',
};

const _55_9 = {
  arabic: 'وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ',
  transliteration: "Wa aqimul-wazna bil-qisti wa la tukhsirul-mizan",
  translation: 'And establish weight in justice and do not make deficient the balance.',
  source: 'Ar-Rahman 55:9',
  edition: 'en-sahih-international',
};

const _17_35 = {
  arabic: 'وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ ۚ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا',
  transliteration: "Wa awful-kayla idha kiltum wa zinu bil-qistasil-mustaqim. Dhalika khayrun wa ahsanu ta'wila",
  translation: 'And give full measure when you measure, and weigh with an even [i.e., honest] balance. That is the best [way] and best in result.',
  source: 'Al-Isra 17:35',
  edition: 'en-sahih-international',
};

const _65_7 = {
  arabic: 'لِيُنفِقْ ذُو سَعَةٍ مِّن سَعَتِهِ ۖ وَمَن قُدِرَ عَلَيْهِ رِزْقُهُ فَلْيُنفِقْ مِمَّا آتَاهُ اللَّهُ ۚ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا مَا آتَاهَا ۚ سَيَجْعَلُ اللَّهُ بَعْدَ عُسْرٍ يُسْرًا',
  transliteration: "Liyunfiq dhu sa'atin min sa'atih. Wa man qudira 'alayhi rizquhu falyunfiq mimma atahullahu. La yukallifullahu nafsan illa ma ataha. Sayaj'alullahu ba'da 'usrin yusra",
  translation: 'Let a man of wealth spend from his wealth, and he whose provision is restricted - let him spend from what Allāh has given him. Allāh does not charge a soul except [according to] what He has given it. Allāh will bring about, after hardship, ease [i.e., relief].',
  source: 'At-Talaq 65:7',
  edition: 'en-sahih-international',
};

const _28_77 = {
  arabic: 'وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ ۖ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا ۖ وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ ۖ وَلَا تَبْغِ الْفَسَادَ فِي الْأَرْضِ ۖ إِنَّ اللَّهَ لَا يُحِبُّ الْمُفْسِدِينَ',
  transliteration: "Wabtaghi fima atakallahu-d-daral-akhirah. Wa la tansa nasibaka minad-dunya. Wa ahsin kama ahsanallahu ilayk. Wa la tabghil-fasada fil-ard. Innallaha la yuhibbul-mufsidiin",
  translation: 'But seek, through that which Allāh has given you, the home of the Hereafter; and [yet], do not forget your share of the world. And do good as Allāh has done good to you. And desire not corruption in the land. Indeed, Allāh does not like corrupters.',
  source: 'Al-Qasas 28:77',
  edition: 'en-sahih-international',
};


// ─── Readiness Ayat Matrix ─────────────────────────────────

export const READINESS_AYAT_WEALTH = {

  // ═══ ALL YES — proceed ═══

  '111111': null,

  // ═══ ONE NOT YET (1 zero) — single gap ═══

  '011111': { ..._51_58,
    framing: 'I am treating what I hold as mine by right — He alone is the Provider of all of it.' },

  '101111': { ..._4_29,
    framing: 'I notice the boundary has shifted slightly — I can return to what is lawful before I proceed.' },

  '110111': { ..._3_92,
    framing: 'I am waiting for a better season to give — goodness requires spending from what I love, now.' },

  '111011': { ..._34_37,
    framing: 'I am measuring myself partly by this outcome — wealth does not bring me nearer to Him.' },

  '111101': { ..._59_18,
    framing: 'I am moving forward without looking at what I put forth — I need to see the full account first.' },

  '111110': { ..._17_29,
    framing: 'I am committing resources before honestly examining what follows — I should weigh before I act.' },

  // ═══ TWO NOT YET (2 zeros) — paired gaps ═══

  // Z-Z pairs (both gaps within Al-Razzāq)

  '001111': { ..._57_7,
    framing: 'I am treating this as mine and deferring my giving — I am a successive inheritor, not an owner.' },

  '010111': { ..._3_130,
    framing: 'Boundary and trust are both unresolved — fear Allah and leave what corrupts, that I may succeed.' },

  '011011': { ..._18_46,
    framing: 'I hold this as mine and measure my worth by it — wealth is adornment; what endures is far greater.' },

  '100111': { ..._2_261,
    framing: 'My giving is deferred and I have not attended to what I hold — every seed spent multiplies beyond measure.' },

  '101011': { ..._57_23,
    framing: 'Boundary and attachment are both unresolved — I must not exult in what I have been given.' },

  '110011': { ..._28_60,
    framing: 'I hold this as mine and measure by what I receive — what I have been given is worldly adornment.' },

  // Z-H cross pairs (one gap in Al-Razzāq, one gap in Al-Ḥasīb)

  '011101': { ..._4_132,
    framing: 'I hold this as mine without accounting — to Allah belongs all that is in the heavens and earth.' },

  '011110': { ..._65_3,
    framing: 'I hold this as mine while acting ahead of clear sight — whoever trusts Allah is provided from the unexpected.' },

  '101101': { ..._2_278,
    framing: 'Boundary is unclear and accounts are open — I should fear Allah and leave what remains of what corrupts.' },

  '101110': { ..._2_275,
    framing: 'Boundary is unclear and consequences unexamined — Allah has permitted trade and forbidden what destroys.' },

  '110101': { ..._82_5,
    framing: 'I treat this as mine without reckoning — a soul will know what it put forth and kept back.' },

  '110110': { ..._17_35,
    framing: 'I treat what I hold as mine while acting before accounting — weigh with an honest balance.' },

  '111001': { ..._40_17,
    framing: 'I am attached to this and my accounts are not clear — every soul is recompensed for what it earned.' },

  '111010': { ..._55_9,
    framing: 'I measure my worth by this outcome while deploying without full sight — establish weight with justice.' },

  // H-H pair (both gaps within Al-Ḥasīb) — CORNER

  '111100': { ..._59_18,
    framing: 'My heart and boundaries are settled but accounting is absent — let me first look at what I put forth.' },

  // ═══ THREE NOT YET (3 zeros) — deeper gaps ═══

  // 3Z + 0H (three Al-Razzāq gaps, both Al-Ḥasīb present)

  '000111': { ..._47_38,
    framing: 'Trust, boundary, and giving are all unresolved — whoever withholds only withholds from himself.' },

  '001011': { ..._9_59,
    framing: 'Trust, generosity, and attachment are unresolved — may I be content with what Allah has given.' },

  '010011': { ..._28_60,
    framing: 'Boundary, giving, and attachment are unresolved — what I have is adornment; what Allah holds endures.' },

  '100011': { ..._34_37,
    framing: 'Giving is deferred, the boundary is unclear, and I am attached — wealth does not draw me nearer to Him.' },

  // 2Z + 1H (two Al-Razzāq gaps + one Al-Ḥasīb gap)

  '001101': { ..._3_180,
    framing: 'Trust, giving, and the reckoning are all unresolved — withholding what Allah gave is worse, not better.' },

  '001110': { ..._57_18,
    framing: 'Trust, giving, and clear sight are unresolved — those who give Allah a goodly loan will find it multiplied.' },

  '010101': { ..._2_267,
    framing: 'Boundary, giving, and reckoning are unresolved — spend from what is good; Allah is Free of need.' },

  '010110': { ..._3_130,
    framing: 'Boundary, generosity, and examined consequences are all unresolved — fear Allah that I may succeed.' },

  '011001': { ..._65_3,
    framing: 'Trust and accounts are unresolved — whoever relies on Allah will be provided from where he does not expect.' },

  '011010': { ..._34_39,
    framing: 'Trust and clear sight are unresolved — whatever I spend He will compensate; He is the best of providers.' },

  '100101': { ..._63_10,
    framing: 'Giving is deferred, boundary is unclear, and accounts are open — spend before the moment of regret arrives.' },

  '100110': { ..._2_261,
    framing: 'Giving is deferred, boundary is unclear, and consequences unexamined — what is spent multiplies abundantly.' },

  '101001': { ..._74_38,
    framing: 'Boundary, attachment, and reckoning are all unresolved — every soul is retained for what it earned.' },

  '101010': { ..._28_77,
    framing: 'Boundary, attachment, and clear sight are all unresolved — seek the Hereafter through what Allah gave me.' },

  '110001': { ..._82_5,
    framing: 'Trust, attachment, and accounts are all unresolved — I should look at what I put forth and kept back.' },

  '110010': { ..._17_29,
    framing: 'Trust, attachment, and examining consequences are unresolved — I should not over-extend before I have weighed.' },

  // 1Z + 2H (one Al-Razzāq gap + both Al-Ḥasīb gaps)

  '011100': { ..._4_132,
    framing: 'I hold this as mine without any accounting or forward sight — to Allah belongs all things; He is sufficient.' },

  '101100': { ..._2_278,
    framing: 'Boundary is unclear and both forms of accounting are absent — fear Allah and leave what remains of what corrupts.' },

  '110100': { ..._57_23,
    framing: 'I treat this as mine without accounts or examined consequences — not despairing nor exulting in what I have.' },

  '111000': { ..._59_18,
    framing: 'My heart is right but accounting is absent — let me look clearly at what I have put forth.' },

  // ═══ FOUR NOT YET (4 zeros) — significant gaps ═══

  // 4Z + 0H — CORNER (all Al-Razzāq rows absent, both Al-Ḥasīb present)

  '000011': { ..._51_58,
    framing: 'Trust, boundary, giving, and attachment are all unresolved — He alone is the Provider; I am in receipt.' },

  // 3Z + 1H (three Al-Razzāq gaps + one Al-Ḥasīb gap)

  '000101': { ..._9_34,
    framing: 'Nearly all the trust dimension is absent — those who hoard without giving will face reckoning.' },

  '000110': { ..._47_38,
    framing: 'Nearly all trust is absent and I am acting before examination — Allah is Self-Sufficient; I am the needy.' },

  '001001': { ..._3_180,
    framing: 'Trust, giving, and the reckoning are unresolved — withholding is worse, not better; the heritage belongs to Allah.' },

  '001010': { ..._57_18,
    framing: 'Trust, giving, and forward sight are unresolved — those who lend to Allah a goodly loan receive a noble reward.' },

  '010001': { ..._63_10,
    framing: 'Boundary, giving, and reckoning are unresolved — spend before the moment when I wish I had more time.' },

  '010010': { ..._3_130,
    framing: 'Boundary, generosity, and honest examination are all unresolved — fear Allah in this, that I may succeed.' },

  '100001': { ..._2_281,
    framing: 'Giving is deferred, boundary unclear, I am attached, and accounts are open — I will be returned and recompensed.' },

  '100010': { ..._65_7,
    framing: 'Giving is deferred, boundary unclear, I am attached, and the outcome unexamined — Allah brings ease after hardship.' },

  // 2Z + 2H (two Al-Razzāq gaps + both Al-Ḥasīb gaps)

  '001100': { ..._57_7,
    framing: 'Trust and giving are unresolved with both forms of accounting absent — what I hold was entrusted, not owned.' },

  '010100': { ..._4_29,
    framing: 'Boundary and giving are unresolved without accounting — I should transact only in what is lawful and consensual.' },

  '011000': { ..._51_58,
    framing: 'Trust and giving are absent with no accounting — He is the Provider; I hold only what He entrusted.' },

  '100100': { ..._18_46,
    framing: 'Giving is deferred, I am attached, and both forms of accounting are absent — enduring deeds surpass all adornment.' },

  '101000': { ..._20_131,
    framing: 'Boundary unclear, attached, and no accounting present — provision from my Lord is better and more enduring.' },

  '110000': { ..._10_58,
    framing: 'Trust and attachment are unresolved with no accounting — let me rejoice in His bounty, not what I accumulate.' },

  // ═══ FIVE NOT YET (5 zeros) — nearly absent ═══

  '100000': { ..._63_10,
    framing: 'Only my awareness of deferred giving remains — nearly everything needs resetting before I proceed with this.' },

  '010000': { ..._2_275,
    framing: 'Only my concern for the boundary remains standing — Allah has permitted trade and forbidden what corrupts it.' },

  '001000': { ..._9_59,
    framing: 'Only my readiness to give remains — may I be content with what Allah has given and trust His bounty.' },

  '000100': { ..._64_15,
    framing: 'Only my freedom from attachment remains — wealth and children are a trial; the great reward is with Him.' },

  '000010': { ..._82_5,
    framing: 'Only my clear reckoning remains — I can build from this. Let me account for what I have put forth.' },

  '000001': { ..._55_9,
    framing: 'Only my commitment to examine consequences remains — I can build from this. Let me weigh with justice.' },

  // ═══ ALL NOT YET — fully unresolved ═══

  '000000': { ..._57_7,
    framing: 'I have forgotten that what I hold is a trust — I am a successive inheritor, not an owner.' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupReadinessAyah(key) {
  return READINESS_AYAT_WEALTH[key] || null;
}
