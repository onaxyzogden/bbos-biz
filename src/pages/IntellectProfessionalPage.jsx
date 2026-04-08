import { useThresholdStore } from '../store/threshold-store';
import { useProjectStore } from '../store/project-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarBoard from '../components/work/PillarBoard';
import { INTELLECT_DASHBOARD_DATA } from '../data/pillar-dashboard-data';

export default function IntellectProfessionalPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['intellect-professional']);
  const ensureIntellectProjects = useProjectStore((s) => s.ensureIntellectProjects);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="intellect-professional" />;
  }

  return (
    <PillarBoard
      pillarKey="professional" pillarName="PROFESSIONAL MASTERY" pillarColor="#ec4899"
      modulePrefix="intellect" ensureProjects={ensureIntellectProjects}
      dashboardData={INTELLECT_DASHBOARD_DATA.professional}
    />
  );
}
