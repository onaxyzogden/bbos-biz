import { useMemo } from 'react';
import { Calendar, CheckSquare } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import './ListView.css';

export default function ListView({ project, onSelectTask, filters }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const allTasks = tasksByProject[project.id] || [];
  const tasks = useMemo(
    () => getFilteredTasks(project.id, filters),
    [allTasks, filters, project.id, getFilteredTasks]
  );

  const grouped = project.columns.map((col) => ({
    column: col,
    tasks: tasks.filter((t) => t.columnId === col.id).sort((a, b) => a.order - b.order),
  }));

  return (
    <div className="list-view">
      <table className="list-table">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Subtasks</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(({ column, tasks: colTasks }) =>
            colTasks.map((task) => {
              const pri = PRIORITIES.find((p) => p.id === task.priority);
              const subtaskDone = task.subtasks?.filter((s) => s.done).length || 0;
              const subtaskTotal = task.subtasks?.length || 0;
              return (
                <tr key={task.id} onClick={() => onSelectTask(task.id)} className="list-row">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{ width: 3, height: 20, borderRadius: 2, background: pri?.color || 'var(--text3)', flexShrink: 0 }} />
                      <span className="truncate" style={{ fontWeight: 500 }}>{task.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="list-status-badge" style={{ background: `${column.color}15`, color: column.color, borderColor: `${column.color}30` }}>
                      {column.name}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: pri?.color }}>{pri?.label}</span>
                  </td>
                  <td>
                    {task.dueDate ? (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text3)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                  <td>
                    {subtaskTotal > 0 ? (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <CheckSquare size={12} /> {subtaskDone}/{subtaskTotal}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text3)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--text3)' }}>
          No tasks yet. Switch to Board view and add some tasks.
        </div>
      )}
    </div>
  );
}
