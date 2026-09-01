import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import type { Exercise } from '@/types/curriculum.types';

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  disabled?: boolean;
}

export function MultipleChoiceExercise({
  exercise,
  onAnswer,
  disabled = false,
}: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = exercise.options ?? [];

  useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [exercise.id]);

  const handleSelect = (opt: string) => {
    if (submitted || disabled) return;
    setSelectedOption(opt);
    setSubmitted(true);
    const isCorrect = opt === exercise.answer || exercise.acceptedAnswers.includes(opt);
    onAnswer(isCorrect, opt);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-vermillion-400)' }}>
          Multiple Choice Drill
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

      <div className="grid grid-cols-1 gap-2.5">
        {options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          const isCorrectAnswer = opt === exercise.answer || exercise.acceptedAnswers.includes(opt);

          let btnClass = 'card card-interactive p-4 text-left flex items-center justify-between transition-all';
          let borderStyle = '1px solid var(--color-base-500)';
          let bgStyle = 'var(--color-base-800)';

          if (submitted) {
            if (isCorrectAnswer) {
              borderStyle = '1px solid var(--color-success)';
              bgStyle = 'rgba(46, 168, 123, 0.15)';
            } else if (isSelected && !isCorrectAnswer) {
              borderStyle = '1px solid var(--color-error)';
              bgStyle = 'rgba(232, 64, 64, 0.15)';
            } else {
              bgStyle = 'var(--color-base-850)';
            }
          } else if (isSelected) {
            borderStyle = '1px solid var(--color-vermillion-500)';
            bgStyle = 'rgba(194, 51, 77, 0.15)';
          }

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: disabled || submitted ? 1 : 0.98 }}
              onClick={() => handleSelect(opt)}
              disabled={disabled || submitted}
              className={btnClass}
              style={{
                background: bgStyle,
                border: borderStyle,
                cursor: submitted ? 'default' : 'pointer',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'var(--color-base-700)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {i + 1}
                </span>
                <span className="font-jp text-jp-base font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {opt}
                </span>
              </div>

              {submitted && isCorrectAnswer && (
                <CheckCircle size={20} weight="fill" style={{ color: 'var(--color-success)' }} />
              )}
              {submitted && isSelected && !isCorrectAnswer && (
                <XCircle size={20} weight="fill" style={{ color: 'var(--color-error)' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-sm leading-relaxed mt-4"
          style={{
            background: 'var(--color-base-800)',
            border: '1px solid var(--color-base-500)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div className="font-semibold text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--color-text-muted)' }}>
            Explanation
          </div>
          {exercise.explanation}
        </motion.div>
      )}
    </div>
  );
}
