import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IslamicTerm from '../components/shared/IslamicTerm';
import {
  CheckCircle2,
  HeartHandshake,
  HandHeart,
  Moon,
  Landmark,
  ArrowRight,
  Leaf,
  Diamond,
  Infinity,
} from 'lucide-react';
import { useProjectStore, FAITH_BOARDS } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useModulesProgress } from '../hooks/useModuleProgress';
import './FaithDashboard.css';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yi2Heav2Z0mqhVMhhut3SHYpURYIRoOs8CGWAQNRGHMHh21moZOuIJz_k-HojEniMWaIgSgOzFcOl_ssP0q59xMBMcKNMK5DPnCzTyzVZZ9ISqoeNGRAvBl10a907uGXQrsWV4-PrKWgMNXgDLOIz7AxMRpqXgCuXIYbCd8JwwDHRqJhbPyDA_bCW3AiFM41zPspFIzfxORnBf0IGrOn3-ETpVDCGt7alE7mzjqMN_ZtILCUEEFI7KHe4xARWOXeUg6yYiFGmrU';

const MODULE_IDS = ['shahada', 'salat', 'zakat', 'siyam', 'hajj'];

const SUBMODULE_ROUTES = {
  shahada: '/app/faith-shahada',
  salat: '/app/faith-salah',
  zakat: '/app/faith-zakah',
  siyam: '/app/faith-sawm',
  hajj: '/app/faith-hajj',
};

const CORE_PILLARS = [
  { id: 'shahada', label: 'Shahada', glossaryId: 'shahada', Icon: CheckCircle2 },
  { id: 'salat', label: 'Salah', glossaryId: 'salat', Icon: HeartHandshake },
  { id: 'zakat', label: 'Zakah', glossaryId: 'zakat', Icon: HandHeart },
  { id: 'siyam', label: 'Siyam', glossaryId: 'siyam', Icon: Moon },
  { id: 'hajj', label: 'Hajj', glossaryId: 'hajj', Icon: Landmark },
];


export default function FaithDashboard() {
  const navigate = useNavigate();
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  // Ensure faith projects exist and load their tasks
  useEffect(() => {
    ensureFaithProjects();
  }, [ensureFaithProjects]);

  useEffect(() => {
    const faithProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of faithProjects) {
      loadTasks(proj.id);
    }
  }, [projects, loadTasks]);

  const { progressMap: coreProgress, overallPct: coreOverallPct } = useModulesProgress(MODULE_IDS, 'core');
  const { progressMap: growthProgress, overallPct: growthOverallPct } = useModulesProgress(MODULE_IDS, 'growth');
  const { progressMap: excelProgress, overallPct: excelOverallPct } = useModulesProgress(MODULE_IDS, 'excellence');
  const { overallPct } = useModulesProgress(MODULE_IDS);

  return (
    <div className="faith-dash font-manrope">

      {/* ── Header ── */}
      <header className="faith-header">
        <div className="faith-header__left">
          <span className="faith-badge faith-badge--module">MODULE I</span>
          <h1 className="faith-header__title">Faith (<IslamicTerm id="deen">Deen</IslamicTerm>)</h1>
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
          <span className="faith-header__pct">{overallPct}%</span>
          <span className="faith-header__pct-label">Progress to Mastery</span>
          <div className="faith-header__progress-wrap">
            <div className="faith-progress-bar">
              <div className="faith-progress-fill" style={{ width: `${overallPct}%` }} />
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
          <h2 className="faith-hero-card__title">Correct Creed (<IslamicTerm id="aqidah">Aqidah</IslamicTerm>)</h2>
          <p className="faith-hero-card__desc">
            Internalizing the foundations of belief and the six pillars of <IslamicTerm id="iman">Iman</IslamicTerm>{' '}
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
            {CORE_PILLARS.map(({ id, label, glossaryId, Icon }) => {
              const mod = coreProgress[id] || { total: 0, completed: 0, pct: 0 };
              const active = mod.total > 0;
              return (
                <div
                  key={id}
                  className={`faith-core-item faith-core-item--clickable${active ? '' : ' faith-core-item--dim'}`}
                  onClick={() => navigate(SUBMODULE_ROUTES[id])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                >
                  <div className="faith-core-item__icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="faith-core-item__info">
                    <div className="faith-core-item__row">
                      <span className="faith-core-item__label"><IslamicTerm id={glossaryId}>{label}</IslamicTerm></span>
                      <span className="faith-core-item__pct">{mod.pct}%</span>
                    </div>
                    <div className="faith-progress-bar faith-progress-bar--sm faith-progress-bar--onprimary">
                      <div
                        className="faith-progress-fill faith-progress-fill--light"
                        style={{ width: `${mod.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
              understanding of <IslamicTerm id="deen">Deen</IslamicTerm>.
            </p>
            <div className="faith-core-list faith-core-list--growth">
              {CORE_PILLARS.map(({ id, label, glossaryId, Icon }) => {
                const mod = growthProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`faith-core-item faith-core-item--growth faith-core-item--clickable${active ? '' : ' faith-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="faith-core-item__icon-wrap faith-core-item__icon-wrap--growth">
                      <Icon size={18} />
                    </div>
                    <div className="faith-core-item__info">
                      <div className="faith-core-item__row">
                        <span className="faith-core-item__label">
                            <IslamicTerm id={glossaryId}>{label}</IslamicTerm>
                          </span>
                        <span className="faith-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="faith-progress-bar faith-progress-bar--sm">
                        <div
                          className="faith-progress-fill faith-progress-fill--growth"
                          style={{ width: `${mod.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level 3: Excellence */}
          <div className="faith-excellence-card">
            <span className="faith-badge faith-badge--tertiary">LEVEL 3: EXCELLENCE</span>
            <h3 className="faith-excellence-card__title">Embellishments</h3>
            <p className="faith-excellence-card__desc">
              The refinement of devotion and representative excellence (<IslamicTerm id="ihsan">Ihsan</IslamicTerm>).
            </p>
            <div className="faith-core-list faith-core-list--excellence">
              {CORE_PILLARS.map(({ id, label, glossaryId, Icon }) => {
                const mod = excelProgress[id] || { total: 0, completed: 0, pct: 0 };
                const active = mod.total > 0;
                return (
                  <div
                    key={id}
                    className={`faith-core-item faith-core-item--excellence faith-core-item--clickable${active ? '' : ' faith-core-item--dim'}`}
                    onClick={() => navigate(SUBMODULE_ROUTES[id])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(SUBMODULE_ROUTES[id])}
                  >
                    <div className="faith-core-item__icon-wrap faith-core-item__icon-wrap--excellence">
                      <Icon size={18} />
                    </div>
                    <div className="faith-core-item__info">
                      <div className="faith-core-item__row">
                        <span className="faith-core-item__label">
                            <IslamicTerm id={glossaryId}>{label}</IslamicTerm>
                          </span>
                        <span className="faith-core-item__pct">{mod.pct}%</span>
                      </div>
                      <div className="faith-progress-bar faith-progress-bar--sm">
                        <div
                          className="faith-progress-fill faith-progress-fill--excellence"
                          style={{ width: `${mod.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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
