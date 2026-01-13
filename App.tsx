import React, { useState } from 'react';
import { InvitationCard } from './components/InvitationCard';
import { BlueyRunner } from './components/BlueyRunner';
import { AIWishGenerator } from './components/AIWishGenerator';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { FireworksCanvas } from './components/FireworksCanvas';
import { PartyInfo } from './components/PartyInfo';
import { RSVPForm } from './components/RSVPForm';
import { Heart, Star, Music, Gift, Camera, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

const FloatingBalloon = ({ color, delay, left }: { color: string, delay: string, left: string }) => (
  <div
    className="absolute bottom-[-250px] animate-float-up pointer-events-none z-0"
    style={{ left, animationDelay: delay }}
  >
    <div className="relative animate-sway">
      {/* Balloon Body - Slightly transparent for a lighter feel */}
      <div className={`relative w-16 h-20 ${color} rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] opacity-80 shadow-[inset_-4px_-6px_10px_rgba(0,0,0,0.2),0_10px_20px_rgba(0,0,0,0.1)]`}>
        {/* Reflection highlight */}
        <div className="absolute top-3.5 left-3.5 w-5 h-8 bg-white/40 rounded-full rotate-[15deg] blur-[1px]"></div>

        {/* Knot at the bottom */}
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-4 ${color} z-10`}
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
      </div>

      {/* Wavy String (SVG) - Moved OUTSIDE the balloon body to avoid clipping */}
      <div className="absolute top-[78px] left-1/2 -translate-x-1/2 w-8 h-48 opacity-30 overflow-visible">
        <svg width="100%" height="100%" viewBox="0 0 10 100" preserveAspectRatio="none" className="overflow-visible">
          <path
            d="M5 0 Q 10 25, 0 50 T 5 100"
            fill="none"
            stroke="#666"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="animate-wave"
          />
        </svg>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'invite' | 'game' | 'ai'>('invite');
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isFireworksActive, setIsFireworksActive] = useState(false);

  const triggerCelebration = () => {
    setIsConfettiActive(true);
    setIsFireworksActive(true);
    setTimeout(() => {
      setIsConfettiActive(false);
      setIsFireworksActive(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00ADEF] via-[#E6F7FF] to-[#F7941D] text-gray-800 relative overflow-hidden font-sans">

      {/* Sfondo animato con nuvole e palloncini */}
      <div className="absolute top-10 left-[10%] w-64 h-32 bg-white/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 left-[70%] w-80 h-40 bg-white/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <FloatingBalloon color="bg-[#00ADEF]" delay="0s" left="5%" />
      <FloatingBalloon color="bg-[#F7941D]" delay="3s" left="20%" />
      <FloatingBalloon color="bg-white" delay="5s" left="35%" />
      <FloatingBalloon color="bg-[#00ADEF]" delay="1.5s" left="50%" />
      <FloatingBalloon color="bg-[#F7941D]" delay="7s" left="65%" />
      <FloatingBalloon color="bg-white" delay="4s" left="80%" />
      <FloatingBalloon color="bg-[#00ADEF]" delay="0.8s" left="92%" />

      <main className="max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative z-10">
        <header className="text-center mb-6 z-20 animate-in fade-in slide-in-from-top duration-1000">
          <h1 className="text-5xl font-refined text-[#004A99] drop-shadow-md mb-2 leading-tight">
            Leonardo & Bluey!
          </h1>
          <div className="bg-white/70 backdrop-blur-md px-10 py-2 rounded-full inline-block shadow-lg border-2 border-[#00ADEF] transform -rotate-1">
            <p className="text-xl font-bold text-[#F7941D] tracking-tight">Il 5° Compleanno Megagalattico!</p>
          </div>
        </header>

        <div className="w-full bg-white/95 backdrop-blur-2xl rounded-[4rem] shadow-[0_30px_80px_rgba(0,173,239,0.2)] p-6 relative z-10 border-4 border-white">
          {gameState === 'invite' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <InvitationCard
                onPhotoClick={triggerCelebration}
                photoUrl="/leonardo_cropped.jpg"
              />
              <PartyInfo logoUrl="/logo_babyworld.png" />

              <hr className="border-gray-200 opacity-40 mx-8" />

              <RSVPForm />

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setGameState('game')}
                  className="bg-gradient-to-br from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-white font-black py-5 px-2 rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1 border-b-4 border-orange-600"
                >
                  <Star className="fill-current animate-pulse" size={24} />
                  <span className="text-sm">GIOCHIAMO!</span>
                </button>
                <button
                  onClick={() => setGameState('ai')}
                  className="bg-gradient-to-br from-[#00ADEF] to-[#004A99] hover:from-[#004A99] hover:to-[#002B59] text-white font-black py-5 px-2 rounded-[2.5rem] shadow-xl transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1 border-b-4 border-blue-900"
                >
                  <Sparkles className="animate-bounce" size={24} />
                  <span className="text-sm text-center">AUGURIO IA</span>
                </button>
              </div>
            </div>
          )}

          {gameState === 'game' && <BlueyRunner onBack={() => setGameState('invite')} />}
          {gameState === 'ai' && <AIWishGenerator onBack={() => setGameState('invite')} />}
        </div>

        <footer className="mt-12 text-center pb-8">
          <div className="relative inline-block px-12 py-6">
            {/* 5 Orbiting Stars */}
            <div className="absolute top-0 left-[-20px] animate-spin-slow text-yellow-500"><Star size={24} fill="currentColor" /></div>
            <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 animate-bounce text-yellow-400"><Star size={20} fill="currentColor" /></div>
            <div className="absolute top-0 right-[-20px] animate-spin-reverse text-yellow-500"><Star size={24} fill="currentColor" /></div>
            <div className="absolute bottom-[-5px] left-4 animate-pulse text-yellow-400"><Star size={18} fill="currentColor" /></div>
            <div className="absolute bottom-[-5px] right-4 animate-pulse text-yellow-400"><Star size={18} fill="currentColor" /></div>

            <div className="flex flex-col items-center">
              <p className="text-gray-700 font-bold text-lg flex items-center gap-2">
                Creato con il <Heart className="text-red-500 fill-current animate-ping" size={24} /> per il 5° compleanno di Leo
              </p>
              <p className="font-refined text-3xl text-blue-600 mt-2">da Mamma e Papà</p>
            </div>
          </div>
        </footer>
      </main>

      <ConfettiCanvas active={isConfettiActive} />
      {isFireworksActive && <FireworksCanvas />}

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(-160vh) rotate(45deg); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 10s linear infinite;
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @keyframes wave {
          0%, 100% { stroke-dashoffset: 0; transform: scaleX(1); }
          50% { transform: scaleX(1.1); }
        }
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 6s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
