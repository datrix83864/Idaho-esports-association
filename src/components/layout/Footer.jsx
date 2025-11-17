import React, { useEffect, useState } from "react";
import { queries } from "../../services/sanity";

export const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    queries
      .getSiteSettings()
      .then(setSettings)
      .catch((err) => {
        console.warn("Failed to load footer settings:", err);
        setSettings({}); // Set empty object to prevent hanging
      });
  }, []);

  return (
    <footer className="relative z-10 mt-20 border-t border-purple-500/30 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-purple-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/schools" className="hover:text-purple-400">
                  Schools
                </a>
              </li>
              <li>
                <a href="/rules" className="hover:text-purple-400">
                  Rules
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-purple-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/expecting" className="hover:text-purple-400">
                  Getting Started Guide
                </a>
              </li>
              {settings?.tournamentPlatformUrl && (
                <li>
                  <a
                    href={settings.tournamentPlatformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400"
                  >
                    Tournament Platform
                  </a>
                </li>
              )}
              {settings?.merchStoreUrl && (
                <li>
                  <a
                    href={settings.merchStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400"
                  >
                    Merch Store
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/support" className="hover:text-purple-400">
                  Become a Sponsor
                </a>
              </li>
              <li>
                <a href="/support#donate" className="hover:text-purple-400">
                  Donate
                </a>
              </li>
              <li>
                <a href="/sponsors" className="hover:text-purple-400">
                  Our Sponsors
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              {settings?.discordInvite && (
                <li>
                  <a
                    href={settings.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400"
                  >
                    Discord Community
                  </a>
                </li>
              )}
              <li>
                <a href="/contact" className="hover:text-purple-400">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-500/30 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Idaho Esports Association.
            Non-Profit Organization.
          </p>
          <p className="mt-2 text-sm">
            Committed to transparency and fair play in Idaho gaming.
          </p>
        </div>
      </div>
    </footer>
  );
};
