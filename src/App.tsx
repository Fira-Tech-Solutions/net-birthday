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

  if (!introDone) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className="bg-[#FCF6F5] font-sans text-[#2B2B2B] antialiased">
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
          <div className="relative z-10 bg-[#FCF6F5]">
            <LoveLetter />
            <BlessingClose />
          </div>
        </main>
      </div>

      <GiftReveal />
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
    </div>
  );
}
