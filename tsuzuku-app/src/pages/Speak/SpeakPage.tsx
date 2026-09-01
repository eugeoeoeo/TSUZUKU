import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Microphone, Play, ArrowRight, CheckCircle, SpeakerHigh,
  ArrowsClockwise, Stop, UserSound
} from '@phosphor-icons/react';
import { AudioButton, JLPTBadge } from '@/components/japanese/JapaneseComponents';
import { playJapaneseAudio, MicrophoneRecorder } from '@/utils/audio.utils';
import { useToast } from '@/components/ui/Toast';

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
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<MicrophoneRecorder | null>(null);
  const toast = useToast();

  const item = SHADOWING_ITEMS[activeIndex];

  const handleStartRecord = async () => {
    recorderRef.current = new MicrophoneRecorder();
    const success = await recorderRef.current.start();
    if (success) {
      setIsRecording(true);
      setUserAudioUrl(null);
      toast.info('Microphone active — speak clearly now!');
    } else {
      toast.error('Could not access microphone. Please allow mic permissions in your browser.');
    }
  };

  const handleStopRecord = async () => {
    if (!recorderRef.current) return;
    setIsRecording(false);
    const audioBlob = await recorderRef.current.stop();
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setUserAudioUrl(url);
      toast.success('Audio captured! Play back to compare with native model.');
    }
  };

  const handlePlayUserAudio = () => {
    if (userAudioUrl) {
      const audio = new Audio(userAudioUrl);
      audio.play();
    }
  };

  const handleNext = () => {
    if (activeIndex + 1 < SHADOWING_ITEMS.length) {
      setActiveIndex(prev => prev + 1);
      setUserAudioUrl(null);
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold text-[var(--color-vermillion-400)]">
          <Microphone size={16} /> Japanese Shadowing & Pronunciation
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Speaking & Shadowing Studio
        </h1>
        <p className="text-xs sm:text-sm mt-1 text-muted">
          Listen to native pitch cadence, shadow the phrasing, and record your voice using your microphone.
        </p>
      </div>

      {/* ── STUDIO CARD ── */}
      <div className="card p-6 sm:p-10 space-y-8 max-w-2xl mx-auto text-center border-[var(--color-base-500)]">
        <div className="flex items-center justify-between">
          <JLPTBadge level={item.level} />
          <span className="text-xs font-mono text-muted">
            Phrase {activeIndex + 1} of {SHADOWING_ITEMS.length}
          </span>
        </div>

        <div className="py-4 space-y-3">
          <div className="font-jp-serif text-3xl sm:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            {item.japanese}
          </div>
          <div className="font-jp text-base sm:text-lg text-muted">{item.reading}</div>
          <div className="text-base font-semibold text-[var(--color-gold-400)]">
            {item.english}
          </div>
        </div>

        {/* Pitch guide */}
        <div className="p-4 rounded-xl bg-[var(--color-base-700)] text-xs text-left border border-[var(--color-base-600)] space-y-1">
          <div className="font-semibold text-[var(--color-indigo-300)] uppercase tracking-wider">
            🌊 Pitch Accent & Rhythm Guide
          </div>
          <p className="text-white/80">{item.pitchDescription}</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Native Audio */}
          <button
            type="button"
            onClick={() => playJapaneseAudio(item.japanese, 0.85)}
            className="btn btn-secondary btn-xl gap-2 w-full sm:w-auto shadow-lg"
          >
            <Play size={20} weight="fill" /> Listen to Native Model
          </button>

          {/* Record Button */}
          {!isRecording ? (
            <button
              type="button"
              onClick={handleStartRecord}
              className="btn btn-primary btn-xl gap-2 w-full sm:w-auto shadow-lg"
            >
              <Microphone size={20} weight="fill" />
              {userAudioUrl ? 'Record Again' : 'Record Shadowing'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStopRecord}
              className="btn btn-xl gap-2 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white animate-pulse"
            >
              <Stop size={20} weight="fill" /> Stop Recording
            </button>
          )}
        </div>

        {/* Recorded Audio Feedback */}
        {userAudioUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-xl bg-[rgba(46,168,123,0.12)] border border-[var(--color-success)] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-success)]">
              <CheckCircle size={22} weight="fill" />
              <span>Voice recorded! Listen & compare:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayUserAudio}
                className="btn btn-secondary btn-sm gap-1.5"
              >
                <Play size={15} weight="fill" /> Play My Voice
              </button>

              {activeIndex + 1 < SHADOWING_ITEMS.length && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary btn-sm gap-1"
                >
                  Next Phrase <ArrowRight size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
