import { Session } from './types';

// All persistence lives here. Everything stays on the device (localStorage) —
// no server, no account, no tracking. Private by design.

const SESSIONS_KEY = 'rega.sessions.v1';
const THEME_KEY = 'rega.theme';

export function loadSessions(): Session[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Session[];
    if (!Array.isArray(parsed)) return [];
    // newest first
    return parsed.sort((a, b) => b.date - a.date);
  } catch {
    return [];
  }
}

export function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;
  try {
    const all = loadSessions();
    const without = all.filter((s) => s.id !== session.id);
    localStorage.setItem(
      SESSIONS_KEY,
      JSON.stringify([session, ...without]),
    );
  } catch {
    /* storage full / blocked — non-fatal */
  }
}

export function deleteSession(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = loadSessions().filter((s) => s.id !== id);
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(all));
  } catch {
    /* non-fatal */
  }
}

export function clearSessions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SESSIONS_KEY);
  } catch {
    /* non-fatal */
  }
}

export function newId(): string {
  // No Date.now()/Math.random() concerns here — this is runtime app code.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---- Theme ----
export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* non-fatal */
  }
}
