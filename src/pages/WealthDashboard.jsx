import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  PiggyBank,
  Scale,
  Gift,
  ArrowRight,
  ScrollText,
  BookOpen,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import './WealthDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLUmtYviKYxyCwVDBNoL37ZcmqKsc4f5HAiJ_qRHCqLQq3GH6AzFVRB_LeEAG9f1vW1xE7FP6aTTDxIpkdrf5Ytz6d00InwoXeaDUCwPIrM1wS_qN1a8l8ULH7guCPckCekon-7OfEylwcHXciyu6NXpncc8GpJb_G6iDJfPAQylx6YbVB2oijO345mAzbHHs2ZGvFesxrO8aUs5WPSIwUR1jHIbh5wVAv3GWoHGh2tXmi43rV72GbyxbLfQtIFXBwJrarj9vTMU';

const MODULE_IDS = ['earning', 'financial', 'ownership', 'circulation'];

const SUBMODULE_ROUTES = {
  earning: '/app/wealth-earning',
  financial: '/app/wealth-financial',
  ownership: '/app/wealth-ownership',
  circulation: '/app/wealth-circulation',
};

const PILLARS = [
  { id: 'earning', label: 'Halal Earning', Icon: Wallet },
  { id: 'financial', label: 'Financial Management', Icon: PiggyBank },
  { id: 'ownership', label: 'Ownership & Rights', Icon: Scale },
  { id: 'circulation', label: 'Wealth Circulation', Icon: Gift },
];

export default function WealthDashboard() {
  const navigate = useNavigate();
  const ensureWealthProjects = useProjectStore((s) => s.ensureWealthProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureWealthProjects(); }, [ensureWealthProjects]);

  useEffect(() => {
    const moduleProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of moduleProjects) { loadTasks(proj.id); }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="wealth-dash font-manrope">

      {/* ── Header ── */}
      <header className="wealth-header">
        <div className="wealth-header__left">
          <span className="wealth-badge wealth-badge--module">MODULE V</span>
          <h1 className="wealth-header__title">Wealth (Mal)</h1>
          <blockquote className="wealth-header__verse">
            <p>
              &ldquo;Those who spend their wealth in God&rsquo;s cause are like grains
              of corn that produce seven ears, each bearing a hundred grains. God gives
              multiple increase to whoever He wishes: He is limitless and all knowing.&rdquo;
            </p>
            <cite className="wealth-header__cite">&mdash; Surah Al-Baqarah 2:261 (Abdel Haleem)</cite>
          </blockquote>
        </div>
        <div className="wealth-header__right">
          <span className="wealth-header__pct">{overallPct}%</span>
          <span className="wealth-header__pct-label">Progress to Mastery</span>
          <div className="wealth-header__progress-wrap">
            <div className="wealth-progress-bar">
              <div className="wealth-progress-fill" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="wealth-hero-card">
        <img
          className="wealth-hero-card__image"
          src={HERO_IMG}
          alt="Ethical wealth and stewardship"
        />
        <div className="wealth-hero-card__gradient" />
        <div className="wealth-hero-card__content">
          <span className="wealth-label wealth-label--light">Current Focus</span>
          <h2 className="wealth-hero-card__title">Halal Earning</h2>
          <p className="wealth-hero-card__desc">
            Establishing pure sources of income — the foundation of barakah in
            every transaction and provision.
          </p>
          <button className="wealth-hero-card__cta">
            Continue Practice
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="wealth-pillars">

        {/* Level 1: Core Pillars */}
        <div className="wealth-core-card">
          <span className="wealth-badge wealth-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="wealth-core-card__title">Core Pillars</h3>
          <p className="wealth-core-card__desc">
            Foundational elements required for the preservation and stewardship of wealth.
          </p>
          <div className="wealth-core-list">
            {PILLARS.map(({ id, label, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`wealth-core-item wealth-core-item--clickable${active ? '' : ' wealth-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="wealth-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="wealth-core-item__info">
                    <div className="wealth-core-item__row">
                      <span className="wealth-core-item__label">{label}</span>
                      <span className="wealth-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="wealth-progress-bar wealth-progress-bar--sm wealth-progress-bar--onprimary">
                      <div className="wealth-progress-fill wealth-progress-fill--light" style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="wealth-pillars__right">

          {/* Level 2: Growth Space */}
          <div className="wealth-needs-card">
            <span className="wealth-badge wealth-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="wealth-needs-card__title">Growth Space</h3>
            <p className="wealth-needs-card__desc">
              Expansions of wealth stewardship through ethical ownership and investment.
            </p>
            <div className="wealth-core-list wealth-core-list--growth">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`wealth-core-item wealth-core-item--growth wealth-core-item--clickable${active ? '' : ' wealth-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="wealth-core-item__icon-wrap wealth-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="wealth-core-item__info">
                      <div className="wealth-core-item__row">
                        <span className="wealth-core-item__label">{label}</span>
                        <span className="wealth-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="wealth-progress-bar wealth-progress-bar--sm">
                        <div className="wealth-progress-fill wealth-progress-fill--growth" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Embellishments */}
          <div className="wealth-excellence-card">
            <span className="wealth-badge wealth-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="wealth-excellence-card__title">Embellishments</h3>
            <p className="wealth-excellence-card__desc">
              The refinement of wealth into lasting generosity and generational endowment.
            </p>
            <div className="wealth-core-list wealth-core-list--excellence">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`wealth-core-item wealth-core-item--excellence wealth-core-item--clickable${active ? '' : ' wealth-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="wealth-core-item__icon-wrap wealth-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="wealth-core-item__info">
                      <div className="wealth-core-item__row">
                        <span className="wealth-core-item__label">{label}</span>
                        <span className="wealth-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="wealth-progress-bar wealth-progress-bar--sm">
                        <div className="wealth-progress-fill wealth-progress-fill--excellence" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wealth Audit CTA */}
          <div className="wealth-audit-cta">
            <div className="wealth-audit-cta__bg" />
            <div className="wealth-audit-cta__content">
              <h4 className="wealth-audit-cta__title">Wealth Stewardship Audit</h4>
              <p className="wealth-audit-cta__desc">
                Review your financial health, zakat compliance, and generosity milestones.
              </p>
            </div>
            <button className="wealth-audit-cta__btn">Begin Audit</button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="wealth-footer">
        <div className="wealth-footer__text">
          <span>Modern Manuscript &copy; 2024</span>
          <div className="wealth-footer__dot" />
          <span>Wealth Module Details</span>
        </div>
        <div className="wealth-footer__icons">
          <ScrollText size={20} />
          <BookOpen size={20} />
        </div>
      </footer>

    </div>
  );
}
