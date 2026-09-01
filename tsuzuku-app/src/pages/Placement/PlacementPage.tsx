import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, Sparkle, X } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import type { JLPTLevel } from '@/types/curriculum.types';

interface DiagnosticQuestion {
  id: number;
  category: 'Kana' | 'Vocabulary' | 'Particle' | 'Conjugation' | 'Kanji' | 'Reading';
  level: JLPTLevel;
  prompt: string;
  promptJP?: string;
  options: string[];
  answer: string;
  explanation: string;
}

const PLACEMENT_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: 'Kana',
    level: 'N5',
    prompt: 'Which hiragana character represents the sound "su"?',
    options: ['す', 'せ', 'さ', 'そ'],
    answer: 'す',
    explanation: 'す is "su". せ is "se", さ is "sa", そ is "so".',
  },
  {
    id: 2,
    category: 'Vocabulary',
    level: 'N5',
    prompt: 'What is the Japanese word for "Water"?',
    options: ['みず (水)', 'おちゃ (お茶)', 'ごはん (ご飯)', 'ほん (本)'],
    answer: 'みず (水)',
    explanation: 'みず (水) is water. おちゃ is green tea, ごはん is meal/rice, ほん is book.',
  },
  {
    id: 3,
    category: 'Particle',
    level: 'N5',
    prompt: 'Choose the correct particle to complete the sentence: "私は図書館___勉強します。" (I study AT the library)',
    options: ['で', 'に', 'を', 'は'],
    answer: 'で',
    explanation: 'で marks the location where an action takes place (図書館で勉強する). に is used for movement destinations or existence.',
  },
  {
    id: 4,
    category: 'Conjugation',
    level: 'N5',
    prompt: 'What is the polite negative form of 食べる (to eat)?',
    options: ['食べません', '食べない', '食べました', '食べます'],
    answer: '食べません',
    explanation: '食べる is an Ichidan verb. The polite negative is 食べません (do not eat).',
  },
  {
    id: 5,
    category: 'Kanji',
    level: 'N5',
    prompt: 'What does the kanji "食" mean in words like 食堂 and 食べる?',
    options: ['Eat / Food', 'Drink', 'Study', 'Time'],
    answer: 'Eat / Food',
    explanation: '食 represents eat/food (ショク / たべる).',
  },
  {
    id: 6,
    category: 'Conjugation',
    level: 'N4',
    prompt: 'Which sentence correctly expresses "Please write your name"?',
    options: ['名前を書いてください。', '名前を書くください。', '名前を書きてください。', '名前を書きください。'],
    answer: '名前を書いてください。',
    explanation: 'Polite requests require the て-form: 書く → 書いて + ください。',
  },
  {
    id: 7,
    category: 'Particle',
    level: 'N4',
    prompt: 'Choose the correct expression: "日本語を話すこと___できます。" (I can speak Japanese)',
    options: ['が', 'を', 'に', 'で'],
    answer: 'が',
    explanation: 'The ability formula is: Dictionary form + ことができます (uses particle が).',
  },
  {
    id: 8,
    category: 'Reading',
    level: 'N3',
    prompt: 'What does this sentence mean? "雨が降っているにもかかわらず、試合は行われた。"',
    options: [
      'Despite the raining, the match was held.',
      'Because it rained, the match was cancelled.',
      'If it rains, the match will be held.',
      'While it was raining, the match started.',
    ],
    answer: 'Despite the raining, the match was held.',
    explanation: '〜にもかかわらず is an N3 expression meaning "despite / in spite of".',
  },
];

export default function PlacementPage() {
  const navigate = useNavigate();
  const updateProfile = useUserStore(s => s.updateProfile);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = PLACEMENT_QUESTIONS[currentIndex];
  const progressPct = Math.round(((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100);

  const handleSelectOption = (opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: opt }));

    if (currentIndex + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Evaluate results
  const calculateResult = () => {
    let score = 0;
    PLACEMENT_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) score++;
    });

    let estimatedLevel: JLPTLevel = 'N5';
    let startingUnit = 'n5-u1-hiragana';

    if (score >= 7) {
      estimatedLevel = 'N3';
      startingUnit = 'n3-u1-conditions-causes';
    } else if (score >= 5) {
      estimatedLevel = 'N4';
      startingUnit = 'n4-u1-verb-inflections';
    } else if (score >= 2) {
      estimatedLevel = 'N5';
      startingUnit = 'n5-u3-greetings-copula';
    }

    return { score, total: PLACEMENT_QUESTIONS.length, estimatedLevel, startingUnit };
  };

  const handleApplyResult = (level: JLPTLevel, unitId: string) => {
    updateProfile({ currentLevel: level, currentUnitId: unitId });
    navigate('/dashboard');
  };

  if (isFinished) {
    const { score, total, estimatedLevel, startingUnit } = calculateResult();

    return (
      <div className="min-h-dvh flex items-center justify-center p-6" style={{ background: 'var(--color-base-900)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-lg w-full p-8 text-center space-y-6"
        >
          <div
            className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-vermillion-500), var(--color-vermillion-700))',
              boxShadow: '0 0 30px rgba(194, 51, 77, 0.4)',
            }}
          >
            <Trophy size={40} weight="fill" style={{ color: '#fff' }} />
          </div>

          <div>
            <span className="badge badge-indigo text-xs uppercase tracking-wider mb-2">
              Diagnostic Assessment Results
            </span>
            <h2 className="text-3xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Recommended Level: {estimatedLevel}
            </h2>
            <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Diagnostic Score: {score} / {total} Correct
            </div>
          </div>

          <div className="p-4 rounded-xl text-left text-sm leading-relaxed space-y-2" style={{ background: 'var(--color-base-700)' }}>
            <div className="font-semibold text-xs text-muted uppercase tracking-wider">
              Diagnostic Summary
            </div>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Based on your responses, we have tailored your initial path to begin at <strong>JLPT {estimatedLevel}</strong>. You can switch levels at any time from the curriculum roadmap.
            </p>
          </div>

          <button
            onClick={() => handleApplyResult(estimatedLevel, startingUnit)}
            className="btn btn-primary btn-xl w-full gap-2"
          >
            Start Learning at {estimatedLevel} <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-base-900)' }}>
      {/* ── TOP BAR ── */}
      <header
        className="px-6 py-4 flex items-center justify-between border-b surface-blur"
        style={{ background: 'rgba(12, 12, 15, 0.9)', borderColor: 'var(--color-base-600)' }}
      >
        <Link
          to="/dashboard"
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--color-base-700)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X size={20} />
        </Link>

        <div className="flex-1 max-w-md mx-6">
          <div className="flex justify-between text-xs text-muted mb-1 font-mono">
            <span>Diagnostic Assessment</span>
            <span>{currentIndex + 1} / {PLACEMENT_QUESTIONS.length}</span>
          </div>
          <div className="progress-track h-2">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <span className="badge badge-muted text-xs font-mono">{currentQ.category}</span>
      </header>

      {/* ── QUESTION AREA ── */}
      <main className="flex-1 max-w-xl w-full mx-auto p-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="badge badge-indigo text-xs mb-3">{currentQ.level} Question</span>
              <h2 className="text-xl md:text-2xl font-bold leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                {currentQ.prompt}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className="card card-interactive p-4 text-left flex items-center gap-3 transition-all hover:border-[var(--color-vermillion-500)]"
                >
                  <span
                    className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono"
                    style={{ background: 'var(--color-base-700)', color: 'var(--color-text-muted)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-jp text-jp-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
