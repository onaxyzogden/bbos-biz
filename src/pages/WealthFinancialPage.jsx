import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { WEALTH_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function WealthFinancialPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['wealth-financial']);
  const ensureWealthProjects = useProjectStore((s) => s.ensureWealthProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="wealth-financial" />;

  return (
    <PillarBoard
      pillarKey="financial"
      pillarName="FINANCIAL LITERACY & MANAGEMENT"
      pillarColor="#3b82f6"
      modulePrefix="wealth"
      ensureProjects={ensureWealthProjects}
      dashboardData={WEALTH_DASHBOARD_DATA.financial}
    />
  );
}
