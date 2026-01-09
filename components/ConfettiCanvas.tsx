
import React, { useEffect, useState } from 'react';

export const ConfettiCanvas: React.FC<{ active: boolean }> = ({ active }) => {
  const [pieces, setPieces] = useState<{ id: number; left: number; color: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 150 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-pink-500', 'bg-purple-500'][Math.floor(Math.random() * 6)],
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
      setPieces(newPieces);
    } else {
      setPieces([]);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`absolute w-3 h-3 ${p.color} rounded-sm animate-bounce`}
          style={{
            left: `${p.left}%`,
            top: '-20px',
            animation: `fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
