// Maqasid al-Shari'ah pillar definitions
// Seven pillars governing the BBOS module hierarchy

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
    subModuleIds: ['faith-shahada', 'faith-salah', 'faith-zakah', 'faith-sawm', 'faith-hajj', 'quran', 'hadith', 'islamic-knowledge', 'community-engagement', 'ethical-living'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'faith',
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
    subModuleIds: ['life-physical', 'life-mental', 'life-safety', 'life-social'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'life',
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
    subModuleIds: ['intellect-learning', 'intellect-thinking', 'intellect-cognitive', 'intellect-professional'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'intellect',
  },
  {
    id: 'family',
    order: 4,
    sidebarLabel: 'Family',
    universalLabel: 'Legacy',
    stewardshipLabel: 'Lineage & Legacy',
    universalStewardship: 'Legacy Stewardship',
    arabicRoot: 'Hifz al-Nasl',
    arabicRootAr: 'حفظ النسل',
    rootAction: 'Connecting',
    accentColor: '#AD6E9E',
    icon: 'Users',
    subModuleIds: ['family-marriage', 'family-parenting', 'family-kinship', 'family-home'],
    status: 'active',
    relationship: 'moontrance-partial',
    readinessAyatKey: 'people',
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
    subModuleIds: ['money', 'work', 'office', 'tech', 'people', 'wealth-earning', 'wealth-financial', 'wealth-ownership', 'wealth-circulation'],
    status: 'active',
    relationship: 'bbos-contained',
    readinessAyatKey: 'wealth',
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
    subModuleIds: ['env-resource', 'env-waste', 'env-ecosystem', 'env-sourcing'],
    status: 'active',
    relationship: 'self-contained',
    readinessAyatKey: 'environment',
  },
  {
    id: 'ummah',
    order: 7,
    sidebarLabel: 'Ummah',
    universalLabel: 'Collective',
    stewardshipLabel: 'Collective Stewardship',
    universalStewardship: 'Community Impact',
    arabicRoot: 'Hifz al-Ummah',
    arabicRootAr: 'حفظ الأمة',
    rootAction: 'Unifying',
    accentColor: '#AD8E6E',
    icon: 'Globe',
    subModuleIds: ['collective', 'neighbors', 'community'],
    status: 'active',
    relationship: 'moontrance-atlas',
    readinessAyatKey: 'community',
  },
];

/** Find a pillar by its own ID */
export function getPillarById(id) {
  return MAQASID_PILLARS.find((p) => p.id === id) || null;
}

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
