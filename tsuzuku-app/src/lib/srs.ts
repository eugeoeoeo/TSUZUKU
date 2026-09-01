// ============================================================
// TSUZUKU — SRS Engine (ts-fsrs wrapper)
// Based on the FSRS algorithm — much more accurate than SM-2
// ============================================================

import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';
import type { SRSCard, MasteryLevel, ReviewAttempt } from '@/types/user.types';

// Map our confidence (1-4) to FSRS Rating
export function confidenceToRating(confidence: 1 | 2 | 3 | 4): Grade {
  const map: Record<number, Grade> = {
    1: Rating.Again,
    2: Rating.Hard,
    3: Rating.Good,
    4: Rating.Easy,
  };
  return map[confidence];
}

// Map FSRS State to our MasteryLevel
function stateToMastery(state: State, reps: number, stability: number): MasteryLevel {
  if (state === State.New) return 'new';
  if (state === State.Learning || state === State.Relearning) return 'learning';
  if (reps < 3 || stability < 7) return 'familiar';
  if (stability >= 30) return 'retained';
  return 'mastered';
}

// Initialize FSRS with sensible defaults
const params = generatorParameters({
  enable_fuzz: true,
  enable_short_term: true,
  maximum_interval: 365,
  request_retention: 0.9, // 90% target retention
});

const f = fsrs(params);

// ============================================================
// Schedule a review
// Returns the updated SRSCard after applying the given confidence rating
// ============================================================
export function scheduleReview(
  card: SRSCard,
  confidence: 1 | 2 | 3 | 4,
  reviewTime: Date = new Date()
): SRSCard {
  const fsrsCard: Card = {
    due: new Date(card.nextReview),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsedDays,
    scheduled_days: card.scheduledDays,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as State,
    last_review: card.lastReview ? new Date(card.lastReview) : undefined,
    learning_steps: 0,
  };

  const grade = confidenceToRating(confidence);
  const { card: updatedCard } = f.next(fsrsCard, reviewTime, grade);

  return {
    ...card,
    stability: updatedCard.stability,
    difficulty: updatedCard.difficulty,
    elapsedDays: updatedCard.elapsed_days,
    scheduledDays: updatedCard.scheduled_days,
    reps: updatedCard.reps,
    lapses: updatedCard.lapses,
    state: updatedCard.state as 0 | 1 | 2 | 3,
    lastReview: reviewTime.toISOString(),
    nextReview: updatedCard.due.toISOString(),
    masteryLevel: stateToMastery(updatedCard.state, updatedCard.reps, updatedCard.stability),
    updatedAt: reviewTime.toISOString(),
  };
}

// ============================================================
// Create a new SRS card for an item
// ============================================================
export function createSRSCard(params: {
  userId: string;
  itemId: string;
  itemType: SRSCard['itemType'];
}): SRSCard {
  const fsrsCard = createEmptyCard(new Date());
  const now = new Date().toISOString();

  return {
    id: `${params.userId}_${params.itemType}_${params.itemId}_${Date.now()}`,
    userId: params.userId,
    itemId: params.itemId,
    itemType: params.itemType,
    stability: fsrsCard.stability,
    difficulty: fsrsCard.difficulty,
    elapsedDays: fsrsCard.elapsed_days,
    scheduledDays: fsrsCard.scheduled_days,
    reps: fsrsCard.reps,
    lapses: fsrsCard.lapses,
    state: fsrsCard.state as 0 | 1 | 2 | 3,
    masteryLevel: 'new',
    lastReview: null,
    nextReview: fsrsCard.due.toISOString(),
    recognitionScore: 0,
    recallScore: 0,
    productionScore: 0,
    listeningScore: 0,
    errorTypes: [],
    createdAt: now,
    updatedAt: now,
  };
}

// ============================================================
// Get cards due for review
// ============================================================
export function getDueCards(cards: SRSCard[], limit = 50): SRSCard[] {
  const now = new Date();
  return cards
    .filter(card => new Date(card.nextReview) <= now)
    .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())
    .slice(0, limit);
}

// ============================================================
// Get new cards not yet introduced
// ============================================================
export function getNewCards(cards: SRSCard[], limit = 20): SRSCard[] {
  return cards
    .filter(card => card.state === State.New)
    .slice(0, limit);
}

// ============================================================
// Calculate retention rate from recent reviews
// ============================================================
export function calculateRetentionRate(attempts: ReviewAttempt[]): number {
  if (attempts.length === 0) return 0;
  const correct = attempts.filter(a => a.isCorrect).length;
  return Math.round((correct / attempts.length) * 100);
}

// ============================================================
// Get upcoming review counts
// ============================================================
export function getUpcomingReviewCounts(cards: SRSCard[]): {
  dueNow: number;
  dueToday: number;
  dueTomorrow: number;
  dueThisWeek: number;
} {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return {
    dueNow: cards.filter(c => new Date(c.nextReview) <= now).length,
    dueToday: cards.filter(c => new Date(c.nextReview) <= endOfDay).length,
    dueTomorrow: cards.filter(c => new Date(c.nextReview) <= tomorrow).length,
    dueThisWeek: cards.filter(c => new Date(c.nextReview) <= nextWeek).length,
  };
}

// ============================================================
// Calculate mastery breakdown
// ============================================================
export function getMasteryBreakdown(cards: SRSCard[]): Record<MasteryLevel, number> {
  const breakdown: Record<MasteryLevel, number> = {
    new: 0,
    learning: 0,
    familiar: 0,
    mastered: 0,
    retained: 0,
  };
  for (const card of cards) {
    breakdown[card.masteryLevel]++;
  }
  return breakdown;
}

// ============================================================
// Update score tracking (recognition/recall/production/listening)
// ============================================================
export function updateSRSCardScore(
  card: SRSCard,
  scoreType: 'recognition' | 'recall' | 'production' | 'listening',
  isCorrect: boolean
): SRSCard {
  const fieldMap = {
    recognition: 'recognitionScore',
    recall: 'recallScore',
    production: 'productionScore',
    listening: 'listeningScore',
  } as const;

  const field = fieldMap[scoreType];
  const currentScore = card[field];

  // Rolling weighted average — recent results weigh more
  const newScore = Math.round(currentScore * 0.7 + (isCorrect ? 100 : 0) * 0.3);

  return {
    ...card,
    [field]: newScore,
    updatedAt: new Date().toISOString(),
  };
}
