import React, { useEffect } from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { ga4 } from '../services/ga4';

interface BestSellersSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllBestSellers: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onSelectProduct,
  onViewAllBestSellers,
}) => {
  const bestSellers = products
    .filter((p) => p.isBestseller || p.badge === 'Bestseller')
    .slice(0, 6);

  useEffect(() => {
    if (bestSellers.length > 0) {
      ga4.viewItemList(
        'best_sellers',
        'Best Sellers - Customer Favourites',
        bestSellers.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          item_category: p.category,
          price: p.price,
        }))
      );
    }
  }, [bestSellers.length]);

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Customer Demand</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Over 4.7★ Average Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Best Sellers
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Customer favourites you'll love, tested and treasured across the global developer community.
            </p>
          </div>

          <button
            onClick={onViewAllBestSellers}
            className="text-xs font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto group"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              listName="Best Sellers"
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
