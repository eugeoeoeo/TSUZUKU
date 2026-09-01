import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, SpeakerHigh, Lightbulb } from '@phosphor-icons/react';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { JLPTBadge, PartOfSpeechBadge, AudioButton } from '@/components/japanese/JapaneseComponents';

export default function VocabularyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const vocab = n5Vocabulary.find(v => v.id === id) ?? n5Vocabulary[0];

  const conj = vocab.conjugations;

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to="/vocabulary" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to Vocabulary Dictionary
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <JLPTBadge level={vocab.jlptLevel} />
            <PartOfSpeechBadge pos={vocab.partOfSpeech} />
            {vocab.frequency && (
              <span className="badge badge-muted text-xs">
                Top {vocab.frequency}% common
              </span>
            )}
          </div>

          <h1 className="font-jp-serif text-jp-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            {vocab.japanese}
          </h1>

          <div className="font-jp text-jp-xl text-muted">
            {vocab.kana} · <span className="font-mono text-sm">[{vocab.romaji}]</span>
          </div>

          <div className="text-2xl font-black pt-2" style={{ color: 'var(--color-gold-400)' }}>
            {vocab.english}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <AudioButton text={vocab.japanese} size={36} />
          <span className="text-xs text-muted">Click to listen</span>
        </div>
      </div>

      {/* ── CONJUGATION TABLE (IF APPLICABLE) ── */}
      {conj && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-vermillion-400)' }}>
            Complete Conjugation Chart
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Dictionary (辞書形)', val: conj.dictionaryForm, desc: 'Root plain present/future' },
              { label: 'Polite (ます形)', val: conj.masuForm, desc: 'Polite affirmative statement' },
              { label: 'Negative (ない形)', val: conj.naiForm, desc: 'Plain negative form' },
              { label: 'Past (た形)', val: conj.taForm, desc: 'Plain past completion' },
              { label: 'Te-Form (て形)', val: conj.teForm, desc: 'Connecting actions / requests' },
              { label: 'Potential (可能形)', val: conj.potentialForm, desc: 'Ability: can do' },
              { label: 'Passive (受身形)', val: conj.passiveForm, desc: 'Is acted upon' },
              { label: 'Causative (使役形)', val: conj.causativeForm, desc: 'Make / let someone do' },
              { label: 'Volitional (意向形)', val: conj.volitionalForm, desc: "Let's do / intend to do" },
              { label: 'Desire (たい形)', val: conj.taiForm, desc: 'Want to do' },
              { label: 'Imperative (命令形)', val: conj.imperativeForm, desc: 'Direct command' },
              { label: 'Conditional (ば形)', val: conj.conditionalForm, desc: 'If / hypothetical condition' },
            ].map(f => (
              <div key={f.label} className="p-3.5 rounded-xl bg-[var(--color-base-700)] border border-[var(--color-base-600)] flex items-center justify-between">
                <div>
                  <div className="text-2xs text-muted font-medium mb-0.5">{f.label}</div>
                  <div className="font-jp text-jp-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {f.val}
                  </div>
                  <div className="text-2xs text-dim mt-0.5">{f.desc}</div>
                </div>
                <AudioButton text={f.val} size={16} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTEXT SENTENCES ── */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
          Example Sentences
        </h2>

        <div className="space-y-3">
          {vocab.examples.map((ex, i) => (
            <div key={i} className="p-4 rounded-xl card-elevated flex items-center justify-between">
              <div>
                <div className="font-jp text-jp-lg font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {ex.japanese}
                </div>
                <div className="font-jp text-xs text-muted mb-0.5">{ex.reading}</div>
                <div className="text-sm font-medium" style={{ color: 'var(--color-gold-300)' }}>
                  {ex.english}
                </div>
              </div>
              <AudioButton text={ex.japanese} size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* ── NOTES & NUANCES ── */}
      {vocab.notes && (
        <div className="card-accent p-6 flex items-start gap-3">
          <Lightbulb size={24} weight="fill" className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-vermillion-400)' }} />
          <div>
            <div className="font-bold text-sm uppercase tracking-wider mb-1" style={{ color: 'var(--color-vermillion-400)' }}>
              Usage Nuance & Note
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
              {vocab.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
