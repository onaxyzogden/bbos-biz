import { UsersRound } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';

export default function Community() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['community']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="community" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="community" />
      <div style={{
        background: 'var(--surface)',
        border: '1px dashed var(--border2)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-12)',
        textAlign: 'center',
        marginTop: 'var(--space-6)',
      }}>
        <UsersRound size={48} style={{ color: 'var(--text3)', marginBottom: 'var(--space-4)' }} />
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Community</h3>
        <p style={{ color: 'var(--text2)', maxWidth: 440, margin: '0 auto' }}>
          Community directory, group initiatives, and collective impact tools are coming soon.
        </p>
      </div>
    </div>
  );
}
