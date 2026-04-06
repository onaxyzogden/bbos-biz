import { useState } from 'react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';
import ViewToggle from '../components/shared/ViewToggle';
import OverviewCards from '../components/shared/OverviewCards';
import MaqasidTable from '../components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '../data/module-overviews/quran-overview';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 73:4, 4:82, 54:17, 29:45.';

export default function QuranPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['quran']);
  const [view, setView] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="quran" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="quran" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-quran)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-quran)" />
      )}
    </div>
  );
}
