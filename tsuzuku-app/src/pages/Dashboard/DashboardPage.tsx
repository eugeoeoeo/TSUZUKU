import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Lightning, BookOpen, Brain, Fire, ArrowRight, Clock,
  CheckCircle, Trophy
} from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';
import { getDueCards } from '@/lib/srs';
import { JLPTBadge, MasteryDot } from '@/components/japanese/JapaneseComponents';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ActivityHeatmap } from '@/components/ui/ActivityHeatmap';

export default function DashboardPage() {
  const user = useUserStore(s => s.user);
  const profile = useUserStore(s => s.profile);
  const settings = useUserStore(s => s.settings);
  const { srsCards, progress } = useProgressStore();

  const dueCards = getDueCards(srsCards);
  const dueCount = dueCards.length;
  const masteryBreakdown = {
    new: srsCards.filter(c => c.masteryLevel === 'new').length,
    learning: srsCards.filter(c => c.masteryLevel === 'learning').length,
    familiar: srsCards.filter(c => c.masteryLevel === 'familiar').length,
    mastered: srsCards.filter(c => c.masteryLevel === 'mastered').length,
    retained: srsCards.filter(c => c.masteryLevel === 'retained').length,
  };
  const totalCards = srsCards.length;
  const masteredPct = totalCards > 0
    ? Math.round(((masteryBreakdown.mastered + masteryBreakdown.retained) / totalCards) * 100)
    : 0;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'おはようございます';
    if (h < 18) return 'こんにちは';
    return 'こんばんは';
  })();

  const streak = progress?.streak ?? 0;
  const dailyGoal = settings.dailyGoalMinutes;
  const todayMinutes = progress?.dailyActivity.find(d => d.date === new Date().toISOString().slice(0, 10))?.minutesStudied ?? 0;
  const dailyPct = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl">
      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-jp text-jp-base mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {greeting}、{user?.displayName ?? '学習者'}さん
            </div>
            <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              Today's Dashboard
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <JLPTBadge level={profile?.currentLevel ?? 'N5'} />
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Streak */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: 'var(--color-base-800)', border: '1px solid var(--color-base-500)' }}
          >
            <Fire size={20} weight="fill" style={{ color: '#FF6B35' }} />
            <div>
              <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {streak}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>day streak</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── QUICK ACTIONS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="col-span-1"
        >
          <Link
            to="/review"
            id="btn-start-review"
            className="card card-interactive block p-5"
            style={dueCount > 0 ? {
              background: 'linear-gradient(135deg, rgba(194,51,77,0.15), rgba(194,51,77,0.05))',
              borderColor: 'rgba(194,51,77,0.35)',
            } : undefined}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: dueCount > 0 ? 'var(--color-vermillion-500)' : 'var(--color-base-700)' }}
              >
                <Lightning size={20} weight="fill" style={{ color: dueCount > 0 ? '#fff' : 'var(--color-text-muted)' }} />
              </div>
              {dueCount > 0 && (
                <span className="badge badge-vermillion font-bold">{dueCount} due</span>
              )}
            </div>
            <div className="font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
              {dueCount > 0 ? 'Reviews Ready' : 'No Reviews Due'}
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {dueCount > 0
                ? `${dueCount} items waiting for review`
                : 'All caught up! Check back later.'}
            </div>
          </Link>
        </motion.div>

        {/* Continue Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1"
        >
          <Link
            to="/learn/n5"
            id="btn-continue-lesson"
            className="card card-interactive block p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(59,79,191,0.2)', border: '1px solid rgba(59,79,191,0.3)' }}
              >
                <BookOpen size={20} style={{ color: 'var(--color-indigo-400)' }} />
              </div>
            </div>
            <div className="font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
              Continue Learning
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {profile?.currentLevel ?? 'N5'} · Continue where you left off
            </div>
          </Link>
        </motion.div>

        {/* Daily Goal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="col-span-1"
        >
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(201,149,42,0.2)', border: '1px solid rgba(201,149,42,0.3)' }}
              >
                <Clock size={20} style={{ color: 'var(--color-gold-400)' }} />
              </div>
              <span className="text-sm font-bold" style={{ color: dailyPct >= 100 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                {dailyPct}%
              </span>
            </div>
            <div className="font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
              Daily Goal
            </div>
            <div className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
              {todayMinutes} / {dailyGoal} min studied
            </div>
            <div className="progress-track h-1.5">
              <div className="progress-fill progress-fill-gold" style={{ width: `${dailyPct}%` }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN BENTO GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Mastery Breakdown — spans 5 cols */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 card p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Mastery Overview</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                {totalCards} items total · {masteredPct}% mastered
              </p>
            </div>
            <ProgressRing size={56} progress={masteredPct} color="var(--color-vermillion-500)">
              <span className="text-xs font-bold">{masteredPct}%</span>
            </ProgressRing>
          </div>

          <div className="space-y-3">
            {(Object.entries(masteryBreakdown) as [string, number][]).map(([level, count]) => {
              const pct = totalCards > 0 ? Math.round((count / totalCards) * 100) : 0;
              return (
                <div key={level} className="flex items-center gap-3">
                  <MasteryDot level={level} showLabel />
                  <div className="flex-1 progress-track h-1.5">
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: {
                        new: 'var(--color-text-dim)',
                        learning: '#60A0E0',
                        familiar: '#50B880',
                        mastered: 'var(--color-gold-400)',
                        retained: 'var(--color-vermillion-400)',
                      }[level],
                    }} />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: 'var(--color-text-muted)' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {totalCards === 0 && (
            <div className="text-center py-4">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Start a lesson to see your mastery tracking here.
              </p>
              <Link to="/learn" className="btn btn-primary btn-sm mt-3">
                Start first lesson →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Activity / Stats — spans 7 cols */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-7 card p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Activity</h2>
            <Link to="/progress" className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              Full stats <ArrowRight size={12} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Total Reviews', value: progress?.totalReviews ?? 0, icon: CheckCircle, color: 'var(--color-success)' },
              { label: 'Items Learned', value: totalCards, icon: Brain, color: 'var(--color-indigo-400)' },
              { label: 'Lessons Done', value: progress?.lessonsCompleted.length ?? 0, icon: Trophy, color: 'var(--color-gold-400)' },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 rounded-lg" style={{ background: 'var(--color-base-700)' }}>
                <stat.icon size={16} style={{ color: stat.color, margin: '0 auto 6px' }} />
                <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <div>
            <div className="text-xs mb-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Study activity — last 12 weeks
            </div>
            <ActivityHeatmap data={progress?.dailyActivity ?? []} />
          </div>
        </motion.div>

        {/* Quick vocab study card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-6 card-accent p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Quick Study</h2>
            <span className="badge badge-vermillion">Vocabulary</span>
          </div>

          <div className="text-center py-6">
            <div className="font-jp-serif text-jp-3xl mb-2" style={{ color: 'var(--color-text-primary)' }}>
              食べる
            </div>
            <div className="font-jp text-jp-base mb-3" style={{ color: 'var(--color-text-muted)' }}>
              たべる
            </div>
            <div className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
              to eat · Ichidan Verb · N5
            </div>
            <div className="text-xs italic mb-6" style={{ color: 'var(--color-text-dim)' }}>
              毎日ご飯を食べます。
            </div>
          </div>

          <Link to="/vocabulary/v-taberu" className="btn btn-outline w-full" id="btn-quick-study">
            View full details →
          </Link>
        </motion.div>

        {/* Grammar of the day */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-6 card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Grammar Focus</h2>
            <span className="badge badge-indigo">N5</span>
          </div>

          <div className="text-center py-4">
            <div className="font-jp text-jp-2xl mb-2" style={{ color: 'var(--color-text-primary)' }}>
              〜ています
            </div>
            <div className="text-sm font-medium mb-3" style={{ color: 'var(--color-indigo-300)' }}>
              te-iru form — ongoing action
            </div>
            <div className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
              日本語を勉強しています。
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
              I am studying Japanese.
            </div>
          </div>

          <Link to="/grammar/g-te-iru" className="btn btn-secondary w-full mt-3" id="btn-grammar-detail">
            Study this pattern →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
