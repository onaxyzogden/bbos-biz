import { useEffect } from 'react';
import { useProjectStore } from '../store/project-store';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ProjectBoard from '../components/work/ProjectBoard';

const BOARD_ID = 'faith_growth';

export default function FaithGrowthPage() {
  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);
  const project = useProjectStore((s) => s.getProject(BOARD_ID));
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-growth']);

  useEffect(() => {
    ensureFaithProjects();
  }, []);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="faith-growth" />;
  }

  if (!project) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ marginBottom: 'var(--space-4)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: project.color }} />
          <h2 style={{ fontSize: '1.3rem' }}>{project.name}</h2>
        </div>
      </div>
      <ProjectBoard projectId={BOARD_ID} project={project} />
    </div>
  );
}
