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

  collective: {
    attrs: [
      {
        name: 'Al-Khaliq',
        name_ar: 'الخالق',
        title: 'The Creator',
        body: 'Al-Khaliq brought the earth into being with purpose and precision. Every acre of land, every watershed, every soil microbiome exists by His design. To steward land is to participate in the ongoing expression of His creative will — not as owner, but as khalīfah entrusted with what He made.',
      },
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'Ar-Razzaq provides through the earth itself — rain becomes river, seed becomes harvest, land becomes sustenance. A faith-rooted land project is an act of trust in His provision: plant with effort, tend with care, and know that the yield belongs to Him.',
      },
    ],
    dua: {
      title: 'Before Engaging with the Land',
      resumeTitle: 'Before Returning to the Land',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
      trans: "Allāhumma innī as'aluka ʿilman nāfiʿan wa rizqan ṭayyiban wa ʿamalan mutaqabbalan",
      meaning: 'O Allah, I ask You for beneficial knowledge, wholesome provision, and accepted deeds.',
      source: 'Sunan Ibn Majah 925',
    },
    readiness: {
      frame: 'Al-Khaliq asks: are you approaching this land as a steward or as an owner?',
      governing: [
        'You see the land as a trust from Allah, not as a personal asset.',
        'Your intentions for this work serve the community, not just your ambition.',
        'You are prepared to build slowly, with patience, rather than rush for visible results.',
      ],
      notYet: [
        'You are treating this project as a personal brand rather than a collective stewardship.',
        'Impatience for visible progress is overriding the discipline of doing it right.',
        'You have not yet settled into the reality that this work may outlast you — and that is the point.',
      ],
    },
    reflection: {
      frame: 'Al-Khaliq witnessed today\'s stewardship. Ar-Razzaq held the provision.',
      governing: [
        'You made a decision today that prioritised the land\'s long-term health over short-term convenience.',
        'You approached the community\'s needs with the same care you would give your own family.',
      ],
      notYet: [
        'You cut a corner on quality because no one was watching.',
        'You prioritised speed or cost over what was genuinely right for the land or the people.',
      ],
    },
  },

  // ─── Pillar-level readiness entries ────────────────────────────────────────
  // Keyed by pillar ID. Used when a sub-module has no own interactive rows.
  // ThresholdModal falls back to these via getPillarForModule(moduleId).

  faith: {
    attrs: [
      {
        name: 'Al-Mutakabbir',
        name_ar: 'الْمُتَكَبِّر',
        title: 'The Supremely Great',
        body: 'Greatness belongs to Allah alone. Al-Mutakabbir dissolves the subtle inflations of pride — performing worship for recognition, measuring devotion against others, approaching knowledge as acquisition rather than gift. Pride corrupts Faith not through dramatic arrogance but through these interior distortions.',
      },
      {
        name: 'Al-Wakīl',
        name_ar: 'الْوَكِيل',
        title: 'The Trustworthy Disposer',
        body: 'Al-Wakīl asks for action taken without the anxiety of needing to control the result. Doubt erodes Faith not primarily through intellectual objection but through the refusal to release outcomes. The operator who acts but cannot release is still holding what should be entrusted.',
      },
    ],
    dua: {
      title: 'Before Faith Engagement',
      resumeTitle: 'Before Resuming Faith Work',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: 'Rabbi ishraḥ lī ṣadrī wa yassir lī amrī',
      meaning: 'My Lord, expand for me my breast [with assurance] and ease for me my task.',
      source: 'Surah Ta-Ha 20:25-26',
    },
    readiness: {
      frame: 'Al-Mutakabbir asks: am I approaching this as a servant before Allah, or has self-importance entered the act?',
      rows: [
        {
          id: 'M1', attr: 'Al-Mutakabbir', attr_ar: 'الْمُتَكَبِّر', attrTitle: 'The Supremely Great',
          attrFrame: 'Am I approaching this as a servant before Allah, or has my sense of self-importance entered the act?',
          governing: 'I am entering this practice aware that I am the one in need — He needs nothing from me.',
          notYet: 'I am conscious of how my practice reflects on me, and that consciousness is shaping it.',
        },
        {
          id: 'M2', attr: 'Al-Mutakabbir',
          governing: 'My worship is between me and Allah — I am not seeking witness or validation from anyone.',
          notYet: 'I am comparing my level of practice or knowledge with others, measuring my standing.',
        },
        {
          id: 'M3', attr: 'Al-Mutakabbir',
          governing: 'I am holding my spiritual state honestly — I am not inflating or performing it, even inwardly.',
          notYet: 'I am approaching this with a sense of entitlement — as though my prior devotion obliges a response.',
        },
        {
          id: 'M4', attr: 'Al-Mutakabbir',
          governing: 'I can receive correction in matters of faith without my sense of self being threatened by it.',
          notYet: 'I am holding a position in a matter of faith more tightly than the evidence warrants, because changing it feels like a loss.',
        },
        {
          id: 'W1', attr: 'Al-Wakīl', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Am I acting and releasing, or am I acting and still holding the outcome?',
          governing: 'I am acting from niyyah and releasing the outcome — the result is not mine to control.',
          notYet: 'I am going through the act but the outcome is still held in my hands rather than entrusted.',
        },
        {
          id: 'W2', attr: 'Al-Wakīl',
          governing: 'I am present enough in this act to actually turn toward Allah — not just to perform the gesture of turning.',
          notYet: 'I am fulfilling the form while my attention is elsewhere — or I am acting to resolve anxiety rather than out of genuine trust.',
        },
      ],
      governing: [
        'I am entering this practice aware that I am the one in need — He needs nothing from me.',
        'My worship is between me and Allah — I am not seeking witness or validation from anyone.',
        'I am holding my spiritual state honestly — I am not inflating or performing it, even inwardly.',
        'I can receive correction in matters of faith without my sense of self being threatened by it.',
        'I am acting from niyyah and releasing the outcome — the result is not mine to control.',
        'I am present enough in this act to actually turn toward Allah — not just to perform the gesture of turning.',
      ],
      notYet: [
        'I am conscious of how my practice reflects on me, and that consciousness is shaping it.',
        'I am comparing my level of practice or knowledge with others, measuring my standing.',
        'I am approaching this with a sense of entitlement — as though my prior devotion obliges a response.',
        'I am holding a position in a matter of faith more tightly than the evidence warrants, because changing it feels like a loss.',
        'I am going through the act but the outcome is still held in my hands rather than entrusted.',
        'I am fulfilling the form while my attention is elsewhere — or I am acting to resolve anxiety rather than out of genuine trust.',
      ],
    },
    reflection: {
      frame: 'Al-Mutakabbir reminded me today that greatness belongs to Him. Al-Wakīl held what I released.',
      governing: [
        'I entered at least one act of worship with genuine servant-awareness, not self-consciousness.',
        'I released an outcome I was holding rather than entrusting.',
      ],
      notYet: [
        'I performed a practice with part of my attention on how it reflected on me.',
        'I am still holding an outcome that belongs to Al-Wakīl.',
      ],
    },
  },

  life: {
    attrs: [
      {
        name: 'Al-Qawī',
        name_ar: 'الْقَوِيّ',
        title: 'The All-Strong',
        body: 'Strength that does not break under pressure. Al-Qawī is not rigidity — it is the capacity to meet adversity without being unmade by it. Its absence shows in quiet attrition: the gradual shrinking of the self under accumulated demand. Al-Qawī asks whether you are drawing from a renewable source or depleting what you have not replenished.',
      },
      {
        name: 'Al-Laṭīf',
        name_ar: 'اللَّطِيف',
        title: 'The Subtly Kind',
        body: 'Attentiveness so fine it perceives what is needed before neglect takes hold. Al-Laṭīf is not softness — it is the quality of perception that notices the subtle signal before it becomes a crisis. Its absence shows in the accumulation of small unattended needs: the rest not taken, the conversation not had, the inner state not named.',
      },
    ],
    dua: {
      title: 'Before Life Domain Engagement',
      resumeTitle: 'Before Resuming Life Stewardship',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
      trans: "Allāhumma innī aʿūdhu bika min al-hammi wal-ḥazani wa aʿūdhu bika min al-ʿajzi wal-kasali",
      meaning: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from incapacity and laziness.',
      source: 'Sahih al-Bukhari 6369',
    },
    readiness: {
      frame: 'Al-Qawī asks: am I engaging from sustained strength, or from depletion I have not acknowledged?',
      rows: [
        {
          id: 'Q1', attr: 'Al-Qawī', attr_ar: 'الْقَوِيّ', attrTitle: 'The All-Strong',
          attrFrame: 'Am I engaging from a place of sustained strength, or from depletion I have not acknowledged?',
          governing: 'I am entering this from a foundation that has been attended to — I am not running on reserves I have not acknowledged.',
          notYet: 'I am carrying a depletion I have not named, and proceeding as if the deficit does not exist.',
        },
        {
          id: 'Q2', attr: 'Al-Qawī',
          governing: 'I am meeting the demands of this domain without suppressing what is genuinely difficult about them.',
          notYet: 'I am managing through rather than attending to — treating challenge as something to get past rather than something to meet honestly.',
        },
        {
          id: 'Q3', attr: 'Al-Qawī',
          governing: 'I am drawing from a source that is being replenished — rest, connection, surrender — not only expending.',
          notYet: 'I am operating primarily on discipline and willpower without attending to what sustains those capacities.',
        },
        {
          id: 'L1', attr: 'Al-Laṭīf', attr_ar: 'اللَّطِيف', attrTitle: 'The Subtly Kind',
          attrFrame: 'Am I attending to what is actually present in me right now, or have I stopped noticing?',
          governing: 'I am present enough to notice what is actually needed right now — not what the schedule requires, but what is true.',
          notYet: 'I am proceeding on habit and routine without checking whether what I am doing is what I actually need.',
        },
        {
          id: 'L2', attr: 'Al-Laṭīf',
          governing: 'I am attending to the signals my body, mind, and heart are giving — I have not overridden them to maintain productivity.',
          notYet: 'I am aware of a signal — fatigue, strain, resistance — and I have chosen to treat it as noise rather than information.',
        },
        {
          id: 'L3', attr: 'Al-Laṭīf',
          governing: 'I am holding the needs of those in my care with the same attentiveness I bring to external demands.',
          notYet: 'I am giving those closest to me what remains after external demands are met, rather than what is genuinely due.',
        },
      ],
      governing: [
        'I am entering this from a foundation that has been attended to — I am not running on reserves I have not acknowledged.',
        'I am meeting the demands of this domain without suppressing what is genuinely difficult about them.',
        'I am drawing from a source that is being replenished — rest, connection, surrender — not only expending.',
        'I am present enough to notice what is actually needed right now — not what the schedule requires, but what is true.',
        'I am attending to the signals my body, mind, and heart are giving — I have not overridden them to maintain productivity.',
        'I am holding the needs of those in my care with the same attentiveness I bring to external demands.',
      ],
      notYet: [
        'I am carrying a depletion I have not named, and proceeding as if the deficit does not exist.',
        'I am managing through rather than attending to — treating challenge as something to get past rather than something to meet honestly.',
        'I am operating primarily on discipline and willpower without attending to what sustains those capacities.',
        'I am proceeding on habit and routine without checking whether what I am doing is what I actually need.',
        'I am aware of a signal — fatigue, strain, resistance — and I have chosen to treat it as noise rather than information.',
        'I am giving those closest to me what remains after external demands are met, rather than what is genuinely due.',
      ],
    },
    reflection: {
      frame: 'Al-Qawī sustained me today. Al-Laṭīf noticed what I almost missed.',
      governing: [
        'I attended to at least one genuine need today rather than pushing through it.',
        'I gave those in my care something that was actually theirs, not only what remained.',
      ],
      notYet: [
        'I suppressed a signal my body or heart was giving and told myself it was strength.',
        'I am still carrying unacknowledged depletion into the next day.',
      ],
    },
  },

  intellect: {
    attrs: [
      {
        name: 'Al-Fattāḥ',
        name_ar: 'الْفَتَّاح',
        title: 'The Opener',
        body: 'Al-Fattāḥ opens what is closed — including the mind that has settled into its current shape. Its absence is not ignorance but closure: approaching learning already knowing what you will find, engaging with new ideas only to confirm prior positions, mistaking familiarity for mastery. The precondition of all genuine learning is a mind that can actually be changed.',
      },
      {
        name: 'Al-ʿAlīm',
        name_ar: 'الْعَلِيم',
        title: 'The All-Knowing',
        body: 'Knowledge belongs to Allah completely. Al-ʿAlīm orients toward knowledge not as a resource to acquire but as a trust to steward. Its absence corrupts through the wrong relationship with knowing: accumulation without application, sharing without accountability, criticism without humility, and treating the limit of current knowledge as the limit of what is knowable.',
      },
    ],
    dua: {
      title: 'Before Intellectual Engagement',
      resumeTitle: 'Before Resuming Study or Work',
      arabic: 'رَبِّ زِدْنِي عِلْمًا',
      trans: 'Rabbi zidnī ʿilmā',
      meaning: 'My Lord, increase me in knowledge.',
      source: 'Surah Ta-Ha 20:114',
    },
    readiness: {
      frame: 'Al-Fattāḥ asks: am I entering this with a mind that can actually be opened, or have I already decided what I will find?',
      rows: [
        {
          id: 'F1', attr: 'Al-Fattāḥ', attr_ar: 'الْفَتَّاح', attrTitle: 'The Opener',
          attrFrame: 'Am I entering this with a mind that can actually be opened, or have I already decided what I will find?',
          governing: 'I am entering this willing to be genuinely surprised — what I encounter could change what I currently believe.',
          notYet: 'I am approaching this to confirm what I already know rather than to discover what I do not yet know.',
        },
        {
          id: 'F2', attr: 'Al-Fattāḥ',
          governing: 'I am holding my current understanding as provisional — correct enough to act on, but open to being revised.',
          notYet: 'I am defending a position I have not recently re-examined, treating it as settled because revisiting it feels costly.',
        },
        {
          id: 'A1', attr: 'Al-ʿAlīm', attr_ar: 'الْعَلِيم', attrTitle: 'The All-Knowing',
          attrFrame: 'Am I approaching this as a steward of knowledge — accountable for how I hold and share it — or as an accumulator?',
          governing: 'I am engaging with this to understand and apply — not merely to possess or signal that I have encountered it.',
          notYet: 'I am accumulating without clear intention to use or share — building a store I am not yet accountable for.',
        },
        {
          id: 'A2', attr: 'Al-ʿAlīm',
          governing: 'I am honest about the limits of what I currently know — I am not extending my authority beyond what the evidence supports.',
          notYet: 'I am speaking or acting at the edge of my knowledge without naming that edge, presenting inference as established understanding.',
        },
        {
          id: 'A3', attr: 'Al-ʿAlīm',
          governing: 'I am approaching this with the awareness that I will be accountable for how I share what I learn — I hold it as a trust.',
          notYet: 'I am treating what I know as mine to use as I choose, without attending to the responsibility that comes with knowing.',
        },
        {
          id: 'A4', attr: 'Al-ʿAlīm',
          governing: 'I am applying critical thinking as a tool for reaching truth — not as a performance of sophistication or a means of maintaining distance.',
          notYet: 'I am using critical thinking primarily to establish what I do not accept, rather than to get closer to what is actually true.',
        },
      ],
      governing: [
        'I am entering this willing to be genuinely surprised — what I encounter could change what I currently believe.',
        'I am holding my current understanding as provisional — correct enough to act on, but open to being revised.',
        'I am engaging with this to understand and apply — not merely to possess or signal that I have encountered it.',
        'I am honest about the limits of what I currently know — I am not extending my authority beyond what the evidence supports.',
        'I am approaching this with the awareness that I will be accountable for how I share what I learn — I hold it as a trust.',
        'I am applying critical thinking as a tool for reaching truth — not as a performance of sophistication or a means of maintaining distance.',
      ],
      notYet: [
        'I am approaching this to confirm what I already know rather than to discover what I do not yet know.',
        'I am defending a position I have not recently re-examined, treating it as settled because revisiting it feels costly.',
        'I am accumulating without clear intention to use or share — building a store I am not yet accountable for.',
        'I am speaking or acting at the edge of my knowledge without naming that edge, presenting inference as established understanding.',
        'I am treating what I know as mine to use as I choose, without attending to the responsibility that comes with knowing.',
        'I am using critical thinking primarily to establish what I do not accept, rather than to get closer to what is actually true.',
      ],
    },
    reflection: {
      frame: 'Al-Fattāḥ opened what was closed today. Al-ʿAlīm witnessed how I held what I learned.',
      governing: [
        'I encountered something today that genuinely updated or complicated what I previously held.',
        'I named the limit of my knowledge rather than extending beyond it.',
      ],
      notYet: [
        'I moved through material primarily to confirm what I already believed.',
        'I shared something as established understanding that was actually still inference.',
      ],
    },
  },

  people: {
    attrs: [
      {
        name: 'Al-Raḥīm',
        name_ar: 'الرَّحِيم',
        title: 'The Merciful',
        body: 'Al-Raḥīm is active mercy — mercy that reaches out toward others rather than waiting to be earned. It is not sentiment but attention: the quality of presence that sees others as they are rather than as they function. Its absence corrupts the People domain not through cruelty but through treating people as roles, extracting from relationships rather than contributing, or allowing difference to become distance.',
      },
      {
        name: 'Al-Jāmiʿ',
        name_ar: 'الْجَامِع',
        title: 'The Gatherer',
        body: 'Al-Jāmiʿ draws together what is dispersed. Its absence shows as fragmentation — the gradual erosion of shared centre. Al-Jāmiʿ is not uniformity; it is the orientation toward a shared centre that makes difference generative rather than fragmenting. The operator entering this domain is asked whether their presence here builds or disperses the social fabric.',
      },
    ],
    dua: {
      title: 'Before Relational Engagement',
      resumeTitle: 'Before Resuming People Stewardship',
      arabic: 'اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا',
      trans: "Allāhumma allif bayna qulūbinā wa aṣliḥ dhāta bayninā",
      meaning: 'O Allah, unite our hearts and set right what is between us.',
      source: 'Sunan Abi Dawud 969',
    },
    readiness: {
      frame: 'Al-Raḥīm asks: am I present to the actual person before me, or to my role in relation to them?',
      rows: [
        {
          id: 'R1', attr: 'Al-Raḥīm', attr_ar: 'الرَّحِيم', attrTitle: 'The Merciful',
          attrFrame: 'Am I present to the actual person before me, or to my role in relation to them?',
          governing: 'I am approaching this person aware of what they are carrying — my presence is genuinely attentive, not procedural.',
          notYet: 'I am responding to the role this person occupies rather than to the person themselves.',
        },
        {
          id: 'R2', attr: 'Al-Raḥīm',
          governing: 'I am holding space for what is genuinely different about this person without letting that difference become distance.',
          notYet: 'I am letting what is unfamiliar or difficult about this person produce judgment or withdrawal rather than understanding.',
        },
        {
          id: 'R3', attr: 'Al-Raḥīm',
          governing: 'My presence here adds to this person — I am giving rather than primarily extracting.',
          notYet: 'I am here more for what I can receive than for what I can genuinely offer.',
        },
        {
          id: 'R4', attr: 'Al-Raḥīm',
          governing: 'I can hold the difficulty of this relationship honestly without allowing that difficulty to justify hardness toward the person.',
          notYet: 'I am using the real difficulty of this relationship as permission to withhold the care that is still due.',
        },
        {
          id: 'J1', attr: 'Al-Jāmiʿ', attr_ar: 'الْجَامِع', attrTitle: 'The Gatherer',
          attrFrame: 'Am I oriented toward the shared centre, or am I carrying fragmentation into this space?',
          governing: 'I am entering this space oriented toward what holds us together — my private interests are not directing this engagement.',
          notYet: 'My own needs or agenda are driving this engagement more than the well-being of the relationship or community.',
        },
        {
          id: 'J2', attr: 'Al-Jāmiʿ',
          governing: 'I am contributing to cohesion — my words and presence here build rather than fragment.',
          notYet: 'I am carrying unresolved division — consciously or not — into this space, and it is shaping what I bring.',
        },
      ],
      governing: [
        'I am approaching this person aware of what they are carrying — my presence is genuinely attentive, not procedural.',
        'I am holding space for what is genuinely different about this person without letting that difference become distance.',
        'My presence here adds to this person — I am giving rather than primarily extracting.',
        'I can hold the difficulty of this relationship honestly without allowing that difficulty to justify hardness toward the person.',
        'I am entering this space oriented toward what holds us together — my private interests are not directing this engagement.',
        'I am contributing to cohesion — my words and presence here build rather than fragment.',
      ],
      notYet: [
        'I am responding to the role this person occupies rather than to the person themselves.',
        'I am letting what is unfamiliar or difficult about this person produce judgment or withdrawal rather than understanding.',
        'I am here more for what I can receive than for what I can genuinely offer.',
        'I am using the real difficulty of this relationship as permission to withhold the care that is still due.',
        'My own needs or agenda are driving this engagement more than the well-being of the relationship or community.',
        'I am carrying unresolved division — consciously or not — into this space, and it is shaping what I bring.',
      ],
    },
    reflection: {
      frame: 'Al-Raḥīm was present in how I held others today. Al-Jāmiʿ witnessed what my presence built.',
      governing: [
        'I was present to at least one person as a person — not a role — and it shaped how I engaged.',
        'My presence in at least one relational space built rather than fragmented.',
      ],
      notYet: [
        'I responded to someone primarily through the function they serve rather than who they are.',
        'I carried unresolved tension into an interaction and it shaped what I brought.',
      ],
    },
  },

  wealth: {
    attrs: [
      {
        name: 'Al-Razzāq',
        name_ar: 'الرَّزَّاق',
        title: 'The Provider',
        body: 'All provision originates with Allah. Al-Razzāq orients toward wealth not as personal achievement to protect or expand but as rizq — provision entrusted for a purpose. Its absence corrupts through accumulation that crowds out generosity, ethical compromise justified by financial pressure, treating wealth as evidence of personal worth, and the anxiety of holding rather than trusting.',
      },
      {
        name: 'Al-Ḥasīb',
        name_ar: 'الْحَسِيب',
        title: 'The Reckoner',
        body: 'Precise accountability for what is held, how it is used, and what it produces. Al-Ḥasīb is not anxiety about outcomes — it is the quality of attention that ensures stewardship is legible, both to the operator and to Allah. Its absence shows in recklessness: decisions made without counting the cost, resources deployed without tracking their effect.',
      },
    ],
    dua: {
      title: 'Before Wealth Stewardship',
      resumeTitle: 'Before Resuming Financial Work',
      arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
      trans: "Allāhumma ikfinī bi-ḥalālika ʿan ḥarāmika wa aghninī bi-faḍlika ʿamman siwāk",
      meaning: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
      source: 'Jami at-Tirmidhi 3563',
    },
    readiness: {
      frame: 'Al-Razzāq asks: am I holding this wealth as a trust from Allah, or as something I have earned and now own?',
      rows: [
        {
          id: 'Z1', attr: 'Al-Razzāq', attr_ar: 'الرَّزَّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I holding this wealth as a trust from Allah, or as something I have earned and now own?',
          governing: 'I am approaching this with the awareness that what I hold is provision, not possession — it came from Allah and is accountable to Him.',
          notYet: 'I am treating what I have accumulated as mine by right, without attending to the trust dimension of holding it.',
        },
        {
          id: 'Z2', attr: 'Al-Razzāq',
          governing: 'I am making this decision with the ethical boundary intact — financial pressure is not relocating where that boundary sits.',
          notYet: 'I am allowing the pressure of financial need or opportunity to justify a compromise I would not otherwise accept.',
        },
        {
          id: 'Z3', attr: 'Al-Razzāq',
          governing: 'I am giving from what I hold with genuine freedom — generosity is not contingent on reaching a threshold of security first.',
          notYet: 'I am deferring generosity until conditions I keep receding are met — treating charity as a surplus activity rather than an obligation.',
        },
        {
          id: 'Z4', attr: 'Al-Razzāq',
          governing: 'I can hold an outcome in which I receive less than I expected without it threatening my orientation toward Allah as Provider.',
          notYet: 'I am measuring my standing with Allah or my own worth partly by what I have been given materially.',
        },
        {
          id: 'H1', attr: 'Al-Ḥasīb', attr_ar: 'الْحَسِيب', attrTitle: 'The Reckoner',
          attrFrame: 'Am I operating with the precision this trust deserves, or am I proceeding without full accounting?',
          governing: 'I am entering this with a clear account of what has been deployed, what has been returned, and what remains outstanding.',
          notYet: 'I am proceeding without a clear reckoning of the current state — moving forward without closing what I opened before.',
        },
        {
          id: 'H2', attr: 'Al-Ḥasīb',
          governing: 'I am making this decision with full sight of its likely consequences — I have counted the cost before I have committed the resource.',
          notYet: 'I am acting with optimism about outcomes that I have not honestly examined, deploying resources before the accounting is complete.',
        },
      ],
      governing: [
        'I am approaching this with the awareness that what I hold is provision, not possession — it came from Allah and is accountable to Him.',
        'I am making this decision with the ethical boundary intact — financial pressure is not relocating where that boundary sits.',
        'I am giving from what I hold with genuine freedom — generosity is not contingent on reaching a threshold of security first.',
        'I can hold an outcome in which I receive less than I expected without it threatening my orientation toward Allah as Provider.',
        'I am entering this with a clear account of what has been deployed, what has been returned, and what remains outstanding.',
        'I am making this decision with full sight of its likely consequences — I have counted the cost before I have committed the resource.',
      ],
      notYet: [
        'I am treating what I have accumulated as mine by right, without attending to the trust dimension of holding it.',
        'I am allowing the pressure of financial need or opportunity to justify a compromise I would not otherwise accept.',
        'I am deferring generosity until conditions I keep receding are met — treating charity as a surplus activity rather than an obligation.',
        'I am measuring my standing with Allah or my own worth partly by what I have been given materially.',
        'I am proceeding without a clear reckoning of the current state — moving forward without closing what I opened before.',
        'I am acting with optimism about outcomes that I have not honestly examined, deploying resources before the accounting is complete.',
      ],
    },
    reflection: {
      frame: 'Al-Razzāq held the provision today. Al-Ḥasīb witnessed the reckoning.',
      governing: [
        'I made at least one financial decision with the amanah dimension consciously present.',
        'I counted the cost of a deployment before committing — not after.',
      ],
      notYet: [
        'I treated wealth I hold as mine by right rather than as provision entrusted.',
        'I moved forward without a clear account of what preceded this step.',
      ],
    },
  },

  environment: {
    attrs: [
      {
        name: 'Al-Wakīl',
        name_ar: 'الْوَكِيل',
        title: 'The Trustworthy Disposer',
        body: 'In the Environment domain, Al-Wakīl frames the earth as something entrusted — not owned, not inherited as a right, but held in custody for those who come after. The operator is asked whether they understand that the ground beneath them is a trust, and that a trustee has obligations to the one who entrusted.',
      },
      {
        name: 'Al-Ḥakīm',
        name_ar: 'الْحَكِيم',
        title: 'The All-Wise',
        body: 'Wisdom that perceives consequences across time and scale. Al-Ḥakīm is the antidote to short-sightedness — not merely prudence, but the quality of perception that sees how present choices propagate into future conditions. Its absence corrupts through the accumulated weight of small decisions made without seeing their full arc.',
      },
    ],
    dua: {
      title: 'Before Ecological Stewardship',
      resumeTitle: 'Before Resuming Environmental Work',
      arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
      trans: "Subḥāna alladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn",
      meaning: 'Glory be to Him who has subjected this to us, and we could not have [otherwise] subdued it.',
      source: 'Surah Az-Zukhruf 43:13',
    },
    readiness: {
      frame: 'Al-Wakīl asks: am I engaging with this domain as a trustee of what has been entrusted — to me, and through me, to future generations?',
      rows: [
        {
          id: 'K1', attr: 'Al-Wakīl', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Am I engaging with this domain as a trustee of what has been entrusted — to me, and through me, to future generations?',
          governing: 'I am approaching this with the awareness that what I hold, consume, and affect is not mine — it is entrusted for a purpose beyond my own use.',
          notYet: 'I am treating the resources and ecosystems I engage with as available for my use without attending to the trust dimension of that use.',
        },
        {
          id: 'K2', attr: 'Al-Wakīl',
          governing: 'I am acting with the awareness that my choices here have consequences for people who are not present — and that accountability extends to them.',
          notYet: 'I am making this choice based only on its effects on those present and currently visible, without attending to the unseen and the future.',
        },
        {
          id: 'H1', attr: 'Al-Ḥakīm', attr_ar: 'الْحَكِيم', attrTitle: 'The All-Wise',
          attrFrame: 'Am I seeing far enough — across time, across scale, across those affected — to make this choice wisely?',
          governing: 'I am seeing the full arc of this choice — its likely effects across time and at a scale beyond my immediate context.',
          notYet: 'I am making this decision based on its immediate and visible effects, without honestly examining its downstream consequences.',
        },
        {
          id: 'H2', attr: 'Al-Ḥakīm',
          governing: 'I am willing to accept a present inconvenience or cost in order to preserve a future condition I will not personally witness.',
          notYet: 'I am prioritising immediate ease or gain in a way that defers a cost I know will fall on others — human or ecological.',
        },
        {
          id: 'H3', attr: 'Al-Ḥakīm',
          governing: 'I am examining my consumption and project choices with honest attention to their full chain of effects — not only their proximate outcomes.',
          notYet: 'I am accepting the framing given to me about what is \'sustainable\' or \'ethical\' without examining whether that framing holds under scrutiny.',
        },
        {
          id: 'H4', attr: 'Al-Ḥakīm',
          governing: 'I am acting from principle rather than from trend — my engagement here is grounded in obligation, not in what currently signals environmental care.',
          notYet: 'I am participating in environmental stewardship primarily in ways that are visible and culturally recognised, while exempting less visible choices from the same standard.',
        },
      ],
      governing: [
        'I am approaching this with the awareness that what I hold, consume, and affect is not mine — it is entrusted for a purpose beyond my own use.',
        'I am acting with the awareness that my choices here have consequences for people who are not present — and that accountability extends to them.',
        'I am seeing the full arc of this choice — its likely effects across time and at a scale beyond my immediate context.',
        'I am willing to accept a present inconvenience or cost in order to preserve a future condition I will not personally witness.',
        'I am examining my consumption and project choices with honest attention to their full chain of effects — not only their proximate outcomes.',
        'I am acting from principle rather than from trend — my engagement here is grounded in obligation, not in what currently signals environmental care.',
      ],
      notYet: [
        'I am treating the resources and ecosystems I engage with as available for my use without attending to the trust dimension of that use.',
        'I am making this choice based only on its effects on those present and currently visible, without attending to the unseen and the future.',
        'I am making this decision based on its immediate and visible effects, without honestly examining its downstream consequences.',
        'I am prioritising immediate ease or gain in a way that defers a cost I know will fall on others — human or ecological.',
        'I am accepting the framing given to me about what is \'sustainable\' or \'ethical\' without examining whether that framing holds under scrutiny.',
        'I am participating in environmental stewardship primarily in ways that are visible and culturally recognised, while exempting less visible choices from the same standard.',
      ],
    },
    reflection: {
      frame: 'Al-Wakīl witnessed what I held as trust today. Al-Ḥakīm saw how far I looked.',
      governing: [
        'I made at least one choice today with the unseen and the future consciously present.',
        'I examined rather than accepted a framing about sustainability or ethics.',
      ],
      notYet: [
        'I treated a resource I engaged with as available for my use without attending to its trust dimension.',
        'I made a decision based on immediate effects without honestly examining what comes after.',
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
