import { useState } from 'react';
import { motion } from 'motion/react';
import { Headphones, Play, ArrowRight, CheckCircle, XCircle, ArrowCounterClockwise, Eye } from '@phosphor-icons/react';
import { checkAnswer, romajiToHiragana } from '@/utils/answer.utils';
import { playJapaneseAudio } from '@/utils/audio.utils';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

interface ListeningDrill {
  id: string;
  level: 'N5' | 'N4';
  title: string;
  japanese: string;
  reading: string;
  english: string;
  prompt: string;
  acceptedAnswers: string[];
}

const LISTENING_DRILLS: ListeningDrill[] = [
  {
    id: 'l1',
    level: 'N5',
    title: 'Daily Greeting',
    japanese: 'おはようございます',
    reading: 'おはようございます',
    english: 'Good morning (formal)',
    prompt: 'Listen to the audio and type what you hear in Hiragana:',
    acceptedAnswers: ['おはようございます', 'ohayougozaimasu', 'ohayogozaimasu'],
  },
  {
    id: 'l2',
    level: 'N5',
    title: 'Order in a Restaurant',
    japanese: 'お水をください',
    reading: 'おみずをください',
    english: 'Please give me some water',
    prompt: 'Listen to the audio and type the phrase:',
    acceptedAnswers: ['お水をください', 'おみずをください', 'omizuokudasai', 'omizuwokudasai'],
  },
  {
    id: 'l3',
    level: 'N5',
    title: 'Daily Routine',
    japanese: '毎日日本語を勉強します',
    reading: 'まいにちにほんごをべんきょうします',
    english: 'I study Japanese every day',
    prompt: 'Listen to the audio and type the sentence:',
    acceptedAnswers: ['毎日日本語を勉強します', 'まいにちにほんごをべんきょうします', 'mainichinihongowobenkyoushimasu'],
  },
];

export default function ListenPage() {
  const [activeDrillIndex, setActiveDrillIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const drill = LISTENING_DRILLS[activeDrillIndex];

  const playAudio = (rate = 1.0) => {
    playJapaneseAudio(drill.japanese, rate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(romajiToHiragana(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || submitted) return;

    const res = checkAnswer(userInput, drill.japanese, drill.acceptedAnswers, { allowRomaji: true });
    setSubmitted(true);
    setIsCorrect(res.isCorrect);
  };

  const handleNext = () => {
    if (activeDrillIndex + 1 < LISTENING_DRILLS.length) {
      setActiveDrillIndex(prev => prev + 1);
      setUserInput('');
      setSubmitted(false);
      setIsCorrect(false);
      setShowTranscript(false);
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-indigo-400)' }}>
          <Headphones size={16} /> Audio Dictation & Listening Lab
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Listening & Dictation Practice
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Train your ear to natural-speed Japanese phonetics through audio playback and real-time dictation.
        </p>
      </div>

      {/* ── DRILL CARD ── */}
      <div className="card p-8 md:p-10 space-y-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <JLPTBadge level={drill.level} />
          <span className="text-xs font-mono text-muted">
            Drill {activeDrillIndex + 1} of {LISTENING_DRILLS.length}
          </span>
        </div>

        <div className="text-center space-y-4 py-4">
          <div className="text-sm text-muted">{drill.prompt}</div>

          {/* Audio Player Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => playAudio(1.0)}
              className="btn btn-primary btn-xl gap-2 px-8"
              id="btn-play-audio-normal"
            >
              <Play size={20} weight="fill" /> Play Audio (1.0x)
            </button>
            <button
              onClick={() => playAudio(0.75)}
              className="btn btn-secondary btn-xl gap-1.5 px-4"
              title="Play 0.75x slow speed"
            >
              0.75x Slow
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={submitted}
            placeholder="Type what you hear (Hiragana or Romaji)..."
            className="input input-jp"
          />

          {!submitted ? (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="btn btn-primary btn-lg w-full gap-2"
            >
              Submit Dictation <ArrowRight size={18} />
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: isCorrect ? 'rgba(46, 168, 123, 0.15)' : 'rgba(232, 64, 64, 0.15)', border: `1px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}` }}>
                <div className="flex items-center gap-3">
                  {isCorrect ? <CheckCircle size={24} weight="fill" style={{ color: 'var(--color-success)' }} /> : <XCircle size={24} weight="fill" style={{ color: 'var(--color-error)' }} />}
                  <div>
                    <div className="font-bold text-sm" style={{ color: isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}>
                      {isCorrect ? 'Accurate Dictation!' : 'Not Quite Right'}
                    </div>
                    <div className="font-jp text-sm mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
                      Target: {drill.japanese}
                    </div>
                  </div>
                </div>
              </div>

              {activeDrillIndex + 1 < LISTENING_DRILLS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary btn-xl w-full gap-2"
                >
                  Next Listening Drill <ArrowRight size={18} />
                </button>
              ) : (
                <div className="text-center p-4 text-sm font-bold text-success">
                  🎉 All listening drills completed!
                </div>
              )}
            </div>
          )}
        </form>

        {/* Transcript toggle */}
        <div className="pt-2 border-t border-[var(--color-base-700)] text-center">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-xs text-muted hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Eye size={14} /> {showTranscript ? 'Hide Full Transcript' : 'Reveal Full Transcript'}
          </button>
          {showTranscript && (
            <div className="mt-3 p-3 rounded-lg bg-[var(--color-base-700)] text-left text-xs font-jp space-y-1">
              <div><strong>Kanji:</strong> {drill.japanese}</div>
              <div><strong>Furigana:</strong> {drill.reading}</div>
              <div><strong>English:</strong> {drill.english}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
