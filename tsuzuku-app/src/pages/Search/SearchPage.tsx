import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MagnifyingGlass, Globe, Brain, PencilSimple, ArrowRight } from '@phosphor-icons/react';
import { n5Vocabulary } from '@/data/n5/vocabulary';
import { n5Grammar } from '@/data/n5/grammar';
import { n5Kanji } from '@/data/n5/kanji';
import { JLPTBadge } from '@/components/japanese/JapaneseComponents';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const cleanQuery = query.trim().toLowerCase();

  const matchingVocab = cleanQuery === '' ? [] : n5Vocabulary.filter(v =>
    v.japanese.includes(query) ||
    v.kana.includes(query) ||
    v.english.toLowerCase().includes(cleanQuery) ||
    v.romaji.toLowerCase().includes(cleanQuery)
  );

  const matchingGrammar = cleanQuery === '' ? [] : n5Grammar.filter(g =>
    g.name.includes(query) ||
    g.nameEN.toLowerCase().includes(cleanQuery) ||
    g.meaning.toLowerCase().includes(cleanQuery)
  );

  const matchingKanji = cleanQuery === '' ? [] : n5Kanji.filter(k =>
    k.character.includes(query) ||
    k.meanings.some(m => m.toLowerCase().includes(cleanQuery)) ||
    k.onyomi.some(o => o.includes(query)) ||
    k.kunyomi.some(ku => ku.includes(query))
  );

  const totalMatches = matchingVocab.length + matchingGrammar.length + matchingKanji.length;

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── SEARCH INPUT HEADER ── */}
      <div className="space-y-4">
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Global Japanese Search
        </h1>
        <div className="relative">
          <MagnifyingGlass
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search across Vocabulary, Kanji, and Grammar patterns..."
            className="input pl-12 text-lg py-4"
            autoFocus
          />
        </div>
      </div>

      {cleanQuery !== '' && (
        <div className="text-xs font-mono text-muted">
          Found {totalMatches} results for "{query}"
        </div>
      )}

      {/* ── RESULTS ── */}
      {cleanQuery !== '' && (
        <div className="space-y-8">
          {/* Kanji Results */}
          {matchingKanji.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--color-vermillion-400)' }}>
                <PencilSimple size={18} /> Kanji Characters ({matchingKanji.length})
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {matchingKanji.map(k => (
                  <Link
                    key={k.character}
                    to={`/kanji/${encodeURIComponent(k.character)}`}
                    className="card card-interactive p-4 text-center block"
                  >
                    <div className="font-jp-serif text-3xl font-bold mb-1">{k.character}</div>
                    <div className="text-xs font-medium text-muted truncate">{k.meanings[0]}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Vocabulary Results */}
          {matchingVocab.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--color-gold-400)' }}>
                <Globe size={18} /> Vocabulary Words ({matchingVocab.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingVocab.map(v => (
                  <Link
                    key={v.id}
                    to={`/vocabulary/${v.id}`}
                    className="card card-interactive p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-jp-serif text-xl font-bold">{v.japanese}</div>
                      <div className="text-xs text-muted font-jp">{v.kana} · {v.english}</div>
                    </div>
                    <ArrowRight size={16} className="text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Grammar Results */}
          {matchingGrammar.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--color-indigo-400)' }}>
                <Brain size={18} /> Grammar Patterns ({matchingGrammar.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingGrammar.map(g => (
                  <Link
                    key={g.id}
                    to={`/grammar/${g.id}`}
                    className="card card-interactive p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-jp-serif text-lg font-bold">{g.name}</div>
                      <div className="text-xs text-muted">{g.nameEN} — {g.meaning}</div>
                    </div>
                    <ArrowRight size={16} className="text-muted" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {totalMatches === 0 && (
            <div className="text-center py-16 text-muted">
              No matching vocabulary, kanji, or grammar patterns found.
            </div>
          )}
        </div>
      )}

      {cleanQuery === '' && (
        <div className="text-center py-20 text-muted space-y-2">
          <div className="font-jp-serif text-jp-3xl text-dim">検索</div>
          <p className="text-sm">Type any Japanese character, romaji, or English word to search.</p>
        </div>
      )}
    </div>
  );
}
