import { useEffect, useState } from 'react';
import { Kanban, List, GanttChart } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAppStore } from '../../store/app-store';
import KanbanBoard from './KanbanBoard';
import ListView from './ListView';
import GanttView from './GanttView';
import TaskDetailPanel from './TaskDetailPanel';
import FilterBar from './FilterBar';
import BbosPipelineHeader from '../bbos/BbosPipelineHeader';

/**
 * Reusable board component that renders the full Kanban/List/Gantt experience
 * for any project. Used by both Project.jsx and the Faith board pages.
 */
export default function ProjectBoard({ projectId, project }) {
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const filters = useAppStore((s) => s.filters[projectId]);
  const setActiveBbosStage = useAppStore((s) => s.setActiveBbosStage);
  const clearActiveBbosStage = useAppStore((s) => s.clearActiveBbosStage);
  const [view, setView] = useState(project?.defaultView || 'board');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [bbosFilter, setBbosFilter] = useState(project?.bbosStage || 'FND');

  useEffect(() => {
    if (projectId) loadTasks(projectId);
  }, [projectId]);

  useEffect(() => {
    if (project?.bbosEnabled) setActiveBbosStage(bbosFilter);
    return () => clearActiveBbosStage();
  }, [project?.bbosEnabled]);

  if (!project) return null;

  const isBbos = project.bbosEnabled;
  const mergedFilters = isBbos ? { ...filters, bbosStage: bbosFilter } : filters;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* View toggle */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        marginBottom: 'var(--space-2)', flexShrink: 0,
      }}>
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
          <button
            onClick={() => setView('gantt')}
            className="btn btn-ghost"
            style={{
              padding: 'var(--space-1) var(--space-3)', fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: view === 'gantt' ? 'var(--surface)' : 'transparent',
              boxShadow: view === 'gantt' ? 'var(--shadow-xs)' : 'none',
              color: view === 'gantt' ? 'var(--text)' : 'var(--text2)',
            }}
          >
            <GanttChart size={14} /> Gantt
          </button>
        </div>
      </div>

      {/* BBOS Pipeline Header — stage filter */}
      {isBbos && (
        <BbosPipelineHeader
          currentStageId={project.bbosStage}
          activeFilter={bbosFilter}
          onStageClick={(stageId) => {
            setBbosFilter(stageId);
            setActiveBbosStage(stageId);
          }}
        />
      )}

      {/* Filter Bar */}
      <FilterBar projectId={projectId} />

      {/* Content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {view === 'board' ? (
            <KanbanBoard project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} bbosFilter={isBbos ? bbosFilter : null} bbosRole={project.bbosRole || 'all'} />
          ) : view === 'gantt' ? (
            <GanttView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} />
          ) : (
            <ListView project={project} onSelectTask={setSelectedTaskId} filters={mergedFilters} />
          )}
        </div>

        {selectedTaskId && (
          <TaskDetailPanel
            project={project}
            projectId={projectId}
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </div>
  );
}
