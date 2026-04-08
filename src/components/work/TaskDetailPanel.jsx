import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  X, Calendar, Tag, Plus, Trash2, CheckCircle2, Square,
  MoreVertical, ChevronDown, ChevronUp, Clock, Paperclip, Users,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAuthStore } from '../../store/auth-store';
import { useMobile } from '../../hooks/useMobile';
import { PRIORITIES } from '../../data/modules';
import { BBOS_STAGES } from '../../data/bbos-pipeline';
import GLabelPicker from '../shared/GLabelPicker';
import BbosTaskPanel from '../bbos/BbosTaskPanel';
import './TaskDetailPanel.css';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' });
}

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function TaskDetailPanel({ project, projectId, taskId, onClose }) {
  const mobile = useMobile();
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const addSubtask = useTaskStore((s) => s.addSubtask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const removeSubtask = useTaskStore((s) => s.removeSubtask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const user = useAuthStore((s) => s.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [expandedSubtask, setExpandedSubtask] = useState(null);
  const saveTimeout = useRef(null);
  const titleRef = useRef(null);

  // JS fallback for browsers that don't support field-sizing: content
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el || CSS.supports('field-sizing', 'content')) return;
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }, [title]);

  const columns = project?.columns || [];
  const currentCol = columns.find((c) => c.id === task?.columnId);
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [taskId, task?.title, task?.description]);

  if (!task) return null;

  // BBOS tasks get their own dedicated panel
  if (task.bbosTaskType) {
    return (
      <BbosTaskPanel
        project={project}
        projectId={projectId}
        taskId={taskId}
        onClose={onClose}
      />
    );
  }

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

  const handleStatusChange = (colId) => {
    if (colId !== task.columnId) {
      moveTask(projectId, taskId, colId, 0);
    }
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      deleteTask(projectId, taskId);
      onClose();
    }
  };

  const todoSubtasks = task.subtasks?.filter((s) => !s.done) || [];
  const doneSubtasks = task.subtasks?.filter((s) => s.done) || [];
  const priorityObj = PRIORITIES.find((p) => p.id === task.priority);

  const panel = (
    <div className="task-detail-panel slide-in-right" onClick={(e) => e.stopPropagation()}>
      {/* ── Header bar ── */}
      <div className="tdp-header">
        <div className="tdp-header__left">
          <span className="tdp-project-name">{project?.name || 'Project'}</span>
          {task.id && <span className="tdp-task-id">ID: {task.id.slice(-4)}</span>}
        </div>
        <div className="tdp-header__right">
          {task.dueDate && (
            <span className="tdp-due-badge">
              <Calendar size={12} /> Due date
            </span>
          )}
          <button className="tdp-icon-btn"><MoreVertical size={16} /></button>
          <button className="tdp-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      <div className="tdp-body">
        {/* ── Title ── */}
        <textarea
          ref={titleRef}
          className="tdp-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Task title"
          rows={1}
        />

        {/* ── Assignee + Priority + Status row ── */}
        <div className="tdp-controls-row">
          <div className="tdp-assignee">
            <span className="tdp-assignee-avatar">{initials}</span>
            <button className="tdp-add-circle"><Plus size={12} /></button>
          </div>

          <div className="tdp-control-group">
            <label>Priority</label>
            <select
              className="tdp-select tdp-select--priority"
              value={task.priority}
              onChange={(e) => updateTask(projectId, taskId, { priority: e.target.value })}
              style={{ borderColor: priorityObj?.color, color: priorityObj?.color }}
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="tdp-control-group">
            <label>Status</label>
            <select
              className="tdp-select tdp-select--status"
              value={task.columnId}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>{col.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── BBOS Pipeline Stage ── */}
        {project.bbosEnabled && (
          <div className="tdp-controls-row" style={{ gap: 'var(--space-3)' }}>
            <div className="tdp-control-group">
              <label>Pipeline Stage</label>
              <select
                className="tdp-select"
                value={task.bbosStage || 'FND'}
                onChange={(e) => updateTask(projectId, taskId, { bbosStage: e.target.value })}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}
              >
                {BBOS_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label} ({s.id})</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ── G-Label (claim integrity) ── */}
        <div className="tdp-controls-row" style={{ gap: 'var(--space-3)' }}>
          <div className="tdp-control-group">
            <label>Integrity</label>
            <GLabelPicker
              value={task.gLabel || null}
              onChange={(gLabel) => updateTask(projectId, taskId, { gLabel })}
            />
          </div>
        </div>

        {/* ── Due date ── */}
        <div className="tdp-due-row">
          <Calendar size={14} className="tdp-due-icon" />
          <input
            type="date"
            className="tdp-date-input"
            value={task.dueDate || ''}
            onChange={(e) => updateTask(projectId, taskId, { dueDate: e.target.value || null })}
          />
        </div>

        {/* ── Description ── */}
        <div className="tdp-desc-section">
          <textarea
            className="tdp-description"
            value={description}
            onChange={handleDescChange}
            placeholder="Add a description..."
            rows={3}
          />
        </div>

        {/* ── Subtasks ── */}
        <div className="tdp-subtasks-section">
          <div className="tdp-subtask-add-row">
            <Plus size={14} />
            <input
              className="tdp-subtask-input"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubtask(); }}
              placeholder="Subtask"
            />
          </div>

          {/* To Do */}
          {todoSubtasks.length > 0 && (
            <>
              <div className="tdp-subtask-group-label">To Do</div>
              {todoSubtasks.map((st) => (
                <div key={st.id} className="tdp-subtask-item">
                  <button
                    className="tdp-subtask-check"
                    onClick={() => toggleSubtask(projectId, taskId, st.id)}
                  >
                    <Square size={14} />
                  </button>
                  <span
                    className={`tdp-subtask-title ${expandedSubtask === st.id ? 'expanded' : ''}`}
                    onClick={() => setExpandedSubtask(expandedSubtask === st.id ? null : st.id)}
                  >
                    {st.title}
                  </span>
                  <button
                    className="tdp-subtask-expand"
                    onClick={() => setExpandedSubtask(expandedSubtask === st.id ? null : st.id)}
                  >
                    {expandedSubtask === st.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Completed */}
          {doneSubtasks.length > 0 && (
            <>
              <div className="tdp-subtask-group-label tdp-subtask-group-label--done">Completed</div>
              {doneSubtasks.map((st) => (
                <div key={st.id} className="tdp-subtask-item tdp-subtask-item--done">
                  <button
                    className="tdp-subtask-check tdp-subtask-check--done"
                    onClick={() => toggleSubtask(projectId, taskId, st.id)}
                  >
                    <CheckCircle2 size={14} />
                  </button>
                  <span className="tdp-subtask-title done">{st.title}</span>
                  <button
                    className="tdp-subtask-remove"
                    onClick={() => removeSubtask(projectId, taskId, st.id)}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── Attachment placeholder ── */}
        <button className="tdp-attachment-btn">
          <Plus size={14} /> Attachment
        </button>

        {/* ── Tags ── */}
        <div className="tdp-tags-section">
          <div className="tdp-tags-label">Tags</div>
          <div className="tdp-tags-row">
            {task.tags?.map((tag) => (
              <span key={tag} className="tdp-tag">
                {tag}
                <button className="tdp-tag-remove" onClick={() => removeTag(tag)}>
                  <X size={10} />
                </button>
              </span>
            ))}
            <button className="tdp-tag-add" onClick={() => {
              const tag = prompt('Tag name:');
              if (tag?.trim() && !task.tags.includes(tag.trim())) {
                updateTask(projectId, taskId, { tags: [...task.tags, tag.trim()] });
              }
            }}>
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* ── Status timeline ── */}
        <div className="tdp-status-row">
          <span className="tdp-status-current">
            {currentCol?.name || 'Unknown'}
          </span>
          <span className="tdp-status-time">
            <Clock size={11} />
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="tdp-footer">
        <div className="tdp-footer__meta">
          <span className="tdp-footer__by">
            By <strong>{user?.name || 'You'}</strong> on{' '}
            <span className="tdp-footer__date">{formatDateTime(task.createdAt)}</span>
          </span>
          <span className="tdp-footer__followers">
            Followers <Users size={12} />
          </span>
        </div>
        <div className="tdp-footer__actions">
          <button className="tdp-footer-btn" onClick={handleDelete}>
            <Trash2 size={13} /> Delete
          </button>
          <button className="tdp-footer-btn">Make Recurring</button>
          <button className="tdp-footer-btn">Show discussion</button>
        </div>
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
