import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Kanban, List } from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';
import { useAppStore } from '../store/app-store';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import KanbanBoard from '../components/work/KanbanBoard';
import ListView from '../components/work/ListView';
import TaskDetailPanel from '../components/work/TaskDetailPanel';
import FilterBar from '../components/work/FilterBar';

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const project = useProjectStore((s) => s.getProject(projectId));
  const updateProject = useProjectStore((s) => s.updateProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const filters = useAppStore((s) => s.filters[projectId]);
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['work']);
  const [view, setView] = useState(project?.defaultView || 'board');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState('');

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
      setSelectedTaskId(taskParam);
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
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-1)', background: 'var(--bg3)', borderRadius: 'var(--radius)', padding: 2 }}>
          <button
            onClick={() => setView('board')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'board' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'board' ? 'var(--shadow-xs)' : 'none',
              color: view === 'board' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <Kanban size={14} /> Board
          </button>
          <button
            onClick={() => setView('list')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'list' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'list' ? 'var(--shadow-xs)' : 'none',
              color: view === 'list' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <List size={14} /> List
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar projectId={projectId} />

      {/* Content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {view === 'board' ? (
            <KanbanBoard project={project} onSelectTask={setSelectedTaskId} filters={filters} />
          ) : (
            <ListView project={project} onSelectTask={setSelectedTaskId} filters={filters} />
          )}
        </div>

        {selectedTaskId && (
          <TaskDetailPanel
            projectId={projectId}
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </div>
  );
}
