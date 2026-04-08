// Five Pillars of Islam — informational content for the 5 Pillars page.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation, editions: ar-simple-clean, en-abdel-haleem).

export const FIVE_PILLARS = [
  {
    id: 'shahada',
    name: 'Shahada',
    arabic: '\u0627\u0644\u0634\u064E\u0651\u0647\u064E\u0627\u062F\u064E\u0629',
    meaning: 'Declaration of Faith',
    order: 1,
    ayahKey: '3:18',
    ayahArabic:
      '\u0634\u064E\u0647\u0650\u062F\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u064F \u0623\u064E\u0646\u064E\u0651\u0647\u064F \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0647\u064F\u0648\u064E \u0648\u064E\u0627\u0644\u0652\u0645\u064E\u0644\u064E\u0627\u0626\u0650\u0643\u064E\u0629\u064F \u0648\u064E\u0623\u064F\u0648\u0644\u064F\u0648 \u0627\u0644\u0652\u0639\u0650\u0644\u0652\u0645\u0650 \u0642\u064E\u0627\u0626\u0650\u0645\u064B\u0627 \u0628\u0650\u0627\u0644\u0652\u0642\u0650\u0633\u0652\u0637\u0650 \u06DA \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u0639\u064E\u0632\u0650\u064A\u0632\u064F \u0627\u0644\u0652\u062D\u064E\u0643\u0650\u064A\u0645\u064F',
    ayahTranslation:
      'God bears witness that there is no god but Him, as do the angels and those who have knowledge. He upholds justice. There is no god but Him, the Almighty, the All Wise.',
    description:
      'The sincere declaration that there is no deity worthy of worship except Allah, and that Muhammad \uFDFA is His final messenger. It is the gateway to Islam and the foundation upon which all other pillars rest.',
    conditions: [
      'Knowledge (\u0639\u0650\u0644\u0652\u0645) \u2014 understanding what it means',
      'Certainty (\u064A\u064E\u0642\u0650\u064A\u0646) \u2014 freedom from doubt',
      'Sincerity (\u0625\u0650\u062E\u0652\u0644\u064E\u0627\u0635) \u2014 purely for Allah',
      'Truthfulness (\u0635\u0650\u062F\u0652\u0642) \u2014 meaning what you say',
      'Love (\u0645\u064E\u062D\u064E\u0628\u064E\u0651\u0629) \u2014 loving what it entails',
      'Submission (\u0627\u0646\u0652\u0642\u0650\u064A\u064E\u0627\u062F) \u2014 acting upon it',
      'Acceptance (\u0642\u064E\u0628\u064F\u0648\u0644) \u2014 without rejection',
    ],
    virtues: [
      'Foundation of all other pillars of Islam',
      'Establishes identity, purpose, and monotheism (Tawhid)',
      'Differentiates between faith and disbelief',
      'The key to entering Paradise',
    ],
  },
  {
    id: 'salah',
    name: 'Salah',
    arabic: '\u0627\u0644\u0635\u064E\u0651\u0644\u064E\u0627\u0629',
    meaning: 'Prayer',
    order: 2,
    ayahKey: '2:43',
    ayahArabic:
      '\u0648\u064E\u0623\u064E\u0642\u0650\u064A\u0645\u064F\u0648\u0627 \u0627\u0644\u0635\u064E\u0651\u0644\u064E\u0627\u0629\u064E \u0648\u064E\u0622\u062A\u064F\u0648\u0627 \u0627\u0644\u0632\u064E\u0651\u0643\u064E\u0627\u0629\u064E \u0648\u064E\u0627\u0631\u0652\u0643\u064E\u0639\u064F\u0648\u0627 \u0645\u064E\u0639\u064E \u0627\u0644\u0631\u064E\u0651\u0627\u0643\u0650\u0639\u0650\u064A\u0646\u064E',
    ayahTranslation:
      'Keep up the prayer, pay the prescribed alms, and bow your heads [in worship] with those who bow theirs.',
    description:
      'The ritual prayer performed five times daily, establishing a direct connection between the servant and Allah. It is the first act a person will be held accountable for on the Day of Judgment.',
    conditions: [
      'Ritual purity (Wudu / Ghusl)',
      'Facing the Qiblah (direction of the Ka\u2018bah)',
      'Praying at the five prescribed times',
      'Covering the \u2018awrah (proper dress)',
      'Intention (Niyyah) for the specific prayer',
    ],
    virtues: [
      'Spiritual discipline and direct connection to Allah',
      'Mindfulness and remembrance throughout the day',
      'Cleanses minor sins between prayers',
      'Prevents indecency and wrongdoing (29:45)',
      'Source of comfort and strength',
    ],
  },
  {
    id: 'zakat',
    name: 'Zakah',
    arabic: '\u0627\u0644\u0632\u064E\u0651\u0643\u064E\u0627\u0629',
    meaning: 'Obligatory Alms',
    order: 3,
    ayahKey: '9:103',
    ayahArabic:
      '\u062E\u064F\u0630\u0652 \u0645\u0650\u0646\u0652 \u0623\u064E\u0645\u0652\u0648\u064E\u0627\u0644\u0650\u0647\u0650\u0645\u0652 \u0635\u064E\u062F\u064E\u0642\u064E\u0629\u064B \u062A\u064F\u0637\u064E\u0647\u064E\u0651\u0631\u064F\u0647\u064F\u0645\u0652 \u0648\u064E\u062A\u064F\u0632\u064E\u0643\u064E\u0651\u064A\u0647\u0650\u0645 \u0628\u0650\u0647\u064E\u0627 \u0648\u064E\u0635\u064E\u0644\u064E\u0651 \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650\u0645\u0652 \u06D6 \u0625\u0650\u0646\u064E\u0651 \u0635\u064E\u0644\u064E\u0627\u062A\u064E\u0643\u064E \u0633\u064E\u0643\u064E\u0646\u064C \u0644\u064E\u0651\u0647\u064F\u0645\u0652 \u06D7 \u0648\u064E\u0627\u0644\u0644\u064E\u0651\u0647\u064F \u0633\u064E\u0645\u0650\u064A\u0639\u064C \u0639\u064E\u0644\u0650\u064A\u0645\u064C',
    ayahTranslation:
      'In order to cleanse and purify them [Prophet], accept a gift out of their property [to make amends] and pray for them \u2014 your prayer will be a comfort to them. God is all hearing, all knowing.',
    description:
      'The obligatory annual giving of 2.5% of qualifying wealth to those in need. It purifies the giver\u2019s wealth and soul, and provides for the less fortunate in the community.',
    conditions: [
      'Ownership of wealth above the Nisab threshold',
      'Wealth held for one full lunar year (Hawl)',
      'The wealth must be surplus beyond basic needs',
      'Given to eligible recipients (8 categories in 9:60)',
    ],
    virtues: [
      'Purification of wealth and the soul',
      'Social justice and poverty alleviation',
      'Prevents hoarding and circulates wealth',
      'Strengthens bonds of community solidarity',
    ],
  },
  {
    id: 'sawm',
    name: 'Sawm',
    arabic: '\u0627\u0644\u0635\u064E\u0651\u0648\u0652\u0645',
    meaning: 'Fasting',
    order: 4,
    ayahKey: '2:183',
    ayahArabic:
      '\u064A\u064E\u0627 \u0623\u064E\u064A\u064F\u0651\u0647\u064E\u0627 \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u0622\u0645\u064E\u0646\u064F\u0648\u0627 \u0643\u064F\u062A\u0650\u0628\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064F\u0645\u064F \u0627\u0644\u0635\u064E\u0651\u064A\u064E\u0627\u0645\u064F \u0643\u064E\u0645\u064E\u0627 \u0643\u064F\u062A\u0650\u0628\u064E \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u0645\u0650\u0646 \u0642\u064E\u0628\u0652\u0644\u0650\u0643\u064F\u0645\u0652 \u0644\u064E\u0639\u064E\u0644\u064E\u0651\u0643\u064F\u0645\u0652 \u062A\u064E\u062A\u064E\u0651\u0642\u064F\u0648\u0646\u064E',
    ayahTranslation:
      'You who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may be mindful of God.',
    description:
      'Abstaining from food, drink, and other physical needs from dawn to sunset during the month of Ramadan. It cultivates self-restraint, empathy, and spiritual growth.',
    conditions: [
      'Abstaining from food and drink, dawn to sunset',
      'Abstaining from marital relations during fasting hours',
      'Intention (Niyyah) made before Fajr each day',
      'Exemptions: illness, travel, pregnancy, elderly',
      'Missed days must be made up (Qada\u2019)',
    ],
    virtues: [
      'Develops Taqwa (God-consciousness)',
      'Self-restraint and spiritual discipline',
      'Empathy for those who go hungry',
      'Physical and spiritual purification',
      'Ramadan: the month the Quran was revealed',
    ],
  },
  {
    id: 'hajj',
    name: 'Hajj',
    arabic: '\u0627\u0644\u062D\u064E\u0651\u062C',
    meaning: 'Pilgrimage',
    order: 5,
    ayahKey: '3:97',
    ayahArabic:
      '\u0648\u064E\u0644\u0650\u0644\u064E\u0651\u0647\u0650 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0646\u064E\u0651\u0627\u0633\u0650 \u062D\u0650\u062C\u064F\u0651 \u0627\u0644\u0652\u0628\u064E\u064A\u0652\u062A\u0650 \u0645\u064E\u0646\u0650 \u0627\u0633\u0652\u062A\u064E\u0637\u064E\u0627\u0639\u064E \u0625\u0650\u0644\u064E\u064A\u0652\u0647\u0650 \u0633\u064E\u0628\u0650\u064A\u0644\u064B\u0627',
    ayahTranslation:
      'Pilgrimage to the House is a duty owed to God by people who are able to undertake it. Those who reject this [should know that] God has no need of anyone.',
    description:
      'The annual pilgrimage to the Sacred House in Makkah, required once in a lifetime for those who are physically and financially able. It commemorates the legacy of Ibrahim (AS) and unites Muslims from every nation.',
    conditions: [
      'Physical ability to travel and perform the rites',
      'Financial means beyond basic family needs',
      'Safety of the travel route',
      'Once in a lifetime obligation',
      'Performed during Dhul Hijjah (8th\u201313th)',
    ],
    virtues: [
      'Universal brotherhood and equality before Allah',
      'A spiritual reset \u2014 sins forgiven for an accepted Hajj',
      'Commemorates the sacrifice and devotion of Ibrahim (AS)',
      'Fosters humility: all pilgrims wear the same simple garments',
      'The largest annual gathering of Muslims worldwide',
    ],
  },
];
