import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, ArrowCounterClockwise } from '@phosphor-icons/react';
import type { Exercise, SentenceToken } from '@/types/curriculum.types';

interface SentenceBuilderExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  disabled?: boolean;
}

export function SentenceBuilderExercise({
  exercise,
  onAnswer,
  disabled = false,
}: SentenceBuilderExerciseProps) {
  const [availableTokens, setAvailableTokens] = useState<SentenceToken[]>([]);
  const [placedTokens, setPlacedTokens] = useState<SentenceToken[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Shuffle tokens on load
    const tokens = (exercise.tokens ?? []).map(t => ({ ...t }));
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    setAvailableTokens(shuffled);
    setPlacedTokens([]);
    setSubmitted(false);
    setIsCorrect(false);
  }, [exercise.id]);

  const handlePlaceToken = (token: SentenceToken) => {
    if (submitted || disabled) return;
    setAvailableTokens(prev => prev.filter(t => t.id !== token.id));
    setPlacedTokens(prev => [...prev, token]);
  };

  const handleRemoveToken = (token: SentenceToken) => {
    if (submitted || disabled) return;
    setPlacedTokens(prev => prev.filter(t => t.id !== token.id));
    setAvailableTokens(prev => [...prev, token]);
  };

  const handleReset = () => {
    if (submitted || disabled) return;
    const tokens = (exercise.tokens ?? []).map(t => ({ ...t }));
    setAvailableTokens(tokens);
    setPlacedTokens([]);
  };

  const handleCheck = () => {
    if (submitted || disabled || placedTokens.length === 0) return;

    // Join placed tokens into sentence string
    const formed = placedTokens.map(t => t.text).join('');
    const formedWithSpaces = placedTokens.map(t => t.text).join(' ');

    const clean = (s: string) => s.replace(/\s+/g, '').replace(/[。、]/g, '');

    const correctClean = clean(exercise.answer);
    const formedClean = clean(formed);

    const matches = formedClean === correctClean ||
      exercise.acceptedAnswers.some(a => clean(a) === formedClean) ||
      exercise.acceptedAnswers.includes(formedWithSpaces);

    setSubmitted(true);
    setIsCorrect(matches);
    onAnswer(matches, formed);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-gold-400)' }}>
          Sentence Construction
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {exercise.prompt}
        </h3>
      </div>

      {/* Target drop / placed zone */}
      <div
        className="min-h-24 p-4 rounded-xl flex flex-wrap items-center gap-2 transition-all border"
        style={{
          background: submitted
            ? isCorrect
              ? 'rgba(46, 168, 123, 0.1)'
              : 'rgba(232, 64, 64, 0.1)'
            : 'var(--color-base-800)',
          borderColor: submitted
            ? isCorrect
              ? 'var(--color-success)'
              : 'var(--color-error)'
            : 'var(--color-base-500)',
        }}
      >
        {placedTokens.length === 0 ? (
          <div className="w-full text-center text-sm italic" style={{ color: 'var(--color-text-dim)' }}>
            Tap words below to arrange the Japanese sentence...
          </div>
        ) : (
          <AnimatePresence>
            {placedTokens.map(token => (
              <motion.button
                key={token.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleRemoveToken(token)}
                disabled={submitted || disabled}
                className="sentence-token"
                style={{
                  background: 'var(--color-base-700)',
                  borderColor: 'var(--color-base-400)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {token.reading ? (
                  <ruby>
                    {token.text}
                    <rt style={{ fontSize: '0.6em', color: 'var(--color-text-muted)' }}>{token.reading}</rt>
                  </ruby>
                ) : (
                  token.text
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Available source tokens */}
      <div className="flex flex-wrap justify-center gap-2 p-2 min-h-16">
        <AnimatePresence>
          {availableTokens.map(token => (
            <motion.button
              key={token.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => handlePlaceToken(token)}
              disabled={submitted || disabled}
              className="sentence-token"
            >
              {token.reading ? (
                <ruby>
                  {token.text}
                  <rt style={{ fontSize: '0.6em', color: 'var(--color-text-muted)' }}>{token.reading}</rt>
                </ruby>
              ) : (
                token.text
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {!submitted && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={placedTokens.length === 0 || disabled}
            className="btn btn-ghost btn-lg"
            title="Reset sentence"
          >
            <ArrowCounterClockwise size={18} />
          </button>
          <button
            type="button"
            onClick={handleCheck}
            disabled={placedTokens.length === 0 || disabled}
            className="btn btn-primary btn-lg flex-1 gap-2"
          >
            Check Sentence <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* Feedback explanation */}
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
          <div className="flex items-center gap-2 mb-2 font-bold">
            {isCorrect ? (
              <span className="flex items-center gap-1.5" style={{ color: 'var(--color-success)' }}>
                <CheckCircle size={18} weight="fill" /> Correct Structure!
              </span>
            ) : (
              <span className="flex items-center gap-1.5" style={{ color: 'var(--color-error)' }}>
                <XCircle size={18} weight="fill" /> Incorrect Order
              </span>
            )}
          </div>

          {!isCorrect && (
            <div className="mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                Target Sentence:{' '}
              </span>
              <span className="font-jp font-bold text-jp-base" style={{ color: 'var(--color-text-primary)' }}>
                {exercise.promptJP ?? exercise.answer}
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
