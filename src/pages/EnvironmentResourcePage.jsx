import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { ENVIRONMENT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function EnvironmentResourcePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-resource']);
  const ensureEnvironmentProjects = useProjectStore((s) => s.ensureEnvironmentProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-resource" />;

  return (
    <PillarBoard
      pillarKey="resource"
      pillarName="RESOURCE CONSUMPTION"
      pillarColor="#22d3ee"
      modulePrefix="environment"
      ensureProjects={ensureEnvironmentProjects}
      dashboardData={ENVIRONMENT_DASHBOARD_DATA.resource}
    />
  );
}
