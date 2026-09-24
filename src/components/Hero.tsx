import React from 'react';
import { ArrowRight, Leaf, Globe, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import heroMerchImage from '../assets/images/hero_google_merch_collection_1790184505313.jpg';
import { ga4 } from '../services/ga4';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreCollections }) => {
  const handleShopClick = () => {
    ga4.pageView('Google Merch+ - Shop All', window.location.href, '/shop');
    onShopNow();
  };

  const handleCollectionsClick = () => {
    ga4.pageView('Google Merch+ - Collections', window.location.href, '/collections');
    onExploreCollections();
  };

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">
      {/* Subtle background ambient gradient mesh with Google 4-color softness */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Clean unboxed kicker with dot separator - Anti-pill discipline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="text-blue-600 font-bold">2026 Sustainable Edition</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>GOTS Organic Cotton</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Zero-Carbon Delivery</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1] text-balance">
              Your Google.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 bg-clip-text text-transparent">
                Your Style.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Official Google merchandise designed for everyday creators, tech lovers and Google fans. Thoughtfully engineered with circular materials and timeless aesthetics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleShopClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleCollectionsClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Collections</span>
              </button>
            </div>

            {/* Micro GA4 behavioral insight quote for viva presentation */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>GA4 Insight: 83% of return visitors explore curated tech apparel & bags</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame with Soft Shadow & Border */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/70 group aspect-[16/10]">
                <img
                  src={heroMerchImage}
                  alt="Google Merch+ Curated Collection: Organic Hoodie, Backpack, Water Bottle and Tech Accessories"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Curated Creator Capsule 2026</span>
                  </div>
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 tabular-nums">
                    From $22.00
                  </span>
                </div>
              </div>

              {/* Floating Google 4-color dot cluster indicator */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white shadow-lg rounded-xl p-3 border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="flex -space-x-1">
                  <span className="w-3 h-3 rounded-full bg-[#4285F4] ring-2 ring-white" />
                  <span className="w-3 h-3 rounded-full bg-[#EA4335] ring-2 ring-white" />
                  <span className="w-3 h-3 rounded-full bg-[#FBBC05] ring-2 ring-white" />
                  <span className="w-3 h-3 rounded-full bg-[#34A853] ring-2 ring-white" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">100% Verified Authentic</p>
                  <p className="text-[10px] text-slate-500">Official Google Merch+ Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Trust Indicators Below the Hero */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Sustainable Materials</h4>
                <p className="text-[11px] text-slate-500">100% GOTS organic & recycled RPET</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Worldwide Shipping</h4>
                <p className="text-[11px] text-slate-500">Direct zero-carbon dispatch to 80+ countries</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Easy Returns</h4>
                <p className="text-[11px] text-slate-500">30-day hassle-free prepaid return label</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">Secure Checkout</h4>
                <p className="text-[11px] text-slate-500">256-bit encrypted card & UPI payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
