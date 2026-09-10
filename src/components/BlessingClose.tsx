export function BlessingClose() {
  return (
    <section className="relative w-full bg-gradient-to-b from-amber-50/20 to-stone-100 overflow-hidden">
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2 text-amber-500">
            <span className="material-symbols-outlined text-xl">spa</span>
            <span className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Adey Abeba &amp; Golden Mornings</span>
            <span className="material-symbols-outlined text-xl">spa</span>
          </div>

          <p className="text-sm text-stone-400 max-w-md leading-relaxed">
            Celebrating sweet milestones, everlasting devotion, and the golden blooms of Enkutatash.
          </p>

          <p className="text-amber-700 text-sm italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            እንቁጣጣሽ — May your new year blossom in gold.
          </p>

          <div className="text-xs text-stone-400/70 mt-2">
            © 2026 Melkam Lidet &amp; Enkutatash. Wrapped in love &amp; golden light.
          </div>
        </div>
      </div>
    </section>
  );
}
