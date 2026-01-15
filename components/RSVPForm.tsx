import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🔴 INSERISCI QUI IL TUO NUMERO DI TELEFONO (con prefisso 39, es: 393331234567)
  const PHONE_NUMBER = "393295381974";

  // 🔴 (FACOLTATIVO) INCOLLA QUI L'URL DELLA WEB APP DI GOOGLE SCRIPTS PER IL RIEPILOGO
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKriA9JrHdjFrjIzvP6zUXnO_O2Va00UTli_q_R1TWhmZKhkDM7RuIZKmfy6q4BvoQqQ/exec";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // 1. Log su Google Sheets (se configurato)
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname }),
      }).catch(err => console.error("Errore salvataggio sheet:", err));
    }

    // 2. WhatsApp Redirection
    const message = `Ciao! ${name} ${surname} ha confermato la presenza alla festa di Leonardo! 🥳`;
    // Se il numero è impostato, apre la chat diretta. Altrimenti apre la selezione contatti.
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

    // Apri WhatsApp
    window.open(whatsappUrl, '_blank');

    // 2. Simulazione Webhook (Se configurato)
    /* 
    fetch('YOUR_DISCORD_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `Nuova conferma: ${name} ${surname}` })
    }); 
    */

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setSurname('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-[#D0F4FF] p-6 rounded-[2rem] border-2 border-[#0096FF] shadow-sm">
        <h3 className="text-xl font-black text-[#0096FF] mb-4 flex items-center gap-2">
          <Send size={24} />
          Vieni alla festa?
        </h3>

        {isSubmitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-xl font-bold text-center border-2 border-green-300 animate-in fade-in zoom-in">
            Fantastico! Messaggio pronto per l'invio su WhatsApp! 📱
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nome amichetto/a"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white/90 focus:border-[#0096FF] outline-none transition-all placeholder:text-gray-400 font-bold"
              required
            />
            <input
              type="text"
              placeholder="Cognome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white/90 focus:border-[#0096FF] outline-none transition-all placeholder:text-gray-400 font-bold"
            />
            <button
              type="submit"
              className="w-full bg-[#FF9500] hover:bg-[#FFB347] text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 border-b-4 border-[#CC7A00] text-lg hover:shadow-xl hover:-translate-y-1"
            >
              CONFERMA PRESENZA <Send size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
