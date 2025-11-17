import React, { useState, useEffect } from 'react';

export const StreamOverlay = () => {
  const [sponsors, setSponsors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const tier = params.get('tier'); // Optional: ?tier=platinum
  const position = params.get('position') || 'bottom-right'; // bottom-right, bottom-left, top-right, top-left
  const size = params.get('size') || 'medium'; // small, medium, large

  // Fetch sponsors from webhook
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const url = tier 
          ? `/.netlify/functions/sponsor-webhook?tier=${tier}`
          : '/.netlify/functions/sponsor-webhook';
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.sponsors && data.sponsors.length > 0) {
          setSponsors(data.sponsors);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch sponsors:', error);
        setLoading(false);
      }
    };

    fetchSponsors();
    // Refresh sponsor list every 5 minutes
    const interval = setInterval(fetchSponsors, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tier]);

  // Rotate through sponsors
  useEffect(() => {
    if (sponsors.length === 0) return;

    const currentSponsor = sponsors[currentIndex];
    const duration = (currentSponsor?.duration || 5) * 1000;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, sponsors]);

  if (loading || sponsors.length === 0) {
    return null; // Don't show anything while loading or if no sponsors
  }

  const currentSponsor = sponsors[currentIndex];

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  // Size classes
  const sizeClasses = {
    small: 'w-48 h-32',
    medium: 'w-64 h-40',
    large: 'w-80 h-48',
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className={`fixed ${positionClasses[position]} pointer-events-auto`}>
        <div 
          className={`${sizeClasses[size]} bg-slate-900/90 backdrop-blur-md border-2 border-purple-500/50 rounded-xl p-4 shadow-2xl animate-fadeIn`}
          key={currentSponsor.id}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex-1 flex items-center justify-center mb-2">
              <img 
                src={currentSponsor.logo} 
                alt={currentSponsor.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Sponsored by</p>
              <p className="text-sm font-bold text-white">{currentSponsor.name}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
