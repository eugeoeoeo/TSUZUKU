import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MagnifyingGlass, Funnel, PencilSimple } from '@phosphor-icons/react';
import { n5Kanji } from '@/data/n5/kanji';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

const JLPT_TABS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];

export default function KanjiBrowserPage() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filtered = n5Kanji.filter(k => {
    const matchesLevel = selectedLevel === 'All' || k.jlptLevel === selectedLevel;
    const matchesSearch =
      search.trim() === '' ||
      k.character.includes(search) ||
      k.meanings.some(m => m.toLowerCase().includes(search.toLowerCase())) ||
      k.onyomi.some(o => o.includes(search)) ||
      k.kunyomi.some(ku => ku.includes(search));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-vermillion-400)' }}>
          <PencilSimple size={16} /> Kanji Master Library
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Kanji Dictionary & Practice
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Explore characters by JLPT level, radical composition, stroke count, and stroke animations.
        </p>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
            placeholder="Search character, meaning, onyomi, kunyomi..."
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
                background: selectedLevel === tab ? 'var(--color-vermillion-500)' : 'transparent',
                color: selectedLevel === tab ? '#fff' : 'var(--color-text-muted)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── KANJI GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filtered.map((k, i) => (
          <motion.div
            key={k.character}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Link
              to={`/kanji/${encodeURIComponent(k.character)}`}
              className="card card-interactive block p-4 text-center group"
            >
              <div className="flex justify-between items-center mb-2">
                <JLPTBadge level={k.jlptLevel} size="sm" />
                <span className="text-2xs font-mono" style={{ color: 'var(--color-text-dim)' }}>
                  {k.strokeCount} strokes
                </span>
              </div>

              <div
                className="font-jp-serif text-jp-3xl font-bold my-2 group-hover:scale-110 transition-transform"
                style={{ color: 'var(--color-text-primary)', lineHeight: 1.2 }}
              >
                {k.character}
              </div>

              <div className="text-xs font-semibold truncate mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                {k.meanings[0]}
              </div>

              <div className="text-2xs font-jp truncate" style={{ color: 'var(--color-text-dim)' }}>
                {k.onyomi[0] ?? k.kunyomi[0]}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: 'var(--color-text-muted)' }}>No kanji found matching "{search}".</p>
        </div>
      )}
    </div>
  );
}
