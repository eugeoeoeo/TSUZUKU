import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MagnifyingGlass, Brain, ArrowRight } from '@phosphor-icons/react';
import { n5Grammar } from '@/data/n5/grammar';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

const JLPT_TABS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1'];

export default function GrammarBrowserPage() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filtered = n5Grammar.filter(g => {
    const matchesLevel = selectedLevel === 'All' || g.jlptLevel === selectedLevel;
    const matchesSearch =
      search.trim() === '' ||
      g.name.includes(search) ||
      g.nameEN.toLowerCase().includes(search.toLowerCase()) ||
      g.meaning.toLowerCase().includes(search.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-7xl">
      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-indigo-400)' }}>
          <Brain size={16} /> Grammar & Syntax Engine
        </div>
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Grammar Visualizer & Library
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Comprehensive sentence patterns, dynamic conjugation trees, and side-by-side nuance comparisons.
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
            placeholder="Search grammar patterns, forms, particles..."
            className="input pl-10"
          />
        </div>

        <div className="flex gap-1 p-1 rounded-lg card flex-shrink-0 overflow-x-auto">
          {JLPT_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedLevel(tab)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: selectedLevel === tab ? 'var(--color-indigo-500)' : 'transparent',
                color: selectedLevel === tab ? '#fff' : 'var(--color-text-muted)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRAMMAR LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Link
              to={`/grammar/${g.id}`}
              className="card card-interactive block p-6 group h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <JLPTBadge level={g.jlptLevel} />
                  <div className="flex flex-wrap gap-1">
                    {g.tags.slice(0, 2).map(t => (
                      <span key={t} className="badge badge-muted text-2xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="font-jp-serif text-jp-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {g.name}
                </div>

                <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-indigo-300)' }}>
                  {g.nameEN}
                </div>

                <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {g.meaning}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--color-base-700)] text-xs font-medium" style={{ color: 'var(--color-indigo-400)' }}>
                <span>View conjugation tree & formula</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
