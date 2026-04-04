// Islamic Governance Data — Module-centric adaptation of bbos-v4's stage-centric model
// Each module maps to 2 governing divine attributes, a dua, readiness check, and reflection

export const MODULE_ATTRS = {
  work: {
    attrs: [
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Excellence-Giver',
        body: 'Excellence in work is worship. Al-Muhsin perfects rather than merely fulfils. Every task completed with ihsan carries a quality that transcends the specification — it is work done as though God sees it, because He does.',
      },
      {
        name: 'Al-Wakil',
        name_ar: 'الوكيل',
        title: 'The Trustee',
        body: 'The outcomes belong to Al-Wakil. You do the work with excellence; He determines what it produces. Trusting God with outcomes is not passivity — it is the freedom to work without anxiety about results.',
      },
    ],
    dua: {
      title: 'Before Beginning Work',
      resumeTitle: 'Before Resuming Work',
      arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      trans: "Bismi Allāh, tawakkaltu ʿala Allāh, wa lā ḥawla wa lā quwwata illā bi-Allāh",
      meaning: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
      source: 'Sunan Abi Dawud 5094',
    },
    readiness: {
      frame: 'Al-Muhsin asks: are you bringing ihsan to this work, or just getting it done?',
      // Structured rows for interactive readiness check (6-bit binary key: M1 M2 M3 W1 W2 W3)
      rows: [
        {
          id: 'M1', attr: 'Al-Muhsin', attr_ar: 'الْمُحْسِن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Are you bringing ihsan to this work, or just getting it done?',
          governing: 'You approach the next task with the intention of excellence, not just completion.',
          notYet: 'You are rushing through tasks to clear the board rather than doing each one well.',
        },
        {
          id: 'M2', attr: 'Al-Muhsin',
          governing: 'The quality of your work holds your focus — not just whether the task gets done.',
          notYet: 'The work feels like an obligation to discharge rather than an act to offer.',
        },
        {
          id: 'M3', attr: 'Al-Muhsin',
          governing: 'You would redo this if it fell short — from genuine care, not perfectionism.',
          notYet: 'You are doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'W1', attr: 'Al-Wakil', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustee',
          attrFrame: 'Are you at peace with the fact that the outcomes belong to Allah?',
          governing: 'You have made your plan and are ready to trust Al-Wakil with the outcome.',
          notYet: 'Anxiety about results is driving your work more than devotion to the craft.',
        },
        {
          id: 'W2', attr: 'Al-Wakil',
          governing: 'The work is being offered as worship — the result is not the measure of the act.',
          notYet: 'You are distracted and have not yet settled into focused presence.',
        },
        {
          id: 'W3', attr: 'Al-Wakil',
          governing: 'You are present in this task, not braced against the outcome of the next.',
          notYet: 'The outcome carries so much weight you cannot yet be fully present to the work.',
        },
      ],
      // Flat arrays for backward compatibility with display-only ReadinessCheck
      governing: [
        'You approach the next task with the intention of excellence, not just completion.',
        'The quality of your work holds your focus — not just whether the task gets done.',
        'You would redo this if it fell short — from genuine care, not perfectionism.',
        'You have made your plan and are ready to trust Al-Wakil with the outcome.',
        'The work is being offered as worship — the result is not the measure of the act.',
        'You are present in this task, not braced against the outcome of the next.',
      ],
      notYet: [
        'You are rushing through tasks to clear the board rather than doing each one well.',
        'The work feels like an obligation to discharge rather than an act to offer.',
        'You are doing the minimum that will pass, not the most genuinely possible right now.',
        'Anxiety about results is driving your work more than devotion to the craft.',
        'You are distracted and have not yet settled into focused presence.',
        'The outcome carries so much weight you cannot yet be fully present to the work.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of today\'s work. Al-Wakil held the outcomes.',
      governing: [
        'You can point to at least one task where you chose quality over speed.',
        'You released attachment to an outcome that was not in your control.',
      ],
      notYet: [
        'You cut corners on something and justified it as efficiency.',
        'You are still carrying anxiety about a result that belongs to Al-Wakil.',
      ],
    },
  },

  money: {
    attrs: [
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'All provision comes from Ar-Razzaq. Financial stewardship means managing what He has entrusted, not hoarding what you fear losing. The believer earns with effort and trusts that sufficiency is already decreed.',
      },
      {
        name: 'Al-Hasib',
        name_ar: 'الحسيب',
        title: 'The Reckoner',
        body: 'Al-Hasib accounts for every transaction. Honest reckoning in finances is not just good practice — it is an act of worship. Every number must tell the truth, because He already knows the truth.',
      },
    ],
    dua: {
      title: 'Before Financial Decisions',
      resumeTitle: 'Before Resuming Financial Work',
      arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
      trans: "Allāhumma ikfinī bi-ḥalālika ʿan ḥarāmika wa aghninī bi-faḍlika ʿamman siwāk",
      meaning: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
      source: 'Jami at-Tirmidhi 3563',
    },
    readiness: {
      frame: 'Ar-Razzaq asks: are you managing His provision with honesty and gratitude?',
      governing: [
        'Your financial records reflect reality — no inflated numbers, no hidden expenses.',
        'You are making decisions from sufficiency, not from scarcity or greed.',
        'Every transaction you record serves a purpose beyond just tracking money.',
      ],
      notYet: [
        'You are delaying honest accounting because the numbers are uncomfortable.',
        'Financial anxiety is driving decisions that compromise your principles.',
        'You are treating money as yours to keep rather than a trust to steward.',
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq provided today\'s portion. Al-Hasib witnessed every transaction.',
      governing: [
        'Your financial dealings today were transparent and honest.',
        'You made at least one decision from trust in provision rather than fear of loss.',
      ],
      notYet: [
        'You avoided looking at a financial reality that needs your attention.',
        'You prioritized profit over principle in a decision today.',
      ],
    },
  },

  people: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Loving',
        body: 'Al-Wadud loves His creation with a love that precedes merit. Leading people with wadud means caring for their growth before their output, seeing their potential before their performance gaps.',
      },
      {
        name: 'Al-Adl',
        name_ar: 'العدل',
        title: 'The Just',
        body: 'Al-Adl establishes justice without partiality. Fair treatment of every team member — in compensation, recognition, and opportunity — is not generosity; it is the minimum standard of stewardship.',
      },
    ],
    dua: {
      title: 'Before Leading People',
      resumeTitle: 'Before Resuming Leadership',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: "Rabbi ishraḥ lī ṣadrī wa yassir lī amrī",
      meaning: 'My Lord, expand my chest and ease my task for me.',
      source: 'Surah Ta-Ha 20:25-26',
    },
    readiness: {
      frame: 'Al-Wadud asks: are you leading with genuine care, or managing with control?',
      governing: [
        'You see each team member as a person first, a resource second.',
        'Your decisions about people are guided by fairness, not favoritism.',
        'You are ready to have a difficult conversation with compassion and honesty.',
      ],
      notYet: [
        'You are avoiding a conversation because it is uncomfortable, not because the timing is wrong.',
        'You are treating someone differently based on how much you like them, not their merit.',
        'You have not checked in on someone who might be struggling.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud witnessed how you treated His servants today. Al-Adl measured the fairness.',
      governing: [
        'You invested in someone\'s growth today beyond what their role required.',
        'You made a fair decision even when it was easier to play favorites.',
      ],
      notYet: [
        'You overlooked someone who deserved recognition or attention.',
        'You let a power dynamic go unchecked that disadvantages someone.',
      ],
    },
  },

  office: {
    attrs: [
      {
        name: 'As-Sami',
        name_ar: 'السميع',
        title: 'The All-Hearing',
        body: 'As-Sami hears every word — spoken and unspoken. True communication begins with listening. Before you speak, write, or decide, have you truly heard what others are saying?',
      },
      {
        name: 'Al-Alim',
        name_ar: 'العليم',
        title: 'The All-Knowing',
        body: 'Al-Alim knows what is hidden and what is manifest. In organizational knowledge, this means documenting the truth, sharing information honestly, and never using knowledge as a tool of power over others.',
      },
    ],
    dua: {
      title: 'Before Communication',
      resumeTitle: 'Before Resuming Communication',
      arabic: 'رَبِّ زِدْنِي عِلْمًا',
      trans: "Rabbi zidnī ʿilmā",
      meaning: 'My Lord, increase me in knowledge.',
      source: 'Surah Ta-Ha 20:114',
    },
    readiness: {
      frame: 'As-Sami asks: are you truly listening, or just waiting for your turn to speak?',
      governing: [
        'You are prepared to listen before responding in your next conversation.',
        'The information you are about to share is accurate and serves others.',
        'Your communication today will build trust, not just transfer data.',
      ],
      notYet: [
        'You are preparing to speak without first understanding what others need.',
        'You are withholding information that others need to do their work.',
        'Your next message is driven by ego rather than service.',
      ],
    },
    reflection: {
      frame: 'As-Sami heard every word exchanged today. Al-Alim knows every intention behind them.',
      governing: [
        'You listened fully to someone before forming your response.',
        'You shared knowledge generously and accurately today.',
      ],
      notYet: [
        'You interrupted or dismissed someone when they needed to be heard.',
        'You used information as leverage rather than as a gift.',
      ],
    },
  },

  tech: {
    attrs: [
      {
        name: 'Al-Muhaymin',
        name_ar: 'المهيمن',
        title: 'The Guardian',
        body: 'Al-Muhaymin watches over and protects. Technical stewardship means guarding systems, data, and infrastructure with the same vigilance — every security measure is an act of amanah over what has been entrusted to you.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Protector',
        body: 'Al-Hafiz preserves what matters. In technology, this means protecting user data, maintaining system integrity, and building with durability rather than disposability.',
      },
    ],
    dua: {
      title: 'Before Technical Work',
      resumeTitle: 'Before Resuming Technical Work',
      arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
      trans: "Bismi Allāhi alladhī lā yaḍurru maʿa ismihi shayʾun fi al-arḍi wa lā fi as-samāʾi wa huwa as-Samīʿ al-ʿAlīm",
      meaning: 'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
      source: 'Sunan Abi Dawud 5088',
    },
    readiness: {
      frame: 'Al-Muhaymin asks: are you guarding what has been entrusted, or just building fast?',
      governing: [
        'Your systems protect the data and privacy of those who depend on them.',
        'You are building with integrity — choosing durability over shortcuts.',
        'You have reviewed the security posture before proceeding.',
      ],
      notYet: [
        'You are deploying without adequate testing because of time pressure.',
        'Security is an afterthought rather than a design principle.',
        'You are building to impress rather than to serve and protect.',
      ],
    },
    reflection: {
      frame: 'Al-Muhaymin watched over the systems today. Al-Hafiz preserved what mattered.',
      governing: [
        'You chose a secure approach even when a faster one was available.',
        'The systems you touched today are more reliable than when you started.',
      ],
      notYet: [
        'You introduced technical debt that you know will cost someone later.',
        'You left a vulnerability unaddressed because fixing it was inconvenient.',
      ],
    },
  },

  crm: {
    attrs: [
      {
        name: 'Ar-Rahman',
        name_ar: '\u0627\u0644\u0631\u062D\u0645\u0646',
        title: 'The Most Merciful',
        body: 'Ar-Rahman extends mercy to all creation without exception. In customer relationships, this means approaching every interaction \u2014 including difficult conversations and lost deals \u2014 with genuine care for the other person\u2019s wellbeing, not just their wallet.',
      },
      {
        name: 'Al-Karim',
        name_ar: '\u0627\u0644\u0643\u0631\u064A\u0645',
        title: 'The Generous',
        body: 'Al-Karim gives without being asked and without expecting return. In business, this means leading with value \u2014 giving before asking, serving before selling, and building relationships on genuine generosity rather than transactional exchange.',
      },
    ],
    dua: {
      title: 'Before Engaging Clients',
      resumeTitle: 'Before Resuming Client Work',
      arabic: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0625\u0650\u0646\u0651\u064E\u0627 \u0646\u064E\u0633\u0652\u0623\u064E\u0644\u064F\u0643\u064E \u0639\u0650\u0644\u0652\u0645\u064B\u0627 \u0646\u064E\u0627\u0641\u0650\u0639\u064B\u0627 \u0648\u064E\u0631\u0650\u0632\u0652\u0642\u064B\u0627 \u0637\u064E\u064A\u0651\u0650\u0628\u064B\u0627 \u0648\u064E\u0639\u064E\u0645\u064E\u0644\u064B\u0627 \u0645\u064F\u062A\u064E\u0642\u064E\u0628\u0651\u064E\u0644\u064B\u0627',
      trans: "All\u0101humma inn\u0101 nas\u02BCalu-ka \u02BFilman n\u0101fi\u02BFan, wa rizqan \u1E6Dayyiban, wa \u02BFamalan mutaqabbalan",
      meaning: 'O Allah, we ask You for beneficial knowledge, good provision, and accepted deeds.',
      source: 'Sunan Ibn Majah 925',
    },
    readiness: {
      frame: 'Ar-Rahman asks: are you approaching this relationship with genuine care, or with a transaction in mind?',
      governing: [
        'You are prepared to listen to what the client actually needs, not what you want to sell.',
        'You would give the same advice even if it meant losing the deal.',
        'Your follow-up is driven by care, not by quota pressure.',
      ],
      notYet: [
        'You are treating a person as a number on your pipeline board.',
        'You are about to promise something you are not certain you can deliver.',
        'Your urgency to close is overriding your honesty about fit.',
      ],
    },
    reflection: {
      frame: 'Ar-Rahman witnessed every client interaction today. Al-Karim measured the generosity.',
      governing: [
        'You prioritized a client\u2019s genuine need over a quick sale.',
        'You were transparent about limitations or timelines.',
      ],
      notYet: [
        'You avoided a hard conversation because it might cost you the deal.',
        'You overpromised to keep a prospect engaged.',
      ],
    },
  },
};

export const ONGOING_DUA = {
  title: 'During Work · Tawakkul',
  arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
  trans: "Ḥasbiya Allāhu lā ilāha illā huwa, ʿalayhi tawakkaltu, wa huwa Rabbu al-ʿArshi al-ʿAẓīm",
  meaning: 'Allah is sufficient for me. There is no god but He. In Him I place my trust, and He is the Lord of the Mighty Throne.',
  source: 'Surah At-Tawbah 9:129',
};

export const UNIVERSAL_EQUIV = {
  work: {
    principles: [
      { name: 'Excellence', body: 'Strive for mastery in every task. Excellence means doing work you would be proud to sign your name to — work that serves the recipient, not just the deadline.' },
      { name: 'Trust', body: 'Do your best work and release attachment to outcomes you cannot control. Sustainable productivity comes from focused effort, not anxious overwork.' },
    ],
    mindfulness: 'Take a moment to set your intention. What quality of work do you want to bring to this session?',
    resumeMindfulness: 'Welcome back. Take a breath and reconnect with your intention before continuing.',
    readiness: {
      frame: 'Are you bringing your best to this work, or just getting through it?',
      rows: [
        {
          id: 'M1', attr: 'Excellence', attrTitle: 'Craft & Intention',
          attrFrame: 'Are you bringing your best to this work, or just getting through it?',
          governing: 'You approach the next task with the intention of excellence, not just completion.',
          notYet: 'You are rushing through tasks to clear the board rather than doing each one well.',
        },
        {
          id: 'M2', attr: 'Excellence',
          governing: 'The quality of your work holds your focus — not just whether the task gets done.',
          notYet: 'The work feels like an obligation to discharge rather than something to take pride in.',
        },
        {
          id: 'M3', attr: 'Excellence',
          governing: 'You would redo this if it fell short — from genuine care, not compulsion.',
          notYet: 'You are doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'W1', attr: 'Trust', attrTitle: 'Presence & Release',
          attrFrame: 'Are you at peace with releasing what you cannot control?',
          governing: 'You have a clear plan and are ready to focus without distraction.',
          notYet: 'Anxiety about results is driving your work more than care for the craft.',
        },
        {
          id: 'W2', attr: 'Trust',
          governing: 'The work itself is the goal — not what it might produce.',
          notYet: 'You are distracted and have not yet settled into focused presence.',
        },
        {
          id: 'W3', attr: 'Trust',
          governing: 'You are present in this task, not bracing against the outcome of the next.',
          notYet: 'The outcome carries so much weight you cannot yet be fully present to the work.',
        },
      ],
      governing: [
        'You approach the next task with the intention of excellence, not just completion.',
        'The quality of your work holds your focus — not just whether the task gets done.',
        'You would redo this if it fell short — from genuine care, not compulsion.',
        'You have a clear plan and are ready to focus without distraction.',
        'The work itself is the goal — not what it might produce.',
        'You are present in this task, not bracing against the outcome of the next.',
      ],
      notYet: [
        'You are rushing through tasks to clear the board rather than doing each one well.',
        'The work feels like an obligation to discharge rather than something to take pride in.',
        'You are doing the minimum that will pass, not the most genuinely possible right now.',
        'Anxiety about results is driving your work more than care for the craft.',
        'You are distracted and have not yet settled into focused presence.',
        'The outcome carries so much weight you cannot yet be fully present to the work.',
      ],
    },
    reflection: {
      frame: 'Reflect on the quality and intention behind today\'s work.',
      governing: [
        'You can point to at least one task where you chose quality over speed.',
        'You released attachment to an outcome that was not in your control.',
      ],
      notYet: [
        'You cut corners on something and justified it as efficiency.',
        'You are still carrying anxiety about a result beyond your control.',
      ],
    },
  },
  money: {
    principles: [
      { name: 'Stewardship', body: 'Financial resources are entrusted to you for a purpose. Manage them with the same care you would bring to someone else\'s money — because, in a sense, it is.' },
      { name: 'Honest Reckoning', body: 'Every number must tell the truth. Transparent financial records are not just good practice — they are the foundation of trust with everyone who depends on your organization.' },
    ],
    mindfulness: 'Before making financial decisions, pause and ask: is this honest, transparent, and in service of long-term health?',
    resumeMindfulness: 'Welcome back. Reconnect with honest stewardship before continuing.',
    readiness: {
      frame: 'Are you managing resources with honesty and responsibility?',
      governing: ['Your financial records reflect reality.', 'You are making decisions from sufficiency, not scarcity.', 'Every transaction serves a clear purpose.'],
      notYet: ['You are delaying honest accounting.', 'Financial anxiety is driving compromised decisions.', 'You are treating resources as yours rather than a trust.'],
    },
    reflection: {
      frame: 'Reflect on today\'s financial decisions and their integrity.',
      governing: ['Your financial dealings were transparent and honest.', 'You made a decision from trust rather than fear.'],
      notYet: ['You avoided a financial reality that needs attention.', 'You prioritized profit over principle.'],
    },
  },
  people: {
    principles: [
      { name: 'Genuine Care', body: 'Leading people means caring for their growth before their output. See potential before performance gaps. Every person on your team is more than their role.' },
      { name: 'Fairness', body: 'Fair treatment in compensation, recognition, and opportunity is not generosity — it is the minimum standard of ethical leadership.' },
    ],
    mindfulness: 'Before engaging with your team, set the intention to listen fully and lead with fairness.',
    resumeMindfulness: 'Welcome back. Reconnect with genuine care before engaging with your team.',
    readiness: {
      frame: 'Are you leading with genuine care, or managing with control?',
      governing: ['You see each person as a person first.', 'Your decisions are guided by fairness.', 'You are ready for difficult conversations with compassion.'],
      notYet: ['You are avoiding a necessary conversation.', 'You are playing favorites.', 'You have not checked in on someone who may be struggling.'],
    },
    reflection: {
      frame: 'Reflect on how you treated people today.',
      governing: ['You invested in someone\'s growth beyond their role.', 'You made a fair decision even when favoritism was easier.'],
      notYet: ['You overlooked someone deserving recognition.', 'You let a power dynamic go unchecked.'],
    },
  },
  office: {
    principles: [
      { name: 'Deep Listening', body: 'True communication begins with listening. Before you speak, write, or decide, have you truly heard what others are saying — and what they are not saying?' },
      { name: 'Knowledge Sharing', body: 'Information hoarded is knowledge wasted. Share generously, document accurately, and never use information as a tool of power.' },
    ],
    mindfulness: 'Before communicating, pause and listen. What does the other person actually need?',
    resumeMindfulness: 'Welcome back. Center yourself in listening before communicating.',
    readiness: {
      frame: 'Are you truly listening, or just waiting to speak?',
      governing: ['You are prepared to listen before responding.', 'The information you share is accurate and serves others.', 'Your communication builds trust.'],
      notYet: ['You are preparing to speak without understanding.', 'You are withholding information others need.', 'Your next message is driven by ego.'],
    },
    reflection: {
      frame: 'Reflect on the quality of today\'s communication.',
      governing: ['You listened fully before responding.', 'You shared knowledge generously.'],
      notYet: ['You dismissed someone who needed to be heard.', 'You used information as leverage.'],
    },
  },
  tech: {
    principles: [
      { name: 'Vigilant Guardianship', body: 'Technical stewardship means guarding systems, data, and infrastructure with vigilance. Every security measure is an act of responsibility over what has been entrusted to you.' },
      { name: 'Durable Building', body: 'Build with durability rather than disposability. Protect user data, maintain system integrity, and choose the reliable path over the expedient one.' },
    ],
    mindfulness: 'Before technical work, consider: am I building to last, or just building fast?',
    resumeMindfulness: 'Welcome back. Reconnect with careful guardianship before building.',
    readiness: {
      frame: 'Are you guarding what has been entrusted, or just shipping quickly?',
      governing: ['Your systems protect data and privacy.', 'You are building with integrity.', 'You have reviewed security before proceeding.'],
      notYet: ['You are deploying without adequate testing.', 'Security is an afterthought.', 'You are building to impress rather than to serve.'],
    },
    reflection: {
      frame: 'Reflect on today\'s technical decisions and their durability.',
      governing: ['You chose a secure approach over a faster one.', 'Systems you touched are more reliable now.'],
      notYet: ['You introduced technical debt knowingly.', 'You left a vulnerability unaddressed.'],
    },
  },
  crm: {
    principles: [
      { name: 'Genuine Care', body: 'Approach every client relationship with authentic interest in their success, not just your revenue. The best business relationships are built on mutual benefit.' },
      { name: 'Generous Value', body: 'Lead with value before asking for anything in return. Give freely of your expertise and attention. Trust that generosity creates lasting partnerships.' },
    ],
    mindfulness: 'Before engaging with a client or prospect, pause and ask: am I serving their genuine interest, or just pursuing the sale?',
    resumeMindfulness: 'Welcome back. Reconnect with genuine care before engaging with clients.',
    readiness: {
      frame: 'Are you approaching this relationship with authentic care?',
      governing: ['You are prepared to listen to what the client actually needs.', 'You would give honest advice even if it costs you the deal.', 'Your follow-up is driven by care, not pressure.'],
      notYet: ['You are treating a person as a number.', 'You are about to overpromise.', 'Your urgency to close is overriding honesty.'],
    },
    reflection: {
      frame: 'Reflect on how you treated clients today.',
      governing: ['You prioritized a genuine need over a quick sale.', 'You were transparent about limitations.'],
      notYet: ['You avoided a hard conversation to protect the deal.', 'You overpromised to keep a prospect engaged.'],
    },
  },
};

export const ONGOING_UNIVERSAL = {
  title: 'During Work · Presence',
  meaning: 'I am present. I bring my full attention and care to this moment. The quality of my work reflects the quality of my intention.',
};

export function getModuleData(moduleId, valuesLayer) {
  if (valuesLayer === 'islamic') return MODULE_ATTRS[moduleId] || null;
  return UNIVERSAL_EQUIV[moduleId] || null;
}

// ── Pause Protocol ──
// The Istirja' is not an exit prayer — it is a return gesture.
// Using it here signals that the operator is returning this moment
// to Allah rather than forcing entry. The system honors the honesty.

export const ISTIRJA = {
  arabic: '\u0625\u0650\u0646\u0651\u064E\u0627 \u0644\u0650\u0644\u0651\u064E\u0670\u0647\u0650 \u0648\u064E\u0625\u0650\u0646\u0651\u064E\u0627 \u0625\u0650\u0644\u064E\u064A\u0652\u0647\u0650 \u0631\u064E\u0627\u062C\u0650\u0639\u064F\u0648\u0646\u064E',
  trans: "Inn\u0101 lill\u0101hi wa inn\u0101 ilayhi r\u0101ji\u02BF\u016Bn",
  meaning: 'Indeed, we belong to Allah, and indeed to Him we shall return.',
  source: 'Al-Baqarah 2:156',
  note: 'This \u0101yah is recited at moments of loss and interruption \u2014 returning what cannot yet be carried back to the One who holds it.',
};

export const PAUSE_ACKNOWLEDGMENT = 'Recognizing this is itself an act of mu\u1E25\u0101sabah. The stage will hold.';

// Module-specific pause reflection questions — drawn from the "not yet rested in" column
export const PAUSE_QUESTIONS = {
  work: 'What is pulling your attention away from the craft right now \u2014 and can it be set down, or does it need to be addressed first?',
  money: 'What financial truth are you avoiding right now \u2014 and what would it cost to face it honestly before proceeding?',
  people: 'Who have you been avoiding, and is the avoidance protecting them or protecting you?',
  office: 'What are you about to say that you have not yet fully listened to \u2014 and what would change if you heard it first?',
  tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
  crm: 'Are you approaching this relationship with genuine care \u2014 or is the transaction driving the interaction?',
};

// Universal equivalents for the pause protocol
export const PAUSE_UNIVERSAL = {
  acknowledgment: 'Recognizing this pause is itself an act of honest self-assessment. The work will hold.',
  reflection: 'Take a moment of stillness. What needs your attention before you can be fully present here?',
  questions: {
    work: 'What is pulling your attention away from the craft right now \u2014 and can it be set down, or does it need to be addressed first?',
    money: 'What financial reality are you avoiding \u2014 and what would it cost to face it honestly?',
    people: 'Who have you been avoiding, and is the avoidance protecting them or protecting you?',
    office: 'What are you about to say that you have not yet fully listened to?',
    tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
    crm: 'Are you approaching this relationship with genuine care \u2014 or is the transaction driving the interaction?',
  },
};

// ── Compassionate Defer ──
// The defer is an act of integrity, not failure.
// The system values the person, not just their output.

export const DEFER_CONTENT = {
  acknowledgment: 'Recognizing you are not yet ready is itself an act of integrity. This is not failure \u2014 it is mu\u1E25\u0101sabah.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  getGuidanceQuestion: (moduleId) => {
    return PAUSE_QUESTIONS[moduleId] || PAUSE_QUESTIONS.work;
  },
};

export const DEFER_UNIVERSAL = {
  acknowledgment: 'Recognizing you are not yet ready is an honest act of self-awareness. This is not failure.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  reflection: 'Trust the timing. What needs your attention will still be here \u2014 and so will this work, when you are ready for it.',
  getGuidanceQuestion: (moduleId) => {
    return PAUSE_UNIVERSAL.questions[moduleId] || PAUSE_UNIVERSAL.questions.work;
  },
};

// ── Presence Awareness Config ──
export const PRESENCE_CONFIG = {
  INACTIVITY_TIMEOUT_MS: 20 * 60 * 1000,  // 20 minutes
  PRAYER_LEAD_MS: 5 * 60 * 1000,          // 5 minutes before prayer
  PRAYER_TRAIL_MS: 10 * 60 * 1000,        // 10 minutes after prayer
  PRAYER_WARNING_LEAD_MS: 15 * 60 * 1000, // 15 minutes before prayer (warning notification)
};
