// Dashboard content for each of the 5 faith pillar sub-pages
// Each entry drives the rich dashboard view inside FaithPillarBoard

export const PILLAR_DASHBOARD_DATA = {
  shahada: {
    mastery: 85,
    quote: '"The core of existence lies in the certainty of the heart."',
    description:
      'Your foundation is strengthening. Continue refined verification of your creed. Each level of understanding unlocks new dimensions of spiritual clarity.',
    necessity: {
      icon: 'lock',
      title: 'Correct Creed (Aqidah)',
      desc: 'Verify foundational beliefs and remove any major contradictions or spiritual doubts.',
      cta: 'Begin Verification',
    },
    growth: {
      icon: 'expand_circle_up',
      title: 'Knowledge of the Divine',
      desc: 'Study the 99 Names/Attributes of Allah to increase connection and recognize His presence in daily life.',
      cta: 'Study Names',
    },
    excellence: {
      icon: 'stars',
      title: 'Representative Excellence',
      desc: 'Engage in active Dawah or mentorship to represent Islam in your field through character and wisdom.',
      cta: 'View Mentorship',
    },
    banner: {
      headline: 'Deepen Your Connection',
      quote: '"Belief is not merely a word spoken, but a truth lived through every action."',
    },
  },

  salah: {
    mastery: 62,
    quote: '"Prayer is the pillar of the religion; whoever establishes it, establishes the religion."',
    description:
      'Your consistency is building. Focus on perfecting the quality of your prayers — khushu (humility and presence) transforms obligation into intimate conversation with the Divine.',
    necessity: {
      icon: 'schedule',
      title: 'Five Daily Prayers',
      desc: 'Establish and maintain all five daily prayers on time with proper wudu and physical requirements.',
      cta: 'Track Prayers',
    },
    growth: {
      icon: 'self_improvement',
      title: 'Khushu & Presence',
      desc: 'Develop deep concentration and spiritual presence in prayer through understanding the meaning of each recitation.',
      cta: 'Deepen Focus',
    },
    excellence: {
      icon: 'nights_stay',
      title: 'Voluntary Prayers',
      desc: 'Establish Sunnah prayers, Tahajjud (night prayer), and Duha to draw closer to Allah beyond the obligatory.',
      cta: 'Explore Nawafil',
    },
    banner: {
      headline: 'The Sweetness of Prayer',
      quote: '"The coolness of my eyes was placed in prayer." — Prophet Muhammad ﷺ (Sunan an-Nasa\u2019i 3940)',
    },
  },

  zakah: {
    mastery: 40,
    quote: '"Wealth does not decrease because of charity."',
    description:
      'Purification of wealth begins with understanding your obligations. Calculate your Nisab, track your assets, and ensure your giving aligns with the precise requirements of Zakah.',
    necessity: {
      icon: 'calculate',
      title: 'Zakah Calculation',
      desc: 'Determine your Nisab threshold, calculate 2.5% on qualifying assets held for one lunar year.',
      cta: 'Calculate Zakah',
    },
    growth: {
      icon: 'volunteer_activism',
      title: 'Sadaqah & Generosity',
      desc: 'Develop a consistent habit of voluntary giving beyond Zakah to purify the soul and support the community.',
      cta: 'Plan Giving',
    },
    excellence: {
      icon: 'account_balance',
      title: 'Waqf & Legacy',
      desc: 'Establish enduring charitable endowments (Waqf) that continue generating benefit after your lifetime.',
      cta: 'Explore Waqf',
    },
    banner: {
      headline: 'The Purification of Wealth',
      quote: '"Take from their wealth a charity by which you purify them." — Qur\'an 9:103',
    },
  },

  sawm: {
    mastery: 55,
    quote: '"Fasting is a shield; it will protect you from the Hellfire and prevent you from sins."',
    description:
      'Fasting trains the soul in discipline and gratitude. Beyond Ramadan, voluntary fasts throughout the year sustain spiritual momentum and self-mastery.',
    necessity: {
      icon: 'restaurant',
      title: 'Ramadan Fasting',
      desc: 'Complete the obligatory fast from dawn to sunset during Ramadan with proper intention and conditions.',
      cta: 'Ramadan Tracker',
    },
    growth: {
      icon: 'psychology',
      title: 'Inner Discipline',
      desc: 'Go beyond abstaining from food — guard the tongue, eyes, and heart during fasting to unlock spiritual transformation.',
      cta: 'Refine Practice',
    },
    excellence: {
      icon: 'event_repeat',
      title: 'Voluntary Fasting',
      desc: 'Establish Sunnah fasts — Mondays & Thursdays, Ayyam al-Bid, Shawwal, and the Day of Arafah.',
      cta: 'Plan Fasts',
    },
    banner: {
      headline: 'Mastery Through Restraint',
      quote: '"O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may attain taqwa." — Qur\'an 2:183',
    },
  },

  hajj: {
    mastery: 15,
    quote: '"And proclaim to the people the Hajj; they will come to you on foot and on every lean camel."',
    description:
      'The journey of a lifetime requires spiritual, physical, and financial preparation. Begin laying the groundwork now so that when the call comes, you are ready to answer.',
    necessity: {
      icon: 'flight_takeoff',
      title: 'Hajj Prerequisites',
      desc: 'Ensure physical health, financial means, and safety of travel. Settle debts and seek permission from dependents.',
      cta: 'Check Readiness',
    },
    growth: {
      icon: 'map',
      title: 'Rites & Knowledge',
      desc: 'Study the manasik (rituals) of Hajj in detail — Ihram, Tawaf, Sa\'i, Arafah, Mina, and the symbolic meanings behind each.',
      cta: 'Study Rites',
    },
    excellence: {
      icon: 'mosque',
      title: 'Spiritual Preparation',
      desc: 'Cultivate the inner state of complete surrender, repentance, and renewal that transforms Hajj from ritual into rebirth.',
      cta: 'Begin Preparation',
    },
    banner: {
      headline: 'The Ultimate Pilgrimage',
      quote: '"Whoever performs Hajj and does not commit any obscenity or transgression shall return free of sin, as on the day their mother bore them." — Prophet Muhammad ﷺ (Sahih al-Bukhari 1521)',
    },
  },
};

// Dashboard content for the 4 Life (Hifz al-Nafs) submodule pages
export const LIFE_DASHBOARD_DATA = {
  physical: {
    mastery: 45,
    quote: '"Your body has a right over you." — Prophet Muhammad \uFDFA (Sahih al-Bukhari 5199)',
    description:
      'Honor the vessel of the soul through halal nutrition, physical vitality, and peak performance. Every act of health preservation is an act of worship.',
    necessity: {
      icon: 'lock',
      title: 'Survival & Halal Integrity',
      desc: 'Ensure all food/drink is Halal and meets basic caloric/nutritional requirements.',
      cta: 'Begin Verification',
    },
    growth: {
      icon: 'activity',
      title: 'Vitality & Prevention',
      desc: 'Establish a consistent exercise routine (3x weekly) and schedule annual health screenings.',
      cta: 'Build Routine',
    },
    excellence: {
      icon: 'stars',
      title: 'Peak Performance (Tayyib)',
      desc: 'Implement sleep optimization, nutrient timing, and prioritize high-quality organic/Tayyib sources.',
      cta: 'Optimize Health',
    },
    banner: {
      headline: 'The Body is an Amanah',
      quote: '"O children of Adam... eat and drink, but be not excessive." \u2014 Qur\u2019an 7:31',
    },
  },

  mental: {
    mastery: 35,
    quote: '"Verily, in the remembrance of Allah do hearts find rest." \u2014 Qur\u2019an 13:28',
    description:
      'Protect and strengthen the mind through wholesome environments, emotional resilience, and deep self-mastery rooted in Islamic psychology.',
    necessity: {
      icon: 'shield',
      title: 'Preservation of Sanity',
      desc: 'Proactively seek out and maintain Tayyib (wholesome) environments and habits that nourish mental clarity and spiritual peace.',
      cta: 'Assess Environment',
    },
    growth: {
      icon: 'eye',
      title: 'Resilience & Clarity',
      desc: 'Practice daily reflection (Muraqaba) or journaling to process emotions and reduce stress.',
      cta: 'Start Journaling',
    },
    excellence: {
      icon: 'crown',
      title: 'Psychological Mastery',
      desc: 'Engage in high-level cognitive training or professional coaching to achieve deep-work focus and emotional maturity.',
      cta: 'Advance Growth',
    },
    banner: {
      headline: 'Guard the Mind, Guard the Soul',
      quote: '"He who knows himself, knows his Lord." \u2014 attributed to Ali ibn Abi Talib (ra)',
    },
  },

  safety: {
    mastery: 30,
    quote: '"Whoever provides safety for a person from harm, Allah will provide safety for them on the Day of Judgment."',
    description:
      'Protect the body and environment from harm. From securing basic needs to building community resilience, safety is a foundation of the Maqasid.',
    necessity: {
      icon: 'shield',
      title: 'Protection of the Body',
      desc: 'Secure basic housing, clothing, and access to emergency medical care.',
      cta: 'Review Basics',
    },
    growth: {
      icon: 'activity',
      title: 'Environmental Stability',
      desc: 'Improve living/working conditions to reduce physical strain and long-term environmental hazards.',
      cta: 'Improve Conditions',
    },
    excellence: {
      icon: 'users',
      title: 'Altruistic Safety',
      desc: 'Contribute to or design community safety initiatives (e.g., neighborhood watch or disaster relief preparedness).',
      cta: 'Serve Community',
    },
    banner: {
      headline: 'Safety as Stewardship',
      quote: '"The believer is like a wall for another believer; one part supports the other." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 2446)',
    },
  },

  social: {
    mastery: 25,
    quote: '"The best of you are those with the best character." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 3559)',
    description:
      'Cultivate noble character (Akhlaq) from foundational etiquette to exemplary leadership. Social presence is the outward expression of inner refinement.',
    necessity: {
      icon: 'handshake',
      title: 'Basic Etiquette (Adab)',
      desc: 'Uphold foundational manners and fulfill basic social obligations to family and neighbors.',
      cta: 'Review Adab',
    },
    growth: {
      icon: 'eye',
      title: 'Integrity & Trust',
      desc: 'Build a reputation for honesty and reliability in all professional and personal dealings.',
      cta: 'Build Trust',
    },
    excellence: {
      icon: 'crown',
      title: 'Exemplary Representation',
      desc: 'Serve as a mentor or community leader, modeling Ihsan (excellence) in every social interaction.',
      cta: 'Lead by Example',
    },
    banner: {
      headline: 'Character is Your Legacy',
      quote: '"Nothing is heavier on the scales of a believer on the Day of Judgment than good character." \u2014 Prophet Muhammad \uFDFA (Sunan Abu Dawud 4799)',
    },
  },
};

// Dashboard content for the 4 Intellect (Hifz al-'Aql) submodule pages
export const INTELLECT_DASHBOARD_DATA = {
  learning: {
    mastery: 40,
    quote: '"Read! In the name of your Lord who created." \u2014 Qur\u2019an 96:1',
    description:
      'The pursuit of knowledge is a sacred obligation. Build foundational literacy, commit to continuous education, and aspire to leave an intellectual legacy.',
    necessity: {
      icon: 'lock',
      title: 'Foundational Competency',
      desc: 'Attain functional literacy and numeracy required for daily life and worship.',
      cta: 'Assess Foundations',
    },
    growth: {
      icon: 'expand_circle_up',
      title: 'Continuous Education',
      desc: 'Dedicate time weekly to learning a new skill or deepening existing knowledge.',
      cta: 'Plan Learning',
    },
    excellence: {
      icon: 'crown',
      title: 'Intellectual Legacy',
      desc: 'Author a piece of work or mentor others to pass on specialized knowledge.',
      cta: 'Build Legacy',
    },
    banner: {
      headline: 'Knowledge is Light',
      quote: '"Seeking knowledge is an obligation upon every Muslim." \u2014 Prophet Muhammad \uFDFA (Sunan Ibn Majah 224)',
    },
  },

  thinking: {
    mastery: 30,
    quote: '"Do they not reflect upon the Qur\u2019an, or are there locks upon their hearts?" \u2014 Qur\u2019an 47:24',
    description:
      'Sharpen the faculty of reason through verification, logic, and visionary insight. A disciplined mind is a protected mind.',
    necessity: {
      icon: 'shield',
      title: 'Veracity & Truth-Seeking',
      desc: 'Verify the source and accuracy of information before accepting or sharing it.',
      cta: 'Start Verification',
    },
    growth: {
      icon: 'eye',
      title: 'Logic & Reasoning',
      desc: 'Study foundational logic or frameworks to identify biases and improve decision-making.',
      cta: 'Study Frameworks',
    },
    excellence: {
      icon: 'stars',
      title: 'Visionary Insight',
      desc: 'Apply cross-disciplinary knowledge to solve complex, high-impact problems.',
      cta: 'Expand Vision',
    },
    banner: {
      headline: 'Think Deeply, Act Wisely',
      quote: '"The people of understanding are those who reflect on the creation of the heavens and earth." \u2014 Qur\u2019an 3:190',
    },
  },

  cognitive: {
    mastery: 25,
    quote: '"Verily, the hearing, the sight, and the heart \u2014 about all those one will be questioned." \u2014 Qur\u2019an 17:36',
    description:
      'Guard the mind from harmful inputs and cultivate deep focus. Cognitive integrity is the foundation upon which all intellectual achievement rests.',
    necessity: {
      icon: 'shield',
      title: 'Protection of the Mind',
      desc: 'Proactively seek intellectual nourishment and avoid inputs that dull or intoxicate the mind.',
      cta: 'Audit Inputs',
    },
    growth: {
      icon: 'eye',
      title: 'Focus & Attention',
      desc: 'Implement "Deep Work" sessions to build the capacity for sustained concentration.',
      cta: 'Build Focus',
    },
    excellence: {
      icon: 'crown',
      title: 'Mastery of Flow',
      desc: 'Achieve a state of high-level intuitive insight through disciplined mental practice.',
      cta: 'Master Flow',
    },
    banner: {
      headline: 'Guard What Enters the Mind',
      quote: '"The intelligent person is the one who holds himself accountable and works for what comes after death." \u2014 Prophet Muhammad \uFDFA (Jami at-Tirmidhi 2459)',
    },
  },

  professional: {
    mastery: 20,
    quote: '"Allah loves that when one of you does a task, they do it with excellence (Itqan)." \u2014 Prophet Muhammad \uFDFA (al-Tabarani, al-Mu\u2019jam al-Awsat 897)',
    description:
      'Pursue ethical craftsmanship in your profession. From foundational certifications to industry leadership, professional mastery is an act of worship.',
    necessity: {
      icon: 'lock',
      title: 'Ethical Craftsmanship',
      desc: 'Gain the basic certifications or skills required to perform your current job ethically.',
      cta: 'Review Skills',
    },
    growth: {
      icon: 'expand_circle_up',
      title: 'Specialized Expertise',
      desc: 'Pursue advanced training to become a "Subject Matter Expert" in your chosen field.',
      cta: 'Deepen Expertise',
    },
    excellence: {
      icon: 'stars',
      title: 'Industry Leadership',
      desc: 'Innovate within your craft to set new standards of excellence and social benefit.',
      cta: 'Lead Innovation',
    },
    banner: {
      headline: 'Excellence in Every Craft',
      quote: '"The best of people are those most beneficial to people." \u2014 Prophet Muhammad \uFDFA (al-Tabarani, al-Mu\u2019jam al-Awsat 5787)',
    },
  },
};

// Dashboard content for the 4 Family (Hifz al-Nasl) submodule pages
export const FAMILY_DASHBOARD_DATA = {
  marriage: {
    mastery: 40,
    quote: '"And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them." \u2014 Qur\u2019an 30:21',
    description:
      'The marriage bond is the cornerstone of family life. Build it on a legal and ethical foundation, nurture it with intentional quality time, and elevate it into a shared spiritual partnership.',
    necessity: {
      icon: 'lock',
      title: 'Legal & Ethical Union',
      desc: 'Ensure the marriage contract is valid and basic rights (maintenance/kindness) are met.',
      cta: 'Review Foundation',
    },
    growth: {
      icon: 'heart',
      title: 'Emotional Tranquility (Sakina)',
      desc: 'Dedicate weekly "quality time" to strengthen the bond and resolve conflicts constructively.',
      cta: 'Strengthen Bond',
    },
    excellence: {
      icon: 'stars',
      title: 'Partnership in Virtue',
      desc: 'Collaborate on a shared spiritual or service project to leave a collective legacy.',
      cta: 'Plan Together',
    },
    banner: {
      headline: 'The Sacred Bond',
      quote: '"They are a garment for you and you are a garment for them." \u2014 Qur\u2019an 2:187',
    },
  },

  parenting: {
    mastery: 30,
    quote: '"Every one of you is a shepherd and every one of you is responsible for his flock." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 7138)',
    description:
      'Parenting is a sacred trust (amanah). Provide for your children\u2019s basic needs, invest in their holistic education, and mentor them to become leaders who contribute to the wider community.',
    necessity: {
      icon: 'shield',
      title: 'Basic Provision & Safety',
      desc: 'Provide food, shelter, and a safe environment for physical and moral development.',
      cta: 'Review Basics',
    },
    growth: {
      icon: 'book_open',
      title: 'Holistic Tarbiyah (Education)',
      desc: 'Implement a structured learning plan for character (Adab), faith, and life skills.',
      cta: 'Plan Education',
    },
    excellence: {
      icon: 'crown',
      title: 'Intergenerational Wisdom',
      desc: 'Mentor the next generation to become leaders who contribute to the wider community.',
      cta: 'Mentor Leaders',
    },
    banner: {
      headline: 'Raising the Next Generation',
      quote: '"O you who believe, protect yourselves and your families from a Fire." \u2014 Qur\u2019an 66:6',
    },
  },

  kinship: {
    mastery: 25,
    quote: '"Whoever believes in Allah and the Last Day, let him maintain the ties of kinship." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 6138)',
    description:
      'Maintaining ties of kinship (Silat al-Rahim) is a sacred obligation. From regular contact with relatives to proactive family support, kinship networks preserve identity and heritage across generations.',
    necessity: {
      icon: 'handshake',
      title: 'Maintaining Ties (Silat al-Rahim)',
      desc: 'Maintain regular contact and provide basic support to parents and close relatives.',
      cta: 'Review Ties',
    },
    growth: {
      icon: 'users',
      title: 'Proactive Support',
      desc: 'Initiate regular family gatherings or a "Family Fund" to assist relatives during transitions.',
      cta: 'Organize Support',
    },
    excellence: {
      icon: 'scroll',
      title: 'Ancestral Honor',
      desc: 'Document family history and values to preserve the identity and heritage of the lineage.',
      cta: 'Preserve Legacy',
    },
    banner: {
      headline: 'The Bonds of Kinship',
      quote: '"The one who severs the ties of kinship will not enter Paradise." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 5984, Sahih Muslim 2556)',
    },
  },

  home: {
    mastery: 20,
    quote: '"And Allah has made for you from your homes a place of rest." \u2014 Qur\u2019an 16:80',
    description:
      'The home is a sanctuary \u2014 a place of prayer, peace, and purpose. Establish it on sanctity, curate a wholesome atmosphere, and transform it into a hub for community gathering and hospitality.',
    necessity: {
      icon: 'lock',
      title: 'Sanctity of the Home',
      desc: 'Establish the home as a place of prayer, safety, and basic order.',
      cta: 'Assess Home',
    },
    growth: {
      icon: 'eye',
      title: 'Wholesome Atmosphere',
      desc: 'Curate the media, aesthetics, and social circles allowed in the home to foster peace.',
      cta: 'Curate Environment',
    },
    excellence: {
      icon: 'door_open',
      title: 'The Open House (Hospitality)',
      desc: 'Transform the home into a hub for community gathering, learning, or hospitality.',
      cta: 'Open Doors',
    },
    banner: {
      headline: 'Home as Sanctuary',
      quote: '"Do not make your houses into graves; rather pray in them." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 432, Sahih Muslim 777)',
    },
  },
};

// Dashboard content for the 4 Wealth (Hifz al-Mal) submodule pages
export const WEALTH_DASHBOARD_DATA = {
  earning: {
    mastery: 35,
    quote: '"No one eats better food than that which he eats from the work of his own hands." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 2072)',
    description:
      'Halal provision is the foundation of all wealth. Ensure your livelihood is ethically sound, cultivate diverse revenue streams for stability, and create opportunities that elevate others.',
    necessity: {
      icon: 'lock',
      title: 'Halal Income',
      desc: 'Ensure your primary livelihood is ethically sound and completely free from impermissible industries.',
      cta: 'Audit Income',
    },
    growth: {
      icon: 'expand_circle_up',
      title: 'Value Expansion',
      desc: 'Cultivate high-income skills or diversified revenue streams to achieve lasting financial stability.',
      cta: 'Grow Revenue',
    },
    excellence: {
      icon: 'crown',
      title: 'Economic Empowerment',
      desc: 'Create ethical employment opportunities or mentorship programs that elevate the livelihoods of others.',
      cta: 'Empower Others',
    },
    banner: {
      headline: 'The Blessing of Halal Rizq',
      quote: '"O you who believe, eat from the good things which We have provided for you." \u2014 Qur\u2019an 2:172',
    },
  },

  financial: {
    mastery: 25,
    quote: '"Wealth is not in having many possessions, but wealth is in the richness of the soul." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 6446, Sahih Muslim 1051)',
    description:
      'Financial purity goes beyond earning \u2014 it encompasses how you manage, save, and grow your wealth. Transition to interest-free systems, build resilience, and optimize for ethical growth.',
    necessity: {
      icon: 'shield',
      title: 'Financial Purity',
      desc: 'Transition to interest-free accounts and proactively eliminate all high-interest consumer debt.',
      cta: 'Purify Finances',
    },
    growth: {
      icon: 'activity',
      title: 'Future Resilience',
      desc: 'Fully fund a 6-month emergency reserve and establish a foundational, Shariah-compliant investment portfolio.',
      cta: 'Build Reserve',
    },
    excellence: {
      icon: 'stars',
      title: 'Wealth Optimization',
      desc: 'Utilize advanced ethical financial planning to maximize asset growth while strictly adhering to Islamic principles.',
      cta: 'Optimize Growth',
    },
    banner: {
      headline: 'Master Your Finances',
      quote: '"Take from their wealth a charity by which you purify them and cause them increase." \u2014 Qur\u2019an 9:103',
    },
  },

  ownership: {
    mastery: 20,
    quote: '"Verily, Allah has prescribed excellence (Ihsan) in all things." \u2014 Prophet Muhammad \uFDFA (Sahih Muslim 1955)',
    description:
      'Protecting property rights and ensuring clarity in all dealings is a Maqasid imperative. From documenting assets to establishing generational governance, ownership is a trust (amanah).',
    necessity: {
      icon: 'lock',
      title: 'Protection of Heirs',
      desc: 'Draft a legally sound Will (Wasiyyah) and verify that all major assets have clear, documented titles.',
      cta: 'Review Will',
    },
    growth: {
      icon: 'eye',
      title: 'Transparent Dealings',
      desc: 'Audit all business and personal contracts to ensure complete clarity and eliminate any ambiguity (Gharar).',
      cta: 'Audit Contracts',
    },
    excellence: {
      icon: 'scroll',
      title: 'Generational Legacy',
      desc: 'Establish a Family Trust or comprehensive estate plan to secure multi-generational stability and ethical governance.',
      cta: 'Plan Legacy',
    },
    banner: {
      headline: 'Wealth as Amanah',
      quote: '"And do not consume one another\u2019s wealth unjustly." \u2014 Qur\u2019an 2:188',
    },
  },

  circulation: {
    mastery: 15,
    quote: '"The upper hand (the giving hand) is better than the lower hand (the receiving hand)." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 1427, Sahih Muslim 1033)',
    description:
      'Wealth must circulate to generate barakah. From mandatory Zakah to voluntary Sadaqah and enduring Waqf, the circulation of wealth is the lifeblood of a just economy.',
    necessity: {
      icon: 'calculate',
      title: 'Mandatory Purification',
      desc: 'Accurately calculate and promptly distribute your annual Zakah obligations using a structured framework.',
      cta: 'Calculate Zakah',
    },
    growth: {
      icon: 'users',
      title: 'Community Circulation',
      desc: 'Direct a portion of investment capital toward local SMEs, fair-trade businesses, or community ventures.',
      cta: 'Invest Locally',
    },
    excellence: {
      icon: 'door_open',
      title: 'Infinite Return (Sadaqah Jariyah)',
      desc: 'Initiate or formally fund a Waqf (Endowment) to provide a permanent, self-sustaining social benefit.',
      cta: 'Establish Waqf',
    },
    banner: {
      headline: 'The Flow of Barakah',
      quote: '"That which you give in Zakah, seeking the face of Allah \u2014 those are the multipliers." \u2014 Qur\u2019an 30:39',
    },
  },
};

// Dashboard content for the 4 Environment (Hifz al-Bi'ah) submodule pages
export const ENVIRONMENT_DASHBOARD_DATA = {
  resource: {
    mastery: 30,
    quote: '"Eat and drink, but be not excessive. Indeed, He does not like those who commit excess." \u2014 Qur\u2019an 7:31',
    description:
      'Anti-extravagance (Israf) is a Quranic command. Begin by eliminating blatant waste of water and energy, upgrade to efficient systems, and transition toward renewable independence.',
    necessity: {
      icon: 'lock',
      title: 'Anti-Extravagance (Israf)',
      desc: 'Eliminate blatant waste of water (especially during wudu/showering) and turn off unused energy sources.',
      cta: 'Audit Usage',
    },
    growth: {
      icon: 'activity',
      title: 'Efficiency & Conservation',
      desc: 'Upgrade to energy-efficient lighting/appliances and implement a household water-saving routine.',
      cta: 'Upgrade Systems',
    },
    excellence: {
      icon: 'stars',
      title: 'Renewable Independence',
      desc: 'Transition your home or transportation to renewable energy sources (e.g., solar panels, EVs).',
      cta: 'Go Renewable',
    },
    banner: {
      headline: 'Stewards of Water & Energy',
      quote: '"Do not waste water even if you are at a running stream." \u2014 Prophet Muhammad \uFDFA (Sunan Ibn Majah 425)',
    },
  },

  waste: {
    mastery: 20,
    quote: '"Removing harm from the road is an act of charity (Sadaqah)." \u2014 Prophet Muhammad \uFDFA (Sahih Muslim 1009)',
    description:
      'Harm reduction (Darar) starts at home. From proper recycling to composting and zero-waste living, managing waste is an act of stewardship and worship.',
    necessity: {
      icon: 'shield',
      title: 'Harm Reduction (Darar)',
      desc: 'Adhere strictly to municipal recycling guidelines and safely dispose of toxic household chemicals.',
      cta: 'Review Disposal',
    },
    growth: {
      icon: 'eye',
      title: 'Conscious Consumption',
      desc: 'Phase out single-use plastics and establish a home composting system for organic waste.',
      cta: 'Reduce Waste',
    },
    excellence: {
      icon: 'crown',
      title: 'Zero-Waste Lifestyle',
      desc: 'Achieve a near-zero waste household and advocate for municipal or corporate waste accountability.',
      cta: 'Go Zero-Waste',
    },
    banner: {
      headline: 'Leave No Trace',
      quote: '"Cleanliness is half of faith." \u2014 Prophet Muhammad \uFDFA (Sahih Muslim 223)',
    },
  },

  ecosystem: {
    mastery: 15,
    quote: '"If the Hour is about to be established and one of you has a palm shoot in his hand, let him plant it." \u2014 Prophet Muhammad \uFDFA (Musnad Ahmad 12981)',
    description:
      'Respect for creation is fundamental to Islamic stewardship (Khilafah). Protect local biodiversity, nurture ecosystems, and participate in large-scale ecological restoration.',
    necessity: {
      icon: 'shield',
      title: 'Respect for Creation',
      desc: 'Avoid cruelty to animals and abstain from the unnecessary destruction of local flora/fauna.',
      cta: 'Assess Impact',
    },
    growth: {
      icon: 'users',
      title: 'Active Stewardship (Khilafah)',
      desc: 'Plant native species in your living space or community to support local pollinators and soil health.',
      cta: 'Plant & Nurture',
    },
    excellence: {
      icon: 'stars',
      title: 'Ecological Restoration',
      desc: 'Fund or actively participate in large-scale land rehabilitation or carbon sequestration projects.',
      cta: 'Restore Ecosystems',
    },
    banner: {
      headline: 'Guardians of the Earth',
      quote: '"The earth has been made for me a place of prayer and a means of purification." \u2014 Prophet Muhammad \uFDFA (Sahih al-Bukhari 335, Sahih Muslim 521)',
    },
  },

  sourcing: {
    mastery: 10,
    quote: '"Allah is Tayyib (pure/good) and He only accepts that which is Tayyib." \u2014 Prophet Muhammad \uFDFA (Sahih Muslim 1015)',
    description:
      'Ethical origins matter. From ensuring purchases are free from exploitation to building circular economy systems, sourcing with integrity is an act of justice and stewardship.',
    necessity: {
      icon: 'lock',
      title: 'Ethical Origins',
      desc: 'Ensure basic purchases (especially food and clothing) do not come from sources of gross environmental exploitation.',
      cta: 'Audit Sources',
    },
    growth: {
      icon: 'handshake',
      title: 'Sustainable Supply Chains',
      desc: 'Shift daily purchasing habits toward local, fair-trade, or regenerative agriculture sources.',
      cta: 'Source Ethically',
    },
    excellence: {
      icon: 'door_open',
      title: 'Circular Economy Innovation',
      desc: 'Invest in or build systems/businesses that operate on a closed-loop "circular" model where nothing is wasted.',
      cta: 'Build Circular',
    },
    banner: {
      headline: 'From Source to Soul',
      quote: '"And do not cause corruption on the earth after it has been set in order." \u2014 Qur\u2019an 7:56',
    },
  },
};
