import { useState, useRef, useEffect, useCallback } from 'react';

type GiftPhase = 'idle' | 'countdown' | 'blast' | 'reveal';

const giftImages = [
  { src: '/photo_2026-09-13_01-03-27.jpg', alt: 'Gift photo 1' },
  { src: '/photo_2026-09-13_01-03-29.jpg', alt: 'Gift photo 2' },
  { src: '/photo_2026-09-13_01-03-31.jpg', alt: 'Gift photo 3' },
  { src: '/photo_2026-09-13_01-03-36.jpg', alt: 'Gift photo 4' },
];

export function GiftReveal() {
  const [phase, setPhase] = useState<GiftPhase>('idle');
  const [count, setCount] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handleOpen = () => {
    setPhase('countdown');
    setCount(3);
    setCurrentSlide(0);

    const t1 = setTimeout(() => setCount(2), 1000);
    const t2 = setTimeout(() => setCount(1), 2000);
    const t3 = setTimeout(() => setPhase('blast'), 3000);
    const t4 = setTimeout(() => {
      setPhase('reveal');
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }, 3500);

    timersRef.current = [t1, t2, t3, t4];
  };

  const handleClose = () => {
    clearTimers();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPhase('idle');
    setCount(3);
    setCurrentSlide(0);
  };

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(giftImages.length - 1, index));
    setCurrentSlide(clamped);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({ left: slideWidth * clamped, behavior: 'smooth' });
    }
  };

  const goNext = () => goTo(currentSlide + 1);
  const goPrev = () => goTo(currentSlide - 1);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta < 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  const isOpen = phase !== 'idle';

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={isOpen}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#990011] to-[#7a000e] rounded-full shadow-lg shadow-[#990011]/30 hover:shadow-[#990011]/50 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
        type="button"
      >
        <img src="/adey_abeba_button.svg" alt="Claim your gift" className="w-9 h-9 group-hover:rotate-45 transition-transform duration-500" />
        <span className="absolute inset-0 rounded-full bg-[#c41425]/30 animate-ping pointer-events-none" />
      </button>

      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[140px] text-right pointer-events-none">
          <span
            className="inline-block text-xs font-medium text-[#990011] bg-[#FCF6F5] border border-[#990011]/20 rounded-lg px-3 py-2 shadow-sm"
            style={{ animation: 'giftSelfDestruct 6s ease-in-out forwards' }}
          >
            🌸 Click me before I fade away!
          </span>
        </div>
      )}

      <audio ref={audioRef} src="/እስሩ የክርስቶስ.mp3" preload="auto" />

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{ animation: 'giftFadeIn 0.3s ease-out forwards' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(43,43,43,0.85)',
              WebkitBackdropFilter: 'blur(12px)',
              backdropFilter: 'blur(12px)',
            }}
            onClick={handleClose}
          />

          <div
            className="relative z-10 w-full max-w-sm max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(to bottom, #2B2B2B, #1a1a1a)',
              animation: 'giftCardPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {phase === 'countdown' && (
              <div className="flex flex-col items-center justify-center aspect-[3/4] px-6">
                <div className="relative flex flex-col items-center gap-4">
                  <div
                    key={`ring-${count}`}
                    className="absolute w-28 h-28 rounded-full border-2 border-[#990011]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ animation: 'giftCountdownRing 1s ease-out forwards' }}
                  />
                  <span
                    key={`num-${count}`}
                    className="text-[80px] font-bold text-[#FCF6F5] select-none"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      textShadow: '0 0 40px rgba(153,0,17,0.5), 0 0 80px rgba(153,0,17,0.3)',
                      animation: 'giftCountdownPop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    }}
                  >
                    {count}
                  </span>
                  <p className="text-[#FCF6F5]/40 text-sm italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Your gift is almost ready...
                  </p>
                </div>
              </div>
            )}

            {phase === 'blast' && (
              <div className="relative flex flex-col items-center justify-center aspect-[3/4] px-6 overflow-hidden">
                <div
                  className="absolute rounded-full bg-[#990011]/60"
                  style={{
                    width: 20,
                    height: 20,
                    animation: 'introFlash 0.6s ease-out forwards',
                  }}
                />
                {Array.from({ length: 30 }).map((_, i) => {
                  const angle = (360 / 30) * i;
                  const rad = (angle * Math.PI) / 180;
                  const dist = 60 + Math.random() * 100;
                  const tx = Math.cos(rad) * dist;
                  const ty = Math.sin(rad) * dist;
                  const size = 6 + Math.random() * 10;
                  const shades = ['#990011', '#c41425', '#e8354a', '#ff4d5e'];
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: size,
                        height: size * 1.3,
                        backgroundColor: shades[i % shades.length],
                        borderRadius: '50% 50% 50% 0',
                        animation: `introBurstPetal 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${Math.random() * 0.1}s forwards`,
                        ['--tx' as string]: `${tx}px`,
                        ['--ty' as string]: `${ty}px`,
                        ['--rot' as string]: `${Math.random() * 360}deg`,
                      }}
                    />
                  );
                })}
              </div>
            )}

            {phase === 'reveal' && (
              <>
                <div className="relative px-6 pt-6 pb-4 text-center shrink-0">
                  <p className="text-[#c41425] text-xs tracking-[0.2em] uppercase font-medium mb-1">A Gift For You</p>
                  <h3 className="text-[#FCF6F5] text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                    Happy Birthday, Kiya
                  </h3>
                  <p className="text-[#FCF6F5]/40 text-sm mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    With love, always
                  </p>
                </div>

                <div className="relative flex-1 min-h-0 aspect-[3/4]">
                  {currentSlide > 0 && (
                    <button
                      onClick={goPrev}
                      className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/50 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                  )}
                  {currentSlide < giftImages.length - 1 && (
                    <button
                      onClick={goNext}
                      className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm items-center justify-center text-white hover:bg-black/50 transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  )}

                  <div
                    ref={sliderRef}
                    className="h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{
                      scrollBehavior: 'smooth',
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch',
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    {giftImages.map((img, i) => (
                      <div key={i} className="snap-center shrink-0 w-full h-full flex items-center justify-center px-4">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#2B2B2B]">
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {giftImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentSlide ? 'w-5 h-1.5 bg-[#990011]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                        type="button"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 py-3 shrink-0 border-t border-white/10">
                  <span className="material-symbols-outlined text-[#c41425] text-base animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
                  <span className="text-xs text-[#FCF6F5]/50 font-medium">Now playing</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
