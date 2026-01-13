
import React from 'react';
import { Star, Award, Rocket, Zap, PartyPopper } from 'lucide-react';

interface InvitationCardProps {
  photoUrl: string;
  onPhotoClick: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ photoUrl, onPhotoClick }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative group cursor-pointer perspective-1000"
        onClick={onPhotoClick}
      >
        {/* Effetto aura magica rotante */}
        <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600 via-yellow-400 to-red-500 rounded-full animate-spin-slow blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>

        {/* FOTO DI LEONARDO: Protagonista assoluta */}
        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-blue-50 z-10 transition-transform duration-500 group-hover:scale-105">
          <img
            src={photoUrl}
            alt="Leonardo"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className = "w-full h-full flex items-center justify-center bg-blue-100 text-blue-400";
                placeholder.innerHTML = `<svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" stroke-width="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>

        {/* IN ALTO A SINISTRA: Badge dei 5 Anni */}
        <div className="absolute inset-0 rounded-full border-4 border-[#F7941D] opacity-20 animate-ping pointer-events-none" />
        <img src={photoUrl} alt="Leonardo" className="w-44 h-44 rounded-full object-cover shadow-inner" />
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#00ADEF] to-[#004A99] text-white rounded-full text-sm font-black shadow-lg mb-2">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span>SUPER LEO</span>
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
        </div>
        <h2 className="text-4xl font-refined text-[#004A99] mb-1">Evviva Leo!</h2>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
          Tocca la mia foto per festeggiarmi!
        </p>
      </div>
    </div>
  );
};
