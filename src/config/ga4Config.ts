/**
 * Google Analytics 4 (GA4) Configuration for Google Merch+
 * 
 * COLLEGE PROJECT GA4 IMPLEMENTATION GUIDE:
 * This file is the single source of truth for the GA4 Measurement ID and tracking behavior.
 * When deploying to production or connecting to a live Google Analytics 4 property:
 * 1. Create a GA4 Web Data Stream in Google Analytics (Admin > Data Streams > Web).
 * 2. Copy the Measurement ID (format: G-XXXXXXXXXX).
 * 3. Replace the placeholder below or supply VITE_GA4_MEASUREMENT_ID in your environment variables.
 */

export const GA4_CONFIG = {
  // Measurement ID: Replace with your actual GA4 ID (e.g., 'G-AB12CD34EF')
  MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-MERCHPLUS01',
  
  // Controls whether events are printed to the browser console and live Viva event bus
  DEBUG_MODE: true,
  
  // Default currency for Google Merch+ store
  CURRENCY: 'USD',
  
  // Free shipping threshold in USD (based on GA4 cart-drop analysis)
  FREE_SHIPPING_THRESHOLD: 50.00,
  
  // Standard shipping cost if subtotal is below threshold
  STANDARD_SHIPPING_COST: 4.99,
};
