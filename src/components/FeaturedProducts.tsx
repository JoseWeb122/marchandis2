import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CategoryFilter } from '../types/store';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

const FILTER_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Featured' },
  { id: 'fragrances', label: 'Fragrances' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'accessories', label: 'Accessories' },
];

export const FeaturedProducts: React.FC = () => {
  const { navigateShop } = useStore();
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');

  const displayProducts = useMemo(() => {
    if (activeTab === 'all') {
      return PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
    }
    return PRODUCTS.filter((p) => p.category === activeTab).slice(0, 4);
  }, [activeTab]);

  return (
    <section className="border-t border-[#DCD2C3]/70 bg-[#FAF8F2]/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header & Category Tabs */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
              Editors&apos; Edit
            </p>
            <h2 className="mt-2.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl">
              Featured Finds
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-200 ${
                    active
                      ? 'bg-[#6F9290] text-[#FAF8F2]'
                      : 'border border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C]/75 hover:border-[#6F9290] hover:text-[#345B59]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Refined Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => navigateShop(activeTab)}
            className="group inline-flex items-center gap-3 border border-[#292D2C] px-9 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#292D2C] uppercase transition-all duration-300 hover:border-[#345B59] hover:bg-[#345B59] hover:text-[#FAF8F2]"
          >
            <span>
              {activeTab === 'all' ? 'View Entire Collection' : `Shop All ${activeTab}`}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
