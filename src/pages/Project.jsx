import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation, Outlet } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import BbosRolePicker from '../components/bbos/BbosRolePicker';
import { useTaskStore } from '../store/task-store';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import ProjectBoard from '../components/work/ProjectBoard';

const TAB_SUFFIXES = ['/people', '/tasks', '/money', '/assets', '/office', '/tech'];

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const project = useProjectStore((s) => s.getProject(projectId));
  const updateProject = useProjectStore((s) => s.updateProject);
  const setBbosRole = useProjectStore((s) => s.setBbosRole);
  const startNewBbosCycle = useProjectStore((s) => s.startNewBbosCycle);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['work']);
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState('');

  const isProjectsView = !TAB_SUFFIXES.some((s) => location.pathname.endsWith(s));

  useEffect(() => {
    if (projectId) loadTasks(projectId);
  }, [projectId]);

  useEffect(() => {
    if (project) setNameVal(project.name);
  }, [project?.name]);

  // Handle ?task= deep-link from search
  useEffect(() => {
    const taskParam = searchParams.get('task');
    if (taskParam) {
      searchParams.delete('task');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams]);

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="work" />;
  }

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Project not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/app/work')}>Back to Projects</button>
      </div>
    );
  }

  if (!isProjectsView) {
    return <Outlet />;
  }

  const saveName = () => {
    if (nameVal.trim() && nameVal.trim() !== project.name) {
      updateProject(projectId, { name: nameVal.trim() });
    }
    setEditingName(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 'var(--space-2)', flexShrink: 0, flexWrap: 'wrap', gap: 'var(--space-3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: project.color }} />
          {editingName ? (
            <input
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') { setNameVal(project.name); setEditingName(false); } }}
              autoFocus
              style={{
                fontSize: '1.3rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                border: 'none', borderBottom: '2px solid var(--primary)',
                background: 'transparent', outline: 'none', padding: '2px 0',
                color: 'var(--text)', width: '100%', maxWidth: 300,
              }}
            />
          ) : (
            <h2
              style={{ fontSize: '1.3rem', cursor: 'pointer' }}
              onClick={() => setEditingName(true)}
              title="Click to rename"
            >
              {project.name}
            </h2>
          )}
          {project.bbosEnabled && (
            <span style={{
              fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-xs)',
              background: 'color-mix(in srgb, #c9a05a 10%, transparent)',
              color: '#c9a05a', border: '1px solid color-mix(in srgb, #c9a05a 20%, transparent)',
            }}>
              BBOS Cycle {project.bbosCycle || 1}
            </span>
          )}
          {project.bbosEnabled && (
            <BbosRolePicker
              value={project.bbosRole || 'all'}
              onChange={(roleId) => setBbosRole(projectId, roleId)}
            />
          )}
        </div>
        {project.bbosEnabled && project.bbosStage === 'OPT' && (
          <button
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', color: '#c9a05a' }}
            onClick={() => { if (confirm('Start a new BBOS cycle? This resets the pipeline to Foundation (FND).')) startNewBbosCycle(projectId); }}
            title="Complete this cycle and start a new one from Foundation"
          >
            <RefreshCw size={14} /> New Cycle
          </button>
        )}
      </div>

      {/* Board */}
      <ProjectBoard projectId={projectId} project={project} />
    </div>
  );
}
