import { Home } from 'lucide-react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';

export default function Neighbors() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['neighbors']);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="neighbors" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="neighbors" />
      <div style={{
        background: 'var(--surface)',
        border: '1px dashed var(--border2)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-12)',
        textAlign: 'center',
        marginTop: 'var(--space-6)',
      }}>
        <Home size={48} style={{ color: 'var(--text3)', marginBottom: 'var(--space-4)' }} />
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Neighbors</h3>
        <p style={{ color: 'var(--text2)', maxWidth: 440, margin: '0 auto' }}>
          Neighbor directory, local connections, and mutual aid tools are coming soon.
        </p>
      </div>
    </div>
  );
}
