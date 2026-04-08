import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { PILLAR_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FaithSawmPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-sawm']);
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-sawm" />;
  }

  return (
    <PillarBoard
      pillarKey="sawm" pillarName="SAWM" pillarColor="#bc6c25"
      modulePrefix="faith" ensureProjects={ensureFaithProjects}
      dashboardData={PILLAR_DASHBOARD_DATA.sawm}
    />
  );
}
