import '../../pages/PillarDashboard.css';

/**
 * Standalone single-module Maqasid table — reuses PillarDashboard.css classes.
 *
 * Props:
 *   data        — { label, necessities[], needs[], embelishments[] }
 *   moduleColor — CSS value string e.g. 'var(--mod-quran)' for the aspect cell
 */
export default function MaqasidTable({ data, moduleColor }) {
  const {
    label = 'Module',
    necessities = [],
    needs = [],
    embelishments = [],
  } = data;

  const len = Math.max(necessities.length, needs.length, embelishments.length, 1);
  const rows = Array.from({ length: len }, (_, i) => ({
    necessity: necessities[i] || '',
    need: needs[i] || '',
    embelishment: embelishments[i] || '',
  }));

  const isEmpty = !necessities.length && !needs.length && !embelishments.length;

  return (
    <div
      className="pd-table-wrap"
      style={{ marginTop: 'var(--space-5)', '--pd-color': moduleColor }}
    >
      <table className="pd-table">
        <thead>
          <tr>
            <th className="pd-th pd-th--aspect">Aspect</th>
            <th className="pd-th pd-th--necessities">NECESSITIES</th>
            <th className="pd-th pd-th--needs">NEEDS</th>
            <th className="pd-th pd-th--embelishments">EMBELISHMENTS</th>
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td className="pd-td pd-td--empty" colSpan={4}>
                Content coming soon.
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`pd-tr ${rowIdx === 0 ? 'pd-tr--first' : ''}`}
              >
                {rowIdx === 0 && (
                  <td
                    className="pd-td pd-td--aspect"
                    rowSpan={rows.length}
                  >
                    {label}
                  </td>
                )}
                <td className="pd-td pd-td--necessity">{row.necessity}</td>
                <td className="pd-td pd-td--need">{row.need}</td>
                <td className="pd-td pd-td--embelishment">{row.embelishment}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
