import './HealthPulse.css';

const LEVEL_CONFIG = {
  green: {
    islamic: { label: 'Excellent', desc: 'All ceremonies complete, no overdue tasks.' },
    universal: { label: 'Excellent', desc: 'All tasks on track, nothing overdue.' },
  },
  amber: {
    islamic: { label: 'Needs Attention', desc: 'Some ceremonies deferred or tasks overdue.' },
    universal: { label: 'Needs Attention', desc: 'Some tasks need your attention.' },
  },
  red: {
    islamic: { label: 'Critical', desc: 'Multiple deferrals and overdue tasks.' },
    universal: { label: 'Critical', desc: 'Many tasks are overdue.' },
  },
};

export default function HealthPulse({ level, isIslamic }) {
  const config = LEVEL_CONFIG[level]?.[isIslamic ? 'islamic' : 'universal'] || LEVEL_CONFIG.amber.universal;

  return (
    <div className={`health-pulse health-pulse-${level}`}>
      <p className="hp-title">{isIslamic ? 'Barakah Pulse' : 'Health Pulse'}</p>
      <div className="hp-dot" />
      <p className="hp-label">{config.label}</p>
      <p className="hp-desc">{config.desc}</p>
    </div>
  );
}
