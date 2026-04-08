import { useState } from 'react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';
import ViewToggle from '../components/shared/ViewToggle';
import OverviewCards from '../components/shared/OverviewCards';
import MaqasidTable from '../components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '../data/module-overviews/collective-overview';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 2:30, 3:103, 66:6, 51:19, 51:24-26.';

export default function CollectivePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['collective']);
  const [view, setView] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="collective" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="collective" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-collective)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-collective)" />
      )}
    </div>
  );
}
