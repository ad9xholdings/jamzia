import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BattleButton() {
  const [isBattleRoute, setIsBattleRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      setIsBattleRoute(hash.includes('/battle') || hash.includes('/cottonbrickroad'));
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  const goToBattle = () => {
    window.location.hash = '/battle';
  };

  const goBack = () => {
    window.history.back();
  };

  if (isBattleRoute) {
    return (
      <button
        onClick={goBack}
        className="fixed bottom-16 sm:bottom-20 left-3 sm:left-5 z-[70] group flex items-center gap-3 transition-all duration-300"
        aria-label="Back"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1A1A2E] border-2 border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 hover:border-white/40 transition-all duration-300">
          <ArrowLeft size={20} className="text-white sm:w-6 sm:h-6" />
        </div>

        {/* Hover tooltip - desktop only */}
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1A1A2E] text-white text-sm font-semibold px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap shadow-lg">
          Back
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={goToBattle}
      className="fixed bottom-16 sm:bottom-20 left-3 sm:left-5 z-[70] group flex items-center gap-3 transition-all duration-300"
      aria-label="Cotton Castle"
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-2xl shadow-red-900/50 border-2 border-[#5B0000] hover:scale-110 transition-transform duration-300">
        <img
          src="/cotton-castle.jpg"
          alt="Cotton Castle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 rounded-full bg-red-600/10" />
      </div>

      {/* Hover tooltip - desktop only */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1A0505] text-red-300 text-sm font-semibold px-3 py-1.5 rounded-lg border border-red-900/30 whitespace-nowrap shadow-lg">
        Cotton Castle
      </span>
    </button>
  );
}
