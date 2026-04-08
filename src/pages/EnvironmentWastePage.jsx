import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { ENVIRONMENT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function EnvironmentWastePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-waste']);
  const ensureEnvironmentProjects = useProjectStore((s) => s.ensureEnvironmentProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-waste" />;

  return (
    <PillarBoard
      pillarKey="waste"
      pillarName="WASTE & POLLUTION MANAGEMENT"
      pillarColor="#a3e635"
      modulePrefix="environment"
      ensureProjects={ensureEnvironmentProjects}
      dashboardData={ENVIRONMENT_DASHBOARD_DATA.waste}
    />
  );
}
