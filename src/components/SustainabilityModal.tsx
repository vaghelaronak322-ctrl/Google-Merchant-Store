import React from 'react';
import { Leaf, X, CheckCircle2, Globe, Wind, Droplets, ShieldCheck } from 'lucide-react';

interface SustainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SustainabilityModal: React.FC<SustainabilityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 max-h-[85vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Sustainability Commitment 2026
              </h3>
              <p className="text-xs text-slate-500">Circular textiles & carbon-neutral supply chain</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-xs text-slate-600">
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            At Google Merch+, style meets environmental responsibility. Every product in this collection is designed from inception with circular materials, non-toxic chemistry, and sustainable longevity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Leaf className="w-4 h-4" />
                <span>100% GOTS Organic Cotton</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Grown without synthetic pesticides or GMO seeds, using 91% less blue water than conventional cotton farming.
              </p>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-800 font-bold">
                <Droplets className="w-4 h-4" />
                <span>Ocean-Bound RPET Polyester</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Our bags and organizers divert post-consumer plastic bottles from coastal ecosystems into durable 1680D ballistic fabric.
              </p>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-bold">
                <Wind className="w-4 h-4" />
                <span>Zero Carbon Shipping</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                100% of order transportation emissions are offset via certified clean wind and bio-char sequestration programs.
              </p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-800 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Plastic-Free Packaging</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Shipped in 100% FSC certified unbleached recyclable cardboard printed with vegetable algae inks.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">Take-Back & Recycle Program</h4>
            <p className="leading-relaxed">
              When you're ready to retire your Google Merch hoodie or tee, return it using our prepaid label for 20% off your next purchase. We shred and re-spin old fibers into new yarn.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
