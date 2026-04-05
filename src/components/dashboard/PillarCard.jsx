import { Link } from 'react-router-dom';
import {
  BookHeart, HeartPulse, Brain, Users, Coins, TreePine,
  CheckCircle2, Clock, Circle,
} from 'lucide-react';
import { getPillarLabel, getPillarStewardship } from '../../data/maqasid';
import './PillarCard.css';

const PILLAR_ICON_MAP = { BookHeart, HeartPulse, Brain, Users, Coins, TreePine };

const MODULE_ROUTES = {
  work: '/app/work',
  money: '/app/money',
  people: '/app/people',
  office: '/app/office',
  tech: '/app/tech',
  family: '/app/family',
  neighbors: '/app/neighbors',
  community: '/app/community',
  'five-pillars': '/app/five-pillars',
  hadith: '/app/hadith',
  quran: '/app/quran',
};

export default function PillarCard({ pillar, subModules, valuesLayer, completedOpening, deferred }) {
  const Icon = PILLAR_ICON_MAP[pillar.icon];
  const label = getPillarLabel(pillar, valuesLayer);
  const stewardship = getPillarStewardship(pillar, valuesLayer);
  const isScaffold = pillar.status === 'scaffold';
  const firstRoute = subModules.length > 0 ? MODULE_ROUTES[subModules[0].id] : null;

  const content = (
    <div className="pillar-card" style={{ '--pc-color': pillar.accentColor }}>
      <div className="pc-header">
        {Icon && <Icon size={18} style={{ color: pillar.accentColor }} />}
        <div className="pc-titles">
          <span className="pc-label">{label}</span>
          <span className="pc-stewardship">{stewardship}</span>
        </div>
      </div>

      {isScaffold ? (
        <div className="pc-scaffold">Coming Soon</div>
      ) : (
        <div className="pc-modules">
          {subModules.map((mod) => {
            const done = completedOpening?.[mod.id];
            const def = deferred?.[mod.id];
            return (
              <div key={mod.id} className="pc-mod-row">
                <span className="pc-mod-name">{mod.name}</span>
                <span className={`pc-mod-status ${done ? 'done' : def ? 'def' : ''}`}>
                  {done ? <CheckCircle2 size={12} /> : def ? <Clock size={12} /> : <Circle size={12} />}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {valuesLayer === 'islamic' && (
        <div className="pc-arabic">{pillar.arabicRootAr}</div>
      )}
    </div>
  );

  if (firstRoute && !isScaffold) {
    return <Link to={firstRoute} className="pillar-card-link">{content}</Link>;
  }
  return content;
}
