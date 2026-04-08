import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { FAMILY_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FamilyHomePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family-home']);
  const ensureFamilyProjects = useProjectStore((s) => s.ensureFamilyProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="family-home" />;

  return (
    <PillarBoard
      pillarKey="home"
      pillarName="HOME ENVIRONMENT"
      pillarColor="#34d399"
      modulePrefix="family"
      ensureProjects={ensureFamilyProjects}
      dashboardData={FAMILY_DASHBOARD_DATA.home}
    />
  );
}
