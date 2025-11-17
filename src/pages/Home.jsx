import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { NewsletterSignup } from "../components/newsletter/NewsletterSignup";
import { queries } from "../services/sanity";

export const Home = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    queries
      .getSiteSettings()
      .then(setSettings)
      .catch((err) => {
        console.warn("Failed to load site settings:", err);
        setSettings({}); // Set empty object to prevent hanging
      });
  }, []);

  return (
    <div className="relative">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
            Idaho Esports Association
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Building Idaho's premier competitive gaming community through fair
            play, transparency, and inclusive opportunities for all skill
            levels.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link
              to="/expecting"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2 shadow-lg"
            >
              <span>Start an Esports Team</span>
              <ChevronRight className="w-5 h-5" />
            </Link>

            {settings?.tournamentPlatformUrl && (
              <a
                href={settings.tournamentPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-800 rounded-lg text-white font-semibold hover:bg-slate-700 transition-all border border-purple-500/50 flex items-center space-x-2"
              >
                <span>Join Tournament</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Trophy,
              title: "Competitive Excellence",
              description:
                "Regular tournaments across multiple games with fair rules and professional organization.",
              link: "/rules",
            },
            {
              icon: Users,
              title: "Community Driven",
              description:
                "Built by Idaho gamers, for Idaho gamers. Join our Discord and connect with local players.",
              link: "/schools",
            },
            {
              icon: BookOpen,
              title: "Educational Resources",
              description:
                "Comprehensive guides for coaches, players, and schools looking to start esports programs.",
              link: "/expecting",
            },
          ].map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 hover:border-purple-500 hover:scale-105 transition-all"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Active Schools</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400">Student Athletes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-400">Non-Profit</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">6+</div>
              <div className="text-gray-400">Games Supported</div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              For Schools & Coaches
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/expecting" className="hover:text-purple-400">
                  Getting Started Guide
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/rules" className="hover:text-purple-400">
                  Tournament Rules
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/contact" className="hover:text-purple-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              For Sponsors & Supporters
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/support" className="hover:text-purple-400">
                  Sponsorship Opportunities
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/sponsors" className="hover:text-purple-400">
                  Current Sponsors
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <Link to="/about" className="hover:text-purple-400">
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
