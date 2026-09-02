// ============================================================
// TSUZUKU — Dashboard: Pocket Japanese Teacher
// Minimal, focused, centered on daily rotating words.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Fire,
  BookOpen,
  SpeakerHigh,
  ArrowsCounterClockwise,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';
import { getDailyWordSet, getDailySetIndex, type DailyWord } from '@/data/dailyWords';
import { getLessonById } from '@/data/curriculum/lessons';

// ── Types ─────────────────────────────────────────────────
type DisplayMode = 'hiragana' | 'katakana' | 'romaji';

// ── Sound synthesis (Web Speech API) ─────────────────────
function speakJapanese(text: string) {
  if (!('speechSynthesis' in window)) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ja-JP';
  utt.rate = 0.85;
  utt.pitch = 1.05;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
}

// ── Word Card ─────────────────────────────────────────────
interface WordCardProps {
  word: DailyWord;
  mode: DisplayMode;
  showExample: boolean;
  onTap: () => void;
  index: number;
  total: number;
}

function WordCard({ word, mode, showExample, onTap, index, total }: WordCardProps) {
  const displayJP =
    mode === 'katakana' ? word.katakana :
    mode === 'romaji'   ? word.romaji   :
    word.japanese;

  const subDisplay =
    mode === 'hiragana' ? word.romaji :
    mode === 'katakana' ? word.romaji :
    word.japanese;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakJapanese(word.japanese);
  };

  return (
    <motion.div
      key={word.id}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onClick={onTap}
      className="cursor-pointer select-none w-full"
    >
      {/* Main word display */}
      <div
        className="rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, var(--color-base-700) 0%, var(--color-base-800) 100%)',
          border: '1px solid var(--color-base-500)',
          boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.04)',
          minHeight: 260,
        }}
      >
        {/* Decorative kanji background */}
        <div
          aria-hidden
          className="absolute -top-2 -right-4 font-jp pointer-events-none"
          style={{
            fontSize: '10rem',
            color: 'var(--color-vermillion-900)',
            opacity: 0.35,
            fontWeight: 900,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {word.japanese[0]}
        </div>

        {/* Category badge */}
        <div className="self-start badge badge-muted text-2xs uppercase tracking-wider font-bold z-10">
          {word.category}
        </div>

        {/* The word itself — dominant */}
        <div className="z-10 text-center space-y-2">
          <div
            className="font-jp font-black leading-none tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 12vw, 5.5rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            {displayJP}
          </div>
          <div
            className="font-mono tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)' }}
          >
            {subDisplay}
          </div>
        </div>

        {/* English meaning */}
        <div
          className="z-10 text-center font-bold"
          style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}
        >
          {word.english}
        </div>

        {/* Audio button */}
        <button
          onClick={handleSpeak}
          className="z-10 btn btn-ghost btn-sm gap-2"
          style={{ color: 'var(--color-indigo-300)' }}
          title="Hear pronunciation"
        >
          <SpeakerHigh size={18} weight="fill" />
          Listen
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 z-10 font-mono text-xs" style={{ color: 'var(--color-text-dim)' }}>
          {index + 1} / {total}
        </div>
      </div>

      {/* Example & tip — collapsible */}
      <AnimatePresence>
        {showExample && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl p-5 space-y-3" style={{ background: 'var(--color-base-800)', border: '1px solid var(--color-base-600)' }}>
              {/* Example sentence */}
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>Example</div>
                <div className="font-jp leading-relaxed" style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-jp-base)' }}>
                  {word.example.japanese}
                </div>
                <div className="text-sm leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>
                  {word.example.english}
                </div>
              </div>

              {/* Memory tip */}
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>Memory Tip</div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--color-gold-300)' }}>
                  💡 {word.tip}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Dot progress indicator ────────────────────────────────
function WordDots({ total, current, seen }: { total: number; current: number; seen: Set<number> }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 px-4 max-w-xs mx-auto" role="progressbar" aria-label={`Word ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="transition-all duration-200 rounded-full"
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            background:
              i === current ? 'var(--color-vermillion-500)' :
              seen.has(i)   ? 'var(--color-base-400)'       :
              'var(--color-base-600)',
          }}
        />
      ))}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────
export default function DashboardPage() {
  const profile = useUserStore(s => s.profile);
  const user = useUserStore(s => s.user);
  const progress = useProgressStore(s => s.progress);
  const navigate = useNavigate();

  // Daily word state
  const [dailyWords] = useState<DailyWord[]>(() => getDailyWordSet());
  const [wordIndex, setWordIndex] = useState(0);
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set([0]));
  const [displayMode, setDisplayMode] = useState<DisplayMode>('hiragana');
  const [showExample, setShowExample] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const dayIndex = getDailySetIndex();
  const currentWord = dailyWords[wordIndex];
  const seenCount = seenIndices.size;

  // Tab title
  useEffect(() => {
    document.title = 'TSUZUKU — Daily Practice';
  }, []);

  // Navigate words
  const goToWord = useCallback((newIndex: number) => {
    const wrapped = (newIndex + dailyWords.length) % dailyWords.length;
    setDirection(newIndex > wordIndex ? 'next' : 'prev');
    setShowExample(false);
    setWordIndex(wrapped);
    setSeenIndices(prev => new Set([...prev, wrapped]));
  }, [wordIndex, dailyWords.length]);

  const goNext = useCallback(() => goToWord(wordIndex + 1), [goToWord, wordIndex]);
  const goPrev = useCallback(() => goToWord(wordIndex - 1), [goToWord, wordIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'e') setShowExample(v => !v);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Continue lesson
  const currentLessonId = profile?.currentLessonId;
  const currentLesson = currentLessonId ? getLessonById(currentLessonId) : undefined;

  // Streak & XP
  const streak = progress?.streak ?? 0;
  const xp = profile?.xp ?? 0;
  const dueCards = useProgressStore(s => s.dueCardCount());

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[dayIndex];

  const displayModes: DisplayMode[] = ['hiragana', 'katakana', 'romaji'];
  const modeLabels: Record<DisplayMode, string> = { hiragana: 'ひ', katakana: 'カ', romaji: 'Aa' };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-base-900)' }}>

      {/* ══════════════════════════════════════════════════
          TOP STRIP — compact, one row
      ══════════════════════════════════════════════════ */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: '1px solid var(--color-base-700)' }}
      >
        {/* Greeting + level */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
            {user?.displayName ?? 'Learner'}
          </div>
          <span className="badge badge-vermillion text-2xs font-bold tracking-wide">
            {profile?.currentLevel ?? 'N5'}
          </span>
        </div>

        {/* Streak + XP */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {streak > 0 && (
            <div className="flex items-center gap-1 font-bold text-sm" style={{ color: 'var(--color-gold-400)' }}>
              <Fire size={16} weight="fill" />
              {streak}
            </div>
          )}
          <div className="font-mono text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            {xp.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT — scrollable
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-10">

          {/* ── DAILY WORD SECTION HEADER ── */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
                  {todayName}'s Words
                </div>
                <h2 className="text-xl font-black" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                  Daily Japanese
                </h2>
              </div>

              {/* Seen count */}
              <div className="text-right">
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Seen today</div>
                <div className="font-bold font-mono text-lg" style={{ color: seenCount >= dailyWords.length ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                  {seenCount}/{dailyWords.length}
                </div>
              </div>
            </div>

            {/* Mini progress bar */}
            <div className="progress-track h-1">
              <div className="progress-fill" style={{ width: `${(seenCount / dailyWords.length) * 100}%` }} />
            </div>
          </div>

          {/* ── DISPLAY MODE TOGGLES ── */}
          <div className="flex items-center justify-center gap-2">
            {displayModes.map(m => (
              <button
                key={m}
                onClick={() => setDisplayMode(m)}
                className="btn btn-sm font-bold"
                style={
                  displayMode === m
                    ? { background: 'var(--color-vermillion-500)', color: '#fff', borderColor: 'var(--color-vermillion-500)' }
                    : { background: 'var(--color-base-700)', color: 'var(--color-text-muted)', borderColor: 'var(--color-base-500)' }
                }
                title={`Show in ${m}`}
              >
                {modeLabels[m]}
              </button>
            ))}

            <div style={{ flex: 1 }} />

            {/* Example toggle */}
            <button
              onClick={() => setShowExample(v => !v)}
              className="btn btn-ghost btn-sm gap-1.5 text-xs"
              style={{ color: showExample ? 'var(--color-gold-400)' : 'var(--color-text-dim)' }}
            >
              {showExample ? <Eye size={14} /> : <EyeSlash size={14} />}
              {showExample ? 'Hide' : 'Example'}
            </button>
          </div>

          {/* ── THE WORD CARD — MAIN HERO ── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <WordCard
                key={currentWord.id + displayMode}
                word={currentWord}
                mode={displayMode}
                showExample={showExample}
                onTap={goNext}
                index={wordIndex}
                total={dailyWords.length}
              />
            </AnimatePresence>
          </div>

          {/* ── DOT INDICATOR ── */}
          <WordDots total={dailyWords.length} current={wordIndex} seen={seenIndices} />

          {/* ── WORD NAVIGATION ── */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              className="btn btn-secondary flex-1"
              id="btn-prev-word"
            >
              ← Prev
            </button>

            <button
              onClick={goNext}
              className="btn btn-primary flex-1 gap-2"
              id="btn-next-word"
            >
              Next →
            </button>
          </div>

          {/* ── SHUFFLE ── */}
          <button
            onClick={() => goToWord(Math.floor(Math.random() * dailyWords.length))}
            className="btn btn-ghost btn-sm gap-2 w-full"
            style={{ color: 'var(--color-text-dim)' }}
          >
            <ArrowsCounterClockwise size={14} />
            Random word
          </button>

          {/* ── DIVIDER ── */}
          <div style={{ height: 1, background: 'var(--color-base-700)' }} />

          {/* ── CONTINUE LESSON CTA ── */}
          {currentLesson ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to={`/lesson/${currentLesson.id}`}
                id="btn-continue-lesson"
                className="block rounded-xl p-5 no-underline"
                style={{
                  background: 'linear-gradient(135deg, rgba(194, 51, 77, 0.18), rgba(194, 51, 77, 0.04))',
                  border: '1px solid rgba(194, 51, 77, 0.4)',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(194, 51, 77, 0.7)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(194, 51, 77, 0.4)')}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--color-vermillion-400)' }}>
                      Continue Lesson
                    </div>
                    <div className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                      {currentLesson.title}
                    </div>
                    {currentLesson.titleJP && (
                      <div className="font-jp text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {currentLesson.titleJP}
                      </div>
                    )}
                    <div className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
                      ~{currentLesson.estimatedMinutes} min · {currentLesson.steps.length} steps
                    </div>
                  </div>
                  <ArrowRight size={22} weight="bold" style={{ color: 'var(--color-vermillion-400)', flexShrink: 0 }} />
                </div>
              </Link>
            </motion.div>
          ) : (
            <Link
              to="/learn"
              id="btn-start-learning"
              className="btn btn-primary w-full gap-2"
            >
              <BookOpen size={18} />
              Start Learning
            </Link>
          )}

          {/* ── REVIEW DUE badge (only if cards are due) ── */}
          {dueCards > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/review"
                id="btn-start-review"
                className="btn btn-secondary w-full gap-2"
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                  style={{ background: 'var(--color-vermillion-500)', color: '#fff' }}
                >
                  {dueCards}
                </span>
                Reviews Due
              </Link>
            </motion.div>
          )}

          {/* ── KEYBOARD HINT (only on wide screens) ── */}
          <div className="hidden sm:flex items-center justify-center gap-4 text-xs" style={{ color: 'var(--color-text-dim)' }}>
            <span>← → navigate</span>
            <span>·</span>
            <span>Space = next</span>
            <span>·</span>
            <span>E = example</span>
          </div>

        </div>
      </div>
    </div>
  );
}
