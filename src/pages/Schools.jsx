import React, { useEffect, useState } from 'react';
import { SchoolCard } from '../components/schools/SchoolCard';
import { tournamentAPI } from '../services/tournamentAPI';

export const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const data = await tournamentAPI.fetchSchools();
        setSchools(data);
      } catch (err) {
        setError('Failed to load schools. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Idaho Esports Schools</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          These schools are actively participating in Idaho esports competitions.
          Is your school missing? Contact us to get started!
        </p>
      </div>

      {loading && (
        <div className="text-center text-purple-400">Loading schools...</div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 text-center text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && schools.length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-12 text-center">
          <p className="text-gray-400">No schools found. Check back soon!</p>
        </div>
      )}

      {!loading && !error && schools.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Want to Add Your School?</h3>
        <p className="text-gray-300 mb-6">
          We're always excited to welcome new schools to Idaho esports. 
          Check out our getting started guide or contact us directly.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/expecting"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Getting Started Guide
          </a>
          <a
            href="/contact"
            className="px-6 py-3 bg-slate-800 rounded-lg text-white font-semibold hover:bg-slate-700 transition-all border border-purple-500/50"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};