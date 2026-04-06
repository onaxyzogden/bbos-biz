import {
  Apple,
  Shield,
  BrainCircuit,
  Diamond,
  Sparkles,
  Lock,
  ArrowRight,
  ScrollText,
  BookOpen,
} from 'lucide-react';
import './LifeDashboard.css';

const HERO_IMG =
  'https://png.pngtree.com/thumb_back/fh260/background/20250227/pngtree-an-artistic-representation-of-the-human-body-made-entirely-from-fruits-image_17021515.jpg';

const CORE_PILLARS = [
  { id: 'physical', label: 'Physical Health', pct: 88, Icon: Apple, active: true },
  { id: 'safety', label: 'Safety & Security', pct: 40, Icon: Shield, active: false },
];

const GROWTH_ITEMS = [
  {
    id: 'emotional',
    Icon: BrainCircuit,
    title: 'Emotional Well-being',
    desc: 'Cultivating internal peace and resilience against life\u2019s tribulations.',
    status: 'ACTIVE STUDY',
    statusClass: 'life-badge--active',
    progress: 'In Progress',
  },
];

const EXCELLENCE_ITEMS = [
  {
    id: 'social',
    Icon: Diamond,
    title: 'Social Character',
    desc: 'Achieving excellence in how you manifest your truth to others.',
  },
  {
    id: 'legacy',
    Icon: Sparkles,
    title: 'Legacy Refinement',
    desc: 'The final layer of excellence in spiritual and worldly conduct.',
  },
];

export default function LifeDashboard() {
  return (
    <div className="life-dash font-manrope">

      {/* ── Header ── */}
      <header className="life-header">
        <div className="life-header__left">
          <span className="life-badge life-badge--module">MODULE II</span>
          <h1 className="life-header__title">Life (Nafs)</h1>
          <blockquote className="life-header__verse">
            <p>
              "O children of Adam... eat and drink, but be not excessive. Indeed,
              He likes not those who commit excess."
            </p>
            <cite className="life-header__cite">— Surah Al-A'raf 7:31</cite>
          </blockquote>
        </div>
        <div className="life-header__right">
          <span className="life-header__pct">64%</span>
          <span className="life-header__pct-label">Progress to Mastery</span>
          <div className="life-header__progress-wrap">
            <div className="life-progress-bar">
              <div className="life-progress-fill" style={{ width: '64%' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="life-hero-card">
        <img
          className="life-hero-card__image"
          src={HERO_IMG}
          alt="Meditation and physical balance"
        />
        <div className="life-hero-card__gradient" />
        <div className="life-hero-card__content">
          <span className="life-label life-label--light">Current Focus</span>
          <h2 className="life-hero-card__title">Physical Health</h2>
          <p className="life-hero-card__desc">
            Honoring the vessel of the soul through conscious movement and
            mindful consumption.
          </p>
          <button className="life-hero-card__cta">
            Continue Practice
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="life-pillars">

        {/* Level 1: Core */}
        <div className="life-core-card">
          <span className="life-badge life-badge--dark">LEVEL 1</span>
          <h3 className="life-core-card__title">Core</h3>
          <p className="life-core-card__desc">
            Foundational elements required for the preservation of life and
            dignity.
          </p>
          <div className="life-core-list">
            {CORE_PILLARS.map(({ id, label, pct, Icon, active }) => (
              <div
                key={id}
                className={`life-core-item${active ? '' : ' life-core-item--dim'}`}
              >
                <div className="life-core-item__icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="life-core-item__info">
                  <div className="life-core-item__row">
                    <span className="life-core-item__label">{label}</span>
                    <span className="life-core-item__pct">{pct}%</span>
                  </div>
                  <div className="life-progress-bar life-progress-bar--sm life-progress-bar--onprimary">
                    <div
                      className="life-progress-fill life-progress-fill--light"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="life-pillars__right">

          {/* Level 2: Growth */}
          <div className="life-needs-card">
            <span className="life-badge life-badge--secondary">LEVEL 2</span>
            <h3 className="life-needs-card__title">Growth</h3>
            <p className="life-needs-card__desc">
              Comforts and expansions that make life easier and more expansive.
            </p>
            <div className="life-study-list">
              {GROWTH_ITEMS.map(({ id, Icon, title, desc, status, statusClass, progress }) => (
                <div key={id} className="life-study-item">
                  <div className="life-study-item__header">
                    <Icon size={20} />
                    <span className="life-study-item__name">{title}</span>
                  </div>
                  <p className="life-study-item__desc">{desc}</p>
                  <div className="life-study-item__footer">
                    <span className={statusClass}>{status}</span>
                    <span className="life-study-item__progress">{progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3: Excellence */}
          <div className="life-excellence-card">
            <span className="life-badge life-badge--tertiary">LEVEL 3</span>
            <h3 className="life-excellence-card__title">Excellence</h3>
            <p className="life-excellence-card__desc">
              The refinement of character and social presence into a form of art.
            </p>
            <div className="life-locked-list">
              {EXCELLENCE_ITEMS.map(({ id, Icon, title, desc }) => (
                <div key={id} className="life-locked-item">
                  <div className="life-locked-item__header">
                    <Icon size={20} />
                    <Lock size={14} />
                  </div>
                  <h4 className="life-locked-item__title">{title}</h4>
                  <p className="life-locked-item__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit CTA */}
          <div className="life-audit-cta">
            <div className="life-audit-cta__bg" />
            <div className="life-audit-cta__content">
              <h4 className="life-audit-cta__title">Weekly Maqasid Audit</h4>
              <p className="life-audit-cta__desc">
                Reflect on your physical and spiritual equilibrium over the past
                seven days.
              </p>
            </div>
            <button className="life-audit-cta__btn">Begin Audit</button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="life-footer">
        <div className="life-footer__text">
          <span>Modern Manuscript &copy; 2024</span>
          <div className="life-footer__dot" />
          <span>Life Module Details</span>
        </div>
        <div className="life-footer__icons">
          <ScrollText size={20} />
          <BookOpen size={20} />
        </div>
      </footer>

    </div>
  );
}
