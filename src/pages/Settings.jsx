import { Moon, Sun, Download, Upload, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settings-store';
import { useAuthStore } from '../store/auth-store';
import { exportAll, importAll, clearAll } from '../services/storage';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme, valuesLayer, setValuesLayer } = useSettingsStore();
  const { user, logout } = useAuthStore();

  const handleExport = () => {
    const data = exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bbos-biz-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          importAll(data);
          window.location.reload();
        } catch {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearData = () => {
    if (confirm('This will delete ALL your data. Are you sure?')) {
      clearAll();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: 'var(--space-6)' }}>Settings</h2>

      {/* Profile */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Profile</h4>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.1rem',
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{user?.org || 'No organization'}</div>
          </div>
        </div>
      </section>

      {/* Theme */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Appearance</h4>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {[
            { id: 'light', icon: <Sun size={18} />, label: 'Light' },
            { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-2)', padding: 'var(--space-4)',
                background: theme === t.id ? 'var(--primary-bg)' : 'var(--surface)',
                border: `1px solid ${theme === t.id ? 'var(--primary-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', cursor: 'pointer',
                fontWeight: 500, color: theme === t.id ? 'var(--primary)' : 'var(--text2)',
                transition: 'all var(--duration) var(--ease)',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Values Layer */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Values Layer</h4>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {[
            { id: 'islamic', label: 'Islamic' },
            { id: 'universal', label: 'Universal' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setValuesLayer(v.id)}
              style={{
                flex: 1, padding: 'var(--space-3)',
                background: valuesLayer === v.id ? 'var(--accent-bg)' : 'var(--surface)',
                border: `1px solid ${valuesLayer === v.id ? 'var(--accent-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', cursor: 'pointer',
                fontWeight: 500, color: valuesLayer === v.id ? 'var(--accent)' : 'var(--text2)',
                transition: 'all var(--duration) var(--ease)',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </section>

      {/* Data */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Data</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary" onClick={handleExport} style={{ justifyContent: 'flex-start' }}>
            <Download size={16} /> Export All Data
          </button>
          <button className="btn btn-secondary" onClick={handleImport} style={{ justifyContent: 'flex-start' }}>
            <Upload size={16} /> Import Data
          </button>
          <button className="btn btn-ghost" onClick={handleClearData} style={{ justifyContent: 'flex-start', color: 'var(--danger)' }}>
            <Trash2 size={16} /> Clear All Data
          </button>
        </div>
      </section>

      {/* Logout */}
      <button className="btn btn-ghost" onClick={handleLogout} style={{ color: 'var(--text2)' }}>
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
