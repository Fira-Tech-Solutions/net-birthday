import { useState, useCallback } from 'react';
import { IntroAnimation } from './components/IntroAnimation';
import { FloatingPetals } from './components/FloatingPetals';
import { Hero } from './components/Hero';
import { LoveLetter } from './components/LoveLetter';
import { BlessingClose } from './components/BlessingClose';
import { GiftReveal } from './components/GiftReveal';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    document.body.style.overflow = '';
  }, []);

  // Lock scroll during intro
  if (!introDone) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="bg-stone-50 font-sans text-stone-800 antialiased">
      {/* Main page — always rendered, sits behind intro */}
      <div
        className="min-h-screen"
        style={{
          filter: introDone ? 'none' : 'blur(8px) brightness(0.6)',
          transform: introDone ? 'scale(1)' : 'scale(1.04)',
          transition: 'filter 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <FloatingPetals />
        <main className="w-full">
          <Hero />
          {/* Content scrolls over the sticky hero */}
          <div className="relative z-10 bg-stone-50">
            <LoveLetter />
            <BlessingClose />
          </div>
        </main>
      </div>

      {/* Floating gift button — always visible */}
      <GiftReveal />

      {/* Intro overlay — mounts on top, removes itself when done */}
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
    </div>
  );
}
