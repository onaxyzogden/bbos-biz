import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, MoonStar, Compass, Clock } from 'lucide-react';
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
  const [clockInOpen, setClockInOpen] = useState(false);

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
        <div className="topbar-right">
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
