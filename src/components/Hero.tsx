export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden" style={{ position: 'sticky', top: 0, zIndex: 0 }}>
      <img
        src="/photo_2026-09-13_01-03-29.jpg"
        alt="Kiya"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/80 via-[#990011]/20 to-[#990011]/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2B2B2B]/30 via-transparent to-[#2B2B2B]/20" />

      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#990011]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#990011]/8 rounded-full blur-2xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-20 md:pb-24 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
          <span className="material-symbols-outlined text-[#FCF6F5] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#FCF6F5]/80">Happy Birthday</span>
          <span className="material-symbols-outlined text-[#FCF6F5] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
        </div>

        <h1 className="font-display-lg text-[72px] md:text-[100px] leading-none text-white tracking-tight drop-shadow-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
          Kiya
        </h1>

        <p className="font-headline-md text-headline-md md:text-headline-lg text-white/75 italic font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          You are loved beyond words
        </p>

        <p className="text-sm md:text-base text-white/60 max-w-md font-light leading-relaxed mb-8">
          Some souls bring their own light — you make every moment feel like golden hour.
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <span className="material-symbols-outlined text-white/40 text-2xl">expand_more</span>
      </div>
    </section>
  );
}
