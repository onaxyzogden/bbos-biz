// Seed tasks for Environment pillar submodules (Hifz al-Bi'ah).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const ENVIRONMENT_SEED_TASKS = {
  // ── RESOURCE CONSUMPTION (WATER & ENERGY) ──
  environment_resource_core: [
    { title: 'Audit household water usage — identify and fix all leaks, dripping taps, and wasteful habits', priority: 'urgent', tags: ['water', 'israf'] },
    { title: 'Practise the Sunnah of wudu — use minimal water (3 scoops per limb), even at a running stream', priority: 'urgent', tags: ['wudu', 'sunnah'] },
    { title: 'Turn off all unused lights, appliances, and chargers — eliminate standby energy waste', priority: 'high', tags: ['energy', 'israf'] },
    { title: 'Learn the Quranic prohibition of israf (extravagance) and its application to resources', priority: 'medium', tags: ['israf', 'quran'] },
    { title: 'Track monthly electricity and water bills — establish a baseline for reduction targets', priority: 'medium', tags: ['tracking', 'planning'] },
  ],
  environment_resource_growth: [
    { title: 'Replace all incandescent bulbs with LED equivalents throughout the home', priority: 'high', tags: ['energy', 'efficiency'] },
    { title: 'Install water-saving aerators or low-flow showerheads in all taps and showers', priority: 'high', tags: ['water', 'efficiency'] },
    { title: 'Set a household water and energy reduction target — aim for 20% less than current baseline', priority: 'medium', tags: ['planning', 'goals'] },
    { title: 'Research government rebates or community programmes for energy-efficient home upgrades', priority: 'low', tags: ['energy', 'planning'] },
  ],
  environment_resource_excellence: [
    { title: 'Install solar panels or transition to a renewable energy provider for your home', priority: 'medium', tags: ['renewable', 'solar'] },
    { title: 'Install a rainwater harvesting system for garden and non-potable household use', priority: 'low', tags: ['water', 'renewable'] },
    { title: 'Achieve net-zero or carbon-neutral household energy consumption — document and share your journey', priority: 'low', tags: ['net-zero', 'legacy'] },
  ],

  // ── WASTE & POLLUTION MANAGEMENT ──
  environment_waste_core: [
    { title: 'Set up a proper recycling system at home — label bins clearly for paper, plastic, glass, and metal', priority: 'high', tags: ['recycling', 'waste'] },
    { title: 'Identify and safely dispose of all toxic household chemicals — paint, batteries, electronics', priority: 'urgent', tags: ['toxic-waste', 'safety'] },
    { title: 'Stop littering and remove harmful waste from public spaces — "removing harm is sadaqah"', priority: 'high', tags: ['sadaqah', 'cleanliness'] },
    { title: 'Learn Islamic principles of taharah (purity) and their extension to environmental cleanliness', priority: 'medium', tags: ['taharah', 'study'] },
    { title: 'Reduce household food waste — plan meals, store correctly, and compost unavoidable scraps', priority: 'high', tags: ['food-waste', 'planning'] },
  ],
  environment_waste_growth: [
    { title: 'Eliminate single-use plastics — replace with reusable bags, bottles, containers, and cutlery', priority: 'high', tags: ['plastic', 'waste'] },
    { title: 'Start a home composting system for organic kitchen and garden waste', priority: 'medium', tags: ['composting', 'waste'] },
    { title: 'Adopt a "buy less, buy better" purchasing philosophy — quality over quantity', priority: 'medium', tags: ['consumption', 'mindfulness'] },
    { title: 'Donate or responsibly rehome unwanted items instead of discarding them', priority: 'medium', tags: ['donation', 'circular'] },
  ],
  environment_waste_excellence: [
    { title: 'Achieve a near-zero waste household — measure and document monthly waste output', priority: 'medium', tags: ['zero-waste', 'measurement'] },
    { title: 'Advocate for better waste management in your workplace, masjid, or community organisation', priority: 'low', tags: ['advocacy', 'community'] },
    { title: 'Launch or join a community clean-up initiative — model Islamic environmental stewardship publicly', priority: 'low', tags: ['community', 'dawah'] },
  ],

  // ── ECOSYSTEM & BIODIVERSITY ──
  environment_ecosystem_core: [
    { title: 'Stop all unnecessary destruction of plants, trees, and local wildlife in your surroundings', priority: 'urgent', tags: ['biodiversity', 'khilafah'] },
    { title: 'Eliminate cruelty to animals — learn Islamic rules on the rights of animals (huquq al-hayawan)', priority: 'urgent', tags: ['animals', 'fiqh'] },
    { title: 'Plant at least one tree or native plant — follow the hadith "even if the Hour is near, plant it"', priority: 'high', tags: ['planting', 'sunnah'] },
    { title: 'Learn the Islamic concept of khilafah (vicegerency) — your role as caretaker of the earth', priority: 'medium', tags: ['khilafah', 'study'] },
    { title: 'Avoid purchasing products made from endangered species or illegal wildlife trade', priority: 'high', tags: ['biodiversity', 'ethics'] },
  ],
  environment_ecosystem_growth: [
    { title: 'Plant native species in your garden, balcony, or community space to support local pollinators', priority: 'high', tags: ['planting', 'biodiversity'] },
    { title: 'Reduce or eliminate red meat consumption 2–3 days per week — lower your land and water footprint', priority: 'medium', tags: ['diet', 'ecology'] },
    { title: 'Participate in a local tree-planting, park restoration, or rewilding initiative', priority: 'medium', tags: ['restoration', 'community'] },
    { title: 'Learn about your local ecosystem — identify native species of birds, plants, and insects in your area', priority: 'low', tags: ['awareness', 'biodiversity'] },
  ],
  environment_ecosystem_excellence: [
    { title: 'Fund or actively participate in a large-scale land rehabilitation or carbon sequestration project', priority: 'medium', tags: ['restoration', 'carbon'] },
    { title: 'Establish a community food garden or urban farm on underused land', priority: 'low', tags: ['food-security', 'community'] },
    { title: 'Develop an Islamic environmental education programme for your masjid or school', priority: 'low', tags: ['education', 'dawah'] },
  ],

  // ── ETHICAL SOURCING & CIRCULARITY ──
  environment_sourcing_core: [
    { title: 'Audit your main purchases — identify brands or suppliers tied to environmental exploitation or child labour', priority: 'urgent', tags: ['audit', 'ethics'] },
    { title: 'Ensure all food purchases meet halal AND tayyib standards — pure in source, not just slaughter method', priority: 'urgent', tags: ['halal', 'tayyib'] },
    { title: 'Stop buying fast fashion — commit to purchasing only what you need, with longer useful life', priority: 'high', tags: ['fashion', 'consumption'] },
    { title: 'Learn the Islamic principle of tayyib (wholesome/pure) as applied to sourcing and consumption', priority: 'medium', tags: ['tayyib', 'study'] },
    { title: 'Identify and switch to at least three ethical, local, or fair-trade alternatives for everyday purchases', priority: 'high', tags: ['fair-trade', 'local'] },
  ],
  environment_sourcing_growth: [
    { title: 'Shift grocery shopping toward local farmers\' markets, halal organic suppliers, or community-supported agriculture', priority: 'high', tags: ['local', 'food'] },
    { title: 'Research and adopt a Shariah-compatible ethical investment screen — exclude harmful industries', priority: 'medium', tags: ['investing', 'ethics'] },
    { title: 'Build a capsule wardrobe — buy fewer, higher-quality, ethically made garments that last', priority: 'medium', tags: ['fashion', 'mindfulness'] },
    { title: 'Prioritise repair over replacement — fix electronics, clothing, and furniture before discarding', priority: 'medium', tags: ['repair', 'circular'] },
  ],
  environment_sourcing_excellence: [
    { title: 'Invest in or co-found a business built on circular economy principles — closed-loop, zero-waste by design', priority: 'low', tags: ['circular-economy', 'business'] },
    { title: 'Build a community purchasing collective to negotiate with ethical suppliers at scale', priority: 'low', tags: ['community', 'impact'] },
    { title: 'Publish a sourcing guide for your community — halal, tayyib, and environmentally responsible options', priority: 'low', tags: ['dawah', 'legacy'] },
  ],
};
