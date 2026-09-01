import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkle, Lightning, Clock, Compass } from '@phosphor-icons/react';
import { useUserStore } from '@/stores/user.store';
import type { OnboardingState, LearningGoal } from '@/types/user.types';

const GOALS: Array<{ id: LearningGoal; label: string; jp: string; desc: string; icon: string }> = [
  { id: 'general', label: 'General Interest', jp: '趣味・教養', desc: 'Passionate about languages', icon: '🌸' },
  { id: 'travel', label: 'Travel in Japan', jp: '日本旅行', desc: 'Navigate, order & converse', icon: '🚅' },
  { id: 'media', label: 'Anime & Manga', jp: 'アニメ・漫画', desc: 'Understand raw Japanese', icon: '🎨' },
  { id: 'work', label: 'Career & Work', jp: 'ビジネス', desc: 'Professional fluency', icon: '💼' },
  { id: 'jlpt', label: 'JLPT Exam', jp: '日本語能力試験', desc: 'Pass JLPT N5 to N1', icon: '🎯' },
  { id: 'conversation', label: 'Daily Conversation', jp: '日常会話', desc: 'Connect with native speakers', icon: '🗣️' },
  { id: 'reading', label: 'Literature & News', jp: '読書・ニュース', desc: 'Read kanji effortlessly', icon: '📚' },
  { id: 'living', label: 'Living in Japan', jp: '移住・留学', desc: 'Daily life & bureaucracy', icon: '⛩️' },
];

const EXPERIENCE_LEVELS = [
  { id: 'zero', label: 'Absolute Beginner', jp: '初学者 (ゼロから)', desc: 'I know no Japanese or just starting out' },
  { id: 'beginner', label: 'Know Kana (N5)', jp: '入門・初級 (N5)', desc: 'I can read Hiragana & Katakana' },
  { id: 'intermediate', label: 'Elementary (N4–N3)', jp: '中級への挑戦 (N4–N3)', desc: 'I know basic grammar and common kanji' },
  { id: 'advanced', label: 'Advanced (N2–N1)', jp: '上級・流暢さ (N2–N1)', desc: 'Aiming for native-level command' },
];

const DAILY_GOALS: Array<{ minutes: 5 | 10 | 15 | 30 | 45 | 60; label: string; desc: string; pace: string }> = [
  { minutes: 5, label: '5 min / day', desc: 'Casual micro-sessions', pace: 'Light Pace' },
  { minutes: 10, label: '10 min / day', desc: 'Recommended steady habit', pace: 'Steady Pace' },
  { minutes: 15, label: '15 min / day', desc: 'Optimal retention speed', pace: 'Optimal' },
  { minutes: 30, label: '30 min / day', desc: 'Rapid conversational progress', pace: 'Committed' },
  { minutes: 45, label: '45 min / day', desc: 'Intensive exam preparation', pace: 'Intense' },
  { minutes: 60, label: '60 min / day', desc: 'Immersive deep dive', pace: 'Dedicated' },
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
  const progressPct = Math.round(((stepIndex + 1) / steps.length) * 100);

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
        ? prev.length > 1
          ? prev.filter(g => g !== goal)
          : prev
        : [...prev, goal]
    );
  };

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center p-4 sm:p-6 w-full"
      style={{ background: 'var(--color-base-900)', minHeight: '100dvh' }}
    >
      {/* ── TOP HEADER & PROGRESS ── */}
      <div className="w-full max-w-xl mx-auto mb-8 px-2" style={{ maxWidth: '36rem' }}>
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-[var(--color-vermillion-500)] text-white font-jp-serif font-bold flex items-center justify-center text-xs">
              続
            </span>
            <span className="font-bold tracking-widest" style={{ letterSpacing: '0.15em', color: 'var(--color-text-secondary)' }}>
              TSUZUKU
            </span>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Step {stepIndex + 1} of {steps.length}
          </span>
        </div>

        <div className="w-full bg-[var(--color-base-700)] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-[var(--color-vermillion-500)] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ── INTERACTIVE STEPS ── */}
      <div className="w-full max-w-xl mx-auto px-2" style={{ maxWidth: '36rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >

            {/* STEP 1: WELCOME */}
            {step === 'welcome' && (
              <div className="card p-8 sm:p-10 text-center space-y-6">
                <div
                  className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center font-jp-serif font-bold text-4xl shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-vermillion-500), var(--color-vermillion-700))',
                    color: '#fff',
                    boxShadow: '0 0 35px rgba(194, 51, 77, 0.35)',
                  }}
                >
                  続く
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    Welcome to TSUZUKU
                  </h1>
                  <p className="text-base text-muted max-w-md mx-auto leading-relaxed">
                    A high-standard, science-based Japanese platform. We store all progress safely in your device storage with zero server dependencies.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--color-base-700)] text-left text-xs space-y-2 border border-[var(--color-base-500)]">
                  <div className="font-semibold uppercase tracking-wider text-[var(--color-vermillion-400)] flex items-center gap-1.5">
                    <Sparkle size={14} weight="fill" /> Core Highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted">
                    <div>✓ FSRS Memory Scheduling</div>
                    <div>✓ Interactive Kanji Drawing Canvas</div>
                    <div>✓ Dynamic Conjugation Trees</div>
                    <div>✓ 100% Offline-Ready Storage</div>
                  </div>
                </div>

                <button
                  onClick={next}
                  className="btn btn-primary btn-xl w-full gap-2 shadow-lg"
                  id="btn-onboarding-start"
                >
                  Begin Setup <ArrowRight size={20} weight="bold" />
                </button>
              </div>
            )}

            {/* STEP 2: GOALS */}
            {step === 'goals' && (
              <div className="card p-6 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-vermillion-400)] mb-1">
                    Personalization
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    Why are you learning Japanese?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Select all that resonate with your goals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GOALS.map(goal => {
                    const isSelected = selectedGoals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleGoal(goal.id)}
                        className="p-3.5 rounded-xl text-left transition-all border flex items-start justify-between gap-3"
                        style={{
                          background: isSelected ? 'rgba(194, 51, 77, 0.15)' : 'var(--color-base-700)',
                          borderColor: isSelected ? 'var(--color-vermillion-500)' : 'var(--color-base-500)',
                        }}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{goal.icon}</span>
                            <span className="font-bold text-sm" style={{ color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                              {goal.label}
                            </span>
                          </div>
                          <div className="font-jp text-xs text-[var(--color-vermillion-400)] font-medium">
                            {goal.jp}
                          </div>
                          <div className="text-2xs text-muted">
                            {goal.desc}
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle size={18} weight="fill" className="flex-shrink-0 text-[var(--color-vermillion-400)] mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={back} className="btn btn-ghost btn-lg gap-1">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={next} className="btn btn-primary btn-lg flex-1 gap-2">
                    Continue <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EXPERIENCE LEVEL */}
            {step === 'experience' && (
              <div className="card p-6 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-indigo-400)] mb-1">
                    Proficiency
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    What is your starting level?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    You can take a full diagnostic test or switch levels at any time.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {EXPERIENCE_LEVELS.map(level => {
                    const isSelected = experience === level.id;
                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setExperience(level.id as OnboardingState['experienceLevel'])}
                        className="w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between gap-4"
                        style={{
                          background: isSelected ? 'rgba(74, 95, 193, 0.18)' : 'var(--color-base-700)',
                          borderColor: isSelected ? 'var(--color-indigo-400)' : 'var(--color-base-500)',
                        }}
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-sm sm:text-base" style={{ color: 'var(--color-text-primary)' }}>
                            {level.label}
                          </div>
                          <div className="font-jp text-xs text-[var(--color-indigo-300)] font-medium">
                            {level.jp}
                          </div>
                          <div className="text-xs text-muted">
                            {level.desc}
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle size={20} weight="fill" className="flex-shrink-0 text-[var(--color-indigo-400)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={back} className="btn btn-ghost btn-lg gap-1">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={next} className="btn btn-primary btn-lg flex-1 gap-2">
                    Continue <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: DAILY TIME COMMITMENT */}
            {step === 'time' && (
              <div className="card p-6 sm:p-8 space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-gold-400)] mb-1">
                    Daily Habit
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    How much time can you commit?
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Short daily consistency beats sporadic marathon sessions with spaced repetition.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DAILY_GOALS.map(goal => {
                    const isSelected = dailyMinutes === goal.minutes;
                    return (
                      <button
                        key={goal.minutes}
                        type="button"
                        onClick={() => setDailyMinutes(goal.minutes)}
                        className="p-4 rounded-xl text-left transition-all border flex items-center justify-between"
                        style={{
                          background: isSelected ? 'rgba(201, 149, 42, 0.18)' : 'var(--color-base-700)',
                          borderColor: isSelected ? 'var(--color-gold-400)' : 'var(--color-base-500)',
                        }}
                      >
                        <div>
                          <div className="font-bold text-sm sm:text-base text-white">
                            {goal.label}
                          </div>
                          <div className="text-2xs text-[var(--color-gold-300)] font-medium">
                            {goal.pace}
                          </div>
                          <div className="text-2xs text-muted">
                            {goal.desc}
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle size={20} weight="fill" className="flex-shrink-0 text-[var(--color-gold-400)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={back} className="btn btn-ghost btn-lg gap-1">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={next} className="btn btn-primary btn-lg flex-1 gap-2">
                    Review Profile <ArrowRight size={18} weight="bold" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SUMMARY & COMPLETION */}
            {step === 'complete' && (
              <div className="card p-8 sm:p-10 text-center space-y-6">
                <div
                  className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-success), #1B7A54)',
                    color: '#fff',
                    boxShadow: '0 0 30px rgba(46, 168, 123, 0.4)',
                  }}
                >
                  <CheckCircle size={44} weight="fill" />
                </div>

                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    Your Learning Path is Ready!
                  </h2>
                  <div className="font-jp text-base text-[var(--color-gold-400)] font-medium">
                    さあ、一緒に始めましょう。
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--color-base-700)] border border-[var(--color-base-500)] text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-muted">Target Time:</span>
                    <span className="font-bold text-white">{dailyMinutes} minutes / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Starting Level:</span>
                    <span className="font-bold text-[var(--color-vermillion-400)]">JLPT N5 (Foundations)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Storage:</span>
                    <span className="font-bold text-[var(--color-success)]">Local Phone / Device Storage</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="btn btn-primary btn-xl w-full gap-2 shadow-lg"
                  id="btn-onboarding-complete"
                >
                  Enter Dashboard <ArrowRight size={20} weight="bold" />
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
