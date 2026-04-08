import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets,
  Recycle,
  TreeDeciduous,
  ShoppingBag,
  ArrowRight,
  ScrollText,
  BookOpen,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import './EnvironmentDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLUmtYviKYxyCwVDBNoL37ZcmqKsc4f5HAiJ_qRHCqLQq3GH6AzFVRB_LeEAG9f1vW1xE7FP6aTTDxIpkdrf5Ytz6d00InwoXeaDUCwPIrM1wS_qN1a8l8ULH7guCPckCekon-7OfEylwcHXciyu6NXpncc8GpJb_G6iDJfPAQylx6YbVB2oijO345mAzbHHs2ZGvFesxrO8aUs5WPSIwUR1jHIbh5wVAv3GWoHGh2tXmi43rV72GbyxbLfQtIFXBwJrarj9vTMU';

const MODULE_IDS = ['resource', 'waste', 'ecosystem', 'sourcing'];

const SUBMODULE_ROUTES = {
  resource: '/app/env-resource',
  waste: '/app/env-waste',
  ecosystem: '/app/env-ecosystem',
  sourcing: '/app/env-sourcing',
};

const PILLARS = [
  { id: 'resource', label: 'Resource Consumption', Icon: Droplets },
  { id: 'waste', label: 'Waste & Pollution', Icon: Recycle },
  { id: 'ecosystem', label: 'Ecosystem & Biodiversity', Icon: TreeDeciduous },
  { id: 'sourcing', label: 'Ethical Sourcing', Icon: ShoppingBag },
];

export default function EnvironmentDashboard() {
  const navigate = useNavigate();
  const ensureEnvironmentProjects = useProjectStore((s) => s.ensureEnvironmentProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureEnvironmentProjects(); }, [ensureEnvironmentProjects]);

  useEffect(() => {
    const moduleProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of moduleProjects) { loadTasks(proj.id); }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="env-dash font-manrope">

      {/* ── Header ── */}
      <header className="env-header">
        <div className="env-header__left">
          <span className="env-badge env-badge--module">MODULE VI</span>
          <h1 className="env-header__title">Environment (Bi&rsquo;ah)</h1>
          <blockquote className="env-header__verse">
            <p>
              &ldquo;Corruption has flourished on land and sea as a result of
              people&rsquo;s actions and He will make them taste the consequences of
              some of their own actions so that they may turn back.&rdquo;
            </p>
            <cite className="env-header__cite">&mdash; Surah Ar-Rum 30:41 (Abdel Haleem)</cite>
          </blockquote>
        </div>
        <div className="env-header__right">
          <span className="env-header__pct">{overallPct}%</span>
          <span className="env-header__pct-label">Progress to Mastery</span>
          <div className="env-header__progress-wrap">
            <div className="env-progress-bar">
              <div className="env-progress-fill" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="env-hero-card">
        <img
          className="env-hero-card__image"
          src={HERO_IMG}
          alt="Nature and stewardship"
        />
        <div className="env-hero-card__gradient" />
        <div className="env-hero-card__content">
          <span className="env-label env-label--light">Current Focus</span>
          <h2 className="env-hero-card__title">Resource Stewardship</h2>
          <p className="env-hero-card__desc">
            Mindful consumption as worship — honouring the trust of every resource
            Allah has provided.
          </p>
          <button className="env-hero-card__cta">
            Continue Practice
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="env-pillars">

        {/* Level 1: Core Pillars */}
        <div className="env-core-card">
          <span className="env-badge env-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="env-core-card__title">Core Pillars</h3>
          <p className="env-core-card__desc">
            Foundational elements required for ecological stewardship and balance.
          </p>
          <div className="env-core-list">
            {PILLARS.map(({ id, label, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`env-core-item env-core-item--clickable${active ? '' : ' env-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="env-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="env-core-item__info">
                    <div className="env-core-item__row">
                      <span className="env-core-item__label">{label}</span>
                      <span className="env-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="env-progress-bar env-progress-bar--sm env-progress-bar--onprimary">
                      <div className="env-progress-fill env-progress-fill--light" style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="env-pillars__right">

          {/* Level 2: Growth Space */}
          <div className="env-needs-card">
            <span className="env-badge env-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="env-needs-card__title">Growth Space</h3>
            <p className="env-needs-card__desc">
              Deepening ecological awareness through study and conscious practice.
            </p>
            <div className="env-core-list env-core-list--growth">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`env-core-item env-core-item--growth env-core-item--clickable${active ? '' : ' env-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="env-core-item__icon-wrap env-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="env-core-item__info">
                      <div className="env-core-item__row">
                        <span className="env-core-item__label">{label}</span>
                        <span className="env-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="env-progress-bar env-progress-bar--sm">
                        <div className="env-progress-fill env-progress-fill--growth" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Embellishments */}
          <div className="env-excellence-card">
            <span className="env-badge env-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="env-excellence-card__title">Embellishments</h3>
            <p className="env-excellence-card__desc">
              The refinement of environmental stewardship into a lived practice of khalifah.
            </p>
            <div className="env-core-list env-core-list--excellence">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`env-core-item env-core-item--excellence env-core-item--clickable${active ? '' : ' env-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="env-core-item__icon-wrap env-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="env-core-item__info">
                      <div className="env-core-item__row">
                        <span className="env-core-item__label">{label}</span>
                        <span className="env-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="env-progress-bar env-progress-bar--sm">
                        <div className="env-progress-fill env-progress-fill--excellence" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ecological Audit CTA */}
          <div className="env-audit-cta">
            <div className="env-audit-cta__bg" />
            <div className="env-audit-cta__content">
              <h4 className="env-audit-cta__title">Ecological Audit</h4>
              <p className="env-audit-cta__desc">
                Review your environmental stewardship practices and ecological footprint.
              </p>
            </div>
            <button className="env-audit-cta__btn">Begin Audit</button>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="env-footer">
        <div className="env-footer__text">
          <span>Modern Manuscript &copy; 2024</span>
          <div className="env-footer__dot" />
          <span>Environment Module Details</span>
        </div>
        <div className="env-footer__icons">
          <ScrollText size={20} />
          <BookOpen size={20} />
        </div>
      </footer>

    </div>
  );
}
