import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Check, 
  ArrowUpDown, 
  Sparkles,
  RefreshCw,
  Filter
} from 'lucide-react';
import { Product, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { ga4 } from '../services/ga4';

interface ShopPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
  initialSearchQuery?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  onSelectProduct,
  initialCategory = 'all',
  initialSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [badgeFilter, setBadgeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'bestsellers') {
          if (!p.isBestseller) return false;
        } else if (selectedCategory === 'new-arrivals') {
          if (!p.isNewArrival && p.badge !== 'New') return false;
        } else if (selectedCategory === 'wishlist') {
          // handled in parent or cart
        } else {
          const matchCat = (itemCat: string, targetCat: string) => {
            const i = itemCat.toLowerCase();
            const t = targetCat.toLowerCase();
            if (i === t) return true;
            if ((i.includes('backpack') || i.includes('bag')) && (t.includes('backpack') || t.includes('bag'))) {
              return true;
            }
            return false;
          };
          if (!matchCat(p.category, selectedCategory)) {
            return false;
          }
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesMaterial = p.material.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesMaterial) {
          return false;
        }
      }

      // Price Range Filter
      if (selectedPriceRange === 'under-25') {
        if (p.price >= 25) return false;
      } else if (selectedPriceRange === '25-50') {
        if (p.price < 25 || p.price > 50) return false;
      } else if (selectedPriceRange === '50-75') {
        if (p.price < 50 || p.price > 75) return false;
      } else if (selectedPriceRange === 'over-75') {
        if (p.price < 75) return false;
      }

      // Rating Filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Badge / Eco Filter
      if (badgeFilter === 'bestseller' && !p.isBestseller) return false;
      if (badgeFilter === 'trending' && !p.isTrending) return false;
      if (badgeFilter === 'eco' && p.badge !== 'Eco-Choice') return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestselling') return b.reviewsCount - a.reviewsCount;
      // Default: Popular
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
    });
  }, [products, selectedCategory, searchQuery, selectedPriceRange, minRating, badgeFilter, sortBy]);

  // Send GA4 view_item_list when results change
  useEffect(() => {
    ga4.viewItemList(
      `shop_${selectedCategory}`,
      `Shop Listing: ${selectedCategory}`,
      filteredProducts.map((p) => ({
        item_id: p.id,
        item_name: p.name,
        item_category: p.category,
        price: p.price,
      }))
    );
  }, [selectedCategory, filteredProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      ga4.search(searchQuery.trim());
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedPriceRange('all');
    setMinRating(0);
    setBadgeFilter('all');
    setSortBy('popular');
  };

  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (badgeFilter !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <span>Storefront Catalog</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">
              Showing {filteredProducts.length} of {products.length} Products
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            {selectedCategory === 'all' 
              ? 'All Merchandise' 
              : selectedCategory === 'bestsellers'
              ? 'Best Selling Collection'
              : selectedCategory === 'new-arrivals'
              ? 'New Arrivals'
              : `${selectedCategory} Collection`}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ethically sourced Google lifestyle apparel, technical bags, reusable drinkware and collectibles.
          </p>
        </div>

        {/* Top Control Bar: Search & Sort & Mobile Filter Toggle */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, material, or style..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Right Actions: Sort dropdown & Mobile Filter button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  <option value="popular">Popularity</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Left Filter Sidebar (Desktop) + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                  <span className="text-sm font-bold text-slate-900">Filters</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] text-slate-400">{products.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-slate-400">
                        {products.filter((p) => p.category === cat.name).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Price
                </h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25', label: 'Under $25' },
                    { id: '25-50', label: '$25 to $50' },
                    { id: '50-75', label: '$50 to $75' },
                    { id: 'over-75', label: 'Over $75' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPriceRange(p.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        selectedPriceRange === p.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{p.label}</span>
                      {selectedPriceRange === p.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-1.5">
                  {[
                    { val: 0, label: 'Any Rating' },
                    { val: 4.8, label: '4.8★ & above' },
                    { val: 4.5, label: '4.5★ & above' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setMinRating(r.val)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        minRating === r.val
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{r.label}</span>
                      {minRating === r.val && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badges / Availability */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Special Badges
                </h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'bestseller', label: 'Bestsellers Only' },
                    { id: 'trending', label: 'Trending Only' },
                    { id: 'eco', label: 'Eco-Choice Only' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBadgeFilter(b.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        badgeFilter === b.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{b.label}</span>
                      {badgeFilter === b.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  No merchandise found
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your keywords or clearing selected filters to explore our full Google Merch collection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    listName={`Shop - ${selectedCategory}`}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-base font-bold text-slate-900">Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category select */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`p-2 rounded-lg text-xs font-medium text-left ${
                      selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className={`p-2 rounded-lg text-xs font-medium text-left truncate ${
                        selectedCategory === c.name ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price select */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Price</h4>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-25', label: 'Under $25' },
                    { id: '25-50', label: '$25 to $50' },
                    { id: '50-75', label: '$50 to $75' },
                    { id: 'over-75', label: 'Over $75' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPriceRange(p.id)}
                      className={`w-full p-2 text-xs rounded-lg text-left flex justify-between ${
                        selectedPriceRange === p.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{p.label}</span>
                      {selectedPriceRange === p.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-xs"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
