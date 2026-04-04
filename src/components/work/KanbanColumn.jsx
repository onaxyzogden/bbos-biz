import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column, tasks, onSelectTask, onQuickAdd }) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const handleSubmit = () => {
    if (newTitle.trim()) {
      onQuickAdd(newTitle.trim());
      setNewTitle('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { handleSubmit(); }
    if (e.key === 'Escape') { setAdding(false); setNewTitle(''); }
  };

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
          />
        ))}
        {tasks.length === 0 && !adding && (
          <div className="kanban-empty-state">
            No tasks
          </div>
        )}
      </div>

      <div className="kanban-quickadd">
        {adding ? (
          <div>
            <input
              className="kanban-quickadd-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { handleSubmit(); setAdding(false); }}
              placeholder="Task title..."
              autoFocus
            />
          </div>
        ) : (
          <button className="kanban-quickadd-btn" onClick={() => setAdding(true)}>
            <Plus size={14} /> Add task
          </button>
        )}
      </div>
    </div>
  );
}
