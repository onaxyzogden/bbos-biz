import { LayoutGrid, Table } from 'lucide-react';
import './ViewToggle.css';

/**
 * Two-button view toggle used on module pages with Overview + Framework views.
 * Props:
 *   view     — 'overview' | 'framework'
 *   onChange — callback(newView: string)
 */
export default function ViewToggle({ view, onChange }) {
  return (
    <div className="vt" role="tablist" aria-label="Page view">
      <button
        className={`vt__btn ${view === 'overview' ? 'vt__btn--active' : ''}`}
        onClick={() => onChange('overview')}
        role="tab"
        aria-selected={view === 'overview'}
      >
        <LayoutGrid size={14} />
        <span>Overview</span>
      </button>
      <button
        className={`vt__btn ${view === 'framework' ? 'vt__btn--active' : ''}`}
        onClick={() => onChange('framework')}
        role="tab"
        aria-selected={view === 'framework'}
      >
        <Table size={14} />
        <span>Framework</span>
      </button>
    </div>
  );
}
