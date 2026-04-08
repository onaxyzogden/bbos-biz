// BBOS Stage Islamic Data — full stage-scoped spiritual framing
// Each entry matches the MODULE_ATTRS shape from islamic-data.js:
//   attrs[], dua{}, readiness{frame, rows[], governing[], notYet[]}, reflection{frame, governing[], notYet[]}
// Consumed by IslamicPanel and ThresholdModal when activeBbosStage is set.

export const BBOS_STAGE_ISLAMIC = {
  FND: {
    attrs: [
      {
        name: 'Al-Awwal',
        name_ar: 'الأوّل',
        title: 'The First',
        body: 'Al-Awwal precedes all creation. Every business begins not with your decision but with His permission. Founding a venture in His name anchors it to the only source that cannot be taken away.',
      },
      {
        name: 'Al-Badi',
        name_ar: 'البديع',
        title: 'The Originator',
        body: 'Al-Badi creates without precedent. Your foundation need not copy what already exists — it is an invitation for Him to originate something new through your effort and surrender.',
      },
    ],
    dua: {
      title: 'Before Establishing the Foundation',
      resumeTitle: 'Before Returning to Foundation Work',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: 'Rabbi ashraḥ lī ṣadrī wa yassir lī amrī',
      meaning: 'My Lord, expand for me my breast and ease for me my task.',
      source: 'Surah Ta-Ha 20:25–26',
    },
    readiness: {
      frame: 'Al-Awwal asks: does this foundation begin with His name or your ambition?',
      rows: [
        {
          id: 'A1', attr: 'Al-Awwal', attr_ar: 'الأوّل', attrTitle: 'The First',
          attrFrame: 'Is this beginning His or yours?',
          governing: 'Your niyyah (intention) for this business is clear, halal, and stated before Allah.',
          notYet: 'You have not yet articulated why you are building this — the foundation is on assumption.',
        },
        {
          id: 'A2', attr: 'Al-Awwal',
          governing: 'The mission and values you are establishing would survive scrutiny before Allah.',
          notYet: 'The stated values and the actual plan are not yet aligned.',
        },
        {
          id: 'B1', attr: 'Al-Badi', attr_ar: 'البديع', attrTitle: 'The Originator',
          attrFrame: 'Are you building something genuinely new, or imitating without purpose?',
          governing: 'You have identified what is distinctive about this venture and can articulate it clearly.',
          notYet: 'The offering is a copy of existing work without original purpose or differentiation.',
        },
        {
          id: 'B2', attr: 'Al-Badi',
          governing: 'You are open to Al-Badi reshaping the foundation as you build — not rigidly attached to your original design.',
          notYet: 'You are too attached to your initial vision to allow it to be refined.',
        },
      ],
      governing: [
        'Your niyyah for this business is clear, halal, and stated before Allah.',
        'The mission and values you are establishing would survive scrutiny before Allah.',
        'You have identified what is distinctive about this venture and can articulate it clearly.',
        'You are open to Al-Badi reshaping the foundation as you build.',
      ],
      notYet: [
        'You have not yet articulated why you are building this — the foundation is on assumption.',
        'The stated values and the actual plan are not yet aligned.',
        'The offering is a copy of existing work without original purpose or differentiation.',
        'You are too attached to your initial vision to allow it to be refined.',
      ],
    },
    reflection: {
      frame: 'Al-Badi originated this work through you. Al-Awwal gave it a beginning.',
      governing: [
        'The foundation you established today is something you would not be ashamed to present to Allah.',
        'Something emerged in this work that surprised you — a sign that Al-Badi was active.',
      ],
      notYet: [
        'The work today was mechanical rather than intentional.',
        'You built on assumption rather than on verified foundation.',
      ],
    },
  },

  TRU: {
    attrs: [
      {
        name: "Al-Mu'min",
        name_ar: 'المؤمن',
        title: 'The Giver of Security',
        body: "Al-Mu'min establishes security through truth. Trust in a business is not manufactured — it is earned by consistent truthfulness, authenticated claims, and promises kept. Build your credibility as an act of worship.",
      },
      {
        name: 'Al-Wakil',
        name_ar: 'الوكيل',
        title: 'The Trustee',
        body: 'Al-Wakil holds the outcomes. You are responsible for the truth you put into the world; He is responsible for what grows from it. Make every claim honest, then trust the Trustee with the result.',
      },
    ],
    dua: {
      title: 'Before Building Trust and Credibility',
      resumeTitle: 'Before Returning to Truth Work',
      arabic: 'اللَّهُمَّ أَرِنَا الحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ',
      trans: 'Allāhumma arina-l-ḥaqqa ḥaqqan warzuqna ttibāʿah',
      meaning: 'O Allah, show us the truth as truth and grant us the ability to follow it.',
      source: 'Attributed to Ibn Masud — commonly transmitted in supplication',
    },
    readiness: {
      frame: "Al-Mu'min asks: is every claim you are making today verifiable and true?",
      rows: [
        {
          id: 'M1', attr: "Al-Mu'min", attr_ar: 'المؤمن', attrTitle: 'The Giver of Security',
          attrFrame: 'Can everything you are publishing be authenticated?',
          governing: 'Every claim, testimonial, and credential you are presenting can be independently verified.',
          notYet: 'Some of what you are presenting is aspirational rather than substantiated.',
        },
        {
          id: 'M2', attr: "Al-Mu'min",
          governing: 'You have not exaggerated results or omitted relevant limitations.',
          notYet: 'You are shaping the truth to look better than it is — this is gharar.',
        },
        {
          id: 'W1', attr: 'Al-Wakil', attr_ar: 'الوكيل', attrTitle: 'The Trustee',
          attrFrame: 'Are you at peace with Allah knowing the full truth of what you are presenting?',
          governing: 'You have released attachment to how the market receives your truth.',
          notYet: 'You are adjusting the truth to manage perception — trusting your spin more than Al-Wakil.',
        },
        {
          id: 'W2', attr: 'Al-Wakil',
          governing: 'Your amanah (trustworthiness) is more important to you than any short-term conversion.',
          notYet: 'You are tempted to overstate in order to close faster.',
        },
      ],
      governing: [
        'Every claim, testimonial, and credential you are presenting can be independently verified.',
        'You have not exaggerated results or omitted relevant limitations.',
        'You have released attachment to how the market receives your truth.',
        'Your amanah is more important to you than any short-term conversion.',
      ],
      notYet: [
        'Some of what you are presenting is aspirational rather than substantiated.',
        'You are shaping the truth to look better than it is — this is gharar.',
        'You are adjusting the truth to manage perception — trusting your spin more than Al-Wakil.',
        'You are tempted to overstate in order to close faster.',
      ],
    },
    reflection: {
      frame: "Al-Mu'min secured your reputation through truth. Al-Wakil held the outcomes.",
      governing: [
        'You can point to something today where you chose honesty over advantage.',
        'You trusted Al-Wakil with a result you could not control.',
      ],
      notYet: [
        'You compromised on a claim and told yourself it was acceptable.',
        'You are still carrying anxiety about how your truth was received.',
      ],
    },
  },

  STR: {
    attrs: [
      {
        name: 'Al-Musawwir',
        name_ar: 'المصوّر',
        title: 'The Fashioner of Forms',
        body: 'Al-Musawwir gives shape to creation. Strategy is the act of fashioning form from possibility — defining how things will be arranged. Bring His precision to your operational design.',
      },
      {
        name: 'Al-Mudabbir',
        name_ar: 'المدبّر',
        title: 'The Arranger',
        body: 'Al-Mudabbir arranges all affairs with perfect wisdom. Your strategy is not a substitute for His planning — it is your faithful cooperation with the order He has made possible. Plan thoroughly, then release the arrangement to Him.',
      },
    ],
    dua: {
      title: 'Before Strategic Planning',
      resumeTitle: 'Before Returning to Strategy Work',
      arabic: 'اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِن شَرِّ نَفْسِي',
      trans: 'Allāhumma alhimnī rushdī wa aʿidhnī min sharri nafsī',
      meaning: 'O Allah, inspire me with right guidance and protect me from the evil of my own soul.',
      source: 'Jami at-Tirmidhi 3452',
    },
    readiness: {
      frame: 'Al-Musawwir asks: does the structure you are building reflect wisdom, or just urgency?',
      rows: [
        {
          id: 'S1', attr: 'Al-Musawwir', attr_ar: 'المصوّر', attrTitle: 'The Fashioner of Forms',
          attrFrame: 'Is the structure you are designing genuinely purposeful?',
          governing: 'The system or process you are designing serves real needs — not organizational aesthetics.',
          notYet: 'You are building structure that looks organized but does not reduce actual friction.',
        },
        {
          id: 'S2', attr: 'Al-Musawwir',
          governing: 'The team architecture and roles reflect the actual work to be done, not titles desired.',
          notYet: 'Roles are defined around people, not around what the business genuinely needs.',
        },
        {
          id: 'D1', attr: 'Al-Mudabbir', attr_ar: 'المدبّر', attrTitle: 'The Arranger',
          attrFrame: 'Have you made the plan, then handed the arrangement to Allah?',
          governing: 'You have planned thoroughly and are at peace with what He will arrange from your plan.',
          notYet: "You are still gripping the outcomes of your strategy — not trusting Al-Mudabbir's arrangement.",
        },
        {
          id: 'D2', attr: 'Al-Mudabbir',
          governing: 'Your strategy is simple enough that the team can execute without constant re-explanation.',
          notYet: 'The strategy is complex because it has not yet been refined to its essential form.',
        },
      ],
      governing: [
        'The system or process you are designing serves real needs — not organizational aesthetics.',
        'The team architecture and roles reflect the actual work to be done, not titles desired.',
        'You have planned thoroughly and are at peace with what He will arrange from your plan.',
        'Your strategy is simple enough that the team can execute without constant re-explanation.',
      ],
      notYet: [
        'You are building structure that looks organized but does not reduce actual friction.',
        'Roles are defined around people, not around what the business genuinely needs.',
        "You are still gripping the outcomes of your strategy — not trusting Al-Mudabbir's arrangement.",
        'The strategy is complex because it has not yet been refined to its essential form.',
      ],
    },
    reflection: {
      frame: 'Al-Musawwir gave form to your planning. Al-Mudabbir held the arrangement.',
      governing: [
        'The strategy you worked on today is clearer and more executable than when you started.',
        'You released control of the outcome of at least one planning decision.',
      ],
      notYet: [
        'The planning session added complexity rather than clarity.',
        'You are still carrying the weight of how the strategy will land rather than trusting the Arranger.',
      ],
    },
  },

  OFR: {
    attrs: [
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'All provision flows from Ar-Razzaq. Pricing your offering is an act of stewardship, not extraction — you name a price that reflects genuine value and trust that He will bring the right clients. Greed constricts; trust opens.',
      },
      {
        name: 'Al-Karim',
        name_ar: 'الكريم',
        title: 'The Generous',
        body: 'Al-Karim gives beyond what is deserved, with nobility. Build generosity into your offer — not as a loss-leader tactic, but as an expression of His character flowing through your work. Generosity in the offer is barakah in the business.',
      },
    ],
    dua: {
      title: 'Before Defining and Pricing the Offering',
      resumeTitle: 'Before Returning to Offering Work',
      arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
      trans: 'Allāhumma ikfinī bi-ḥalālika ʿan ḥarāmika wa aghninī bi-faḍlika ʿamman siwāk',
      meaning: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
      source: 'Jami at-Tirmidhi 3563',
    },
    readiness: {
      frame: 'Ar-Razzaq asks: is this offer free from deception and driven by genuine value?',
      rows: [
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Is the provision you are offering genuinely what the client needs?',
          governing: 'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
          notYet: 'The pricing reflects extraction rather than fair exchange.',
        },
        {
          id: 'R2', attr: 'Ar-Razzaq',
          governing: 'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
          notYet: 'The offer contains undefined elements that the client cannot accurately evaluate.',
        },
        {
          id: 'K1', attr: 'Al-Karim', attr_ar: 'الكريم', attrTitle: 'The Generous',
          attrFrame: 'Is generosity built into this offer beyond the transactional minimum?',
          governing: 'There is genuine generosity in this offer — something given that was not required.',
          notYet: 'The offer is designed to give the minimum required to close the deal.',
        },
        {
          id: 'K2', attr: 'Al-Karim',
          governing: 'The value the client receives exceeds what you have charged — you would be proud to show this to Allah.',
          notYet: 'The price-to-value ratio advantages you disproportionately over the client.',
        },
      ],
      governing: [
        'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
        'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
        'There is genuine generosity in this offer — something given that was not required.',
        'The value the client receives exceeds what you have charged.',
      ],
      notYet: [
        'The pricing reflects extraction rather than fair exchange.',
        'The offer contains undefined elements that the client cannot accurately evaluate.',
        'The offer is designed to give the minimum required to close the deal.',
        'The price-to-value ratio advantages you disproportionately over the client.',
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq provided through the offer. Al-Karim expressed His generosity through yours.',
      governing: [
        'The offer you worked on today is something you would be proud to present to Allah.',
        'You built in more generosity than was commercially necessary.',
      ],
      notYet: [
        'The offer was shaped more by competitive pressure than by genuine value.',
        'You did not make it as clear as it could be — ambiguity remains.',
      ],
    },
  },

  OUT: {
    attrs: [
      {
        name: 'Al-Hadi',
        name_ar: 'الهادي',
        title: 'The Guide',
        body: 'Al-Hadi guides whom He wills to the straight path. Ethical outreach is guidance, not manipulation — you put the right thing in front of the right people and trust Him with who responds. You are not engineering consent; you are extending an invitation.',
      },
      {
        name: 'An-Nur',
        name_ar: 'النور',
        title: 'The Light',
        body: 'An-Nur is the Light of the heavens and the earth. Your outreach carries His light when it illuminates a real problem and offers a genuine path forward — not when it uses darkness (fear, scarcity, pressure) to drive action.',
      },
    ],
    dua: {
      title: 'Before Reaching Out',
      resumeTitle: 'Before Resuming Outreach',
      arabic: 'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',
      trans: 'Allāhumma ihdinī wa saddidnī',
      meaning: 'O Allah, guide me and keep me on the right course.',
      source: 'Sahih Muslim 2725',
    },
    readiness: {
      frame: 'Al-Hadi asks: are you guiding, or are you manipulating?',
      rows: [
        {
          id: 'H1', attr: 'Al-Hadi', attr_ar: 'الهادي', attrTitle: 'The Guide',
          attrFrame: 'Is your outreach guiding or engineering?',
          governing: 'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
          notYet: 'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        },
        {
          id: 'H2', attr: 'Al-Hadi',
          governing: 'You have identified the right people to reach — those who genuinely need what you offer.',
          notYet: 'You are broadcasting broadly rather than serving specifically.',
        },
        {
          id: 'N1', attr: 'An-Nur', attr_ar: 'النور', attrTitle: 'The Light',
          attrFrame: 'Does your outreach illuminate or obscure?',
          governing: 'The message is honest about what you offer and what it cannot do.',
          notYet: 'The message is misleadingly positive — limitations are hidden.',
        },
        {
          id: 'N2', attr: 'An-Nur',
          governing: 'You are comfortable with Allah witnessing every message and interaction in this outreach.',
          notYet: 'There are tactics in the outreach you would not want brought to account.',
        },
      ],
      governing: [
        'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
        'You have identified the right people to reach — those who genuinely need what you offer.',
        'The message is honest about what you offer and what it cannot do.',
        'You are comfortable with Allah witnessing every message and interaction in this outreach.',
      ],
      notYet: [
        'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        'You are broadcasting broadly rather than serving specifically.',
        'The message is misleadingly positive — limitations are hidden.',
        'There are tactics in the outreach you would not want brought to account.',
      ],
    },
    reflection: {
      frame: 'Al-Hadi guided through your outreach. An-Nur illuminated the path for those reached.',
      governing: [
        'The outreach you executed today was something you would be comfortable presenting to Allah.',
        'You chose honesty over persuasion at at least one point.',
      ],
      notYet: [
        'The messaging was shaped more by conversion goals than by genuine guidance.',
        'You used a tactic today you would not want on your account.',
      ],
    },
  },

  SAL: {
    attrs: [
      {
        name: 'As-Sami',
        name_ar: 'السميع',
        title: 'The All-Hearing',
        body: 'As-Sami hears every word spoken and every word left unsaid. Sales is not a performance — it is a conversation witnessed by the All-Hearing. Every claim, every promise, and every silence is on the record. Sell as though Allah is listening, because He is.',
      },
      {
        name: 'Al-Basir',
        name_ar: 'البصير',
        title: 'The All-Seeing',
        body: 'Al-Basir sees the full reality of the person in front of you — their need, their capacity, their situation. Consultative selling begins with genuine sight: seeing what the prospect actually needs, not what would benefit you most.',
      },
    ],
    dua: {
      title: 'Before Sales Conversations',
      resumeTitle: 'Before Resuming Sales Work',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الكَذِبِ وَالخِيَانَةِ',
      trans: 'Allāhumma innī aʿūdhu bika mina-l-kadhib wal-khiyānah',
      meaning: 'O Allah, I seek refuge in You from lying and betrayal of trust.',
      source: 'Adapted from authentic supplication literature',
    },
    readiness: {
      frame: 'As-Sami asks: are you entering this conversation to listen, or to perform?',
      rows: [
        {
          id: 'S1', attr: 'As-Sami', attr_ar: 'السميع', attrTitle: 'The All-Hearing',
          attrFrame: 'Are you genuinely listening or waiting to speak?',
          governing: 'You are entering this conversation with the intention to understand the prospect first.',
          notYet: 'You are entering with a script rather than an open posture of listening.',
        },
        {
          id: 'S2', attr: 'As-Sami',
          governing: 'Every commitment you make in this conversation is one you can keep.',
          notYet: 'You are tempted to promise things you are not sure you can deliver.',
        },
        {
          id: 'B1', attr: 'Al-Basir', attr_ar: 'البصير', attrTitle: 'The All-Seeing',
          attrFrame: 'Are you seeing their real need, or projecting your desired outcome?',
          governing: "You can clearly articulate the prospect's actual situation and whether your offer genuinely fits.",
          notYet: 'You are trying to sell regardless of fit — the offer is not right for this person right now.',
        },
        {
          id: 'B2', attr: 'Al-Basir',
          governing: 'If this offer is not the right fit, you are willing to say so honestly.',
          notYet: 'You are pushing toward a close even where there is doubt about fit.',
        },
      ],
      governing: [
        'You are entering this conversation with the intention to understand the prospect first.',
        'Every commitment you make in this conversation is one you can keep.',
        "You can clearly articulate the prospect's actual situation and whether your offer genuinely fits.",
        'If this offer is not the right fit, you are willing to say so honestly.',
      ],
      notYet: [
        'You are entering with a script rather than an open posture of listening.',
        'You are tempted to promise things you are not sure you can deliver.',
        'You are trying to sell regardless of fit — the offer is not right for this person right now.',
        'You are pushing toward a close even where there is doubt about fit.',
      ],
    },
    reflection: {
      frame: 'As-Sami heard every word of your conversations. Al-Basir saw the reality beneath them.',
      governing: [
        'You listened before speaking in at least one conversation today.',
        'You kept every promise made — or clarified a commitment before it became a breach.',
      ],
      notYet: [
        'A conversation today was more performance than service.',
        'You made a commitment you are not fully confident you can keep.',
      ],
    },
  },

  DLR: {
    attrs: [
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Excellence-Giver',
        body: 'Al-Muhsin perfects rather than merely fulfils. Delivery with ihsan means exceeding the specification not for commercial advantage but because the work deserves to be done well. Every deliverable is an act of worship when it carries genuine excellence.',
      },
      {
        name: 'Al-Latif',
        name_ar: 'اللطيف',
        title: 'The Subtle, The All-Aware',
        body: 'Al-Latif attends to the finest details — the subtleties that others miss. In delivery, this means attending to what the client did not explicitly ask for but genuinely needs: the communication, the care, the quality of presence, the unspoken expectation.',
      },
    ],
    dua: {
      title: 'Before Delivering Work',
      resumeTitle: 'Before Resuming Delivery',
      arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
      trans: 'Allāhumma aʿinnī ʿalā dhikrika wa shukrika wa ḥusni ʿibādatik',
      meaning: 'O Allah, help me to remember You, to be grateful to You, and to worship You in an excellent manner.',
      source: 'Sunan Abi Dawud 1522',
    },
    readiness: {
      frame: 'Al-Muhsin asks: are you bringing ihsan to this delivery, or just getting it done?',
      rows: [
        {
          id: 'M1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Are you delivering with ihsan or with adequacy?',
          governing: 'You are approaching this deliverable with the intention of excellence, not just completion.',
          notYet: 'You are doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'M2', attr: 'Al-Muhsin',
          governing: 'You would redo this if it fell short — from genuine care, not perfectionism.',
          notYet: 'The work feels like an obligation to discharge rather than an act to offer.',
        },
        {
          id: 'L1', attr: 'Al-Latif', attr_ar: 'اللطيف', attrTitle: 'The Subtle',
          attrFrame: 'Are you attending to what was not said but genuinely needed?',
          governing: 'You have considered the unspoken expectations and subtle needs behind the explicit deliverable.',
          notYet: 'You are delivering exactly what was specified without asking whether it is what was actually needed.',
        },
        {
          id: 'L2', attr: 'Al-Latif',
          governing: 'Your communication quality during delivery matches your work quality.',
          notYet: 'You are delivering good work but communicating poorly — the client cannot see what they are receiving.',
        },
      ],
      governing: [
        'You are approaching this deliverable with the intention of excellence, not just completion.',
        'You would redo this if it fell short — from genuine care, not perfectionism.',
        'You have considered the unspoken expectations and subtle needs behind the explicit deliverable.',
        'Your communication quality during delivery matches your work quality.',
      ],
      notYet: [
        'You are doing the minimum that will pass, not the most genuinely possible right now.',
        'The work feels like an obligation to discharge rather than an act to offer.',
        'You are delivering exactly what was specified without asking whether it is what was actually needed.',
        'You are delivering good work but communicating poorly — the client cannot see what they are receiving.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of your delivery. Al-Latif attended to the subtleties you brought.',
      governing: [
        'You can point to at least one place in the delivery today where you chose quality over speed.',
        'You attended to something the client did not ask for but genuinely needed.',
      ],
      notYet: [
        'You cut corners on something and justified it as efficiency.',
        'The communication around the delivery fell short of the work itself.',
      ],
    },
  },

  RET: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Loving',
        body: 'Al-Wadud loves with constancy — not conditional on performance. Client retention rooted in genuine care outlasts retention built on tactics. Love the client enough to tell them hard truths, to invest in their growth, to remember them when there is nothing to sell.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Preserver',
        body: 'Al-Hafiz preserves and protects what has been entrusted. Every client relationship is an amanah — a trust placed in your care. Retention is faithful stewardship of that trust: remembering, protecting, and nurturing what was built.',
      },
    ],
    dua: {
      title: 'Before Client Retention and Relationship Work',
      resumeTitle: 'Before Returning to Retention Work',
      arabic: 'اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا وَأَصْلِحْ ذَاتَ بَيْنِنَا',
      trans: 'Allāhumma allif bayna qulūbinā wa aṣliḥ dhāta bayninā',
      meaning: 'O Allah, bring our hearts together and set right the matters between us.',
      source: 'Sunan Abi Dawud 969',
    },
    readiness: {
      frame: 'Al-Wadud asks: is your care for this client genuine, or purely commercial?',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Loving',
          attrFrame: 'Is your investment in this relationship genuine?',
          governing: 'Your care for this client would persist even if they stopped paying — it is not purely transactional.',
          notYet: 'Your attention to this client is driven entirely by their commercial value.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'You are willing to tell this client hard truths that serve them even if it risks the relationship.',
          notYet: 'You are managing the relationship rather than genuinely serving the client.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Are you faithfully preserving what was built with this client?',
          governing: 'You have kept track of what matters to this client and followed through on commitments made.',
          notYet: 'Commitments made in the early relationship have not been systematically honored.',
        },
        {
          id: 'H2', attr: 'Al-Hafiz',
          governing: "You are actively protecting this client's outcomes — not waiting for them to raise problems.",
          notYet: 'You are reactive rather than proactive in preserving client value.',
        },
      ],
      governing: [
        'Your care for this client would persist even if they stopped paying — it is not purely transactional.',
        'You are willing to tell this client hard truths that serve them even if it risks the relationship.',
        'You have kept track of what matters to this client and followed through on commitments made.',
        "You are actively protecting this client's outcomes — not waiting for them to raise problems.",
      ],
      notYet: [
        'Your attention to this client is driven entirely by their commercial value.',
        'You are managing the relationship rather than genuinely serving the client.',
        'Commitments made in the early relationship have not been systematically honored.',
        'You are reactive rather than proactive in preserving client value.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud loved through your care. Al-Hafiz preserved what was built.',
      governing: [
        'You invested in a client relationship today where there was nothing immediate to sell.',
        'You protected a client outcome without being asked.',
      ],
      notYet: [
        'Your client interactions today were driven by commercial need, not genuine care.',
        'Something that was promised to a client earlier was not preserved or followed through.',
      ],
    },
  },

  OPT: {
    attrs: [
      {
        name: 'Al-Hasib',
        name_ar: 'الحسيب',
        title: 'The Reckoner',
        body: 'Al-Hasib keeps perfect account of every act. Optimization begins with honest reckoning — what worked, what did not, and why. Fudging the numbers or avoiding the hard truth delays the accountability that Al-Hasib has already completed.',
      },
      {
        name: 'Al-Khabir',
        name_ar: 'الخبير',
        title: 'The All-Aware',
        body: 'Al-Khabir is aware of the subtlest dynamics — the hidden causes, the lagging indicators, the patterns not yet visible. Review your outcomes not just with metrics but with wisdom: what did the results actually tell you, and what did you miss?',
      },
    ],
    dua: {
      title: 'Before Reviewing and Optimizing',
      resumeTitle: 'Before Returning to Optimization Work',
      arabic: 'اللَّهُمَّ أَرِنَا الأُمُورَ كَمَا هِيَ',
      trans: 'Allāhumma arina-l-umūra kamā hiya',
      meaning: 'O Allah, show us things as they truly are.',
      source: 'Attributed to Ali ibn Abi Talib — widely transmitted in supplication',
    },
    readiness: {
      frame: 'Al-Hasib asks: are you willing to reckon honestly — even where the numbers are uncomfortable?',
      rows: [
        {
          id: 'H1', attr: 'Al-Hasib', attr_ar: 'الحسيب', attrTitle: 'The Reckoner',
          attrFrame: 'Are you reckoning honestly or selectively?',
          governing: 'You are looking at the full picture — including what failed and what you do not understand yet.',
          notYet: 'You are emphasizing favorable metrics and avoiding honest engagement with failures.',
        },
        {
          id: 'H2', attr: 'Al-Hasib',
          governing: 'The decisions you make from this review are based on what the data actually says, not what you hoped it would say.',
          notYet: 'You are confirmation-biased — using the review to validate what you already believed.',
        },
        {
          id: 'K1', attr: 'Al-Khabir', attr_ar: 'الخبير', attrTitle: 'The All-Aware',
          attrFrame: 'Are you looking beneath the surface metrics?',
          governing: 'You are asking why results came in as they did — not just recording what happened.',
          notYet: 'The review is superficial — capturing metrics without understanding causes.',
        },
        {
          id: 'K2', attr: 'Al-Khabir',
          governing: 'You have identified at least one insight in this cycle that surprised you — evidence that Al-Khabir revealed something.',
          notYet: 'The review confirmed everything you already knew — no genuine learning emerged.',
        },
      ],
      governing: [
        'You are looking at the full picture — including what failed and what you do not understand yet.',
        'The decisions you make from this review are based on what the data actually says, not what you hoped.',
        'You are asking why results came in as they did — not just recording what happened.',
        'You have identified at least one insight in this cycle that surprised you.',
      ],
      notYet: [
        'You are emphasizing favorable metrics and avoiding honest engagement with failures.',
        'You are confirmation-biased — using the review to validate what you already believed.',
        'The review is superficial — capturing metrics without understanding causes.',
        'The review confirmed everything you already knew — no genuine learning emerged.',
      ],
    },
    reflection: {
      frame: 'Al-Hasib completed the account. Al-Khabir revealed what was hidden.',
      governing: [
        'You reckoned honestly today — including with what you did not want to see.',
        'Something emerged in the review that genuinely surprised or taught you.',
      ],
      notYet: [
        'The review was more comfortable than honest.',
        'You are carrying forward an unresolved pattern without committing to change it.',
      ],
    },
  },
};

/** Get Islamic data for a BBOS stage by ID */
export function getBbosStageIslamic(stageId) {
  return BBOS_STAGE_ISLAMIC[stageId] || null;
}
