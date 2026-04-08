import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Check, RotateCcw, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useAuthStore } from '../../store/auth-store';
import { useMobile } from '../../hooks/useMobile';
import { getBbosTaskDef, BBOS_VALIDATION_FLAG_LABELS } from '../../data/bbos-task-definitions';
import { getStage } from '../../data/bbos-pipeline';
import GLabelPicker from '../shared/GLabelPicker';
import './BbosTaskPanel.css';

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function BbosTaskPanel({ project, projectId, taskId, onClose }) {
  const mobile = useMobile();
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const updateBbosFieldData = useTaskStore((s) => s.updateBbosFieldData);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const user = useAuthStore((s) => s.user);

  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [localFields, setLocalFields] = useState({});
  const saveTimeout = useRef(null);

  const def = task?.bbosTaskType ? getBbosTaskDef(task.bbosTaskType) : null;
  const stage = def ? getStage(def.stage) : null;

  useEffect(() => {
    if (task?.bbosFieldData) {
      setLocalFields(task.bbosFieldData);
    }
  }, [taskId]);

  if (!task || !def) return null;

  const fieldData = task.bbosFieldData || {};
  const aiDraftStatus = fieldData._aiDraftStatus || 'none';
  const aiDraftTimestamp = fieldData._aiDraftTimestamp || null;

  const handleFieldChange = (fieldId, value) => {
    setLocalFields((prev) => ({ ...prev, [fieldId]: value }));
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateBbosFieldData(projectId, taskId, fieldId, value);
    }, 300);
  };

  const handleGLabelChange = (gLabel) => {
    updateTask(projectId, taskId, { gLabel });
  };

  const handleGenerateDraft = () => {
    // Placeholder: marks as pending until real AI integration is wired
    const now = new Date().toISOString();
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'pending');
    updateBbosFieldData(projectId, taskId, '_aiDraftTimestamp', now);
  };

  const handleAcceptDraft = () => {
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'accepted');
  };

  const handleRejectDraft = () => {
    updateBbosFieldData(projectId, taskId, '_aiDraftStatus', 'rejected');
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      deleteTask(projectId, taskId);
      onClose();
    }
  };

  const stageColor = stage?.color || 'var(--accent)';

  const panel = (
    <div className="bbos-task-panel slide-in-right" onClick={(e) => e.stopPropagation()}>

      {/* ── Stage header band ── */}
      <div className="btp-header" style={{ borderTopColor: stageColor }}>
        <div className="btp-header__stage">
          <span className="btp-stage-badge" style={{ color: stageColor, borderColor: stageColor }}>
            {def.stage}
          </span>
          <span className="btp-sublevel">{def.subLevel}</span>
          <span className="btp-label">{def.label}</span>
        </div>
        <button className="btp-close-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      {/* ── Islamic attributes band ── */}
      <div className="btp-attrs-band">
        {def.governingAttributes.map((attr, i) => (
          <span key={attr}>
            <span className="btp-attr-name">{attr}</span>
            {i < def.governingAttributes.length - 1 && (
              <span className="btp-attr-sep"> · </span>
            )}
          </span>
        ))}
      </div>

      <div className="btp-body">

        {/* ── Purpose block ── */}
        <div className="btp-section">
          <div className="btp-section-label">Purpose</div>
          <p className="btp-purpose-text">{def.purpose}</p>
        </div>

        {/* ── Theological Rationale (collapsible) ── */}
        <div className="btp-section">
          <button
            className="btp-rationale-toggle"
            onClick={() => setRationaleOpen(!rationaleOpen)}
          >
            <span>Theological Rationale</span>
            {rationaleOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          {rationaleOpen && (
            <p className="btp-rationale-text">{def.attrMeaning}</p>
          )}
        </div>

        <div className="btp-divider" />

        {/* ── Form fields ── */}
        <div className="btp-fields">
          {def.fields.map((field) => (
            <div key={field.id} className="btp-field">
              <label className="btp-field-label">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="btp-field-textarea"
                  rows={field.rows || 3}
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              ) : field.type === 'select' ? (
                <select
                  className="btp-field-select"
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'number' ? (
                <input
                  type="number"
                  className="btp-field-input"
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="btp-field-input"
                  placeholder={field.placeholder || ''}
                  value={localFields[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── G-Label ── */}
        {def.hasGLabel && (
          <div className="btp-section btp-glabel-row">
            <span className="btp-section-label">Integrity Label</span>
            <GLabelPicker
              value={task.gLabel || null}
              onChange={handleGLabelChange}
            />
          </div>
        )}

        <div className="btp-divider" />

        {/* ── Validation flags ── */}
        {def.validationFlags?.length > 0 && (
          <div className="btp-flags">
            {def.validationFlags.map((flag) => {
              const info = BBOS_VALIDATION_FLAG_LABELS[flag];
              if (!info) return null;
              return (
                <div key={flag} className="btp-flag">
                  <AlertTriangle size={13} className="btp-flag-icon" />
                  <div>
                    <div className="btp-flag-label">{info.label}</div>
                    <div className="btp-flag-detail">{info.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── AI Draft section ── */}
        {def.hasAiDraft && (
          <div className="btp-draft-section">
            <div className="btp-section-label">AI Draft</div>

            {aiDraftStatus === 'none' && (
              <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                <Sparkles size={14} /> Generate Draft
              </button>
            )}

            {aiDraftStatus === 'pending' && (
              <div className="btp-draft-pending">
                <div className="btp-draft-status btp-draft-status--pending">
                  <Sparkles size={12} /> AI-Generated Draft · {formatDateTime(aiDraftTimestamp)}
                </div>
                <div className="btp-draft-actions">
                  <button className="btp-draft-btn btp-draft-btn--accept" onClick={handleAcceptDraft}>
                    <Check size={13} /> Accept Draft
                  </button>
                  <button className="btp-draft-btn btp-draft-btn--reject" onClick={handleRejectDraft}>
                    <RotateCcw size={13} /> Reject Draft
                  </button>
                </div>
              </div>
            )}

            {aiDraftStatus === 'accepted' && (
              <div className="btp-draft-status btp-draft-status--accepted">
                <Check size={12} /> Draft Accepted
              </div>
            )}

            {aiDraftStatus === 'rejected' && (
              <button className="btp-generate-btn" onClick={handleGenerateDraft}>
                <RotateCcw size={14} /> Regenerate Draft
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="btp-footer">
        <span className="btp-footer-meta">
          {user?.name || 'You'} · {formatDateTime(task.createdAt)}
        </span>
        <div className="btp-footer-actions">
          <button className="btp-footer-del" onClick={handleDelete}>Delete</button>
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
