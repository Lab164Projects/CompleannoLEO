
import React from 'react';
import { Star } from 'lucide-react';

interface InvitationCardProps {
  photoUrl: string;
  onPhotoClick: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ photoUrl, onPhotoClick }) => {
  return (
    <div className="flex flex-col items-center relative py-6">
      {/* Bluey floating decoration - Top Left */}
      <div className="absolute -top-12 -left-8 w-28 h-28 rotate-[-15deg] drop-shadow-2xl z-20 animate-float">
        <img src="/Bluey.png" alt="Bluey" className="w-full h-full object-contain" />
      </div>

      {/* Bingo/Bluey decoration - Bottom Right */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rotate-[15deg] drop-shadow-2xl z-20 animate-float" style={{ animationDelay: '1s' }}>
        <img src="/Bluey5.png" alt="Bluey Party" className="w-full h-full object-contain" />
      </div>

      {/* Protagonist Photo */}
      <div
        className="relative group cursor-pointer"
        onClick={onPhotoClick}
      >
        {/* Animated aura */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#00ADEF] to-[#F7941D] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse"></div>

        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-[8px] border-white shadow-2xl bg-white overflow-hidden z-10 transform transition-transform group-hover:scale-105">
          <img
            src={photoUrl}
            alt="Leonardo"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00ADEF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* 5 Years Badge */}
        <div className="absolute -top-2 -right-2 bg-[#F7941D] text-white w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl shadow-xl z-20 border-4 border-white rotate-12 animate-bounce">
          5
        </div>
      </div>

      <div className="mt-8 text-center px-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#00ADEF] to-[#004A99] text-white rounded-full text-sm font-black shadow-lg mb-3">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span>SUPER LEO</span>
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
        </div>
        <h2 className="text-4xl md:text-5xl font-refined text-[#004A99] mb-1 drop-shadow-sm">Evviva Leo!</h2>
        <p className="text-[#00ADEF] font-bold text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Tocca la mia foto per festeggiarmi!
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-15deg); }
          50% { transform: translateY(-10px) rotate(-10deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
