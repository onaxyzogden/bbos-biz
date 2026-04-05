import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Trash2, X, Search, ChevronDown } from 'lucide-react';
import { useOfficeStore, EVENT_CATEGORIES } from '../../store/office-store';
import './CalendarView.css';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const VIEWS = ['Month', 'Week', 'Day', 'Agenda'];

export default function CalendarView() {
  const events = useOfficeStore((s) => s.events);
  const addEvent = useOfficeStore((s) => s.addEvent);
  const deleteEvent = useOfficeStore((s) => s.deleteEvent);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [activeView, setActiveView] = useState('Month');
  const [activeFilters, setActiveFilters] = useState(new Set(EVENT_CATEGORIES.map(c => c.id)));
  const [showAllEvents, setShowAllEvents] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [fTitle, setFTitle] = useState('');
  const [fDate, setFDate] = useState('');
  const [fStart, setFStart] = useState('09:00');
  const [fEnd, setFEnd] = useState('10:00');
  const [fDesc, setFDesc] = useState('');
  const [fLoc, setFLoc] = useState('');
  const [fCategory, setFCategory] = useState('meeting');

  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };
  const goToday = () => { setYear(now.getFullYear()); setMonth(now.getMonth()); };

  const monthLabel = new Date(year, month).toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  const toggleFilter = (catId) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId); else next.add(catId);
      return next;
    });
  };

  const filteredEvents = useMemo(() =>
    events.filter(e => activeFilters.has(e.category || 'meeting')),
  [events, activeFilters]);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = filteredEvents.filter((e) => e.date === dateStr);
      days.push({ day: d, date: dateStr, events: dayEvents, isToday: dateStr === todayStr });
    }
    return days;
  }, [year, month, filteredEvents, firstDay, daysInMonth, todayStr]);

  const upcomingEvents = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return filteredEvents
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
      .slice(0, 10);
  }, [filteredEvents]);

  const getCategoryColor = (cat) => EVENT_CATEGORIES.find(c => c.id === cat)?.color || '#6b7280';

  const handleAdd = () => {
    if (!fTitle.trim()) return;
    addEvent({ title: fTitle, date: fDate || todayStr, startTime: fStart, endTime: fEnd, description: fDesc, location: fLoc, category: fCategory });
    setShowForm(false); setFTitle(''); setFDesc(''); setFLoc(''); setFCategory('meeting');
  };

  const formatDueDate = (date, time) => {
    const d = new Date(date + 'T' + (time || '12:00'));
    const now = new Date();
    const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    const dateStr = d.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false });
    if (diffDays < 0) return { text: dateStr, badge: `${Math.abs(diffDays)} days ago`, color: 'var(--danger)' };
    if (diffDays === 0) return { text: dateStr, badge: 'Today', color: 'var(--warning)' };
    return { text: dateStr, badge: `Due in ${diffDays} days`, color: 'var(--mod-office)' };
  };

  return (
    <div className="cal-container">
      {/* Top filter bar */}
      <div className="cal-filter-bar">
        <div className="cal-filter-pills">
          <button className={`cal-filter-pill ${activeFilters.size === EVENT_CATEGORIES.length ? 'active' : ''}`}
            onClick={() => setActiveFilters(new Set(EVENT_CATEGORIES.map(c => c.id)))}>
            All
          </button>
          {EVENT_CATEGORIES.map(cat => (
            <button key={cat.id} className={`cal-filter-pill ${activeFilters.has(cat.id) ? 'active' : ''}`}
              onClick={() => toggleFilter(cat.id)}>
              <span className="cal-filter-dot" style={{ background: cat.color }} />
              {cat.label}
            </button>
          ))}
        </div>
        <div className="cal-filter-right">
          <div className="cal-toggle-group">
            <button className={`cal-toggle-btn ${showAllEvents ? 'active' : ''}`} onClick={() => setShowAllEvents(true)}>
              <span className="cal-toggle-dot" style={{ background: showAllEvents ? 'var(--text)' : 'transparent' }} />
              All events
            </button>
            <button className={`cal-toggle-btn ${!showAllEvents ? 'active' : ''}`} onClick={() => setShowAllEvents(false)}>
              Only mine
            </button>
          </div>
          <button className="cal-dropdown-btn">All creators <ChevronDown size={12} /></button>
          <button className="cal-dropdown-btn">All attendees <ChevronDown size={12} /></button>
          <button className="cal-dropdown-btn">All projects <ChevronDown size={12} /></button>
          <Search size={14} style={{ color: 'var(--text3)', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Controls bar */}
      <div className="cal-controls">
        <div className="cal-controls-left">
          <button className="cal-nav-btn" onClick={goToday}>Today</button>
          <button className="cal-nav-btn" onClick={prev}>Back</button>
          <button className="cal-nav-btn" onClick={next}>Next</button>
          <h2 className="cal-month-label">{monthLabel}</h2>
        </div>
        <div className="cal-controls-right">
          <div className="cal-view-toggle">
            {VIEWS.map(v => (
              <button key={v} className={`cal-view-btn ${activeView === v ? 'active' : ''}`}
                onClick={() => setActiveView(v)}>{v}</button>
            ))}
          </div>
          <button className="btn btn-ghost cal-absence-btn">Request absence</button>
          <button className="btn btn-primary cal-event-btn" onClick={() => setShowForm(true)}>
            <Plus size={16} /> Event
          </button>
        </div>
      </div>

      {/* Calendar + upcoming sidebar */}
      <div className="cal-grid-wrapper">
        <div className="cal-grid-section">
          {/* Icon row above calendar */}
          <div className="cal-icon-row">
            <span className="cal-icon-item" title="Calendar"><Calendar size={16} /></span>
            <span className="cal-icon-item" title="People">👤👥</span>
            <span className="cal-icon-item" title="Schedule"><Calendar size={16} /></span>
            <span className="cal-icon-item" title="Export"><Calendar size={16} /></span>
          </div>

          <div className="cal-grid">
            {DAYS.map((d) => <div key={d} className="cal-day-header">{d}</div>)}
            {calendarDays.map((cell, i) => (
              <div key={i} className={`cal-cell ${cell?.isToday ? 'cal-today' : ''} ${!cell ? 'cal-empty' : ''}`}>
                {cell && (
                  <>
                    <span className={`cal-day-num ${cell.isToday ? 'cal-today-num' : ''}`}>{cell.day}</span>
                    {cell.events.slice(0, 2).map((evt, j) => (
                      <div key={j} className="cal-event-inline" style={{ borderLeftColor: getCategoryColor(evt.category || 'meeting') }}>
                        {evt.title}
                      </div>
                    ))}
                    {cell.events.length > 2 && (
                      <div className="cal-event-more">+{cell.events.length - 2} more</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events sidebar */}
        <div className="cal-upcoming">
          <h4 className="cal-upcoming-title">Upcoming Events & Meetings</h4>
          {upcomingEvents.length === 0 ? (
            <p className="cal-upcoming-empty">No upcoming events</p>
          ) : (
            <div className="cal-upcoming-list">
              {upcomingEvents.map(evt => {
                const due = formatDueDate(evt.date, evt.startTime);
                return (
                  <div key={evt.id} className="cal-upcoming-item">
                    <div className="cal-upcoming-icon">
                      <Calendar size={16} style={{ color: getCategoryColor(evt.category || 'meeting') }} />
                    </div>
                    <div className="cal-upcoming-info">
                      <div className="cal-upcoming-name">{evt.title}</div>
                      <div className="cal-upcoming-meta">
                        <span className="cal-upcoming-dot" style={{ background: getCategoryColor(evt.category || 'meeting') }} />
                        {due.text}
                        <span className="cal-upcoming-badge" style={{ color: due.color }}>{due.badge}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Event form modal */}
      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 420 }}>
            <div className="expense-form-header"><h3>New Event</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Title *</label><input value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="Event title" autoFocus /></div>
              <div className="expense-form-field"><label>Date</label><input type="date" value={fDate || todayStr} onChange={(e) => setFDate(e.target.value)} /></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>Start</label><input type="time" value={fStart} onChange={(e) => setFStart(e.target.value)} /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>End</label><input type="time" value={fEnd} onChange={(e) => setFEnd(e.target.value)} /></div>
              </div>
              <div className="expense-form-field">
                <label>Category</label>
                <select value={fCategory} onChange={(e) => setFCategory(e.target.value)}>
                  {EVENT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="expense-form-field"><label>Location</label><input value={fLoc} onChange={(e) => setFLoc(e.target.value)} placeholder="Where?" /></div>
              <div className="expense-form-field"><label>Description</label><textarea value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="Details..." rows={2} /></div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={!fTitle.trim()} style={{ background: 'var(--mod-office)', opacity: fTitle.trim() ? 1 : 0.4 }}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
