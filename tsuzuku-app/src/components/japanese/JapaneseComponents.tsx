import { useUserStore } from '@/stores/user.store';
import type { FuriganaMode } from '@/types/user.types';

// ============================================================
// FuriganaText — renders Japanese text with configurable furigana
// ============================================================
interface FuriganaSegment {
  kanji: string;
  reading: string;
}

interface FuriganaTextProps {
  segments: FuriganaSegment[];
  mode?: FuriganaMode;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'hero';
}

export function FuriganaText({ segments, mode, className = '', size = 'lg' }: FuriganaTextProps) {
  const settingsMode = useUserStore(s => s.settings.furiganaMode);
  const activeMode = mode ?? settingsMode;

  const sizeClass = {
    sm: 'text-jp-sm',
    base: 'text-jp-base',
    lg: 'text-jp-lg',
    xl: 'text-jp-xl',
    '2xl': 'text-jp-2xl',
    '3xl': 'text-jp-3xl',
    '4xl': 'text-jp-4xl',
    hero: 'text-jp-hero',
  }[size];

  return (
    <span className={`font-jp furigana-mode-${activeMode} ${sizeClass} ${className}`}>
      {segments.map((seg, i) => (
        seg.reading && seg.reading !== seg.kanji ? (
          <ruby key={i}>
            {seg.kanji}
            <rt>{seg.reading}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.kanji}</span>
        )
      ))}
    </span>
  );
}

// ============================================================
// parseToFuriganaSegments — parse annotated text format
// Format: 日本{にほん}語{ご}は面白い{おもしろい}です。
// ============================================================
export function parseToFuriganaSegments(annotated: string): FuriganaSegment[] {
  const segments: FuriganaSegment[] = [];
  const pattern = /([^{]*)\{([^}]*)\}|([^{]+)/g;
  let match;

  while ((match = pattern.exec(annotated)) !== null) {
    if (match[1] !== undefined && match[2] !== undefined) {
      // kanji{reading} pattern
      if (match[1]) {
        // Split preceding text into individual characters
        for (const char of match[1]) {
          segments.push({ kanji: char, reading: '' });
        }
      }
      // This shouldn't happen if annotated correctly
    } else if (match[3]) {
      // Plain text
      for (const char of match[3]) {
        segments.push({ kanji: char, reading: '' });
      }
    }
  }

  // Simpler re-parse: 漢字{ふりがな} format
  segments.length = 0;
  const re = /([一-龯々ヵヶ]+)\{([ぁ-ん]+)\}|([^\s])/gu;
  let m;
  while ((m = re.exec(annotated)) !== null) {
    if (m[1] && m[2]) {
      segments.push({ kanji: m[1], reading: m[2] });
    } else if (m[3]) {
      segments.push({ kanji: m[3], reading: '' });
    }
  }

  return segments;
}

// ============================================================
// SimpleJapaneseText — just render Japanese text, no furigana
// ============================================================
interface SimpleJapaneseTextProps {
  text: string;
  size?: FuriganaTextProps['size'];
  className?: string;
  color?: string;
}

export function SimpleJapaneseText({ text, size = 'lg', className = '', color }: SimpleJapaneseTextProps) {
  const sizeClass = {
    sm: 'text-jp-sm',
    base: 'text-jp-base',
    lg: 'text-jp-lg',
    xl: 'text-jp-xl',
    '2xl': 'text-jp-2xl',
    '3xl': 'text-jp-3xl',
    '4xl': 'text-jp-4xl',
    hero: 'text-jp-hero',
  }[size];

  return (
    <span
      className={`font-jp ${sizeClass} ${className}`}
      style={color ? { color } : undefined}
    >
      {text}
    </span>
  );
}

// ============================================================
// JLPTBadge — colored level badge
// ============================================================
const LEVEL_STYLES: Record<string, string> = {
  N5: 'badge-n5',
  N4: 'badge-n4',
  N3: 'badge-n3',
  N2: 'badge-n2',
  N1: 'badge-n1',
};

interface JLPTBadgeProps {
  level: string;
  size?: 'sm' | 'md';
}

export function JLPTBadge({ level, size = 'md' }: JLPTBadgeProps) {
  return (
    <span className={`badge ${LEVEL_STYLES[level] ?? 'badge-muted'} ${size === 'sm' ? 'text-xs' : ''}`}>
      {level}
    </span>
  );
}

// ============================================================
// PartOfSpeechBadge
// ============================================================
const POS_LABELS: Record<string, { label: string; class: string }> = {
  'verb-ichidan': { label: 'Ichidan Verb', class: 'badge-vermillion' },
  'verb-godan': { label: 'Godan Verb', class: 'badge-indigo' },
  'verb-irregular': { label: 'Irregular Verb', class: 'badge-gold' },
  'adjective-i': { label: 'い-Adjective', class: 'badge-success' },
  'adjective-na': { label: 'な-Adjective', class: 'badge-success' },
  'noun': { label: 'Noun', class: 'badge-muted' },
  'adverb': { label: 'Adverb', class: 'badge-muted' },
  'particle': { label: 'Particle', class: 'badge-indigo' },
  'expression': { label: 'Expression', class: 'badge-gold' },
  'conjunction': { label: 'Conjunction', class: 'badge-muted' },
  'pronoun': { label: 'Pronoun', class: 'badge-muted' },
  'counter': { label: 'Counter', class: 'badge-muted' },
};

export function PartOfSpeechBadge({ pos }: { pos: string }) {
  const style = POS_LABELS[pos] ?? { label: pos, class: 'badge-muted' };
  return (
    <span className={`badge ${style.class}`}>{style.label}</span>
  );
}

// ============================================================
// AudioButton — plays audio or robust TTS for Japanese text
// ============================================================
import { SpeakerHigh } from '@phosphor-icons/react';
import { useState } from 'react';
import { playJapaneseAudio } from '@/utils/audio.utils';

interface AudioButtonProps {
  text: string;
  audioUrl?: string;
  lang?: string;
  size?: number;
  className?: string;
}

export function AudioButton({ text, audioUrl, size = 20, className = '' }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false);
  const soundEnabled = useUserStore(s => s.settings.soundEnabled);

  const play = async () => {
    if (!soundEnabled || playing) return;

    setPlaying(true);
    try {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        await new Promise<void>((resolve) => {
          audio.onended = () => resolve();
          audio.onerror = () => resolve();
          audio.play().catch(() => resolve());
        });
      } else {
        await playJapaneseAudio(text, 0.9);
      }
    } catch {
      // ignore
    } finally {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={play}
      className={`flex items-center justify-center rounded-lg transition-all ${className}`}
      style={{
        width: size + 16,
        height: size + 16,
        background: playing ? 'var(--color-vermillion-500)' : 'var(--color-base-700)',
        border: '1px solid var(--color-base-500)',
        color: playing ? '#fff' : 'var(--color-text-muted)',
        cursor: soundEnabled ? 'pointer' : 'not-allowed',
        opacity: soundEnabled ? 1 : 0.5,
      }}
      title={soundEnabled ? 'Play pronunciation' : 'Sound disabled in settings'}
      disabled={!soundEnabled}
      aria-label="Play pronunciation"
    >
      <SpeakerHigh size={size} weight={playing ? 'fill' : 'regular'} />
    </button>
  );
}

// ============================================================
// MasteryDot — small colored dot showing mastery level
// ============================================================
const MASTERY_COLORS: Record<string, string> = {
  new: 'var(--color-text-dim)',
  learning: '#60A0E0',
  familiar: '#50B880',
  mastered: 'var(--color-gold-400)',
  retained: 'var(--color-vermillion-400)',
};

const MASTERY_LABELS: Record<string, string> = {
  new: 'New',
  learning: 'Learning',
  familiar: 'Familiar',
  mastered: 'Mastered',
  retained: 'Retained',
};

export function MasteryDot({ level, showLabel = false }: { level: string; showLabel?: boolean }) {
  const color = MASTERY_COLORS[level] ?? MASTERY_COLORS.new;
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="w-2 h-2 rounded-full inline-block flex-shrink-0"
        style={{ background: color }}
      />
      {showLabel && (
        <span className="text-xs font-medium" style={{ color }}>
          {MASTERY_LABELS[level] ?? level}
        </span>
      )}
    </span>
  );
}
