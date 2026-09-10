import { useState } from 'react';

export function LoveLetter() {
  const [isLit, setIsLit] = useState(false);
  const [count, setCount] = useState(1024);

  const toggleCandle = () => {
    setIsLit((prev) => !prev);
    setCount((prev) => (isLit ? prev - 1 : prev + 1));
  };

  return (
    <section id="letter" className="relative w-full py-24 md:py-32 px-6 md:px-10 bg-gradient-to-b from-stone-50 to-amber-50/20 overflow-hidden">
      {/* Background ornament */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-96 h-96 text-amber-200/10 pointer-events-none">
        <span className="material-symbols-outlined text-[400px]">local_florist</span>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-600">From My Heart To Yours</span>
          <h2 className="font-headline-lg text-headline-lg text-stone-800 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Letter
          </h2>
        </div>

        {/* Unfolding paper card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-amber-900/5 overflow-hidden border border-amber-100/60">
          {/* Paper header — fold crease line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

          <div className="p-8 md:p-12">
            {/* From line */}
            <div className="flex items-center gap-3 pb-6 mb-8 border-b border-stone-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-white text-xl">favorite</span>
              </div>
              <div>
                <div className="text-base font-semibold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>My Dearest Net</div>
                <div className="text-xs text-stone-400">Written on the dawn of Meskerem 1</div>
              </div>
            </div>

            {/* Letter body */}
            <div className="space-y-6 text-stone-600 leading-relaxed text-[15px] md:text-base">
              <p>
                They say that when the yellow Adey Abeba blooms across our highlands, it is heaven's seal that dark storms have passed and peace has returned to the soil. But for me, you were that golden flower long before September arrived.
              </p>
              <p>
                Today, while all of Ethiopia sings of new beginnings — crisp grass spread upon living room floors, the fragrance of freshly brewed Buna filling every home — my whole heart sings for the day you took your first breath.
              </p>
              <p>
                You make life feel like warm morning sunlight pouring through white woven cotton curtains. You bring quiet strength to my noisy days, and your laughter is the soundtrack I want to carry across every chapter of my life.
              </p>

              {/* Amharic lines — both together, said once */}
              <div className="my-8 py-6 px-6 md:px-8 bg-amber-50/80 rounded-xl border border-amber-100 text-center space-y-3">
                <p className="text-lg md:text-xl text-amber-800 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  መልካም ልደት ላንቺ ይሁን!
                </p>
                <p className="text-base md:text-lg text-amber-700 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  አዲሱ ዓመት የሰላምና የፍቅር ይሁንልን!
                </p>
              </div>

              <p className="text-base md:text-lg text-amber-700 italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Happy Birthday, and Melkam Enkutatash, my love. May this year shower you with all the honeyed peace, glowing health, and boundless joy you so effortlessly give to everyone around you."
              </p>

              {/* Sign-off */}
              <div className="pt-6 text-right space-y-1">
                <div className="text-base text-stone-500 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Yours always &amp; across every year,</div>
                <div className="text-xs font-medium tracking-widest uppercase text-stone-400">With all my devotion</div>
              </div>
            </div>
          </div>

          {/* Candle footer */}
          <div className="px-8 md:px-12 py-6 bg-stone-50/80 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCandle}
                className="relative w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-amber-100"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-2xl transition-colors"
                  style={isLit ? { color: '#D97706', fontVariationSettings: "'FILL' 1" } : { color: '#9CA3AF', fontVariationSettings: "'FILL' 0" }}
                >
                  local_fire_department
                </span>
                <div
                  className="absolute inset-0 rounded-full bg-amber-400/20 transition-transform duration-500 pointer-events-none"
                  style={isLit ? { transform: 'scale(2.5)', opacity: 1 } : { transform: 'scale(0)', opacity: 0 }}
                />
              </button>
              <div>
                <div className="text-sm font-semibold text-stone-700">Light a Birthday Candle</div>
                <div className="text-xs text-stone-400">Offer a blessing of light to her new year</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-amber-100">
              <span className="material-symbols-outlined text-amber-500 text-base">wb_incandescent</span>
              <span className="text-xs text-stone-400">Candles:</span>
              <span className="text-sm font-bold text-amber-600">{count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
