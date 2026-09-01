import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, ArrowRight, CheckCircle, Clock, Tag } from '@phosphor-icons/react';
import { ALL_UNITS, JLPT_LEVELS } from '@/data/curriculum/units';
import { useProgressStore } from '@/stores/progress.store';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

export default function LevelPage() {
  const { level } = useParams<{ level: string }>();
  const normalizedLevel = (level?.toUpperCase() ?? 'N5') as 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

  const levelInfo = JLPT_LEVELS.find(l => l.id === normalizedLevel) ?? JLPT_LEVELS[0];
  const units = ALL_UNITS[normalizedLevel] ?? ALL_UNITS.N5;

  const progress = useProgressStore(s => s.progress);
  const completedLessons = new Set(progress?.lessonsCompleted ?? []);

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to="/learn" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to All Levels
        </Link>
      </div>

      {/* ── LEVEL HEADER ── */}
      <div className="card p-8 space-y-3 relative overflow-hidden" style={{ borderColor: `${levelInfo.color}40` }}>
        <div className="flex items-center gap-2">
          <JLPTBadge level={levelInfo.id} />
          <span className="text-xs font-mono text-muted">{units.length} Units Available</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {levelInfo.id} — {levelInfo.title}
        </h1>

        <div className="font-jp text-lg text-muted">{levelInfo.titleJP}</div>

        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
          {levelInfo.goal}
        </p>
      </div>

      {/* ── UNITS LIST ── */}
      <div className="space-y-4">
        <div className="text-xs uppercase tracking-wider font-semibold text-muted px-1">
          Curriculum Units Progression
        </div>

        {units.map((unit, i) => {
          const completedUnitLessons = unit.lessonIds.filter(lid => completedLessons.has(lid)).length;
          const isComplete = completedUnitLessons === unit.lessonIds.length && unit.lessonIds.length > 0;

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={`/learn/${normalizedLevel.toLowerCase()}/${unit.id}`}
                className="card card-interactive block p-6 group transition-all"
                style={isComplete ? {
                  borderColor: 'rgba(46, 168, 123, 0.4)',
                  background: 'linear-gradient(135deg, rgba(46, 168, 123, 0.08), rgba(20,20,23,1))',
                } : undefined}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono"
                        style={{ background: 'var(--color-base-700)', color: levelInfo.color }}
                      >
                        {unit.order}
                      </span>
                      <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {unit.title}
                      </h2>
                      {isComplete && (
                        <CheckCircle size={18} weight="fill" style={{ color: 'var(--color-success)' }} />
                      )}
                    </div>

                    <div className="font-jp text-sm text-muted">{unit.titleJP}</div>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {unit.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> ~{unit.estimatedHours} hrs
                      </span>
                      <span>·</span>
                      <span className="font-mono">
                        {completedUnitLessons} / {unit.lessonIds.length} Lessons done
                      </span>
                      <span>·</span>
                      <div className="flex gap-1">
                        {unit.tags.slice(0, 3).map(t => (
                          <span key={t} className="badge badge-muted text-2xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center font-semibold text-xs text-[var(--color-vermillion-400)]">
                    <span>Open Unit</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
