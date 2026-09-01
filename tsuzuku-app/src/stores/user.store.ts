// ============================================================
// TSUZUKU — User Store (Zustand)
// Global state for current user, settings, and onboarding
// ============================================================

import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import type { User, UserProfile, UserSettings, OnboardingState } from '@/types/user.types';

const DEFAULT_SETTINGS: UserSettings = {
  userId: '',
  furiganaMode: 'hover',
  translationMode: 'reveal',
  soundEnabled: true,
  ambientSoundEnabled: false,
  reducedMotion: false,
  dailyGoalMinutes: 15,
  maxDailyReviews: 50,
  showRomaji: false,
  uiLanguage: 'en',
  theme: 'dark',
};

const DEFAULT_PROFILE: Omit<UserProfile, 'userId'> = {
  currentLevel: 'N5',
  currentUnitId: 'n5-hiragana',
  currentLessonId: 'n5-hiragana-01',
  goals: ['general'],
  dailyGoalMinutes: 15,
  xp: 0,
  totalStudyMinutes: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function generateGuestId(): string {
  return 'guest_' + Math.random().toString(36).slice(2, 11);
}

interface UserStore {
  user: User | null;
  profile: UserProfile | null;
  settings: UserSettings;
  onboarding: OnboardingState | null;
  isLoading: boolean;

  // Actions
  initUser: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  addXP: (amount: number) => void;
  completeOnboarding: (state: OnboardingState) => void;
  resetAll: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  profile: null,
  settings: DEFAULT_SETTINGS,
  onboarding: null,
  isLoading: true,

  initUser: () => {
    // Load or create guest user
    let user = storage.get<User>(STORAGE_KEYS.USER);
    if (!user) {
      const id = generateGuestId();
      user = {
        id,
        displayName: 'Learner',
        isGuest: true,
        createdAt: new Date().toISOString(),
      };
      storage.set(STORAGE_KEYS.USER, user);
    }

    let profile = storage.get<UserProfile>(STORAGE_KEYS.PROFILE);
    if (!profile) {
      profile = { userId: user.id, ...DEFAULT_PROFILE };
      storage.set(STORAGE_KEYS.PROFILE, profile);
    }

    let settings = storage.get<UserSettings>(STORAGE_KEYS.SETTINGS);
    if (!settings) {
      settings = { ...DEFAULT_SETTINGS, userId: user.id };
      storage.set(STORAGE_KEYS.SETTINGS, settings);
    }

    const onboarding = storage.get<OnboardingState>(STORAGE_KEYS.ONBOARDING);

    set({ user, profile, settings, onboarding, isLoading: false });
  },

  updateProfile: (updates) => {
    const { profile } = get();
    if (!profile) return;
    const updated = { ...profile, ...updates, updatedAt: new Date().toISOString() };
    storage.set(STORAGE_KEYS.PROFILE, updated);
    set({ profile: updated });
  },

  updateSettings: (updates) => {
    const { settings } = get();
    const updated = { ...settings, ...updates };
    storage.set(STORAGE_KEYS.SETTINGS, updated);
    set({ settings: updated });
  },

  addXP: (amount) => {
    const { profile } = get();
    if (!profile) return;
    const updated = { ...profile, xp: profile.xp + amount, updatedAt: new Date().toISOString() };
    storage.set(STORAGE_KEYS.PROFILE, updated);
    set({ profile: updated });
  },

  completeOnboarding: (state) => {
    storage.set(STORAGE_KEYS.ONBOARDING, state);
    const { profile } = get();
    if (profile && state.placementResult) {
      const updated = {
        ...profile,
        currentLevel: state.placementResult.estimatedLevel,
        goals: state.goals,
        dailyGoalMinutes: state.dailyMinutes,
        updatedAt: new Date().toISOString(),
      };
      storage.set(STORAGE_KEYS.PROFILE, updated);
      set({ onboarding: state, profile: updated });
    } else {
      set({ onboarding: state });
    }
  },

  resetAll: () => {
    storage.clear();
    set({
      user: null,
      profile: null,
      settings: DEFAULT_SETTINGS,
      onboarding: null,
      isLoading: true,
    });
  },
}));
