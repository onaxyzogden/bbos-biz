import { useParams } from 'react-router-dom';
import { getPillarById, getPillarLabel, getPillarStewardship } from '../data/maqasid';
import { PILLAR_CONTENT } from '../data/pillar-content';
import { MODULES } from '../data/modules';
import { useSettingsStore } from '../store/settings-store';
import './PillarDashboard.css';

const modulesById = Object.fromEntries(MODULES.map((m) => [m.id, m]));

function getRows(entry) {
  // Zip necessities / needs / embelishments into row objects, using the longest array length
  const len = Math.max(
    entry.necessities.length,
    entry.needs.length,
    entry.embelishments.length,
    1,
  );
  return Array.from({ length: len }, (_, i) => ({
    necessity: entry.necessities[i] || '',
    need: entry.needs[i] || '',
    embelishment: entry.embelishments[i] || '',
  }));
}

export default function PillarDashboard() {
  const { pillarId } = useParams();
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);

  const pillar = getPillarById(pillarId);
  if (!pillar) return <div className="pd-error">Pillar not found.</div>;

  const label = getPillarLabel(pillar, valuesLayer);
  const stewardship = getPillarStewardship(pillar, valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const content = PILLAR_CONTENT[pillarId] || [];

  // Build table rows from content, or derive from subModuleIds with empty content
  const tableEntries = content.length > 0
    ? content
    : pillar.subModuleIds.map((id) => ({
        subModuleId: id,
        necessities: [],
        needs: [],
        embelishments: [],
      }));

  const hasAnyContent = tableEntries.some(
    (e) => e.necessities.length > 0 || e.needs.length > 0 || e.embelishments.length > 0,
  );

  return (
    <div className="pd-page">
      {/* Pillar header */}
      <div className="pd-header" style={{ '--pd-color': pillar.accentColor }}>
        <span className="pd-header__name">{label}</span>
        <span className="pd-header__stewardship">{stewardship}</span>
        <span className="pd-header__root">
          {isIslamic ? pillar.arabicRoot : pillar.rootAction}
        </span>
      </div>

      {/* Table */}
      <div className="pd-table-wrap">
        <table className="pd-table">
          <thead>
            <tr>
              <th className="pd-th pd-th--aspect">Aspect (Submodule)</th>
              <th className="pd-th pd-th--necessities">NECESSITIES</th>
              <th className="pd-th pd-th--needs">NEEDS</th>
              <th className="pd-th pd-th--embelishments">EMBELISHMENTS</th>
            </tr>
          </thead>
          <tbody>
            {tableEntries.length === 0 ? (
              <tr>
                <td className="pd-td pd-td--empty" colSpan={4}>
                  Content coming soon.
                </td>
              </tr>
            ) : (
              tableEntries.map((entry) => {
                const mod = modulesById[entry.subModuleId];
                const modName = entry.label || (mod ? mod.name : entry.subModuleId);
                const rows = getRows(entry);
                const isEmpty = !entry.necessities.length && !entry.needs.length && !entry.embelishments.length;

                return rows.map((row, rowIdx) => (
                  <tr key={`${entry.subModuleId}-${rowIdx}`} className={`pd-tr ${rowIdx === 0 ? 'pd-tr--first' : ''}`}>
                    {rowIdx === 0 && (
                      <td
                        className="pd-td pd-td--aspect"
                        rowSpan={rows.length}
                        style={{ '--pd-color': pillar.accentColor }}
                      >
                        {modName}
                      </td>
                    )}
                    {isEmpty ? (
                      <td className="pd-td pd-td--placeholder" colSpan={3}>
                        Coming soon
                      </td>
                    ) : (
                      <>
                        <td className="pd-td pd-td--necessity">{row.necessity}</td>
                        <td className="pd-td pd-td--need">{row.need}</td>
                        <td className="pd-td pd-td--embelishment">{row.embelishment}</td>
                      </>
                    )}
                  </tr>
                ));
              })
            )}
          </tbody>
        </table>
      </div>

      {!hasAnyContent && tableEntries.length > 0 && (
        <p className="pd-coming-soon">Full content for this pillar is coming soon.</p>
      )}
    </div>
  );
}
