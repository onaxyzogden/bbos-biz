import { Activity } from 'lucide-react';
import './ActivityChart.css';

const PAD = { left: 50, right: 20, top: 15, bottom: 35 };
const W = 600;
const H = 200;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

export default function ActivityChart({ data }) {
  const hasData = data?.some((d) => d.count > 0);
  const maxCount = Math.max(...(data || []).map((d) => d.count), 1);

  if (!hasData) {
    return (
      <div className="activity-chart-empty">
        <Activity size={32} style={{ color: 'var(--text3)', marginBottom: 'var(--space-3)' }} />
        <p>Complete tasks to see your activity trend</p>
      </div>
    );
  }

  const points = data.map((d, i) => {
    const x = PAD.left + (i / Math.max(data.length - 1, 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (d.count / maxCount) * PLOT_H;
    return { x, y, ...d };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${points[0].x},${PAD.top + PLOT_H} ${linePoints} ${points[points.length - 1].x},${PAD.top + PLOT_H}`;

  // Grid lines at 25%, 50%, 75%
  const gridLines = [0.25, 0.5, 0.75].map((pct) => PAD.top + PLOT_H * (1 - pct));

  return (
    <div className="activity-chart">
      <svg viewBox={`0 0 ${W} ${H}`} className="activity-chart-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((y, i) => (
          <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} fill="url(#chartGrad)" />

        {/* Line */}
        <polyline points={linePoints} fill="none" stroke="var(--primary)"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4"
            fill="var(--primary)" stroke="var(--surface)" strokeWidth="2" />
        ))}

        {/* Count labels above points */}
        {points.map((p, i) => p.count > 0 && (
          <text key={`c${i}`} x={p.x} y={p.y - 12} textAnchor="middle"
            fill="var(--text2)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {p.count}
          </text>
        ))}

        {/* X-axis day labels */}
        {points.map((p, i) => (
          <text key={`l${i}`} x={p.x} y={H - 8} textAnchor="middle"
            fill="var(--text3)" fontSize="11" fontFamily="DM Sans, sans-serif">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
