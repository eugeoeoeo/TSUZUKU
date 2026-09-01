import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Lightning, Brain, PencilSimple, ChartLine, CheckCircle } from '@phosphor-icons/react';
import { KanaCanvas } from '@/components/layout/KanaCanvas';

const LEVELS = [
  { id: 'N5', jp: '五', label: 'N5', desc: 'Hiragana, Katakana, 100 kanji, survival phrases', color: '#3BAF8C' },
  { id: 'N4', jp: '四', label: 'N4', desc: 'Elementary grammar, 300 kanji, daily conversations', color: '#5090D0' },
  { id: 'N3', jp: '三', label: 'N3', desc: 'Intermediate grammar, 650 kanji, news topics', color: '#A070D8' },
  { id: 'N2', jp: '二', label: 'N2', desc: 'Upper-intermediate, 1000 kanji, complex texts', color: '#D0A030' },
  { id: 'N1', jp: '一', label: 'N1', desc: 'Advanced mastery, 2000+ kanji, native content', color: '#C2334D' },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'FSRS Spaced Repetition',
    titleJP: '記憶最適化',
    desc: 'State-of-the-art memory scheduling ensures you review items at the perfect moment — not too soon, not too late.',
  },
  {
    icon: Lightning,
    title: 'Grammar Visualizer',
    titleJP: '文法ビジュアル',
    desc: 'Verb conjugation trees you can click through. See every form branch off the dictionary form in real-time.',
  },
  {
    icon: PencilSimple,
    title: 'Kanji Writing Practice',
    titleJP: '漢字書き練習',
    desc: 'Animated stroke order powered by Hanzi Writer. Trace characters on a responsive canvas and check your accuracy.',
  },
  {
    icon: ChartLine,
    title: 'Adaptive Learning Path',
    titleJP: '適応型学習',
    desc: 'Your weak points surface automatically. The system generates a daily plan optimized for your mastery gaps.',
  },
];

const LEARNING_LOOP = [
  { label: 'Expose', jp: '出会い', desc: 'First contact with new vocabulary, grammar, and kanji in context.' },
  { label: 'Explain', jp: '解説', desc: 'Clear, English-first explanations with formation rules and examples.' },
  { label: 'Recognize', jp: '認識', desc: 'Multiple choice and listening exercises to build passive recognition.' },
  { label: 'Recall', jp: '想起', desc: 'Active retrieval practice — type readings and meanings from memory.' },
  { label: 'Produce', jp: '産出', desc: 'Sentence construction, translation, and open-ended production.' },
  { label: 'Apply', jp: '応用', desc: 'Real reading and listening passages where all learned items appear.' },
  { label: 'Review', jp: '復習', desc: 'SRS-scheduled reviews keep mastered items from fading.' },
  { label: 'Reuse', jp: '再利用', desc: 'Vocabulary and grammar reappear across all future levels.' },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh" style={{ background: 'var(--color-base-900)' }}>
      <KanaCanvas />

      {/* ── NAVBAR ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-jp-serif font-bold text-lg"
            style={{ background: 'var(--color-vermillion-500)', color: '#fff' }}
          >
            続
          </div>
          <span className="font-bold tracking-widest text-sm" style={{ letterSpacing: '0.15em', color: 'var(--color-text-primary)' }}>
            TSUZUKU
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
          <a href="#method" className="hover:text-white transition-colors">Method</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="btn btn-ghost btn-sm hidden md:inline-flex">
            Log in
          </Link>
          <Link to="/onboarding" className="btn btn-primary btn-sm" id="cta-nav">
            Start Free
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Overline */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className="badge badge-vermillion"
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.7rem', letterSpacing: '0.08em' }}
            >
              N5 → N1 · JLPT-ALIGNED CURRICULUM
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl lg:text-7xl font-black tracking-tight mb-4 leading-none"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
          >
            Master Japanese.
            <br />
            <span className="text-gradient-vermillion">Level by level.</span>
          </h1>

          {/* JP subheadline */}
          <div
            className="font-jp-serif text-jp-xl mb-6 mt-4"
            style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}
          >
            日本語を、続けよう。
          </div>

          {/* Description */}
          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A science-backed platform that teaches real Japanese — from your first hiragana stroke through native-level comprehension. Built on FSRS spaced repetition, real grammar visualization, and a living curriculum.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/onboarding"
              id="cta-hero-primary"
              className="btn btn-primary btn-xl gap-2"
            >
              Start Learning Free
              <ArrowRight size={20} weight="bold" />
            </Link>
            <Link
              to="/dashboard"
              id="cta-hero-secondary"
              className="btn btn-secondary btn-xl"
            >
              View Demo
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['No credit card needed', 'All 5 JLPT levels', 'FSRS-powered SRS'].map((s) => (
              <div key={s} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <CheckCircle size={14} weight="fill" style={{ color: 'var(--color-success)' }} />
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* N5 → N1 Level strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: 'var(--color-text-dim)', letterSpacing: '0.12em' }}
          >
            Five stages of mastery
          </div>
          <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--color-base-500)' }}>
            {LEVELS.map((level, i) => (
              <div
                key={level.id}
                className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 text-center relative group cursor-pointer transition-all"
                style={{
                  background: i === 0 ? `${level.color}18` : 'var(--color-base-800)',
                  borderRight: i < LEVELS.length - 1 ? '1px solid var(--color-base-500)' : 'none',
                }}
              >
                {i === 0 && (
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: level.color }}
                  />
                )}
                <div
                  className="font-jp-serif font-bold mb-2 transition-colors"
                  style={{
                    fontSize: '1.8rem',
                    color: i === 0 ? level.color : 'var(--color-text-dim)',
                    lineHeight: 1,
                  }}
                >
                  {level.jp}
                </div>
                <div
                  className="font-bold text-sm mb-1"
                  style={{ color: i === 0 ? level.color : 'var(--color-text-muted)' }}
                >
                  {level.label}
                </div>
                <div className="text-xs hidden lg:block" style={{ color: 'var(--color-text-dim)', lineHeight: 1.4 }}>
                  {level.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-indigo mb-4">Core Features</div>
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              Built for serious learners.
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Every feature exists for one reason: faster, deeper retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--color-vermillion-900)', border: '1px solid var(--color-vermillion-700)' }}
                  >
                    <feature.icon size={20} style={{ color: 'var(--color-vermillion-400)' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{feature.title}</h3>
                      <span className="font-jp text-sm" style={{ color: 'var(--color-text-dim)' }}>{feature.titleJP}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING LOOP ── */}
      <section id="method" className="relative z-10 px-6 lg:px-12 py-24" style={{ borderTop: '1px solid var(--color-base-600)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-vermillion mb-4">The Method</div>
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              The Learning Loop
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Every item moves through 8 stages — from first encounter to permanent retention.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {LEARNING_LOOP.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="card p-4 text-center"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold"
                  style={{
                    background: 'var(--color-vermillion-900)',
                    border: '1px solid var(--color-vermillion-700)',
                    color: 'var(--color-vermillion-400)',
                  }}
                >
                  {i + 1}
                </div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                  {stage.label}
                </div>
                <div className="font-jp text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  {stage.jp}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                  {stage.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="relative z-10 px-6 lg:px-12 py-24 text-center" style={{ borderTop: '1px solid var(--color-base-600)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="font-jp-serif text-jp-3xl mb-4" style={{ color: 'var(--color-text-dim)' }}>続く</div>
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            Your journey starts today.
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
            TSUZUKU means "to continue." This is step one.
          </p>
          <Link to="/onboarding" id="cta-footer" className="btn btn-primary btn-xl">
            Begin your path →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-6 border-t text-center text-xs" style={{ borderColor: 'var(--color-base-600)', color: 'var(--color-text-dim)' }}>
        TSUZUKU · 続く · Premium Japanese Learning Platform
      </footer>
    </div>
  );
}
