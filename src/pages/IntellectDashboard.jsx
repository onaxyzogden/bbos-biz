import {
  BookOpen,
  BrainCircuit,
  MessageSquare,
  Circle,
  GraduationCap,
  Lock,
  ArrowRight,
  ScrollText,
} from 'lucide-react';
import './IntellectDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLUmtYviKYxyCwVDBNoL37ZcmqKsc4f5HAiJ_qRHCqLQq3GH6AzFVRB_LeEAG9f1vW1xE7FP6aTTDxIpkdrf5Ytz6d00InwoXeaDUCwPIrM1wS_qN1a8l8ULH7guCPckCekon-7OfEylwcHXciyu6NXpncc8GpJb_G6iDJfPAQylx6YbVB2oijO345mAzbHHs2ZGvFesxrO8aUs5WPSIwUR1jHIbh5wVAv3GWoHGh2tXmi43rV72GbyxbLfQtIFXBwJrarj9vTMU';

const CORE_PILLARS = [
  { id: 'literacy', label: 'Learning & Literacy', pct: 100, Icon: BookOpen, active: true },
  { id: 'cognitive', label: 'Cognitive Integrity', pct: 85, Icon: BrainCircuit, active: true },
];

const GROWTH_ITEMS = [
  {
    id: 'critical-thinking',
    Icon: MessageSquare,
    title: 'Critical Thinking',
    desc: 'Analyzing the intersection of dialectical inquiry and spiritual humility.',
    status: 'ACTIVE STUDY',
    statusClass: 'intellect-badge--active',
    progress: 'In Progress',
  },
];

const EXCELLENCE_ITEMS = [
  {
    id: 'mastery',
    Icon: GraduationCap,
    title: 'Professional Mastery',
    desc: 'Achieving specialized expertise to serve the community through knowledge.',
  },
];

export default function IntellectDashboard() {
  return (
    <div className="intellect-dash font-manrope">

      {/* ── Header ── */}
      <header className="intellect-header">
        <div className="intellect-header__left">
          <span className="intellect-badge intellect-badge--module">MODULE III</span>
          <h1 className="intellect-header__title">Intellect (Aql)</h1>
          <blockquote className="intellect-header__verse">
            <p>
              "Indeed, in the creation of the heavens and the earth and the
              alternation of the night and the day are signs for those of
              understanding (Ulu al-Albab)."
            </p>
            <cite className="intellect-header__cite">— Surah Ali 'Imran 3:190</cite>
          </blockquote>
        </div>
        <div className="intellect-header__right">
          <span className="intellect-header__pct">64%</span>
          <span className="intellect-header__pct-label">Progress to Mastery</span>
          <div className="intellect-header__progress-wrap">
            <div className="intellect-progress-bar">
              <div className="intellect-progress-fill" style={{ width: '64%' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="intellect-hero-card">
        <img
          className="intellect-hero-card__image"
          src={HERO_IMG}
          alt="Islamic geometric star patterns carved in stone"
        />
        <div className="intellect-hero-card__gradient" />
        <div className="intellect-hero-card__content">
          <span className="intellect-label intellect-label--light">Current Focus</span>
          <h2 className="intellect-hero-card__title">Critical Thinking</h2>
          <p className="intellect-hero-card__desc">
            Refining the capacity for discernment through dialectical inquiry and
            spiritual humility.
          </p>
          <button className="intellect-hero-card__cta">
            Resume Lesson
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="intellect-pillars">

        {/* Level 1: Core Pillars */}
        <div className="intellect-core-card">
          <span className="intellect-badge intellect-badge--dark">LEVEL 1</span>
          <h3 className="intellect-core-card__title">Core Pillars</h3>
          <p className="intellect-core-card__desc">
            Foundational elements required for cognitive integrity and literacy.
          </p>
          <div className="intellect-core-list">
            {CORE_PILLARS.map(({ id, label, pct, Icon, active }) => (
              <div
                key={id}
                className={`intellect-core-item${active ? '' : ' intellect-core-item--dim'}`}
              >
                <div className="intellect-core-item__icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="intellect-core-item__info">
                  <div className="intellect-core-item__row">
                    <span className="intellect-core-item__label">{label}</span>
                    <span className="intellect-core-item__pct">{pct}%</span>
                  </div>
                  <div className="intellect-progress-bar intellect-progress-bar--sm intellect-progress-bar--onprimary">
                    <div
                      className="intellect-progress-fill intellect-progress-fill--light"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="intellect-pillars__right">

          {/* Level 2: Growth Space */}
          <div className="intellect-needs-card">
            <span className="intellect-badge intellect-badge--secondary">LEVEL 2</span>
            <h3 className="intellect-needs-card__title">Growth Space</h3>
            <p className="intellect-needs-card__desc">
              Expansions of the mind through structured study and engagement.
            </p>
            <div className="intellect-study-list">
              {GROWTH_ITEMS.map(({ id, Icon, title, desc, status, statusClass, progress }) => (
                <div key={id} className="intellect-study-item">
                  <div className="intellect-study-item__header">
                    <Icon size={20} />
                    <span className="intellect-study-item__name">{title}</span>
                  </div>
                  <p className="intellect-study-item__desc">{desc}</p>
                  <div className="intellect-study-item__footer">
                    <span className={statusClass}>{status}</span>
                    <span className="intellect-study-item__progress">{progress}</span>
                  </div>
                </div>
              ))}
              {/* Queued item rendered inline */}
              <div className="intellect-queued-item">
                <span className="intellect-queued-item__label">Structured Study</span>
                <Circle size={14} />
              </div>
            </div>
          </div>

          {/* Level 3: Embellishments */}
          <div className="intellect-excellence-card">
            <span className="intellect-badge intellect-badge--tertiary">LEVEL 3</span>
            <h3 className="intellect-excellence-card__title">Embellishments</h3>
            <p className="intellect-excellence-card__desc">
              The refinement of scholarly pursuit into professional mastery.
            </p>
            <div className="intellect-locked-list">
              {EXCELLENCE_ITEMS.map(({ id, Icon, title, desc }) => (
                <div key={id} className="intellect-locked-item">
                  <div className="intellect-locked-item__header">
                    <Icon size={20} />
                    <Lock size={14} />
                  </div>
                  <h4 className="intellect-locked-item__title">{title}</h4>
                  <p className="intellect-locked-item__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Intellectual Audit CTA */}
          <div className="intellect-audit-cta">
            <div className="intellect-audit-cta__bg" />
            <div className="intellect-audit-cta__content">
              <h4 className="intellect-audit-cta__title">Intellectual Audit</h4>
              <p className="intellect-audit-cta__desc">
                Review your cognitive developments and scholarly milestones.
              </p>
            </div>
            <button className="intellect-audit-cta__btn">Begin Audit</button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="intellect-footer">
        <div className="intellect-footer__text">
          <span>Modern Manuscript &copy; 2024</span>
          <div className="intellect-footer__dot" />
          <span>Intellect Module Details</span>
        </div>
        <div className="intellect-footer__icons">
          <ScrollText size={20} />
          <BookOpen size={20} />
        </div>
      </footer>

    </div>
  );
}
