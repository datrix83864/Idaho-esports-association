import React from 'react';
import { X } from 'lucide-react';

export const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  const logo = game.logo || game.externalLogoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative max-w-3xl w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm z-10">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-800">
          <X className="w-5 h-5 text-purple-300" />
        </button>

        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500">
            {logo ? <img src={logo} alt={game.title} className="w-full h-full object-cover" /> : <div className="text-white">{game.title}</div>}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{game.title}</h2>
            <p className="text-gray-400 mt-1">{game.genre} • {game.esrb}</p>

            <p className="text-gray-300 mt-4">{game.description}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-purple-300 font-semibold">Players</h4>
                <p className="text-gray-300 text-sm mt-1">
                  {game.isTeamBased ? 
                    `${game.minPlayersPerTeam || '?'}–${game.maxPlayersPerTeam || '?'} per team` :
                    `${game.minPlayersIndividual || '1'} player (individual event)`
                  }
                  {game.substitutesAllowed ? ` • Substitutes: ${game.substituteCount ?? 'TBD'}` : ''}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-purple-300 font-semibold">Pricing</h4>
                <p className="text-gray-300 text-sm mt-1">
                  {game.pricing?.costPerTeam ? `$${game.pricing.costPerTeam} per team` : ''}
                  {game.pricing?.costPerPlayer ? `${game.pricing?.costPerTeam ? ' • ' : ''}$${game.pricing.costPerPlayer} per player` : ''}
                  {!game.pricing?.costPerTeam && !game.pricing?.costPerPlayer && 'TBD'}
                </p>
                {game.pricing?.notes && <p className="text-gray-400 text-xs mt-1">{game.pricing.notes}</p>}
              </div>

              <div>
                <h4 className="text-sm text-purple-300 font-semibold">Season & Format</h4>
                <p className="text-gray-300 text-sm mt-1">
                  {Array.isArray(game.seasonAvailability) ? game.seasonAvailability.join(', ') : 'TBD'}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Regular: {game.matchFormat?.regularSeason || 'TBD'} • Post: {game.matchFormat?.postSeason || 'TBD'}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-purple-300 font-semibold">Platform & Time</h4>
                <p className="text-gray-300 text-sm mt-1">{(game.platforms || []).join(', ') || 'TBD'}</p>
                <p className="text-gray-300 text-sm mt-1">Avg match: {game.typicalMatchLengthMinutes ? `${game.typicalMatchLengthMinutes} min` : 'TBD'}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-purple-300 font-semibold">Equipment Requirements</h4>
              <ul className="list-disc ml-5 mt-2 text-gray-300 text-sm">
                {(game.equipmentRequirements || []).length > 0 ? game.equipmentRequirements.map((e, i) => <li key={i}>{e}</li>) : <li>TBD</li>}
              </ul>
            </div>

            {game.supportedBy && (
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden bg-slate-800 flex items-center justify-center">
                  {game.supportedBy.logo ? <img src={game.supportedBy.logo} alt={game.supportedBy.name} className="w-full h-full object-cover" /> : <span className="text-white">{game.supportedBy.name}</span>}
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Supported by <strong>{game.supportedBy.name}</strong></p>
                  {game.supportedBy.website && <a href={game.supportedBy.website} target="_blank" rel="noopener noreferrer" className="text-purple-300 text-sm underline">{game.supportedBy.website}</a>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {game.rulesAnchor && (
            <a href={`/rules#${game.rulesAnchor}`} className="px-4 py-2 bg-slate-800 rounded-lg text-white border border-purple-500/30 hover:bg-slate-700 transition-all">Jump to Rules</a>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white">Close</button>
        </div>
      </div>
    </div>
  );
};
