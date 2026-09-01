import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, ArrowCounterClockwise, CheckCircle, PencilSimple, Lightbulb } from '@phosphor-icons/react';
import { n5Kanji } from '@/data/n5/kanji';
import { JLPTBadge, AudioButton } from '@/components/japanese/JapaneseComponents';

export default function KanjiDetailPage() {
  const { character } = useParams<{ character: string }>();
  const decodedChar = character ? decodeURIComponent(character) : '人';

  const kanji = n5Kanji.find(k => k.character === decodedChar) ?? n5Kanji[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Setup drawing canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set resolution
    const size = 260;
    canvas.width = size;
    canvas.height = size;

    clearCanvas();
  }, [kanji.character]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#C2334D'; // Vermillion stroke

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to="/kanji" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to Kanji Library
        </Link>
      </div>

      {/* ── TOP HERO BENTO ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Big character & basic info */}
        <div className="md:col-span-5 card p-8 text-center flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-4">
            <JLPTBadge level={kanji.jlptLevel} />
            <span className="badge badge-muted text-xs">
              {kanji.strokeCount} strokes
            </span>
          </div>

          <div
            className="font-jp-serif text-jp-hero font-bold tracking-wide my-4 select-none"
            style={{ color: 'var(--color-text-primary)', lineHeight: 1 }}
          >
            {kanji.character}
          </div>

          <h1 className="text-2xl font-black mb-1 capitalize" style={{ color: 'var(--color-gold-400)' }}>
            {kanji.meanings.join(', ')}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <AudioButton text={kanji.character} size={24} />
          </div>
        </div>

        {/* Right: Interactive Drawing & Tracing Canvas */}
        <div className="md:col-span-7 card p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-vermillion-400)' }}>
              <PencilSimple size={16} /> Interactive Writing Practice
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs text-muted hover:text-white transition-colors"
            >
              {showGuide ? 'Hide Character Guide' : 'Show Character Guide'}
            </button>
          </div>

          {/* Canvas container with grid */}
          <div className="relative w-[260px] h-[260px] rounded-xl overflow-hidden border" style={{ background: 'var(--color-base-900)', borderColor: 'var(--color-base-500)' }}>
            {/* 4x4 Grid guide lines */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-dashed" style={{ borderColor: 'var(--color-base-700)' }} />
              <div className="border-b border-dashed" style={{ borderColor: 'var(--color-base-700)' }} />
              <div className="border-r border-dashed" style={{ borderColor: 'var(--color-base-700)' }} />
              <div />
            </div>

            {/* Character watermark guide */}
            {showGuide && (
              <div
                className="absolute inset-0 flex items-center justify-center font-jp-serif text-jp-hero select-none pointer-events-none"
                style={{ color: 'rgba(255, 255, 255, 0.07)', lineHeight: 1 }}
              >
                {kanji.character}
              </div>
            )}

            {/* Active Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="relative z-10 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Canvas controls */}
          <div className="flex gap-2 mt-4">
            <button onClick={clearCanvas} className="btn btn-secondary btn-sm gap-1.5">
              <ArrowCounterClockwise size={14} /> Clear Canvas
            </button>
            {hasDrawn && (
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--color-success)' }}>
                <CheckCircle size={16} weight="fill" /> Great stroke!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── READINGS & RADICALS SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Readings */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Readings (音読み・訓読み)
          </h2>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted mb-1">Onyomi (Chinese reading):</div>
              <div className="flex flex-wrap gap-2">
                {kanji.onyomi.map(on => (
                  <span key={on} className="badge badge-vermillion font-jp text-base font-semibold px-3 py-1">
                    {on}
                  </span>
                ))}
              </div>
            </div>

            <div className="divider-subtle" />

            <div>
              <div className="text-xs text-muted mb-1">Kunyomi (Japanese reading):</div>
              <div className="flex flex-wrap gap-2">
                {kanji.kunyomi.map(kun => (
                  <span key={kun} className="badge badge-indigo font-jp text-base font-semibold px-3 py-1">
                    {kun}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Radicals & Mnemonic */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
            Radical Breakdown & Mnemonic
          </h2>

          {kanji.radicals.length > 0 && (
            <div className="flex items-center gap-3">
              {kanji.radicals.map(r => (
                <div key={r.character} className="p-3 rounded-lg flex items-center gap-2" style={{ background: 'var(--color-base-700)' }}>
                  <span className="font-jp text-2xl font-bold" style={{ color: 'var(--color-gold-400)' }}>{r.character}</span>
                  <span className="text-xs text-muted">({r.meaning})</span>
                </div>
              ))}
            </div>
          )}

          {kanji.mnemonic && (
            <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(201, 149, 42, 0.1)', border: '1px solid rgba(201, 149, 42, 0.25)' }}>
              <div className="font-semibold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-gold-400)' }}>
                <Lightbulb size={16} weight="fill" /> Memory Story
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {kanji.mnemonic}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── COMPOUND VOCABULARY WORDS ── */}
      <div className="card p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--color-text-dim)' }}>
          Common Compound Vocabulary (熟語)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {kanji.vocabularyExamples.map((item, i) => (
            <div key={i} className="p-4 rounded-xl card-elevated flex items-center justify-between">
              <div>
                <div className="font-jp text-jp-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {item.word}
                </div>
                <div className="font-jp text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {item.reading}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: 'var(--color-gold-300)' }}>
                  {item.meaning}
                </div>
              </div>
              <AudioButton text={item.word} size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
