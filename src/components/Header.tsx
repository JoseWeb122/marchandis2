import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CategoryFilter } from '../types/store';

interface NavItem {
  label: string;
  key: string;
  action: () => void;
  isActive: boolean;
}

export const Header: React.FC = () => {
  const {
    view,
    navigateHome,
    navigateShop,
    navigateWishlist,
    cartCount,
    wishlist,
    setCartOpen,
    setSearchOpen,
    setInfoModal,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isCategoryActive = (cat: CategoryFilter) =>
    view.page === 'shop' && view.category === cat;

  const navItems: NavItem[] = [
    {
      label: 'Home',
      key: 'home',
      action: navigateHome,
      isActive: view.page === 'home',
    },
    {
      label: 'Shop All',
      key: 'all',
      action: () => navigateShop('all'),
      isActive: isCategoryActive('all'),
    },
    {
      label: 'Fragrances',
      key: 'fragrances',
      action: () => navigateShop('fragrances'),
      isActive: isCategoryActive('fragrances'),
    },
    {
      label: 'Electronics',
      key: 'electronics',
      action: () => navigateShop('electronics'),
      isActive: isCategoryActive('electronics'),
    },
    {
      label: 'Fashion',
      key: 'fashion',
      action: () => navigateShop('fashion'),
      isActive: isCategoryActive('fashion'),
    },
    {
      label: 'Accessories',
      key: 'accessories',
      action: () => navigateShop('accessories'),
      isActive: isCategoryActive('accessories'),
    },
  ];

  const handleMobileNav = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Slim Editorial Announcement Bar */}
      <div className="bg-[#345B59] text-[#FAF8F2]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center px-4 py-2 text-center">
          <button
            onClick={() => navigateShop('all', 'new')}
            className="group inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-90 sm:text-[11px]"
          >
            <Sparkles className="h-3 w-3 text-[#DCD2C3]" />
            <span>DISCOVER SOMETHING SPECIAL — NEW ARRIVALS JUST DROPPED</span>
            <ArrowRight className="h-3 w-3 text-[#DCD2C3] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <div
        className={`border-b transition-all duration-300 ${
          isScrolled
            ? 'border-[#DCD2C3]/90 bg-[#F4EFE5]/95 shadow-[0_8px_30px_rgba(41,45,44,0.04)] backdrop-blur-md'
            : 'border-[#DCD2C3]/60 bg-[#F4EFE5]/90 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12 lg:py-4">
          {/* Left: Mobile Menu Button + Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#292D2C] transition-colors hover:bg-[#DCD2C3]/40 lg:hidden"
            >
              <Menu className="h-5 w-5 stroke-[1.6]" />
            </button>

            <button
              type="button"
              onClick={navigateHome}
              className="group flex flex-col items-start text-left focus:outline-none"
            >
              <span className="font-editorial text-[26px] leading-none font-medium tracking-[0.24em] text-[#292D2C] transition-colors group-hover:text-[#345B59] sm:text-[30px]">
                WANDA&apos;S
              </span>
              <span className="mt-1 text-[8.5px] font-medium tracking-[0.28em] text-[#6F9290] uppercase sm:text-[9px]">
                EVERYDAY FINDS. ELEVATED.
              </span>
            </button>
          </div>

          {/* Center: Desktop Primary Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={item.action}
                className={`relative py-1.5 text-[12.5px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 ${
                  item.isActive
                    ? 'text-[#345B59]'
                    : 'text-[#292D2C]/80 hover:text-[#6F9290]'
                }`}
              >
                {item.label}
                {item.isActive && (
                  <motion.span
                    layoutId="navActiveUnderline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute right-0 -bottom-0.5 left-0 h-[1.5px] bg-[#6F9290]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Utility Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              type="button"
              aria-label="Search store"
              onClick={() => setSearchOpen(true)}
              className="group flex h-10 w-10 items-center justify-center rounded-full text-[#292D2C] transition-colors hover:bg-[#DCD2C3]/40 hover:text-[#345B59]"
              title="Search (⌘K)"
            >
              <Search className="h-[19px] w-[19px] stroke-[1.6] transition-transform duration-200 group-hover:scale-105" />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              onClick={navigateWishlist}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#DCD2C3]/40 ${
                view.page === 'wishlist'
                  ? 'text-[#345B59]'
                  : 'text-[#292D2C] hover:text-[#345B59]'
              }`}
              title="Wishlist"
            >
              <Heart
                className={`h-[19px] w-[19px] stroke-[1.6] transition-transform duration-200 group-hover:scale-105 ${
                  view.page === 'wishlist' ? 'fill-[#6F9290] text-[#6F9290]' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#6F9290] px-1 text-[9px] font-semibold text-[#FAF8F2]">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account (Visual Front-End Preview) */}
            <button
              type="button"
              aria-label="Account"
              onClick={() => setInfoModal('account')}
              className="group hidden h-10 w-10 items-center justify-center rounded-full text-[#292D2C] transition-colors hover:bg-[#DCD2C3]/40 hover:text-[#345B59] sm:flex"
              title="Account"
            >
              <User className="h-[19px] w-[19px] stroke-[1.6] transition-transform duration-200 group-hover:scale-105" />
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              onClick={() => setCartOpen(true)}
              className="group relative flex h-10 items-center gap-2 rounded-full bg-[#FAF8F2] px-3.5 text-[#292D2C] ring-1 ring-[#DCD2C3] transition-all duration-200 hover:bg-[#6F9290] hover:text-[#FAF8F2] hover:ring-[#6F9290]"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.6]" />
              <span className="hidden text-[11px] font-medium tracking-[0.14em] uppercase sm:inline">
                Bag
              </span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#345B59] px-1.5 text-[10px] font-semibold text-[#FAF8F2] transition-colors group-hover:bg-[#FAF8F2] group-hover:text-[#345B59]"
                >
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#292D2C]/45 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 bottom-0 left-0 z-50 flex w-[84vw] max-w-[360px] flex-col bg-[#FAF8F2] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#DCD2C3] px-6 py-5">
                <div>
                  <div className="font-editorial text-2xl font-medium tracking-[0.22em] text-[#292D2C]">
                    WANDA&apos;S
                  </div>
                  <div className="mt-0.5 text-[8.5px] tracking-[0.26em] text-[#6F9290] uppercase">
                    EVERYDAY FINDS. ELEVATED.
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD2C3] text-[#292D2C] transition-colors hover:bg-[#F4EFE5]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="mb-3 text-[10px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                  Explore
                </p>
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => handleMobileNav(item.action)}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-3 text-left font-editorial text-2xl transition-colors ${
                          item.isActive
                            ? 'bg-[#F4EFE5] text-[#345B59]'
                            : 'text-[#292D2C] hover:bg-[#F4EFE5]/70'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-4 w-4 text-[#6F9290]" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="my-6 h-px bg-[#DCD2C3]/80" />

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#292D2C] hover:bg-[#F4EFE5]"
                  >
                    <Search className="h-4 w-4 text-[#6F9290]" />
                    <span>Search Merchandise</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNav(navigateWishlist)}
                    className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-sm text-[#292D2C] hover:bg-[#F4EFE5]"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-[#6F9290]" />
                      <span>Saved Wishlist</span>
                    </span>
                    <span className="rounded-full bg-[#F4EFE5] px-2 py-0.5 text-xs text-[#345B59]">
                      {wishlist.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setInfoModal('account');
                    }}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#292D2C] hover:bg-[#F4EFE5]"
                  >
                    <User className="h-4 w-4 text-[#6F9290]" />
                    <span>Member Account</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#DCD2C3] bg-[#F4EFE5] px-6 py-4">
                <p className="text-[11px] leading-relaxed text-[#292D2C]/70">
                  Complimentary express shipping on orders over $150 · Hassle-free 30-day returns.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
