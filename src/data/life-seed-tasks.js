// Seed tasks for Life pillar submodules (Hifz al-Nafs).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const LIFE_SEED_TASKS = {
  // ── PHYSICAL HEALTH ──
  life_physical_core: [
    { title: 'Audit your diet — eliminate haram and doubtful (mashbuh) consumables', priority: 'urgent', tags: ['diet', 'halal'] },
    { title: 'Establish a consistent sleep schedule of 7–8 hours aligned with Fajr', priority: 'high', tags: ['sleep', 'sunnah'] },
    { title: 'Begin a daily walk after Fajr or Asr (minimum 20 minutes)', priority: 'high', tags: ['exercise', 'sunnah'] },
    { title: 'Book an annual comprehensive health screening', priority: 'high', tags: ['health', 'prevention'] },
    { title: 'Identify and remove harmful substances — tobacco, alcohol, processed foods', priority: 'urgent', tags: ['diet', 'tayyib'] },
  ],
  life_physical_growth: [
    { title: 'Establish 3×/week strength or resistance training routine', priority: 'high', tags: ['exercise', 'fitness'] },
    { title: 'Track daily water intake (target 2–3 litres)', priority: 'medium', tags: ['hydration', 'health'] },
    { title: 'Explore the Sunnah of intermittent fasting (Monday/Thursday) as a health practice', priority: 'medium', tags: ['fasting', 'sunnah'] },
    { title: 'Prepare a home emergency medical kit (first aid, medications, contacts)', priority: 'medium', tags: ['safety', 'preparation'] },
  ],
  life_physical_excellence: [
    { title: 'Implement a nutrient-timing protocol (pre/post workout, suhoor/iftar optimisation)', priority: 'medium', tags: ['nutrition', 'performance'] },
    { title: 'Learn and practise an active Sunnah sport (swimming, archery, or horse riding)', priority: 'low', tags: ['sunnah', 'fitness'] },
    { title: 'Develop a peak-performance body composition target and 90-day plan', priority: 'low', tags: ['fitness', 'planning'] },
  ],

  // ── MENTAL WELL-BEING ──
  life_mental_core: [
    { title: 'Establish a morning routine: Fajr → Quran (minimum 1 page) → morning adhkar → journal', priority: 'urgent', tags: ['routine', 'adhkar'] },
    { title: 'Identify sources of haram media (music, content) and set firm boundaries', priority: 'high', tags: ['media', 'protection'] },
    { title: 'Practise daily dhikr for anxiety — recite Ayat al-Kursi, last two ayat of Al-Baqarah', priority: 'high', tags: ['dhikr', 'mental-health'] },
    { title: 'Limit social media use to defined time windows — set screen-time limits', priority: 'high', tags: ['digital-detox', 'focus'] },
    { title: 'Seek Islamic counselling or therapy if experiencing persistent anxiety or depression', priority: 'medium', tags: ['mental-health', 'help'] },
  ],
  life_mental_growth: [
    { title: 'Start a daily muhasaba (self-accounting) journal — 5 minutes before sleep', priority: 'high', tags: ['muhasaba', 'reflection'] },
    { title: 'Designate one day per week as a digital-free unplugged day', priority: 'medium', tags: ['digital-detox', 'rest'] },
    { title: 'Study and practise Sunnah grounding techniques: wudu for anger, salah for stress, istighfar for guilt', priority: 'medium', tags: ['sunnah', 'mental-health'] },
    { title: 'Read one book on Islamic psychology or tazkiyah al-nafs per month', priority: 'medium', tags: ['study', 'tazkiyah'] },
  ],
  life_mental_excellence: [
    { title: 'Begin a cognitive training programme — Quran memorisation or language learning', priority: 'medium', tags: ['memorisation', 'cognitive'] },
    { title: 'Engage a mentor, coach, or therapist for deep personal development', priority: 'medium', tags: ['mentorship', 'growth'] },
    { title: 'Write a personal soul-map: your psychological autobiography, values, wounds, and aspirations', priority: 'low', tags: ['reflection', 'tazkiyah'] },
  ],

  // ── SAFETY & SECURITY ──
  life_safety_core: [
    { title: 'Confirm stable, secure, and dignified housing for your household', priority: 'urgent', tags: ['housing', 'security'] },
    { title: 'Verify that all basic needs (food, clothing, shelter) are covered by halal income', priority: 'urgent', tags: ['provision', 'halal'] },
    { title: 'Build a 3-month emergency fund in a halal savings vehicle', priority: 'high', tags: ['finance', 'emergency'] },
    { title: 'Obtain basic first aid and CPR certification', priority: 'high', tags: ['first-aid', 'preparation'] },
    { title: 'Document an emergency contact plan — phone numbers, meeting point, exit routes', priority: 'medium', tags: ['emergency', 'planning'] },
  ],
  life_safety_growth: [
    { title: 'Improve living conditions — reduce overcrowding, noise, and environmental stressors', priority: 'high', tags: ['housing', 'well-being'] },
    { title: 'Research and obtain relevant Takaful (Islamic insurance) for health and property', priority: 'medium', tags: ['takaful', 'protection'] },
    { title: 'Create a written home safety protocol (fire plan, emergency procedures)', priority: 'medium', tags: ['safety', 'planning'] },
    { title: 'Understand your legal rights as a Muslim in your jurisdiction (employment, religious accommodation)', priority: 'medium', tags: ['rights', 'knowledge'] },
  ],
  life_safety_excellence: [
    { title: 'Contribute to a community safety initiative — neighbourhood watch, emergency response training', priority: 'low', tags: ['community', 'safety'] },
    { title: 'Develop a family continuity plan — wills, guardianship, Islamic estate planning', priority: 'medium', tags: ['planning', 'family'] },
    { title: 'Pursue a leadership role in your neighbourhood or mosque safety committee', priority: 'low', tags: ['leadership', 'community'] },
  ],

  // ── SOCIAL CHARACTER ──
  life_social_core: [
    { title: 'Master the Islamic greeting — give salam freely and respond completely', priority: 'high', tags: ['adab', 'sunnah'] },
    { title: 'Fulfil social obligations consistently — attend weddings, funerals, and visit the sick', priority: 'high', tags: ['adab', 'community'] },
    { title: 'Audit your speech — eliminate backbiting (gheebah), slander (buhtan), and lying', priority: 'urgent', tags: ['adab', 'character'] },
    { title: 'Practise positive body language — eye contact, open posture, and full presence in conversations', priority: 'medium', tags: ['adab', 'communication'] },
    { title: 'Respond to wrongdoing with patience (hilm) — implement a 24-hour rule before reacting', priority: 'medium', tags: ['character', 'patience'] },
  ],
  life_social_growth: [
    { title: 'Build a reputation for honesty and reliability in your professional and social circles', priority: 'high', tags: ['trust', 'character'] },
    { title: 'Perform a regular act of service (khidmah) — volunteer, help a neighbour, or assist at the mosque', priority: 'medium', tags: ['khidmah', 'community'] },
    { title: 'Develop active listening skills — practise full presence and ask thoughtful follow-up questions', priority: 'medium', tags: ['communication', 'character'] },
    { title: 'Identify and reconcile at least one broken or strained relationship this month', priority: 'high', tags: ['reconciliation', 'sulh'] },
  ],
  life_social_excellence: [
    { title: 'Mentor a younger Muslim in character development and professional or spiritual growth', priority: 'medium', tags: ['mentorship', 'dawah'] },
    { title: 'Represent Islam publicly through excellence in conduct — let your character be your dawah', priority: 'medium', tags: ['dawah', 'character'] },
    { title: 'Establish or join a circle of accountability (muhasaba group) with trusted peers', priority: 'low', tags: ['muhasaba', 'community'] },
  ],
};
