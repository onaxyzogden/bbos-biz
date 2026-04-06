import { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Kanban, Wallet, Users, Building2, Shield, Heart, Home, UsersRound, Landmark, BookOpen, ScrollText,
  LayoutDashboard, Settings, Plus, ChevronLeft, ChevronRight,
  ChevronDown, Bell, BookHeart, HeartPulse, Brain, Coins, TreePine, Moon,
  Activity, BrainCircuit, Sparkles, HeartHandshake,
  Library, Wrench, Lightbulb, Share2,
  Baby, CalendarHeart, Handshake,
  GraduationCap, HandHeart, Scale,
  PiggyBank, Store, Gift, BarChart3,
  Leaf, TreeDeciduous, ShoppingBag, Hammer,
} from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import { useSettingsStore } from '../../store/settings-store';
import { useMobile } from '../../hooks/useMobile';
import { MODULES } from '../../data/modules';
import { MAQASID_PILLARS, getPillarLabel } from '../../data/maqasid';
import NotificationsPanel from './NotificationsPanel';
import './Sidebar.css';

const ICON_MAP = {
  Kanban, Wallet, Users, Building2, Shield, Heart, Home, UsersRound, Landmark, BookOpen, ScrollText,
  Activity, BrainCircuit, Sparkles, HeartHandshake,
  Library, Wrench, Lightbulb, Share2,
  Baby, CalendarHeart, Handshake,
  GraduationCap, HandHeart, Scale,
  PiggyBank, Store, Gift, BarChart3,
  Leaf, TreeDeciduous, ShoppingBag, Hammer,
};
const PILLAR_ICON_MAP = { BookHeart, HeartPulse, Brain, Users, Coins, TreePine };

const MODULE_ROUTES = {
  work: '/app/work',
  money: '/app/money',
  people: '/app/people',
  office: '/app/office',
  tech: '/app/tech',
  family: '/app/family',
  neighbors: '/app/neighbors',
  community: '/app/community',
  'five-pillars': '/app/five-pillars',
  quran: '/app/quran',
  hadith: '/app/hadith',
  // Faith
  'islamic-knowledge': '/app/islamic-knowledge',
  'community-engagement': '/app/community-engagement',
  'ethical-living': '/app/ethical-living',
  // Life
  'physical-wellness': '/app/physical-wellness',
  'mental-health': '/app/mental-health',
  'spiritual-health': '/app/spiritual-health',
  'family-health': '/app/family-health',
  // Intellect
  'learning-resources': '/app/learning-resources',
  'skill-development': '/app/skill-development',
  'critical-thinking': '/app/critical-thinking',
  'knowledge-sharing': '/app/knowledge-sharing',
  // Family
  'parenting-support': '/app/parenting-support',
  'family-planning': '/app/family-planning',
  'intergenerational-support': '/app/intergenerational-support',
  // Wealth
  'financial-literacy': '/app/financial-literacy',
  'ethical-business': '/app/ethical-business',
  'charity-zakat': '/app/charity-zakat',
  'resource-management': '/app/resource-management',
  // Environment
  sustainability: '/app/sustainability',
  conservation: '/app/conservation',
  'ethical-consumption': '/app/ethical-consumption',
  'community-projects': '/app/community-projects',
};

const modulesById = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = useMobile();
  const { sidebarOpen, toggleSidebar, activeModule, setActiveModule, expandedPillars, togglePillar } = useAppStore();
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const allProjects = useProjectStore((s) => s.projects);
  const createProject = useProjectStore((s) => s.createProject);
  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);
  const [notifOpen, setNotifOpen] = useState(false);

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
            <div className="logo-icon"><Moon size={14} /></div>
            <span>MAQASID</span>
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
          onClick={handleNavClick}
          title="Dashboard"
        >
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <div className="sidebar-divider" />

        {MAQASID_PILLARS.map((pillar) => {
          const PillarIcon = PILLAR_ICON_MAP[pillar.icon];
          const subModules = pillar.subModuleIds.map((id) => modulesById[id]).filter(Boolean);
          const hasActiveChild = subModules.some((m) => {
            const r = MODULE_ROUTES[m.id];
            return r && (location.pathname === r || location.pathname.startsWith(r + '/'));
          });
          const isExpanded = expandedPillars[pillar.id] || hasActiveChild;
          const isScaffold = pillar.status === 'scaffold';
          const label = getPillarLabel(pillar, valuesLayer);

          const isPillarActive = location.pathname === `/app/pillar/${pillar.id}`;

          return (
            <div key={pillar.id} className="pillar-group">
              <button
                className={`pillar-header ${hasActiveChild || isPillarActive ? 'has-active' : ''}`}
                style={{ '--pillar-color': `var(--pillar-${pillar.id})` }}
                onClick={(e) => {
                  if (collapsed) return;
                  navigate(`/app/pillar/${pillar.id}`);
                  if (!isExpanded) togglePillar(pillar.id);
                }}
                title={label}
              >
                {PillarIcon && <PillarIcon size={16} style={{ color: `var(--pillar-${pillar.id})` }} />}
                {!collapsed && (
                  <>
                    <span className="pillar-label">{label}</span>
                    {isScaffold && <span className="sidebar-badge">Soon</span>}
                    <ChevronDown
                      size={12}
                      className={`pillar-chevron ${isExpanded ? 'expanded' : ''}`}
                      onClick={(e) => { e.stopPropagation(); togglePillar(pillar.id); }}
                    />
                  </>
                )}
              </button>

              {!collapsed && isExpanded && (
                <div className="pillar-children">
                  {isScaffold ? (
                    <span className="pillar-scaffold">Coming soon</span>
                  ) : (
                    subModules.map((mod) => {
                      const Icon = ICON_MAP[mod.icon];
                      const route = MODULE_ROUTES[mod.id];
                      const isActive = location.pathname === route || location.pathname.startsWith(route + '/');
                      return (
                        <Link
                          key={mod.id}
                          to={route}
                          className={`sidebar-item pillar-submodule ${isActive ? 'active' : ''}`}
                          onClick={() => { setActiveModule(mod.id); handleNavClick(); }}
                          title={mod.name}
                        >
                          {Icon && <Icon size={16} style={isActive ? { color: mod.color } : undefined} />}
                          <span>{mod.name}</span>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
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
        <button
          className="sidebar-item"
          onClick={() => setNotifOpen(true)}
          title="Notifications"
        >
          <Bell size={18} />
          {!collapsed && <span>Notifications</span>}
        </button>
        <Link
          to="/app/settings"
          className={`sidebar-item ${location.pathname === '/app/settings' ? 'active' : ''}`}
          title="Settings"
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
    </aside>
    </>
  );
}
