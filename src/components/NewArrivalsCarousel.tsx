import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const NewArrivalsCarousel: React.FC = () => {
  const { navigateShop } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  // Newest releases first (8 products)
  const newArrivals = [...PRODUCTS]
    .sort((a, b) => b.releaseOrder - a.releaseOrder)
    .slice(0, 8);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
    setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, el.scrollLeft / maxScroll)) : 0);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(300, el.clientWidth * 0.72);
    el.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header & Carousel Controls */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
              Just Landed
            </p>
            <h2 className="mt-2.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <button
              type="button"
              onClick={() => navigateShop('all', 'new')}
              className="group inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.2em] text-[#345B59] uppercase transition-colors hover:text-[#292D2C]"
            >
              <span>Shop All New</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous new arrivals"
                onClick={() => scrollByCard('prev')}
                disabled={!canPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C] transition-all duration-200 hover:border-[#6F9290] hover:bg-[#6F9290] hover:text-[#FAF8F2] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#DCD2C3] disabled:hover:bg-[#FAF8F2] disabled:hover:text-[#292D2C]"
              >
                <ChevronLeft className="h-5 w-5 stroke-[1.6]" />
              </button>
              <button
                type="button"
                aria-label="Next new arrivals"
                onClick={() => scrollByCard('next')}
                disabled={!canNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C] transition-all duration-200 hover:border-[#6F9290] hover:bg-[#6F9290] hover:text-[#FAF8F2] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[#DCD2C3] disabled:hover:bg-[#FAF8F2] disabled:hover:text-[#292D2C]"
              >
                <ChevronRight className="h-5 w-5 stroke-[1.6]" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:gap-7 lg:px-12"
        >
          {newArrivals.map((product, index) => (
            <div
              key={product.id}
              className="w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-[34vw] lg:w-[27.5%] xl:w-[23.5%]"
            >
              <ProductCard product={product} index={index} compact />
            </div>
          ))}
        </div>

        {/* Subtle Progress Track */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-[2px] flex-1 overflow-hidden bg-[#DCD2C3]/80">
            <div
              style={{ width: `${Math.max(18, progress * 100)}%` }}
              className="h-full bg-[#6F9290] transition-all duration-300"
            />
          </div>
          <span className="text-[10.5px] font-medium tracking-[0.2em] text-[#292D2C]/55 uppercase">
            Swipe or Browse
          </span>
        </div>
      </div>
    </section>
  );
};
