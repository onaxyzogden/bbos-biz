import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { ENVIRONMENT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function EnvironmentEcosystemPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['env-ecosystem']);
  const ensureEnvironmentProjects = useProjectStore((s) => s.ensureEnvironmentProjects);

  if (!hasCompletedOpening) return <CeremonyGate moduleId="env-ecosystem" />;

  return (
    <PillarBoard
      pillarKey="ecosystem"
      pillarName="ECOSYSTEM & BIODIVERSITY"
      pillarColor="#4ade80"
      modulePrefix="environment"
      ensureProjects={ensureEnvironmentProjects}
      dashboardData={ENVIRONMENT_DASHBOARD_DATA.ecosystem}
    />
  );
}
