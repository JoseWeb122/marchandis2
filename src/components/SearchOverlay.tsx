import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';

const TRENDING_QUERIES = [
  'Cashmere',
  'Perfume',
  'Cologne',
  'Earbuds',
  'Smartwatch',
  'Leather Tote',
];

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setSearchOpen,
    navigateProduct,
    navigateShop,
    addToCart,
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return [];
    return PRODUCTS.filter((p) => {
      const haystack = [
        p.name,
        p.subtitle,
        p.category,
        p.shortDescription,
        ...p.tags,
        ...(p.fragranceDetails
          ? [
              ...p.fragranceDetails.topNotes,
              ...p.fragranceDetails.heartNotes,
              ...p.fragranceDetails.baseNotes,
            ]
          : []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [trimmed]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Dimmed Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-50 bg-[#292D2C]/55 backdrop-blur-sm"
          />

          {/* Top Editorial Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 left-0 z-50 max-h-[88vh] overflow-y-auto border-b border-[#DCD2C3] bg-[#FAF8F2] shadow-2xl"
          >
            <div className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8 lg:px-12 lg:py-9">
              {/* Search Bar Input Row */}
              <div className="flex items-center gap-4 border-b border-[#292D2C]/25 pb-4">
                <Search className="h-5 w-5 shrink-0 text-[#6F9290]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fragrances, cashmere sweaters, earbuds, leather goods..."
                  className="w-full bg-transparent font-editorial text-2xl text-[#292D2C] placeholder:text-[#292D2C]/40 focus:outline-none sm:text-3xl"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-[11px] font-semibold tracking-[0.16em] text-[#292D2C]/55 uppercase hover:text-[#345B59]"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCD2C3] text-[#292D2C] transition-colors hover:bg-[#F4EFE5]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Idle State: Trending Queries + Quick Departments */}
              {!trimmed ? (
                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                      Trending Searches
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TRENDING_QUERIES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="border border-[#DCD2C3] bg-[#F4EFE5]/70 px-4 py-2 text-[12.5px] text-[#292D2C] transition-colors hover:border-[#6F9290] hover:bg-[#6F9290] hover:text-[#FAF8F2]"
                        >
                          {term}
                        </button>
                      ))}
                    </div>

                    <p className="mt-8 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                      Browse by Category
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSearchOpen(false);
                            navigateShop(cat.id);
                          }}
                          className="group flex items-center justify-between border border-[#DCD2C3]/80 bg-[#F4EFE5]/50 px-3.5 py-3 text-left transition-colors hover:border-[#6F9290]"
                        >
                          <div>
                            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#292D2C] uppercase">
                              {cat.name}
                            </p>
                            <p className="text-[11px] text-[#292D2C]/55">{cat.subtitle}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-[#6F9290] transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <p className="text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                      Editors&apos; Picks
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {PRODUCTS.filter((p) => p.isBestSeller)
                        .slice(0, 3)
                        .map((prod) => (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => navigateProduct(prod.id)}
                            className="group text-left"
                          >
                            <div className="aspect-[4/5] overflow-hidden bg-[#E7DFD2] ring-1 ring-[#DCD2C3]/60">
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <p className="mt-2.5 font-editorial text-[18px] leading-snug text-[#292D2C] group-hover:text-[#345B59]">
                              {prod.name}
                            </p>
                            <p className="mt-0.5 text-[12.5px] font-semibold text-[#292D2C]/75">
                              ${prod.price}
                            </p>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                /* Live Matching Products */
                <div className="mt-8">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                      {results.length} {results.length === 1 ? 'Result' : 'Results'} for &ldquo;
                      {query}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        navigateShop('all');
                      }}
                      className="text-[11px] font-semibold tracking-[0.18em] text-[#345B59] uppercase hover:underline"
                    >
                      View Full Catalog
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {results.map((prod) => (
                      <div
                        key={prod.id}
                        className="group flex flex-col border border-[#DCD2C3]/80 bg-[#F4EFE5]/50 p-3 transition-colors hover:border-[#6F9290]"
                      >
                        <button
                          type="button"
                          onClick={() => navigateProduct(prod.id)}
                          className="aspect-[4/5] w-full overflow-hidden bg-[#E7DFD2]"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </button>
                        <div className="mt-3 flex flex-1 flex-col">
                          <span className="text-[9.5px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                            {prod.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateProduct(prod.id)}
                            className="mt-1 text-left font-editorial text-[19px] leading-snug text-[#292D2C] group-hover:text-[#345B59]"
                          >
                            {prod.name}
                          </button>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <span className="text-[14px] font-semibold text-[#292D2C]">
                              ${prod.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(prod, { quantity: 1 });
                              }}
                              className="inline-flex items-center gap-1.5 bg-[#6F9290] px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                            >
                              <ShoppingBag className="h-3 w-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Helpful Empty Search State */
                <div className="py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE5] text-[#6F9290]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-editorial text-3xl font-light text-[#292D2C]">
                    No finds matched &ldquo;{query}&rdquo;
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-[14px] text-[#292D2C]/65">
                    Try searching by category like &ldquo;fragrances&rdquo;, &ldquo;fashion&rdquo;,
                    &ldquo;electronics&rdquo;, or &ldquo;accessories&rdquo;, or explore one of our
                    popular searches below.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {TRENDING_QUERIES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="border border-[#DCD2C3] bg-[#F4EFE5] px-4 py-2 text-[12px] text-[#292D2C] hover:border-[#6F9290] hover:text-[#345B59]"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
