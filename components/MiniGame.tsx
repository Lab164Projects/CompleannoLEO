
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trophy, Zap, Star, Medal } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

export const MiniGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [victory, setVictory] = useState(false);
  
  const colors = [
    'bg-red-500 shadow-red-200', 
    'bg-blue-500 shadow-blue-200', 
    'bg-yellow-400 shadow-yellow-100', 
    'bg-green-500 shadow-green-200', 
    'bg-pink-500 shadow-pink-200', 
    'bg-purple-500 shadow-purple-200'
  ];

  useEffect(() => {
    if (victory) return;

    const spawnRate = Math.max(200, 1000 - (level * 180));
    const interval = setInterval(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          y: 110,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: (Math.random() * 1.5 + 1.5) * (1 + level * 0.45),
        },
      ]);
    }, spawnRate);

    const moveInterval = setInterval(() => {
      setBalloons((prev) => 
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -30)
      );
    }, 40);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, [level, victory]);

  useEffect(() => {
    const newLevel = Math.floor(score / 20) + 1;
    if (newLevel !== level && newLevel <= 5) {
      setLevel(newLevel);
    }
    if (score >= 60) {
      setVictory(true);
    }
  }, [score]);

  const popBalloon = (id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div className="relative h-[600px] w-full bg-gradient-to-b from-blue-400 to-indigo-800 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-3 bg-white/95 rounded-2xl hover:bg-white transition-all shadow-xl text-blue-600"
        >
          <ChevronLeft />
        </button>
        <div className="bg-white/95 px-5 py-2 rounded-2xl font-black text-blue-600 shadow-xl flex flex-col items-center">
          <span className="text-[10px] uppercase opacity-40">Punti</span>
          <span className="text-xl leading-none">{score}</span>
        </div>
        <div className="bg-yellow-400 px-5 py-2 rounded-2xl font-black text-yellow-900 shadow-xl flex items-center gap-1 animate-pulse">
          <Zap size={18} fill="currentColor" /> LVL {level}
        </div>
      </div>

      {victory ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/95 z-30 animate-in fade-in zoom-in duration-1000 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-2 h-2 rounded-full animate-firework" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#facc15', '#ef4444', '#3b82f6', '#10b981', '#a855f7', '#ffffff'][i % 6],
                  boxShadow: `0 0 50px 15px ${['#facc15', '#ef4444', '#3b82f6', '#10b981', '#a855f7', '#ffffff'][i % 6]}aa`
                }}
              />
            ))}
          </div>
          
          <Medal size={120} className="text-yellow-400 mb-6 animate-bounce drop-shadow-[0_0_50px_rgba(250,204,21,0.8)]" />
          <h2 className="text-7xl font-refined text-white mb-4 drop-shadow-2xl animate-pulse tracking-wide">LEONARDO</h2>
          <p className="text-yellow-300 font-black text-2xl mb-8 uppercase tracking-[0.4em]">CAMPIONE DI 5 ANNI!</p>
          
          <button 
            onClick={() => { setScore(0); setLevel(1); setVictory(false); setBalloons([]); }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-14 py-5 rounded-full font-black shadow-3xl hover:scale-110 transition-transform active:scale-95 border-b-8 border-orange-800 text-2xl"
          >
            SFIDAMI DI NUOVO!
          </button>
        </div>
      ) : (
        <div className="h-full w-full">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              onClick={() => popBalloon(balloon.id)}
              className={`absolute w-16 h-20 ${balloon.color} rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg cursor-pointer hover:scale-125 transition-transform animate-in zoom-in duration-150`}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
              }}
            >
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-white opacity-40"></div>
              <div className="absolute top-4 left-4 w-4 h-7 bg-white/40 rounded-full rotate-[-20deg]"></div>
            </div>
          ))}
          <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none opacity-40">
            <p className="text-white font-black text-xs uppercase tracking-[0.5em] mb-1">Pop the balloons!</p>
            <div className="flex justify-center gap-2">
              {[...Array(level)].map((_, i) => <Star key={i} size={14} className="text-white fill-current" />)}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes firework {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(32); opacity: 0.9; }
          100% { transform: scale(40); opacity: 0; }
        }
        .animate-firework {
          animation: firework 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
};
