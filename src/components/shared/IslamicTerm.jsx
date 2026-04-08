import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getGlossaryEntry } from '../../data/islamic-glossary';
import './IslamicTerm.css';

const TOOLTIP_W = 252;
const GAP = 10;
const MIN_ABOVE = 180;

/**
 * IslamicTerm — wraps an Islamic/Arabic term with a hover tooltip definition.
 * Tooltip renders via portal to escape overflow:hidden ancestors.
 */
export default function IslamicTerm({ id, children }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: undefined, bottom: undefined, left: 0, flipped: false });
  const triggerRef = useRef(null);
  const entry = getGlossaryEntry(id);

  if (!entry) return children ?? null;

  const show = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const flipped = r.top < MIN_ABOVE;
    const top = flipped ? r.bottom + GAP : undefined;
    const bottom = flipped ? undefined : window.innerHeight - r.top + GAP;
    let left = r.left + r.width / 2 - TOOLTIP_W / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8));
    setPos({ top, bottom, left, flipped });
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  const tooltipId = `islamic-tooltip-${id}`;

  return (
    <span
      ref={triggerRef}
      className="islamic-term"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="note"
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children ?? entry.term}

      {visible && createPortal(
        <span
          id={tooltipId}
          className={`islamic-term__tooltip${pos.flipped ? ' islamic-term__tooltip--below' : ''}`}
          role="tooltip"
          style={{ top: pos.top, bottom: pos.bottom, left: pos.left }}
        >
          <span className="islamic-term__header">
            <span className="islamic-term__name">{entry.term}</span>
            {entry.arabic && (
              <span className="islamic-term__arabic">{entry.arabic}</span>
            )}
          </span>

          {entry.transliteration && (
            <span className="islamic-term__trans">{entry.transliteration}</span>
          )}

          <span className="islamic-term__meaning">{entry.meaning}</span>

          {entry.source && (
            <span className="islamic-term__source">{entry.source}</span>
          )}
        </span>,
        document.body
      )}
    </span>
  );
}
