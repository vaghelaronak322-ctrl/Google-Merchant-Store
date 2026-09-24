import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import campaignImage from '../assets/images/campaign_merch_drop_1790184525517.jpg';
import { ga4 } from '../services/ga4';

interface CampaignSectionProps {
  onExploreCollection: () => void;
}

export const CampaignSection: React.FC<CampaignSectionProps> = ({ onExploreCollection }) => {
  const handleClick = () => {
    ga4.pageView('Google Merch+ - Campaign Drop', window.location.href, '/campaign/merch-drop');
    onExploreCollection();
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          {/* Editorial Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Google Merch Drop · Limited 2026 Series</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.05]">
                  More Than Merch.
                </h2>

                <p className="text-base sm:text-lg text-slate-300 mt-6 leading-relaxed max-w-md">
                  Everyday essentials built with Google-inspired design. Engineered with high-density circular textiles, weather-sealed architecture, and tactile hardware for modern creators.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={handleClick}
                    className="px-8 py-4 bg-white text-slate-950 font-bold text-sm rounded-xl shadow-lg hover:bg-slate-100 transition-all duration-150 flex items-center gap-2 cursor-pointer group"
                  >
                    <span>Explore the Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <span className="text-xs text-slate-400 font-medium">
                    Strictly limited batches · GOTS Certified
                  </span>
                </div>
              </div>

              {/* Bottom Editorial Specs */}
              <div className="pt-10 mt-10 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl font-bold text-white font-display">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Renewable Fiber</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-display">0.0g</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Virgin Plastic</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-display">400 GSM</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Heavy French Terry</div>
                </div>
              </div>
            </div>

            {/* Right Editorial Visual */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full">
              <img
                src={campaignImage}
                alt="Google Merch Drop Campaign Editorial Shoot"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80 lg:opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
