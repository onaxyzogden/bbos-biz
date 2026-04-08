import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { FAMILY_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FamilyParentingPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-parenting']);
  const ensureFamilyProjects = useProjectStore((s) => s.ensureFamilyProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-parenting" />;

  return (
    <PillarBoard
      pillarKey="parenting"
      pillarName="PARENTING & MENTORSHIP"
      pillarColor="#a78bfa"
      modulePrefix="family"
      ensureProjects={ensureFamilyProjects}
      dashboardData={FAMILY_DASHBOARD_DATA.parenting}
    />
  );
}
