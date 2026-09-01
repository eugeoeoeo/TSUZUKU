// ============================================================
// TSUZUKU — Device Storage Persistence
// 100% Offline-first local storage for user's phone / browser
// Zero server dependencies, private, instant & durable
// ============================================================

const PREFIX = 'tsuzuku_';

export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('[Storage] Failed to write:', key, e);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },

  clear(): void {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
  },

  // Export all application data to a JSON blob for easy phone backup
  exportAll(): string {
    const dump: Record<string, unknown> = {};
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
    keys.forEach(k => {
      try {
        const val = localStorage.getItem(k);
        if (val) dump[k.slice(PREFIX.length)] = JSON.parse(val);
      } catch {
        // ignore malformed keys
      }
    });
    return JSON.stringify(dump, null, 2);
  },

  // Restore application state from a JSON backup string
  importAll(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as Record<string, unknown>;
      if (typeof parsed !== 'object' || parsed === null) return false;
      Object.entries(parsed).forEach(([key, val]) => {
        localStorage.setItem(PREFIX + key, JSON.stringify(val));
      });
      return true;
    } catch {
      return false;
    }
  },

  // List all keys with prefix
  keys(): string[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .map(k => k.slice(PREFIX.length));
  },
};

// ============================================================
// STORAGE KEYS
// ============================================================
export const STORAGE_KEYS = {
  USER: 'user',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  PROGRESS: 'progress',
  SRS_CARDS: 'srs_cards',
  REVIEW_SESSIONS: 'review_sessions',
  LEARNING_SESSIONS: 'learning_sessions',
  DAILY_ACTIVITY: 'daily_activity',
  ACHIEVEMENTS: 'achievements',
  ONBOARDING: 'onboarding',
  LESSON_PROGRESS: 'lesson_progress',
  STREAK: 'streak',
} as const;
