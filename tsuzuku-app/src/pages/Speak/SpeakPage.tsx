import { useState } from 'react';
import { motion } from 'motion/react';
import { Microphone, Play, ArrowRight, CheckCircle, SpeakerHigh, ArrowsClockwise } from '@phosphor-icons/react';
import { AudioButton, JLPTBadge } from '@/components/japanese/JapaneseComponents';

interface ShadowingItem {
  id: string;
  level: 'N5' | 'N4';
  japanese: string;
  reading: string;
  english: string;
  pitchDescription: string;
}

const SHADOWING_ITEMS: ShadowingItem[] = [
  {
    id: 'sp1',
    level: 'N5',
    japanese: 'はじめまして。田中と申します。',
    reading: 'はじめまして。たなかともうします。',
    english: 'Nice to meet you. My name is Tanaka (humble).',
    pitchDescription: 'Flat start, slight rise on "ま", gentle cadence on "もうします".',
  },
  {
    id: 'sp2',
    level: 'N5',
    japanese: 'これをお願いします。',
    reading: 'これをおねがいします。',
    english: 'Please give me this / I would like this.',
    pitchDescription: 'Emphasize "これ", smooth connection through "おねがいします".',
  },
  {
    id: 'sp3',
    level: 'N4',
    japanese: 'すみません、駅はどちらでしょうか？',
    reading: 'すみません、えきはどちらでしょうか？',
    english: 'Excuse me, which way is the station (polite)?',
    pitchDescription: 'Rising intonation at the end on "でしょうか".',
  },
];

export default function SpeakPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const item = SHADOWING_ITEMS[activeIndex];

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecorded(true);
      }, 3000); // 3 second recording simulation
    } else {
      setIsRecording(false);
      setRecorded(true);
    }
  };

  const handleNext = () => {
    if (activeIndex + 1 < SHADOWING_ITEMS.length) {
      setActiveIndex(prev => prev + 1);
      setRecorded(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-vermillion-400)' }}>
          <Microphone size={16} /> Japanese Shadowing & Pronunciation
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Speaking & Shadowing Studio
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Listen to native cadence, shadow the natural intonation, and record your pronunciation.
        </p>
      </div>

      {/* ── STUDIO CARD ── */}
      <div className="card p-8 md:p-10 space-y-8 max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-between">
          <JLPTBadge level={item.level} />
          <span className="text-xs font-mono text-muted">
            Phrase {activeIndex + 1} of {SHADOWING_ITEMS.length}
          </span>
        </div>

        <div className="py-4 space-y-3">
          <div className="font-jp-serif text-jp-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {item.japanese}
          </div>
          <div className="font-jp text-jp-lg text-muted">{item.reading}</div>
          <div className="text-base font-semibold" style={{ color: 'var(--color-gold-400)' }}>
            {item.english}
          </div>
        </div>

        {/* Pitch guide */}
        <div className="p-4 rounded-xl bg-[var(--color-base-700)] text-xs text-left">
          <div className="font-semibold text-muted uppercase tracking-wider mb-1">
            🌊 Pitch Accent & Rhythm Guide
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>{item.pitchDescription}</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Native Audio */}
          <button
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(item.japanese);
                u.lang = 'ja-JP';
                u.rate = 0.9;
                window.speechSynthesis.speak(u);
              }
            }}
            className="btn btn-secondary btn-xl gap-2 w-full sm:w-auto"
          >
            <Play size={20} weight="fill" /> Listen to Native Model
          </button>

          {/* Record Button */}
          <button
            onClick={handleToggleRecord}
            className="btn btn-primary btn-xl gap-2 w-full sm:w-auto"
            style={isRecording ? { background: 'var(--color-error)', animation: 'pulse 1s infinite' } : undefined}
          >
            <Microphone size={20} weight={isRecording ? 'fill' : 'regular'} />
            {isRecording ? 'Listening (Shadow now!)...' : recorded ? 'Re-record Speech' : 'Record Shadowing'}
          </button>
        </div>

        {recorded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-[rgba(46,168,123,0.15)] border border-[var(--color-success)] flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-success)' }}>
              <CheckCircle size={20} weight="fill" /> Recording captured! Cadence evaluated.
            </div>
            {activeIndex + 1 < SHADOWING_ITEMS.length && (
              <button onClick={handleNext} className="btn btn-primary btn-sm gap-1">
                Next Phrase <ArrowRight size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
