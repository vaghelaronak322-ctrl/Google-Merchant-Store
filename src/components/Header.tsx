import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  BarChart3,
  ChevronRight,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ga4 } from '../services/ga4';

interface HeaderProps {
  currentView?: string;
  setCurrentView?: (view: string) => void;
  onOpenSearch: () => void;
  onOpenViva: () => void;
  onOpenSustainability: () => void;
  onOpenAbout: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  onNavigateHome?: () => void;
  onNavigateCategory?: (categoryName?: string, search?: string) => void;
  onSelectCategory?: (categoryName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView = 'home',
  setCurrentView,
  onOpenSearch,
  onOpenViva,
  onOpenSustainability,
  onOpenAbout,
  onOpenWishlist,
  onOpenAccount,
  onNavigateHome,
  onNavigateCategory,
  onSelectCategory,
}) => {
  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, category?: string) => {
    if (view === 'home' && onNavigateHome) {
      onNavigateHome();
    } else if (onNavigateCategory) {
      onNavigateCategory(category || 'all');
    } else if (category && onSelectCategory) {
      onSelectCategory(category);
    } else if (setCurrentView) {
      setCurrentView(view);
    }
    setMobileMenuOpen(false);
    ga4.pageView(`Google Merch+ - ${view.toUpperCase()}`, window.location.href, `/${view}`);
  };

  return (
    <>
      {/* Top Banner with GA4 Project Badge */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">
            Sustainable Google Merchandise Drop · Free carbon-neutral shipping over $50
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onOpenViva}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 text-[11px] font-semibold transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3 h-3 text-blue-400" />
            <span>GA4 Project Viva Mode</span>
          </button>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
              aria-label="Google Merch+ Home"
            >
              {/* Google Inspired 4-Color Accent Wordmark */}
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  Google
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 font-display ml-1">
                  Merch
                </span>
                <span className="text-xl sm:text-2xl font-black text-rose-500 font-display">
                  +
                </span>
              </div>
              {/* Subtle 4-dot Google brand accent */}
              <div className="hidden sm:flex items-center gap-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                currentView === 'shop' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => handleNavClick('shop', 'Apparel')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Collections
            </button>

            <button
              onClick={() => handleNavClick('shop', 'bestsellers')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Best Sellers
            </button>

            <button
              onClick={() => handleNavClick('shop', 'new-arrivals')}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              New Arrivals
            </button>

            <button
              onClick={onOpenSustainability}
              className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Sustainability
            </button>

            <button
              onClick={onOpenAbout}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-slate-900 rounded-full sm:rounded-lg hover:bg-slate-100 flex items-center gap-2 transition-colors cursor-pointer text-sm"
              aria-label="Search merchandise"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-slate-400 font-normal">Search merch...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Account dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (onOpenAccount) {
                    onOpenAccount();
                  } else {
                    setAccountDropdownOpen(!accountDropdownOpen);
                  }
                }}
                className="p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {accountDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Google Merch+ Profile</p>
                    <p className="text-xs text-slate-500">vaghelaronak322@gmail.com</p>
                  </div>
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        if (onOpenAccount) {
                          onOpenAccount();
                        } else if (setCurrentView) {
                          setCurrentView('shop');
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Order History & Account</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button 
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onOpenViva();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center justify-between font-medium"
                    >
                      <span>GA4 Behavioral Analytics</span>
                      <BarChart3 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onOpenSustainability();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Eco Impact Credits</span>
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => {
                if (onOpenWishlist) {
                  onOpenWishlist();
                } else if (onNavigateCategory) {
                  onNavigateCategory('wishlist');
                } else if (setCurrentView) {
                  setCurrentView('shop');
                }
              }}
              className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3">
            <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={() => {
                  onOpenViva();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                GA4 Insights
              </button>
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-800">
              <button
                onClick={() => handleNavClick('shop')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                All Products (Shop)
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Apparel')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Apparel Collection
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Backpacks')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Backpacks & Tech Bags
              </button>
              <button
                onClick={() => handleNavClick('shop', 'Drinkware')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Drinkware & Tumblers
              </button>
              <button
                onClick={() => handleNavClick('shop', 'bestsellers')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-amber-700"
              >
                ★ Best Sellers
              </button>
              <button
                onClick={() => handleNavClick('shop', 'new-arrivals')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-blue-700"
              >
                ✦ New Arrivals
              </button>
              <button
                onClick={() => {
                  onOpenSustainability();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer text-emerald-700 flex items-center gap-1.5"
              >
                <Leaf className="w-4 h-4" />
                Sustainability Commitment
              </button>
              <button
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                About Google Merch+
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
