// Storage service — localStorage with bbiz_ prefix
// Mirrors bbos-v4 safeSet/safeGet pattern

const PREFIX = 'bbiz_';

export function safeSet(key, value) {
  try {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(PREFIX + key, v);
  } catch (e) {
    console.warn('[bbiz] storage write failed:', key, e);
  }
}

export function safeGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v !== null ? v : fallback;
  } catch {
    return fallback;
  }
}

export function safeGetJSON(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function safeRemove(key) {
  try { localStorage.removeItem(PREFIX + key); } catch {}
}

export function listKeys(prefix = '') {
  const full = PREFIX + prefix;
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(full)) keys.push(k.slice(PREFIX.length));
  }
  return keys;
}

export function exportAll() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX)) {
      try { data[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k)); }
      catch { data[k.slice(PREFIX.length)] = localStorage.getItem(k); }
    }
  }
  return data;
}

export function importAll(data) {
  for (const [key, val] of Object.entries(data)) {
    safeSet(key, val);
  }
}

export function clearAll() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}
