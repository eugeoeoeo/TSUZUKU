import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import type { OnboardingState, LearningGoal } from '@/types/user.types';

const GOALS: Array<{ id: LearningGoal; label: string; jp: string; desc: string }> = [
  { id: 'general', label: 'General interest', jp: '趣味', desc: 'I enjoy learning languages' },
  { id: 'travel', label: 'Travel to Japan', jp: '旅行', desc: 'I plan to visit Japan' },
  { id: 'media', label: 'Anime & Manga', jp: 'アニメ', desc: 'Enjoy Japanese media without subs' },
  { id: 'work', label: 'Work / Business', jp: '仕事', desc: 'Japanese in a professional context' },
  { id: 'jlpt', label: 'JLPT Exam', jp: 'JLPT', desc: 'Pass a specific JLPT level' },
  { id: 'conversation', label: 'Conversation', jp: '会話', desc: 'Speak with Japanese speakers' },
  { id: 'reading', label: 'Reading', jp: '読書', desc: 'Read books, articles, manga' },
  { id: 'living', label: 'Living in Japan', jp: '移住', desc: 'I live or plan to live in Japan' },
];

const EXPERIENCE_LEVELS = [
  { id: 'zero', label: 'Absolute Beginner', jp: 'ゼロから', desc: 'I know no Japanese' },
  { id: 'beginner', label: 'Beginner', jp: '初心者', desc: 'I know some hiragana or basic words' },
  { id: 'intermediate', label: 'Intermediate', jp: '中級', desc: 'I can handle N4-N3 content' },
  { id: 'advanced', label: 'Advanced', jp: '上級', desc: 'N2 or above, looking to refine' },
];

const DAILY_GOALS: Array<{ minutes: 5 | 10 | 15 | 30 | 45 | 60; label: string }> = [
  { minutes: 5, label: '5 min / day · Light' },
  { minutes: 10, label: '10 min / day · Casual' },
  { minutes: 15, label: '15 min / day · Steady' },
  { minutes: 30, label: '30 min / day · Committed' },
  { minutes: 45, label: '45 min / day · Intense' },
  { minutes: 60, label: '60 min / day · Dedicated' },
];

type Step = 'welcome' | 'goals' | 'experience' | 'time' | 'complete';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useUserStore(s => s.completeOnboarding);

  const [step, setStep] = useState<Step>('welcome');
  const [selectedGoals, setSelectedGoals] = useState<LearningGoal[]>(['general']);
  const [experience, setExperience] = useState<OnboardingState['experienceLevel']>('zero');
  const [dailyMinutes, setDailyMinutes] = useState<OnboardingState['dailyMinutes']>(15);

  const steps: Step[] = ['welcome', 'goals', 'experience', 'time', 'complete'];
  const stepIndex = steps.indexOf(step);
  const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

  const next = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const back = () => {
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const handleFinish = () => {
    const state: OnboardingState = {
      step: 'complete',
      goals: selectedGoals,
      experienceLevel: experience,
      dailyMinutes,
      placementCompleted: false,
    };
    completeOnboarding(state);
    navigate('/dashboard');
  };

  const toggleGoal = (goal: LearningGoal) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center p-6"
      style={{ background: 'var(--color-base-900)' }}
    >
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold tracking-widest text-sm" style={{ letterSpacing: '0.15em', color: 'var(--color-text-muted)' }}>
            TSUZUKU
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {stepIndex + 1} / {steps.length}
          </span>
        </div>
        <div className="progress-track h-1">
          <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg"
        >

          {step === 'welcome' && (
            <div className="text-center">
              <div className="font-jp-serif font-bold mb-4" style={{ fontSize: '5rem', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                続く
              </div>
              <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>Welcome to TSUZUKU</h1>
              <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
                Your personalized path to Japanese mastery. Let's set up your learning profile in under a minute.
              </p>
              <button onClick={next} className="btn btn-primary btn-xl w-full" id="btn-onboarding-start">
                Let's begin <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 'goals' && (
            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>Why are you learning Japanese?</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Select all that apply.</p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {GOALS.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className="p-3 rounded-lg text-left transition-all border"
                    style={{
                      background: selectedGoals.includes(goal.id) ? 'rgba(194,51,77,0.15)' : 'var(--color-base-800)',
                      borderColor: selectedGoals.includes(goal.id) ? 'var(--color-vermillion-500)' : 'var(--color-base-500)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-jp text-sm" style={{ color: 'var(--color-text-muted)' }}>{goal.jp}</span>
                      {selectedGoals.includes(goal.id) && (
                        <CheckCircle size={14} weight="fill" style={{ color: 'var(--color-vermillion-400)' }} />
                      )}
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{goal.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn btn-ghost btn-lg flex-1">
                  <ArrowLeft size={18} /> Back
                </button>
                <button onClick={next} disabled={selectedGoals.length === 0} className="btn btn-primary btn-lg flex-2">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 'experience' && (
            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>What's your current level?</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>We'll tailor the curriculum to your starting point.</p>
              <div className="space-y-2 mb-8">
                {EXPERIENCE_LEVELS.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setExperience(level.id as OnboardingState['experienceLevel'])}
                    className="w-full p-4 rounded-lg text-left transition-all border"
                    style={{
                      background: experience === level.id ? 'rgba(194,51,77,0.15)' : 'var(--color-base-800)',
                      borderColor: experience === level.id ? 'var(--color-vermillion-500)' : 'var(--color-base-500)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{level.label}</div>
                        <div className="flex items-center gap-2">
                          <span className="font-jp text-sm" style={{ color: 'var(--color-text-muted)' }}>{level.jp}</span>
                          <span className="text-xs" style={{ color: 'var(--color-text-dim)' }}>· {level.desc}</span>
                        </div>
                      </div>
                      {experience === level.id && (
                        <CheckCircle size={18} weight="fill" style={{ color: 'var(--color-vermillion-400)' }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn btn-ghost btn-lg"><ArrowLeft size={18} /></button>
                <button onClick={next} className="btn btn-primary btn-lg flex-1">Continue <ArrowRight size={18} /></button>
              </div>
            </div>
          )}

          {step === 'time' && (
            <div>
              <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>How much time can you commit?</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>Even 5 minutes daily will produce real results with spaced repetition.</p>
              <div className="space-y-2 mb-8">
                {DAILY_GOALS.map(g => (
                  <button
                    key={g.minutes}
                    onClick={() => setDailyMinutes(g.minutes)}
                    className="w-full p-4 rounded-lg text-left transition-all border"
                    style={{
                      background: dailyMinutes === g.minutes ? 'rgba(194,51,77,0.15)' : 'var(--color-base-800)',
                      borderColor: dailyMinutes === g.minutes ? 'var(--color-vermillion-500)' : 'var(--color-base-500)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{g.label}</span>
                      {dailyMinutes === g.minutes && (
                        <CheckCircle size={18} weight="fill" style={{ color: 'var(--color-vermillion-400)' }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={back} className="btn btn-ghost btn-lg"><ArrowLeft size={18} /></button>
                <button onClick={next} className="btn btn-primary btn-lg flex-1">Continue <ArrowRight size={18} /></button>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'var(--color-vermillion-900)', border: '2px solid var(--color-vermillion-500)' }}>
                <CheckCircle size={32} weight="fill" style={{ color: 'var(--color-vermillion-400)' }} />
              </div>
              <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>You're all set!</h2>
              <p className="text-lg mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Your path has been created. {dailyMinutes} minutes per day.
              </p>
              <div className="font-jp text-jp-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
                さあ、始めましょう。
              </div>
              <button onClick={handleFinish} id="btn-onboarding-complete" className="btn btn-primary btn-xl w-full">
                Start Learning <ArrowRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
