import { useSettingsStore } from '../../store/settings-store';
import { getPillarForModule, getPillarLabel, getPillarStewardship } from '../../data/maqasid';
import './PillarHeader.css';

export default function PillarHeader({ moduleId }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const pillar = getPillarForModule(moduleId);
  if (!pillar) return null;

  const isIslamic = valuesLayer === 'islamic';

  return (
    <div className="pillar-hdr" style={{ '--ph-color': pillar.accentColor }}>
      <span className="pillar-hdr__name">{getPillarLabel(pillar, valuesLayer)}</span>
      <span className="pillar-hdr__stewardship">{getPillarStewardship(pillar, valuesLayer)}</span>
      <span className="pillar-hdr__root">{isIslamic ? pillar.arabicRoot : pillar.rootAction}</span>
    </div>
  );
}
