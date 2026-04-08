import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { WEALTH_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function WealthCirculationPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['wealth-circulation']);
  const ensureWealthProjects = useProjectStore((s) => s.ensureWealthProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="wealth-circulation" />;

  return (
    <PillarBoard
      pillarKey="circulation"
      pillarName="CIRCULATION & IMPACT"
      pillarColor="#8b5cf6"
      modulePrefix="wealth"
      ensureProjects={ensureWealthProjects}
      dashboardData={WEALTH_DASHBOARD_DATA.circulation}
    />
  );
}
