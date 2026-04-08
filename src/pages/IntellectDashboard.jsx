import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Library,
  Lightbulb,
  BrainCircuit,
  Wrench,
  ArrowRight,
  ScrollText,
  BookOpen,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import IslamicTerm from '../components/shared/IslamicTerm';
import './IntellectDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVLUmtYviKYxyCwVDBNoL37ZcmqKsc4f5HAiJ_qRHCqLQq3GH6AzFVRB_LeEAG9f1vW1xE7FP6aTTDxIpkdrf5Ytz6d00InwoXeaDUCwPIrM1wS_qN1a8l8ULH7guCPckCekon-7OfEylwcHXciyu6NXpncc8GpJb_G6iDJfPAQylx6YbVB2oijO345mAzbHHs2ZGvFesxrO8aUs5WPSIwUR1jHIbh5wVAv3GWoHGh2tXmi43rV72GbyxbLfQtIFXBwJrarj9vTMU';

const MODULE_IDS = ['learning', 'thinking', 'cognitive', 'professional'];

const SUBMODULE_ROUTES = {
  learning: '/app/intellect-learning',
  thinking: '/app/intellect-thinking',
  cognitive: '/app/intellect-cognitive',
  professional: '/app/intellect-professional',
};

const PILLARS = [
  { id: 'learning', label: 'Learning & Literacy', Icon: Library },
  { id: 'thinking', label: 'Critical Thinking', Icon: Lightbulb },
  { id: 'cognitive', label: 'Cognitive Integrity', Icon: BrainCircuit },
  { id: 'professional', label: 'Professional Mastery', Icon: Wrench },
];

export default function IntellectDashboard() {
  const navigate = useNavigate();
  const ensureIntellectProjects = useProjectStore((s) => s.ensureIntellectProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureIntellectProjects(); }, [ensureIntellectProjects]);

  useEffect(() => {
    const moduleProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of moduleProjects) { loadTasks(proj.id); }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="intellect-dash font-manrope">

      {/* ── Header ── */}
      <header className="intellect-header">
        <div className="intellect-header__left">
          <span className="intellect-badge intellect-badge--module">MODULE III</span>
          <h1 className="intellect-header__title">Intellect (<IslamicTerm id="aql">Aql</IslamicTerm>)</h1>
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
          <span className="intellect-header__pct">{overallPct}%</span>
          <span className="intellect-header__pct-label">Progress to Mastery</span>
          <div className="intellect-header__progress-wrap">
            <div className="intellect-progress-bar">
              <div className="intellect-progress-fill" style={{ width: `${overallPct}%` }} />
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
          <span className="intellect-badge intellect-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="intellect-core-card__title">Core Pillars</h3>
          <p className="intellect-core-card__desc">
            Foundational elements required for cognitive integrity and literacy.
          </p>
          <div className="intellect-core-list">
            {PILLARS.map(({ id, label, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`intellect-core-item intellect-core-item--clickable${active ? '' : ' intellect-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="intellect-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="intellect-core-item__info">
                    <div className="intellect-core-item__row">
                      <span className="intellect-core-item__label">{label}</span>
                      <span className="intellect-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="intellect-progress-bar intellect-progress-bar--sm intellect-progress-bar--onprimary">
                      <div className="intellect-progress-fill intellect-progress-fill--light" style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="intellect-pillars__right">

          {/* Level 2: Growth Space */}
          <div className="intellect-needs-card">
            <span className="intellect-badge intellect-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="intellect-needs-card__title">Growth Space</h3>
            <p className="intellect-needs-card__desc">
              Expansions of the mind through structured study and engagement.
            </p>
            <div className="intellect-core-list intellect-core-list--growth">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`intellect-core-item intellect-core-item--growth intellect-core-item--clickable${active ? '' : ' intellect-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="intellect-core-item__icon-wrap intellect-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="intellect-core-item__info">
                      <div className="intellect-core-item__row">
                        <span className="intellect-core-item__label">{label}</span>
                        <span className="intellect-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="intellect-progress-bar intellect-progress-bar--sm">
                        <div className="intellect-progress-fill intellect-progress-fill--growth" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Embellishments */}
          <div className="intellect-excellence-card">
            <span className="intellect-badge intellect-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="intellect-excellence-card__title">Embellishments</h3>
            <p className="intellect-excellence-card__desc">
              The refinement of scholarly pursuit into professional mastery.
            </p>
            <div className="intellect-core-list intellect-core-list--excellence">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`intellect-core-item intellect-core-item--excellence intellect-core-item--clickable${active ? '' : ' intellect-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="intellect-core-item__icon-wrap intellect-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="intellect-core-item__info">
                      <div className="intellect-core-item__row">
                        <span className="intellect-core-item__label">{label}</span>
                        <span className="intellect-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="intellect-progress-bar intellect-progress-bar--sm">
                        <div className="intellect-progress-fill intellect-progress-fill--excellence" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
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
