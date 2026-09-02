import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Trophy, CheckCircle, Sparkle, Star } from '@phosphor-icons/react';
import { getLessonById, getNextLesson } from '@/data/curriculum/lessons';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { n5Grammar } from '@/data/n5/grammar';
import { n5Kanji } from '@/data/n5/kanji';
import { getExerciseById } from '@/data/curriculum/exercises';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';
import { AudioButton, JLPTBadge, PartOfSpeechBadge } from '@/components/japanese/JapaneseComponents';
import { MultipleChoiceExercise } from '@/components/exercises/MultipleChoiceExercise';
import { JapaneseTypingExercise } from '@/components/exercises/JapaneseTypingExercise';
import { SentenceBuilderExercise } from '@/components/exercises/SentenceBuilderExercise';

// ── Lesson Complete Modal ─────────────────────────────────
interface CompletionModalProps {
  lessonTitle: string;
  xpEarned: number;
  nextLesson: ReturnType<typeof getNextLesson>;
  unitId: string;
  levelId: string;
  onNextLesson: () => void;
  onBackToUnit: () => void;
}

function CompletionModal({ lessonTitle, xpEarned, nextLesson, onNextLesson, onBackToUnit }: CompletionModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        className="w-full max-w-sm rounded-2xl p-8 space-y-6 text-center"
        style={{
          background: 'var(--color-base-800)',
          border: '1px solid var(--color-base-500)',
          boxShadow: 'var(--shadow-lg), 0 0 60px rgba(194, 51, 77, 0.2)',
        }}
      >
        {/* Trophy icon */}
        <div
          className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-vermillion-600), var(--color-vermillion-800))',
            boxShadow: '0 0 40px rgba(194, 51, 77, 0.45)',
          }}
        >
          <Trophy size={42} weight="fill" style={{ color: '#fff' }} />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <div className="font-jp text-base" style={{ color: 'var(--color-gold-400)' }}>お疲れ様でした！</div>
          <h2 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            Lesson Complete!
          </h2>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{lessonTitle}</div>
        </div>

        {/* XP badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-lg"
          style={{
            background: 'rgba(201, 149, 42, 0.15)',
            border: '1px solid rgba(201, 149, 42, 0.4)',
            color: 'var(--color-gold-400)',
          }}
        >
          <Star size={18} weight="fill" />
          +{xpEarned} XP Earned
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {nextLesson ? (
            <button
              onClick={onNextLesson}
              className="btn btn-primary btn-xl w-full gap-2"
              id="btn-next-lesson"
            >
              Next Lesson
              <ArrowRight size={20} weight="bold" />
            </button>
          ) : (
            <button
              onClick={onBackToUnit}
              className="btn btn-primary btn-xl w-full gap-2"
              id="btn-unit-complete"
            >
              Unit Complete! 🎉
              <ArrowRight size={20} weight="bold" />
            </button>
          )}
          <button
            onClick={onBackToUnit}
            className="btn btn-ghost w-full"
            id="btn-back-to-unit"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Back to Unit
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const user = useUserStore(s => s.user);
  const addXP = useUserStore(s => s.addXP);
  const updateProfile = useUserStore(s => s.updateProfile);
  const completeLesson = useProgressStore(s => s.completeLesson);
  const updateStreak = useProgressStore(s => s.updateStreak);
  const addDailyActivity = useProgressStore(s => s.addDailyActivity);
  const ensureItemHasCard = useProgressStore(s => s.ensureItemHasCard);

  // Find lesson — NO silent fallback to N5_LESSONS[0]
  const lesson = lessonId ? getLessonById(lessonId) : null;

  // Completion modal state
  const [showCompletion, setShowCompletion] = useState(false);
  const [xpEarned] = useState(50);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [exerciseResult, setExerciseResult] = useState<{ isCorrect: boolean } | null>(null);

  const steps = lesson?.steps ?? [];
  const currentStep = steps[currentStepIndex] ?? steps[0];
  const progressPct = steps.length > 0 ? Math.round(((currentStepIndex + 1) / steps.length) * 100) : 0;
  const isLastStep = steps.length > 0 && currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (!currentStep) return;
    // When step changes, determine if user can immediately proceed
    if (currentStep.type === 'exercise') {
      setCanProceed(false);
      setExerciseResult(null);
    } else {
      setCanProceed(true);
      setExerciseResult(null);
    }
  }, [currentStepIndex, currentStep?.type]);

  const handleNext = () => {
    if (!canProceed || !lesson) return;

    if (isLastStep) {
      // Award XP, mark lesson completed, update streak
      addXP(xpEarned);
      completeLesson(lesson.id);
      updateStreak();
      addDailyActivity(
        lesson.estimatedMinutes,
        xpEarned,
        (lesson.vocabularyIds?.length ?? 0) + (lesson.grammarIds?.length ?? 0) + (lesson.conceptIds?.length ?? 0)
      );

      // Update current lesson pointer to the next lesson
      const next = getNextLesson(lesson.id);
      if (next) {
        updateProfile({ currentLessonId: next.id });
      }

      // Create SRS cards for new items
      if (user?.id) {
        (lesson.conceptIds ?? []).forEach(cid => ensureItemHasCard(user.id, cid, 'kana'));
        (lesson.vocabularyIds ?? []).forEach(vid => ensureItemHasCard(user.id, vid, 'vocabulary'));
        (lesson.grammarIds ?? []).forEach(gid => ensureItemHasCard(user.id, gid, 'grammar'));
        (lesson.kanjiIds ?? []).forEach(kid => ensureItemHasCard(user.id, kid, 'kanji'));
      }

      // Show completion modal — never auto-navigate to dashboard
      setShowCompletion(true);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  // Derive unit path for back navigation
  const levelId = lesson?.unitId ? lesson.unitId.split('-')[0]?.toUpperCase() ?? 'N5' : 'N5';
  const unitPath = lesson ? `/learn/${levelId.toLowerCase()}/${lesson.unitId}` : '/learn';

  const nextLesson = lesson ? getNextLesson(lesson.id) : null;

  const handleGoNextLesson = () => {
    if (nextLesson) {
      setShowCompletion(false);
      setCurrentStepIndex(0);
      navigate(`/lesson/${nextLesson.id}`);
    }
  };

  const handleBackToUnit = () => {
    setShowCompletion(false);
    navigate(unitPath);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleExerciseAnswer = (isCorrect: boolean) => {
    setExerciseResult({ isCorrect });
    setCanProceed(true);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed && currentStep?.type !== 'exercise') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canProceed, currentStep?.type, currentStepIndex, lesson]);

  // If lesson not found, show helpful error
  if (!lesson || !currentStep) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="text-4xl">🔍</div>
        <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Lesson Not Found</div>
        <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Lesson ID: <code className="font-mono">{lessonId ?? '(none)'}</code>
        </div>
        <Link to="/learn" className="btn btn-primary">Back to Learn</Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-base-900)' }}>

      {/* ── COMPLETION MODAL ── */}
      <AnimatePresence>
        {showCompletion && (
          <CompletionModal
            lessonTitle={lesson.title}
            xpEarned={xpEarned}
            nextLesson={nextLesson ?? undefined}
            unitId={lesson.unitId}
            levelId={levelId}
            onNextLesson={handleGoNextLesson}
            onBackToUnit={handleBackToUnit}
          />
        )}
      </AnimatePresence>

      {/* ── TOP IMMERSIVE BAR ── */}
      <header
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b surface-blur"
        style={{
          background: 'rgba(12, 12, 15, 0.9)',
          borderColor: 'var(--color-base-600)',
        }}
      >
        <button
          onClick={handleBackToUnit}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--color-base-700)]"
          style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          title="Exit lesson (back to unit)"
        >
          <X size={20} />
        </button>

        {/* Center progress track */}
        <div className="flex-1 max-w-md mx-6">
          <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
            <span className="truncate max-w-[200px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {lesson.title}
            </span>
            <span className="font-mono">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>
          <div className="progress-track h-2">
            <div
              className="progress-fill"
              style={{
                width: `${progressPct}%`,
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>

        <div className="w-9 flex justify-end">
          <span className="badge badge-vermillion text-xs font-bold">
            +50 XP
          </span>
        </div>
      </header>

      {/* ── STEP CONTENT AREA ── */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Step: Introduction */}
            {currentStep.type === 'introduction' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').IntroductionContent;
              return (
                <div className="space-y-6 text-center">
                  <div className="badge badge-indigo">Overview</div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {content.heading}
                  </h2>

                  {content.hookJP && (
                    <div className="py-4">
                      <div className="font-jp-serif text-jp-3xl font-bold mb-2" style={{ color: 'var(--color-vermillion-400)' }}>
                        {content.hookJP}
                      </div>
                      {content.hookEN && (
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                          {content.hookEN}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                    {content.body}
                  </p>

                  {content.culturalNote && (
                    <div
                      className="p-4 rounded-xl text-sm text-left max-w-xl mx-auto flex items-start gap-3"
                      style={{
                        background: 'var(--color-base-800)',
                        border: '1px solid var(--color-base-500)',
                      }}
                    >
                      <span className="text-lg">🏮</span>
                      <div>
                        <div className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-gold-400)' }}>
                          Cultural Insight
                        </div>
                        <div style={{ color: 'var(--color-text-muted)' }}>
                          {content.culturalNote}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Step: Vocabulary Item */}
            {currentStep.type === 'vocabulary' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').VocabularyContent;
              const vocab = n5Vocabulary.find(v => v.id === content.vocabularyId) ?? n5Vocabulary[0];

              return (
                <div className="space-y-6 text-center max-w-xl mx-auto">
                  <div className="flex items-center justify-center gap-2">
                    <JLPTBadge level={vocab.jlptLevel} />
                    <PartOfSpeechBadge pos={vocab.partOfSpeech} />
                  </div>

                  <div className="py-6">
                    <div className="font-jp-serif text-jp-4xl font-bold mb-2 tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                      {vocab.japanese}
                    </div>
                    <div className="font-jp text-jp-xl mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      {vocab.kana}
                    </div>
                    <div className="font-mono text-sm mb-4" style={{ color: 'var(--color-text-dim)' }}>
                      [{vocab.romaji}]
                    </div>
                    <div className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                      {vocab.english}
                    </div>

                    <div className="flex justify-center">
                      <AudioButton text={vocab.japanese} size={28} />
                    </div>
                  </div>

                  {/* Examples */}
                  {vocab.examples.length > 0 && (
                    <div className="space-y-2 text-left">
                      <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-dim)' }}>
                        Context Sentences
                      </div>
                      {vocab.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl card flex items-center justify-between"
                        >
                          <div>
                            <div className="font-jp text-jp-base font-medium mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                              {ex.japanese}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              {ex.english}
                            </div>
                          </div>
                          <AudioButton text={ex.japanese} size={16} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Conjugation preview if verb */}
                  {vocab.conjugations && (
                    <div
                      className="p-4 rounded-xl text-left text-xs"
                      style={{ background: 'var(--color-base-800)', border: '1px solid var(--color-base-500)' }}
                    >
                      <div className="font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-vermillion-400)' }}>
                        Core Forms
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-jp">
                        <div><span className="text-dim">Dict:</span> {vocab.conjugations.dictionaryForm}</div>
                        <div><span className="text-dim">Masu:</span> {vocab.conjugations.masuForm}</div>
                        <div><span className="text-dim">Nai:</span> {vocab.conjugations.naiForm}</div>
                        <div><span className="text-dim">Te:</span> {vocab.conjugations.teForm}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Step: Grammar Point */}
            {currentStep.type === 'grammar' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').GrammarContent;
              const grammar = n5Grammar.find(g => g.id === content.grammarId) ?? n5Grammar[0];

              return (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center">
                    <JLPTBadge level={grammar.jlptLevel} />
                    <h2 className="font-jp-serif text-jp-2xl font-bold mt-2 mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {grammar.name}
                    </h2>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-indigo-300)' }}>
                      {grammar.nameEN}
                    </div>
                    <div className="text-base mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {grammar.meaning}
                    </div>
                  </div>

                  {/* Formations */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-dim)' }}>
                      Formation Formula
                    </div>
                    {grammar.formation.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg"
                        style={{ background: 'var(--color-base-800)', border: '1px solid var(--color-base-500)' }}
                      >
                        <div className="font-bold text-sm mb-1" style={{ color: 'var(--color-vermillion-400)' }}>
                          {f.structure}
                        </div>
                        <div className="font-jp text-jp-base" style={{ color: 'var(--color-text-primary)' }}>
                          {f.example} <span className="text-xs font-sans text-muted">({f.english})</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-dim)' }}>
                      Examples in Context
                    </div>
                    {grammar.examples.slice(0, 3).map((ex, i) => (
                      <div key={i} className="p-3.5 rounded-xl card flex items-center justify-between">
                        <div>
                          <div className="font-jp text-jp-base font-medium mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                            {ex.japanese}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {ex.english}
                          </div>
                        </div>
                        <AudioButton text={ex.japanese} size={16} />
                      </div>
                    ))}
                  </div>

                  {/* Common Mistakes */}
                  {grammar.commonMistakes.length > 0 && (
                    <div
                      className="p-4 rounded-xl text-xs space-y-1"
                      style={{ background: 'rgba(232, 64, 64, 0.08)', border: '1px solid rgba(232, 64, 64, 0.25)' }}
                    >
                      <div className="font-bold uppercase tracking-wider" style={{ color: 'var(--color-error)' }}>
                        ⚠️ Common Pitfall
                      </div>
                      <div className="line-through font-jp" style={{ color: 'var(--color-text-dim)' }}>
                        ❌ {grammar.commonMistakes[0].wrong}
                      </div>
                      <div className="font-jp font-bold" style={{ color: 'var(--color-success)' }}>
                        ✓ {grammar.commonMistakes[0].correct}
                      </div>
                      <div className="text-muted mt-1">
                        {grammar.commonMistakes[0].explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Step: Example Card */}
            {currentStep.type === 'example' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').ExampleContent;
              return (
                <div className="text-center py-8 max-w-xl mx-auto space-y-6">
                  <div className="font-jp-serif text-jp-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {content.japanese}
                  </div>
                  {content.reading && (
                    <div className="font-mono text-lg" style={{ color: 'var(--color-text-muted)' }}>
                      [{content.reading}]
                    </div>
                  )}
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {content.english}
                  </p>
                  <div className="flex justify-center">
                    <AudioButton text={content.japanese} size={28} />
                  </div>
                </div>
              );
            })()}

            {/* Step: Interactive Exercise */}
            {currentStep.type === 'exercise' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').ExerciseContent;
              const exercise = getExerciseById(content.exerciseId);

              if (!exercise) {
                return (
                  <div className="text-center py-8">
                    <p className="text-muted">Exercise ready.</p>
                    <button onClick={() => setCanProceed(true)} className="btn btn-primary btn-sm mt-4">
                      Continue
                    </button>
                  </div>
                );
              }

              if (exercise.type === 'multiple_choice' || exercise.type === 'conjugation') {
                return (
                  <MultipleChoiceExercise
                    exercise={exercise}
                    onAnswer={handleExerciseAnswer}
                  />
                );
              }

              if (exercise.type === 'japanese_typing') {
                return (
                  <JapaneseTypingExercise
                    exercise={exercise}
                    onAnswer={handleExerciseAnswer}
                  />
                );
              }

              if (exercise.type === 'sentence_ordering') {
                return (
                  <SentenceBuilderExercise
                    exercise={exercise}
                    onAnswer={handleExerciseAnswer}
                  />
                );
              }

              return (
                <MultipleChoiceExercise
                  exercise={exercise}
                  onAnswer={handleExerciseAnswer}
                />
              );
            })()}

            {/* Step: Summary */}
            {currentStep.type === 'summary' && (() => {
              const content = currentStep.content as import('@/types/curriculum.types').SummaryContent;
              return (
                <div className="text-center py-6 max-w-xl mx-auto space-y-6">
                  <div
                    className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-vermillion-600), var(--color-vermillion-800))',
                      boxShadow: '0 0 30px rgba(194, 51, 77, 0.4)',
                    }}
                  >
                    <Trophy size={40} weight="fill" style={{ color: '#fff' }} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      {content.heading}
                    </h2>
                    <div className="font-jp text-jp-base" style={{ color: 'var(--color-gold-400)' }}>
                      お疲れ様でした！ (Great work!)
                    </div>
                  </div>

                  <div
                    className="p-5 rounded-xl text-left space-y-3"
                    style={{ background: 'var(--color-base-800)', border: '1px solid var(--color-base-500)' }}
                  >
                    <div className="font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--color-vermillion-400)' }}>
                      <Sparkle size={14} weight="fill" /> Key Takeaways
                    </div>
                    {content.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={16} weight="fill" className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="text-center">
                      <div className="text-2xl font-black" style={{ color: 'var(--color-vermillion-400)' }}>+50</div>
                      <div className="text-xs text-muted">XP Gained</div>
                    </div>
                    <div className="h-8 w-px bg-[var(--color-base-600)]" />
                    <div className="text-center">
                      <div className="text-2xl font-black" style={{ color: 'var(--color-gold-400)' }}>+1</div>
                      <div className="text-xs text-muted">Lesson Done</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── BOTTOM CONTROL BAR ── */}
      <footer
        className="sticky bottom-0 z-30 px-6 py-4 border-t surface-blur flex items-center justify-between"
        style={{
          background: 'rgba(12, 12, 15, 0.95)',
          borderColor: 'var(--color-base-600)',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="btn btn-ghost btn-lg"
          style={{ opacity: currentStepIndex === 0 ? 0.3 : 1 }}
        >
          <ArrowLeft size={18} /> Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className="btn btn-primary btn-xl gap-2 min-w-36"
          id="btn-lesson-next"
        >
          {isLastStep ? 'Complete Lesson' : 'Continue'}
          <ArrowRight size={20} weight="bold" />
        </button>
      </footer>
    </div>
  );
}
