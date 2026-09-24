import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ga4 } from '../services/ga4';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  listName?: string;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  listName = 'Product Grid',
  index = 0,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    ga4.selectItem(listName.toLowerCase().replace(/\s+/g, '_'), listName, {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      index,
    });
    onSelectProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Badge (Bestseller / Trending / Eco-Choice / New) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${
                product.badge === 'Bestseller'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : product.badge === 'Trending'
                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                  : product.badge === 'Eco-Choice'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-rose-500 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Hover Quick Actions Overlay (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl backdrop-blur-xs shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="p-2 bg-white/95 hover:bg-white text-slate-800 rounded-xl shadow-md transition-colors cursor-pointer"
            aria-label="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
            <span className="font-medium truncate">{product.category}</span>
            <div className="flex items-center gap-1 shrink-0 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold tabular-nums text-[11px]">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-slate-300/80"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-0.5">
                +{product.colors.length} colors
              </span>
            </div>
          )}
        </div>

        {/* Price & Mobile Add to Cart button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">In Stock</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="sm:hidden px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 active:bg-blue-600 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
