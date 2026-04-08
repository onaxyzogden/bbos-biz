import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Baby,
  Handshake,
  Home,
  ArrowRight,
  ScrollText,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import './FamilyDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yi2Heav2Z0mqhVMhhut3SHYpURYIRoOs8CGWAQNRGHMHh21moZOuIJz_k-HojEniMWaIgSgOzFcOl_ssP0q59xMBMcKNMK5DPnCzTyzVZZ9ISqoeNGRAvBl10a907uGXQrsWV4-PrKWgMNXgDLOIz7AxMRpqXgCuXIYbCd8JwwDHRqJhbPyDA_bCW3AiFM41zPspFIzfxORnBf0IGrOn3-ETpVDCGt7alE7mzjqMN_ZtILCUEEFI7KHe4xARWOXeUg6yYiFGmrU';

const MODULE_IDS = ['marriage', 'parenting', 'kinship', 'home'];

const SUBMODULE_ROUTES = {
  marriage: '/app/family-marriage',
  parenting: '/app/family-parenting',
  kinship: '/app/family-kinship',
  home: '/app/family-home',
};

const PILLARS = [
  { id: 'marriage', label: 'Foundations of Marriage', Icon: Heart },
  { id: 'parenting', label: 'Parenting & Mentorship', Icon: Baby },
  { id: 'kinship', label: 'Extended Family', Icon: Handshake },
  { id: 'home', label: 'Home Environment', Icon: Home },
];

export default function FamilyDashboard() {
  const navigate = useNavigate();
  const ensureFamilyProjects = useProjectStore((s) => s.ensureFamilyProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureFamilyProjects(); }, [ensureFamilyProjects]);

  useEffect(() => {
    const moduleProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of moduleProjects) { loadTasks(proj.id); }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="family-dash font-manrope">

      {/* ── Header ── */}
      <header className="family-header">
        <div className="family-header__left">
          <span className="family-badge family-badge--module">MODULE IV</span>
          <h1 className="family-header__title">Family (Nasl)</h1>
          <blockquote className="family-header__verse">
            <p>
              &ldquo;People, be mindful of your Lord, who created you from a single
              soul, and from it created its mate, and from the pair of them spread
              countless men and women far and wide; be mindful of God, in whose name
              you make requests of one another. Beware of severing the ties of
              kinship: God is always watching over you.&rdquo;
            </p>
            <cite className="family-header__cite">&mdash; Surah An-Nisa 4:1 (Abdel Haleem)</cite>
          </blockquote>
        </div>
        <div className="family-header__right">
          <span className="family-header__pct">{overallPct}%</span>
          <span className="family-header__pct-label">Progress to Mastery</span>
          <div className="family-header__progress-wrap">
            <div className="family-progress-bar">
              <div className="family-progress-fill" style={{ width: `${overallPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Current Focus Hero ── */}
      <section className="family-hero-card">
        <img
          className="family-hero-card__image"
          src={HERO_IMG}
          alt="Family and togetherness"
        />
        <div className="family-hero-card__gradient" />
        <div className="family-hero-card__content">
          <span className="family-label family-label--light">Current Focus</span>
          <h2 className="family-hero-card__title">Foundations of Marriage</h2>
          <p className="family-hero-card__desc">
            Building the first pillar of family life — a bond of mercy, tranquillity,
            and shared purpose rooted in the Sunnah.
          </p>
          <button className="family-hero-card__cta">
            Continue Practice
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Pillars Bento Grid ── */}
      <section className="family-pillars">

        {/* Level 1: Core Pillars */}
        <div className="family-core-card">
          <span className="family-badge family-badge--dark">LEVEL 1: NECESSITIES</span>
          <h3 className="family-core-card__title">Core Pillars</h3>
          <p className="family-core-card__desc">
            Foundational elements required for the preservation of lineage and legacy.
          </p>
          <div className="family-core-list">
            {PILLARS.map(({ id, label, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`family-core-item family-core-item--clickable${active ? '' : ' family-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="family-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="family-core-item__info">
                    <div className="family-core-item__row">
                      <span className="family-core-item__label">{label}</span>
                      <span className="family-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="family-progress-bar family-progress-bar--sm family-progress-bar--onprimary">
                      <div className="family-progress-fill family-progress-fill--light" style={{ width: `${mod.pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level 2 + 3 sub-grid */}
        <div className="family-pillars__right">

          {/* Level 2: Growth Space */}
          <div className="family-needs-card">
            <span className="family-badge family-badge--secondary">LEVEL 2: NEEDS</span>
            <h3 className="family-needs-card__title">Growth Space</h3>
            <p className="family-needs-card__desc">
              Strengthening family bonds through active care, presence, and remembrance.
            </p>
            <div className="family-core-list family-core-list--growth">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`family-core-item family-core-item--growth family-core-item--clickable${active ? '' : ' family-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="family-core-item__icon-wrap family-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="family-core-item__info">
                      <div className="family-core-item__row">
                        <span className="family-core-item__label">{label}</span>
                        <span className="family-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="family-progress-bar family-progress-bar--sm">
                        <div className="family-progress-fill family-progress-fill--growth" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Embellishments */}
          <div className="family-excellence-card">
            <span className="family-badge family-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="family-excellence-card__title">Embellishments</h3>
            <p className="family-excellence-card__desc">
              The refinement of family life into a legacy of mercy and generational impact.
            </p>
            <div className="family-core-list family-core-list--excellence">
              {PILLARS.map(({ id, label, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`family-core-item family-core-item--excellence family-core-item--clickable${active ? '' : ' family-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="family-core-item__icon-wrap family-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="family-core-item__info">
                      <div className="family-core-item__row">
                        <span className="family-core-item__label">{label}</span>
                        <span className="family-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="family-progress-bar family-progress-bar--sm">
                        <div className="family-progress-fill family-progress-fill--excellence" style={{ width: `${mod.pct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family Legacy CTA */}
          <div className="family-audit-cta">
            <div className="family-audit-cta__bg" />
            <div className="family-audit-cta__content">
              <h4 className="family-audit-cta__title">Family Legacy Audit</h4>
              <p className="family-audit-cta__desc">
                Review your family stewardship milestones and plan for generational impact.
              </p>
            </div>
            <button className="family-audit-cta__btn">Begin Audit</button>
          </div>

        </div>
      </section>

      {/* ── Tarbiyah Bridge ── */}
      <section className="family-tarbiyah-bridge">
        <div className="family-tarbiyah-bridge__header">
          <ExternalLink size={16} />
          <h3>Tarbiyah Bridge</h3>
        </div>
        <p className="family-tarbiyah-bridge__desc">
          The parenting and mentorship track connects to the Moontrance Collective
          through tarbiyah &mdash; the holistic cultivation of children within a
          community-supported environment.
        </p>
        <div className="family-tarbiyah-bridge__conditions">
          <div className="family-tarbiyah-bridge__condition">
            <span className="family-tarbiyah-bridge__dot" />
            <span>Parenting submodule active with tasks in progress</span>
          </div>
          <div className="family-tarbiyah-bridge__condition">
            <span className="family-tarbiyah-bridge__dot" />
            <span>Ummah pillar milestones include community formation</span>
          </div>
          <div className="family-tarbiyah-bridge__condition">
            <span className="family-tarbiyah-bridge__dot" />
            <span>Moontrance eco-village tarbiyah track initiated</span>
          </div>
        </div>
        <button
          className="family-tarbiyah-bridge__btn"
          onClick={() => navigate('/app/pillar/ummah')}
        >
          View Ummah Pillar <ArrowRight size={14} />
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="family-footer">
        <div className="family-footer__text">
          <span>Modern Manuscript &copy; 2024</span>
          <div className="family-footer__dot" />
          <span>Family Module Details</span>
        </div>
        <div className="family-footer__icons">
          <ScrollText size={20} />
          <BookOpen size={20} />
        </div>
      </footer>

    </div>
  );
}
