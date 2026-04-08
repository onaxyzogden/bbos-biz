import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { LIFE_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function LifeSocialPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['life-social']);
  const ensureLifeProjects = useProjectStore((s) => s.ensureLifeProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="life-social" />;
  }

  return (
    <PillarBoard
      pillarKey="social" pillarName="SOCIAL CHARACTER" pillarColor="#c084fc"
      modulePrefix="life" ensureProjects={ensureLifeProjects}
      dashboardData={LIFE_DASHBOARD_DATA.social}
    />
  );
}
