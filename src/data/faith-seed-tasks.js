// Seed tasks for Faith pillar submodules.
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const FAITH_SEED_TASKS = {
  // ── SHAHADA ──
  faith_shahada_core: [
    { title: 'Study the meaning and conditions of La ilaha illAllah', priority: 'urgent', tags: ['aqidah'] },
    { title: 'Learn the seven conditions of the Shahada (Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Muhabbah)', priority: 'high', tags: ['aqidah'] },
    { title: 'Study the six pillars of Iman', priority: 'high', tags: ['aqidah'] },
    { title: 'Identify and eliminate any practices that contradict Tawhid', priority: 'urgent', tags: ['aqidah', 'tawhid'] },
    { title: 'Memorise the hadith of Jibril (Sahih Muslim 8) on Islam, Iman, and Ihsan', priority: 'medium', tags: ['hadith', 'aqidah'] },
  ],
  faith_shahada_growth: [
    { title: 'Read a foundational aqidah text (e.g., Al-Aqidah al-Tahawiyyah)', priority: 'high', tags: ['study', 'aqidah'] },
    { title: 'Study the nullifiers of Islam (Nawaqid al-Islam)', priority: 'medium', tags: ['aqidah'] },
    { title: 'Understand the difference between major and minor shirk', priority: 'medium', tags: ['tawhid'] },
    { title: 'Learn about the categories of Tawhid (Rububiyyah, Uluhiyyah, Asma wa Sifat)', priority: 'high', tags: ['tawhid'] },
  ],
  faith_shahada_excellence: [
    { title: 'Teach the Shahada and its conditions to a family member or student', priority: 'medium', tags: ['dawah'] },
    { title: 'Study the relationship between Shahada and daily actions (amal)', priority: 'medium', tags: ['aqidah'] },
    { title: 'Reflect on how Tawhid governs every decision — write a personal reflection', priority: 'low', tags: ['reflection'] },
  ],

  // ── SALAH ──
  faith_salah_core: [
    { title: 'Establish all five daily prayers on time consistently', priority: 'urgent', tags: ['salah', 'fard'] },
    { title: 'Learn the correct method of wudu with all fard and sunnah acts', priority: 'high', tags: ['salah', 'wudu'] },
    { title: 'Memorise the adhkar recited in salah (Subhanaka, Tashahhud, Salawat)', priority: 'high', tags: ['salah', 'memorisation'] },
    { title: 'Pray in congregation (jama\'ah) whenever possible', priority: 'high', tags: ['salah', 'jamaah'] },
    { title: 'Learn the conditions that invalidate salah', priority: 'medium', tags: ['salah', 'fiqh'] },
  ],
  faith_salah_growth: [
    { title: 'Establish the 12 regular Sunnah prayers (Rawatib)', priority: 'high', tags: ['salah', 'sunnah'] },
    { title: 'Learn the meanings of Surah Al-Fatihah and what you recite in salah', priority: 'high', tags: ['salah', 'quran'] },
    { title: 'Pray Tahajjud at least once a week', priority: 'medium', tags: ['salah', 'qiyam'] },
    { title: 'Study the inner dimensions of salah (khushu\u02bf)', priority: 'medium', tags: ['salah', 'spirituality'] },
  ],
  faith_salah_excellence: [
    { title: 'Pray Duha prayer regularly', priority: 'medium', tags: ['salah', 'sunnah'] },
    { title: 'Master the prostration of recitation (Sujud al-Tilawah)', priority: 'low', tags: ['salah', 'fiqh'] },
    { title: 'Develop a consistent Qiyam al-Layl routine', priority: 'medium', tags: ['salah', 'qiyam'] },
  ],

  // ── ZAKAH ──
  faith_zakah_core: [
    { title: 'Calculate your nisab and determine if zakah is obligatory on you', priority: 'urgent', tags: ['zakah', 'fard'] },
    { title: 'Learn which categories of wealth are zakatable (gold, silver, cash, trade goods, livestock)', priority: 'high', tags: ['zakah', 'fiqh'] },
    { title: 'Identify the eight eligible recipients of zakah (Surah At-Tawbah 9:60)', priority: 'high', tags: ['zakah', 'fiqh'] },
    { title: 'Pay any outstanding zakah immediately', priority: 'urgent', tags: ['zakah', 'fard'] },
  ],
  faith_zakah_growth: [
    { title: 'Set up a zakah calendar with annual calculation date', priority: 'high', tags: ['zakah', 'planning'] },
    { title: 'Research local and international zakah-eligible organisations', priority: 'medium', tags: ['zakah', 'community'] },
    { title: 'Learn the rulings of Zakah al-Fitr and its timing', priority: 'medium', tags: ['zakah', 'fiqh'] },
    { title: 'Study the spiritual purpose of zakah — purification and growth', priority: 'medium', tags: ['zakah', 'spirituality'] },
  ],
  faith_zakah_excellence: [
    { title: 'Establish a regular sadaqah habit beyond obligatory zakah', priority: 'medium', tags: ['sadaqah'] },
    { title: 'Explore setting up a waqf (endowment) for ongoing benefit', priority: 'low', tags: ['waqf', 'sadaqah-jariyah'] },
    { title: 'Mentor someone on zakah calculation and distribution', priority: 'low', tags: ['zakah', 'dawah'] },
  ],

  // ── SAWM ──
  faith_sawm_core: [
    { title: 'Learn the fard requirements of Ramadan fasting (intention, abstaining, timing)', priority: 'urgent', tags: ['sawm', 'fard'] },
    { title: 'Understand the conditions that break the fast vs. those that do not', priority: 'high', tags: ['sawm', 'fiqh'] },
    { title: 'Learn the rules for making up (qada) missed fasts', priority: 'high', tags: ['sawm', 'fiqh'] },
    { title: 'Make up any missed Ramadan fasts from previous years', priority: 'urgent', tags: ['sawm', 'qada'] },
  ],
  faith_sawm_growth: [
    { title: 'Fast the voluntary Mondays and Thursdays regularly', priority: 'medium', tags: ['sawm', 'sunnah'] },
    { title: 'Fast the three white days (13th, 14th, 15th of each lunar month)', priority: 'medium', tags: ['sawm', 'sunnah'] },
    { title: 'Study the inner dimensions of fasting — taqwa, patience, gratitude', priority: 'medium', tags: ['sawm', 'spirituality'] },
    { title: 'Learn the Sunnah of iftar and suhoor', priority: 'low', tags: ['sawm', 'sunnah'] },
  ],
  faith_sawm_excellence: [
    { title: 'Fast the day of Arafah (9th Dhul Hijjah) and Ashura (10th Muharram)', priority: 'medium', tags: ['sawm', 'sunnah'] },
    { title: 'Fast the six days of Shawwal after Ramadan', priority: 'medium', tags: ['sawm', 'sunnah'] },
    { title: 'Organise a community iftar for neighbours and those in need', priority: 'low', tags: ['sawm', 'community'] },
  ],

  // ── HAJJ ──
  faith_hajj_core: [
    { title: 'Learn the conditions that make Hajj obligatory (Islam, sanity, maturity, ability, provision)', priority: 'high', tags: ['hajj', 'fard'] },
    { title: 'Study the pillars (arkan) and obligatory acts (wajibat) of Hajj', priority: 'high', tags: ['hajj', 'fiqh'] },
    { title: 'Learn the rites of Umrah and their sequence', priority: 'high', tags: ['umrah', 'fiqh'] },
    { title: 'Begin saving for Hajj if financially able', priority: 'medium', tags: ['hajj', 'planning'] },
  ],
  faith_hajj_growth: [
    { title: 'Study the spiritual meanings behind each Hajj rite (Tawaf, Sa\'i, Arafah, stoning)', priority: 'medium', tags: ['hajj', 'spirituality'] },
    { title: 'Learn the history of Ibrahim (AS) and the founding of the Ka\'bah', priority: 'medium', tags: ['hajj', 'seerah'] },
    { title: 'Memorise the Talbiyah and key du\'as of Hajj', priority: 'medium', tags: ['hajj', 'memorisation'] },
    { title: 'Research accredited Hajj operators and packages', priority: 'low', tags: ['hajj', 'planning'] },
  ],
  faith_hajj_excellence: [
    { title: 'Perform Umrah as preparation for the full Hajj experience', priority: 'medium', tags: ['umrah'] },
    { title: 'Sponsor someone for Hajj who cannot afford it', priority: 'low', tags: ['hajj', 'sadaqah'] },
    { title: 'Document and share your Hajj preparation journey for others', priority: 'low', tags: ['hajj', 'dawah'] },
  ],
};
