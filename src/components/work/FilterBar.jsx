import { useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import './FilterBar.css';

const DUE_PRESETS = [
  { id: 'overdue', label: 'Overdue' },
  { id: 'today', label: 'Today' },
  { id: 'this-week', label: 'This Week' },
  { id: 'no-date', label: 'No Date' },
];

export default function FilterBar({ projectId }) {
  const filters = useAppStore((s) => s.filters[projectId]) || { priorities: [], dueDate: null, tags: [] };
  const setFilters = useAppStore((s) => s.setFilters);
  const clearFilters = useAppStore((s) => s.clearFilters);
  const activeCount = useAppStore((s) => s.getActiveFilterCount(projectId));
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const allTags = useMemo(() => {
    const tasks = tasksByProject[projectId] || [];
    const tagSet = new Set();
    tasks.forEach((t) => t.tags?.forEach((tag) => tagSet.add(tag)));
    return [...tagSet].slice(0, 8);
  }, [tasksByProject, projectId]);

  const togglePriority = (priId) => {
    const current = filters.priorities || [];
    const next = current.includes(priId)
      ? current.filter((p) => p !== priId)
      : [...current, priId];
    setFilters(projectId, { priorities: next });
  };

  const toggleDueDate = (preset) => {
    setFilters(projectId, { dueDate: filters.dueDate === preset ? null : preset });
  };

  const toggleTag = (tag) => {
    const current = filters.tags || [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    setFilters(projectId, { tags: next });
  };

  return (
    <div className="filter-bar">
      <div className="filter-label">
        <Filter size={14} />
        <span>Filter</span>
        {activeCount > 0 && <span className="filter-count">{activeCount}</span>}
      </div>

      <div className="filter-pills">
        {PRIORITIES.map((pri) => (
          <button
            key={pri.id}
            className={`filter-pill ${(filters.priorities || []).includes(pri.id) ? 'active' : ''}`}
            onClick={() => togglePriority(pri.id)}
            style={(filters.priorities || []).includes(pri.id) ? { background: pri.bg, color: pri.color, borderColor: pri.color + '40' } : undefined}
          >
            {pri.label}
          </button>
        ))}

        <div className="filter-divider" />

        {DUE_PRESETS.map((d) => (
          <button
            key={d.id}
            className={`filter-pill ${filters.dueDate === d.id ? 'active' : ''}`}
            onClick={() => toggleDueDate(d.id)}
          >
            {d.label}
          </button>
        ))}

        {allTags.length > 0 && <div className="filter-divider" />}

        {allTags.map((tag) => (
          <button
            key={tag}
            className={`filter-pill filter-tag ${(filters.tags || []).includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {activeCount > 0 && (
        <button className="filter-clear" onClick={() => clearFilters(projectId)}>
          <X size={12} /> Clear
        </button>
      )}
    </div>
  );
}
