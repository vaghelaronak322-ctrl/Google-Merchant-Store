import React from 'react';
import { Heart, X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Saved Wishlist
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any Google merchandise item to save it for later or compare.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Browse Merchandise
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-4">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div 
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {product.category} · {product.material}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => addToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Move All ({wishlistProducts.length}) to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
