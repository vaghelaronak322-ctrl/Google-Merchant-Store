import React, { useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';
import { ga4 } from '../services/ga4';
import { GA4_CONFIG } from '../config/ga4Config';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onSelectProduct,
}) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    shipping, 
    freeShippingProgress, 
    total,
    addToCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discount
  } = useCart();

  const [promoInput, setPromoInput] = React.useState('');

  useEffect(() => {
    if (isCartOpen) {
      ga4.viewCart(
        cart.map((item) => ({
          item_id: item.product.id,
          item_name: item.product.name,
          item_category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
          item_variant: `${item.color}${item.size ? ` / ${item.size}` : ''}`,
        }))
      );
    }
  }, [isCartOpen, cart]);

  if (!isCartOpen) return null;

  // 3 Quick-add recommendations not yet in cart
  const cartProductIds = cart.map((c) => c.product.id);
  const quickRecommendations = PRODUCTS
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 3);

  const handleCheckoutClick = () => {
    ga4.beginCheckout(
      cart.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
      appliedPromo || undefined
    );
    setIsCartOpen(false);
    onProceedToCheckout();
  };

  const remainingForFreeShipping = Math.max(0, GA4_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Your Shopping Cart
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 sm:px-6 py-3 bg-blue-50/60 border-b border-blue-100/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">You unlocked FREE Carbon-Neutral Shipping!</span>
              ) : (
                <span>Add <span className="text-blue-600 font-bold tabular-nums">${remainingForFreeShipping.toFixed(2)}</span> more for Free Shipping</span>
              )}
            </span>
            <span className="text-[11px] text-slate-500 tabular-nums">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Line Items Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our sustainable Google merchandise drops and discover your everyday essentials.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      setIsCartOpen(false);
                      onSelectProduct(item.product);
                    }}
                    className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            onSelectProduct(item.product);
                          }}
                          className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5 space-x-1">
                        <span>{item.color}</span>
                        {item.size && (
                          <>
                            <span>·</span>
                            <span>{item.size}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs tabular-nums text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Recommendations ("Recommended for you" 3 items) */}
          {cart.length > 0 && quickRecommendations.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Recommended for you</span>
              </div>
              <div className="space-y-2.5">
                {quickRecommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 transition-colors"
                  >
                    <div 
                      onClick={() => {
                        setIsCartOpen(false);
                        onSelectProduct(prod);
                      }}
                      className="flex items-center gap-3 cursor-pointer min-w-0"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                        <p className="text-[11px] text-slate-500 tabular-nums">${prod.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(prod)}
                      className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer shadow-2xs"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal, Shipping, Promo & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
            {/* Promo Code Input */}
            <div className="space-y-1">
              {appliedPromo ? (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Promo {appliedPromo} applied (-${discount.toFixed(2)})
                  </span>
                  <button 
                    onClick={removePromoCode}
                    className="text-xs text-emerald-900 underline hover:text-rose-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. GOOGLE10)"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs uppercase focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (applyPromoCode(promoInput)) {
                        setPromoInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span className="tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit encrypted checkout with buyer protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
