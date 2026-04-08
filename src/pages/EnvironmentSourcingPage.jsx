import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { ENVIRONMENT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function EnvironmentSourcingPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-sourcing']);
  const ensureEnvironmentProjects = useProjectStore((s) => s.ensureEnvironmentProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-sourcing" />;

  return (
    <PillarBoard
      pillarKey="sourcing"
      pillarName="ETHICAL SOURCING & CIRCULARITY"
      pillarColor="#f97316"
      modulePrefix="environment"
      ensureProjects={ensureEnvironmentProjects}
      dashboardData={ENVIRONMENT_DASHBOARD_DATA.sourcing}
    />
  );
}
