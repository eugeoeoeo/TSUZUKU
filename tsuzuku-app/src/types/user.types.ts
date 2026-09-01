// ============================================================
// TSUZUKU — User & Progress Type Definitions
// ============================================================

import type { JLPTLevel } from './curriculum.types';

// ============================================================
// User
// ============================================================

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: string;
  isGuest: boolean;        // true when using local-only mode
}

export interface UserProfile {
  userId: string;
  currentLevel: JLPTLevel;
  currentUnitId: string;
  currentLessonId: string;
  goals: LearningGoal[];
  dailyGoalMinutes: number;
  xp: number;
  totalStudyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export type LearningGoal =
  | 'general'
  | 'jlpt'
  | 'travel'
  | 'media'
  | 'work'
  | 'study'
  | 'living'
  | 'conversation'
  | 'reading'
  | 'personal';

export interface UserSettings {
  userId: string;
  furiganaMode: FuriganaMode;
  translationMode: TranslationMode;
  soundEnabled: boolean;
  ambientSoundEnabled: boolean;
  reducedMotion: boolean;
  dailyGoalMinutes: number;
  maxDailyReviews: number;
  showRomaji: boolean;
  uiLanguage: 'en' | 'jp-mix';
  theme: 'dark' | 'system';
}

export type FuriganaMode = 'always' | 'hover' | 'click' | 'never';
export type TranslationMode = 'always' | 'reveal' | 'never';

// ============================================================
// Progress Tracking
// ============================================================

export interface UserProgress {
  userId: string;
  lessonsCompleted: string[];    // lesson IDs
  unitsCompleted: string[];      // unit IDs
  streak: number;
  longestStreak: number;
  lastActiveDate: string;        // ISO date string
  totalReviews: number;
  correctReviews: number;
  dailyActivity: DailyActivity[];
  achievements: string[];        // achievement IDs
}

export interface DailyActivity {
  date: string;                  // YYYY-MM-DD
  minutesStudied: number;
  lessonsCompleted: number;
  reviewsDone: number;
  newItemsLearned: number;
  xpEarned: number;
}

// ============================================================
// SRS (Spaced Repetition System)
// ============================================================

export type SRSItemType = 'vocabulary' | 'kanji' | 'kana' | 'grammar' | 'sentence';

export type MasteryLevel = 'new' | 'learning' | 'familiar' | 'mastered' | 'retained';

export interface SRSCard {
  id: string;
  userId: string;
  itemId: string;
  itemType: SRSItemType;
  // FSRS fields
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3;  // New=0, Learning=1, Review=2, Relearning=3
  // Our fields
  masteryLevel: MasteryLevel;
  lastReview: string | null;    // ISO datetime
  nextReview: string;           // ISO datetime
  // Tracking
  recognitionScore: number;     // 0-100
  recallScore: number;
  productionScore: number;
  listeningScore: number;
  // Error tracking
  errorTypes: ErrorType[];
  createdAt: string;
  updatedAt: string;
}

export type ErrorType =
  | 'wrong_reading'
  | 'wrong_meaning'
  | 'wrong_particle'
  | 'wrong_conjugation'
  | 'wrong_kanji'
  | 'wrong_word_order'
  | 'vocabulary_confusion'
  | 'grammar_confusion'
  | 'spelling'
  | 'listening_error';

// ============================================================
// Review Sessions
// ============================================================

export interface ReviewSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  itemsReviewed: ReviewAttempt[];
  sessionType: 'srs' | 'lesson' | 'quick' | 'custom';
  targetLevel?: JLPTLevel;
}

export interface ReviewAttempt {
  cardId: string;
  itemId: string;
  itemType: SRSItemType;
  exerciseType: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  confidence: 1 | 2 | 3 | 4;  // Again=1, Hard=2, Good=3, Easy=4
  responseTimeMs: number;
  errorTypes?: ErrorType[];
  timestamp: string;
}

// ============================================================
// Learning Sessions
// ============================================================

export interface LearningSession {
  id: string;
  userId: string;
  lessonId?: string;
  reviewSessionId?: string;
  startTime: string;
  endTime?: string;
  minutesStudied: number;
  xpEarned: number;
  itemsLearned: number;
  reviewsCompleted: number;
  correctRate: number;
  sessionType: 'lesson' | 'review' | 'exploration';
}

// ============================================================
// Placement Test
// ============================================================

export interface PlacementTest {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  questions: PlacementQuestion[];
  answers: PlacementAnswer[];
  result?: PlacementResult;
}

export interface PlacementQuestion {
  id: string;
  type: 'kana' | 'vocabulary' | 'grammar' | 'kanji' | 'reading';
  difficulty: JLPTLevel;
  question: string;
  options: string[];
  answer: string;
  targetConceptId?: string;
}

export interface PlacementAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  responseTimeMs: number;
}

export interface PlacementResult {
  estimatedLevel: JLPTLevel;
  kanaScore: number;
  vocabularyScore: number;
  grammarScore: number;
  kanjiScore: number;
  recommendedStartUnit: string;
  knownConcepts: string[];
  weakConcepts: string[];
}

// ============================================================
// Achievements
// ============================================================

export interface Achievement {
  id: string;
  title: string;
  titleJP: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'mastery' | 'activity' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt?: string;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  type: 'words_learned' | 'kanji_mastered' | 'streak_days' | 'reviews_done' |
        'lessons_completed' | 'level_reached' | 'study_minutes' | 'perfect_review';
  threshold: number;
  level?: JLPTLevel;
}

// ============================================================
// Onboarding
// ============================================================

export interface OnboardingState {
  step: 'welcome' | 'goals' | 'experience' | 'time' | 'placement' | 'complete';
  goals: LearningGoal[];
  experienceLevel: 'zero' | 'beginner' | 'intermediate' | 'advanced';
  dailyMinutes: 5 | 10 | 15 | 30 | 45 | 60;
  placementCompleted: boolean;
  placementResult?: PlacementResult;
}
