
import React, { useState } from 'react';
import { UserCheck, Send } from 'lucide-react';

export const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && surname) {
      setSent(true);
      // Qui potresti inviare i dati a un servizio esterno, per ora simuliamo il successo.
    }
  };

  return (
    <div className="bg-yellow-50/50 p-6 rounded-[2rem] border-2 border-yellow-200">
      <div className="flex items-center gap-2 mb-4 text-yellow-700">
        <UserCheck size={20} />
        <h3 className="font-birthday text-xl">Vieni alla festa?</h3>
      </div>

      {sent ? (
        <div className="text-center py-4 animate-in zoom-in duration-300">
          <p className="text-green-600 font-bold text-lg">Grazie {name}! 🎉</p>
          <p className="text-gray-500 text-sm italic">Leonardo non vede l'ora di vederti!</p>
          <button 
            onClick={() => setSent(false)} 
            className="mt-4 text-xs text-blue-500 underline"
          >
            Modifica
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nome amichetto/a"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white/80 focus:border-yellow-400 outline-none transition-all placeholder:text-gray-300"
            required
          />
          <input
            type="text"
            placeholder="Cognome"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white/80 focus:border-yellow-400 outline-none transition-all placeholder:text-gray-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            Conferma Presenza <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
};
