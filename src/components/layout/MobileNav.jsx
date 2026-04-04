import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Kanban, Settings } from 'lucide-react';
import './MobileNav.css';

const items = [
  { to: '/app', icon: LayoutDashboard, label: 'Home', exact: true },
  { to: '/app/work', icon: Kanban, label: 'Work' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);
        return (
          <Link key={item.to} to={item.to} className={`mobile-nav-item ${active ? 'active' : ''}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
