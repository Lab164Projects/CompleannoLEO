
import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export const PartyInfo: React.FC<{ logoUrl?: string }> = ({ logoUrl }) => {
  const mapsUrl = "https://maps.app.goo.gl/eHkVGkiRWx4upoH19";

  return (
    <div className="space-y-3">
      <div className="bg-[#E6F7FF] p-4 rounded-3xl flex items-center gap-4 border-2 border-[#00ADEF]">
        <div className="w-12 h-12 bg-[#00ADEF] rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-xs font-black text-[#004A99] uppercase">Quando</h3>
          <p className="font-bold text-gray-800">Sabato 8 Febbraio</p>
        </div>
      </div>

      <div className="bg-[#FFF5E6] p-4 rounded-3xl flex items-center gap-4 border-2 border-[#F7941D]">
        <div className="w-12 h-12 bg-[#F7941D] rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-xs font-black text-[#A16113] uppercase">Orario Mattina</h3>
          <p className="font-bold text-gray-800">Dalle 10:00 alle 13:00</p>
        </div>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white p-4 rounded-3xl border-2 border-[#00ADEF] hover:border-[#004A99] transition-all group shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ADEF] to-[#004A99] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <div className="flex-1 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-black text-[#004A99] uppercase flex items-center gap-1">
                Dove <ExternalLink size={12} />
              </h3>
              <p className="font-bold text-gray-800 leading-tight">Ludoteca Baby World</p>
              <p className="text-xs text-[#00ADEF] font-bold">Via Rocco Cocchia 173</p>
            </div>
            {logoUrl && (
              <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-md border border-[#E6F7FF] flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="Baby World" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};
