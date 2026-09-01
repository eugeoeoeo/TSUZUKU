import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, CheckCircle, Lock, Trophy } from '@phosphor-icons/react';
import { JLPT_LEVELS, ALL_UNITS } from '@/data/curriculum/units';
import { useProgressStore } from '@/stores/progress.store';
import { useUserStore } from '@/stores/user.store';
import { ProgressRing } from '@/components/ui/ProgressRing';

export default function LearnPage() {
  const profile = useUserStore(s => s.profile);
  const progress = useProgressStore(s => s.progress);

  const completedLessons = new Set(progress?.lessonsCompleted ?? []);

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-vermillion-400)' }}>
          <BookOpen size={16} /> Structured Learning Path
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          JLPT Mastery Roadmap
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Step-by-step curriculum from absolute beginner (N5) to native-level proficiency (N1).
        </p>
      </div>

      {/* ── LEVEL CARDS ── */}
      <div className="space-y-6">
        {JLPT_LEVELS.map((level, i) => {
          const units = ALL_UNITS[level.id] ?? [];
          const allLessonIds = units.flatMap(u => u.lessonIds);
          const totalLessons = allLessonIds.length;
          const completedCount = allLessonIds.filter(lid => completedLessons.has(lid)).length;
          const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
          const isCurrentLevel = profile?.currentLevel === level.id;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="card p-6 md:p-8 relative overflow-hidden transition-all hover:border-[var(--color-base-400)]"
                style={isCurrentLevel ? {
                  background: 'linear-gradient(135deg, rgba(194,51,77,0.08), rgba(20,20,23,1))',
                  borderColor: 'rgba(194,51,77,0.35)',
                } : undefined}
              >
                {/* Level color bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5"
                  style={{ background: level.color }}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left info */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-jp-serif text-2xl font-bold flex-shrink-0"
                      style={{ background: `${level.color}20`, color: level.color, border: `1px solid ${level.color}40` }}
                    >
                      {level.id}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {level.title}
                        </h2>
                        <span className="font-jp text-sm text-muted">({level.titleJP})</span>
                        {isCurrentLevel && (
                          <span className="badge badge-vermillion text-2xs font-bold">
                            Current Target
                          </span>
                        )}
                      </div>
                      <p className="text-sm max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                        {level.description}
                      </p>
                      <div className="text-xs text-dim flex items-center gap-4 pt-1 font-mono">
                        <span>{units.length} Units</span>
                        <span>·</span>
                        <span>{totalLessons} Lessons</span>
                        <span>·</span>
                        <span>{completedCount} Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Right progress & CTA */}
                  <div className="flex items-center gap-6 flex-shrink-0 self-end md:self-center">
                    <ProgressRing size={60} progress={pct} color={level.color}>
                      <span className="text-xs font-bold font-mono">{pct}%</span>
                    </ProgressRing>

                    <Link
                      to={`/learn/${level.id.toLowerCase()}`}
                      className="btn btn-primary btn-lg gap-2"
                      style={level.id !== 'N5' && !isCurrentLevel ? {
                        background: 'var(--color-base-700)',
                        borderColor: 'var(--color-base-500)',
                        color: 'var(--color-text-primary)',
                      } : undefined}
                    >
                      Explore Units <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
