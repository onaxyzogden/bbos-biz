import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Tag, Plus, Trash2, CheckSquare, Square, CheckCircle2 } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useMobile } from '../../hooks/useMobile';
import { PRIORITIES } from '../../data/modules';
import './TaskDetailPanel.css';

export default function TaskDetailPanel({ projectId, taskId, onClose }) {
  const mobile = useMobile();
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const addSubtask = useTaskStore((s) => s.addSubtask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const removeSubtask = useTaskStore((s) => s.removeSubtask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [newTag, setNewTag] = useState('');
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [taskId, task?.title, task?.description]);

  if (!task) return null;

  const autoSave = (field, value) => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateTask(projectId, taskId, { [field]: value });
    }, 300);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    autoSave('title', e.target.value);
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
    autoSave('description', e.target.value);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      addSubtask(projectId, taskId, newSubtask.trim());
      setNewSubtask('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !task.tags.includes(newTag.trim())) {
      updateTask(projectId, taskId, { tags: [...task.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    updateTask(projectId, taskId, { tags: task.tags.filter((t) => t !== tag) });
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      deleteTask(projectId, taskId);
      onClose();
    }
  };

  const subtaskDone = task.subtasks?.filter((s) => s.done).length || 0;

  const panel = (
    <div className="task-detail-panel slide-in-right" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="tdp-header">
        <span className="tdp-label">Task Detail</span>
        <button className="tdp-close" onClick={onClose}><X size={18} /></button>
      </div>

      <div className="tdp-body">
        {/* Title */}
        <input
          className="tdp-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Task title"
        />

        {/* Meta Grid */}
        <div className="tdp-meta-grid">
          <div className="tdp-meta-item">
            <label>Priority</label>
            <select
              value={task.priority}
              onChange={(e) => updateTask(projectId, taskId, { priority: e.target.value })}
              style={{ borderColor: PRIORITIES.find((p) => p.id === task.priority)?.color }}
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
          <div className="tdp-meta-item">
            <label>Due Date</label>
            <input
              type="date"
              value={task.dueDate || ''}
              onChange={(e) => updateTask(projectId, taskId, { dueDate: e.target.value || null })}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="tdp-section">
          <label className="tdp-section-label"><Tag size={14} /> Tags</label>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
            {task.tags?.map((tag) => (
              <span key={tag} className="tdp-tag">
                {tag}
                <button onClick={() => removeTag(tag)} style={{ color: 'var(--text3)', marginLeft: 4, cursor: 'pointer', background: 'none', border: 'none', padding: 0, lineHeight: 1 }}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <input
              value={newTag} onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(); }}
              placeholder="Add tag..."
              style={{ flex: 1, fontSize: '0.85rem', padding: 'var(--space-1) var(--space-2)' }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="tdp-section">
          <label className="tdp-section-label">Description</label>
          <textarea
            className="tdp-description"
            value={description}
            onChange={handleDescChange}
            placeholder="Add a description..."
            rows={4}
          />
        </div>

        {/* Subtasks */}
        <div className="tdp-section">
          <label className="tdp-section-label">
            <CheckSquare size={14} /> Subtasks
            {task.subtasks?.length > 0 && (
              <span style={{ fontWeight: 400, color: 'var(--text3)', marginLeft: 'var(--space-2)' }}>
                {subtaskDone}/{task.subtasks.length}
              </span>
            )}
          </label>

          {task.subtasks?.length > 0 && (
            <div className="tdp-subtask-progress">
              <div style={{ width: `${task.subtasks.length > 0 ? (subtaskDone / task.subtasks.length) * 100 : 0}%` }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {task.subtasks?.map((st) => (
              <div key={st.id} className="tdp-subtask">
                <button
                  onClick={() => toggleSubtask(projectId, taskId, st.id)}
                  style={{ color: st.done ? 'var(--success)' : 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  {st.done ? <CheckCircle2 size={16} /> : <Square size={16} />}
                </button>
                <span style={{ flex: 1, fontSize: '0.875rem', textDecoration: st.done ? 'line-through' : 'none', color: st.done ? 'var(--text3)' : 'var(--text)' }}>
                  {st.title}
                </span>
                <button
                  onClick={() => removeSubtask(projectId, taskId, st.id)}
                  style={{ color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: 0.5 }}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input
              value={newSubtask} onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubtask(); }}
              placeholder="Add subtask..."
              style={{ flex: 1, fontSize: '0.85rem', padding: 'var(--space-1) var(--space-2)' }}
            />
            <button className="btn btn-ghost" onClick={handleAddSubtask} style={{ padding: 'var(--space-1) var(--space-2)' }}>
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Timestamps */}
        <div className="tdp-section" style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
          <div>Created: {new Date(task.createdAt).toLocaleString()}</div>
          <div>Updated: {new Date(task.updatedAt).toLocaleString()}</div>
          {task.completedAt && <div>Completed: {new Date(task.completedAt).toLocaleString()}</div>}
        </div>

        {/* Delete */}
        <button
          className="btn btn-ghost"
          onClick={handleDelete}
          style={{ color: 'var(--danger)', marginTop: 'var(--space-4)', width: '100%', justifyContent: 'center' }}
        >
          <Trash2 size={14} /> Delete Task
        </button>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="tdp-mobile-overlay" onClick={onClose}>
        {panel}
      </div>
    );
  }

  return panel;
}
