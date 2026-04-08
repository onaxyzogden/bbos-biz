import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { FAMILY_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FamilyMarriagePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-marriage']);
  const ensureFamilyProjects = useProjectStore((s) => s.ensureFamilyProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-marriage" />;

  return (
    <PillarBoard
      pillarKey="marriage"
      pillarName="FOUNDATIONS OF MARRIAGE"
      pillarColor="#f472b6"
      modulePrefix="family"
      ensureProjects={ensureFamilyProjects}
      dashboardData={FAMILY_DASHBOARD_DATA.marriage}
    />
  );
}
