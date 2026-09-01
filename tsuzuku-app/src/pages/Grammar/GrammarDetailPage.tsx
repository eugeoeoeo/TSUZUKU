import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Brain, GitFork, Lightning, Lightbulb, CheckCircle, XCircle } from '@phosphor-icons/react';
import { n5Grammar } from '@/data/n5/grammar';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { JLPTBadge, AudioButton } from '@/components/japanese/JapaneseComponents';

// Sample verbs for interactive conjugation tree
const SAMPLE_VERBS = [
  { id: 'v-taberu', name: '食べる (Ichidan)', root: '食べる', reading: 'たべる', meaning: 'to eat' },
  { id: 'v-nomu', name: '飲む (Godan)', root: '飲む', reading: 'のむ', meaning: 'to drink' },
  { id: 'v-iku', name: '行く (Godan)', root: '行く', reading: 'いく', meaning: 'to go' },
  { id: 'v-suru', name: 'する (Irregular)', root: 'する', reading: 'する', meaning: 'to do' },
  { id: 'v-kuru', name: '来る (Irregular)', root: '来る', reading: 'くる', meaning: 'to come' },
];

export default function GrammarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const grammar = n5Grammar.find(g => g.id === id) ?? n5Grammar[0];

  const [selectedVerbId, setSelectedVerbId] = useState('v-taberu');
  const [selectedBranch, setSelectedBranch] = useState<'masu' | 'te' | 'nai' | 'ta' | 'potential' | 'tai'>('masu');

  const activeVerb = n5Vocabulary.find(v => v.id === selectedVerbId) ?? n5Vocabulary[0];
  const conj = activeVerb.conjugations;

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to="/grammar" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to Grammar Library
        </Link>
      </div>

      {/* ── TOP HERO ── */}
      <div className="card p-8 space-y-4">
        <div className="flex items-center gap-2">
          <JLPTBadge level={grammar.jlptLevel} />
          <span className="badge badge-indigo text-xs uppercase tracking-wider">
            {grammar.politeness}
          </span>
        </div>

        <h1 className="font-jp-serif text-jp-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {grammar.name}
        </h1>

        <div className="text-lg font-semibold" style={{ color: 'var(--color-indigo-300)' }}>
          {grammar.nameEN} — {grammar.meaning}
        </div>

        <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {grammar.detailedMeaning}
        </p>
      </div>

      {/* ── INTERACTIVE VERB CONJUGATION TREE ── */}
      <div className="card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-vermillion-400)' }}>
              <GitFork size={18} /> Interactive Conjugation Tree
            </div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Dynamic Branching Visualizer
            </h2>
          </div>

          {/* Verb selector tabs */}
          <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-[var(--color-base-700)]">
            {SAMPLE_VERBS.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVerbId(v.id)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors font-jp"
                style={{
                  background: selectedVerbId === v.id ? 'var(--color-vermillion-500)' : 'transparent',
                  color: selectedVerbId === v.id ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                {v.root}
              </button>
            ))}
          </div>
        </div>

        {/* Tree visual container */}
        <div className="p-6 rounded-2xl bg-[var(--color-base-900)] border border-[var(--color-base-600)] space-y-6">
          {/* Root node */}
          <div className="text-center">
            <div className="inline-block p-4 rounded-xl border-2 border-[var(--color-vermillion-500)] bg-[rgba(194,51,77,0.12)]">
              <div className="text-xs uppercase tracking-widest text-muted mb-1">Dictionary (Root)</div>
              <div className="font-jp-serif text-jp-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {activeVerb.japanese}
              </div>
              <div className="text-xs text-muted font-jp">{activeVerb.kana} · {activeVerb.english}</div>
            </div>
          </div>

          {/* Branches selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { id: 'masu', label: 'Polite (ます)', val: conj?.masuForm, desc: 'Everyday polite present/future' },
              { id: 'te', label: 'Te-Form (て)', val: conj?.teForm, desc: 'Connecting actions & requests' },
              { id: 'nai', label: 'Negative (ない)', val: conj?.naiForm, desc: 'Plain negative' },
              { id: 'ta', label: 'Past (た)', val: conj?.taForm, desc: 'Plain past completion' },
              { id: 'potential', label: 'Potential (える)', val: conj?.potentialForm, desc: 'Can / able to do' },
              { id: 'tai', label: 'Desire (たい)', val: conj?.taiForm, desc: 'Want to do' },
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBranch(b.id as any)}
                className="p-3 rounded-xl text-center transition-all border text-left"
                style={{
                  background: selectedBranch === b.id ? 'rgba(194,51,77,0.15)' : 'var(--color-base-800)',
                  borderColor: selectedBranch === b.id ? 'var(--color-vermillion-500)' : 'var(--color-base-600)',
                }}
              >
                <div className="text-2xs text-muted mb-1">{b.label}</div>
                <div className="font-jp font-bold text-jp-base mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {b.val ?? '—'}
                </div>
                <div className="text-2xs text-dim line-clamp-1">{b.desc}</div>
              </button>
            ))}
          </div>

          {/* Branch detail callout */}
          <div className="p-4 rounded-xl bg-[var(--color-base-800)] border border-[var(--color-base-600)] flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-muted mb-0.5">
                Active Branch Formulation
              </div>
              <div className="font-jp text-jp-lg font-bold" style={{ color: 'var(--color-gold-400)' }}>
                {activeVerb.japanese} ➔ {
                  selectedBranch === 'masu' ? conj?.masuForm :
                  selectedBranch === 'te' ? conj?.teForm :
                  selectedBranch === 'nai' ? conj?.naiForm :
                  selectedBranch === 'ta' ? conj?.taForm :
                  selectedBranch === 'potential' ? conj?.potentialForm :
                  conj?.taiForm
                }
              </div>
            </div>
            <AudioButton
              text={
                selectedBranch === 'masu' ? conj?.masuForm ?? activeVerb.japanese :
                selectedBranch === 'te' ? conj?.teForm ?? activeVerb.japanese :
                activeVerb.japanese
              }
              size={20}
            />
          </div>
        </div>
      </div>

      {/* ── FORMATIONS & ATTACHMENT RULES ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Formation Structures
          </h2>
          <div className="space-y-3">
            {grammar.formation.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[var(--color-base-700)] border border-[var(--color-base-600)]">
                <div className="font-bold text-sm mb-1" style={{ color: 'var(--color-vermillion-400)' }}>
                  {f.structure}
                </div>
                <div className="font-jp text-jp-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {f.example}
                </div>
                <div className="text-xs text-muted mt-0.5">{f.english}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Attachment Rules
          </h2>
          <div className="space-y-2">
            {grammar.attachmentRules.map((rule, i) => (
              <div key={i} className="p-3 rounded-lg flex items-center justify-between bg-[var(--color-base-700)]">
                <span className="text-xs font-semibold capitalize" style={{ color: 'var(--color-indigo-300)' }}>
                  {rule.partOfSpeech}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                  {rule.form}
                </span>
                <span className="font-jp text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {rule.example}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTRAST / COMPARISON SECTION ── */}
      {grammar.contrastGrammar && grammar.contrastGrammar.length > 0 && (
        <div className="card-accent p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--color-vermillion-400)' }}>
            <Lightbulb size={18} weight="fill" /> Nuance Contrast & Distinction
          </div>
          {grammar.contrastGrammar.map((cg, i) => (
            <div key={i} className="text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
              {cg.difference}
            </div>
          ))}
        </div>
      )}

      {/* ── CONTEXT EXAMPLES ── */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
          Example Sentences in Context
        </h2>

        <div className="space-y-3">
          {grammar.examples.map((ex, i) => (
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
    </div>
  );
}
