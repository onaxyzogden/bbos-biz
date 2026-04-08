import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { INTELLECT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function IntellectCognitivePage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-cognitive']);
  const ensureIntellectProjects = useProjectStore((s) => s.ensureIntellectProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="intellect-cognitive" />;
  }

  return (
    <PillarBoard
      pillarKey="cognitive" pillarName="COGNITIVE INTEGRITY" pillarColor="#14b8a6"
      modulePrefix="intellect" ensureProjects={ensureIntellectProjects}
      dashboardData={INTELLECT_DASHBOARD_DATA.cognitive}
    />
  );
}
