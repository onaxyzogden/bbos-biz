import { useNavigate } from 'react-router-dom';
import { Globe, Users, MapPin, ArrowRight, Milestone, ExternalLink } from 'lucide-react';
import './UmmahDashboard.css';

const SUBMODULES = [
  { id: 'collective', label: 'Collective Stewardship', desc: 'Community-level coordination, shared governance, and collective wellbeing.', Icon: Globe, route: '/app/collective' },
  { id: 'neighbors', label: 'Neighbors', desc: 'Rights of neighbors, local engagement, and neighbourhood ihsan.', Icon: MapPin, route: '/app/neighbors' },
  { id: 'community', label: 'Community', desc: 'Broader community building, institutional engagement, and social contribution.', Icon: Users, route: '/app/community' },
];

const MOONTRANCE_MILESTONES = [
  { id: 'mt1', label: 'Land Acquisition', status: 'planned', desc: 'Identify and secure land for the eco-village development.' },
  { id: 'mt2', label: 'Community Formation', status: 'planned', desc: 'Gather founding families and establish shared governance.' },
  { id: 'mt3', label: 'Infrastructure Design', status: 'planned', desc: 'Design water, energy, and agricultural systems (Atlas integration).' },
  { id: 'mt4', label: 'Waqf Entity', status: 'planned', desc: 'Establish three-entity legal structure (Ontario Waqf model).' },
  { id: 'mt5', label: 'First Experience', status: 'planned', desc: 'Launch the first Moontrance collective experience.' },
];

export default function UmmahDashboard() {
  const navigate = useNavigate();

  return (
    <div className="ummah-dash">
      {/* Hero */}
      <div className="ummah-hero">
        <div className="ummah-hero-inner">
          <h1 className="ummah-title">Ummah</h1>
          <p className="ummah-subtitle">Collective Stewardship</p>
          <p className="ummah-arabic">Hifz al-Ummah &middot; حفظ الأمة</p>
        </div>
      </div>

      {/* Submodule Cards */}
      <section className="ummah-section">
        <h2 className="ummah-section-title">Submodules</h2>
        <div className="ummah-cards">
          {SUBMODULES.map((mod) => (
            <button
              key={mod.id}
              className="ummah-card"
              onClick={() => navigate(mod.route)}
            >
              <div className="ummah-card-icon">
                <mod.Icon size={20} />
              </div>
              <div className="ummah-card-body">
                <h3>{mod.label}</h3>
                <p>{mod.desc}</p>
              </div>
              <ArrowRight size={16} className="ummah-card-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* Moontrance Milestone Tracker */}
      <section className="ummah-section">
        <h2 className="ummah-section-title">
          <Milestone size={18} />
          Moontrance Milestones
        </h2>
        <p className="ummah-section-desc">
          Islamic eco-village development &mdash; CSRA offer architecture and Waqf-based governance.
        </p>
        <div className="ummah-milestones">
          {MOONTRANCE_MILESTONES.map((ms, i) => (
            <div key={ms.id} className={`ummah-milestone ummah-milestone--${ms.status}`}>
              <div className="ummah-ms-number">{i + 1}</div>
              <div className="ummah-ms-body">
                <h4>{ms.label}</h4>
                <p>{ms.desc}</p>
              </div>
              <span className="ummah-ms-status">{ms.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Atlas Bridge */}
      <section className="ummah-section">
        <h2 className="ummah-section-title">
          <ExternalLink size={18} />
          Atlas Bridge
        </h2>
        <div className="ummah-atlas">
          <div className="ummah-atlas-body">
            <h3>OGDEN Atlas</h3>
            <p>Land design feasibility platform, water systems design, and parameterized land templates. Atlas provides the spatial intelligence layer for Moontrance development.</p>
          </div>
          <span className="ummah-atlas-status">Not Connected</span>
        </div>
      </section>
    </div>
  );
}
