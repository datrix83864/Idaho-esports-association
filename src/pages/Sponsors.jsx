import React, { useEffect, useState } from 'react';
import { SponsorCard } from '../components/sponsors/SponsorCard';
import { queries } from '../services/sanity';
import { Link } from 'react-router-dom';

export const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queries.getActiveSponsors().then(data => {
      setSponsors(data);
      setLoading(false);
    });
  }, []);

  const sponsorsByTier = {
    platinum: sponsors.filter(s => s.tier === 'platinum'),
    gold: sponsors.filter(s => s.tier === 'gold'),
    silver: sponsors.filter(s => s.tier === 'silver'),
    bronze: sponsors.filter(s => s.tier === 'bronze'),
    supporter: sponsors.filter(s => s.tier === 'supporter'),
  };

  const tierInfo = {
    platinum: { title: 'Platinum Sponsors', color: 'text-slate-300' },
    gold: { title: 'Gold Sponsors', color: 'text-yellow-400' },
    silver: { title: 'Silver Sponsors', color: 'text-gray-400' },
    bronze: { title: 'Bronze Sponsors', color: 'text-orange-600' },
    supporter: { title: 'Community Supporters', color: 'text-purple-400' },
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Our Sponsors</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Thank you to our amazing sponsors who make Idaho esports possible. 
          Their support helps us provide free and fair competitive opportunities for all Idaho students.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-purple-400">Loading sponsors...</div>
      ) : sponsors.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-6">
            We're currently seeking sponsors to support Idaho esports!
          </p>
          <Link
            to="/support"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Become a Sponsor
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(tierInfo).map(([tier, info]) => {
            const tierSponsors = sponsorsByTier[tier];
            if (tierSponsors.length === 0) return null;

            return (
              <div key={tier} className="space-y-6">
                <h2 className={`text-3xl font-bold ${info.color}`}>{info.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tierSponsors.map(sponsor => (
                    <SponsorCard key={sponsor._id} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Interested in Sponsoring?</h3>
        <p className="text-gray-300 mb-6">
          Help us grow Idaho esports and get your brand in front of hundreds of engaged students, 
          families, and schools across Idaho.
        </p>
        <Link
          to="/support"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Learn About Sponsorship
        </Link>
      </div>
    </div>
  );
};