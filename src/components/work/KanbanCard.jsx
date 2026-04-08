import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, CheckSquare } from 'lucide-react';
import { PRIORITIES } from '../../data/modules';
import GLabelBadge from '../shared/GLabelBadge';
import { getTaskAccessLevel } from '../../data/bbos-role-access';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = d - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return { text: 'Overdue', color: 'var(--danger)', bg: 'var(--danger-bg)' };
  if (days === 0) return { text: 'Today', color: 'var(--warning)', bg: 'var(--warning-bg)' };
  if (days <= 3) return { text: `${days}d`, color: 'var(--warning)', bg: 'var(--warning-bg)' };
  return { text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), color: 'var(--text3)', bg: 'var(--bg4)' };
}

export default function KanbanCard({ task, onClick, isDragOverlay = false, bbosRole }) {
  const accessLevel = getTaskAccessLevel(bbosRole, task.bbosTaskType);
  const isViewOnly = accessLevel === 'V';

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isDragOverlay || isViewOnly });

  const style = isDragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const due = formatDate(task.dueDate);
  const subtaskDone = task.subtasks?.filter((s) => s.done).length || 0;
  const subtaskTotal = task.subtasks?.length || 0;

  return (
    <div
      ref={isDragOverlay ? undefined : setNodeRef}
      style={{
        ...style,
        borderLeft: priority ? `3px solid ${priority.color}` : undefined,
        opacity: isViewOnly ? 0.55 : undefined,
        cursor: isViewOnly ? 'default' : undefined,
      }}
      className={`kanban-card ${isDragging ? 'dragging' : ''} ${isDragOverlay ? 'drag-overlay' : ''}`}
      onClick={onClick}
      {...(isDragOverlay ? {} : { ...attributes, ...listeners })}
    >
      <div className="kanban-card-title">
        {task.gLabel && <GLabelBadge gLabel={task.gLabel} />}
        {task.bbosStage && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            fontWeight: 600,
            padding: '1px 5px',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--accent-bg)',
            color: 'var(--accent)',
            marginRight: 4,
          }}>{task.bbosStage}</span>
        )}
        {task.title}
      </div>
      <div className="kanban-card-meta">
        {bbosRole && bbosRole !== 'all' && accessLevel === 'V' && (
          <span className="kanban-card-badge" style={{ background: '#64748b18', color: '#64748b', fontWeight: 600, fontSize: '0.58rem', letterSpacing: '0.05em' }}>
            VIEW
          </span>
        )}
        {bbosRole && bbosRole !== 'all' && accessLevel === 'E' && (
          <span className="kanban-card-badge" style={{ background: '#3b82f618', color: '#3b82f6', fontWeight: 600, fontSize: '0.58rem', letterSpacing: '0.05em' }}>
            EDIT
          </span>
        )}
        {priority && (
          <span className="kanban-card-badge" style={{ background: priority.bg, color: priority.color }}>
            {priority.label}
          </span>
        )}
        {due && (
          <span className="kanban-card-badge" style={{ background: due.bg, color: due.color }}>
            <Calendar size={10} /> {due.text}
          </span>
        )}
        {subtaskTotal > 0 && (
          <span className="kanban-card-badge" style={{ background: 'var(--bg4)', color: 'var(--text3)' }}>
            <CheckSquare size={10} /> {subtaskDone}/{subtaskTotal}
          </span>
        )}
        {task.tags?.slice(0, 2).map((tag, i) => (
          <span key={i} className="kanban-card-badge" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            {tag}
          </span>
        ))}
        {task.tags?.length > 2 && (
          <span className="kanban-card-badge" style={{ background: 'var(--bg4)', color: 'var(--text3)' }}>
            +{task.tags.length - 2}
          </span>
        )}
      </div>
    </div>
  );
}
