import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { LIFE_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function LifePhysicalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-physical']);
  const ensureLifeProjects = useProjectStore((s) => s.ensureLifeProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="life-physical" />;
  }

  return (
    <PillarBoard
      pillarKey="physical" pillarName="PHYSICAL HEALTH" pillarColor="#4ade80"
      modulePrefix="life" ensureProjects={ensureLifeProjects}
      dashboardData={LIFE_DASHBOARD_DATA.physical}
    />
  );
}
