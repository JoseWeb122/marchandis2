import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { navigateShop, navigateProduct } = useStore();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax motion on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.11]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const frameHighlights = [
    { label: 'Santal Velours EDP', productId: 'santal-velours-edp', price: '$185' },
    { label: 'Oslo Cashmere Knit', productId: 'oslo-cashmere-crewneck', price: '$265' },
    { label: 'Aura Quiet Earbuds', productId: 'aura-anc-earbuds', price: '$229' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[82vh] w-full items-center overflow-hidden bg-[#292D2C] sm:min-h-[88vh]"
    >
      {/* Parallax & Subtle Ken Burns Background Photography */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.img
          initial={{ scale: 1.09, opacity: 0.75 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          src="./images/hero-editorial.jpg"
          alt="Curated still life of luxury perfume bottles, folded cashmere knitwear, and minimalist wireless audio on travertine stone"
          className="h-full w-full object-cover object-center"
        />
        {/* Warm Editorial Tonal Veil for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292D2C]/72 via-[#292D2C]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292D2C]/50 via-transparent to-[#292D2C]/10" />
      </motion.div>

      {/* Editorial Content Canvas */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-between px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 border border-[#FAF8F2]/25 bg-[#292D2C]/30 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6F9290]" />
            <span className="text-[10.5px] font-medium tracking-[0.26em] text-[#FAF8F2]/90 uppercase">
              Curated Lifestyle Marketplace · New Season
            </span>
          </motion.div>

          {/* Cinematic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-[46px] leading-[1.03] font-light tracking-[-0.01em] text-[#FAF8F2] sm:text-[64px] lg:text-[78px]"
          >
            Everyday Essentials.
            <span className="block italic font-normal text-[#F4EFE5]">
              Extraordinary Finds.
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-[15.5px] leading-[1.7] font-light text-[#FAF8F2]/88 sm:text-[17px]"
          >
            Discover a thoughtfully curated collection of fragrances, fashion, electronics, and
            everyday favorites.
          </motion.p>

          {/* Dual Editorial CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => navigateShop('all')}
              className="group inline-flex items-center gap-3 bg-[#6F9290] px-8 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-all duration-300 hover:bg-[#345B59] hover:shadow-[0_12px_30px_rgba(52,91,89,0.35)]"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigateShop('all', 'new')}
              className="group inline-flex items-center gap-2.5 border border-[#FAF8F2]/55 bg-[#FAF8F2]/10 px-7 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase backdrop-blur-md transition-all duration-300 hover:border-[#FAF8F2] hover:bg-[#FAF8F2] hover:text-[#292D2C]"
            >
              <span>DISCOVER NEW ARRIVALS</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Editorial "Featured In Frame" Strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col justify-between gap-6 border-t border-[#FAF8F2]/20 pt-6 lg:mt-20 lg:flex-row lg:items-center"
        >
          <div className="flex items-center gap-2.5 text-[10.5px] font-medium tracking-[0.24em] text-[#DCD2C3] uppercase">
            <Sparkles className="h-3.5 w-3.5 text-[#6F9290]" />
            <span>Featured In Frame</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {frameHighlights.map((item) => (
              <button
                key={item.productId}
                type="button"
                onClick={() => navigateProduct(item.productId)}
                className="group inline-flex items-center gap-3 border border-[#FAF8F2]/22 bg-[#292D2C]/38 px-4 py-2 text-left backdrop-blur-md transition-all duration-300 hover:border-[#6F9290] hover:bg-[#FAF8F2]/95 hover:text-[#292D2C]"
              >
                <span className="text-[11.5px] font-medium tracking-[0.04em] text-[#FAF8F2] transition-colors group-hover:text-[#292D2C]">
                  {item.label}
                </span>
                <span className="text-[11px] text-[#DCD2C3] transition-colors group-hover:text-[#345B59]">
                  {item.price}
                </span>
                <ArrowRight className="h-3 w-3 text-[#6F9290] transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
