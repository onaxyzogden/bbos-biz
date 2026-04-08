import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { INTELLECT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function IntellectThinkingPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-thinking']);
  const ensureIntellectProjects = useProjectStore((s) => s.ensureIntellectProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="intellect-thinking" />;
  }

  return (
    <PillarBoard
      pillarKey="thinking" pillarName="CRITICAL THINKING" pillarColor="#f97316"
      modulePrefix="intellect" ensureProjects={ensureIntellectProjects}
      dashboardData={INTELLECT_DASHBOARD_DATA.thinking}
    />
  );
}
