import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { WEALTH_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function WealthOwnershipPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['wealth-ownership']);
  const ensureWealthProjects = useProjectStore((s) => s.ensureWealthProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="wealth-ownership" />;

  return (
    <PillarBoard
      pillarKey="ownership"
      pillarName="OWNERSHIP & RIGHTS"
      pillarColor="#f59e0b"
      modulePrefix="wealth"
      ensureProjects={ensureWealthProjects}
      dashboardData={WEALTH_DASHBOARD_DATA.ownership}
    />
  );
}
