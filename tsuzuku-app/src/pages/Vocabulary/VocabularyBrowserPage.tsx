import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MagnifyingGlass, Globe, ArrowRight } from '@phosphor-icons/react';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { JLPTBadge, PartOfSpeechBadge, AudioButton } from '@/components/japanese/JapaneseComponents';

const JLPT_TABS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];

export default function VocabularyBrowserPage() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPos, setSelectedPos] = useState('All');

  const filtered = n5Vocabulary.filter(v => {
    const matchesLevel = selectedLevel === 'All' || v.jlptLevel === selectedLevel;
    const matchesPos = selectedPos === 'All' || v.partOfSpeech.startsWith(selectedPos);
    const matchesSearch =
      search.trim() === '' ||
      v.japanese.includes(search) ||
      v.kana.includes(search) ||
      v.romaji.toLowerCase().includes(search.toLowerCase()) ||
      v.english.toLowerCase().includes(search.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesLevel && matchesPos && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-gold-400)' }}>
          <Globe size={16} /> Lexical Vocabulary Engine
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Japanese Vocabulary Dictionary
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Explore core words with pitch accent, native audio, complete conjugation models, and contextual examples.
        </p>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search word in Kanji, Kana, Romaji or English..."
            className="input pl-10"
          />
        </div>

        {/* Level filter tabs */}
        <div className="flex gap-1 p-1 rounded-lg card flex-shrink-0 overflow-x-auto">
          {JLPT_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedLevel(tab)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: selectedLevel === tab ? 'var(--color-gold-500)' : 'transparent',
                color: selectedLevel === tab ? '#0C0C0F' : 'var(--color-text-muted)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* POS filter */}
        <div className="flex gap-1 p-1 rounded-lg card flex-shrink-0 overflow-x-auto">
          {[
            { id: 'All', label: 'All POS' },
            { id: 'verb', label: 'Verbs' },
            { id: 'noun', label: 'Nouns' },
            { id: 'adjective', label: 'Adjectives' },
            { id: 'expression', label: 'Phrases' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPos(p.id)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background: selectedPos === p.id ? 'var(--color-base-600)' : 'transparent',
                color: selectedPos === p.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── VOCABULARY LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <div className="card p-5 h-full flex flex-col justify-between hover:border-[var(--color-base-400)] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <JLPTBadge level={v.jlptLevel} size="sm" />
                    <PartOfSpeechBadge pos={v.partOfSpeech} />
                  </div>
                  <AudioButton text={v.japanese} size={16} />
                </div>

                <Link to={`/vocabulary/${v.id}`} className="block group">
                  <div className="font-jp-serif text-jp-2xl font-bold mb-0.5 group-hover:text-[var(--color-vermillion-400)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                    {v.japanese}
                  </div>
                  <div className="font-jp text-sm text-muted mb-2">
                    {v.kana} · <span className="font-mono text-2xs">[{v.romaji}]</span>
                  </div>
                  <div className="text-base font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    {v.english}
                  </div>
                </Link>

                {v.examples.length > 0 && (
                  <div className="p-3 rounded-lg bg-[var(--color-base-700)] text-xs font-jp text-muted line-clamp-2">
                    {v.examples[0].japanese}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-[var(--color-base-700)] flex justify-between items-center">
                <div className="flex gap-1">
                  {v.tags.slice(0, 2).map(t => (
                    <span key={t} className="badge badge-muted text-2xs">{t}</span>
                  ))}
                </div>
                <Link to={`/vocabulary/${v.id}`} className="text-xs font-semibold flex items-center gap-1 text-[var(--color-gold-400)] hover:underline">
                  Full conjugations <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
