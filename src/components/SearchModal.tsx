import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Product } from '../data/products';
import { ga4 } from '../services/ga4';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchAll: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSearchAll,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      ga4.search(query.trim());
      onSearchAll(query.trim());
      onClose();
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    ga4.search(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google Merch+ (e.g., Hoodie, Dino, Backpack, Eco)..."
            className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 rounded-lg cursor-pointer"
          >
            Esc
          </button>
        </form>

        {/* Results or Trending Tags */}
        <div className="p-5 sm:p-6 max-h-96 overflow-y-auto">
          {query.trim() ? (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Matching Merchandise ({filtered.length})
              </div>

              {filtered.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-sm">
                  No merchandise matching &ldquo;{query}&rdquo;. Press Enter to explore full catalog.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(item);
                      }}
                      className="py-3 first:pt-0 flex items-center justify-between hover:bg-slate-50 rounded-xl px-2 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {item.category} · {item.material}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ${item.price.toFixed(2)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filtered.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      onSearchAll(query);
                      onClose();
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    View all matching results in Shop &rarr;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>Trending Searches this Month</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Chrome Dino Zip Hoodie',
                    'Pixel Backpack',
                    'YouTube Tumbler',
                    'Google Eco Tee',
                    'Android Plush',
                    'Organic Cotton',
                    'Google Cap',
                  ].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Browse by Popular Department
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Apparel', 'Backpacks', 'Drinkware', 'Accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSearchAll(cat);
                        onClose();
                      }}
                      className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 text-center transition-colors cursor-pointer border border-slate-200/60"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
