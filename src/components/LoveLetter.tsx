import { useState } from 'react';

export function LoveLetter() {
  const [isLit, setIsLit] = useState(false);
  const [count, setCount] = useState(1024);

  const toggleCandle = () => {
    setIsLit((prev) => !prev);
    setCount((prev) => (isLit ? prev - 1 : prev + 1));
  };

  return (
    <section id="letter" className="relative w-full py-24 md:py-32 px-6 md:px-10 bg-gradient-to-b from-[#FCF6F5] to-[#990011]/5 overflow-hidden">
      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-96 h-96 text-[#990011]/5 pointer-events-none">
        <span className="material-symbols-outlined text-[400px]">local_florist</span>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#990011]">From My Heart To Yours</span>
          <h2 className="font-headline-lg text-headline-lg text-[#2B2B2B] mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Letter
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl shadow-[#990011]/5 overflow-hidden border border-[#990011]/10">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#990011]/20 to-transparent" />

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 pb-6 mb-8 border-b border-[#FCF6F5]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#990011] to-[#7a000e] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-white text-xl">favorite</span>
              </div>
              <div>
                <div className="text-base font-semibold text-[#2B2B2B]" style={{ fontFamily: "'Playfair Display', serif" }}>My Dearest Kiya</div>
                <div className="text-xs text-[#2B2B2B]/40">Written with all my heart</div>
              </div>
            </div>

            <div className="space-y-6 text-[#2B2B2B]/70 leading-relaxed text-[15px] md:text-base">
              <p>
                Kiya, every time I see you smile, the world feels a little warmer, a little brighter. You have this way of making even the simplest moments feel extraordinary — like the sun decided to shine just for us.
              </p>
              <p>
                I want you to know that you are the reason I believe in beautiful things. Your laughter is my favorite sound, your happiness is my greatest wish, and being beside you is where I always want to be.
              </p>
              <p>
                You deserve all the love in the world, and I promise to spend every day making sure you feel it. Thank you for being you — for being my peace, my joy, and my favorite person.
              </p>

              <div className="my-8 py-6 px-6 md:px-8 bg-[#990011]/5 rounded-xl border border-[#990011]/10 text-center space-y-3">
                <p className="text-lg md:text-xl text-[#990011] font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Happy Birthday, Kiya!
                </p>
                <p className="text-base md:text-lg text-[#990011]/80 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  You are loved more than words could ever say.
                </p>
              </div>

              <p className="text-base md:text-lg text-[#990011] italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                "May this year bring you all the happiness your heart can hold. May every dream you carry come true, and may you always know how deeply you are cherished."
              </p>

              <div className="pt-6 text-right space-y-1">
                <div className="text-base text-[#2B2B2B]/50 italic" style={{ fontFamily: "'Playfair Display', serif" }}>Forever and always yours,</div>
                <div className="text-xs font-medium tracking-widest uppercase text-[#2B2B2B]/40">With all my love</div>
              </div>
            </div>
          </div>

          <div className="px-8 md:px-12 py-6 bg-[#FCF6F5]/80 border-t border-[#990011]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCandle}
                className="relative w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-[#990011]/10"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-2xl transition-colors"
                  style={isLit ? { color: '#990011', fontVariationSettings: "'FILL' 1" } : { color: '#9CA3AF', fontVariationSettings: "'FILL' 0" }}
                >
                  local_fire_department
                </span>
                <div
                  className="absolute inset-0 rounded-full bg-[#990011]/20 transition-transform duration-500 pointer-events-none"
                  style={isLit ? { transform: 'scale(2.5)', opacity: 1 } : { transform: 'scale(0)', opacity: 0 }}
                />
              </button>
              <div>
                <div className="text-sm font-semibold text-[#2B2B2B]">Light a Birthday Candle</div>
                <div className="text-xs text-[#2B2B2B]/40">Send a wish of love her way</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#990011]/10">
              <span className="material-symbols-outlined text-[#990011] text-base">wb_incandescent</span>
              <span className="text-xs text-[#2B2B2B]/40">Candles:</span>
              <span className="text-sm font-bold text-[#990011]">{count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
