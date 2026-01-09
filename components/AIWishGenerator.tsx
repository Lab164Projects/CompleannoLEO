
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChevronLeft, Sparkles, Loader2, Wand2, PartyPopper } from 'lucide-react';

export const AIWishGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateWish = async () => {
    setLoading(true);
    const fallbackWishes = [
      "Auguri Leo! Sei un vero supereroe! 🦸‍♂️🎂",
      "5 anni di pura magia! Buon compleanno ometto! ✨🦁",
      "Un salto gigante per un grande ometto! Auguri Leo! 🚀🌟",
      "Buon compleanno! Divertiti un mondo oggi! 🎈🤩",
      "Leo, oggi sei tu il re della festa! 👑🎉",
      "Tanti auguri al pirata più coraggioso! 🏴‍☠️🎂",
      "Wow! 5 anni sono tantissimi! Auguri grande Leo! 🌈🔥",
      "Leo, sei spaziale! Buon compleanno! 🌌🎈"
    ];

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp', // Updated to a more stable model name
        contents: "Scrivi un augurio di compleanno SUPER CORTO (max 10 parole) e DIVERTENTE per Leonardo che compie 5 ANNI. Usa 2 emoji. Parla del fatto che è un grande ometto!",
        config: {
          temperature: 0.9,
        }
      });
      setWish(response.text?.trim() || fallbackWishes[Math.floor(Math.random() * fallbackWishes.length)]);
    } catch (error) {
      console.error("AI service error, using fallback:", error);
      setWish(fallbackWishes[Math.floor(Math.random() * fallbackWishes.length)]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200"><ChevronLeft size={20} /></button>
        <h2 className="text-3xl font-refined text-purple-600">Magia di Leo</h2>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 p-10 rounded-[3rem] border-4 border-white shadow-inner min-h-[160px] flex flex-col items-center justify-center text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-purple-500" size={48} />
            <span className="text-xs font-black text-purple-400 uppercase tracking-widest">Invocando...</span>
          </div>
        ) : wish ? (
          <div className="animate-in zoom-in duration-500">
            <PartyPopper className="text-orange-500 mb-4 mx-auto" size={32} />
            <p className="text-gray-800 font-black text-2xl leading-tight tracking-tight">{wish}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Sparkles className="text-purple-300 mx-auto animate-pulse" size={45} />
            <p className="text-purple-400 font-bold italic">Tocca per l'augurio magico!</p>
          </div>
        )}
      </div>

      <button
        onClick={generateWish}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-black py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 text-xl border-b-8 border-indigo-900"
      >
        <Wand2 size={28} /> {wish ? "VOGLIO UN ALTRO!" : "CREA MAGIA!"}
      </button>
    </div>
  );
};
