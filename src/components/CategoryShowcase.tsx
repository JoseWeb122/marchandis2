import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const CategoryShowcase: React.FC = () => {
  const { navigateShop } = useStore();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      {/* Section Header */}
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end lg:mb-14">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
            Curated Departments
          </p>
          <h2 className="mt-2.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl">
            Shop by Category
          </h2>
        </div>
        <p className="max-w-md text-[14px] leading-relaxed text-[#292D2C]/70">
          Four considered worlds brought together under one roof — each selected for enduring craft,
          tactile beauty, and everyday utility.
        </p>
      </div>

      {/* Four Visually Striking Architectural Category Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {CATEGORIES.map((category, idx) => {
          const itemCount = PRODUCTS.filter((p) => p.category === category.id).length;

          return (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => navigateShop(category.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-[#292D2C] text-left focus:outline-none"
            >
              {/* Category Photograph with Subtle Hover Zoom */}
              <img
                src={category.image}
                alt={`${category.name} — ${category.subtitle}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Layered Editorial Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#292D2C]/82 via-[#292D2C]/22 to-[#292D2C]/10 transition-opacity duration-500 group-hover:from-[#292D2C]/88" />

              {/* Top Count Pill */}
              <div className="absolute top-4 right-4 border border-[#FAF8F2]/25 bg-[#292D2C]/35 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-[#FAF8F2]/90 uppercase backdrop-blur-md">
                {itemCount} Finds
              </div>

              {/* Bottom Editorial Typography Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-[11px] font-medium tracking-[0.24em] text-[#DCD2C3] uppercase">
                  {category.subtitle}
                </p>
                <h3 className="mt-1.5 font-editorial text-[30px] leading-none font-normal tracking-[0.06em] text-[#FAF8F2]">
                  {category.name}
                </h3>

                {/* Animated Explore Link */}
                <div className="mt-5 inline-flex items-center gap-2 border-b border-[#FAF8F2]/40 pb-1 text-[11px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-all duration-300 group-hover:border-[#6F9290] group-hover:text-[#F4EFE5]">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6F9290] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
