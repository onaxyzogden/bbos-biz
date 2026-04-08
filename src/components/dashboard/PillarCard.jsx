import { Link } from 'react-router-dom';
import {
  BookHeart, HeartPulse, Brain, Users, Coins, TreePine,
  CheckCircle2, Clock, Circle,
} from 'lucide-react';
import { getPillarLabel, getPillarStewardship } from '../../data/maqasid';
import './PillarCard.css';

const PILLAR_ICON_MAP = { BookHeart, HeartPulse, Brain, Users, Coins, TreePine, Globe: TreePine };

const RELATIONSHIP_LABELS = {
  'bbos-contained':     { text: 'BBOS',        color: '#8EAD6E' },
  'moontrance-partial': { text: 'Moontrance',  color: '#AD6E9E' },
  'moontrance-atlas':   { text: 'Atlas',       color: '#6EADAD' },
  'self-contained':     { text: 'Native',      color: '#6EADAD' },
  'reserved-active':    { text: 'Practice',    color: '#999' },
};

const MODULE_ROUTES = {
  work: '/app/work',
  money: '/app/money',
  people: '/app/people',
  office: '/app/office',
  tech: '/app/tech',
  family: '/app/family',
  neighbors: '/app/neighbors',
  community: '/app/community',
  hadith: '/app/hadith',
  quran: '/app/quran',
};

export default function PillarCard({ pillar, subModules, valuesLayer, completedOpening, deferred }) {
  const Icon = PILLAR_ICON_MAP[pillar.icon];
  const label = getPillarLabel(pillar, valuesLayer);
  const stewardship = getPillarStewardship(pillar, valuesLayer);
  const isScaffold = pillar.status === 'scaffold';
  const rel = RELATIONSHIP_LABELS[pillar.relationship];

  // Engine key: pillar is "active" if any module has completed opening AND has tasks
  const activeModuleCount = subModules.filter((m) => completedOpening?.[m.id]).length;
  const isKeyed = activeModuleCount > 0;

  const content = (
    <div className="pillar-card" style={{ '--pc-color': pillar.accentColor }}>
      <div className="pc-header">
        {Icon && <Icon size={18} style={{ color: pillar.accentColor }} />}
        <div className="pc-titles">
          <span className="pc-label">{label}</span>
          <span className="pc-stewardship">{stewardship}</span>
        </div>
        {rel && (
          <span className="pc-rel-badge" style={{ color: rel.color, borderColor: rel.color + '40', background: rel.color + '12' }}>
            {rel.text}
          </span>
        )}
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

  return <Link to={`/app/pillar/${pillar.id}`} className="pillar-card-link">{content}</Link>;
}
