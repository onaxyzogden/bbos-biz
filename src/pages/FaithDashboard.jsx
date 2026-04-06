import {
  CheckCircle2,
  HeartHandshake,
  HandHeart,
  Moon,
  BookOpen,
  Languages,
  Star,
  Sparkles,
  Lock,
  ArrowRight,
  Leaf,
  Diamond,
  Infinity,
} from 'lucide-react';
import './FaithDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yi2Heav2Z0mqhVMhhut3SHYpURYIRoOs8CGWAQNRGHMHh21moZOuIJz_k-HojEniMWaIgSgOzFcOl_ssP0q59xMBMcKNMK5DPnCzTyzVZZ9ISqoeNGRAvBl10a907uGXQrsWV4-PrKWgMNXgDLOIz7AxMRpqXgCuXIYbCd8JwwDHRqJhbPyDA_bCW3AiFM41zPspFIzfxORnBf0IGrOn3-ETpVDCGt7alE7mzjqMN_ZtILCUEEFI7KHe4xARWOXeUg6yYiFGmrU';

const CORE_PILLARS = [
  { id: 'shahada', label: 'Shahada', pct: 100, Icon: CheckCircle2, active: true },
  { id: 'salat', label: 'Salat', pct: 85, Icon: HeartHandshake, active: true },
  { id: 'zakat', label: 'Zakat & Sadaqah', pct: 32, Icon: HandHeart, active: false },
  { id: 'siyam', label: 'Siyam', pct: 0, Icon: Moon, active: false },
];

const GROWTH_ITEMS = [
  {
    id: 'names',
    Icon: BookOpen,
    title: '99 Names of Allah',
    desc: 'Internalizing the Divine attributes to reflect them in character and worship.',
    status: 'ACTIVE STUDY',
    statusClass: 'faith-badge--active',
    progress: '24/99 Known',
  },
  {
    id: 'prayer',
    Icon: Languages,
    title: 'Meaning of Prayer',
    desc: 'Understanding the Arabic translations of daily adhkar and Juz Amma.',
    status: 'QUEUED',
    statusClass: 'faith-badge--queued',
    progress: 'In Progress',
  },
];

const EXCELLENCE_ITEMS = [
  {
    id: 'representative',
    Icon: Star,
    title: 'Representative Excellence',
    desc: 'Perfecting the outward manifestation of inner faith through conduct.',
  },
  {
    id: 'ascension',
    Icon: Sparkles,
    title: 'Spiritual Ascension',
    desc: 'The final layer of excellence in spiritual intimacy and constant dhikr.',
  },
];

export default function FaithDashboard() {
  return (
    <div className="faith-dash font-manrope">

      {/* ── Header ── */}
      <header className="faith-header">
        <div className="faith-header__left">
          <span className="faith-badge faith-badge--module">MODULE I</span>
          <h1 className="faith-header__title">Faith (Deen)</h1>
          <blockquote className="faith-header__verse">
            <p>
              "Those who have believed and whose hearts are assured by the
              remembrance of Allah. Unquestionably, by the remembrance of Allah
              hearts are assured."
            </p>
            <cite className="faith-header__cite">— Surah Ar-Ra'd 13:28</cite>
          </blockquote>
        </div>
        <div className="faith-header__right">
          <span className="faith-header__pct">48%</span>
          <span className="faith-header__pct-label">Progress to Mastery</span>
          <div className="faith-header__progress-wrap">
            <div className="faith-progress-bar">
              <div className="faith-progress-fill" style={{ width: '48%' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="faith-hero-card">
        <img
          className="faith-hero-card__image"
          src={HERO_IMG}
          alt="Sacred geometry architecture"
        />
        <div className="faith-hero-card__gradient" />
        <div className="faith-hero-card__content">
          <span className="faith-label faith-label--light">Current Focus</span>
          <h2 className="faith-hero-card__title">Correct Creed (Aqidah)</h2>
          <p className="faith-hero-card__desc">
            Internalizing the foundations of belief and the six pillars of Iman
            with certainty.
          </p>
          <button className="faith-hero-card__cta">
            Continue Practice
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="faith-pillars">

        {/* Level 1: Necessities */}
        <div className="faith-core-card">
          <span className="faith-badge faith-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="faith-core-card__title">Core Pillars</h3>
          <p className="faith-core-card__desc">
            Foundational elements required for the preservation of faith and soul.
          </p>
          <div className="faith-core-list">
            {CORE_PILLARS.map(({ id, label, pct, Icon, active }) => (
              <div
                key={id}
                className={`faith-core-item${active ? '' : ' faith-core-item--dim'}`}
              >
                <div className="faith-core-item__icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="faith-core-item__info">
                  <div className="faith-core-item__row">
                    <span className="faith-core-item__label">{label}</span>
                    <span className="faith-core-item__pct">{pct}%</span>
                  </div>
                  <div className="faith-progress-bar faith-progress-bar--sm faith-progress-bar--onprimary">
                    <div
                      className="faith-progress-fill faith-progress-fill--light"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="faith-pillars__right">

          {/* Level 2: Needs */}
          <div className="faith-needs-card">
            <span className="faith-badge faith-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="faith-needs-card__title">Growth Space</h3>
            <p className="faith-needs-card__desc">
              Spiritual expansions that deepen the connection and refine the
              understanding of Deen.
            </p>
            <div className="faith-study-list">
              {GROWTH_ITEMS.map(({ id, Icon, title, desc, status, statusClass, progress }) => (
                <div key={id} className="faith-study-item">
                  <div className="faith-study-item__header">
                    <Icon size={20} />
                    <span className="faith-study-item__name">{title}</span>
                  </div>
                  <p className="faith-study-item__desc">{desc}</p>
                  <div className="faith-study-item__footer">
                    <span className={statusClass}>{status}</span>
                    <span className="faith-study-item__progress">{progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3: Excellence */}
          <div className="faith-excellence-card">
            <span className="faith-badge faith-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="faith-excellence-card__title">Embellishments</h3>
            <p className="faith-excellence-card__desc">
              The refinement of devotion and representative excellence (Ihsan).
            </p>
            <div className="faith-locked-list">
              {EXCELLENCE_ITEMS.map(({ id, Icon, title, desc }) => (
                <div key={id} className="faith-locked-item">
                  <div className="faith-locked-item__header">
                    <Icon size={20} />
                    <Lock size={14} />
                  </div>
                  <h4 className="faith-locked-item__title">{title}</h4>
                  <p className="faith-locked-item__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hajj CTA */}
          <div className="faith-hajj-cta">
            <div className="faith-hajj-cta__bg" />
            <div className="faith-hajj-cta__content">
              <h4 className="faith-hajj-cta__title">The Journey of Hajj</h4>
              <p className="faith-hajj-cta__desc">
                Begin the mandatory prerequisites and symbolic understanding for
                the ultimate pilgrimage.
              </p>
            </div>
            <button className="faith-hajj-cta__btn">Begin Prerequisites</button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="faith-footer">
        <div className="faith-footer__text">
          <span>The Modern Manuscript &copy; 2024</span>
          <div className="faith-footer__dot" />
          <span>Faith Module Details</span>
        </div>
        <div className="faith-footer__icons">
          <Leaf size={20} />
          <Diamond size={20} />
          <Infinity size={20} />
        </div>
      </footer>

    </div>
  );
}
