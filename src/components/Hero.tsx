export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden" style={{ position: 'sticky', top: 0, zIndex: 0 }}>
      {/* Full-bleed photo */}
      <img
        src="/photo_2026-09-10_18-10-33.jpg"
        alt="Net"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm golden-hour gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-amber-900/30 to-amber-500/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

      {/* Ambient glow pulses */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-300/8 rounded-full blur-2xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content — bottom-anchored */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-20 md:pb-24 z-10">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
          <span className="material-symbols-outlined text-amber-300 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-200">Happy Birthday &amp; Happy New Year</span>
          <span className="material-symbols-outlined text-amber-300 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
        </div>

        {/* Name — elegant script feel via Playfair italic */}
        <h1 className="font-display-lg text-[72px] md:text-[100px] leading-none text-white tracking-tight drop-shadow-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
          Net
        </h1>

        {/* Tender subtitle */}
        <p className="font-headline-md text-headline-md md:text-headline-lg text-white/75 italic font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          You are loved beyond words
        </p>

        {/* Enkutatash / golden hour imagery — merged from PoeticDedication */}
        <p className="text-sm md:text-base text-amber-200/70 max-w-md font-light leading-relaxed mb-8">
          Some souls bring their own light — you turned every season into our golden hour. እንቁጣጣሽ.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <span className="material-symbols-outlined text-white/40 text-2xl">expand_more</span>
      </div>
    </section>
  );
}
