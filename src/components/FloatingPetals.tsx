import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalColors = ['#990011', '#c41425', '#e8354a', '#7a000e', '#ff4d5e'];
    const petalCount = 20;
    const newPetals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      newPetals.push({
        id: i,
        size: Math.random() * 12 + 8,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        rotation: Math.random() * 360,
      });
    }
    setPetals(newPetals);

    if (!document.getElementById('petal-keyframes')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'petal-keyframes';
      styleTag.innerHTML = `
        @keyframes fallPetal {
          0% {
            top: -30px;
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(35px) rotate(180deg);
          }
          100% {
            top: 105vh;
            transform: translateX(-20px) rotate(360deg);
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden" id="petals-field">
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            backgroundColor: petal.color,
            borderRadius: '50% 50% 50% 0',
            opacity: Math.random() * 0.45 + 0.25,
            transform: `rotate(${petal.rotation}deg)`,
            filter: 'drop-shadow(0 2px 4px rgba(153, 0, 17, 0.2))',
            animation: `fallPetal ${petal.duration}s infinite linear ${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
