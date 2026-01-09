
import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export const PartyInfo: React.FC<{ logoUrl?: string }> = ({ logoUrl }) => {
  const mapsUrl = "https://maps.app.goo.gl/eHkVGkiRWx4upoH19";

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 p-4 rounded-3xl flex items-center gap-4 border-2 border-blue-100">
        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-xs font-black text-blue-400 uppercase">Quando</h3>
          <p className="font-bold text-gray-800">Sabato 8 Febbraio</p>
        </div>
      </div>

      <div className="bg-pink-50 p-4 rounded-3xl flex items-center gap-4 border-2 border-pink-100">
        <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-xs font-black text-pink-400 uppercase">Orario Mattina</h3>
          <p className="font-bold text-gray-800">Dalle 10:00 alle 13:00</p>
        </div>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-green-50 p-4 rounded-3xl border-2 border-green-100 hover:border-green-300 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <div className="flex-1 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-black text-green-400 uppercase flex items-center gap-1">
                Dove <ExternalLink size={12} />
              </h3>
              <p className="font-bold text-gray-800 leading-tight">Ludoteca Baby World</p>
              <p className="text-xs text-green-700">Via Rocco Cocchia 173</p>
            </div>
            {logoUrl && (
              <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-md border border-green-100 flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="Baby World" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};
