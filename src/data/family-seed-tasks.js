// Seed tasks for Family pillar submodules (Hifz al-Nasl).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const FAMILY_SEED_TASKS = {
  // ── FOUNDATIONS OF MARRIAGE ──
  family_marriage_core: [
    { title: 'Verify your marriage contract (nikah) is valid — confirm witnesses, mahr, and wali were present', priority: 'urgent', tags: ['nikah', 'fiqh'] },
    { title: 'Establish daily check-ins with your spouse — minimum 10 minutes of undivided attention', priority: 'high', tags: ['marriage', 'connection'] },
    { title: 'Learn the mutual rights and obligations of spouses in Islam (nafaqah, kindness, intimacy)', priority: 'high', tags: ['fiqh', 'marriage'] },
    { title: 'Ensure your spouse\'s basic needs — financial, emotional, and physical — are consistently met', priority: 'urgent', tags: ['marriage', 'obligation'] },
    { title: 'Eliminate all forms of abuse — verbal, emotional, and physical — from the marital relationship', priority: 'urgent', tags: ['character', 'marriage'] },
  ],
  family_marriage_growth: [
    { title: 'Schedule a weekly marriage meeting — review the week, express gratitude, plan ahead together', priority: 'high', tags: ['marriage', 'planning'] },
    { title: 'Read a book on Islamic marriage together — e.g., "Like a Garment" by Yasir Qadhi', priority: 'medium', tags: ['study', 'marriage'] },
    { title: 'Learn and practise conflict resolution from the Sunnah — no contempt, no stonewalling, always reconcile before sleep', priority: 'high', tags: ['marriage', 'adab'] },
    { title: 'Identify and speak each other\'s love language — express appreciation in ways your spouse receives it', priority: 'medium', tags: ['marriage', 'connection'] },
  ],
  family_marriage_excellence: [
    { title: 'Undertake a joint spiritual project — Quran khatm together, Umrah, or a shared community service', priority: 'medium', tags: ['marriage', 'spirituality'] },
    { title: 'Write a marriage vision statement — your shared values, goals, and legacy as a couple', priority: 'low', tags: ['marriage', 'legacy'] },
    { title: 'Mentor an engaged or newly married couple through premarital or early marital guidance', priority: 'low', tags: ['marriage', 'dawah'] },
  ],

  // ── PARENTING & MENTORSHIP ──
  family_parenting_core: [
    { title: 'Ensure children have consistent halal provision — food, clothing, shelter, and safety', priority: 'urgent', tags: ['parenting', 'provision'] },
    { title: 'Establish daily Islamic bedtime routine — du\'a, Ayat al-Kursi, and a brief story from seerah', priority: 'high', tags: ['parenting', 'tarbiyah'] },
    { title: 'Teach children the six pillars of Iman and five pillars of Islam at age-appropriate levels', priority: 'high', tags: ['tarbiyah', 'aqidah'] },
    { title: 'Model the character (akhlaq) you want your children to inherit — they observe everything', priority: 'urgent', tags: ['parenting', 'character'] },
    { title: 'Set clear, consistent, and compassionate household boundaries and expectations', priority: 'high', tags: ['parenting', 'discipline'] },
  ],
  family_parenting_growth: [
    { title: 'Implement a structured Quran and Islamic studies schedule for each child', priority: 'high', tags: ['tarbiyah', 'quran'] },
    { title: 'Learn an Islamic parenting framework — study Ibn al-Qayyim\'s "Tuhfat al-Mawdud" or equivalent', priority: 'medium', tags: ['study', 'parenting'] },
    { title: 'Hold weekly one-on-one "mentorship time" with each child — listen deeply, guide gently', priority: 'high', tags: ['parenting', 'mentorship'] },
    { title: 'Teach practical life skills — cooking, budgeting, household responsibility — alongside Islamic values', priority: 'medium', tags: ['parenting', 'life-skills'] },
  ],
  family_parenting_excellence: [
    { title: 'Design a personalised tarbiyah plan for each child based on their temperament and gifts', priority: 'medium', tags: ['tarbiyah', 'planning'] },
    { title: 'Facilitate your child\'s first experience of service — volunteering, charity, or community contribution', priority: 'medium', tags: ['parenting', 'community'] },
    { title: 'Write letters to each child recording your du\'as, hopes, and wisdom for them to read when older', priority: 'low', tags: ['parenting', 'legacy'] },
  ],

  // ── EXTENDED FAMILY (KINSHIP) ──
  family_kinship_core: [
    { title: 'Make contact with parents and close relatives at least once per week — call, visit, or message', priority: 'urgent', tags: ['silat-al-rahim', 'parents'] },
    { title: 'Identify any severed family ties (qat al-rahim) and take the first step to reconcile', priority: 'urgent', tags: ['silat-al-rahim', 'reconciliation'] },
    { title: 'Learn the Islamic rulings on silat al-rahim — rights of parents, relatives, and in-laws', priority: 'high', tags: ['fiqh', 'silat-al-rahim'] },
    { title: 'Fulfil obligations to parents — obedience, service, and du\'a for them (in life and after death)', priority: 'urgent', tags: ['parents', 'birr-al-walidayn'] },
    { title: 'Attend family occasions — births, weddings, illnesses, and funerals — as a duty of kinship', priority: 'high', tags: ['silat-al-rahim', 'community'] },
  ],
  family_kinship_growth: [
    { title: 'Organise a regular family gathering — monthly meal, annual trip, or online meeting', priority: 'medium', tags: ['family', 'connection'] },
    { title: 'Establish a family support fund or informal network for relatives facing hardship', priority: 'medium', tags: ['sadaqah', 'family'] },
    { title: 'Learn the history of your lineage — document names, stories, and origins at least 3 generations back', priority: 'low', tags: ['family', 'heritage'] },
    { title: 'Be proactively generous with in-laws — treat them with the same care as your own parents', priority: 'high', tags: ['in-laws', 'adab'] },
  ],
  family_kinship_excellence: [
    { title: 'Document your family\'s history, values, and legacy in a written or digital archive', priority: 'low', tags: ['heritage', 'legacy'] },
    { title: 'Establish a family waqf or ongoing sadaqah jariyah dedicated to the lineage', priority: 'low', tags: ['waqf', 'sadaqah-jariyah'] },
    { title: 'Take on the role of family elder or coordinator — be the one who keeps the family united', priority: 'medium', tags: ['leadership', 'family'] },
  ],

  // ── HOME ENVIRONMENT ──
  family_home_core: [
    { title: 'Establish the home as a place of prayer — designate a clean prayer space with qibla direction', priority: 'urgent', tags: ['home', 'salah'] },
    { title: 'Remove all haram objects and content from the home — images of animate beings (on walls), music players, alcohol', priority: 'urgent', tags: ['home', 'halal'] },
    { title: 'Ensure the home is clean, organised, and maintained as a dignified space', priority: 'high', tags: ['home', 'cleanliness'] },
    { title: 'Begin and end each day in the home with Islamic adhkar — morning/evening supplications', priority: 'high', tags: ['home', 'adhkar'] },
    { title: 'Establish household rules — screen time limits, guest etiquette, and shared responsibilities', priority: 'medium', tags: ['home', 'discipline'] },
  ],
  family_home_growth: [
    { title: 'Curate the home aesthetic — add calligraphy, remove distracting decor, create a peaceful atmosphere', priority: 'medium', tags: ['home', 'environment'] },
    { title: 'Establish a family media policy — approved content only, devices out of bedrooms at night', priority: 'high', tags: ['home', 'protection'] },
    { title: 'Create a dedicated home learning space — books, Quran, and educational resources accessible to all', priority: 'medium', tags: ['home', 'learning'] },
    { title: 'Host a monthly gathering for friends, neighbours, or community — practise the Sunnah of hospitality', priority: 'medium', tags: ['home', 'hospitality'] },
  ],
  family_home_excellence: [
    { title: 'Transform the home into a community hub — regular halaqah, iftar gatherings, or skills workshops', priority: 'low', tags: ['home', 'community'] },
    { title: 'Design a home environment intentionally — every room serves a purposeful, value-aligned function', priority: 'low', tags: ['home', 'design'] },
    { title: 'Document a "Home Charter" — written values, routines, and vision for what your household stands for', priority: 'low', tags: ['home', 'legacy'] },
  ],
};
