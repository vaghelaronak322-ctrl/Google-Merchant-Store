import React from 'react';
import { User, X, Package, MapPin, Leaf, Shield, Award } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenViva: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onOpenViva }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              RV
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Ronak Vaghela
              </h3>
              <p className="text-xs text-slate-500">vaghelaronak322@gmail.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-slate-600">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-slate-900 font-bold">
              <span className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Recent Orders</span>
              </span>
              <span className="text-[11px] text-slate-500">1 Delivered</span>
            </div>
            <div className="text-slate-700 font-medium">
              Order #GM-82914 · 2 Items · $117.00
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold">
              Delivered Oct 14 · Eco Carbon-Neutral Carrier
            </div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Your Green Impact</span>
            </div>
            <p className="text-slate-600">
              Your orders diverted <strong>14.2 lbs of plastic</strong> and offset <strong>100% of delivery emissions</strong>.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenViva();
            }}
            className="w-full p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Award className="w-4 h-4 text-blue-600" />
            <span>Open GA4 Project Viva Defense Mode</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 cursor-pointer"
        >
          Sign Out / Close
        </button>
      </div>
    </div>
  );
};
