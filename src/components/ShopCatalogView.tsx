import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, getCategoryMeta } from '../data/products';
import { CategoryFilter, SortOption } from '../types/store';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface ShopCatalogViewProps {
  initialCategory: CategoryFilter;
  preset?: 'new' | 'bestsellers';
}

type PriceBucket = 'all' | 'under-150' | '150-250' | '250-350' | 'over-350';

const PRICE_BUCKETS: { id: PriceBucket; label: string }[] = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-150', label: 'Under $150' },
  { id: '150-250', label: '$150 – $250' },
  { id: '250-350', label: '$250 – $350' },
  { id: 'over-350', label: '$350 & Above' },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'best-selling', label: 'Best Selling' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  initialCategory,
  preset,
}) => {
  const { navigateHome } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(initialCategory);
  const [priceBucket, setPriceBucket] = useState<PriceBucket>('all');
  const [onlyBestSellers, setOnlyBestSellers] = useState(preset === 'bestsellers');
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(preset === 'new');
  const [onlyHighestRated, setOnlyHighestRated] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(
    preset === 'new' ? 'newest' : preset === 'bestsellers' ? 'best-selling' : 'featured'
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when user clicks a different header category link
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setOnlyNewArrivals(preset === 'new');
    setOnlyBestSellers(preset === 'bestsellers');
    setOnlyHighestRated(false);
    setOnlySale(false);
    setPriceBucket('all');
    setSortBy(
      preset === 'new' ? 'newest' : preset === 'bestsellers' ? 'best-selling' : 'featured'
    );
  }, [initialCategory, preset]);

  const activeCategoryMeta =
    selectedCategory !== 'all' ? getCategoryMeta(selectedCategory) : null;

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (priceBucket === 'under-150') {
      list = list.filter((p) => p.price < 150);
    } else if (priceBucket === '150-250') {
      list = list.filter((p) => p.price >= 150 && p.price <= 250);
    } else if (priceBucket === '250-350') {
      list = list.filter((p) => p.price > 250 && p.price <= 350);
    } else if (priceBucket === 'over-350') {
      list = list.filter((p) => p.price > 350);
    }

    if (onlyBestSellers) {
      list = list.filter((p) => p.isBestSeller);
    }
    if (onlyNewArrivals) {
      list = list.filter((p) => p.isNewArrival);
    }
    if (onlyHighestRated) {
      list = list.filter((p) => p.rating >= 4.9);
    }
    if (onlySale) {
      list = list.filter((p) => Boolean(p.originalPrice));
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return b.releaseOrder - a.releaseOrder;
        case 'best-selling':
          return a.salesRank - b.salesRank;
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || a.salesRank - b.salesRank;
      }
    });

    return list;
  }, [
    selectedCategory,
    priceBucket,
    onlyBestSellers,
    onlyNewArrivals,
    onlyHighestRated,
    onlySale,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceBucket !== 'all' ? 1 : 0) +
    (onlyBestSellers ? 1 : 0) +
    (onlyNewArrivals ? 1 : 0) +
    (onlyHighestRated ? 1 : 0) +
    (onlySale ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setPriceBucket('all');
    setOnlyBestSellers(false);
    setOnlyNewArrivals(false);
    setOnlyHighestRated(false);
    setOnlySale(false);
    setSortBy('featured');
  };

  const renderFilterControls = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
          Category
        </h3>
        <div className="mt-3.5 space-y-1.5">
          {[
            { id: 'all' as CategoryFilter, label: 'All Merchandise', count: PRODUCTS.length },
            ...CATEGORIES.map((c) => ({
              id: c.id as CategoryFilter,
              label: c.name.charAt(0) + c.name.slice(1).toLowerCase(),
              count: PRODUCTS.filter((p) => p.category === c.id).length,
            })),
          ].map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13.5px] transition-colors ${
                  active
                    ? 'bg-[#6F9290]/15 font-medium text-[#345B59]'
                    : 'text-[#292D2C]/75 hover:bg-[#FAF8F2] hover:text-[#292D2C]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[11px] text-[#292D2C]/45">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-[#DCD2C3]/80 pt-7">
        <h3 className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
          Price Range
        </h3>
        <div className="mt-3.5 space-y-1.5">
          {PRICE_BUCKETS.map((bucket) => {
            const active = priceBucket === bucket.id;
            return (
              <button
                key={bucket.id}
                type="button"
                onClick={() => setPriceBucket(bucket.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-[13.5px] transition-colors ${
                  active
                    ? 'bg-[#6F9290]/15 font-medium text-[#345B59]'
                    : 'text-[#292D2C]/75 hover:bg-[#FAF8F2] hover:text-[#292D2C]'
                }`}
              >
                <span>{bucket.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-[#345B59]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Highlights */}
      <div className="border-t border-[#DCD2C3]/80 pt-7">
        <h3 className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
          Curated Filters
        </h3>
        <div className="mt-3.5 space-y-2.5">
          {[
            {
              label: 'Best Sellers',
              checked: onlyBestSellers,
              toggle: () => setOnlyBestSellers((v) => !v),
            },
            {
              label: 'New Arrivals',
              checked: onlyNewArrivals,
              toggle: () => setOnlyNewArrivals((v) => !v),
            },
            {
              label: 'Highest Rated (4.9★)',
              checked: onlyHighestRated,
              toggle: () => setOnlyHighestRated((v) => !v),
            },
            {
              label: 'Special Offers / Sale',
              checked: onlySale,
              toggle: () => setOnlySale((v) => !v),
            },
          ].map((item) => (
            <label
              key={item.label}
              className="flex cursor-pointer items-center gap-3 px-1 py-1 text-[13.5px] text-[#292D2C]/80 transition-colors hover:text-[#292D2C]"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={item.checked}
                onClick={item.toggle}
                className={`flex h-4.5 w-4.5 items-center justify-center border transition-colors ${
                  item.checked
                    ? 'border-[#345B59] bg-[#345B59] text-[#FAF8F2]'
                    : 'border-[#DCD2C3] bg-[#FAF8F2]'
                }`}
              >
                {item.checked && <Check className="h-3 w-3 stroke-[2.4]" />}
              </button>
              <span onClick={item.toggle}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="border-t border-[#DCD2C3]/80 pt-6">
          <button
            type="button"
            onClick={resetAllFilters}
            className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.18em] text-[#345B59] uppercase transition-colors hover:text-[#292D2C]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="pb-24"
    >
      {/* Editorial Department Header */}
      <section className="border-b border-[#DCD2C3] bg-[#FAF8F2]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-2 text-[11px] tracking-[0.18em] text-[#292D2C]/55 uppercase">
            <button
              type="button"
              onClick={navigateHome}
              className="transition-colors hover:text-[#345B59]"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#345B59]">
              {activeCategoryMeta
                ? activeCategoryMeta.name
                : onlyNewArrivals
                ? 'New Arrivals'
                : 'Shop All'}
            </span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className={activeCategoryMeta ? 'lg:col-span-7' : 'lg:col-span-9'}>
              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                {activeCategoryMeta
                  ? activeCategoryMeta.tagline
                  : onlyNewArrivals
                  ? 'Fresh From Our Curators'
                  : 'The Complete WANDA’S Collection'}
              </p>
              <h1 className="mt-2.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl lg:text-[56px]">
                {activeCategoryMeta
                  ? `${activeCategoryMeta.name.charAt(0)}${activeCategoryMeta.name
                      .slice(1)
                      .toLowerCase()}`
                  : onlyNewArrivals
                  ? 'New Arrivals'
                  : 'Shop All Finds'}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#292D2C]/70">
                {activeCategoryMeta
                  ? activeCategoryMeta.description
                  : 'Explore our full curation of signature fragrances, minimalist electronics, elevated knitwear, and timeless everyday accessories.'}
              </p>
            </div>

            {activeCategoryMeta && (
              <div className="hidden overflow-hidden rounded-[2px] border border-[#DCD2C3] bg-[#E8E0D2] lg:col-span-5 lg:block">
                <img
                  src={activeCategoryMeta.image}
                  alt={activeCategoryMeta.name}
                  className="h-44 w-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <div className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 lg:px-12">
        {/* Top Utility & Sort Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCD2C3]/80 pb-5">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Trigger */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 border border-[#DCD2C3] bg-[#FAF8F2] px-4 py-2.5 text-[11.5px] font-semibold tracking-[0.16em] text-[#292D2C] uppercase transition-colors hover:border-[#6F9290] lg:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#6F9290]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#6F9290] px-1 text-[10px] text-[#FAF8F2]">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <p className="text-[13px] text-[#292D2C]/65">
              Showing{' '}
              <span className="font-semibold text-[#292D2C]">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'curated find' : 'curated finds'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#6F9290]" />
            <label
              htmlFor="catalog-sort"
              className="hidden text-[11px] font-semibold tracking-[0.18em] text-[#292D2C]/60 uppercase sm:inline"
            >
              Sort by
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-[#DCD2C3] bg-[#FAF8F2] px-3.5 py-2 text-[13px] font-medium text-[#292D2C] focus:border-[#6F9290] focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>Category: {selectedCategory}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {priceBucket !== 'all' && (
              <button
                type="button"
                onClick={() => setPriceBucket('all')}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>{PRICE_BUCKETS.find((b) => b.id === priceBucket)?.label}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {onlyBestSellers && (
              <button
                type="button"
                onClick={() => setOnlyBestSellers(false)}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>Best Sellers</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {onlyNewArrivals && (
              <button
                type="button"
                onClick={() => setOnlyNewArrivals(false)}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>New Arrivals</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {onlyHighestRated && (
              <button
                type="button"
                onClick={() => setOnlyHighestRated(false)}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>Highest Rated</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {onlySale && (
              <button
                type="button"
                onClick={() => setOnlySale(false)}
                className="inline-flex items-center gap-1.5 border border-[#6F9290]/40 bg-[#FAF8F2] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] text-[#345B59] uppercase hover:bg-[#F4EFE5]"
              >
                <span>On Sale</span>
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              type="button"
              onClick={resetAllFilters}
              className="ml-1 text-[11px] font-semibold tracking-[0.14em] text-[#292D2C]/60 underline underline-offset-4 hover:text-[#345B59]"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Sidebar + Product Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Desktop Persistent Filter Rail */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 border border-[#DCD2C3]/80 bg-[#FAF8F2]/80 p-6">
              {renderFilterControls()}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border border-[#DCD2C3] bg-[#FAF8F2] px-6 py-20 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4EFE5] text-[#6F9290]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-editorial text-3xl font-light text-[#292D2C]">
                  No finds match these filters
                </h3>
                <p className="mt-2 max-w-md text-[14px] text-[#292D2C]/65">
                  Try widening your price range or clearing a curated filter to browse our full
                  collection.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-7 bg-[#6F9290] px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-[#292D2C]/45 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 bottom-0 left-0 z-50 flex w-[86vw] max-w-[360px] flex-col bg-[#FAF8F2] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#DCD2C3] px-6 py-5">
                <h2 className="font-editorial text-2xl text-[#292D2C]">Filter Collection</h2>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD2C3]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{renderFilterControls()}</div>
              <div className="border-t border-[#DCD2C3] bg-[#F4EFE5] p-5">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-[#6F9290] py-3.5 text-[11.5px] font-semibold tracking-[0.2em] text-[#FAF8F2] uppercase hover:bg-[#345B59]"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
