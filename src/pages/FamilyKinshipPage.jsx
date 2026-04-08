import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { FAMILY_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FamilyKinshipPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-kinship']);
  const ensureFamilyProjects = useProjectStore((s) => s.ensureFamilyProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-kinship" />;

  return (
    <PillarBoard
      pillarKey="kinship"
      pillarName="EXTENDED FAMILY (KINSHIP)"
      pillarColor="#fb923c"
      modulePrefix="family"
      ensureProjects={ensureFamilyProjects}
      dashboardData={FAMILY_DASHBOARD_DATA.kinship}
    />
  );
}
