import { useState } from 'react';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';
import ViewToggle from '../components/shared/ViewToggle';
import OverviewCards from '../components/shared/OverviewCards';
import MaqasidTable from '../components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '../data/module-overviews/hadith-overview';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 33:21, 59:7, 4:80.';

export default function HadithPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['hadith']);
  const [view, setView] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="hadith" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="hadith" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-hadith)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-hadith)" />
      )}
    </div>
  );
}
