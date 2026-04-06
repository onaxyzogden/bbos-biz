import {
  MapPin,
  Quote,
  Sun,
  Moon,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
} from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import './FaithDashboard.css';

const ADHKAR = [
  { id: 'morning', label: 'Morning', count: 24, icon: 'sun' },
  { id: 'evening', label: 'Evening', count: 18, icon: 'moon' },
];

const LEARNING = {
  title: 'The Makkan Period',
  subtitle: 'Ongoing Study',
  progress: 65,
};

const INSIGHTS = [
  {
    id: 'architecture',
    category: 'Architecture',
    title: 'Geometric Infinity: The Logic of the Unseen',
    excerpt:
      'Exploring how Islamic design mirrors the infinite nature of the Divine through mathematical repetition.',
    gradient: 'linear-gradient(135deg, var(--faith-tertiary-container), var(--faith-surface-container-high))',
  },
  {
    id: 'philosophy',
    category: 'Philosophy',
    title: 'Quietude in a Distracted World',
    excerpt:
      "The practice of 'Khalwa' in the digital age — finding spiritual isolation within the noise.",
    gradient: 'linear-gradient(135deg, var(--faith-primary-container), var(--faith-tertiary-container))',
  },
  {
    id: 'ecology',
    category: 'Ecology',
    title: 'Stewards of the Earth',
    excerpt:
      'A theological perspective on climate responsibility and the mandate of Khilafa.',
    gradient: 'linear-gradient(135deg, var(--faith-surface-container-high), var(--faith-primary-container))',
  },
];

/* ── Component ── */

export default function FaithDashboard() {
  const { nextPrayer, cityName, loading, timings, requestLocation } = usePrayerTimes();

  return (
    <div className="faith-dash font-manrope">

      {/* Hero */}
      <section className="faith-hero">
        <div>
          <h2 className="faith-hero__title">The Sacred Rhythm</h2>
          <p className="faith-hero__subtitle">
            Today is 14 Ramadan 1445 · Peace be upon the seekers.
          </p>
        </div>
      </section>

      {/* Bento grid */}
      <div className="faith-bento">

        {/* ── Main column (8 cols) ── */}
        <div className="faith-bento__main">

          {/* Prayer card */}
          <div className="faith-prayer-card">
            <div className="faith-prayer-card__left">
              <span className="faith-label">Current Horizon</span>
              <h3 className="faith-prayer-card__name">
                {loading ? '...' : (nextPrayer?.name ?? '—')}
              </h3>
              <p className="faith-prayer-card__countdown">
                {loading
                  ? 'Loading...'
                  : nextPrayer
                    ? (nextPrayer.remaining === 'tomorrow'
                        ? 'Tomorrow at dawn'
                        : `Begins in ${nextPrayer.remaining}`)
                    : 'Enable location below'}
              </p>
            </div>
            <div className="faith-prayer-card__right">
              <div className="faith-prayer-card__time-label">Local Time</div>
              <div className="faith-prayer-card__time">
                {loading ? '—' : (nextPrayer?.time ?? '—')}
              </div>
              <div className="faith-prayer-card__location">
                <MapPin size={16} />
                {!timings && !loading ? (
                  <button
                    onClick={requestLocation}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}
                  >
                    Enable prayer times
                  </button>
                ) : (
                  <span>{cityName || 'Your Location'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Verse of the Day */}
          <div className="faith-verse-card">
            <Quote className="faith-verse-card__icon" size={36} strokeWidth={1} />
            <div className="faith-verse-card__body">
              <blockquote className="faith-verse-card__quote">
                "Unquestionably, by the remembrance of Allah hearts are assured."
              </blockquote>
              <div className="faith-verse-card__divider" />
              <cite className="faith-verse-card__cite">Surah Ar-Ra'd 13:28</cite>
            </div>
            <div className="faith-verse-card__actions">
              <button className="faith-pill-btn">Listen</button>
              <button className="faith-pill-btn">Tafsir</button>
            </div>
          </div>
        </div>

        {/* ── Side column (4 cols) ── */}
        <div className="faith-bento__side">

          {/* Daily Adhkar */}
          <div className="faith-adhkar-card">
            <div className="faith-adhkar-card__header">
              <span className="faith-label">Daily Adhkar</span>
              <MoreHorizontal size={20} className="faith-adhkar-card__more" />
            </div>
            <div className="faith-adhkar-list">
              {ADHKAR.map((item) => (
                <div key={item.id} className="faith-adhkar-item">
                  <div className="faith-adhkar-item__icon-wrap faith-adhkar-item__icon-wrap--morning">
                    {item.icon === 'sun' ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <div className="faith-adhkar-item__text">
                    <p className="faith-adhkar-item__label">{item.label}</p>
                    <p className="faith-adhkar-item__count">{item.count} Supplications</p>
                  </div>
                  <ChevronRight size={16} className="faith-adhkar-item__arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Learning Highlight */}
          <div className="faith-learning-card">
            <div className="faith-learning-card__image" />
            <div className="faith-learning-card__overlay">
              <span className="faith-label faith-label--light">{LEARNING.subtitle}</span>
              <h4 className="faith-learning-card__title">{LEARNING.title}</h4>
              <div className="faith-learning-card__progress-track">
                <div
                  className="faith-learning-card__progress-fill"
                  style={{ width: `${LEARNING.progress}%` }}
                />
              </div>
              <button className="faith-learning-card__resume">
                <span>Resume Session</span>
                <PlayCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Insights */}
      <section className="faith-insights">
        <div className="faith-insights__header">
          <h3 className="faith-insights__title">Curated Insights</h3>
          <div className="faith-insights__nav">
            <button className="faith-nav-btn" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="faith-nav-btn" aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="faith-insights__grid">
          {INSIGHTS.map((insight) => (
            <div key={insight.id} className="faith-insight-card">
              <div
                className="faith-insight-card__image"
                style={{ background: insight.gradient }}
              />
              <div className="faith-insight-card__body">
                <p className="faith-label faith-label--tertiary">{insight.category}</p>
                <h5 className="faith-insight-card__title">{insight.title}</h5>
                <p className="faith-insight-card__excerpt">{insight.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
