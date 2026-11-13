import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FashionSplitBanner: React.FC = () => {
  const { navigateShop } = useStore();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="grid grid-cols-1 overflow-hidden border border-[#DCD2C3] bg-[#FAF8F2] lg:grid-cols-12">
        {/* Left: Large Lifestyle Folded Knitwear Photograph */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/4] overflow-hidden bg-[#E7DFD2] lg:col-span-6 lg:aspect-auto lg:min-h-[620px]"
        >
          <img
            src="./images/editorial-fashion.jpg"
            alt="Neatly folded luxury cashmere and merino knit sweaters resting on travertine stone"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute bottom-5 left-5 border border-[#FAF8F2]/35 bg-[#292D2C]/45 px-4 py-2 backdrop-blur-md">
            <span className="text-[10px] font-medium tracking-[0.22em] text-[#FAF8F2] uppercase">
              Autumn Knitwear Atelier · Natural Fibers
            </span>
          </div>
        </motion.div>

        {/* Right: Editorial Storytelling Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:col-span-6 lg:px-16 xl:px-20"
        >
          <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
            The Wardrobe Edit
          </span>

          <h2 className="mt-4 font-editorial text-4xl leading-[1.08] font-light text-[#292D2C] sm:text-5xl xl:text-[56px]">
            Style That Feels <span className="italic">Like You.</span>
          </h2>

          <p className="mt-6 max-w-md text-[15.5px] leading-[1.75] text-[#292D2C]/75">
            Discover everyday pieces that bring comfort, personality, and effortless style into your
            wardrobe.
          </p>

          {/* Subtle Textile Highlights */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#DCD2C3]/80 py-6">
            <div>
              <p className="font-editorial text-2xl text-[#345B59]">Grade-A</p>
              <p className="mt-0.5 text-[11px] tracking-[0.08em] text-[#292D2C]/65 uppercase">
                Cashmere
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-[#345B59]">19.5μm</p>
              <p className="mt-0.5 text-[11px] tracking-[0.08em] text-[#292D2C]/65 uppercase">
                Italian Merino
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-[#345B59]">Relaxed</p>
              <p className="mt-0.5 text-[11px] tracking-[0.08em] text-[#292D2C]/65 uppercase">
                Modern Drape
              </p>
            </div>
          </div>

          <div className="mt-9">
            <button
              type="button"
              onClick={() => navigateShop('fashion')}
              className="group inline-flex items-center gap-3 bg-[#6F9290] px-8 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-all duration-300 hover:bg-[#345B59]"
            >
              <span>SHOP FASHION</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const FragranceCampaignBanner: React.FC = () => {
  const { navigateShop } = useStore();
  const scentNotes = ['Calabrian Bergamot', 'Mysore Sandalwood', 'Atlas Cedar', 'White Tea'];

  return (
    <section className="relative overflow-hidden bg-[#292D2C]">
      {/* Background Cinematic Perfume & Cologne Campaign */}
      <div className="absolute inset-0">
        <img
          src="./images/editorial-fragrance.jpg"
          alt="Sculptural glass eau de parfum and cologne bottles on honed slate in golden rim light"
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#292D2C]/88 via-[#292D2C]/62 to-[#345B59]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#DCD2C3] uppercase">
            L&apos;Atelier Parfums &amp; Colognes
          </p>

          <h2 className="mt-4 font-editorial text-4xl leading-[1.06] font-light text-[#FAF8F2] sm:text-5xl lg:text-6xl">
            Find Your <span className="italic">Signature Scent.</span>
          </h2>

          <p className="mt-6 text-[15.5px] leading-[1.75] font-light text-[#FAF8F2]/82">
            From skin-warm sandalwood and sunlit neroli to crisp smoked cedar colognes, explore
            small-batch fragrances composed to leave a quiet, unmistakable impression.
          </p>

          {/* Scent Notes Strip */}
          <div className="mt-7 flex flex-wrap gap-2">
            {scentNotes.map((note) => (
              <span
                key={note}
                className="border border-[#FAF8F2]/25 bg-[#292D2C]/40 px-3.5 py-1.5 text-[10.5px] tracking-[0.16em] text-[#F4EFE5] uppercase backdrop-blur-md"
              >
                {note}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => navigateShop('fragrances')}
              className="group inline-flex items-center gap-3 bg-[#FAF8F2] px-8 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#292D2C] uppercase transition-all duration-300 hover:bg-[#6F9290] hover:text-[#FAF8F2]"
            >
              <span>EXPLORE FRAGRANCES</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
