import React, { useEffect, useState } from 'react';
import { Heart, Trophy, Star, Award } from 'lucide-react';
import { queries } from '../services/sanity';

export const Support = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    queries.getSiteSettings().then(setSettings);
  }, []);

  const sponsorshipTiers = [
    {
      name: 'Platinum',
      icon: Trophy,
      price: '$5,000+',
      color: 'from-slate-300 to-slate-500',
      benefits: [
        'Premier logo placement on website',
        'Featured in all tournament streams',
        'Social media promotion',
        'Custom sponsorship package available',
        'Tournament naming rights',
      ],
    },
    {
      name: 'Gold',
      icon: Award,
      price: '$2,500',
      color: 'from-yellow-400 to-yellow-600',
      benefits: [
        'Prominent logo on website',
        'Regular stream overlay rotation',
        'Social media mentions',
        'Newsletter features',
      ],
    },
    {
      name: 'Silver',
      icon: Star,
      price: '$1,000',
      color: 'from-gray-300 to-gray-500',
      benefits: [
        'Logo on sponsors page',
        'Stream overlay inclusion',
        'Social media recognition',
      ],
    },
    {
      name: 'Bronze',
      icon: Heart,
      price: '$500',
      color: 'from-orange-500 to-orange-700',
      benefits: [
        'Logo on sponsors page',
        'Stream overlay rotation',
        'Thank you recognition',
      ],
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Support Idaho Esports</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          As a non-profit organization, we rely on the generosity of sponsors and donors 
          to provide free, fair, and competitive esports opportunities for Idaho students.
        </p>
      </div>

      {/* One-Time Donation */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Make a Donation</h2>
        <p className="text-gray-300 mb-6">
          Every dollar goes directly to supporting Idaho students and growing our esports community.
        </p>
        {settings?.donationUrl ? (
          <a
            href={settings.donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Donate Now
          </a>
        ) : (
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Contact Us to Donate
          </a>
        )}
      </div>

      {/* Sponsorship Tiers */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Sponsorship Opportunities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sponsorshipTiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-8 hover:border-purple-500 transition-all"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-lg flex items-center justify-center`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <p className="text-xl text-purple-400 font-semibold">{tier.price}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How Funds Are Used */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">How Your Support Helps</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">40%</div>
            <p className="text-gray-300">Tournament Operations & Prizes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">35%</div>
            <p className="text-gray-300">Technology & Platform Costs</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">25%</div>
            <p className="text-gray-300">Education & Community Programs</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <p className="text-gray-300 mb-4">
          Interested in a custom sponsorship package or have questions?
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-slate-800 rounded-lg text-white font-semibold hover:bg-slate-700 transition-all border border-purple-500/50"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};