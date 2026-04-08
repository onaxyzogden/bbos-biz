import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { INTELLECT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function IntellectLearningPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-learning']);
  const ensureIntellectProjects = useProjectStore((s) => s.ensureIntellectProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="intellect-learning" />;
  }

  return (
    <PillarBoard
      pillarKey="learning" pillarName="LEARNING & LITERACY" pillarColor="#3b82f6"
      modulePrefix="intellect" ensureProjects={ensureIntellectProjects}
      dashboardData={INTELLECT_DASHBOARD_DATA.learning}
    />
  );
}
