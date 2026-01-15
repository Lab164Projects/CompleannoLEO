
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
          speed: (Math.random() * 1.0 + 1.0) * (1 + level * 0.2),
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
    <div className="relative h-[800px] w-full bg-gradient-to-b from-blue-400 to-indigo-800 rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl touch-none">
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
          {/* Confetti & Fireworks Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div key={`fw-${i}`} className="absolute animate-firework opacity-0"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 10}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `scale(${0.5 + Math.random()})`
                }}>
                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_20px_#facc15]"></div>
              </div>
            ))}
            {[...Array(30)].map((_, i) => (
              <div key={`cf-${i}`} className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                  backgroundColor: ['#facc15', '#ef4444', '#3b82f6', '#10b981', '#ec4899'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }} />
            ))}
          </div>

          {/* Sfondo effetti luce rotante */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full animate-spin-slow blur-3xl"></div>
          </div>

          {/* Immagine Vittoria Oscillante - Ridotta leggermente e margini ottimizzati */}
          <div className="relative z-10 animate-sway-heavy mb-2 mt-8">
            <img
              src="/LeonardoWin.png"
              alt="Leonardo Vince!"
              className="w-60 h-60 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] animate-bounce-gentle"
            />
          </div>

          <p className="relative z-10 text-yellow-300 font-refined font-black text-4xl md:text-6xl mb-6 uppercase tracking-wide animate-pulse drop-shadow-lg text-center leading-tight px-4 max-w-full break-words shrink-0">
            Bravo<br />Campione!!!
          </p>

          <div className="relative z-20 flex flex-col gap-3 items-center w-full px-8 pb-8 shrink-0">
            <button
              onClick={() => { setScore(0); setLevel(1); setVictory(false); setBalloons([]); }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform active:scale-95 border-b-8 border-orange-800 text-xl"
            >
              GIOCA ANCORA!
            </button>
            <button
              onClick={onBack}
              className="bg-white text-blue-600 w-full py-3 rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-colors active:scale-95 border-2 border-blue-100"
            >
              Torna all'invito
            </button>
          </div>

          {/* Stile animazioni dedicate */}
          <style>{`
            @keyframes sway-heavy {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
            .animate-sway-heavy {
              animation: sway-heavy 2s ease-in-out infinite;
            }
            @keyframes bounce-gentle {
               0%, 100% { transform: translateY(0); }
               50% { transform: translateY(-10px); }
            }
            .animate-bounce-gentle {
               animation: bounce-gentle 2s ease-in-out infinite;
            }
            @keyframes firework {
              0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0px rgba(250, 204, 21, 0); }
              50% { opacity: 1; }
              100% { transform: scale(20); opacity: 0; box-shadow: 0 0 0 20px rgba(250, 204, 21, 0); }
            }
            .animate-firework {
              animation: firework 1.5s ease-out infinite;
            }
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
            }
            .animate-confetti-fall {
              animation-fill-mode: forwards;
              animation-iteration-count: infinite;
            }
          `}</style>
        </div>
      ) : (
        <div className="h-full w-full">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              onPointerDown={() => popBalloon(balloon.id)}
              className={`absolute w-16 h-20 ${balloon.color} rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg cursor-pointer hover:scale-125 transition-transform animate-in zoom-in duration-150 touch-manipulation`}
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
    </div>
  );
};
