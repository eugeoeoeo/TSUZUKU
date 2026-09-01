import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight } from '@phosphor-icons/react';
import { ALL_UNITS } from '@/data/curriculum/units';
import { N5_LESSONS } from '@/data/curriculum/lessons';
import { useProgressStore } from '@/stores/progress.store';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

export default function UnitPage() {
  const { level, unitId } = useParams<{ level: string; unitId: string }>();
  const normalizedLevel = (level?.toUpperCase() ?? 'N5') as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

  const units = ALL_UNITS[normalizedLevel] ?? ALL_UNITS.N5;
  const unit = units.find(u => u.id === unitId) ?? units[0];

  const progress = useProgressStore(s => s.progress);
  const completedLessons = new Set(progress?.lessonsCompleted ?? []);

  // Filter lessons for this unit
  const unitLessons = N5_LESSONS.filter(l => unit.lessonIds.includes(l.id));

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to={`/learn/${normalizedLevel.toLowerCase()}`} className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to {normalizedLevel} Units
        </Link>
      </div>

      {/* ── UNIT HERO ── */}
      <div className="card p-8 space-y-3">
        <div className="flex items-center gap-2">
          <JLPTBadge level={unit.levelId} />
          <span className="badge badge-muted text-xs font-mono">Unit {unit.order}</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {unit.title}
        </h1>

        <div className="font-jp text-lg text-muted">{unit.titleJP}</div>

        <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          {unit.description}
        </p>

        <div className="flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="flex items-center gap-1"><Clock size={14} /> ~{unit.estimatedHours} hours total</span>
          <span>·</span>
          <span>{unit.lessonIds.length} Lessons</span>
        </div>
      </div>

      {/* ── LESSONS LIST ── */}
      <div className="space-y-4">
        <div className="text-xs uppercase tracking-wider font-semibold text-muted px-1">
          Lessons in this Unit
        </div>

        {unit.lessonIds.map((lessonId, i) => {
          const lesson = unitLessons.find(l => l.id === lessonId);
          const isComplete = completedLessons.has(lessonId);
          const lessonTitle = lesson?.title ?? `Lesson ${i + 1}: ${lessonId.replace(/^n\d-l\d+-/, '').replace(/-/g, ' ')}`;
          const lessonTitleJP = lesson?.titleJP ?? `第${i + 1}課`;
          const estMinutes = lesson?.estimatedMinutes ?? 15;

          return (
            <motion.div
              key={lessonId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div
                className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={isComplete ? {
                  borderColor: 'rgba(46, 168, 123, 0.4)',
                  background: 'linear-gradient(135deg, rgba(46, 168, 123, 0.06), rgba(20,20,23,1))',
                } : undefined}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono bg-[var(--color-base-700)] text-muted">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                      {lessonTitle}
                    </h3>
                    {isComplete && (
                      <CheckCircle size={18} weight="fill" style={{ color: 'var(--color-success)' }} />
                    )}
                  </div>

                  <div className="font-jp text-xs text-muted">{lessonTitleJP}</div>

                  {lesson?.objectives && lesson.objectives.length > 0 && (
                    <div className="text-xs text-secondary line-clamp-1 pt-1">
                      🎯 {lesson.objectives[0]}
                    </div>
                  )}

                  <div className="text-2xs text-dim flex items-center gap-2 pt-1 font-mono">
                    <span>{estMinutes} mins</span>
                    <span>·</span>
                    <span>{lesson?.steps.length ?? 8} steps</span>
                  </div>
                </div>

                <Link
                  to={`/lesson/${lessonId}`}
                  className="btn btn-primary btn-md gap-2 self-end sm:self-center"
                >
                  <Play size={14} weight="fill" />
                  {isComplete ? 'Review Lesson' : 'Start Lesson'}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
