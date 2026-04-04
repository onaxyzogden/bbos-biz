import { useSettingsStore } from '../../store/settings-store';
import { MODULES } from '../../data/modules';
import { getModuleData } from '../../data/islamic-data';
import DuaSection from './DuaSection';
import './ResumeOverlay.css';

export default function ResumeOverlay({ moduleId, onDismiss }) {
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const mod = MODULES.find((m) => m.id === moduleId);
  const data = getModuleData(moduleId, valuesLayer);

  if (!data) return null;

  // Build a dua object with the resume title
  const resumeDua = isIslamic && data.dua ? {
    ...data.dua,
    title: data.dua.resumeTitle || data.dua.title,
  } : null;

  return (
    <div className="resume-overlay">
      <div className="resume-card">
        <h2 className="resume-title">
          {isIslamic ? 'Resuming Work' : 'Returning to Focus'}
        </h2>

        {mod && (
          <p className="resume-module">{mod.name}</p>
        )}

        <div className="resume-content">
          {isIslamic && resumeDua ? (
            <DuaSection dua={resumeDua} color="var(--accent)" />
          ) : (
            <div className="resume-mindfulness">
              <p>{data.resumeMindfulness || data.mindfulness}</p>
            </div>
          )}
        </div>

        <button className="resume-btn" onClick={onDismiss}>
          {isIslamic ? 'I am present' : "I'm here"}
        </button>
      </div>
    </div>
  );
}
