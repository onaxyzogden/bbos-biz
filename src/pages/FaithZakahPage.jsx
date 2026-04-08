import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { PILLAR_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FaithZakahPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-zakah']);
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-zakah" />;
  }

  return (
    <PillarBoard
      pillarKey="zakah" pillarName="ZAKAH" pillarColor="#6a994e"
      modulePrefix="faith" ensureProjects={ensureFaithProjects}
      dashboardData={PILLAR_DASHBOARD_DATA.zakah}
    />
  );
}
