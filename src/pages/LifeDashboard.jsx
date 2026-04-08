import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BrainCircuit,
  Shield,
  Sparkles,
  ArrowRight,
  ScrollText,
  BookOpen,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import IslamicTerm from '../components/shared/IslamicTerm';
import './LifeDashboard.css';

const HERO_IMG =
  'https://png.pngtree.com/thumb_back/fh260/background/20250227/pngtree-an-artistic-representation-of-the-human-body-made-entirely-from-fruits-image_17021515.jpg';

const MODULE_IDS = ['physical', 'mental', 'safety', 'social'];

const SUBMODULE_ROUTES = {
  physical: '/app/life-physical',
  mental: '/app/life-mental',
  safety: '/app/life-safety',
  social: '/app/life-social',
};

const PILLARS = [
  { id: 'physical', label: 'Physical Health', Icon: Activity },
  { id: 'mental', label: 'Mental Well-being', Icon: BrainCircuit },
  { id: 'safety', label: 'Safety & Security', Icon: Shield },
  { id: 'social', label: 'Social Character', Icon: Sparkles },
];

export default function LifeDashboard() {
  const navigate = useNavigate();
  const ensureLifeProjects = useProjectStore((s) => s.ensureLifeProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureLifeProjects(); }, [ensureLifeProjects]);

  useEffect(() => {
    const moduleProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of moduleProjects) { loadTasks(proj.id); }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="life-dash font-manrope">

      {/* ── Header ── */}
      <header className="life-header">
        <div className="life-header__left">
          <span className="life-badge life-badge--module">MODULE II</span>
          <h1 className="life-header__title">Life (<IslamicTerm id="nafs">Nafs</IslamicTerm>)</h1>
          <blockquote className="life-header__verse">
            <p>
              "O children of Adam... eat and drink, but be not excessive. Indeed,
              He likes not those who commit excess."
            </p>
            <cite className="life-header__cite">— Surah Al-A'raf 7:31</cite>
          </blockquote>
        </div>
        <div className="life-header__right">
          <span className="life-header__pct">{overallPct}%</span>
          <span className="life-header__pct-label">Progress to Mastery</span>
          <div className="life-header__progress-wrap">
            <div className="life-progress-bar">
              <div className="life-progress-fill" style={{ width: `${overallPct}%` }} />
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
          <span className="life-badge life-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="life-core-card__title">Core Pillars</h3>
          <p className="life-core-card__desc">
            Foundational elements required for the preservation of life and
            dignity.
          </p>
          <div className="life-core-list">
            {PILLARS.map(({ id, label, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`life-core-item life-core-item--clickable${active ? '' : ' life-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="life-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="life-core-item__info">
                    <div className="life-core-item__row">
                      <span className="life-core-item__label">{label}</span>
                      <span className="life-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="life-progress-bar life-progress-bar--sm life-progress-bar--onprimary">
                      <div className="life-progress-fill life-progress-fill--light" style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="life-pillars__right">

          {/* Level 2: Growth */}
          <div className="life-needs-card">
            <span className="life-badge life-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="life-needs-card__title">Growth Space</h3>
            <p className="life-needs-card__desc">
              Comforts and expansions that make life easier and more expansive.
            </p>
            <div className="life-core-list life-core-list--growth">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`life-core-item life-core-item--growth life-core-item--clickable${active ? '' : ' life-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="life-core-item__icon-wrap life-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="life-core-item__info">
                      <div className="life-core-item__row">
                        <span className="life-core-item__label">{label}</span>
                        <span className="life-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="life-progress-bar life-progress-bar--sm">
                        <div className="life-progress-fill life-progress-fill--growth" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Excellence */}
          <div className="life-excellence-card">
            <span className="life-badge life-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="life-excellence-card__title">Embellishments</h3>
            <p className="life-excellence-card__desc">
              The refinement of character and social presence into a form of art.
            </p>
            <div className="life-core-list life-core-list--excellence">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`life-core-item life-core-item--excellence life-core-item--clickable${active ? '' : ' life-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="life-core-item__icon-wrap life-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="life-core-item__info">
                      <div className="life-core-item__row">
                        <span className="life-core-item__label">{label}</span>
                        <span className="life-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="life-progress-bar life-progress-bar--sm">
                        <div className="life-progress-fill life-progress-fill--excellence" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit CTA */}
          <div className="life-audit-cta">
            <div className="life-audit-cta__bg" />
            <div className="life-audit-cta__content">
              <h4 className="life-audit-cta__title">Weekly <IslamicTerm id="maqasid">Maqasid</IslamicTerm> Audit</h4>
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
