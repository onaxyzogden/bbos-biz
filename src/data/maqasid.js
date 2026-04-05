// Maqasid al-Shari'ah pillar definitions
// Six pillars governing the BBOS module hierarchy

export const MAQASID_PILLARS = [
  {
    id: 'faith',
    order: 1,
    sidebarLabel: 'Faith',
    universalLabel: 'Purpose',
    stewardshipLabel: 'Spiritual Governance',
    universalStewardship: 'Purpose Alignment',
    arabicRoot: 'Hifz al-Din',
    arabicRootAr: 'حفظ الدين',
    rootAction: 'Aligning',
    accentColor: '#C8A96E',
    icon: 'BookHeart',
    subModuleIds: ['five-pillars', 'quran', 'hadith'],
    status: 'active',
    readinessAyatKey: 'spirituality',
  },
  {
    id: 'life',
    order: 2,
    sidebarLabel: 'Life',
    universalLabel: 'Vitality',
    stewardshipLabel: 'Vitality Stewardship',
    universalStewardship: 'Vitality Management',
    arabicRoot: 'Hifz al-Nafs',
    arabicRootAr: 'حفظ النفس',
    rootAction: 'Nurturing',
    accentColor: '#6EAD8A',
    icon: 'HeartPulse',
    subModuleIds: [],
    status: 'scaffold',
    readinessAyatKey: 'rest',
  },
  {
    id: 'intellect',
    order: 3,
    sidebarLabel: 'Intellect',
    universalLabel: 'Clarity',
    stewardshipLabel: 'Cognitive Integrity',
    universalStewardship: 'Cognitive Clarity',
    arabicRoot: "Hifz al-\u02BFAql",
    arabicRootAr: 'حفظ العقل',
    rootAction: 'Clarifying',
    accentColor: '#6E8EAD',
    icon: 'Brain',
    subModuleIds: [],
    status: 'scaffold',
    readinessAyatKey: 'learning',
  },
  {
    id: 'family',
    order: 4,
    sidebarLabel: 'People',
    universalLabel: 'Legacy',
    stewardshipLabel: 'Lineage & Legacy',
    universalStewardship: 'Legacy Stewardship',
    arabicRoot: 'Hifz al-Nasl',
    arabicRootAr: 'حفظ النسل',
    rootAction: 'Connecting',
    accentColor: '#AD6E9E',
    icon: 'Users',
    subModuleIds: ['family', 'neighbors', 'community'],
    status: 'active',
    readinessAyatKey: 'family',
  },
  {
    id: 'wealth',
    order: 5,
    sidebarLabel: 'Wealth',
    universalLabel: 'Resources',
    stewardshipLabel: 'Resource Orchestration',
    universalStewardship: 'Resource Management',
    arabicRoot: 'Hifz al-Mal',
    arabicRootAr: 'حفظ المال',
    rootAction: 'Flowing',
    accentColor: '#8EAD6E',
    icon: 'Coins',
    subModuleIds: ['money', 'work', 'office', 'tech', 'people'],
    status: 'active',
    readinessAyatKey: 'work',
  },
  {
    id: 'environment',
    order: 6,
    sidebarLabel: 'Environment',
    universalLabel: 'Ecology',
    stewardshipLabel: 'Ecological Symbiosis',
    universalStewardship: 'Ecological Balance',
    arabicRoot: "Hifz al-Bi\u02BFah",
    arabicRootAr: 'حفظ البيئة',
    rootAction: 'Integrating',
    accentColor: '#6EADAD',
    icon: 'TreePine',
    subModuleIds: [],
    status: 'scaffold',
    readinessAyatKey: 'community',
  },
];

/** Find the parent pillar for a given module ID */
export function getPillarForModule(moduleId) {
  return MAQASID_PILLARS.find((p) => p.subModuleIds.includes(moduleId)) || null;
}

/** Get display label based on values layer */
export function getPillarLabel(pillar, valuesLayer) {
  return valuesLayer === 'islamic' ? pillar.sidebarLabel : pillar.universalLabel;
}

/** Get stewardship description based on values layer */
export function getPillarStewardship(pillar, valuesLayer) {
  return valuesLayer === 'islamic' ? pillar.stewardshipLabel : pillar.universalStewardship;
}
