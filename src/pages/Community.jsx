import { useState } from 'react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';
import ViewToggle from '../components/shared/ViewToggle';
import OverviewCards from '../components/shared/OverviewCards';
import MaqasidTable from '../components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '../data/module-overviews/community-overview';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 3:110, 49:10, 5:2.';

export default function Community() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['community']);
  const [view, setView] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="community" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="community" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-community)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-community)" />
      )}
    </div>
  );
}
