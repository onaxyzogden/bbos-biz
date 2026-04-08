import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { PILLAR_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FaithSalahPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-salah']);
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-salah" />;
  }

  return (
    <PillarBoard
      pillarKey="salah" pillarName="SALAH" pillarColor="#1d4e89"
      modulePrefix="faith" ensureProjects={ensureFaithProjects}
      dashboardData={PILLAR_DASHBOARD_DATA.salah}
    />
  );
}
