import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column, tasks, onSelectTask, onAddTask, bbosRole }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="kanban-column" style={isOver ? { background: 'var(--primary-bg)' } : undefined}>
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <div className="kanban-column-dot" style={{ background: column.color }} />
          {column.name}
          <span className="kanban-column-count">{tasks.length}</span>
        </div>
      </div>

      <div className="kanban-column-body" ref={setNodeRef}>
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onClick={() => onSelectTask(task.id)}
            bbosRole={bbosRole}
          />
        ))}
        {tasks.length === 0 && (
          <div className="kanban-empty-state">
            No tasks
          </div>
        )}
      </div>

      <div className="kanban-quickadd">
        <button className="kanban-quickadd-btn" onClick={onAddTask}>
          <Plus size={14} /> Add task
        </button>
      </div>
    </div>
  );
}
