import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { PRODUCTS, Product } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { TrendingSection } from './components/TrendingSection';
import { CampaignSection } from './components/CampaignSection';
import { BestSellersSection } from './components/BestSellersSection';
import { RecommendationSection } from './components/RecommendationSection';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SustainabilityModal } from './components/SustainabilityModal';
import { AboutModal } from './components/AboutModal';
import { AccountModal } from './components/AccountModal';
import { GA4VivaInspector } from './components/GA4VivaInspector';
import { Footer } from './components/Footer';
import { ga4 } from './services/ga4';
import { BarChart3, Sparkles, X } from 'lucide-react';

type ViewMode = 'home' | 'shop' | 'product-detail' | 'checkout';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('all');
  const [shopSearchQuery, setShopSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSustainabilityOpen, setIsSustainabilityOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isVivaInspectorOpen, setIsVivaInspectorOpen] = useState(false);
  const [showVivaFloatingBanner, setShowVivaFloatingBanner] = useState(true);

  // Initial Pageview
  useEffect(() => {
    ga4.pageView('Google Merch+ - Home', window.location.href, '/');
  }, []);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ga4.pageView('Google Merch+ - Home', window.location.href, '/');
  };

  const handleNavigateShop = (category: string = 'all', search: string = '') => {
    setShopCategoryFilter(category);
    setShopSearchQuery(search);
    setCurrentView('shop');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ga4.pageView(`Google Merch+ - Shop (${category})`, window.location.href, `/shop?category=${encodeURIComponent(category)}`);
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    ga4.pageView('Google Merch+ - Checkout', window.location.href, '/checkout');
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white antialiased">
        {/* Academic Viva Quick Access Floating Banner */}
        {showVivaFloatingBanner && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2 text-xs border-b border-blue-800 flex items-center justify-between z-40">
            <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1 justify-center text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-semibold text-blue-200">College Project Presentation:</span>
              <span className="hidden sm:inline text-slate-300">
                Google Analytics 4 E-commerce Behaviour Analysis & 10 UX Improvements.
              </span>
              <button
                onClick={() => setIsVivaInspectorOpen(true)}
                className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-[11px] transition-colors cursor-pointer shadow-xs"
              >
                Launch Viva Inspector &rarr;
              </button>
            </div>
            <button
              onClick={() => setShowVivaFloatingBanner(false)}
              className="text-slate-400 hover:text-white p-1 ml-2 cursor-pointer"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Global Responsive Sticky Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          onNavigateHome={handleNavigateHome}
          onNavigateCategory={handleNavigateShop}
          onOpenSustainability={() => setIsSustainabilityOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenViva={() => setIsVivaInspectorOpen(true)}
        />

        {/* Main Content Router */}
        <main className="flex-1">
          {currentView === 'home' && (
            <>
              {/* Hero */}
              <Hero
                onShopNow={() => handleNavigateShop('all')}
                onExploreCollections={() => handleNavigateShop('Apparel')}
              />

              {/* Shop by Category (8 Curated Cards) */}
              <CategorySection onSelectCategory={handleNavigateShop} />

              {/* Trending Now (6 Top Engagement Products) */}
              <TrendingSection
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
                onViewAllTrending={() => handleNavigateShop('all')}
              />

              {/* Campaign Merch Drop ("More Than Merch") */}
              <CampaignSection
                onExploreCollection={() => handleNavigateShop('new-arrivals')}
              />

              {/* Best Sellers (Customer Favourites) */}
              <BestSellersSection
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
                onViewAllBestSellers={() => handleNavigateShop('bestsellers')}
              />

              {/* Recommended For You & Complete Your Look Bundle */}
              <RecommendationSection
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
              />
            </>
          )}

          {currentView === 'shop' && (
            <ShopPage
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              initialCategory={shopCategoryFilter}
              initialSearchQuery={shopSearchQuery}
            />
          )}

          {currentView === 'product-detail' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
              allProducts={PRODUCTS}
              onBack={() => setCurrentView('home')}
              onSelectProduct={handleSelectProduct}
              onProceedToCheckout={handleProceedToCheckout}
            />
          )}

          {currentView === 'checkout' && (
            <CheckoutPage
              onBackToCart={() => setCurrentView('home')}
              onOrderSuccess={(orderId) => {
                // Kept on confirmed screen inside CheckoutPage
              }}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenSustainability={() => setIsSustainabilityOpen(true)}
          onOpenViva={() => setIsVivaInspectorOpen(true)}
          onNavigateCategory={handleNavigateShop}
        />

        {/* Floating Viva Mode Button (Corner FAB) */}
        <button
          onClick={() => setIsVivaInspectorOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-slate-900/90 hover:bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-xl border border-slate-700/80 backdrop-blur-md text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer group"
          aria-label="Open Viva Mode"
        >
          <BarChart3 className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">GA4 Project Viva Mode</span>
          <span className="sm:hidden">Viva</span>
        </button>

        {/* Drawers & Modals */}
        <CartDrawer
          onProceedToCheckout={handleProceedToCheckout}
          onSelectProduct={handleSelectProduct}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          onSelectProduct={handleSelectProduct}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={handleSelectProduct}
          onSearchAll={(q) => handleNavigateShop('all', q)}
        />

        <SustainabilityModal
          isOpen={isSustainabilityOpen}
          onClose={() => setIsSustainabilityOpen(false)}
        />

        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          onOpenViva={() => setIsVivaInspectorOpen(true)}
        />

        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onOpenViva={() => setIsVivaInspectorOpen(true)}
        />

        <GA4VivaInspector
          isOpen={isVivaInspectorOpen}
          onClose={() => setIsVivaInspectorOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
