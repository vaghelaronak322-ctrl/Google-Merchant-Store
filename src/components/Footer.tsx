import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, Heart, BarChart3, Leaf } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenSustainability: () => void;
  onOpenViva: () => void;
  onNavigateCategory: (categoryName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenSustainability,
  onOpenViva,
  onNavigateCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                Google
              </span>
              <span className="text-2xl font-bold tracking-tight text-blue-400 font-display">
                Merch
              </span>
              <span className="text-2xl font-black text-rose-500 font-display">
                +
              </span>
              <div className="flex items-center gap-1 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              </div>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              &ldquo;Your Google. Your Style.&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Official Google merchandise thoughtfully crafted with circular materials, non-toxic dyes, and minimal functional aesthetics for creators, developers, and tech fans worldwide.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenViva}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950 text-blue-300 border border-blue-800/80 text-xs font-semibold hover:bg-blue-900 transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                <span>Open GA4 Project Viva Mode</span>
              </button>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-700/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Exclusive Drops & Early Access
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                Get the latest merch drops.
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Subscribe for limited seasonal capsule notifications, sustainability reports, and member-only bundle savings.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/80">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Welcome aboard! You are now subscribed to Google Merch+ release drops.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-9 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Links Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Shop Departments</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => onNavigateCategory('Apparel')} className="hover:text-white transition-colors cursor-pointer">
                  Apparel & Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('Backpacks')} className="hover:text-white transition-colors cursor-pointer">
                  Backpacks & Tech Carry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('Drinkware')} className="hover:text-white transition-colors cursor-pointer">
                  Tumblers & Bottles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('Accessories')} className="hover:text-white transition-colors cursor-pointer">
                  Caps, Socks & Beanie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('Collectibles')} className="hover:text-white transition-colors cursor-pointer">
                  Android & Chrome Dino
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">About & Sustainability</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  About Google Merch+
                </button>
              </li>
              <li>
                <button onClick={onOpenSustainability} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sustainability Report</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveInfoModal('Contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setActiveInfoModal('FAQ')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => setActiveInfoModal('Shipping')} className="hover:text-white transition-colors cursor-pointer">
                  Shipping Rates & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveInfoModal('Returns')} className="hover:text-white transition-colors cursor-pointer">
                  30-Day Easy Returns
                </button>
              </li>
              <li>
                <button onClick={() => setActiveInfoModal('Terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveInfoModal('Privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">Academic & Viva</h4>
            <div className="space-y-2.5 text-slate-400">
              <p className="leading-relaxed">
                College Project based on GA4 Ecommerce Behaviour Analysis of the Google Merchandise Store.
              </p>
              <div className="pt-1">
                <button
                  onClick={onOpenViva}
                  className="text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
                >
                  View Viva Defense Slides &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Zero-Slop Signoff */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Google Merch+ · Built for GA4 Academic Presentation & Project Viva.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% GOTS Certified Cotton</span>
            <span>·</span>
            <span>Zero Plastic Packaging</span>
            <span>·</span>
            <span>Carbon-Neutral Delivery</span>
          </div>
        </div>
      </div>

      {/* Generic Info Modal for Footer Links */}
      {activeInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveInfoModal(null)}
          />
          <div className="relative bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 animate-in zoom-in-95">
            <h3 className="text-lg font-bold font-display mb-2">{activeInfoModal} Information</h3>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              {activeInfoModal === 'Shipping' && (
                <p>
                  Free carbon-neutral shipping is provided on all orders over $50 USD. Orders are dispatched within 24 hours from our certified zero-carbon distribution hubs with 3-5 business day transit.
                </p>
              )}
              {activeInfoModal === 'Returns' && (
                <p>
                  We offer a 30-day no-questions-asked return window. Every package includes a prepaid carbon-neutral return shipping label. Returned apparel is inspected and cycled into our circular recycling stream.
                </p>
              )}
              {activeInfoModal === 'Contact' && (
                <p>
                  Support hours: Mon-Fri, 9am - 6pm PST. Email us at merch-support@google.com or contact student researcher Ronak Vaghela for college viva queries.
                </p>
              )}
              {activeInfoModal === 'FAQ' && (
                <p>
                  <strong>Are products officially licensed?</strong> Yes, all merchandise in Google Merch+ represents authentic Google lifestyle and developer designs.
                </p>
              )}
              {activeInfoModal === 'Privacy' && (
                <p>
                  Your privacy is paramount. In this prototype, data is stored locally in your browser session and simulated via GA4 standard event telemetry.
                </p>
              )}
              {activeInfoModal === 'Terms' && (
                <p>
                  Google Merch+ is created for educational project evaluation and UX redesign verification. All product designs and trademarks belong to their respective owners.
                </p>
              )}
            </div>
            <button
              onClick={() => setActiveInfoModal(null)}
              className="mt-5 w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
