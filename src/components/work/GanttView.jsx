import { useMemo, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import './GanttView.css';

/* ── helpers ── */
function toDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

function diffDays(a, b) { return Math.round((b - a) / 86400000); }

function fmtDate(d) {
  return d.toLocaleDateString('en', { weekday: 'short', day: 'numeric' });
}

function fmtFull(d) {
  return d.toLocaleDateString('en', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' });
}

function fmtISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function monthLabel(d) {
  return d.toLocaleDateString('en', { month: 'long' });
}

/* ── GanttView ── */
export default function GanttView({ project, onSelectTask, filters }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const updateTask = useTaskStore((s) => s.updateTask);
  const allTasks = tasksByProject[project.id] || [];
  const tasks = useMemo(
    () => getFilteredTasks(project.id, filters),
    [allTasks, filters, project.id, getFilteredTasks],
  );

  const [zoom, setZoom] = useState('week'); // day | week | month
  const timelineRef = useRef(null);
  const tableRef = useRef(null);

  /* ── Compute date-bearing tasks + range ── */
  const { dated, undated, rangeStart, rangeEnd, days } = useMemo(() => {
    const dated = [];
    const undated = [];

    for (const t of tasks) {
      const start = t.startDate ? toDay(new Date(t.startDate)) : null;
      const end = t.dueDate ? toDay(new Date(t.dueDate)) : null;
      if (start || end) {
        const s = start || (end ? addDays(end, -2) : toDay(new Date()));
        const e = end || addDays(s, 2);
        dated.push({ ...t, _start: s, _end: e });
      } else {
        undated.push(t);
      }
    }

    if (dated.length === 0) {
      const today = toDay(new Date());
      const days = [];
      for (let i = -7; i <= 21; i++) days.push(addDays(today, i));
      return { dated, undated, rangeStart: days[0], rangeEnd: days[days.length - 1], days };
    }

    let min = dated[0]._start;
    let max = dated[0]._end;
    for (const t of dated) {
      if (t._start < min) min = t._start;
      if (t._end > max) max = t._end;
    }

    // Pad range
    const padBefore = 3;
    const padAfter = 7;
    const rangeStart = addDays(min, -padBefore);
    const rangeEnd = addDays(max, padAfter);

    const days = [];
    let cur = new Date(rangeStart);
    while (cur <= rangeEnd) {
      days.push(new Date(cur));
      cur = addDays(cur, 1);
    }

    return { dated, undated, rangeStart, rangeEnd, days };
  }, [tasks]);

  /* ── Column width by zoom ── */
  const colW = zoom === 'day' ? 80 : zoom === 'week' ? 40 : 16;
  const ROW_H = 36;

  /* ── Month headers ── */
  const monthHeaders = useMemo(() => {
    const groups = [];
    let cur = null;
    for (let i = 0; i < days.length; i++) {
      const m = days[i].getMonth();
      const y = days[i].getFullYear();
      const key = `${y}-${m}`;
      if (!cur || cur.key !== key) {
        cur = { key, label: monthLabel(days[i]), start: i, span: 1 };
        groups.push(cur);
      } else {
        cur.span++;
      }
    }
    return groups;
  }, [days]);

  /* ── Sync vertical scroll between table and timeline ── */
  const syncScroll = (source) => {
    if (source === 'timeline' && tableRef.current && timelineRef.current) {
      tableRef.current.scrollTop = timelineRef.current.scrollTop;
    } else if (source === 'table' && timelineRef.current && tableRef.current) {
      timelineRef.current.scrollTop = tableRef.current.scrollTop;
    }
  };

  /* ── Scroll to today on mount ── */
  useEffect(() => {
    if (!timelineRef.current || days.length === 0) return;
    const today = toDay(new Date());
    const idx = days.findIndex((d) => d.getTime() === today.getTime());
    if (idx > -1) {
      timelineRef.current.scrollLeft = Math.max(0, idx * colW - 120);
    }
  }, [days, colW]);

  const today = toDay(new Date());
  const todayIdx = days.findIndex((d) => d.getTime() === today.getTime());

  return (
    <div className="gantt-wrap">
      {/* ── Toolbar ── */}
      <div className="gantt-toolbar">
        <div className="gantt-zoom">
          {['day', 'week', 'month'].map((z) => (
            <button
              key={z}
              className={`gantt-zoom-btn${zoom === z ? ' active' : ''}`}
              onClick={() => setZoom(z)}
            >
              {z.charAt(0).toUpperCase() + z.slice(1)}
            </button>
          ))}
        </div>
        {undated.length > 0 && (
          <span className="gantt-undated-warn">
            <AlertTriangle size={13} />
            {undated.length} task{undated.length > 1 ? 's' : ''} without dates
          </span>
        )}
      </div>

      <div className="gantt-container">
        {/* ── Left: task table ── */}
        <div className="gantt-table-wrap">
          {/* Table header */}
          <div className="gantt-table-head">
            <div className="gantt-th gantt-th--name">Name</div>
            <div className="gantt-th gantt-th--date">From</div>
            <div className="gantt-th gantt-th--date">To</div>
            <div className="gantt-th gantt-th--dep">Dependencies</div>
          </div>
          {/* Table body */}
          <div
            className="gantt-table-body"
            ref={tableRef}
            onScroll={() => syncScroll('table')}
          >
            {dated.map((t, i) => (
              <div
                key={t.id}
                className="gantt-table-row"
                onClick={() => onSelectTask(t.id)}
                style={{ height: ROW_H }}
              >
                <div className="gantt-td gantt-td--name">
                  <span className="gantt-row-num">{i + 1}</span>
                  <span className="gantt-task-name truncate">{t.title}</span>
                </div>
                <div className="gantt-td gantt-td--date">
                  <input
                    type="date"
                    className="gantt-date-input"
                    value={t.startDate || fmtISO(t._start)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateTask(project.id, t.id, { startDate: e.target.value || null });
                    }}
                  />
                </div>
                <div className="gantt-td gantt-td--date">
                  <input
                    type="date"
                    className="gantt-date-input"
                    value={t.dueDate || fmtISO(t._end)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateTask(project.id, t.id, { dueDate: e.target.value || null });
                    }}
                  />
                </div>
                <div className="gantt-td gantt-td--dep">-</div>
              </div>
            ))}
            {/* Undated tasks at bottom */}
            {undated.map((t, i) => (
              <div
                key={t.id}
                className="gantt-table-row gantt-table-row--undated"
                onClick={() => onSelectTask(t.id)}
                style={{ height: ROW_H }}
              >
                <div className="gantt-td gantt-td--name">
                  <span className="gantt-row-num">{dated.length + i + 1}</span>
                  <span className="gantt-task-name truncate">{t.title}</span>
                </div>
                <div className="gantt-td gantt-td--date">
                  <input
                    type="date"
                    className="gantt-date-input"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      if (e.target.value) updateTask(project.id, t.id, { startDate: e.target.value });
                    }}
                  />
                </div>
                <div className="gantt-td gantt-td--date">
                  <input
                    type="date"
                    className="gantt-date-input"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      if (e.target.value) updateTask(project.id, t.id, { dueDate: e.target.value });
                    }}
                  />
                </div>
                <div className="gantt-td gantt-td--dep">-</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: timeline ── */}
        <div className="gantt-timeline-wrap">
          {/* Timeline header */}
          <div className="gantt-timeline-head" style={{ width: days.length * colW }}>
            {/* Month row */}
            <div className="gantt-month-row">
              {monthHeaders.map((m) => (
                <div
                  key={m.key}
                  className="gantt-month-cell"
                  style={{ width: m.span * colW }}
                >
                  {m.label}
                </div>
              ))}
            </div>
            {/* Day row */}
            <div className="gantt-day-row">
              {days.map((d, i) => {
                const isToday = d.getTime() === today.getTime();
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                return (
                  <div
                    key={i}
                    className={`gantt-day-cell${isToday ? ' gantt-day--today' : ''}${isWeekend ? ' gantt-day--weekend' : ''}`}
                    style={{ width: colW }}
                  >
                    {zoom !== 'month' && (
                      <>
                        <span className="gantt-day-name">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]}</span>
                        <span className="gantt-day-num">{d.getDate()}</span>
                      </>
                    )}
                    {zoom === 'month' && d.getDate() === 1 && (
                      <span className="gantt-day-num">{d.getDate()}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline body */}
          <div
            className="gantt-timeline-body"
            ref={timelineRef}
            onScroll={() => syncScroll('timeline')}
          >
            <div
              className="gantt-timeline-canvas"
              style={{ width: days.length * colW, height: (dated.length + undated.length) * ROW_H }}
            >
              {/* Grid columns */}
              {days.map((d, i) => {
                const isToday = d.getTime() === today.getTime();
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                return (
                  <div
                    key={i}
                    className={`gantt-grid-col${isToday ? ' gantt-grid--today' : ''}${isWeekend ? ' gantt-grid--weekend' : ''}`}
                    style={{ left: i * colW, width: colW, height: '100%' }}
                  />
                );
              })}

              {/* Today line */}
              {todayIdx > -1 && (
                <div
                  className="gantt-today-line"
                  style={{ left: todayIdx * colW + colW / 2 }}
                />
              )}

              {/* Task bars */}
              {dated.map((t, rowIdx) => {
                const startIdx = diffDays(rangeStart, t._start);
                const span = Math.max(1, diffDays(t._start, t._end) + 1);
                const left = startIdx * colW;
                const width = span * colW - 4;
                const top = rowIdx * ROW_H + 6;
                const pri = PRIORITIES.find((p) => p.id === t.priority);
                const barColor = pri?.color || 'var(--primary)';
                const isDone = project.columns.find((c) => c.id === t.columnId)?.name?.toLowerCase() === 'done';

                return (
                  <div
                    key={t.id}
                    className={`gantt-bar${isDone ? ' gantt-bar--done' : ''}`}
                    style={{
                      left: Math.max(0, left),
                      width: Math.max(colW, width),
                      top,
                      background: `${barColor}20`,
                      borderLeft: `3px solid ${barColor}`,
                    }}
                    onClick={() => onSelectTask(t.id)}
                    title={`${t.title}\n${fmtFull(t._start)} → ${fmtFull(t._end)}`}
                  >
                    <span className="gantt-bar-label truncate">{t.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
