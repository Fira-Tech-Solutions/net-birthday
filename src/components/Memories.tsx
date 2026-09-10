import { useEffect, useRef, useState } from 'react';

interface Memory {
  id: number;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  tagIcon: string;
  tagColor: string;
  rotate: string;
  offset: string;
}

const memories: Memory[] = [
  {
    id: 1,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFnxT5kzu9KYv5ZV1Ksr9TioWsqTw5l6QREL4v0sS6cTjgt5pv_Pvd65FWQOKDVlIggRXxqC7FGuma1FDFla9_PdArD_Xn42YzdXTbFkCX43Few7WYUoEuY-bAgrQlXfaooXgLgxDDeQXqe-8DLEo6eYwBdt50_Psh-rs5vLmbNCtQfMlZU4l9ywT5XYz1Gc2P6eT9CLTLTGo_coQYNWfy3y84Gjv7JSEMiB1pflJ3xSWyvu8i5BpJ_Q',
    alt: 'Sunrise in Entoto',
    caption: 'Sunrise in Entoto, holding the first blossoms of the new year',
    tag: 'Enkutatash 2017',
    tagIcon: 'wb_sunny',
    tagColor: 'text-amber-600 bg-amber-50 border-amber-200',
    rotate: '-rotate-2',
    offset: 'md:mt-0',
  },
  {
    id: 2,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2V1ZdX0qW4zs9ZmQoMkq0KrH-LE_G0UWwOQlN6CGFwJ5DmPvvkUbRIv93hR6fWCYNRpotWzQcHiktv_MDtAg2wDVHFx8jeWotvblSwqCn9Cxi-fWWo0krX210M7CfkhK1vZWqwF-ltMt12kqc_3VwpnQJJ2mtE0Evh7j1dJdihpajTuC7WPiEN0fMVtYCTfslVkDJjFZozDPjpaCUfpOiflS63uYv6aMiBuZsuQURht8z4UBEQPfFg',
    alt: 'Adey Abeba meadow',
    caption: 'The morning Adey Abeba kissed by dew — reminder of your sweet gentleness',
    tag: 'Adey Abeba',
    tagIcon: 'spa',
    tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
    rotate: 'rotate-1',
    offset: 'md:mt-8',
  },
  {
    id: 3,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASNinH-tU-_sTpR_8Jtp0TFfGmIGBUOkj173tJKNvwegixGkf4FTsEOdvPxS06tO2dBZul06HQtnBH7BRLifyTX_xfvOIPD0ONTUm5BmJuDhag5U712p47GmdVW-gDweyUAH3zKpxO-kzaaQ86hMFmWbdbGEplJ71V8VyySDXUGjX_gOSmA9Z4OHz4Rh8c-ijzimk8cuCsDflJpvEyybZd7uwQ3wSiqJvmymzIsXyXuPYtqXGWzjWWMw',
    alt: 'Twilight coffee',
    caption: 'Twilight coffee & endless laughter that made the whole café glow',
    tag: 'Dabo & Buna',
    tagIcon: 'local_cafe',
    tagColor: 'text-rose-600 bg-rose-50 border-rose-200',
    rotate: '-rotate-1',
    offset: 'md:mt-2',
  },
];

function PolaroidCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        group relative bg-white p-4 pb-6 rounded-sm shadow-md
        hover:shadow-2xl transition-all duration-700 ease-out
        ${memory.rotate} hover:rotate-0 hover:-translate-y-3
        ${memory.offset}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Tape strip */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/80 backdrop-blur-sm rounded-sm pointer-events-none opacity-80" />

      {/* Photo */}
      <div className="relative overflow-hidden rounded-sm aspect-[4/5] mb-4 bg-amber-50">
        <img
          alt={memory.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={memory.src}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* Glow on hover */}
        <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Caption */}
      <p className="text-sm text-stone-700 italic text-center leading-snug px-1 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        "{memory.caption}"
      </p>

      {/* Enkutatash tag */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${memory.tagColor}`}>
        <span className="material-symbols-outlined text-sm">{memory.tagIcon}</span>
        {memory.tag}
      </div>
    </div>
  );
}

export function Memories() {
  return (
    <section id="memories" className="w-full py-24 md:py-32 px-6 md:px-10 bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 relative overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-amber-600">Keepsakes of Us</span>
          <h2 className="font-headline-lg text-headline-lg text-stone-800 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Golden Moments
          </h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mt-3 leading-relaxed">
            Each memory carries the scent of roasted coffee, laughter, and the golden petals of a new year.
          </p>
        </div>

        {/* Asymmetric polaroid grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
          {memories.map((m, i) => (
            <PolaroidCard key={m.id} memory={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
