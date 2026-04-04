import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Kanban, Wallet, Users, Building2, Shield, Handshake, LayoutDashboard, Settings, Plus, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import { useMobile } from '../../hooks/useMobile';
import { MODULES } from '../../data/modules';
import './Sidebar.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield, Handshake };

const MODULE_ROUTES = {
  work: '/app/work',
  money: '/app/money',
  people: '/app/people',
  office: '/app/office',
  tech: '/app/tech',
  crm: '/app/crm',
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = useMobile();
  const { sidebarOpen, toggleSidebar, activeModule, setActiveModule } = useAppStore();
  const allProjects = useProjectStore((s) => s.projects);
  const createProject = useProjectStore((s) => s.createProject);
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);

  const collapsed = mobile ? false : !sidebarOpen;

  const handleNewProject = () => {
    const project = createProject({ name: 'New Project' });
    navigate(`/app/work/${project.id}`);
  };

  const handleNavClick = () => {
    if (mobile && sidebarOpen) toggleSidebar();
  };

  if (mobile && !sidebarOpen) return null;

  return (
    <>
      {mobile && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobile ? 'sidebar-mobile' : ''}`}>
      {/* Logo */}
      <div className="sidebar-header">
        {!collapsed && (
          <Link to="/app" className="sidebar-logo">
            <div className="logo-icon">B</div>
            <span>BBOS</span>
          </Link>
        )}
        <button className="sidebar-toggle" onClick={toggleSidebar} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="sidebar-nav">
        <Link
          to="/app"
          className={`sidebar-item ${location.pathname === '/app' ? 'active' : ''}`}
          title="Dashboard"
        >
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <div className="sidebar-divider" />

        {MODULES.map((mod) => {
          const Icon = ICON_MAP[mod.icon];
          const route = MODULE_ROUTES[mod.id];
          const isActive = location.pathname.startsWith(route);
          return (
            <Link
              key={mod.id}
              to={route}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
              title={mod.name}
            >
              {Icon && <Icon size={18} style={isActive ? { color: mod.color } : undefined} />}
              {!collapsed && (
                <>
                  <span>{mod.name}</span>
                  {!mod.ready && <span className="sidebar-badge">Soon</span>}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Projects */}
      {!collapsed && activeModule === 'work' && (
        <div className="sidebar-projects">
          <div className="sidebar-section-header">
            <span>Projects</span>
            <button className="sidebar-icon-btn" onClick={handleNewProject} title="New Project">
              <Plus size={14} />
            </button>
          </div>
          <div className="sidebar-project-list">
            {projects.length === 0 && (
              <p className="sidebar-empty">No projects yet</p>
            )}
            {projects.map((p) => (
              <Link
                key={p.id}
                to={`/app/work/${p.id}`}
                className={`sidebar-project ${location.pathname.includes(p.id) ? 'active' : ''}`}
              >
                <div className="project-dot" style={{ background: p.color }} />
                <span className="truncate">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="sidebar-bottom">
        <Link
          to="/app/settings"
          className={`sidebar-item ${location.pathname === '/app/settings' ? 'active' : ''}`}
          title="Settings"
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
    </>
  );
}
