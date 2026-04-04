/**
 * BBOS — Work Module Default Readiness Ayat Matrix
 * Opening Threshold · Pause Protocol Content
 * Attribute pairing: Al-Muhsin (The Excellence-Giver) · Al-Wakil (The Trustee)
 * v1.0 · 2026-04-04
 *
 * SCOPE: Default pairing only. ~20-30% of Work module tasks surface
 * task-specific attribute pairings and require separate matrices.
 *
 * Key schema: 6-character binary string
 * Positions: M1 M2 M3 W1 W2 W3
 * 1 = YES WHEN · 0 = NOT YET WHEN
 *
 * Usage: READINESS_AYAT_WORK[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - 34 unique ayat across 63 non-null entries (max 3 keys per shared ayah)
 * - Shared ayat: 13:28(3), 33:3(3), 57:23(3), 94:5-6(3), 48:4(3), 41:30(3),
 *   10:62(3), 39:53(3), 2:286(3), 6:162(3), 73:9(3), 28:77(3), 20:130(3),
 *   3:159(2), 29:69(2), 23:60(2)
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all <= 20 words, 2nd person, warm
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran(34 ayat, ar-simple-clean),
 *   fetch_translation(34 ayat, en-sahih-international)
 */

// ─── Canonical Ayah Data (private) ──────────────────────────
// Each const holds the immutable ayah data; the matrix entries
// spread these and add a key-specific `framing` field.

const _2_195 = {
  arabic: '\u0648\u064E\u0623\u064E\u0646\u0641\u0650\u0642\u064F\u0648\u0627 \u0641\u0650\u064A \u0633\u064E\u0628\u0650\u064A\u0644\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0644\u064E\u0627 \u062A\u064F\u0644\u0652\u0642\u064F\u0648\u0627 \u0628\u0650\u0623\u064E\u064A\u0652\u062F\u0650\u064A\u0643\u064F\u0645\u0652 \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u062A\u0651\u064E\u0647\u0652\u0644\u064F\u0643\u064E\u0629\u0650 \u06DB \u0648\u064E\u0623\u064E\u062D\u0652\u0633\u0650\u0646\u064F\u0648\u0627 \u06DB \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0627\u0644\u0652\u0645\u064F\u062D\u0652\u0633\u0650\u0646\u0650\u064A\u0646\u064E',
  transliteration: 'Wa anfiq\u016B f\u012B sab\u012Blill\u0101hi wa l\u0101 tulq\u016B bi ayd\u012Bkum ilat-tahlukah. Wa a\u1E25sin\u016B. Innall\u0101ha yu\u1E25ibbul-mu\u1E25sin\u012Bn',
  translation: 'And spend in the way of All\u0101h and do not throw [yourselves] with your [own] hands into destruction [by refraining]. And do good; indeed, All\u0101h loves the doers of good.',
  source: 'Al-Baqarah 2:195',
  edition: 'en-sahih-international',
};

const _2_286 = {
  arabic: '\u0644\u064E\u0627 \u064A\u064F\u0643\u064E\u0644\u0651\u0650\u0641\u064F \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0646\u064E\u0641\u0652\u0633\u064B\u0627 \u0625\u0650\u0644\u0651\u064E\u0627 \u0648\u064F\u0633\u0652\u0639\u064E\u0647\u064E\u0627 \u06DA \u0644\u064E\u0647\u064E\u0627 \u0645\u064E\u0627 \u0643\u064E\u0633\u064E\u0628\u064E\u062A\u0652 \u0648\u064E\u0639\u064E\u0644\u064E\u064A\u0652\u0647\u064E\u0627 \u0645\u064E\u0627 \u0627\u0643\u0652\u062A\u064E\u0633\u064E\u0628\u064E\u062A\u0652 \u06D7 \u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0644\u064E\u0627 \u062A\u064F\u0624\u064E\u0627\u062E\u0650\u0630\u0652\u0646\u064E\u0627 \u0625\u0650\u0646 \u0646\u0651\u064E\u0633\u0650\u064A\u0646\u064E\u0627 \u0623\u064E\u0648\u0652 \u0623\u064E\u062E\u0652\u0637\u064E\u0623\u0652\u0646\u064E\u0627 \u06DA \u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u062D\u0652\u0645\u0650\u0644\u0652 \u0639\u064E\u0644\u064E\u064A\u0652\u0646\u064E\u0627 \u0625\u0650\u0635\u0652\u0631\u064B\u0627 \u0643\u064E\u0645\u064E\u0627 \u062D\u064E\u0645\u064E\u0644\u0652\u062A\u064E\u0647\u064F \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0645\u0650\u0646 \u0642\u064E\u0628\u0652\u0644\u0650\u0646\u064E\u0627 \u06DA \u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0648\u064E\u0644\u064E\u0627 \u062A\u064F\u062D\u064E\u0645\u0651\u0650\u0644\u0652\u0646\u064E\u0627 \u0645\u064E\u0627 \u0644\u064E\u0627 \u0637\u064E\u0627\u0642\u064E\u0629\u064E \u0644\u064E\u0646\u064E\u0627 \u0628\u0650\u0647\u0650 \u06D6 \u0648\u064E\u0627\u0639\u0652\u0641\u064F \u0639\u064E\u0646\u0651\u064E\u0627 \u0648\u064E\u0627\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u064E\u0646\u064E\u0627 \u0648\u064E\u0627\u0631\u0652\u062D\u064E\u0645\u0652\u0646\u064E\u0627 \u06DA \u0623\u064E\u0646\u062A\u064E \u0645\u064E\u0648\u0652\u0644\u064E\u0627\u0646\u064E\u0627 \u0641\u064E\u0627\u0646\u0635\u064F\u0631\u0652\u0646\u064E\u0627 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0652\u0642\u064E\u0648\u0652\u0645\u0650 \u0627\u0644\u0652\u0643\u064E\u0627\u0641\u0650\u0631\u0650\u064A\u0646\u064E',
  transliteration: 'L\u0101 yukalliful-l\u0101hu nafsan ill\u0101 wus\u02BFah\u0101. Lah\u0101 m\u0101 kasabat wa \u02BFalayh\u0101 maktasabat. Rabban\u0101 l\u0101 tu\u02BF\u0101khidhn\u0101 in nas\u012Bn\u0101 aw akh\u1E6Da\u02BFn\u0101. Rabban\u0101 wa l\u0101 ta\u1E25mil \u02BFalayn\u0101 i\u1E63ran kam\u0101 \u1E25amaltahu \u02BFalal-ladh\u012Bna min qablin\u0101. Rabban\u0101 wa l\u0101 tu\u1E25ammiln\u0101 m\u0101 l\u0101 \u1E6D\u0101qata lan\u0101 bih. Wa\u02BFfu \u02BFann\u0101 waghfir lan\u0101 war\u1E25amn\u0101. Anta mawl\u0101n\u0101 fan\u1E63urn\u0101 \u02BFalal-qawmil-k\u0101fir\u012Bn',
  translation: 'All\u0101h does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _3_139 = {
  arabic: '\u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u0647\u0650\u0646\u064F\u0648\u0627 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u062D\u0652\u0632\u064E\u0646\u064F\u0648\u0627 \u0648\u064E\u0623\u064E\u0646\u062A\u064F\u0645\u064F \u0627\u0644\u0652\u0623\u064E\u0639\u0652\u0644\u064E\u0648\u0652\u0646\u064E \u0625\u0650\u0646 \u0643\u064F\u0646\u062A\u064F\u0645 \u0645\u0651\u064F\u0624\u0652\u0645\u0650\u0646\u0650\u064A\u0646\u064E',
  transliteration: 'Wa l\u0101 tahin\u016B wa l\u0101 ta\u1E25zan\u016B wa antumul-a\u02BFlawna in kuntum mu\u02BFmin\u012Bn',
  translation: 'So do not weaken and do not grieve, and you will be superior if you are [true] believers.',
  source: '\u0100l \u02BFImr\u0101n 3:139',
  edition: 'en-sahih-international',
};

const _3_159 = {
  arabic: '\u0641\u064E\u0628\u0650\u0645\u064E\u0627 \u0631\u064E\u062D\u0652\u0645\u064E\u0629\u064D \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0644\u0650\u0646\u062A\u064E \u0644\u064E\u0647\u064F\u0645\u0652 \u06D6 \u0648\u064E\u0644\u064E\u0648\u0652 \u0643\u064F\u0646\u062A\u064E \u0641\u064E\u0638\u0651\u064B\u0627 \u063A\u064E\u0644\u0650\u064A\u0638\u064E \u0627\u0644\u0652\u0642\u064E\u0644\u0652\u0628\u0650 \u0644\u064E\u0627\u0646\u0641\u064E\u0636\u0651\u064F\u0648\u0627 \u0645\u0650\u0646\u0652 \u062D\u064E\u0648\u0652\u0644\u0650\u0643\u064E \u06D6 \u0641\u064E\u0627\u0639\u0652\u0641\u064F \u0639\u064E\u0646\u0652\u0647\u064F\u0645\u0652 \u0648\u064E\u0627\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u064E\u0647\u064F\u0645\u0652 \u0648\u064E\u0634\u064E\u0627\u0648\u0650\u0631\u0652\u0647\u064F\u0645\u0652 \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0645\u0652\u0631\u0650 \u06D6 \u0641\u064E\u0625\u0650\u0630\u064E\u0627 \u0639\u064E\u0632\u064E\u0645\u0652\u062A\u064E \u0641\u064E\u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0652 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u06DA \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0627\u0644\u0652\u0645\u064F\u062A\u064E\u0648\u064E\u0643\u0651\u0650\u0644\u0650\u064A\u0646\u064E',
  transliteration: 'Fabim\u0101 ra\u1E25matin minal-l\u0101hi linta lahum. Wa law kunta fa\u1E93\u1E93an ghal\u012B\u1E93al-qalbi lanfa\u1E0D\u1E0D\u016B min \u1E25awlik. Fa\u02BFfu \u02BFanhum wastaghfir lahum wa sh\u0101wirhum fil-amr. Fa idh\u0101 \u02BFazamta fatawakkal \u02BFalal-l\u0101h. Innal-l\u0101ha yu\u1E25ibbul-mutawakkil\u012Bn',
  translation: 'So by mercy from All\u0101h, [O Mu\u1E25ammad], you were lenient with them. And if you had been rude [in speech] and harsh in heart, they would have disbanded from about you. So pardon them and ask forgiveness for them and consult them in the matter. And when you have decided, then rely upon All\u0101h. Indeed, All\u0101h loves those who rely [upon Him].',
  source: '\u0100l \u02BFImr\u0101n 3:159',
  edition: 'en-sahih-international',
};

const _6_162 = {
  arabic: '\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u0651\u064E \u0635\u064E\u0644\u064E\u0627\u062A\u0650\u064A \u0648\u064E\u0646\u064F\u0633\u064F\u0643\u0650\u064A \u0648\u064E\u0645\u064E\u062D\u0652\u064A\u064E\u0627\u064A\u064E \u0648\u064E\u0645\u064E\u0645\u064E\u0627\u062A\u0650\u064A \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0631\u064E\u0628\u0651\u0650 \u0627\u0644\u0652\u0639\u064E\u0627\u0644\u064E\u0645\u0650\u064A\u0646\u064E',
  transliteration: 'Qul inna sal\u0101t\u012B wa nusuk\u012B wa ma\u1E25y\u0101ya wa mam\u0101t\u012B lill\u0101hi rabbil-\u02BF\u0101lam\u012Bn',
  translation: 'Say, "Indeed, my prayer, my rites of sacrifice, my living and my dying are for All\u0101h, Lord of the worlds.',
  source: 'Al-An\u02BF\u0101m 6:162',
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: '\u0648\u064E\u0627\u0630\u0652\u0643\u064F\u0631 \u0631\u0651\u064E\u0628\u0651\u064E\u0643\u064E \u0641\u0650\u064A \u0646\u064E\u0641\u0652\u0633\u0650\u0643\u064E \u062A\u064E\u0636\u064E\u0631\u0651\u064F\u0639\u064B\u0627 \u0648\u064E\u062E\u0650\u064A\u0641\u064E\u0629\u064B \u0648\u064E\u062F\u064F\u0648\u0646\u064E \u0627\u0644\u0652\u062C\u064E\u0647\u0652\u0631\u0650 \u0645\u0650\u0646\u064E \u0627\u0644\u0652\u0642\u064E\u0648\u0652\u0644\u0650 \u0628\u0650\u0627\u0644\u0652\u063A\u064F\u062F\u064F\u0648\u0651\u0650 \u0648\u064E\u0627\u0644\u0652\u0622\u0635\u064E\u0627\u0644\u0650 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u0643\u064F\u0646 \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0652\u063A\u064E\u0627\u0641\u0650\u0644\u0650\u064A\u0646\u064E',
  transliteration: 'Wadhkur rabbaka f\u012B nafsika ta\u1E0Darru\u02BFan wa kh\u012Bfatan wa d\u016Bnal-jahri minal-qawli bil-ghuduwwi wal-\u0101\u1E63\u0101l. Wa l\u0101 takun minal-gh\u0101fil\u012Bn',
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech \u2014 in the mornings and the evenings. And do not be among the heedless.',
  source: 'Al-A\u02BFr\u0101f 7:205',
  edition: 'en-sahih-international',
};

const _9_51 = {
  arabic: '\u0642\u064F\u0644 \u0644\u0651\u064E\u0646 \u064A\u064F\u0635\u0650\u064A\u0628\u064E\u0646\u064E\u0627 \u0625\u0650\u0644\u0651\u064E\u0627 \u0645\u064E\u0627 \u0643\u064E\u062A\u064E\u0628\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0646\u064E\u0627 \u0647\u064F\u0648\u064E \u0645\u064E\u0648\u0652\u0644\u064E\u0627\u0646\u064E\u0627 \u06DA \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0641\u064E\u0644\u0652\u064A\u064E\u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0650 \u0627\u0644\u0652\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u064F\u0648\u0646\u064E',
  transliteration: 'Qul lan yu\u1E63\u012Bban\u0101 ill\u0101 m\u0101 katabal-l\u0101hu lan\u0101 huwa mawl\u0101n\u0101. Wa \u02BFalal-l\u0101hi falyatawakkalil-mu\u02BFmin\u016Bn',
  translation: 'Say, "Never will we be struck except by what All\u0101h has decreed for us; He is our protector." And upon All\u0101h let the believers rely.',
  source: 'At-Tawbah 9:51',
  edition: 'en-sahih-international',
};

const _10_62 = {
  arabic: '\u0623\u064E\u0644\u064E\u0627 \u0625\u0650\u0646\u0651\u064E \u0623\u064E\u0648\u0652\u0644\u0650\u064A\u064E\u0627\u0621\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0644\u064E\u0627 \u062E\u064E\u0648\u0652\u0641\u064C \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650\u0645\u0652 \u0648\u064E\u0644\u064E\u0627 \u0647\u064F\u0645\u0652 \u064A\u064E\u062D\u0652\u0632\u064E\u0646\u064F\u0648\u0646\u064E',
  transliteration: 'Al\u0101 inna awliy\u0101\u02BFal-l\u0101hi l\u0101 khawfun \u02BFalayhim wa l\u0101 hum ya\u1E25zan\u016Bn',
  translation: 'Unquestionably, [for] the allies of All\u0101h there will be no fear concerning them, nor will they grieve.',
  source: 'Y\u016Bnus 10:62',
  edition: 'en-sahih-international',
};

const _13_28 = {
  arabic: '\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0622\u0645\u064E\u0646\u064F\u0648\u0627 \u0648\u064E\u062A\u064E\u0637\u0652\u0645\u064E\u0626\u0650\u0646\u0651\u064F \u0642\u064F\u0644\u064F\u0648\u0628\u064F\u0647\u064F\u0645 \u0628\u0650\u0630\u0650\u0643\u0652\u0631\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u06D7 \u0623\u064E\u0644\u064E\u0627 \u0628\u0650\u0630\u0650\u0643\u0652\u0631\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u062A\u064E\u0637\u0652\u0645\u064E\u0626\u0650\u0646\u0651\u064F \u0627\u0644\u0652\u0642\u064F\u0644\u064F\u0648\u0628\u064F',
  transliteration: 'Alladh\u012Bna \u0101man\u016B wa ta\u1E6Dma\u02BFinnu qul\u016Bbuhum bi dhikrill\u0101h. Al\u0101 bi dhikrill\u0101hi ta\u1E6Dma\u02BFinnul-qul\u016Bb',
  translation: 'Those who have believed and whose hearts are assured by the remembrance of All\u0101h. Unquestionably, by the remembrance of All\u0101h hearts are assured.',
  source: 'Ar-Ra\u02BFd 13:28',
  edition: 'en-sahih-international',
};

const _16_90 = {
  arabic: '\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064E\u0623\u0652\u0645\u064F\u0631\u064F \u0628\u0650\u0627\u0644\u0652\u0639\u064E\u062F\u0652\u0644\u0650 \u0648\u064E\u0627\u0644\u0652\u0625\u0650\u062D\u0652\u0633\u064E\u0627\u0646\u0650 \u0648\u064E\u0625\u0650\u064A\u062A\u064E\u0627\u0621\u0650 \u0630\u0650\u064A \u0627\u0644\u0652\u0642\u064F\u0631\u0652\u0628\u064E\u0649\u0670 \u0648\u064E\u064A\u064E\u0646\u0652\u0647\u064E\u0649\u0670 \u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u0641\u064E\u062D\u0652\u0634\u064E\u0627\u0621\u0650 \u0648\u064E\u0627\u0644\u0652\u0645\u064F\u0646\u0643\u064E\u0631\u0650 \u0648\u064E\u0627\u0644\u0652\u0628\u064E\u063A\u0652\u064A\u0650 \u06DA \u064A\u064E\u0639\u0650\u0638\u064F\u0643\u064F\u0645\u0652 \u0644\u064E\u0639\u064E\u0644\u0651\u064E\u0643\u064F\u0645\u0652 \u062A\u064E\u0630\u064E\u0643\u0651\u064E\u0631\u064F\u0648\u0646\u064E',
  transliteration: 'Innal-l\u0101ha ya\u02BFmuru bil-\u02BFadli wal-i\u1E25s\u0101ni wa \u012Bt\u0101\u02BFi dhil-qurb\u0101 wa yanh\u0101 \u02BFanil-fa\u1E25sh\u0101\u02BFi wal-munkari wal-baghy. Ya\u02BFi\u1E93ukum la\u02BFallakum tadhakkar\u016Bn',
  translation: 'Indeed, All\u0101h orders justice and good conduct and giving [help] to relatives and forbids immorality and bad conduct and oppression. He admonishes you that perhaps you will be reminded.',
  source: 'An-Na\u1E25l 16:90',
  edition: 'en-sahih-international',
};

const _18_24 = {
  arabic: '\u0625\u0650\u0644\u0651\u064E\u0627 \u0623\u064E\u0646 \u064A\u064E\u0634\u064E\u0627\u0621\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u06DA \u0648\u064E\u0627\u0630\u0652\u0643\u064F\u0631 \u0631\u0651\u064E\u0628\u0651\u064E\u0643\u064E \u0625\u0650\u0630\u064E\u0627 \u0646\u064E\u0633\u0650\u064A\u062A\u064E \u0648\u064E\u0642\u064F\u0644\u0652 \u0639\u064E\u0633\u064E\u0649\u0670 \u0623\u064E\u0646 \u064A\u064E\u0647\u0652\u062F\u0650\u064A\u064E\u0646\u0650 \u0631\u064E\u0628\u0651\u0650\u064A \u0644\u0650\u0623\u064E\u0642\u0652\u0631\u064E\u0628\u064E \u0645\u0650\u0646\u0652 \u0647\u064E\u0670\u0630\u064E\u0627 \u0631\u064E\u0634\u064E\u062F\u064B\u0627',
  transliteration: 'Ill\u0101 an yash\u0101\u02BFal-l\u0101h. Wadhkur rabbaka idh\u0101 nas\u012Bta wa qul \u02BFas\u0101 an yahdiyani rabb\u012B li aqraba min h\u0101dh\u0101 rashad\u0101',
  translation: 'Except [when adding], "If All\u0101h wills." And remember your Lord when you forget [it] and say, "Perhaps my Lord will guide me to what is nearer than this to right conduct."',
  source: 'Al-Kahf 18:24',
  edition: 'en-sahih-international',
};

const _20_130 = {
  arabic: '\u0641\u064E\u0627\u0635\u0652\u0628\u0650\u0631\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0645\u064E\u0627 \u064A\u064E\u0642\u064F\u0648\u0644\u064F\u0648\u0646\u064E \u0648\u064E\u0633\u064E\u0628\u0651\u0650\u062D\u0652 \u0628\u0650\u062D\u064E\u0645\u0652\u062F\u0650 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u0637\u064F\u0644\u064F\u0648\u0639\u0650 \u0627\u0644\u0634\u0651\u064E\u0645\u0652\u0633\u0650 \u0648\u064E\u0642\u064E\u0628\u0652\u0644\u064E \u063A\u064F\u0631\u064F\u0648\u0628\u0650\u0647\u064E\u0627 \u06D6 \u0648\u064E\u0645\u0650\u0646\u0652 \u0622\u0646\u064E\u0627\u0621\u0650 \u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644\u0650 \u0641\u064E\u0633\u064E\u0628\u0651\u0650\u062D\u0652 \u0648\u064E\u0623\u064E\u0637\u0652\u0631\u064E\u0627\u0641\u064E \u0627\u0644\u0646\u0651\u064E\u0647\u064E\u0627\u0631\u0650 \u0644\u064E\u0639\u064E\u0644\u0651\u064E\u0643\u064E \u062A\u064E\u0631\u0652\u0636\u064E\u0649\u0670',
  transliteration: 'Fa\u1E63bir \u02BFal\u0101 m\u0101 yaq\u016Bl\u016Bna wa sabbi\u1E25 bi \u1E25amdi rabbika qabla \u1E6Dul\u016B\u02BFish-shamsi wa qabla ghur\u016Bbih\u0101. Wa min \u0101n\u0101\u02BFil-layli fasabbi\u1E25 wa a\u1E6Dr\u0101fan-nah\u0101ri la\u02BFallaka tar\u1E0D\u0101',
  translation: 'So be patient over what they say and exalt [All\u0101h] with praise of your Lord before the rising of the sun and before its setting; and during periods of the night [exalt Him] and at the ends of the day, that you may be satisfied.',
  source: '\u1E6C\u0101-H\u0101 20:130',
  edition: 'en-sahih-international',
};

const _21_37 = {
  arabic: '\u062E\u064F\u0644\u0650\u0642\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064F \u0645\u0650\u0646\u0652 \u0639\u064E\u062C\u064E\u0644\u064D \u06DA \u0633\u064E\u0623\u064F\u0631\u0650\u064A\u0643\u064F\u0645\u0652 \u0622\u064A\u064E\u0627\u062A\u0650\u064A \u0641\u064E\u0644\u064E\u0627 \u062A\u064E\u0633\u0652\u062A\u064E\u0639\u0652\u062C\u0650\u0644\u064F\u0648\u0646\u0650',
  transliteration: 'Khuliqa-l-ins\u0101nu min \u02BFajal. Sa ur\u012Bkum \u0101y\u0101t\u012B fal\u0101 tasta\u02BFjil\u016Bn',
  translation: 'Man was created of haste. I will show you My signs, so do not impatiently urge Me.',
  source: 'Al-Anbiy\u0101\u02BF 21:37',
  edition: 'en-sahih-international',
};

const _23_60 = {
  arabic: '\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u064A\u064F\u0624\u0652\u062A\u064F\u0648\u0646\u064E \u0645\u064E\u0627 \u0622\u062A\u064E\u0648\u0627 \u0648\u0651\u064E\u0642\u064F\u0644\u064F\u0648\u0628\u064F\u0647\u064F\u0645\u0652 \u0648\u064E\u062C\u0650\u0644\u064E\u0629\u064C \u0623\u064E\u0646\u0651\u064E\u0647\u064F\u0645\u0652 \u0625\u0650\u0644\u064E\u0649\u0670 \u0631\u064E\u0628\u0651\u0650\u0647\u0650\u0645\u0652 \u0631\u064E\u0627\u062C\u0650\u0639\u064F\u0648\u0646\u064E',
  transliteration: 'Wal-ladh\u012Bna yu\u02BFt\u016Bna m\u0101 \u0101taw wa qul\u016Bbuhum wajilah annahum il\u0101 rabbihim r\u0101ji\u02BF\u016Bn',
  translation: 'And they who give what they give while their hearts are fearful because they will be returning to their Lord.',
  source: 'Al-Mu\u02BFmin\u016Bn 23:60',
  edition: 'en-sahih-international',
};

const _28_77 = {
  arabic: '\u0648\u064E\u0627\u0628\u0652\u062A\u064E\u063A\u0650 \u0641\u0650\u064A\u0645\u064E\u0627 \u0622\u062A\u064E\u0627\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0627\u0644\u062F\u0651\u064E\u0627\u0631\u064E \u0627\u0644\u0652\u0622\u062E\u0650\u0631\u064E\u0629\u064E \u06D6 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u0646\u0633\u064E \u0646\u064E\u0635\u0650\u064A\u0628\u064E\u0643\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u062F\u0651\u064F\u0646\u0652\u064A\u064E\u0627 \u06D6 \u0648\u064E\u0623\u064E\u062D\u0652\u0633\u0650\u0646 \u0643\u064E\u0645\u064E\u0627 \u0623\u064E\u062D\u0652\u0633\u064E\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0625\u0650\u0644\u064E\u064A\u0652\u0643\u064E \u06D6 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u0628\u0652\u063A\u0650 \u0627\u0644\u0652\u0641\u064E\u0633\u064E\u0627\u062F\u064E \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u06D6 \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0644\u064E\u0627 \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0627\u0644\u0652\u0645\u064F\u0641\u0652\u0633\u0650\u062F\u0650\u064A\u0646\u064E',
  transliteration: 'Wabtaghi f\u012Bm\u0101 \u0101t\u0101kal-l\u0101hud-d\u0101ral-\u0101khirah. Wa l\u0101 tansa na\u1E63\u012Bbaka minad-duny\u0101. Wa a\u1E25sin kam\u0101 a\u1E25sanal-l\u0101hu ilayk. Wa l\u0101 tabghil-fas\u0101da fil-ar\u1E0D. Innal-l\u0101ha l\u0101 yu\u1E25ibbul-mufsid\u012Bn',
  translation: 'But seek, through that which All\u0101h has given you, the home of the Hereafter; and [yet], do not forget your share of the world. And do good as All\u0101h has done good to you. And desire not corruption in the land. Indeed, All\u0101h does not like corrupters.',
  source: 'Al-Qa\u1E63a\u1E63 28:77',
  edition: 'en-sahih-international',
};

const _29_2 = {
  arabic: '\u0623\u064E\u062D\u064E\u0633\u0650\u0628\u064E \u0627\u0644\u0646\u0651\u064E\u0627\u0633\u064F \u0623\u064E\u0646 \u064A\u064F\u062A\u0652\u0631\u064E\u0643\u064F\u0648\u0627 \u0623\u064E\u0646 \u064A\u064E\u0642\u064F\u0648\u0644\u064F\u0648\u0627 \u0622\u0645\u064E\u0646\u0651\u064E\u0627 \u0648\u064E\u0647\u064F\u0645\u0652 \u0644\u064E\u0627 \u064A\u064F\u0641\u0652\u062A\u064E\u0646\u064F\u0648\u0646\u064E',
  transliteration: 'A\u1E25asibanl-n\u0101su an yutrak\u016B an yaq\u016Bl\u016B \u0101mann\u0101 wa hum l\u0101 yuftan\u016Bn',
  translation: 'Do the people think that they will be left to say, "We believe" and they will not be tried?',
  source: 'Al-\u02BFAnkab\u016Bt 29:2',
  edition: 'en-sahih-international',
};

const _29_69 = {
  arabic: '\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u062C\u064E\u0627\u0647\u064E\u062F\u064F\u0648\u0627 \u0641\u0650\u064A\u0646\u064E\u0627 \u0644\u064E\u0646\u064E\u0647\u0652\u062F\u0650\u064A\u064E\u0646\u0651\u064E\u0647\u064F\u0645\u0652 \u0633\u064F\u0628\u064F\u0644\u064E\u0646\u064E\u0627 \u06DA \u0648\u064E\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0644\u064E\u0645\u064E\u0639\u064E \u0627\u0644\u0652\u0645\u064F\u062D\u0652\u0633\u0650\u0646\u0650\u064A\u0646\u064E',
  transliteration: 'Wal-ladh\u012Bna j\u0101had\u016B f\u012Bn\u0101 lanahdiyunnahum subulan\u0101. Wa innal-l\u0101ha lama\u02BFal-mu\u1E25sin\u012Bn',
  translation: 'And those who strive for Us \u2014 We will surely guide them to Our ways. And indeed, All\u0101h is with the doers of good.',
  source: 'Al-\u02BFAnkab\u016Bt 29:69',
  edition: 'en-sahih-international',
};

const _31_22 = {
  arabic: '\u0648\u064E\u0645\u064E\u0646 \u064A\u064F\u0633\u0652\u0644\u0650\u0645\u0652 \u0648\u064E\u062C\u0652\u0647\u064E\u0647\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0647\u064F\u0648\u064E \u0645\u064F\u062D\u0652\u0633\u0650\u0646\u064C \u0641\u064E\u0642\u064E\u062F\u0650 \u0627\u0633\u0652\u062A\u064E\u0645\u0652\u0633\u064E\u0643\u064E \u0628\u0650\u0627\u0644\u0652\u0639\u064F\u0631\u0652\u0648\u064E\u0629\u0650 \u0627\u0644\u0652\u0648\u064F\u062B\u0652\u0642\u064E\u0649\u0670 \u06D7 \u0648\u064E\u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0639\u064E\u0627\u0642\u0650\u0628\u064E\u0629\u064F \u0627\u0644\u0652\u0623\u064F\u0645\u064F\u0648\u0631\u0650',
  transliteration: 'Wa man yuslim wajhahu ilal-l\u0101hi wa huwa mu\u1E25sinun faqadistamsaka bil-\u02BFurwatil-wuthq\u0101. Wa ilal-l\u0101hi \u02BF\u0101qibatul-um\u016Br',
  translation: 'And whoever submits his face to All\u0101h while he is a doer of good \u2014 then he has grasped the most trustworthy handhold. And to All\u0101h will be the outcome of [all] matters.',
  source: 'Luqm\u0101n 31:22',
  edition: 'en-sahih-international',
};

const _33_3 = {
  arabic: '\u0648\u064E\u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0652 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u06DA \u0648\u064E\u0643\u064E\u0641\u064E\u0649\u0670 \u0628\u0650\u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0643\u0650\u064A\u0644\u064B\u0627',
  transliteration: 'Wa tawakkal \u02BFalal-l\u0101h. Wa kaf\u0101 bill\u0101hi wak\u012Bl\u0101',
  translation: 'And rely upon All\u0101h; and sufficient is All\u0101h as Disposer of affairs.',
  source: 'Al-A\u1E25z\u0101b 33:3',
  edition: 'en-sahih-international',
};

const _39_11 = {
  arabic: '\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u0651\u0650\u064A \u0623\u064F\u0645\u0650\u0631\u0652\u062A\u064F \u0623\u064E\u0646\u0652 \u0623\u064E\u0639\u0652\u0628\u064F\u062F\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0645\u064F\u062E\u0652\u0644\u0650\u0635\u064B\u0627 \u0644\u0651\u064E\u0647\u064F \u0627\u0644\u062F\u0651\u0650\u064A\u0646\u064E',
  transliteration: 'Qul inn\u012B umirtu an a\u02BFbudal-l\u0101ha mukhli\u1E63an lahud-d\u012Bn',
  translation: 'Say, "Indeed, I have been commanded to worship All\u0101h, [being] sincere to Him in religion."',
  source: 'Az-Zumar 39:11',
  edition: 'en-sahih-international',
};

const _39_53 = {
  arabic: '\u0642\u064F\u0644\u0652 \u064A\u064E\u0627 \u0639\u0650\u0628\u064E\u0627\u062F\u0650\u064A\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0623\u064E\u0633\u0652\u0631\u064E\u0641\u064F\u0648\u0627 \u0639\u064E\u0644\u064E\u0649\u0670 \u0623\u064E\u0646\u0641\u064F\u0633\u0650\u0647\u0650\u0645\u0652 \u0644\u064E\u0627 \u062A\u064E\u0642\u0652\u0646\u064E\u0637\u064F\u0648\u0627 \u0645\u0650\u0646 \u0631\u0651\u064E\u062D\u0652\u0645\u064E\u0629\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u06DA \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0630\u0651\u064F\u0646\u064F\u0648\u0628\u064E \u062C\u064E\u0645\u0650\u064A\u0639\u064B\u0627 \u06DA \u0625\u0650\u0646\u0651\u064E\u0647\u064F \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u063A\u064E\u0641\u064F\u0648\u0631\u064F \u0627\u0644\u0631\u0651\u064E\u062D\u0650\u064A\u0645\u064F',
  transliteration: 'Qul y\u0101 \u02BFib\u0101diyal-ladh\u012Bna asraf\u016B \u02BFal\u0101 anfusihim l\u0101 taqna\u1E6D\u016B min ra\u1E25matil-l\u0101h. Innal-l\u0101ha yaghfirudh-dhun\u016Bba jam\u012B\u02BFa. Innahu huwal-ghaf\u016Brur-ra\u1E25\u012Bm',
  translation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of All\u0101h. Indeed, All\u0101h forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
  source: 'Az-Zumar 39:53',
  edition: 'en-sahih-international',
};

const _41_30 = {
  arabic: '\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0642\u064E\u0627\u0644\u064F\u0648\u0627 \u0631\u064E\u0628\u0651\u064F\u0646\u064E\u0627 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u062B\u064F\u0645\u0651\u064E \u0627\u0633\u0652\u062A\u064E\u0642\u064E\u0627\u0645\u064F\u0648\u0627 \u062A\u064E\u062A\u064E\u0646\u064E\u0632\u0651\u064E\u0644\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650\u0645\u064F \u0627\u0644\u0652\u0645\u064E\u0644\u064E\u0627\u0626\u0650\u0643\u064E\u0629\u064F \u0623\u064E\u0644\u0651\u064E\u0627 \u062A\u064E\u062E\u064E\u0627\u0641\u064F\u0648\u0627 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u062D\u0652\u0632\u064E\u0646\u064F\u0648\u0627 \u0648\u064E\u0623\u064E\u0628\u0652\u0634\u0650\u0631\u064F\u0648\u0627 \u0628\u0650\u0627\u0644\u0652\u062C\u064E\u0646\u0651\u064E\u0629\u0650 \u0627\u0644\u0651\u064E\u062A\u0650\u064A \u0643\u064F\u0646\u062A\u064F\u0645\u0652 \u062A\u064F\u0648\u0639\u064E\u062F\u064F\u0648\u0646\u064E',
  transliteration: 'Innal-ladh\u012Bna q\u0101l\u016B rabbunal-l\u0101hu thummastaq\u0101m\u016B tatanazzalu \u02BFalayhimul-mal\u0101\u02BFikatu all\u0101 takh\u0101f\u016B wa l\u0101 ta\u1E25zan\u016B wa abshir\u016B bil-jannatil-lat\u012B kuntum t\u016B\u02BFad\u016Bn',
  translation: 'Indeed, those who have said, "Our Lord is All\u0101h" and then remained on a right course \u2014 the angels will descend upon them, [saying], "Do not fear and do not grieve but receive good tidings of Paradise, which you were promised.',
  source: 'Fu\u1E63\u1E63ilat 41:30',
  edition: 'en-sahih-international',
};

const _48_4 = {
  arabic: '\u0647\u064F\u0648\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0646\u0632\u064E\u0644\u064E \u0627\u0644\u0633\u0651\u064E\u0643\u0650\u064A\u0646\u064E\u0629\u064E \u0641\u0650\u064A \u0642\u064F\u0644\u064F\u0648\u0628\u0650 \u0627\u0644\u0652\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u0650\u064A\u0646\u064E \u0644\u0650\u064A\u064E\u0632\u0652\u062F\u064E\u0627\u062F\u064F\u0648\u0627 \u0625\u0650\u064A\u0645\u064E\u0627\u0646\u064B\u0627 \u0645\u0651\u064E\u0639\u064E \u0625\u0650\u064A\u0645\u064E\u0627\u0646\u0650\u0647\u0650\u0645\u0652 \u06D7 \u0648\u064E\u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u062C\u064F\u0646\u064F\u0648\u062F\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u064E\u0627\u0648\u064E\u0627\u062A\u0650 \u0648\u064E\u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u06DA \u0648\u064E\u0643\u064E\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0644\u0650\u064A\u0645\u064B\u0627 \u062D\u064E\u0643\u0650\u064A\u0645\u064B\u0627',
  transliteration: 'Huwal-ladh\u012B anzalas-sak\u012Bnata f\u012B qul\u016Bbil-mu\u02BFmin\u012Bna liyazd\u0101d\u016B \u012Bm\u0101nan ma\u02BFa \u012Bm\u0101nihim. Wa lill\u0101hi jun\u016Bdus-sam\u0101w\u0101ti wal-ar\u1E0D. Wa k\u0101nal-l\u0101hu \u02BFal\u012Bman \u1E25ak\u012Bm\u0101',
  translation: 'It is He who sent down tranquility into the hearts of the believers that they would increase in faith along with their [present] faith. And to All\u0101h belong the soldiers of the heavens and the earth, and ever is All\u0101h Knowing and Wise.',
  source: 'Al-Fat\u1E25 48:4',
  edition: 'en-sahih-international',
};

const _51_56 = {
  arabic: '\u0648\u064E\u0645\u064E\u0627 \u062E\u064E\u0644\u064E\u0642\u0652\u062A\u064F \u0627\u0644\u0652\u062C\u0650\u0646\u0651\u064E \u0648\u064E\u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0644\u0650\u064A\u064E\u0639\u0652\u0628\u064F\u062F\u064F\u0648\u0646\u0650',
  transliteration: 'Wa m\u0101 khalaqtul-jinna wal-insa ill\u0101 liya\u02BFbud\u016Bn',
  translation: 'And I did not create the jinn and mankind except to worship Me.',
  source: 'Adh-Dh\u0101riy\u0101t 51:56',
  edition: 'en-sahih-international',
};

const _53_39 = {
  arabic: '\u0648\u064E\u0623\u064E\u0646 \u0644\u0651\u064E\u064A\u0652\u0633\u064E \u0644\u0650\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u0650 \u0625\u0650\u0644\u0651\u064E\u0627 \u0645\u064E\u0627 \u0633\u064E\u0639\u064E\u0649\u0670',
  transliteration: 'Wa an laysa lil-ins\u0101ni ill\u0101 m\u0101 sa\u02BF\u0101',
  translation: 'And that there is not for man except that [good] for which he strives.',
  source: 'An-Najm 53:39',
  edition: 'en-sahih-international',
};

const _57_23 = {
  arabic: '\u0644\u0651\u0650\u0643\u064E\u064A\u0652\u0644\u064E\u0627 \u062A\u064E\u0623\u0652\u0633\u064E\u0648\u0652\u0627 \u0639\u064E\u0644\u064E\u0649\u0670 \u0645\u064E\u0627 \u0641\u064E\u0627\u062A\u064E\u0643\u064F\u0645\u0652 \u0648\u064E\u0644\u064E\u0627 \u062A\u064E\u0641\u0652\u0631\u064E\u062D\u064F\u0648\u0627 \u0628\u0650\u0645\u064E\u0627 \u0622\u062A\u064E\u0627\u0643\u064F\u0645\u0652 \u06D7 \u0648\u064E\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0627 \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0643\u064F\u0644\u0651\u064E \u0645\u064F\u062E\u0652\u062A\u064E\u0627\u0644\u064D \u0641\u064E\u062E\u064F\u0648\u0631\u064D',
  transliteration: 'Likayl\u0101 ta\u02BFsaw \u02BFal\u0101 m\u0101 f\u0101takum wa l\u0101 tafra\u1E25\u016B bim\u0101 \u0101t\u0101kum. Wal-l\u0101hu l\u0101 yu\u1E25ibbu kulla mukht\u0101lin fakh\u016Br',
  translation: 'In order that you not despair over what has eluded you and not exult [in pride] over what He has given you. And All\u0101h does not like everyone self-deluded and boastful.',
  source: 'Al-\u1E24ad\u012Bd 57:23',
  edition: 'en-sahih-international',
};

const _62_10 = {
  arabic: '\u0641\u064E\u0625\u0650\u0630\u064E\u0627 \u0642\u064F\u0636\u0650\u064A\u064E\u062A\u0650 \u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0627\u0629\u064F \u0641\u064E\u0627\u0646\u062A\u064E\u0634\u0650\u0631\u064F\u0648\u0627 \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u0648\u064E\u0627\u0628\u0652\u062A\u064E\u063A\u064F\u0648\u0627 \u0645\u0650\u0646 \u0641\u064E\u0636\u0652\u0644\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0627\u0630\u0652\u0643\u064F\u0631\u064F\u0648\u0627 \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0643\u064E\u062B\u0650\u064A\u0631\u064B\u0627 \u0644\u0651\u064E\u0639\u064E\u0644\u0651\u064E\u0643\u064F\u0645\u0652 \u062A\u064F\u0641\u0652\u0644\u0650\u062D\u064F\u0648\u0646\u064E',
  transliteration: 'Fa idh\u0101 qu\u1E0Diyati\u1E63-\u1E63al\u0101tu fantasir\u016B fil-ar\u1E0Di wabtagm\u016B min fa\u1E0Dlil-l\u0101hi wadhkurul-l\u0101ha kath\u012Bran la\u02BFallakum tufli\u1E25\u016Bn',
  translation: 'And when the prayer has been concluded, disperse within the land and seek from the bounty of All\u0101h, and remember All\u0101h often that you may succeed.',
  source: 'Al-Jumu\u02BFah 62:10',
  edition: 'en-sahih-international',
};

const _64_11 = {
  arabic: '\u0645\u064E\u0627 \u0623\u064E\u0635\u064E\u0627\u0628\u064E \u0645\u0650\u0646 \u0645\u0651\u064F\u0635\u0650\u064A\u0628\u064E\u0629\u064D \u0625\u0650\u0644\u0651\u064E\u0627 \u0628\u0650\u0625\u0650\u0630\u0652\u0646\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u06D7 \u0648\u064E\u0645\u064E\u0646 \u064A\u064F\u0624\u0652\u0645\u0650\u0646 \u0628\u0650\u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u064A\u064E\u0647\u0652\u062F\u0650 \u0642\u064E\u0644\u0652\u0628\u064E\u0647\u064F \u06DA \u0648\u064E\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0628\u0650\u0643\u064F\u0644\u0651\u0650 \u0634\u064E\u064A\u0652\u0621\u064D \u0639\u064E\u0644\u0650\u064A\u0645\u064C',
  transliteration: 'M\u0101 a\u1E63\u0101ba min mu\u1E63\u012Bbatin ill\u0101 bi idhnil-l\u0101h. Wa man yu\u02BFmin bill\u0101hi yahdi qalbah. Wal-l\u0101hu bi kulli shay\u02BFin \u02BFal\u012Bm',
  translation: 'No disaster strikes except by permission of All\u0101h. And whoever believes in All\u0101h \u2014 He will guide his heart. And All\u0101h is Knowing of all things.',
  source: 'At-Tagh\u0101bun 64:11',
  edition: 'en-sahih-international',
};

const _65_3 = {
  arabic: '\u0648\u064E\u064A\u064E\u0631\u0652\u0632\u064F\u0642\u0652\u0647\u064F \u0645\u0650\u0646\u0652 \u062D\u064E\u064A\u0652\u062B\u064F \u0644\u064E\u0627 \u064A\u064E\u062D\u0652\u062A\u064E\u0633\u0650\u0628\u064F \u06DA \u0648\u064E\u0645\u064E\u0646 \u064A\u064E\u062A\u064E\u0648\u064E\u0643\u0651\u064E\u0644\u0652 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0641\u064E\u0647\u064F\u0648\u064E \u062D\u064E\u0633\u0652\u0628\u064F\u0647\u064F \u06DA \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0628\u064E\u0627\u0644\u0650\u063A\u064F \u0623\u064E\u0645\u0652\u0631\u0650\u0647\u0650 \u06DA \u0642\u064E\u062F\u0652 \u062C\u064E\u0639\u064E\u0644\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u0650\u0643\u064F\u0644\u0651\u0650 \u0634\u064E\u064A\u0652\u0621\u064D \u0642\u064E\u062F\u0652\u0631\u064B\u0627',
  transliteration: 'Wa yarzuqhu min \u1E25aythu l\u0101 ya\u1E25tasib. Wa man yatawakkal \u02BFalal-l\u0101hi fahuwa \u1E25asbuh. Innal-l\u0101ha b\u0101lighu amrih. Qad ja\u02BFalal-l\u0101hu li kulli shay\u02BFin qadr\u0101',
  translation: 'And will provide for him from where he does not expect. And whoever relies upon All\u0101h \u2014 then He is sufficient for him. Indeed, All\u0101h will accomplish His purpose. All\u0101h has already set for everything a [decreed] extent.',
  source: 'A\u1E6D-\u1E6Cal\u0101q 65:3',
  edition: 'en-sahih-international',
};

const _67_2 = {
  arabic: '\u0627\u0644\u0651\u064E\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E \u0627\u0644\u0652\u0645\u064E\u0648\u0652\u062A\u064E \u0648\u064E\u0627\u0644\u0652\u062D\u064E\u064A\u064E\u0627\u0629\u064E \u0644\u0650\u064A\u064E\u0628\u0652\u0644\u064F\u0648\u064E\u0643\u064F\u0645\u0652 \u0623\u064E\u064A\u0651\u064F\u0643\u064F\u0645\u0652 \u0623\u064E\u062D\u0652\u0633\u064E\u0646\u064F \u0639\u064E\u0645\u064E\u0644\u064B\u0627 \u06DA \u0648\u064E\u0647\u064F\u0648\u064E \u0627\u0644\u0652\u0639\u064E\u0632\u0650\u064A\u0632\u064F \u0627\u0644\u0652\u063A\u064E\u0641\u064F\u0648\u0631\u064F',
  transliteration: 'Alladh\u012B khalaqal-mawta wal-\u1E25ay\u0101ta liyabluwakum ayyukum a\u1E25sanu \u02BFamal\u0101. Wa huwal-\u02BFaz\u012Bzul-ghaf\u016Br',
  translation: '[He] who created death and life to test you [as to] which of you is best in deed \u2014 and He is the Exalted in Might, the Forgiving.',
  source: 'Al-Mulk 67:2',
  edition: 'en-sahih-international',
};

const _73_9 = {
  arabic: '\u0631\u0651\u064E\u0628\u0651\u064F \u0627\u0644\u0652\u0645\u064E\u0634\u0652\u0631\u0650\u0642\u0650 \u0648\u064E\u0627\u0644\u0652\u0645\u064E\u063A\u0652\u0631\u0650\u0628\u0650 \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0647\u064F\u0648\u064E \u0641\u064E\u0627\u062A\u0651\u064E\u062E\u0650\u0630\u0652\u0647\u064F \u0648\u064E\u0643\u0650\u064A\u0644\u064B\u0627',
  transliteration: 'Rabbul-mashriqi wal-maghribi l\u0101 il\u0101ha ill\u0101 huwa fattakhidhhu wak\u012Bl\u0101',
  translation: '[He is] the Lord of the East and the West; there is no deity except Him, so take Him as Disposer of [your] affairs.',
  source: 'Al-Muzzammil 73:9',
  edition: 'en-sahih-international',
};

const _94_5_6 = {
  arabic: '\u0641\u064E\u0625\u0650\u0646\u0651\u064E \u0645\u064E\u0639\u064E \u0627\u0644\u0652\u0639\u064F\u0633\u0652\u0631\u0650 \u064A\u064F\u0633\u0652\u0631\u064B\u0627 \u00B7 \u0625\u0650\u0646\u0651\u064E \u0645\u064E\u0639\u064E \u0627\u0644\u0652\u0639\u064F\u0633\u0652\u0631\u0650 \u064A\u064F\u0633\u0652\u0631\u064B\u0627',
  transliteration: 'Fa inna ma\u02BFal-\u02BFusri yusr\u0101. Inna ma\u02BFal-\u02BFusri yusr\u0101',
  translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
  source: 'Ash-Shar\u1E25 94:5\u20136',
  edition: 'en-sahih-international',
};

const _98_5 = {
  arabic: '\u0648\u064E\u0645\u064E\u0627 \u0623\u064F\u0645\u0650\u0631\u064F\u0648\u0627 \u0625\u0650\u0644\u0651\u064E\u0627 \u0644\u0650\u064A\u064E\u0639\u0652\u0628\u064F\u062F\u064F\u0648\u0627 \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0645\u064F\u062E\u0652\u0644\u0650\u0635\u0650\u064A\u0646\u064E \u0644\u064E\u0647\u064F \u0627\u0644\u062F\u0651\u0650\u064A\u0646\u064E \u062D\u064F\u0646\u064E\u0641\u064E\u0627\u0621\u064E \u0648\u064E\u064A\u064F\u0642\u0650\u064A\u0645\u064F\u0648\u0627 \u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0627\u0629\u064E \u0648\u064E\u064A\u064F\u0624\u0652\u062A\u064F\u0648\u0627 \u0627\u0644\u0632\u0651\u064E\u0643\u064E\u0627\u0629\u064E \u06DA \u0648\u064E\u0630\u064E\u0670\u0644\u0650\u0643\u064E \u062F\u0650\u064A\u0646\u064F \u0627\u0644\u0652\u0642\u064E\u064A\u0651\u0650\u0645\u064E\u0629\u0650',
  transliteration: 'Wa m\u0101 umir\u016B ill\u0101 liya\u02BFbudl-l\u0101ha mukhli\u1E63\u012Bna lahud-d\u012Bna \u1E25unaf\u0101\u02BFa wa yuq\u012Bmu\u1E63-\u1E63al\u0101ta wa yu\u02BFtuz-zak\u0101h. Wa dh\u0101lika d\u012Bnul-qayyimah',
  translation: 'And they were not commanded except to worship All\u0101h, [being] sincere to Him in religion, inclining to truth, and to establish prayer and to give zak\u0101h. And that is the correct religion.',
  source: 'Al-Bayyinah 98:5',
  edition: 'en-sahih-international',
};

const _103_1_3 = {
  arabic: '\u0648\u064E\u0627\u0644\u0652\u0639\u064E\u0635\u0652\u0631\u0650 \u00B7 \u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064E \u0644\u064E\u0641\u0650\u064A \u062E\u064F\u0633\u0652\u0631\u064D \u00B7 \u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0622\u0645\u064E\u0646\u064F\u0648\u0627 \u0648\u064E\u0639\u064E\u0645\u0650\u0644\u064F\u0648\u0627 \u0627\u0644\u0635\u0651\u064E\u0627\u0644\u0650\u062D\u064E\u0627\u062A\u0650 \u0648\u064E\u062A\u064E\u0648\u064E\u0627\u0635\u064E\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0652\u062D\u064E\u0642\u0651\u0650 \u0648\u064E\u062A\u064E\u0648\u064E\u0627\u0635\u064E\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0635\u0651\u064E\u0628\u0652\u0631\u0650',
  transliteration: 'Wal-\u02BFa\u1E63r. Innal-ins\u0101na laf\u012B khusr. Illal-ladh\u012Bna \u0101man\u016B wa \u02BFamilu\u1E63-\u1E63\u0101li\u1E25\u0101ti wa taw\u0101\u1E63aw bil-\u1E25aqqi wa taw\u0101\u1E63aw bi\u1E63-\u1E63abr',
  translation: 'By time, indeed, mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
  source: 'Al-\u02BFA\u1E63r 103:1\u20133',
  edition: 'en-sahih-international',
};


// ═══════════════════════════════════════════════════════════
// READINESS AYAT MATRIX — 64 entries (63 non-null + 111111)
// Key: M1 M2 M3 W1 W2 W3  (1=YES, 0=NOT YET)
// ═══════════════════════════════════════════════════════════

export const READINESS_AYAT_WORK = {

  // ─── ALL YES — proceed ───
  '111111': null,

  // ═══ SINGLE-ZERO ANCHORS (6) ═══
  // Each addresses the single unmet condition

  '011111': { ..._21_37,
    framing: 'You were shaped with urgency in you — but this work asks for your steadiness first.' },

  '101111': { ..._98_5,
    framing: 'Return the intention to its origin — not obligation, but sincere offering.' },

  '110111': { ..._2_195,
    framing: 'You are being invited to give this work your best — Allah loves those who do.' },

  '111011': { ..._65_3,
    framing: 'Your craft is ready. Now release the weight of the outcome to the One who provides.' },

  '111101': { ..._7_205,
    framing: 'Before you begin, return to quiet presence — remember your Lord and do not be heedless.' },

  '111110': { ..._9_51,
    framing: 'Nothing will reach you except what He has written. Let that knowing steady your hands.' },

  // ═══ TWO ZEROS — SAME ATTRIBUTE (6) ═══

  '001111': { ..._16_90,
    framing: 'Allah commands both justice and ihsan — let this call recalibrate your approach to the work.' },

  '010111': { ..._103_1_3,
    framing: 'Time is passing. The exception from loss requires both righteous deeds and mutual counsel in truth.' },

  '100111': { ..._39_11,
    framing: 'The work ahead asks for more than completion — it asks for sincerity in how you worship through it.' },

  '111001': { ..._33_3,
    framing: 'Allah is sufficient as your Disposer of affairs — lean on that before you proceed.' },

  '111010': { ..._57_23,
    framing: 'Do not grieve what has escaped you or cling to what is given — both are from Him.' },

  '111100': { ..._64_11,
    framing: 'Whatever reaches you is by His permission. Believe, and He will guide your heart through it.' },

  // ═══ TWO ZEROS — CROSS ATTRIBUTE (9) ═══

  '011011': { ..._94_5_6,
    framing: 'You are carrying a heavy moment. Remember: with every hardship, ease is already woven in.' },

  '011101': { ..._62_10,
    framing: 'Go forth with remembrance — seek from Allah\'s bounty and let that seeking be your worship.' },

  '011110': { ..._18_24,
    framing: 'Say "if Allah wills" — and remember your Lord when you forget. He may guide you closer still.' },

  '101011': { ..._29_2,
    framing: 'This difficulty is not a sign of failure — it is the nature of being tested in what you profess.' },

  '101101': { ..._51_56,
    framing: 'You were not created for productivity alone — you were created for worship. Let that reframe the work.' },

  '101110': { ..._31_22,
    framing: 'Whoever turns their face to Allah while doing good has grasped the most trustworthy handhold.' },

  '110011': { ..._3_139,
    framing: 'Do not weaken and do not grieve — you are higher than this moment if you hold your belief.' },

  '110101': { ..._29_69,
    framing: 'Those who strive for Allah\'s sake will be guided to His ways. Begin the striving; the path opens.' },

  '110110': { ..._53_39,
    framing: 'There is not for you except that for which you strive. The effort itself is the offering.' },

  // ═══ THREE ZEROS — 2 MUHSIN + 1 WAKIL (9) ═══

  '001011': { ..._48_4,
    framing: 'He sends tranquility into the hearts of the believers — ask for yours before you begin.' },

  '001101': { ..._6_162,
    framing: 'Your prayer, your sacrifice, your living and dying — let them belong to Allah before you start.' },

  '001110': { ..._28_77,
    framing: 'Seek the Hereafter through what Allah gave you, and do good as He has been good to you.' },

  '010011': { ..._41_30,
    framing: 'Say "my Lord is Allah" and hold the line — the angels say: do not fear, do not grieve.' },

  '010101': { ..._20_130,
    framing: 'Be patient. Exalt your Lord before sunrise and sunset — let the rhythm of remembrance steady you.' },

  '010110': { ..._23_60,
    framing: 'Even the righteous give what they give while their hearts tremble. That trembling is not weakness.' },

  '100011': { ..._10_62,
    framing: 'The allies of Allah carry no fear and no grief. Draw near to that, even from where you are.' },

  '100101': { ..._73_9,
    framing: 'He is Lord of the East and West. There is no god but Him — so take Him as your Wakil.' },

  '100110': { ..._39_53,
    framing: 'Do not despair of Allah\'s mercy — He forgives all. Bring what you have, even if it feels small.' },

  // ═══ THREE ZEROS — 1 MUHSIN + 2 WAKIL (9) ═══

  '011001': { ..._48_4,
    framing: 'Much is unsettled right now. But He is the One who sends sakinah — let it reach you.' },

  '011010': { ..._2_286,
    framing: 'You are not burdened beyond what you can carry. Allah knows your capacity — trust that.' },

  '011100': { ..._73_9,
    framing: 'The One who holds East and West holds your work too. Take Him as your Disposer of affairs.' },

  '101001': { ..._6_162,
    framing: 'Before the work, recall the dedication: my life is for Allah. Let that truth steady everything else.' },

  '101010': { ..._2_286,
    framing: 'He has not placed on you more than you can bear. What you carry right now is within your reach.' },

  '101100': { ..._39_53,
    framing: 'You are far from ready, and that is known. But do not despair — His mercy covers all of this.' },

  '110001': { ..._41_30,
    framing: 'Remain on the straight course even now. Those who hold steady receive the angels\' assurance.' },

  '110010': { ..._10_62,
    framing: 'Even now, the promise holds: Allah\'s close ones are free from fear. You can return to that closeness.' },

  '110100': { ..._28_77,
    framing: 'Do not lose your share of this world — but let ihsan, not anxiety, shape how you take it.' },

  // ═══ FOUR ZEROS — ALL MUHSIN + 1 WAKIL (3) ═══

  '000011': { ..._48_4,
    framing: 'Very little is aligned, but tranquility is not earned — it is sent down. Ask for it.' },

  '000101': { ..._20_130,
    framing: 'Much is unaligned, but patience and praise are still yours. Exalt your Lord and let that be enough.' },

  '000110': { ..._23_60,
    framing: 'Your heart is heavy. Know that even those closest to Allah give while their hearts are reverent.' },

  // ═══ FOUR ZEROS — 2M + 2W (9) ═══

  '001001': { ..._6_162,
    framing: 'Much is unsteady, but the anchor remains: your living and striving are for the Lord of all worlds.' },

  '001010': { ..._2_286,
    framing: 'Allah does not charge a soul beyond its capacity. Even this weight is not beyond yours.' },

  '001100': { ..._73_9,
    framing: 'You cannot carry all of this alone. He is the Lord of every horizon — take Him as your trustee.' },

  '010001': { ..._41_30,
    framing: 'The path forward begins with one declaration: my Lord is Allah. Then steadfastness. Then peace.' },

  '010010': { ..._10_62,
    framing: 'There is a station where fear lifts and grief dissolves. Begin walking toward it — Allah sees you.' },

  '010100': { ..._28_77,
    framing: 'Seek what is lasting through what you have been given. Do good as Allah has done good to you.' },

  '100001': { ..._39_53,
    framing: 'This is a moment of struggle across many fronts. Do not despair. His mercy is greater than all of it.' },

  '100010': { ..._57_23,
    framing: 'You have not lost what matters. Release the grief of what escaped and the grip on what remains.' },

  '100100': { ..._20_130,
    framing: 'The path back runs through patience and the praise of your Lord. Begin there, morning and evening.' },

  // ═══ FOUR ZEROS — 1M + ALL WAKIL (3) ═══

  '011000': { ..._33_3,
    framing: 'You are not ready across much of this right now. But Allah is still Al-Wakil — rely on Him.' },

  '101000': { ..._33_3,
    framing: 'There is much to settle. Begin by placing what you cannot carry in the hands of your Trustee.' },

  '110000': { ..._3_159,
    framing: 'When you find your resolve, even partially, place it in Allah\'s hands and begin from there.' },

  // ═══ CORNERS (non-null) ═══

  '111000': { ..._3_159,
    framing: 'Your intention and craft are aligned. Now trust — when you have resolved, rely upon Allah.' },

  '000111': { ..._67_2,
    framing: 'You are at peace with the outcome. Now the test is: which of you is best in deed?' },

  // ═══ FIVE ZEROS (6) ═══

  '100000': { ..._13_28,
    framing: 'You are not rushing — that is enough for now. Let remembrance settle what remains.' },

  '010000': { ..._13_28,
    framing: 'Your sincerity is intact. Let remembrance gather the rest of you.' },

  '001000': { ..._94_5_6,
    framing: 'Your care for quality is still here. With this hardship will come ease — hold onto that.' },

  '000100': { ..._57_23,
    framing: 'You trust Him — that is real. Do not despair over what else has eluded you right now.' },

  '000010': { ..._29_69,
    framing: 'Your presence is the one thing alive right now. Strive from there — Allah guides those who try.' },

  '000001': { ..._94_5_6,
    framing: 'You have released the grip on the outcome. That is a beginning. With hardship comes ease.' },

  // ═══ ALL NOT YET (1) ═══

  '000000': { ..._13_28,
    framing: 'Your heart knows the way back. Rest it in remembrance before you begin.' },

};


/**
 * Look up the readiness ayah for a given binary key.
 * @param {string} key - 6-character binary string (e.g., '110100')
 * @returns {object|null} Ayah object or null if all-yes / unknown key
 */
export function lookupReadinessAyah(key) {
  return READINESS_AYAT_WORK[key] || null;
}
