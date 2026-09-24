import React from 'react';
import { 
  Shirt, 
  Briefcase, 
  Coffee, 
  Watch, 
  Laptop, 
  Sparkles, 
  Compass, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES, Category } from '../data/products';
import { ga4 } from '../services/ga4';

interface CategorySectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Watch':
        return <Watch className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Shirt className="w-5 h-5" />;
    }
  };

  const handleCategoryClick = (category: Category) => {
    ga4.pageView(`Google Merch+ - Category: ${category.name}`, window.location.href, `/shop?category=${encodeURIComponent(category.name)}`);
    onSelectCategory(category.name);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span>Curated Departments</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">8 Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore purpose-built merchandise tailored for creators, engineers, and everyday tech enthusiasts.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group relative text-left bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Category Product Image Preview */}
              <div className="relative h-36 sm:h-40 w-full bg-slate-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={`${cat.name} Category`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Top Badge with Icon & Count */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div 
                    className="w-8 h-8 rounded-xl backdrop-blur-md bg-white/90 shadow-sm flex items-center justify-center transition-colors group-hover:scale-105"
                    style={{ color: cat.accentColor }}
                  >
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-xs text-white shadow-xs">
                    {cat.itemCount} items
                  </span>
                </div>
              </div>

              {/* Title & Description Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Subtle hover accent bar */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cat.accentColor }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
