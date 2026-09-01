import { motion } from 'motion/react';
import { ChartLine, Trophy, Fire, Lightning, Brain, Clock, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useProgressStore } from '@/stores/progress.store';
import { useUserStore } from '@/stores/user.store';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ActivityHeatmap } from '@/components/ui/ActivityHeatmap';
import { MasteryDot } from '@/components/japanese/JapaneseComponents';

const SAMPLE_WEEKLY_DATA = [
  { day: 'Mon', xp: 80, mins: 15 },
  { day: 'Tue', xp: 120, mins: 25 },
  { day: 'Wed', xp: 90, mins: 20 },
  { day: 'Thu', xp: 150, mins: 30 },
  { day: 'Fri', xp: 200, mins: 40 },
  { day: 'Sat', xp: 240, mins: 45 },
  { day: 'Sun', xp: 180, mins: 35 },
];

const ACHIEVEMENTS = [
  { id: 'a1', title: 'First Stroke', titleJP: '第一歩', desc: 'Completed your first Japanese lesson', icon: '🌱', unlocked: true },
  { id: 'a2', title: 'Kana Conqueror', titleJP: '仮名の達人', desc: 'Mastered all 46 Hiragana vowels and consonants', icon: '🎴', unlocked: true },
  { id: 'a3', title: 'Flame Keeper', titleJP: '七日の継続', desc: 'Achieved a 7-day study streak', icon: '🔥', unlocked: true },
  { id: 'a4', title: 'Kanji Architect', titleJP: '漢字百字', desc: 'Learned your first 50 JLPT kanji characters', icon: '🏛️', unlocked: false },
  { id: 'a5', title: 'FSRS Disciple', titleJP: '記憶の王', desc: 'Reviewed 100 SRS cards on schedule', icon: '⚡', unlocked: false },
  { id: 'a6', title: 'N5 Certified', titleJP: 'N5完全制覇', desc: 'Completed all N5 curriculum units', icon: '👑', unlocked: false },
];

export default function ProgressPage() {
  const profile = useUserStore(s => s.profile);
  const user = useUserStore(s => s.user);
  const { progress, srsCards } = useProgressStore();

  const totalCards = srsCards.length;
  const masteryBreakdown = {
    new: srsCards.filter(c => c.masteryLevel === 'new').length,
    learning: srsCards.filter(c => c.masteryLevel === 'learning').length,
    familiar: srsCards.filter(c => c.masteryLevel === 'familiar').length,
    mastered: srsCards.filter(c => c.masteryLevel === 'mastered').length,
    retained: srsCards.filter(c => c.masteryLevel === 'retained').length,
  };

  const streak = progress?.streak ?? 1;
  const totalReviews = progress?.totalReviews ?? 0;
  const lessonsCompleted = progress?.lessonsCompleted.length ?? 0;

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-gold-400)' }}>
          <ChartLine size={16} /> Learning Analytics & Mastery
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Your Progress & Fluency Metrics
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Deep analytics on vocabulary retention, FSRS memory stability, study consistency, and JLPT readiness.
        </p>
      </div>

      {/* ── TOP STATS SUMMARY ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Current Streak', val: `${streak} Days`, icon: Fire, color: '#FF6B35' },
          { label: 'Total XP Earned', val: `${profile?.xp ?? 0} XP`, icon: Trophy, color: 'var(--color-gold-400)' },
          { label: 'SRS Reviews Done', val: totalReviews, icon: Lightning, color: 'var(--color-vermillion-400)' },
          { label: 'Lessons Completed', val: lessonsCompleted, icon: CheckCircle, color: 'var(--color-success)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-5"
          >
            <stat.icon size={22} style={{ color: stat.color, marginBottom: 8 }} />
            <div className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
              {stat.val}
            </div>
            <div className="text-xs text-muted mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── CHARTS & MASTERY ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Study Time Chart (7 cols) */}
        <div className="lg:col-span-7 card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                Weekly XP Velocity
              </h2>
              <div className="text-xs text-muted">Daily experience earned across the week</div>
            </div>
            <span className="badge badge-vermillion text-xs font-bold">+1,060 XP this week</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SAMPLE_WEEKLY_DATA}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C2334D" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C2334D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#52525F" fontSize={12} tickLine={false} />
                <YAxis stroke="#52525F" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1C1C21',
                    border: '1px solid #2A2A32',
                    borderRadius: '8px',
                    color: '#F0EDE8',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#C2334D"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#xpGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FSRS Mastery Distribution (5 cols) */}
        <div className="lg:col-span-5 card p-6 space-y-4">
          <h2 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
            FSRS Memory Retention Model
          </h2>
          <div className="text-xs text-muted">Items classified by stability & retrievability</div>

          <div className="space-y-3.5 pt-2">
            {[
              { level: 'new', label: 'New / Unseen', count: masteryBreakdown.new, color: 'var(--color-text-dim)' },
              { level: 'learning', label: 'Learning (1-3 days)', count: masteryBreakdown.learning, color: '#60A0E0' },
              { level: 'familiar', label: 'Familiar (4-14 days)', count: masteryBreakdown.familiar, color: '#50B880' },
              { level: 'mastered', label: 'Mastered (15-60 days)', count: masteryBreakdown.mastered, color: 'var(--color-gold-400)' },
              { level: 'retained', label: 'Retained (&gt;60 days)', count: masteryBreakdown.retained, color: 'var(--color-vermillion-400)' },
            ].map(m => {
              const pct = totalCards > 0 ? Math.round((m.count / totalCards) * 100) : 0;
              return (
                <div key={m.level} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span style={{ color: m.color }}>{m.label}</span>
                    <span className="font-mono text-muted">{m.count} items ({pct}%)</span>
                  </div>
                  <div className="progress-track h-2">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: m.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 12-WEEK ACTIVITY HEATMAP ── */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
          Consistency Heatmap (12-Week Rolling Log)
        </h2>
        <div className="text-xs text-muted mb-2">Daily study frequency over time</div>
        <ActivityHeatmap data={progress?.dailyActivity ?? []} />
      </div>

      {/* ── ACHIEVEMENTS & BADGES ── */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
          <Trophy size={20} style={{ color: 'var(--color-gold-400)' }} />
          Unlocked Achievements & Milestone Badges
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map(ach => (
            <div
              key={ach.id}
              className="p-4 rounded-xl flex items-start gap-3 border transition-all"
              style={{
                background: ach.unlocked ? 'var(--color-base-700)' : 'var(--color-base-850)',
                borderColor: ach.unlocked ? 'var(--color-base-500)' : 'var(--color-base-600)',
                opacity: ach.unlocked ? 1 : 0.45,
              }}
            >
              <div className="text-3xl flex-shrink-0">{ach.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {ach.title}
                  </span>
                  <span className="font-jp text-xs text-muted">({ach.titleJP})</span>
                </div>
                <p className="text-xs text-muted mt-1 leading-relaxed">{ach.desc}</p>
                {ach.unlocked && (
                  <span className="badge badge-gold text-2xs mt-2 inline-flex">
                    <Sparkle size={10} weight="fill" className="mr-1" /> Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
