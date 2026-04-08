import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Search, Moon, Sun, Menu, MoonStar, Compass, Clock, PenLine } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useAuthStore } from '../../store/auth-store';
import { useMobile } from '../../hooks/useMobile';
import ClockInModal from '../people/ClockInModal';
import './TopBar.css';

function getBreadcrumb(pathname) {
  const parts = pathname.replace('/app', '').split('/').filter(Boolean);
  if (parts.length === 0) return 'Dashboard';
  const labels = { work: 'Work', money: 'Money', people: 'People', office: 'Office', tech: 'Tech', settings: 'Settings' };
  return labels[parts[0]] || parts[0];
}

const WORK_TABS = [
  { path: 'pipeline', label: 'Pipeline' },
  { path: 'people', label: 'People' },
  { path: 'tasks', label: 'Tasks' },
  { path: 'money', label: 'Money' },
  { path: 'assets', label: 'Assets' },
  { path: 'office', label: 'Office' },
  { path: 'tech', label: 'Tech' },
];

function getProjectBase(pathname) {
  const match = pathname.match(/^\/app\/work\/([^/]+)/);
  if (!match) return null;
  return `/app/work/${match[1]}`;
}

export default function TopBar() {
  const location = useLocation();
  const mobile = useMobile();
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const user = useAuthStore((s) => s.user);
  const setReflectionOpen = useAppStore((s) => s.setReflectionOpen);
  const [clockInOpen, setClockInOpen] = useState(false);

  const projectBase = getProjectBase(location.pathname);
  const showWorkTabs = !!projectBase;

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          {mobile && (
            <button className="topbar-btn" onClick={toggleSidebar} title="Menu">
              <Menu size={20} />
            </button>
          )}
          <span className="topbar-breadcrumb">{getBreadcrumb(location.pathname)}</span>
        </div>
        {showWorkTabs && (
          <div className="topbar-center">
            {WORK_TABS.map((tab) => {
              const to = tab.path === 'pipeline' ? projectBase : `${projectBase}/${tab.path}`;
              const end = tab.path === 'pipeline';
              return (
                <NavLink
                  key={tab.path}
                  to={to}
                  end={end}
                  className={({ isActive }) => `topbar-tab${isActive ? ' active' : ''}`}
                >
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        )}
        <div className="topbar-right">
          <button
            className="topbar-btn"
            onClick={() => setReflectionOpen(true)}
            title="Record Reflection"
          >
            <PenLine size={18} />
          </button>
          <button
            className="topbar-btn"
            onClick={() => setClockInOpen(true)}
            title="Clock in"
          >
            <Clock size={18} />
          </button>
          <button className="topbar-btn topbar-search" onClick={() => setSearchOpen(true)} title="Search (Cmd+K)">
            <Search size={18} />
            {!mobile && <span className="topbar-search-hint">Search...</span>}
            {!mobile && <kbd className="topbar-kbd">⌘K</kbd>}
          </button>
          <button
            className={`topbar-btn ${islamicPanelOpen ? 'topbar-btn-active' : ''}`}
            onClick={toggleIslamicPanel}
            title={`${valuesLayer === 'islamic' ? 'Islamic' : 'Values'} Panel (Cmd+I)`}
          >
            {valuesLayer === 'islamic' ? <MoonStar size={18} /> : <Compass size={18} />}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user && (
            <div className="topbar-avatar" title={user.name}>
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </header>
      {clockInOpen && <ClockInModal onClose={() => setClockInOpen(false)} />}
    </>
  );
}
