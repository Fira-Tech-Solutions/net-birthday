export function BlessingClose() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#990011]/5 to-[#FCF6F5] overflow-hidden">
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 text-[#990011]">
            <span className="material-symbols-outlined text-xl">favorite</span>
            <span className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Made with Love for Kiya</span>
            <span className="material-symbols-outlined text-xl">favorite</span>
          </div>

          <p className="text-sm text-[#2B2B2B]/50 max-w-md leading-relaxed">
            Celebrating you — your smile, your heart, and every beautiful moment we share.
          </p>

          <div className="text-xs text-[#2B2B2B]/40 mt-2">
            © 2026 With love, always.
          </div>
        </div>
      </div>
    </section>
  );
}
