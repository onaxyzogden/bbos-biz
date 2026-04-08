import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { LIFE_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function LifeSafetyPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-safety']);
  const ensureLifeProjects = useProjectStore((s) => s.ensureLifeProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="life-safety" />;
  }

  return (
    <PillarBoard
      pillarKey="safety" pillarName="SAFETY & SECURITY" pillarColor="#f59e0b"
      modulePrefix="life" ensureProjects={ensureLifeProjects}
      dashboardData={LIFE_DASHBOARD_DATA.safety}
    />
  );
}
