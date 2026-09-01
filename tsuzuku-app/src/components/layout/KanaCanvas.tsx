import { useEffect, useRef, useCallback } from 'react';
import { useUserStore } from '@/stores/user.store';

// ============================================================
// Kana Particle — each floating character
// ============================================================
interface KanaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
  hovered: boolean;
  clicked: boolean;
  clickPulse: number;
}

// Character sets by level
const HIRAGANA = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const BASIC_KANJI = '日月火水木金土山川田人口目手足耳口';
const ADVANCED_KANJI = '学校生先語国時年前後上下左右食飲見聞書読話';
const SENTENCES = ['こんにちは', 'ありがとう', 'おはよう', '大丈夫'];

function getCharSet(level: string): string[] {
  if (level === 'N5') return [...HIRAGANA.split(''), ...KATAKANA.split('').slice(0, 20)];
  if (level === 'N4') return [...HIRAGANA.split(''), ...KATAKANA.split(''), ...BASIC_KANJI.split('')];
  if (level === 'N3') return [...BASIC_KANJI.split(''), ...ADVANCED_KANJI.split(''), ...SENTENCES];
  return [...ADVANCED_KANJI.split(''), ...SENTENCES];
}

const MAX_PARTICLES = 60;
const BASE_OPACITY = 0.06;

// ============================================================
// KanaCanvas Component
// ============================================================
export function KanaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<KanaParticle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reducedMotion = useUserStore(s => s.settings.reducedMotion);

  const level = useUserStore(s => s.profile?.currentLevel ?? 'N5');

  const randomChar = useCallback((chars: string[]): string => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const createParticle = useCallback((canvas: HTMLCanvasElement, chars: string[]): KanaParticle => {
    const size = 14 + Math.random() * 28;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.1 - Math.random() * 0.3,
      size,
      alpha: 0.02 + Math.random() * 0.06,
      char: randomChar(chars),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.003,
      life: 0,
      maxLife: 300 + Math.random() * 400,
      hovered: false,
      clicked: false,
      clickPulse: 0,
    };
  }, [randomChar]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = getCharSet(level);

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: MAX_PARTICLES }, () => createParticle(canvas, chars));

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Click interaction — highlight nearest particle
    const onClick = (e: MouseEvent) => {
      const { x, y } = { x: e.clientX, y: e.clientY };
      let nearest: KanaParticle | null = null;
      let nearestDist = 80;
      for (const p of particlesRef.current) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < nearestDist) { nearestDist = d; nearest = p; }
      }
      if (nearest) {
        nearest.clicked = true;
        nearest.clickPulse = 1.0;
        // Change the character on click
        nearest.char = randomChar(chars);
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        // Check hover
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        p.hovered = dist < 80;

        // Update click pulse
        if (p.clickPulse > 0) p.clickPulse -= 0.02;

        // Move
        p.x += p.vx + (p.hovered ? (mouse.x - p.x) * 0.0008 : 0);
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life++;

        // Wrap around edges
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;

        // Respawn if too old
        if (p.life > p.maxLife) {
          particlesRef.current[i] = createParticle(canvas, chars);
          continue;
        }

        // Draw
        const targetAlpha = p.hovered
          ? BASE_OPACITY * 8
          : p.clickPulse > 0
            ? BASE_OPACITY * 12
            : BASE_OPACITY * (p.alpha / BASE_OPACITY);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Click ring
        if (p.clickPulse > 0) {
          const ringRadius = (1 - p.clickPulse) * 60;
          ctx.beginPath();
          ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(194, 51, 77, ${p.clickPulse * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.globalAlpha = Math.min(targetAlpha, 0.5);
        ctx.font = `${p.hovered ? 'bold' : 'normal'} ${p.size + (p.hovered ? 4 : 0)}px 'Noto Sans JP', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (p.hovered) {
          ctx.fillStyle = '#C2334D';
        } else {
          ctx.fillStyle = '#F0EDE8';
        }

        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [level, reducedMotion, createParticle, randomChar]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      id="kana-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
