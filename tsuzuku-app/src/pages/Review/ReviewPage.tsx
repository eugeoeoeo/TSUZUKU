import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightning, ArrowRight, CheckCircle, SpeakerHigh, Trophy, Sparkle } from '@phosphor-icons/react';
import { useProgressStore } from '@/stores/progress.store';
import { useUserStore } from '@/stores/user.store';
import { getDueCards } from '@/lib/srs';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { n5Grammar } from '@/data/n5/grammar';
import { n5Kanji } from '@/data/n5/kanji';
import { AudioButton, JLPTBadge, PartOfSpeechBadge } from '@/components/japanese/JapaneseComponents';
import type { SRSCard, ReviewAttempt } from '@/types/user.types';

export default function ReviewPage() {
  const navigate = useNavigate();
  const user = useUserStore(s => s.user);
  const addXP = useUserStore(s => s.addXP);
  const { srsCards, reviewCard, addDailyActivity } = useProgressStore();

  // Due cards or cram deck
  const [deck, setDeck] = useState<SRSCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState<ReviewAttempt[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Initialize deck on mount
  useEffect(() => {
    let due = getDueCards(srsCards);
    if (due.length === 0 && srsCards.length > 0) {
      // Practice mode: use all cards
      due = [...srsCards].slice(0, 20);
    } else if (due.length === 0 && srsCards.length === 0) {
      // Seed sample starter cards from N5 vocab so user can review immediately
      const sampleVocabs = n5Vocabulary.slice(0, 8);
      const seedCards: SRSCard[] = sampleVocabs.map((v, i) => ({
        id: `seed_${v.id}`,
        userId: user?.id ?? 'guest',
        itemId: v.id,
        itemType: 'vocabulary',
        stability: 1,
        difficulty: 5,
        elapsedDays: 0,
        scheduledDays: 0,
        reps: 0,
        lapses: 0,
        state: 0,
        masteryLevel: 'new',
        lastReview: null,
        nextReview: new Date().toISOString(),
        recognitionScore: 0,
        recallScore: 0,
        productionScore: 0,
        listeningScore: 0,
        errorTypes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      due = seedCards;
    }

    setDeck(due);
    setCurrentIndex(0);
    setIsRevealed(false);
    setSessionAttempts([]);
    setIsSessionComplete(false);
  }, [srsCards, user?.id]);

  const currentCard = deck[currentIndex];

  // Resolve card item data
  const itemData = (() => {
    if (!currentCard) return null;
    if (currentCard.itemType === 'vocabulary') {
      return { type: 'vocabulary', data: n5Vocabulary.find(v => v.id === currentCard.itemId) ?? n5Vocabulary[0] };
    }
    if (currentCard.itemType === 'grammar') {
      return { type: 'grammar', data: n5Grammar.find(g => g.id === currentCard.itemId) ?? n5Grammar[0] };
    }
    if (currentCard.itemType === 'kanji') {
      return { type: 'kanji', data: n5Kanji.find(k => k.id === currentCard.itemId) ?? n5Kanji[0] };
    }
    return { type: 'vocabulary', data: n5Vocabulary[0] };
  })();

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleRate = useCallback((confidence: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    // Record SRS review
    const attempt = reviewCard(currentCard.id, confidence);
    if (attempt) {
      setSessionAttempts(prev => [...prev, attempt]);
    }

    if (currentIndex + 1 < deck.length) {
      setCurrentIndex(prev => prev + 1);
      setIsRevealed(false);
    } else {
      // Review session finished
      const xpEarned = deck.length * 10;
      addXP(xpEarned);
      addDailyActivity(Math.ceil(deck.length * 0.5), xpEarned, 0);
      setIsSessionComplete(true);
    }
  }, [currentCard, currentIndex, deck.length, reviewCard, addXP, addDailyActivity]);

  // Keyboard shortcut listener: Space to flip, 1-4 to rate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSessionComplete) return;

      if (e.code === 'Space' && !isRevealed) {
        e.preventDefault();
        handleReveal();
      } else if (isRevealed) {
        if (e.key === '1') { e.preventDefault(); handleRate(1); }
        if (e.key === '2') { e.preventDefault(); handleRate(2); }
        if (e.key === '3') { e.preventDefault(); handleRate(3); }
        if (e.key === '4') { e.preventDefault(); handleRate(4); }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, isSessionComplete, handleRate]);

  if (isSessionComplete) {
    const correctCount = sessionAttempts.filter(a => a.isCorrect).length;
    const accuracy = sessionAttempts.length > 0 ? Math.round((correctCount / sessionAttempts.length) * 100) : 100;
    const xp = sessionAttempts.length * 10;

    return (
      <div className="min-h-dvh flex items-center justify-center p-6" style={{ background: 'var(--color-base-900)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full p-8 text-center space-y-6"
        >
          <div
            className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-vermillion-500), var(--color-vermillion-700))',
              boxShadow: '0 0 30px rgba(194, 51, 77, 0.4)',
            }}
          >
            <Trophy size={40} weight="fill" style={{ color: '#fff' }} />
          </div>

          <div>
            <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Review Session Complete!
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Your memory stability has been updated using FSRS algorithms.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl" style={{ background: 'var(--color-base-700)' }}>
            <div>
              <div className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{sessionAttempts.length}</div>
              <div className="text-xs text-muted">Reviewed</div>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: 'var(--color-success)' }}>{accuracy}%</div>
              <div className="text-xs text-muted">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: 'var(--color-gold-400)' }}>+{xp}</div>
              <div className="text-xs text-muted">XP</div>
            </div>
          </div>

          <Link to="/dashboard" className="btn btn-primary btn-xl w-full">
            Back to Dashboard <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6" style={{ background: 'var(--color-base-900)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--color-text-muted)' }}>No items in review queue.</p>
          <Link to="/learn" className="btn btn-primary btn-sm mt-4">Browse lessons</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-base-900)' }}>
      {/* ── TOP BAR ── */}
      <header
        className="px-6 py-4 flex items-center justify-between border-b surface-blur"
        style={{ background: 'rgba(12, 12, 15, 0.9)', borderColor: 'var(--color-base-600)' }}
      >
        <Link
          to="/dashboard"
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--color-base-700)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X size={20} />
        </Link>

        {/* Progress counter */}
        <div className="flex items-center gap-2">
          <Lightning size={16} weight="fill" style={{ color: 'var(--color-vermillion-400)' }} />
          <span className="font-mono text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {currentIndex + 1} / {deck.length}
          </span>
        </div>

        <div className="badge badge-vermillion text-xs font-semibold">
          FSRS Spaced Repetition
        </div>
      </header>

      {/* ── REVIEW CARD ── */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard.id}_${currentIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full card p-8 text-center space-y-6"
            style={{
              background: 'var(--color-base-800)',
              borderColor: 'var(--color-base-500)',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Front Header */}
            <div className="flex items-center justify-center gap-2">
              <span className="badge badge-muted uppercase text-2xs tracking-widest">
                {itemData.type}
              </span>
            </div>

            {/* Vocabulary Card */}
            {itemData.type === 'vocabulary' && (() => {
              const vocab = itemData.data as import('@/types/curriculum.types').VocabularyItem;
              return (
                <div className="space-y-4">
                  <div className="font-jp-serif text-jp-4xl font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                    {vocab.japanese}
                  </div>

                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="font-jp text-jp-xl" style={{ color: 'var(--color-text-muted)' }}>
                        {vocab.kana}
                      </div>
                      <div className="text-2xl font-bold" style={{ color: 'var(--color-gold-400)' }}>
                        {vocab.english}
                      </div>
                      <div className="flex justify-center pt-2">
                        <AudioButton text={vocab.japanese} size={24} />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })()}

            {/* Grammar Card */}
            {itemData.type === 'grammar' && (() => {
              const grammar = itemData.data as import('@/types/curriculum.types').GrammarPoint;
              return (
                <div className="space-y-4">
                  <div className="font-jp-serif text-jp-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {grammar.name}
                  </div>

                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="font-semibold text-lg" style={{ color: 'var(--color-indigo-300)' }}>
                        {grammar.nameEN}
                      </div>
                      <div className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                        {grammar.meaning}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })()}

            {/* Kanji Card */}
            {itemData.type === 'kanji' && (() => {
              const kanji = itemData.data as import('@/types/curriculum.types').KanjiItem;
              return (
                <div className="space-y-4">
                  <div className="font-jp-serif text-jp-hero font-bold" style={{ color: 'var(--color-text-primary)', lineHeight: 1 }}>
                    {kanji.character}
                  </div>

                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="text-2xl font-bold" style={{ color: 'var(--color-gold-400)' }}>
                        {kanji.meanings.join(', ')}
                      </div>
                      <div className="flex justify-center gap-6 text-sm font-jp">
                        <div><span className="text-muted">On:</span> {kanji.onyomi.join(' · ')}</div>
                        <div><span className="text-muted">Kun:</span> {kanji.kunyomi.join(' · ')}</div>
                      </div>
                      {kanji.mnemonic && (
                        <div className="text-xs max-w-sm mx-auto italic" style={{ color: 'var(--color-text-muted)' }}>
                          "{kanji.mnemonic}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── BOTTOM ACTIONS ── */}
      <footer
        className="sticky bottom-0 z-30 px-6 py-4 border-t surface-blur"
        style={{
          background: 'rgba(12, 12, 15, 0.95)',
          borderColor: 'var(--color-base-600)',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-2xl mx-auto">
          {!isRevealed ? (
            <button
              onClick={handleReveal}
              id="btn-reveal-answer"
              className="btn btn-primary btn-xl w-full gap-2"
            >
              Show Answer <span className="text-xs opacity-60 font-mono">[Space]</span>
            </button>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleRate(1)}
                className="btn btn-secondary flex-col py-3 rounded-xl border border-red-900/40 hover:border-red-500/80"
                style={{ background: 'rgba(232, 64, 64, 0.1)' }}
              >
                <span className="text-xs font-bold text-red-400">1: Again</span>
                <span className="text-2xs text-muted">&lt; 1m</span>
              </button>

              <button
                onClick={() => handleRate(2)}
                className="btn btn-secondary flex-col py-3 rounded-xl border border-yellow-900/40 hover:border-yellow-500/80"
                style={{ background: 'rgba(201, 149, 42, 0.1)' }}
              >
                <span className="text-xs font-bold text-yellow-400">2: Hard</span>
                <span className="text-2xs text-muted">10m</span>
              </button>

              <button
                onClick={() => handleRate(3)}
                className="btn btn-secondary flex-col py-3 rounded-xl border border-emerald-900/40 hover:border-emerald-500/80"
                style={{ background: 'rgba(46, 168, 123, 0.1)' }}
              >
                <span className="text-xs font-bold text-emerald-400">3: Good</span>
                <span className="text-2xs text-muted">1d</span>
              </button>

              <button
                onClick={() => handleRate(4)}
                className="btn btn-secondary flex-col py-3 rounded-xl border border-blue-900/40 hover:border-blue-500/80"
                style={{ background: 'rgba(59, 143, 208, 0.1)' }}
              >
                <span className="text-xs font-bold text-blue-400">4: Easy</span>
                <span className="text-2xs text-muted">4d</span>
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
