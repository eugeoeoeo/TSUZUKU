import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from '@phosphor-icons/react';
import { checkAnswer, romajiToHiragana } from '@/utils/answer.utils';
import type { Exercise } from '@/types/curriculum.types';

interface JapaneseTypingExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  disabled?: boolean;
}

export function JapaneseTypingExercise({
  exercise,
  onAnswer,
  disabled = false,
}: JapaneseTypingExerciseProps) {
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserInput('');
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [exercise.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Auto-convert Romaji to Hiragana if enabled/applicable
    const converted = romajiToHiragana(val);
    setUserInput(converted);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (submitted || disabled || !userInput.trim()) return;

    const result = checkAnswer(userInput, exercise.answer, exercise.acceptedAnswers, {
      allowRomaji: true,
      strict: false,
    });

    setSubmitted(true);
    setIsCorrect(result.isCorrect);
    onAnswer(result.isCorrect, userInput);
  };

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-indigo-400)' }}>
          Active Recall Typing
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {exercise.prompt}
        </h3>
        {exercise.promptJP && (
          <div className="font-jp text-jp-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            {exercise.promptJP}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={disabled || submitted}
            placeholder="Type in Hiragana or Romaji..."
            className="input input-jp"
            style={{
              borderColor: submitted
                ? isCorrect
                  ? 'var(--color-success)'
                  : 'var(--color-error)'
                : 'var(--color-base-500)',
              background: 'var(--color-base-800)',
            }}
          />

          {submitted && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isCorrect ? (
                <CheckCircle size={24} weight="fill" style={{ color: 'var(--color-success)' }} />
              ) : (
                <XCircle size={24} weight="fill" style={{ color: 'var(--color-error)' }} />
              )}
            </div>
          )}
        </div>

        {/* Romaji helper badge */}
        <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--color-text-dim)' }}>
          <span>💡 Tip: Romaji automatically transforms into Hiragana</span>
          {exercise.hints.length > 0 && !submitted && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 hover:text-white transition-colors"
              style={{ color: 'var(--color-gold-400)' }}
            >
              <Lightbulb size={14} />
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
          )}
        </div>

        {showHint && exercise.hints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg text-xs"
            style={{ background: 'rgba(201, 149, 42, 0.15)', border: '1px solid rgba(201, 149, 42, 0.3)', color: 'var(--color-gold-200)' }}
          >
            {exercise.hints[0]}
          </motion.div>
        )}

        {!submitted && (
          <button
            type="submit"
            disabled={!userInput.trim() || disabled}
            className="btn btn-primary btn-lg w-full gap-2"
          >
            Check Answer <ArrowRight size={18} />
          </button>
        )}
      </form>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-sm leading-relaxed"
          style={{
            background: 'var(--color-base-800)',
            border: '1px solid var(--color-base-500)',
          }}
        >
          {!isCorrect && (
            <div className="mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-error)' }}>
                Correct Answer:{' '}
              </span>
              <span className="font-jp font-bold text-jp-base" style={{ color: 'var(--color-text-primary)' }}>
                {exercise.answer}
              </span>
            </div>
          )}
          <div className="font-semibold text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--color-text-muted)' }}>
            Explanation
          </div>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            {exercise.explanation}
          </div>
        </motion.div>
      )}
    </div>
  );
}
