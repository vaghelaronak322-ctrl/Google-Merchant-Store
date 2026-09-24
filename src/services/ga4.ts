/**
 * GA4 Ecommerce Tracking Service
 * 
 * Implements GA4 standard ecommerce event schemas:
 * - page_view
 * - view_item_list
 * - select_item
 * - view_item
 * - add_to_cart
 * - remove_from_cart
 * - view_cart
 * - begin_checkout
 * - add_payment_info
 * - purchase
 * - search
 * - add_to_wishlist
 * 
 * VIVA / ACADEMIC NOTE:
 * GA4 Ecommerce events follow the official Google Analytics 4 schema specifications:
 * Reference: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

import { GA4_CONFIG } from '../config/ga4Config';

export interface GA4Item {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_category2?: string;
  price: number;
  quantity?: number;
  item_variant?: string;
  item_brand?: string;
  index?: number;
}

export interface LiveGA4Event {
  id: string;
  eventName: string;
  timestamp: string;
  params: Record<string, unknown>;
}

// Event bus for Viva/Inspector UI
type EventListener = (event: LiveGA4Event) => void;
const listeners: EventListener[] = [];

export const subscribeToGA4Events = (listener: EventListener) => {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
};

const dispatchLiveEvent = (eventName: string, params: Record<string, unknown>) => {
  const event: LiveGA4Event = {
    id: Math.random().toString(36).substring(2, 9),
    eventName,
    timestamp: new Date().toLocaleTimeString(),
    params,
  };
  
  if (GA4_CONFIG.DEBUG_MODE) {
    // eslint-disable-next-line no-console
    console.log(`[GA4 Event: ${eventName}]`, params);
  }
  
  // Forward to gtag if available in window
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }
  
  listeners.forEach((listener) => listener(event));
};

export const ga4 = {
  // Page view tracking
  pageView: (pageTitle: string, pageLocation?: string, pagePath?: string) => {
    dispatchLiveEvent('page_view', {
      page_title: pageTitle,
      page_location: pageLocation || (typeof window !== 'undefined' ? window.location.href : ''),
      page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    });
  },

  // When user views a list of products (category, search results, recommendations)
  viewItemList: (item_list_id: string, item_list_name: string, items: GA4Item[]) => {
    dispatchLiveEvent('view_item_list', {
      item_list_id,
      item_list_name,
      items: items.map((item, idx) => ({
        ...item,
        index: idx + 1,
        item_brand: item.item_brand || 'Google Merch+',
      })),
    });
  },

  // When user clicks a product in a list/grid
  selectItem: (item_list_id: string, item_list_name: string, item: GA4Item) => {
    dispatchLiveEvent('select_item', {
      item_list_id,
      item_list_name,
      items: [{
        ...item,
        item_brand: item.item_brand || 'Google Merch+',
      }],
    });
  },

  // When user lands on product detail view
  viewItem: (item: GA4Item, currency: string = GA4_CONFIG.CURRENCY) => {
    dispatchLiveEvent('view_item', {
      currency,
      value: item.price,
      items: [{
        ...item,
        quantity: 1,
        item_brand: item.item_brand || 'Google Merch+',
      }],
    });
  },

  // When item is added to shopping cart
  addToCart: (item: GA4Item, quantity: number = 1, currency: string = GA4_CONFIG.CURRENCY) => {
    const value = item.price * quantity;
    dispatchLiveEvent('add_to_cart', {
      currency,
      value,
      items: [{
        ...item,
        quantity,
        item_brand: item.item_brand || 'Google Merch+',
      }],
    });
  },

  // When item is removed from cart
  removeFromCart: (item: GA4Item, quantity: number = 1, currency: string = GA4_CONFIG.CURRENCY) => {
    const value = item.price * quantity;
    dispatchLiveEvent('remove_from_cart', {
      currency,
      value,
      items: [{
        ...item,
        quantity,
        item_brand: item.item_brand || 'Google Merch+',
      }],
    });
  },

  // When cart drawer or cart page is viewed
  viewCart: (items: GA4Item[], currency: string = GA4_CONFIG.CURRENCY) => {
    const value = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    dispatchLiveEvent('view_cart', {
      currency,
      value,
      items,
    });
  },

  // When customer clicks "Proceed to Checkout"
  beginCheckout: (items: GA4Item[], coupon?: string, currency: string = GA4_CONFIG.CURRENCY) => {
    const value = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    dispatchLiveEvent('begin_checkout', {
      currency,
      value,
      coupon: coupon || undefined,
      items,
    });
  },

  // When customer selects a payment option
  addPaymentInfo: (paymentType: string, items: GA4Item[], currency: string = GA4_CONFIG.CURRENCY) => {
    const value = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    dispatchLiveEvent('add_payment_info', {
      currency,
      value,
      payment_type: paymentType,
      items,
    });
  },

  // When purchase is completed
  purchase: (
    transactionId: string,
    items: GA4Item[],
    value: number,
    tax: number = 0,
    shipping: number = 0,
    coupon?: string,
    currency: string = GA4_CONFIG.CURRENCY
  ) => {
    dispatchLiveEvent('purchase', {
      transaction_id: transactionId,
      value,
      tax,
      shipping,
      currency,
      coupon: coupon || undefined,
      items,
    });
  },

  // When user searches for a product or category
  search: (searchTerm: string) => {
    dispatchLiveEvent('search', {
      search_term: searchTerm,
    });
  },

  // When user saves item to wishlist
  addToWishlist: (item: GA4Item, currency: string = GA4_CONFIG.CURRENCY) => {
    dispatchLiveEvent('add_to_wishlist', {
      currency,
      value: item.price,
      items: [{
        ...item,
        quantity: 1,
        item_brand: item.item_brand || 'Google Merch+',
      }],
    });
  },
};
