import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { PILLAR_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function FaithShahadaPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-shahada']);
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-shahada" />;
  }

  return (
    <PillarBoard
      pillarKey="shahada" pillarName="SHAHADA" pillarColor="#2d6a4f"
      modulePrefix="faith" ensureProjects={ensureFaithProjects}
      dashboardData={PILLAR_DASHBOARD_DATA.shahada}
    />
  );
}
