import { Link, useNavigate } from 'react-router-dom';
import { Plus, Folder, Archive, MoreHorizontal, Trash2, Workflow } from 'lucide-react';
import { useState } from 'react';
import { useProjectStore } from '../store/project-store';
import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import PillarHeader from '../components/shared/PillarHeader';

export default function Work() {
  const navigate = useNavigate();
  const projects = useProjectStore((s) => s.projects);
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['work']);
  const createProject = useProjectStore((s) => s.createProject);
  const deleteProject = useProjectStore((s) => s.deleteProject);
  const archiveProject = useProjectStore((s) => s.archiveProject);
  const [showArchived, setShowArchived] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState('standard');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="work" />;
  }

  const active = projects.filter((p) => !p.archived && !p._faithModule && !p._lifeModule && !p._intellectModule && !p._familyModule && !p._wealthModule && !p._environmentModule);
  const archived = projects.filter((p) => p.archived && !p._faithModule && !p._lifeModule && !p._intellectModule && !p._familyModule && !p._wealthModule && !p._environmentModule);
  const displayed = showArchived ? archived : active;

  const handleNew = () => {
    setNewProjectName('');
    setNewProjectType('standard');
    setShowNewDialog(true);
  };

  const handleCreateProject = () => {
    const name = newProjectName.trim() || 'New Project';
    const project = createProject({
      name,
      bbosEnabled: newProjectType === 'bbos',
    });
    setShowNewDialog(false);
    navigate(`/app/work/${project.id}`);
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="work" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
          {active.length} active project{active.length !== 1 ? 's' : ''}
          {archived.length > 0 && ` · ${archived.length} archived`}
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {archived.length > 0 && (
            <button
              className="btn btn-ghost"
              onClick={() => setShowArchived(!showArchived)}
              style={{ fontSize: '0.85rem' }}
            >
              <Archive size={16} /> {showArchived ? 'Active' : 'Archived'}
            </button>
          )}
          <button className="btn btn-primary" onClick={handleNew}>
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {displayed.length === 0 ? (
        <div style={{
          background: 'var(--surface)', border: '1px dashed var(--border2)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-12)',
          textAlign: 'center',
        }}>
          <Folder size={48} style={{ color: 'var(--text3)', marginBottom: 'var(--space-4)' }} />
          <h3 style={{ marginBottom: 'var(--space-2)' }}>
            {showArchived ? 'No archived projects' : 'Create your first project'}
          </h3>
          <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-5)' }}>
            {showArchived ? 'Archived projects will appear here.' : 'Get started by creating a project with Kanban boards and task management.'}
          </p>
          {!showArchived && (
            <button className="btn btn-primary btn-lg" onClick={handleNew}>
              <Plus size={18} /> New Project
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {displayed.map((p) => (
            <div
              key={p.id}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                transition: 'all var(--duration) var(--ease)',
                position: 'relative',
              }}
            >
              <div style={{ height: 4, background: p.color }} />
              <Link
                to={`/app/work/${p.id}`}
                style={{ display: 'block', padding: 'var(--space-5)', textDecoration: 'none', color: 'var(--text)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <h4 style={{ margin: 0 }}>{p.name}</h4>
                  {p.bbosEnabled && (
                    <span style={{
                      fontSize: '0.62rem', fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '1px 6px', borderRadius: 'var(--radius-xs)',
                      background: 'color-mix(in srgb, #c9a05a 12%, transparent)',
                      color: '#c9a05a', border: '1px solid color-mix(in srgb, #c9a05a 25%, transparent)',
                    }}>BBOS {p.bbosStage && `· ${p.bbosStage}`} {p.bbosCycle > 1 ? `C${p.bbosCycle}` : ''}</span>
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', marginBottom: 'var(--space-3)' }}>
                  {p.description || 'No description'}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {p.columns.map((col) => (
                    <span key={col.id} style={{
                      fontSize: '0.75rem', padding: '2px 8px',
                      background: 'var(--bg3)', borderRadius: 'var(--radius-full)',
                      color: 'var(--text2)',
                    }}>{col.name}</span>
                  ))}
                </div>
              </Link>
              {/* Menu */}
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === p.id ? null : p.id); }}
                  style={{
                    width: 28, height: 28, borderRadius: 'var(--radius-xs)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text3)', background: 'var(--surface)',
                    border: '1px solid transparent', cursor: 'pointer',
                  }}
                >
                  <MoreHorizontal size={16} />
                </button>
                {menuOpen === p.id && (
                  <div
                    style={{
                      position: 'absolute', right: 0, top: 32,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
                      padding: 'var(--space-1)', minWidth: 150, zIndex: 10,
                    }}
                    onClick={() => setMenuOpen(null)}
                  >
                    <button
                      onClick={() => archiveProject(p.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                        width: '100%', padding: 'var(--space-2) var(--space-3)',
                        fontSize: '0.85rem', borderRadius: 'var(--radius-xs)',
                        color: 'var(--text2)', cursor: 'pointer', border: 'none', background: 'none',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg3)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <Archive size={14} /> {p.archived ? 'Unarchive' : 'Archive'}
                    </button>
                    <button
                      onClick={() => { if (confirm('Delete this project?')) deleteProject(p.id); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                        width: '100%', padding: 'var(--space-2) var(--space-3)',
                        fontSize: '0.85rem', borderRadius: 'var(--radius-xs)',
                        color: 'var(--danger)', cursor: 'pointer', border: 'none', background: 'none',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--danger-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Project Dialog */}
      {showNewDialog && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
          onClick={() => setShowNewDialog(false)}
        >
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)',
              width: 420, maxWidth: '90vw',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 'var(--space-4)' }}>New Project</h3>
            <input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') handleCreateProject(); }}
              style={{
                width: '100%', padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text)', fontSize: '0.95rem',
                marginBottom: 'var(--space-4)',
              }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: 'var(--space-2)' }}>
              Project Type
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
              <button
                onClick={() => setNewProjectType('standard')}
                style={{
                  flex: 1, padding: 'var(--space-3)', borderRadius: 'var(--radius)',
                  border: `2px solid ${newProjectType === 'standard' ? 'var(--primary)' : 'var(--border)'}`,
                  background: newProjectType === 'standard' ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'var(--bg)',
                  cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <Folder size={16} />
                  <strong style={{ fontSize: '0.85rem' }}>Standard</strong>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text2)', margin: 0 }}>
                  4-column Kanban board (To Do, In Progress, Review, Done)
                </p>
              </button>
              <button
                onClick={() => setNewProjectType('bbos')}
                style={{
                  flex: 1, padding: 'var(--space-3)', borderRadius: 'var(--radius)',
                  border: `2px solid ${newProjectType === 'bbos' ? '#c9a05a' : 'var(--border)'}`,
                  background: newProjectType === 'bbos' ? 'color-mix(in srgb, #c9a05a 8%, transparent)' : 'var(--bg)',
                  cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <Workflow size={16} style={{ color: '#c9a05a' }} />
                  <strong style={{ fontSize: '0.85rem' }}>BBOS Pipeline</strong>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text2)', margin: 0 }}>
                  9-stage business cultivation pipeline (Think / Execute / Reckon)
                </p>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
              <button className="btn btn-ghost" onClick={() => setShowNewDialog(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateProject}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
