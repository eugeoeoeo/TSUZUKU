import { motion } from 'motion/react';
import { Gear, SpeakerHigh, Eye, Clock, Trash, CheckCircle } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useToast } from '@/components/ui/Toast';
import type { FuriganaMode } from '@/types/user.types';

export default function SettingsPage() {
  const { settings, updateSettings, resetAll } = useUserStore();
  const toast = useToast();

  const handleFuriganaChange = (mode: FuriganaMode) => {
    updateSettings({ furiganaMode: mode });
    toast.success('Furigana mode updated');
  };

  const handleSoundToggle = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    toast.info(`Audio ${!settings.soundEnabled ? 'enabled' : 'muted'}`);
  };

  const handleGoalChange = (mins: number) => {
    updateSettings({ dailyGoalMinutes: mins });
    toast.success(`Daily goal set to ${mins} minutes`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all local progress and start fresh? This cannot be undone.')) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-dim)' }}>
          <Gear size={16} /> Preferences & Configuration
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Settings & Customization
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Tune your furigana reading assistance, daily time commitment, and audio preferences.
        </p>
      </div>

      {/* ── SETTINGS GROUPS ── */}
      <div className="space-y-6">
        {/* Furigana Mode */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
            <Eye size={18} style={{ color: 'var(--color-vermillion-400)' }} />
            Furigana Reading Assistance
          </div>
          <p className="text-xs text-muted">
            Configure when phonetic ruby furigana appears above Kanji characters across the application.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'hover', label: 'On Hover (Recommended)', desc: 'Furigana appears only when you hover over kanji.' },
              { id: 'always', label: 'Always Visible', desc: 'Furigana is constantly displayed for effortless reading.' },
              { id: 'click', label: 'On Click', desc: 'Click any kanji to toggle reading revelation.' },
              { id: 'never', label: 'Never (Hardcore)', desc: 'Hide all furigana for pure immersion.' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => handleFuriganaChange(m.id as FuriganaMode)}
                className="p-4 rounded-xl text-left border transition-all"
                style={{
                  background: settings.furiganaMode === m.id ? 'rgba(194,51,77,0.15)' : 'var(--color-base-700)',
                  borderColor: settings.furiganaMode === m.id ? 'var(--color-vermillion-500)' : 'var(--color-base-600)',
                }}
              >
                <div className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>{m.label}</div>
                <div className="text-xs text-muted">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Goal */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
            <Clock size={18} style={{ color: 'var(--color-gold-400)' }} />
            Daily Study Goal
          </div>
          <p className="text-xs text-muted">Set your target daily immersion time.</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[5, 10, 15, 30, 45, 60].map(mins => (
              <button
                key={mins}
                onClick={() => handleGoalChange(mins)}
                className="p-3 rounded-xl text-center border font-bold text-sm transition-all"
                style={{
                  background: settings.dailyGoalMinutes === mins ? 'var(--color-gold-500)' : 'var(--color-base-700)',
                  color: settings.dailyGoalMinutes === mins ? '#0C0C0F' : 'var(--color-text-primary)',
                  borderColor: settings.dailyGoalMinutes === mins ? 'var(--color-gold-400)' : 'var(--color-base-600)',
                }}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        {/* Audio Toggle */}
        <div className="card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SpeakerHigh size={22} style={{ color: 'var(--color-indigo-400)' }} />
            <div>
              <div className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>Japanese Audio & Speech</div>
              <div className="text-xs text-muted">Play native pronunciation in lessons, reviews, and vocabulary cards.</div>
            </div>
          </div>

          <button
            onClick={handleSoundToggle}
            className="btn btn-sm"
            style={{
              background: settings.soundEnabled ? 'var(--color-success)' : 'var(--color-base-600)',
              color: '#fff',
            }}
          >
            {settings.soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Factory Reset */}
        <div className="card p-6 border-red-900/40 bg-red-950/10 flex items-center justify-between">
          <div>
            <div className="font-bold text-sm text-red-400">Reset Local Learning Data</div>
            <div className="text-xs text-muted">Clear all cached cards, progress, and review histories on this device.</div>
          </div>

          <button
            onClick={handleReset}
            className="btn btn-sm bg-red-900/60 hover:bg-red-800 text-red-100 gap-1.5 border border-red-700/60"
          >
            <Trash size={14} /> Factory Reset
          </button>
        </div>
      </div>
    </div>
  );
}
