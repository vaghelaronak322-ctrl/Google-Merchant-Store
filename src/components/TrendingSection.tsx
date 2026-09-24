import React, { useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ga4 } from '../services/ga4';

interface TrendingSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllTrending: () => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  onSelectProduct,
  onViewAllTrending,
}) => {
  // Select trending 6 products
  const trendingProducts = products
    .filter((p) => p.isTrending || p.badge === 'Trending')
    .slice(0, 6);

  useEffect(() => {
    if (trendingProducts.length > 0) {
      ga4.viewItemList(
        'trending_now',
        'Trending Now - Most Viewed Products',
        trendingProducts.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          item_category: p.category,
          price: p.price,
        }))
      );
    }
  }, [trendingProducts.length]);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Engagement</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">GA4 Top 6</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Trending Now
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Most viewed products this month based on verified visitor engagement.
            </p>
          </div>

          <button
            onClick={onViewAllTrending}
            className="text-xs font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto group"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trendingProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              listName="Trending Now"
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
