import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { PILLAR_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FaithHajjPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-hajj']);
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-hajj" />;
  }

  return (
    <PillarBoard
      pillarKey="hajj" pillarName="HAJJ" pillarColor="#7b2d8e"
      modulePrefix="faith" ensureProjects={ensureFaithProjects}
      dashboardData={PILLAR_DASHBOARD_DATA.hajj}
    />
  );
}
