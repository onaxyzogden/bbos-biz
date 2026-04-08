// Seed tasks for Intellect pillar submodules (Hifz al-Aql).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const INTELLECT_SEED_TASKS = {
  // ── LEARNING & LITERACY ──
  intellect_learning_core: [
    { title: 'Attain functional literacy in Arabic script — learn to read the Quran with tajweed', priority: 'urgent', tags: ['arabic', 'quran'] },
    { title: 'Identify the core knowledge your profession or calling requires and map your gaps', priority: 'high', tags: ['learning', 'planning'] },
    { title: 'Establish a daily reading habit — minimum 20 pages or 30 minutes', priority: 'high', tags: ['reading', 'discipline'] },
    { title: 'Learn the Islamic obligation to seek knowledge — study hadith "Seek knowledge from the cradle to the grave"', priority: 'medium', tags: ['aqidah', 'knowledge'] },
    { title: 'Complete a foundational course in Islamic sciences (fiqh, aqidah, or seerah)', priority: 'high', tags: ['islamic-education', 'study'] },
  ],
  intellect_learning_growth: [
    { title: 'Read one non-fiction book per month across diverse disciplines (science, history, philosophy)', priority: 'high', tags: ['reading', 'breadth'] },
    { title: 'Enrol in a structured course or programme aligned with your life mission', priority: 'high', tags: ['learning', 'skill-building'] },
    { title: 'Study one new language at an intermediate level (Arabic priority for Muslims)', priority: 'medium', tags: ['arabic', 'language'] },
    { title: 'Build a personal library — curate 50 essential books across faith, profession, and worldview', priority: 'low', tags: ['reading', 'curation'] },
  ],
  intellect_learning_excellence: [
    { title: 'Author an original piece of work — article, paper, book, or curriculum', priority: 'medium', tags: ['writing', 'legacy'] },
    { title: 'Mentor at least one student or younger person in your area of expertise', priority: 'medium', tags: ['mentorship', 'legacy'] },
    { title: 'Develop and publish a structured learning pathway or curriculum in your field', priority: 'low', tags: ['teaching', 'contribution'] },
  ],

  // ── CRITICAL THINKING ──
  intellect_thinking_core: [
    { title: 'Implement a "verify before sharing" rule — check sources before forwarding any claim', priority: 'urgent', tags: ['verification', 'sidq'] },
    { title: 'Study the Islamic epistemology of knowledge — categories of certainty (qat\'i vs. dhanni)', priority: 'high', tags: ['epistemology', 'islamic-knowledge'] },
    { title: 'Learn the logical fallacies — identify them in media, debate, and your own thinking', priority: 'high', tags: ['logic', 'critical-thinking'] },
    { title: 'Practise steelmanning — before critiquing any position, articulate it in its strongest form', priority: 'medium', tags: ['reasoning', 'fairness'] },
    { title: 'Audit your main news and information sources — classify them by reliability and bias', priority: 'high', tags: ['media-literacy', 'verification'] },
  ],
  intellect_thinking_growth: [
    { title: 'Study a foundational text on logic or philosophy — e.g., Aristotle\'s categories or Al-Ghazali\'s Maqasid al-Falasifah', priority: 'medium', tags: ['logic', 'philosophy'] },
    { title: 'Apply a structured decision-making framework (e.g., istikharah + pros/cons + shura) to your next major decision', priority: 'high', tags: ['decision-making', 'istikhara'] },
    { title: 'Practice adversarial thinking — challenge your own deeply held assumptions monthly', priority: 'medium', tags: ['critical-thinking', 'muhasaba'] },
    { title: 'Study cognitive bias — read "Thinking, Fast and Slow" or equivalent Islamic-compatible text', priority: 'medium', tags: ['psychology', 'critical-thinking'] },
  ],
  intellect_thinking_excellence: [
    { title: 'Write a structured analysis of a complex issue in your field — demonstrate cross-disciplinary reasoning', priority: 'medium', tags: ['writing', 'analysis'] },
    { title: 'Lead a structured debate or seminar — present and defend a reasoned position publicly', priority: 'low', tags: ['leadership', 'communication'] },
    { title: 'Solve a meaningful, complex problem in your community using original research and analysis', priority: 'medium', tags: ['impact', 'problem-solving'] },
  ],

  // ── COGNITIVE INTEGRITY ──
  intellect_cognitive_core: [
    { title: 'Identify and eliminate mind-dulling inputs — excessive entertainment, haram content, gossip media', priority: 'urgent', tags: ['protection', 'discipline'] },
    { title: 'Establish a "no phone first hour" morning protocol — protect your cognitive prime time', priority: 'high', tags: ['focus', 'discipline'] },
    { title: 'Practise the Sunnah of silence (samt) — designate daily quiet periods for reflection', priority: 'high', tags: ['reflection', 'sunnah'] },
    { title: 'Learn and apply the Islamic concept of \u02bfilm al-yaqin (knowledge with certainty) — do not opine without evidence', priority: 'medium', tags: ['epistemology', 'sidq'] },
    { title: 'Audit your social circle — who is elevating your thinking vs. who is draining it', priority: 'medium', tags: ['relationships', 'growth'] },
  ],
  intellect_cognitive_growth: [
    { title: 'Implement "Deep Work" sessions — 90-minute uninterrupted focus blocks, 3×/week minimum', priority: 'high', tags: ['focus', 'deep-work'] },
    { title: 'Begin a memorisation practice — Quran, hadith, or technical material (30 minutes/day)', priority: 'high', tags: ['memorisation', 'discipline'] },
    { title: 'Practice deliberate rest — schedule complete cognitive rest (no inputs) one day per week', priority: 'medium', tags: ['rest', 'balance'] },
    { title: 'Study the science of habit formation — design your environment for intellectual work', priority: 'medium', tags: ['habit', 'environment-design'] },
  ],
  intellect_cognitive_excellence: [
    { title: 'Achieve a sustained state of flow in your core intellectual work — document your conditions for it', priority: 'medium', tags: ['flow', 'mastery'] },
    { title: 'Develop an original intellectual framework or model grounded in Islamic principles', priority: 'low', tags: ['original-thinking', 'contribution'] },
    { title: 'Complete a major long-form work requiring 90+ hours of deep cognitive effort', priority: 'medium', tags: ['deep-work', 'legacy'] },
  ],

  // ── PROFESSIONAL MASTERY ──
  intellect_professional_core: [
    { title: 'Obtain or verify all certifications and licences required to practise your profession ethically', priority: 'urgent', tags: ['credentials', 'ethics'] },
    { title: 'Define your professional mission statement — how does your work serve Allah and humanity?', priority: 'high', tags: ['mission', 'niyyah'] },
    { title: 'Identify the top 3 skill gaps holding you back in your current role and create a plan to close them', priority: 'high', tags: ['skills', 'planning'] },
    { title: 'Ensure your primary income source is fully halal — audit contracts, clients, and products', priority: 'urgent', tags: ['halal', 'income'] },
    { title: 'Build a professional portfolio or record of your best work', priority: 'medium', tags: ['portfolio', 'credibility'] },
  ],
  intellect_professional_growth: [
    { title: 'Pursue advanced training, specialisation, or a higher qualification in your field', priority: 'high', tags: ['education', 'expertise'] },
    { title: 'Find a professional mentor — someone 5–10 years ahead on the path you want to walk', priority: 'high', tags: ['mentorship', 'growth'] },
    { title: 'Attend at least two conferences, seminars, or professional gatherings per year', priority: 'medium', tags: ['networking', 'learning'] },
    { title: 'Develop a personal "board of advisors" — 3–5 trusted people who challenge your professional thinking', priority: 'medium', tags: ['shura', 'accountability'] },
  ],
  intellect_professional_excellence: [
    { title: 'Publish original research, a case study, or an innovation in your field', priority: 'medium', tags: ['publishing', 'contribution'] },
    { title: 'Take on a leadership or governance role — board position, committee chair, or department head', priority: 'medium', tags: ['leadership', 'impact'] },
    { title: 'Design and deliver a training programme that uplifts others in your profession', priority: 'low', tags: ['teaching', 'legacy'] },
  ],
};
