import React from 'react';
import { Gamepad } from 'lucide-react';

export const GameCard = ({ game, onView }) => {
  const logo = game.logo || game.externalLogoUrl;
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logo ? (
            <img src={logo} alt={game.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Gamepad className="w-8 h-8 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{game.title}</h3>
          {game.esrb && <p className="text-gray-400 text-sm">{game.esrb}</p>}
          {game.genre && <p className="text-purple-400 text-sm mt-2">{game.genre}</p>}
          <p className="text-gray-300 text-sm mt-2 line-clamp-3">{game.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onView(game)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold transition-colors"
            >
              View Details
            </button>
            {game.rulesAnchor && (
              <a
                href={`/rules#${game.rulesAnchor}`}
                className="px-3 py-2 bg-slate-800 rounded-lg text-white text-sm border border-purple-500/30 hover:bg-slate-700 transition-all"
              >
                View Rules
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
