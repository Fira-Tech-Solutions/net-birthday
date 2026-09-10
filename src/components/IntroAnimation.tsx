import { useState, useEffect, useCallback, useRef } from 'react';

interface BurstPetal {
  id: number;
  angle: number;
  distance: number;
  size: number;
  shade: string;
  rotation: number;
  delay: number;
}

function generateBurstPetals(count: number): BurstPetal[] {
  const shades = ['#F59E0B', '#FBBF24', '#FCD34D', '#D97706', '#F59E0B', '#FDE68A', '#F59333', '#E8A317'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + (Math.random() - 0.5) * 20,
    distance: 120 + Math.random() * 280,
    size: 8 + Math.random() * 16,
    shade: shades[Math.floor(Math.random() * shades.length)],
    rotation: Math.random() * 720 - 360,
    delay: Math.random() * 0.6,
  }));
}

type Phase = 'countdown' | 'blast' | 'reveal' | 'done';

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('countdown');
  const [countNumber, setCountNumber] = useState(3);
  const [flashVisible, setFlashVisible] = useState(false);
  const [petals] = useState(() => generateBurstPetals(70));
  const [nameVisible, setNameVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    // Phase 1: Countdown 3→2→1 — 2s per number, 6s total
    const t1 = setTimeout(() => setCountNumber(2), 2000);
    const t2 = setTimeout(() => setCountNumber(1), 4000);
    const t3 = setTimeout(() => {
      setPhase('blast');
      setFlashVisible(true);
    }, 6000);

    // Phase 2: Blast — 2.5s duration
    const t4 = setTimeout(() => setFlashVisible(false), 400);
    const t5 = setTimeout(() => setNameVisible(true), 800);

    // Phase 3: Reveal — 1.5s duration
    const t6 = setTimeout(() => setPhase('reveal'), 8500);
    const t7 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 10000);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7];
    return clear;
  }, [onComplete, clear]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        opacity: phase === 'reveal' ? 0 : 1,
        transform: phase === 'reveal' ? 'scale(1.08)' : 'scale(1)',
        transition: 'opacity 1.5s cubic-bezier(0.4,0,0.2,1), transform 1.5s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-800 to-stone-900" />

      {/* Ambient pulsing glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(217,119,6,0.1) 40%, transparent 70%)',
          animation: 'introPulse 3s ease-in-out infinite',
        }}
      />

      {/* ═══ PHASE 1: Countdown ═══ */}
      {phase === 'countdown' && (
        <div className="relative flex flex-col items-center gap-6 z-10">
          {/* Label */}
          <div className="text-amber-200/70 text-xs md:text-sm tracking-[0.35em] uppercase font-medium">
            እንቁጣጣሽ · Her Day Begins
          </div>

          {/* Number container */}
          <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center">
            {/* Pulsing ring */}
            <div
              key={`ring-${countNumber}`}
              className="absolute inset-0 rounded-full border-2 border-amber-300/40"
              style={{           animation: 'introRingPulse 1.8s ease-out forwards' }}
            />
            <div
              key={`ring2-${countNumber}`}
              className="absolute inset-0 rounded-full border border-amber-400/20"
              style={{           animation: 'introRingPulse 1.8s ease-out 0.5s forwards' }}
            />

            {/* Number */}
            <span
              key={`num-${countNumber}`}
              className="text-[100px] md:text-[140px] font-bold text-amber-300 select-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 40px rgba(251,191,36,0.6), 0 0 80px rgba(217,119,6,0.3)',
                animation: 'introNumberPop 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
              }}
            >
              {countNumber}
            </span>
          </div>

          {/* Subtitle */}
          <div className="text-amber-100/60 text-sm md:text-base italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Happy Birthday, Net
          </div>
        </div>
      )}

      {/* ═══ PHASE 2: Champagne Blast ═══ */}
      {(phase === 'blast' || phase === 'reveal') && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Flash / shockwave */}
          {flashVisible && (
            <div
              className="absolute rounded-full bg-amber-200/80 pointer-events-none"
              style={{
                width: 20,
                height: 20,
                animation: 'introFlash 0.8s ease-out forwards',
              }}
            />
          )}

          {/* Burst petals */}
          {petals.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.distance;
            const ty = Math.sin(rad) * p.distance;
            return (
              <div
                key={p.id}
                className="absolute pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size * 1.4,
                  backgroundColor: p.shade,
                  borderRadius: '50% 50% 50% 0',
                  opacity: 0,
                  animation: `introBurstPetal 2.2s cubic-bezier(0.25,0.46,0.45,0.94) ${p.delay}s forwards`,
                  ['--tx' as string]: `${tx}px`,
                  ['--ty' as string]: `${ty}px`,
                  ['--rot' as string]: `${p.rotation}deg`,
                }}
              />
            );
          })}

          {/* Name reveal */}
          <div
            className="relative z-10 text-center"
            style={{
              opacity: nameVisible ? 1 : 0,
              transform: nameVisible ? 'scale(1)' : 'scale(0.7)',
              transition: 'opacity 1s ease-out, transform 1s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <h1
              className="text-[72px] md:text-[100px] text-amber-200 select-none leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                textShadow: '0 0 40px rgba(251,191,36,0.5), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Net
            </h1>
            <p className="text-amber-100/60 text-sm md:text-base mt-2 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your golden year has arrived
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
