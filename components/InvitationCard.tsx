
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
        <div className="absolute -top-4 -left-6 bg-yellow-400 text-yellow-900 font-black px-5 py-3 rounded-full shadow-xl z-20 animate-bounce border-4 border-white rotate-[-15deg] flex items-center gap-2">
          <span className="text-3xl font-birthday leading-none">5</span>
          <Star size={20} fill="currentColor" />
        </div>

        {/* IN BASSO A DESTRA: Badge "Super Ometto" Spaziale */}
        <div className="absolute -bottom-6 -right-4 w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-1 shadow-2xl border-4 border-white z-20 transform rotate-6 transition-all group-hover:rotate-0 group-hover:scale-110 flex items-center justify-center">
          <div className="bg-white/10 w-full h-full rounded-2xl flex flex-col items-center justify-center text-white p-2">
            <Rocket size={32} className="mb-1 animate-float text-yellow-300" />
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Super Leo</div>
            <div className="flex gap-1">
              <Zap size={10} fill="currentColor" className="text-yellow-400" />
              <Zap size={10} fill="currentColor" className="text-yellow-400" />
              <Zap size={10} fill="currentColor" className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-5xl font-refined text-blue-600 mb-2 leading-none">Evviva Leo!</h2>
        <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">Tocca la mia foto per festeggiare!</p>
      </div>
    </div>
  );
};
