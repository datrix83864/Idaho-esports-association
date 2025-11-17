import React from 'react';
import { GraduationCap } from 'lucide-react';

export const SchoolCard = ({ school }) => {
  return (
    <a href={school.leagueosUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
          {school.logo ? (
            <img src={school.logo} alt={school.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <GraduationCap className="w-8 h-8 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{school.name}</h3>
          {school.city && (
            <p className="text-gray-400 text-sm">{school.city}, ID</p>
          )}
          {school.teamCount && (
            <p className="text-purple-400 text-sm mt-2">{school.teamCount} active teams</p>
          )}
        </div>
      </div>
    </a>
  );
};