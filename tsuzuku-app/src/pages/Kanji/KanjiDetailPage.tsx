import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft, Play, ArrowCounterClockwise, CheckCircle,
  PencilSimple, Lightbulb, Eye, EyeSlash, Sparkle
} from '@phosphor-icons/react';
import { n5Kanji } from '@/data/n5/kanji';
import { JLPTBadge, AudioButton } from '@/components/japanese/JapaneseComponents';
import { playJapaneseAudio } from '@/utils/audio.utils';

export default function KanjiDetailPage() {
  const { character } = useParams<{ character: string }>();
  const decodedChar = character ? decodeURIComponent(character) : '人';

  const kanji = n5Kanji.find(k => k.character === decodedChar) ?? n5Kanji[0];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [activeTab, setActiveTab] = useState<'write' | 'radicals' | 'compounds'>('write');

  // Setup drawing canvas with high-DPI resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 300;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.scale(dpr, dpr);
    clearCanvas();
  }, [kanji.character]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasDrawn(false);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e) e.preventDefault();
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
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
    if ('touches' in e) e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#C2334D'; // Vermillion ink

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      {/* ── BACK NAV ── */}
      <div>
        <Link to="/kanji" className="btn btn-ghost btn-sm gap-2">
          <ArrowLeft size={16} /> Back to Kanji Library
        </Link>
      </div>

      {/* ── TOP HERO BENTO ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left: Kanji Character Display & Readings */}
        <div className="md:col-span-5 card p-6 sm:p-8 text-center flex flex-col justify-center items-center relative overflow-hidden border-[var(--color-base-500)]">
          <div className="flex items-center gap-2 mb-4">
            <JLPTBadge level={kanji.jlptLevel} />
            <span className="badge badge-muted text-xs">
              {kanji.strokeCount} strokes
            </span>
          </div>

          <div
            className="font-jp-serif font-black mb-4 select-none leading-none"
            style={{ fontSize: '6.5rem', color: 'var(--color-text-primary)' }}
          >
            {kanji.character}
          </div>

          <h1 className="text-2xl font-black mb-1 capitalize" style={{ color: 'var(--color-text-primary)' }}>
            {kanji.meanings.join(', ')}
          </h1>

          <div className="text-xs text-muted mb-6">
            {kanji.radicals.length > 0 && (
              <>
                Radical: <span className="font-jp font-bold text-white">{kanji.radicals[0].character}</span> ({kanji.radicals[0].meaning})
              </>
            )}
          </div>

          {/* Readings */}
          <div className="w-full grid grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-[var(--color-base-700)] border border-[var(--color-base-500)]">
              <div className="flex items-center justify-between text-2xs uppercase tracking-wider text-[var(--color-vermillion-400)] font-bold mb-1">
                <span>音読み (On)</span>
                <AudioButton text={kanji.onyomi[0] ?? ''} size={14} />
              </div>
              <div className="font-jp font-bold text-sm sm:text-base text-white">
                {kanji.onyomi.join('、')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--color-base-700)] border border-[var(--color-base-500)]">
              <div className="flex items-center justify-between text-2xs uppercase tracking-wider text-[var(--color-indigo-400)] font-bold mb-1">
                <span>訓読み (Kun)</span>
                <AudioButton text={kanji.kunyomi[0] ?? ''} size={14} />
              </div>
              <div className="font-jp font-bold text-sm sm:text-base text-white">
                {kanji.kunyomi.join('、')}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive 4x4 Writing Canvas */}
        <div className="md:col-span-7 card p-6 sm:p-8 flex flex-col items-center justify-center space-y-6 border-[var(--color-base-500)]">
          <div className="flex items-center justify-between w-full">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[var(--color-vermillion-400)]">
                Interactive Practice
              </div>
              <h2 className="text-lg font-bold text-white">Stroke Order Writing Canvas</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="btn btn-ghost btn-sm gap-1.5 text-xs"
                title="Toggle character watermark guide"
              >
                {showGuide ? <EyeSlash size={16} /> : <Eye size={16} />}
                {showGuide ? 'Hide Watermark' : 'Show Watermark'}
              </button>

              <button
                onClick={clearCanvas}
                className="btn btn-secondary btn-sm gap-1.5 text-xs"
                title="Clear canvas"
              >
                <ArrowCounterClockwise size={16} /> Clear
              </button>
            </div>
          </div>

          {/* 4x4 Japanese Practice Paper Box */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border-2 border-[var(--color-base-400)]"
            style={{
              width: '300px',
              height: '300px',
              background: '#121216',
            }}
          >
            {/* Genkouyoushi grid guidelines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-[var(--color-base-600)]/60">
              <line x1="150" y1="0" x2="150" y2="300" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="300" y2="150" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="0" x2="300" y2="300" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
              <line x1="300" y1="0" x2="0" y2="300" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
            </svg>

            {/* Faint character watermark guide */}
            {showGuide && (
              <div
                className="absolute inset-0 flex items-center justify-center font-jp-serif font-black select-none pointer-events-none text-muted"
                style={{
                  fontSize: '11rem',
                  opacity: 0.16,
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                {kanji.character}
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="relative z-10 cursor-crosshair"
              style={{ touchAction: 'none' }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs text-muted">
            <span>✍️ Draw with finger or mouse inside the 4x4 grid</span>
            {hasDrawn && (
              <span className="text-[var(--color-success)] font-bold flex items-center gap-1">
                <CheckCircle size={14} weight="fill" /> Stroke registered
              </span>
            )}
          </div>
        </div>

      </div>

      {/* ── MNEMONICS & COMPOUNDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Memory Story / Mnemonic */}
        <div className="card p-6 space-y-3 border-[var(--color-base-500)]">
          <div className="flex items-center gap-2 font-bold text-base text-[var(--color-gold-400)]">
            <Lightbulb size={20} weight="fill" /> Memory Story & Mnemonic
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {kanji.mnemonic}
          </p>
        </div>

        {/* Compound Vocabulary */}
        <div className="card p-6 space-y-3 border-[var(--color-base-500)]">
          <div className="flex items-center gap-2 font-bold text-base text-white">
            <Sparkle size={18} className="text-[var(--color-vermillion-400)]" /> Compound Vocabulary
          </div>

          <div className="space-y-2">
            {(kanji.vocabularyExamples ?? []).map(c => (
              <div
                key={c.word}
                className="p-3 rounded-xl bg-[var(--color-base-700)] flex items-center justify-between border border-[var(--color-base-600)]"
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-jp font-bold text-base text-white">{c.word}</span>
                    <span className="font-jp text-xs text-[var(--color-text-muted)]">({c.reading})</span>
                  </div>
                  <div className="text-xs text-muted">{c.meaning}</div>
                </div>

                <AudioButton text={c.word} size={16} />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
