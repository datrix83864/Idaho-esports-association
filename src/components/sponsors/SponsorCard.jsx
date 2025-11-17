import React from 'react';
import { ExternalLink } from 'lucide-react';
import { urlFor } from '../../services/sanity';

export const SponsorCard = ({ sponsor }) => {
  const tierColors = {
    platinum: 'border-slate-300 bg-slate-300/10',
    gold: 'border-yellow-500 bg-yellow-500/10',
    silver: 'border-gray-400 bg-gray-400/10',
    bronze: 'border-orange-600 bg-orange-600/10',
    supporter: 'border-purple-500 bg-purple-500/10',
  };

  const tierClass = tierColors[sponsor.tier] || tierColors.supporter;

  return (
    <div className={`backdrop-blur-sm border-2 rounded-xl p-6 hover:scale-105 transition-all ${tierClass}`}>
      <div className="aspect-video flex items-center justify-center mb-4">
        {sponsor.logo && (
          <img 
            src={urlFor(sponsor.logo).width(400).url()} 
            alt={sponsor.name}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
      <h3 className="text-lg font-bold text-white text-center mb-2">{sponsor.name}</h3>
      {sponsor.description && (
        <p className="text-gray-400 text-sm text-center mb-4">{sponsor.description}</p>
      )}
      {sponsor.website && (
        <a
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 text-purple-400 hover:text-purple-300"
        >
          <span className="text-sm">Visit Website</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};
