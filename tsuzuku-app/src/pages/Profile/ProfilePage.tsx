import { Link } from 'react-router-dom';
import { User, Trophy, Fire, Lightning, SealCheck, ArrowRight, Gear } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useProgressStore } from '@/stores/progress.store';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

export default function ProfilePage() {
  const user = useUserStore(s => s.user);
  const profile = useUserStore(s => s.profile);
  const progress = useProgressStore(s => s.progress);

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* ── PROFILE HEADER CARD ── */}
      <div className="card p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center font-bold text-4xl shadow-xl flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-vermillion-500), var(--color-indigo-600))',
            color: '#fff',
          }}
        >
          {(user?.displayName ?? 'L')[0].toUpperCase()}
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
              {user?.displayName ?? 'Learner'}
            </h1>
            <JLPTBadge level={profile?.currentLevel ?? 'N5'} />
            <span className="badge badge-gold text-2xs font-semibold">
              <SealCheck size={12} weight="fill" className="mr-1" /> Active Student
            </span>
          </div>

          <p className="text-xs text-muted">
            {user?.isGuest ? 'Guest Local Storage Mode (Ready for Supabase sync)' : user?.email}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs text-secondary font-mono">
            <span>Level: {profile?.currentLevel ?? 'N5'}</span>
            <span>·</span>
            <span>XP: {profile?.xp ?? 0}</span>
            <span>·</span>
            <span>Streak: {progress?.streak ?? 1} Days</span>
          </div>
        </div>

        <Link to="/settings" className="btn btn-secondary btn-md gap-1.5 self-center sm:self-start">
          <Gear size={16} /> Settings
        </Link>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-6 text-center space-y-1">
          <Fire size={24} style={{ color: '#FF6B35', margin: '0 auto 6px' }} />
          <div className="text-3xl font-black text-white">{progress?.streak ?? 1}</div>
          <div className="text-xs text-muted">Consecutive Days Streak</div>
        </div>

        <div className="card p-6 text-center space-y-1">
          <Lightning size={24} style={{ color: 'var(--color-vermillion-400)', margin: '0 auto 6px' }} />
          <div className="text-3xl font-black text-white">{progress?.totalReviews ?? 0}</div>
          <div className="text-xs text-muted">FSRS Flashcard Reviews</div>
        </div>

        <div className="card p-6 text-center space-y-1">
          <Trophy size={24} style={{ color: 'var(--color-gold-400)', margin: '0 auto 6px' }} />
          <div className="text-3xl font-black text-white">{progress?.lessonsCompleted.length ?? 0}</div>
          <div className="text-xs text-muted">Lessons Completed</div>
        </div>
      </div>

      {/* ── CLOUD SYNC CALLOUT ── */}
      <div className="card-accent p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-sm" style={{ color: 'var(--color-vermillion-400)' }}>
            Supabase Cloud Synchronization
          </div>
          <p className="text-xs text-muted mt-0.5">
            Your progress is currently saved safely in your browser's persistent storage.
          </p>
        </div>
        <Link to="/learn" className="btn btn-primary btn-md flex-shrink-0">
          Continue Learning <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
