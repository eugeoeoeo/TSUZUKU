// ============================================================
// TSUZUKU — Local Storage Persistence
// Handles all client-side data persistence
// Will be replaced by Supabase calls when credentials are added
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

  // List all keys with prefix
  keys(): string[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .map(k => k.slice(PREFIX.length));
  },
};

// ============================================================
// KEYS
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
  LESSON_PROGRESS: 'lesson_progress', // Map of lessonId -> step index
  STREAK: 'streak',
} as const;
