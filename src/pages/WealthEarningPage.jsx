import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { WEALTH_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function WealthEarningPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['wealth-earning']);
  const ensureWealthProjects = useProjectStore((s) => s.ensureWealthProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="wealth-earning" />;

  return (
    <PillarBoard
      pillarKey="earning"
      pillarName="EARNING & PROVISION (RIZQ)"
      pillarColor="#22c55e"
      modulePrefix="wealth"
      ensureProjects={ensureWealthProjects}
      dashboardData={WEALTH_DASHBOARD_DATA.earning}
    />
  );
}
