import { Wallet, Users, Building2, Shield } from 'lucide-react';
import { MODULES } from '../data/modules';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';

const ICON_MAP = { Wallet, Users, Building2, Shield };

export default function ComingSoon({ module }) {
  const mod = MODULES.find((m) => m.id === module);
  const Icon = mod ? ICON_MAP[mod.icon] : null;
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening[module]);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId={module} />;
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '60vh', textAlign: 'center',
    }}>
      {Icon && (
        <div style={{
          width: 80, height: 80, borderRadius: 'var(--radius-xl)',
          background: 'var(--primary-bg)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          <Icon size={36} style={{ color: mod.color }} />
        </div>
      )}
      <h2 style={{ marginBottom: 'var(--space-2)' }}>{mod?.name || 'Module'}</h2>
      <p style={{ color: 'var(--text2)', maxWidth: 400, marginBottom: 'var(--space-4)' }}>
        {mod?.description}. This module is currently under development.
      </p>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
        minWidth: 260,
      }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Planned Features
        </p>
        {mod?.features.map((f, i) => (
          <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ color: 'var(--primary)' }}>&#10003;</span> {f}
          </div>
        ))}
      </div>
    </div>
  );
}
