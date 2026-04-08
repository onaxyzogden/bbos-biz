import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { LIFE_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function LifeMentalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-mental']);
  const ensureLifeProjects = useProjectStore((s) => s.ensureLifeProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="life-mental" />;
  }

  return (
    <PillarBoard
      pillarKey="mental" pillarName="MENTAL WELL-BEING" pillarColor="#60a5fa"
      modulePrefix="life" ensureProjects={ensureLifeProjects}
      dashboardData={LIFE_DASHBOARD_DATA.mental}
    />
  );
}
