import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, CheckCircle, Clock, Lock } from '@phosphor-icons/react';
import { ALL_UNITS } from '@/data/curriculum/units';
import { getLessonById } from '@/data/curriculum/lessons';
import { useProgressStore } from '@/stores/progress.store';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

export default function UnitPage() {
  const { level, unitId } = useParams<{ level: string; unitId: string }>();
  const normalizedLevel = (level?.toUpperCase() ?? 'N5') as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

  const units = ALL_UNITS[normalizedLevel] ?? ALL_UNITS.N5;
  const unit = units.find(u => u.id === unitId) ?? units[0];

  const progress = useProgressStore(s => s.progress);
  const completedLessons = new Set(progress?.lessonsCompleted ?? []);

  // Build lesson list — search ALL levels via getLessonById
  const unitLessons = unit.lessonIds.map(id => getLessonById(id));

  const completedCount = unit.lessonIds.filter(lid => completedLessons.has(lid)).length;
  const isUnitComplete = completedCount === unit.lessonIds.length && unit.lessonIds.length > 0;

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to={`/learn/${normalizedLevel.toLowerCase()}`} className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to {normalizedLevel} Units
        </Link>
      </div>

      {/* ── UNIT HERO ── */}
      <motion.div
        className="card p-8 space-y-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <JLPTBadge level={unit.levelId} />
          <span className="badge badge-muted text-xs font-mono">Unit {unit.order}</span>
          {isUnitComplete && (
            <span className="badge badge-muted text-xs" style={{ color: 'var(--color-success)', borderColor: 'rgba(46,168,123,0.35)', background: 'rgba(46,168,123,0.1)' }}>
              ✓ Complete
            </span>
          )}
        </div>

        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
          {unit.title}
        </h1>

        <div className="font-jp text-lg text-muted">{unit.titleJP}</div>

        <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          {unit.description}
        </p>

        <div className="flex items-center gap-4 pt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-1"><Clock size={14} /> ~{unit.estimatedHours} hours total</span>
          <span>·</span>
          <span className="font-mono">{completedCount} / {unit.lessonIds.length} Lessons</span>
          <span>·</span>
          {/* Progress bar */}
          <div className="flex-1 max-w-32 progress-track h-1.5">
            <div
              className="progress-fill"
              style={{ width: `${unit.lessonIds.length > 0 ? Math.round((completedCount / unit.lessonIds.length) * 100) : 0}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── LESSONS LIST ── */}
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider font-semibold px-1" style={{ color: 'var(--color-text-dim)' }}>
          Lessons in this Unit
        </div>

        {unit.lessonIds.map((lessonId, i) => {
          const lesson = unitLessons[i];
          const isComplete = completedLessons.has(lessonId);
          // Lesson is locked if: it's not the first AND the previous lesson hasn't been completed
          // (only enforce sequential lock if there's a previous lesson)
          const prevCompleted = i === 0 || completedLessons.has(unit.lessonIds[i - 1]);
          const isLocked = !isComplete && !prevCompleted;

          const lessonTitle = lesson?.title ?? `Lesson ${i + 1}: ${lessonId.replace(/^n\d-l\d+-/, '').replace(/-/g, ' ')}`;
          const lessonTitleJP = lesson?.titleJP ?? `第${i + 1}課`;
          const estMinutes = lesson?.estimatedMinutes ?? 15;
          const stepCount = lesson?.steps.length ?? 8;

          return (
            <motion.div
              key={lessonId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div
                className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={
                  isComplete
                    ? { borderColor: 'rgba(46, 168, 123, 0.4)', background: 'linear-gradient(135deg, rgba(46, 168, 123, 0.06), rgba(20,20,23,1))' }
                    : isLocked
                    ? { opacity: 0.5 }
                    : undefined
                }
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                      style={{
                        background: isComplete ? 'rgba(46,168,123,0.2)' : 'var(--color-base-700)',
                        color: isComplete ? 'var(--color-success)' : 'var(--color-text-muted)',
                      }}
                    >
                      {isComplete ? '✓' : i + 1}
                    </span>
                    <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                      {lessonTitle}
                    </h3>
                    {isComplete && (
                      <CheckCircle size={16} weight="fill" style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                    )}
                    {isLocked && (
                      <Lock size={14} style={{ color: 'var(--color-text-dim)', flexShrink: 0 }} />
                    )}
                  </div>

                  <div className="font-jp text-xs" style={{ color: 'var(--color-text-muted)' }}>{lessonTitleJP}</div>

                  {lesson?.objectives && lesson.objectives.length > 0 && (
                    <div className="text-xs line-clamp-1 pt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {lesson.objectives[0]}
                    </div>
                  )}

                  <div className="text-xs flex items-center gap-2 pt-0.5 font-mono" style={{ color: 'var(--color-text-dim)' }}>
                    <span>{estMinutes} min</span>
                    <span>·</span>
                    <span>{stepCount} steps</span>
                  </div>
                </div>

                {isLocked ? (
                  <div
                    className="btn btn-secondary btn-md opacity-40 cursor-not-allowed self-end sm:self-center"
                    style={{ pointerEvents: 'none' }}
                  >
                    <Lock size={14} /> Locked
                  </div>
                ) : (
                  <Link
                    to={`/lesson/${lessonId}`}
                    className="btn btn-primary btn-md gap-2 self-end sm:self-center"
                    id={`btn-start-lesson-${i + 1}`}
                  >
                    <Play size={14} weight="fill" />
                    {isComplete ? 'Review' : 'Start'}
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
