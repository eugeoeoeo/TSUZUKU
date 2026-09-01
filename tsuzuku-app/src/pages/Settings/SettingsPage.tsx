import { useRef } from 'react';
import { Gear, SpeakerHigh, Eye, Clock, Trash, DownloadSimple, UploadSimple, ShieldCheck } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import { useToast } from '@/components/ui/Toast';
import { storage } from '@/lib/storage';
import type { FuriganaMode } from '@/types/user.types';

export default function SettingsPage() {
  const { settings, updateSettings, resetAll, initUser } = useUserStore();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportBackup = () => {
    const json = storage.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tsuzuku_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Backup file downloaded to your device!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) {
        toast.error('Failed to read backup file.');
        return;
      }
      const success = storage.importAll(content);
      if (success) {
        toast.success('Backup restored successfully! Reloading...');
        setTimeout(() => window.location.reload(), 800);
      } else {
        toast.error('Invalid backup format.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all local progress and start fresh? This cannot be undone.')) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold text-[var(--color-vermillion-400)]">
          <Gear size={16} /> Preferences & Device Storage
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Settings & Data Management
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-muted">
          All data is securely saved in your phone / device storage. No account or remote server required.
        </p>
      </div>

      {/* ── SETTINGS GROUPS ── */}
      <div className="space-y-6">

        {/* Device Storage & Backup */}
        <div className="card p-6 space-y-4 border-[var(--color-base-500)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-bold text-base text-white">
              <ShieldCheck size={20} className="text-[var(--color-success)]" />
              Device Storage & Data Portability
            </div>
            <span className="badge badge-n5">100% Offline Ready</span>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Your Japanese flashcards, study streak, XP, and lesson completions are stored locally on your device. Export a backup anytime to transfer your progress between your phone and computer.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleExportBackup}
              className="btn btn-secondary btn-sm gap-2"
            >
              <DownloadSimple size={16} /> Export Backup (.json)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary btn-sm gap-2"
            >
              <UploadSimple size={16} /> Restore from Backup
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportBackup}
            />
          </div>
        </div>

        {/* Furigana Mode */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-white">
            <Eye size={18} className="text-[var(--color-vermillion-400)]" />
            Furigana Reading Assistance
          </div>
          <p className="text-xs text-muted">
            Configure when phonetic ruby furigana appears above Kanji characters across lessons and reading labs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'hover', label: 'On Hover (Recommended)', desc: 'Furigana appears only when you hover over or tap kanji.' },
              { id: 'always', label: 'Always Visible', desc: 'Furigana is constantly displayed for effortless reading.' },
              { id: 'click', label: 'On Click / Tap', desc: 'Click or tap any kanji to toggle reading revelation.' },
              { id: 'never', label: 'Never (Hardcore)', desc: 'Hide all furigana for pure native immersion.' },
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleFuriganaChange(m.id as FuriganaMode)}
                className="p-4 rounded-xl text-left border transition-all"
                style={{
                  background: settings.furiganaMode === m.id ? 'rgba(194,51,77,0.15)' : 'var(--color-base-700)',
                  borderColor: settings.furiganaMode === m.id ? 'var(--color-vermillion-500)' : 'var(--color-base-600)',
                }}
              >
                <div className="font-bold text-sm mb-1 text-white">{m.label}</div>
                <div className="text-xs text-muted">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Goal */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-white">
            <Clock size={18} className="text-[var(--color-gold-400)]" />
            Daily Study Goal
          </div>
          <p className="text-xs text-muted">Set your target daily immersion time.</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[5, 10, 15, 30, 45, 60].map(mins => (
              <button
                key={mins}
                type="button"
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
        <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SpeakerHigh size={22} className="text-[var(--color-indigo-400)] flex-shrink-0" />
            <div>
              <div className="font-bold text-sm text-white">Japanese Audio & Speech</div>
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
        <div className="card p-6 border-red-900/40 bg-red-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
