# Plan: Fix Islamic Term Tooltip Cutoff

## Context
The `IslamicTerm` tooltip component (already implemented and working) gets **clipped/cut off** by ancestor containers with `overflow: hidden`. The tooltip uses `position: absolute` inside a `position: relative` wrapper, so it's constrained by the nearest overflow-clipping ancestor. Multiple high-impact containers clip it:
- `.faith-core-card`, `.life-core-card`, `.intellect-core-card` — `overflow: hidden`
- `.faith-hero-card`, `.life-hero-card`, `.intellect-hero-card` — `overflow: hidden`
- `.app-shell` — `overflow: hidden` (root grid)

The fix: **React Portal** to render the tooltip at `<body>` level with `position: fixed` and dynamically calculated coordinates from the trigger element's bounding rect.

---

## Approach

### 1. `src/components/shared/IslamicTerm.jsx` (MODIFY)

**Changes:**
- Add `useRef` for the trigger `<span>` to get its bounding rect
- Add `useCallback` to calculate tooltip position on show
- Use `ReactDOM.createPortal()` to render the tooltip into `document.body`
- Position tooltip with `position: fixed; top/bottom; left` computed from `triggerRef.current.getBoundingClientRect()`
- Place tooltip **above** the term by default: use `bottom: window.innerHeight - rect.top + GAP`
- If tooltip would overflow viewport top (< ~180px room), flip to **below**: `top = rect.bottom + GAP`
- Clamp horizontal position to stay within viewport (min 8px from edges)

```jsx
import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function IslamicTerm({ id, children }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, flipped: false });
  const triggerRef = useRef(null);
  // ... entry lookup, fallback ...

  const TOOLTIP_W = 252;
  const GAP = 10;

  const show = useCallback(() => {
    const r = triggerRef.current.getBoundingClientRect();
    const flipped = r.top < 180;
    const top = flipped ? r.bottom + GAP : undefined;
    const bottom = flipped ? undefined : window.innerHeight - r.top + GAP;
    let left = r.left + r.width / 2 - TOOLTIP_W / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8));
    setPos({ top, bottom, left, flipped });
    setVisible(true);
  }, []);

  // Render tooltip via createPortal(tooltip, document.body)
  // Style with position: fixed, top/bottom/left from pos state
}
```

### 2. `src/components/shared/IslamicTerm.css` (MODIFY)

**Changes:**
- Remove `position: relative` from `.islamic-term` (no longer needed)
- Change `.islamic-term__tooltip` from `position: absolute` → positioning handled inline via portal
- Remove `bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%)` — JS handles position
- Update animation keyframes to remove the `translateX(-50%)` transform (no longer centering via CSS)
- Add `.islamic-term__tooltip--below` modifier with **upward-pointing** caret arrow
- Update `::after`/`::before` for the `--below` variant

```css
.islamic-term {
  /* position: relative removed */
  display: inline;
  cursor: help;
  text-decoration: underline dotted var(--accent);
}

.islamic-term__tooltip {
  position: fixed;
  width: 252px;
  /* top/bottom/left set inline by JS */
  /* Keep: background, border, shadow, padding, z-index, flex layout */
}

/* Default caret: arrow pointing DOWN (tooltip above term) */
.islamic-term__tooltip::after { /* existing down-arrow */ }

/* Flipped caret: arrow pointing UP (tooltip below term) */
.islamic-term__tooltip--below::after {
  top: auto; bottom: 100%;
  border-bottom-color: var(--border2);
}
```

---

## Critical Files
- **MODIFY**: `src/components/shared/IslamicTerm.jsx`
- **MODIFY**: `src/components/shared/IslamicTerm.css`

No other files need changes — the portal escapes all ancestor overflow constraints.

---

## Verification
1. Dev server already running at http://localhost:5173
2. `/app/pillar/faith` → hover "Siyam" in core pillars card → tooltip fully visible, not clipped
3. Hover "Aqidah" in hero card → not clipped by `.faith-hero-card` overflow
4. Hover "Deen" near top of page → tooltip flips below if insufficient room above
5. Check `/app/pillar/life` and `/app/pillar/intellect` → same behavior
6. Tab to a term → tooltip appears at correct position (keyboard accessibility)
7. `preview_screenshot` to confirm visual appearance
