import React from 'react';
import { Sparkles, X, Heart, Shield, Globe, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenViva: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenViva }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 max-h-[85vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                Google
              </span>
              <span className="text-xl font-bold tracking-tight text-blue-600 font-display ml-1">
                Merch
              </span>
              <span className="text-xl font-black text-rose-500 font-display">
                +
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">&ldquo;Your Google. Your Style.&rdquo;</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-xs text-slate-600">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">
              About Google Merch+
            </h4>
            <p className="leading-relaxed">
              Google Merch+ is an elevated merchandise e-commerce platform designed for everyday creators, engineers, and tech enthusiasts. Rather than traditional promotional swag, we focus on timeless everyday essentials engineered with premium circular textiles, understated branding, and modern utilitarian aesthetics.
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Academic College Project & GA4 Thesis</span>
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onOpenViva();
                }}
                className="text-[11px] font-bold text-blue-700 underline hover:text-blue-900 cursor-pointer"
              >
                Launch Viva Mode &rarr;
              </button>
            </div>
            <p className="text-slate-700 leading-relaxed">
              This application is an end-to-end prototype built on empirical Google Analytics 4 data analysis of the official Google Merchandise Store. The UI specifically demonstrates 10 measurable improvements across product discovery, checkout simplicity, mobile responsiveness, and collaborative filtering.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-base font-bold text-slate-900">100%</div>
              <div className="text-[11px] text-slate-500">Ethically Certified</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-base font-bold text-slate-900">80+</div>
              <div className="text-[11px] text-slate-500">Countries Served</div>
            </div>
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
