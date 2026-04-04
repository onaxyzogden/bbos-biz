import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Folder, FileText } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import './SearchPalette.css';

export default function SearchPalette() {
  const navigate = useNavigate();
  const searchOpen = useAppStore((s) => s.searchOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const allProjects = useProjectStore((s) => s.projects);
  const searchAllTasks = useTaskStore((s) => s.searchAllTasks);

  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);

  const projectResults = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return projects.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3);
  }, [query, projects]);

  const taskResults = useMemo(() => {
    if (query.length < 2) return [];
    return searchAllTasks(query);
  }, [query, searchAllTasks]);

  const allResults = useMemo(() => {
    const items = [];
    projectResults.forEach((p) => items.push({ type: 'project', data: p }));
    taskResults.forEach((t) => items.push({ type: 'task', data: t }));
    return items;
  }, [projectResults, taskResults]);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const close = useCallback(() => {
    setSearchOpen(false);
    setQuery('');
  }, [setSearchOpen]);

  const selectResult = useCallback((item) => {
    close();
    if (item.type === 'project') {
      navigate(`/app/work/${item.data.id}`);
    } else {
      navigate(`/app/work/${item.data.projectId}?task=${item.data.id}`);
    }
  }, [close, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, allResults.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && allResults[selectedIdx]) {
      e.preventDefault();
      selectResult(allResults[selectedIdx]);
    }
  };

  if (!searchOpen) return null;

  const getProjectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name || 'Unknown';

  return (
    <div className="search-overlay" onClick={close}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Input */}
        <div className="search-input-row">
          <Search size={18} className="search-icon" />
          <input
            ref={inputRef}
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects and tasks..."
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="search-kbd">ESC</kbd>
        </div>

        {/* Results */}
        <div className="search-results">
          {query.length < 2 && (
            <div className="search-hint">Type at least 2 characters to search...</div>
          )}

          {query.length >= 2 && allResults.length === 0 && (
            <div className="search-hint">No results found for &ldquo;{query}&rdquo;</div>
          )}

          {projectResults.length > 0 && (
            <div className="search-group">
              <div className="search-group-label">Projects</div>
              {projectResults.map((p, i) => {
                const idx = i;
                return (
                  <button
                    key={p.id}
                    className={`search-result ${selectedIdx === idx ? 'selected' : ''}`}
                    onClick={() => selectResult({ type: 'project', data: p })}
                    onMouseEnter={() => setSelectedIdx(idx)}
                  >
                    <div className="search-result-icon" style={{ background: p.color + '20' }}>
                      <Folder size={14} style={{ color: p.color }} />
                    </div>
                    <span className="search-result-title">{p.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {taskResults.length > 0 && (
            <div className="search-group">
              <div className="search-group-label">Tasks</div>
              {taskResults.map((t, i) => {
                const idx = projectResults.length + i;
                const pri = PRIORITIES.find((p) => p.id === t.priority);
                return (
                  <button
                    key={t.id}
                    className={`search-result ${selectedIdx === idx ? 'selected' : ''}`}
                    onClick={() => selectResult({ type: 'task', data: t })}
                    onMouseEnter={() => setSelectedIdx(idx)}
                  >
                    <div className="search-result-bar" style={{ background: pri?.color || 'var(--text3)' }} />
                    <div className="search-result-text">
                      <span className="search-result-title">{t.title}</span>
                      <span className="search-result-project">{getProjectName(t.projectId)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
