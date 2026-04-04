import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useContactsStore } from '../../../store/contacts-store';
import { SALARY_TYPES } from '../../../data/contact-config';
import CollapsibleSection from '../CollapsibleSection';

export default function SalaryTab({ contactId }) {
  const salaryRecords = useContactsStore((s) => s.salaryRecords);
  const addSalary     = useContactsStore((s) => s.addSalary);
  const deleteSalary  = useContactsStore((s) => s.deleteSalary);

  const records  = salaryRecords.filter((r) => r.contactId === contactId);
  const base     = records.filter((r) => r.type === 'base').sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate));
  const addComp  = records.filter((r) => r.type !== 'base');

  const currentSalary = base[0]?.amount;
  const startedSalary = base[base.length - 1]?.amount;
  const avgSalary     = base.length ? Math.round(base.reduce((s, r) => s + r.amount, 0) / base.length) : null;

  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [showBankForm,   setShowBankForm]   = useState(false);
  const [showCompForm,   setShowCompForm]   = useState(false);
  const [sForm, setSForm] = useState({ amount: '', effectiveDate: '', type: 'base', note: '' });
  const [bForm, setBForm] = useState({ bankName: '', bankAccount: '' });
  const [cForm, setCForm] = useState({ amount: '', type: 'bonus', note: '' });

  function submitSalary() {
    if (!sForm.amount) return;
    addSalary({ contactId, ...sForm, amount: Number(sForm.amount), currency: 'USD' });
    setSForm({ amount: '', effectiveDate: '', type: 'base', note: '' });
    setShowSalaryForm(false);
  }

  function submitComp() {
    if (!cForm.amount) return;
    addSalary({ contactId, ...cForm, amount: Number(cForm.amount), currency: 'USD', effectiveDate: new Date().toISOString().slice(0, 10) });
    setCForm({ amount: '', type: 'bonus', note: '' });
    setShowCompForm(false);
  }

  const inputStyle = {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, boxSizing: 'border-box',
  };
  const fmt = (v) => v != null ? `$${Number(v).toLocaleString()}` : 'No salary data';

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Bank details */}
      <CollapsibleSection title="Bank Details">
        {showBankForm ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 22 }}>
            <input style={inputStyle} placeholder="Bank name" value={bForm.bankName} onChange={(e) => setBForm((f) => ({ ...f, bankName: e.target.value }))} />
            <input style={inputStyle} placeholder="Account number" value={bForm.bankAccount} onChange={(e) => setBForm((f) => ({ ...f, bankAccount: e.target.value }))} />
            <button onClick={() => setShowBankForm(false)} style={{
              padding: '7px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Save Bank Details</button>
          </div>
        ) : (
          <div style={{ paddingLeft: 22 }}>
            <button onClick={() => setShowBankForm(true)} style={{
              padding: '6px 14px', background: 'var(--bg3)', border: '1.5px solid var(--border)',
              borderRadius: 6, cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 500,
            }}>Add Details</button>
          </div>
        )}
      </CollapsibleSection>

      {/* Salary history */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>History</div>
          <button onClick={() => setShowSalaryForm((s) => !s)} style={{
            fontSize: 12, color: 'var(--mod-people)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500,
          }}>view history</button>
        </div>

        {/* Simple bar chart */}
        {base.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
            {base.slice(0, 5).map((r) => {
              const maxAmt = Math.max(...base.map((b) => b.amount));
              const pct = maxAmt ? (r.amount / maxAmt) * 100 : 0;
              return (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', width: 70, flexShrink: 0 }}>{r.effectiveDate}</div>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--bg4)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'var(--mod-people)', borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', width: 72, textAlign: 'right' }}>{fmt(r.amount)}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text3)', textAlign: 'center', padding: '16px 0' }}>
            Please enter salary data to view this chart.
          </div>
        )}

        {showSalaryForm && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Amount (USD)</div>
                <input type="number" style={inputStyle} placeholder="0" value={sForm.amount} onChange={(e) => setSForm((f) => ({ ...f, amount: e.target.value }))} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Effective date</div>
                <input type="date" style={inputStyle} value={sForm.effectiveDate} onChange={(e) => setSForm((f) => ({ ...f, effectiveDate: e.target.value }))} />
              </div>
            </div>
            <button onClick={submitSalary} style={{
              padding: '8px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Save Salary Entry</button>
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          {[
            { label: 'Current Salary', value: fmt(currentSalary) },
            { label: 'Started Salary', value: fmt(startedSalary) },
            { label: 'Average Salary', value: fmt(avgSalary) },
            { label: 'Total add. compensation', value: fmt(addComp.reduce((s, r) => s + r.amount, 0) || null) },
          ].map((item) => (
            <div key={item.label} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional compensation */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Additional compensation</div>
          <button onClick={() => setShowCompForm((s) => !s)} style={{
            display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--mod-people)', fontSize: 12, fontWeight: 500,
          }}>
            <Plus size={13} /> Add new
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>
          Enter the information for any additional compensation the employee receives.
        </div>
        {showCompForm && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, background: 'var(--bg)', borderRadius: 10, border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Type</div>
                <select style={inputStyle} value={cForm.type} onChange={(e) => setCForm((f) => ({ ...f, type: e.target.value }))}>
                  {SALARY_TYPES.filter((t) => t.id !== 'base').map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>Amount (USD)</div>
                <input type="number" style={inputStyle} value={cForm.amount} onChange={(e) => setCForm((f) => ({ ...f, amount: e.target.value }))} />
              </div>
            </div>
            <button onClick={submitComp} style={{
              padding: '8px 0', background: 'var(--mod-people)', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
            }}>Add Compensation</button>
          </div>
        )}
        {addComp.map((r) => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ color: 'var(--text2)' }}>{SALARY_TYPES.find((t) => t.id === r.type)?.label}</span>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>${r.amount.toLocaleString()}</span>
            <button onClick={() => deleteSalary(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
