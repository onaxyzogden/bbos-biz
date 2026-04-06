import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import { History, Pin, TrendingUp, ArrowRight, Sparkles, Search } from 'lucide-react';
import './QuranPage.css';

const SURAH_LIST = [
  { num: '01', name: 'Al-Fatihah', english: 'The Opening',     type: 'Meccan',  verses: 7   },
  { num: '02', name: 'Al-Baqarah', english: 'The Cow',         type: 'Medinan', verses: 286 },
  { num: '03', name: "Ali 'Imran", english: 'Family of Imran', type: 'Medinan', verses: 200 },
];

const JOURNEY_STEPS = [
  { label: 'Morning Dhikr',     note: 'Completed 07:15 AM',      done: true  },
  { label: 'Tafsir Reflection', note: 'Scheduled for 08:00 PM',  done: false },
];

const COLLECTIONS = [
  { label: 'Verses of Patience', gradient: 'linear-gradient(135deg, #3D5A6C 0%, #1a2f3a 100%)' },
  { label: 'Nature in Quran',    gradient: 'linear-gradient(135deg, #C5A059 0%, #8B6914 100%)' },
];

export default function QuranPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['quran']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="quran" />;
  }

  return (
    <div className="qc-page font-manrope">
      {/* Sticky Header */}
      <header className="qc-header">
        <div className="qc-header__inner">
          <div className="qc-header__left">
            <span className="qc-header__title">The Sacred Editorial</span>
            <nav className="qc-header__tabs">
              <a className="qc-header__tab qc-header__tab--active" href="#">Maqasid</a>
              <a className="qc-header__tab" href="#">Curations</a>
              <a className="qc-header__tab" href="#">Archives</a>
            </nav>
          </div>
          <div className="qc-header__right">
            <div className="qc-search">
              <Search size={16} className="qc-search__icon" />
              <input className="qc-search__input" type="text" placeholder="Search the Wisdom..." />
            </div>
          </div>
        </div>
      </header>

      {/* Content Canvas */}
      <div className="qc-canvas">
        {/* Hero: Verse of the Day + Spiritual Momentum */}
        <div className="qc-hero">
          {/* Verse Card */}
          <div className="qc-verse-card">
            <div>
              <span className="qc-badge">Verse of the Day</span>
              <h2 className="qc-verse-card__quote">
                "So verily, with every hardship, there is ease. Verily, with every hardship, there is ease."
              </h2>
              <p className="qc-verse-card__ref">— Surah Ash-Sharh [94:5-6]</p>
            </div>
            <div className="qc-verse-card__actions">
              <button className="qc-btn qc-btn--gold">
                <Sparkles size={16} />
                Reflect &amp; Share
              </button>
              <button className="qc-btn qc-btn--outline">Full Context</button>
            </div>
          </div>

          {/* Spiritual Momentum */}
          <div className="qc-momentum">
            <h3 className="qc-momentum__label">Spiritual Momentum</h3>
            <div className="qc-momentum__stats">
              <div className="qc-momentum__item">
                <div className="qc-momentum__meta">
                  <span>Ayahs Recited</span>
                  <span>84%</span>
                </div>
                <div className="qc-progress-track">
                  <div className="qc-progress-fill qc-progress-fill--slate" style={{ width: '84%' }} />
                </div>
              </div>
              <div className="qc-momentum__item">
                <div className="qc-momentum__meta">
                  <span>Juz Completion</span>
                  <span>12 / 30</span>
                </div>
                <div className="qc-progress-track">
                  <div className="qc-progress-fill qc-progress-fill--gold" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="qc-momentum__streak">
                <p className="qc-momentum__streak-num">42 Day</p>
                <p className="qc-momentum__streak-label">Consecutive Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Surah Index & Journey */}
        <div className="qc-index">
          {/* Main (8 cols) */}
          <div className="qc-index__main">
            <div className="qc-index__header">
              <div>
                <h2 className="qc-index__title">Surah Index</h2>
                <p className="qc-index__subtitle">Explore the depths of divine revelation</p>
              </div>
            </div>

            {/* Last Read + Pinned */}
            <div className="qc-surah-cards">
              <div className="qc-surah-card qc-surah-card--last">
                <div className="qc-surah-card__top">
                  <div className="qc-surah-card__icon qc-surah-card__icon--gold">
                    <History size={20} />
                  </div>
                  <span className="qc-tag qc-tag--gold">Last Read</span>
                </div>
                <h3 className="qc-surah-card__name">Surah Al-Kahf</h3>
                <p className="qc-surah-card__sub">The Cave • Ayah 45</p>
                <button className="qc-link-btn">
                  Continue Reading <ArrowRight size={14} />
                </button>
              </div>

              <div className="qc-surah-card qc-surah-card--pinned">
                <div className="qc-surah-card__top">
                  <div className="qc-surah-card__icon qc-surah-card__icon--slate">
                    <Pin size={20} />
                  </div>
                  <span className="qc-tag qc-tag--slate">Pinned</span>
                </div>
                <h3 className="qc-surah-card__name">Surah Ar-Rahman</h3>
                <p className="qc-surah-card__sub">The Beneficent • 78 Ayahs</p>
                <button className="qc-link-btn">
                  Open Surah <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Surah List */}
            <div className="qc-surah-list">
              <div className="qc-surah-list__header">
                <span>Name</span>
                <span>Revelation</span>
                <span>Verses</span>
              </div>
              {SURAH_LIST.map((s) => (
                <div key={s.num} className="qc-surah-row">
                  <div className="qc-surah-row__name-col">
                    <span className="qc-surah-row__num">{s.num}</span>
                    <div>
                      <p className="qc-surah-row__name">{s.name}</p>
                      <p className="qc-surah-row__english">{s.english}</p>
                    </div>
                  </div>
                  <span className="qc-surah-row__type">{s.type}</span>
                  <span className="qc-surah-row__verses">{s.verses}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="qc-index__sidebar">
            {/* My Journey */}
            <div className="qc-journey">
              <h3 className="qc-journey__title">
                <TrendingUp size={18} /> My Journey
              </h3>
              <div className="qc-journey__steps">
                {JOURNEY_STEPS.map((step, i) => (
                  <div key={i} className="qc-journey__step">
                    <div className={`qc-journey__dot ${step.done ? 'qc-journey__dot--done' : 'qc-journey__dot--pending'}`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="qc-journey__step-label">{step.label}</p>
                      <p className="qc-journey__step-note">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="qc-goal-card">
                <p className="qc-goal-card__label">Goal of the Week</p>
                <h4 className="qc-goal-card__title">Memorize Surah Al-Mulk</h4>
              </div>
            </div>

            {/* Collections */}
            <div className="qc-collections">
              <h3 className="qc-collections__title">Collections</h3>
              <div className="qc-collections__list">
                {COLLECTIONS.map((c) => (
                  <div
                    key={c.label}
                    className="qc-collection-card"
                    style={{ background: c.gradient }}
                  >
                    <div className="qc-collection-card__overlay">
                      <span className="qc-collection-card__label">{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
