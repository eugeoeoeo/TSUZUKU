// ============================================================
// TSUZUKU — Progress Store (Zustand)
// Manages SRS cards, lesson progress, and review sessions
// ============================================================

import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import { createSRSCard, scheduleReview, getDueCards, getMasteryBreakdown } from '@/lib/srs';
import type { SRSCard, ReviewAttempt, UserProgress, DailyActivity } from '@/types/user.types';

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getDefaultProgress(userId: string): UserProgress {
  return {
    userId,
    lessonsCompleted: [],
    unitsCompleted: [],
    streak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalReviews: 0,
    correctReviews: 0,
    dailyActivity: [],
    achievements: [],
  };
}

interface ProgressStore {
  progress: UserProgress | null;
  srsCards: SRSCard[];
  lessonProgress: Record<string, number>; // lessonId -> completed step index
  todayActivity: DailyActivity | null;
  isLoaded: boolean;

  // Computed
  dueCardCount: () => number;
  masteryBreakdown: () => Record<string, number>;

  // Actions
  initProgress: (userId: string) => void;
  addSRSCard: (card: SRSCard) => void;
  addSRSCards: (cards: SRSCard[]) => void;
  reviewCard: (cardId: string, confidence: 1 | 2 | 3 | 4) => ReviewAttempt | null;
  completeLesson: (lessonId: string) => void;
  setLessonStep: (lessonId: string, stepIndex: number) => void;
  getLessonStep: (lessonId: string) => number;
  updateStreak: () => void;
  addDailyActivity: (minutes: number, xp: number, newItems: number) => void;
  ensureItemHasCard: (userId: string, itemId: string, itemType: SRSCard['itemType']) => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: null,
  srsCards: [],
  lessonProgress: {},
  todayActivity: null,
  isLoaded: false,

  dueCardCount: () => getDueCards(get().srsCards).length,

  masteryBreakdown: () => {
    const breakdown = getMasteryBreakdown(get().srsCards);
    return breakdown;
  },

  initProgress: (userId: string) => {
    let progress = storage.get<UserProgress>(STORAGE_KEYS.PROGRESS);
    if (!progress) {
      progress = getDefaultProgress(userId);
      storage.set(STORAGE_KEYS.PROGRESS, progress);
    }

    const srsCards = storage.get<SRSCard[]>(STORAGE_KEYS.SRS_CARDS) ?? [];
    const lessonProgress = storage.get<Record<string, number>>(STORAGE_KEYS.LESSON_PROGRESS) ?? {};
    const todayKey = getTodayKey();
    const todayActivity = progress.dailyActivity.find(d => d.date === todayKey) ?? null;

    set({ progress, srsCards, lessonProgress, todayActivity, isLoaded: true });
  },

  addSRSCard: (card) => {
    const cards = [...get().srsCards, card];
    storage.set(STORAGE_KEYS.SRS_CARDS, cards);
    set({ srsCards: cards });
  },

  addSRSCards: (newCards) => {
    const existing = get().srsCards;
    const existingIds = new Set(existing.map(c => c.id));
    const toAdd = newCards.filter(c => !existingIds.has(c.id));
    const cards = [...existing, ...toAdd];
    storage.set(STORAGE_KEYS.SRS_CARDS, cards);
    set({ srsCards: cards });
  },

  reviewCard: (cardId, confidence) => {
    const { srsCards, progress } = get();
    const cardIndex = srsCards.findIndex(c => c.id === cardId);
    if (cardIndex === -1 || !progress) return null;

    const card = srsCards[cardIndex];
    const updatedCard = scheduleReview(card, confidence);
    const isCorrect = confidence >= 3;

    const attempt: ReviewAttempt = {
      cardId: card.id,
      itemId: card.itemId,
      itemType: card.itemType,
      exerciseType: 'srs',
      userAnswer: '',
      correctAnswer: '',
      isCorrect,
      confidence,
      responseTimeMs: 0,
      timestamp: new Date().toISOString(),
    };

    const updatedCards = [...srsCards];
    updatedCards[cardIndex] = updatedCard;
    storage.set(STORAGE_KEYS.SRS_CARDS, updatedCards);

    const updatedProgress: UserProgress = {
      ...progress,
      totalReviews: progress.totalReviews + 1,
      correctReviews: progress.correctReviews + (isCorrect ? 1 : 0),
    };
    storage.set(STORAGE_KEYS.PROGRESS, updatedProgress);

    set({ srsCards: updatedCards, progress: updatedProgress });
    return attempt;
  },

  completeLesson: (lessonId) => {
    const { progress } = get();
    if (!progress) return;
    if (progress.lessonsCompleted.includes(lessonId)) return;

    const updated: UserProgress = {
      ...progress,
      lessonsCompleted: [...progress.lessonsCompleted, lessonId],
    };
    storage.set(STORAGE_KEYS.PROGRESS, updated);
    set({ progress: updated });
  },

  setLessonStep: (lessonId, stepIndex) => {
    const lessonProgress = { ...get().lessonProgress, [lessonId]: stepIndex };
    storage.set(STORAGE_KEYS.LESSON_PROGRESS, lessonProgress);
    set({ lessonProgress });
  },

  getLessonStep: (lessonId) => {
    return get().lessonProgress[lessonId] ?? 0;
  },

  updateStreak: () => {
    const { progress } = get();
    if (!progress) return;

    const today = getTodayKey();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    let streak = progress.streak;
    if (progress.lastActiveDate === today) {
      // Already studied today, no change
      return;
    } else if (progress.lastActiveDate === yesterdayKey) {
      // Consecutive day
      streak = streak + 1;
    } else {
      // Streak broken
      streak = 1;
    }

    const updated: UserProgress = {
      ...progress,
      streak,
      longestStreak: Math.max(progress.longestStreak, streak),
      lastActiveDate: today,
    };
    storage.set(STORAGE_KEYS.PROGRESS, updated);
    set({ progress: updated });
  },

  addDailyActivity: (minutes, xp, newItems) => {
    const { progress } = get();
    if (!progress) return;

    const today = getTodayKey();
    const existingIndex = progress.dailyActivity.findIndex(d => d.date === today);

    let updatedActivity: DailyActivity[];
    if (existingIndex >= 0) {
      const existing = progress.dailyActivity[existingIndex];
      const updated: DailyActivity = {
        ...existing,
        minutesStudied: existing.minutesStudied + minutes,
        xpEarned: existing.xpEarned + xp,
        newItemsLearned: existing.newItemsLearned + newItems,
      };
      updatedActivity = [...progress.dailyActivity];
      updatedActivity[existingIndex] = updated;
      set({ todayActivity: updated });
    } else {
      const today_activity: DailyActivity = {
        date: today,
        minutesStudied: minutes,
        lessonsCompleted: 0,
        reviewsDone: 0,
        newItemsLearned: newItems,
        xpEarned: xp,
      };
      updatedActivity = [...progress.dailyActivity, today_activity];
      set({ todayActivity: today_activity });
    }

    const updated: UserProgress = { ...progress, dailyActivity: updatedActivity };
    storage.set(STORAGE_KEYS.PROGRESS, updated);
    set({ progress: updated });
  },

  ensureItemHasCard: (userId, itemId, itemType) => {
    const { srsCards } = get();
    const exists = srsCards.some(c => c.itemId === itemId && c.itemType === itemType);
    if (!exists) {
      const card = createSRSCard({ userId, itemId, itemType });
      get().addSRSCard(card);
    }
  },
}));
