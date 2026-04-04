import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Trash2, X } from 'lucide-react';
import { useOfficeStore } from '../../store/office-store';
import './CalendarView.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView() {
  const events = useOfficeStore((s) => s.events);
  const addEvent = useOfficeStore((s) => s.addEvent);
  const deleteEvent = useOfficeStore((s) => s.deleteEvent);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [fTitle, setFTitle] = useState('');
  const [fDate, setFDate] = useState('');
  const [fStart, setFStart] = useState('09:00');
  const [fEnd, setFEnd] = useState('10:00');
  const [fDesc, setFDesc] = useState('');
  const [fLoc, setFLoc] = useState('');

  const prev = () => { if (month === 0) { setMonth(11); setYear(year - 1); } else setMonth(month - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(year + 1); } else setMonth(month + 1); };

  const monthLabel = new Date(year, month).toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayEvents = events.filter((e) => e.date === dateStr);
      days.push({ day: d, date: dateStr, events: dayEvents, isToday: dateStr === todayStr });
    }
    return days;
  }, [year, month, events, firstDay, daysInMonth, todayStr]);

  const selectedEvents = useMemo(() =>
    selectedDate ? events.filter((e) => e.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime)) : [],
  [events, selectedDate]);

  const handleAdd = () => {
    if (!fTitle.trim()) return;
    addEvent({ title: fTitle, date: fDate || selectedDate || todayStr, startTime: fStart, endTime: fEnd, description: fDesc, location: fLoc });
    setShowForm(false); setFTitle(''); setFDesc(''); setFLoc('');
  };

  return (
    <div>
      {/* Month nav */}
      <div className="report-month-nav" style={{ marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-ghost" onClick={prev}><ChevronLeft size={16} /></button>
        <span className="report-month-label">{monthLabel}</span>
        <button className="btn btn-ghost" onClick={next}><ChevronRight size={16} /></button>
      </div>

      <div className="cal-grid-wrapper">
        {/* Calendar grid */}
        <div className="cal-grid">
          {DAYS.map((d) => <div key={d} className="cal-day-header">{d}</div>)}
          {calendarDays.map((cell, i) => (
            <div key={i} className={`cal-cell ${cell?.isToday ? 'cal-today' : ''} ${cell?.date === selectedDate ? 'cal-selected' : ''} ${!cell ? 'cal-empty' : ''}`}
              onClick={() => cell && setSelectedDate(cell.date)}>
              {cell && (
                <>
                  <span className="cal-day-num">{cell.day}</span>
                  {cell.events.length > 0 && (
                    <div className="cal-event-dots">
                      {cell.events.slice(0, 3).map((e, j) => <div key={j} className="cal-event-dot" />)}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Selected date panel */}
        {selectedDate && (
          <div className="cal-day-panel">
            <div className="cal-day-panel-header">
              <span>{new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <button className="btn btn-ghost" onClick={() => { setFDate(selectedDate); setShowForm(true); }} style={{ fontSize: '0.8rem' }}>
                <Plus size={14} /> Add Event
              </button>
            </div>
            {selectedEvents.length === 0 ? (
              <p style={{ color: 'var(--text3)', fontSize: '0.85rem', padding: 'var(--space-4)' }}>No events this day.</p>
            ) : (
              <div className="cal-events-list">
                {selectedEvents.map((evt) => (
                  <div key={evt.id} className="cal-event-card">
                    <div className="cal-event-time"><Clock size={12} /> {evt.startTime} — {evt.endTime}</div>
                    <div className="cal-event-title">{evt.title}</div>
                    {evt.location && <div className="cal-event-loc"><MapPin size={12} /> {evt.location}</div>}
                    {evt.description && <div className="cal-event-desc">{evt.description}</div>}
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteEvent(evt.id); }} style={{ alignSelf: 'flex-end', marginTop: 'var(--space-1)' }}><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event form modal */}
      {showForm && (
        <div className="expense-form-overlay">
          <div className="expense-form-modal" style={{ maxWidth: 420 }}>
            <div className="expense-form-header"><h3>New Event</h3><button className="expense-form-close" onClick={() => setShowForm(false)}><X size={18} /></button></div>
            <div className="expense-form-body">
              <div className="expense-form-field"><label>Title *</label><input value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="Event title" autoFocus /></div>
              <div className="expense-form-field"><label>Date</label><input type="date" value={fDate || selectedDate || todayStr} onChange={(e) => setFDate(e.target.value)} /></div>
              <div className="expense-form-row">
                <div className="expense-form-field" style={{ flex: 1 }}><label>Start</label><input type="time" value={fStart} onChange={(e) => setFStart(e.target.value)} /></div>
                <div className="expense-form-field" style={{ flex: 1 }}><label>End</label><input type="time" value={fEnd} onChange={(e) => setFEnd(e.target.value)} /></div>
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
