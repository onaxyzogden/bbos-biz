import { CheckCircle2, Clock, Coins, Sun, Landmark, ChevronRight } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import './FivePillars.css';

/* ── Static data ── */

const PULSE = [
  { label: 'Faith',   pct: 85 },
  { label: 'Prayer',  pct: 60 },
  { label: 'Zakat',   pct: 40 },
  { label: 'Fasting', pct: 25 },
  { label: 'Hajj',    pct: 15 },
];

const SALAT = [
  { id: 'fajr',    name: 'Fajr',    subtitle: 'Subh Prayer',      time: '05:12 AM', done: true  },
  { id: 'dhuhr',   name: 'Dhuhr',   subtitle: 'Mid-day Prayer',   time: '12:34 PM', done: true  },
  { id: 'asr',     name: 'Asr',     subtitle: 'Afternoon Prayer', time: '03:55 PM', done: true  },
  { id: 'maghrib', name: 'Maghrib', subtitle: 'Sunset Prayer',    time: '06:42 PM', done: false },
  { id: 'isha',    name: 'Isha',    subtitle: 'Night Prayer',     time: '08:05 PM', done: false },
];

/* ── Page ── */

export default function FivePillars() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['five-pillars']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="five-pillars" />;
  }

  return (
    <div className="fp2-page font-manrope">

      {/* Hero */}
      <header className="fp2-hero">
        <h1 className="fp2-hero__title">Spiritual Sanctuary</h1>
        <p className="fp2-hero__subtitle">A curated orchestration of your faith journey.</p>
      </header>

      {/* Spiritual Pulse */}
      <section className="fp2-pulse">
        <div className="fp2-pulse__header">
          <div>
            <h2 className="fp2-pulse__title">Spiritual Pulse</h2>
            <p className="fp2-pulse__desc">Current resonance across the Five Pillars</p>
          </div>
          <span className="fp2-label fp2-label--primary">7-Day Trend</span>
        </div>
        <div className="fp2-pulse__bars">
          {PULSE.map((item) => (
            <div key={item.label} className="fp2-pulse__bar-wrap">
              <div className="fp2-pulse__bar-track">
                <div
                  className="fp2-pulse__bar-fill"
                  style={{ height: `${item.pct}%` }}
                />
              </div>
              <span className="fp2-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Salat */}
      <section className="fp2-salat">
        <h3 className="fp2-salat__title">Daily Salat</h3>
        <div className="fp2-salat__grid">
          {SALAT.map((prayer) => (
            <div
              key={prayer.id}
              className={`fp2-salat__card ${prayer.done ? 'fp2-salat__card--done' : 'fp2-salat__card--pending'}`}
            >
              <div className="fp2-salat__card-top">
                <span className="fp2-label">{prayer.time}</span>
                {prayer.done
                  ? <CheckCircle2 size={20} className="fp2-salat__icon fp2-salat__icon--done" />
                  : <Clock size={20} className="fp2-salat__icon fp2-salat__icon--pending" />
                }
              </div>
              <div className="fp2-salat__name">{prayer.name}</div>
              <div className="fp2-salat__subtitle">{prayer.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial: Zakat + Ramadan + Hajj */}
      <section className="fp2-editorial">

        {/* Left column */}
        <div className="fp2-editorial__left">

          {/* Zakat */}
          <div className="fp2-zakat-card">
            <span className="fp2-label fp2-label--on-primary">Purification of Wealth</span>
            <div className="fp2-zakat-card__amount">$1,240.00</div>
            <p className="fp2-zakat-card__desc">Estimated Zakat due for current Lunar Year</p>
            <button className="fp2-pill-btn fp2-pill-btn--dark">Rebalance Now</button>
            <div className="fp2-zakat-card__icon-bg" aria-hidden="true">
              <Coins size={120} />
            </div>
          </div>

          {/* Ramadan */}
          <div className="fp2-ramadan-card">
            <span className="fp2-label">Ramadan Journey</span>
            <div className="fp2-ramadan-card__body">
              <div>
                <div className="fp2-ramadan-card__days">42 Days</div>
                <p className="fp2-ramadan-card__subtitle">Until the crescent of 1446 AH</p>
              </div>
              <Sun size={40} className="fp2-ramadan-card__icon" />
            </div>
          </div>
        </div>

        {/* Hajj & Umrah card */}
        <div className="fp2-hajj-card">
          <div className="fp2-hajj-card__image" />
          <div className="fp2-hajj-card__overlay">
            <div className="fp2-hajj-card__eyebrow">
              <Landmark size={18} />
              <span className="fp2-label fp2-label--fixed">Pilgrimage Guide</span>
            </div>
            <h2 className="fp2-hajj-card__title">Hajj &amp; Umrah:<br />The Ultimate Journey</h2>
            <p className="fp2-hajj-card__body">
              Access detailed logistics, spiritual preparation checklists, and ritual
              visualizations for your sacred visit.
            </p>
            <button className="fp2-pill-btn fp2-pill-btn--white">
              Explore Guide
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="fp2-footer">
        <span>Designed for Contemplation</span>
        <div className="fp2-footer__links">
          <a href="#">Etiquette</a>
          <a href="#">Scholarly Sources</a>
          <a href="#">Privacy</a>
        </div>
      </footer>

    </div>
  );
}
