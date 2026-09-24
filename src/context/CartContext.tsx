import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { ga4, GA4Item } from '../services/ga4';
import { GA4_CONFIG } from '../config/ga4Config';

export interface CartItem {
  id: string; // unique item id composed of productId-color-size
  product: Product;
  color: string;
  size?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  recentlyViewed: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  markAsViewed: (productId: string) => void;
  subtotal: number;
  shipping: number;
  freeShippingProgress: number; // 0 to 100%
  tax: number;
  total: number;
  cartCount: number;
  discount: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gm_viewed');
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-003'];
    } catch {
      return ['prod-001', 'prod-003'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('gm_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('gm_viewed', JSON.stringify(recentlyViewed));
    } catch {
      // ignore
    }
  }, [recentlyViewed]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const markAsViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const addToCart = (
    product: Product,
    color?: string,
    size?: string,
    quantity: number = 1
  ) => {
    const selectedColor = color || product.colors[0]?.name || 'Standard';
    const selectedSize = size || (product.sizes ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${selectedColor}-${selectedSize || 'default'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            color: selectedColor,
            size: selectedSize,
            quantity,
          },
        ];
      }
    });

    // GA4 Tracking
    const gaItem: GA4Item = {
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity,
      item_variant: `${selectedColor}${selectedSize ? ` / ${selectedSize}` : ''}`,
    };
    ga4.addToCart(gaItem, quantity);

    showToast(`Added ${product.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((item) => item.id === cartItemId);
    if (itemToRemove) {
      const gaItem: GA4Item = {
        item_id: itemToRemove.product.id,
        item_name: itemToRemove.product.name,
        item_category: itemToRemove.product.category,
        price: itemToRemove.product.price,
        quantity: itemToRemove.quantity,
        item_variant: `${itemToRemove.color}${itemToRemove.size ? ` / ${itemToRemove.size}` : ''}`,
      };
      ga4.removeFromCart(gaItem, itemToRemove.quantity);
      showToast(`Removed ${itemToRemove.product.name} from cart`);
    }

    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product.id]);
      const gaItem: GA4Item = {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      };
      ga4.addToWishlist(gaItem);
      showToast(`Saved to wishlist`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GOOGLE10' || cleanCode === 'VIVA2026') {
      setAppliedPromo(cleanCode);
      setDiscountPercent(cleanCode === 'VIVA2026' ? 20 : 10);
      showToast(`Promo ${cleanCode} applied!`);
      return true;
    }
    showToast('Invalid promo code. Try GOOGLE10');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    showToast('Promo code removed');
  };

  // Pricing calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discount;

  const shipping =
    subtotal === 0 || discountedSubtotal >= GA4_CONFIG.FREE_SHIPPING_THRESHOLD
      ? 0
      : GA4_CONFIG.STANDARD_SHIPPING_COST;

  const freeShippingProgress = Math.min(
    100,
    Math.round((discountedSubtotal / GA4_CONFIG.FREE_SHIPPING_THRESHOLD) * 100)
  );

  const tax = Number((discountedSubtotal * 0.08).toFixed(2));
  const total = Number((discountedSubtotal + shipping + tax).toFixed(2));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        markAsViewed,
        subtotal,
        shipping,
        freeShippingProgress,
        tax,
        total,
        cartCount,
        discount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
