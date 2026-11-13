import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Gift, PackageCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BrandStorySection: React.FC = () => {
  const { navigateShop } = useStore();

  const pillars = [
    {
      icon: Sparkles,
      title: 'Thoughtful Curation',
      text: 'Every bottle, knit, and gadget is individually vetted for enduring materials and quiet design.',
    },
    {
      icon: Gift,
      title: 'Elevated Presentation',
      text: 'Orders arrive wrapped in signature almond tissue and reusable linen dust bags.',
    },
    {
      icon: PackageCheck,
      title: 'Effortless Delivery',
      text: 'Complimentary express shipping over $150 with seamless 30-day returns and exchanges.',
    },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Editorial Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
            Our Philosophy
          </p>
          <h2 className="mt-3.5 font-editorial text-4xl leading-[1.08] font-light text-[#292D2C] sm:text-5xl">
            More Than Just <span className="italic">Shopping.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8] text-[#292D2C]/78">
            From everyday essentials to little luxuries, discover products selected to bring
            something special to your daily life.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.75] text-[#292D2C]/65">
            Founded on the belief that the objects we live with should feel calm, tactile, and
            genuinely useful, WANDA&apos;S brings together niche perfumery, tactile electronics,
            refined knitwear, and heirloom accessories in one warm, considered destination.
          </p>

          <div className="mt-9 space-y-5 border-t border-[#DCD2C3] pt-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FAF8F2] text-[#6F9290] ring-1 ring-[#DCD2C3]">
                    <Icon className="h-4 w-4 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[13px] font-semibold tracking-[0.12em] text-[#292D2C] uppercase">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[#292D2C]/65">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-9">
            <button
              type="button"
              onClick={() => navigateShop('all')}
              className="group inline-flex items-center gap-2.5 border-b border-[#292D2C] pb-1.5 text-[11.5px] font-semibold tracking-[0.22em] text-[#292D2C] uppercase transition-colors hover:border-[#6F9290] hover:text-[#345B59]"
            >
              <span>Explore Our Full Edit</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Right Lifestyle Editorial Composition */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-[2px] bg-[#E5DDD0] p-3 ring-1 ring-[#DCD2C3] sm:p-4">
            <div className="overflow-hidden">
              <img
                src="./images/brand-story.jpg"
                alt="Sunlit minimalist concept store table curated with perfumes, cashmere knitwear, leather goods, and ceramic vessels"
                loading="lazy"
                className="aspect-[16/11] w-full object-cover transition-transform duration-1000 hover:scale-103"
              />
            </div>
          </div>

          {/* Editorial Quote Card Overlay */}
          <div className="mt-5 border border-[#DCD2C3] bg-[#FAF8F2] p-6 shadow-[0_14px_34px_rgba(41,45,44,0.06)] sm:max-w-sm lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0">
            <p className="font-editorial text-[22px] leading-[1.35] italic text-[#292D2C]">
              &ldquo;We choose fewer things, chosen better — pieces you&apos;ll reach for every
              single morning.&rdquo;
            </p>
            <p className="mt-3 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
              — Wanda, Founder &amp; Curator
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  const { pushToast } = useStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!emailPattern.test(trimmed)) {
      setError('Please enter a valid email address (for example, hello@example.com).');
      return;
    }

    setError('');
    setSubscribed(true);
    pushToast({
      title: 'Welcome to WANDA’S',
      subtitle: 'Use code WANDA10 at bag checkout for 10% off your first order.',
    });
  };

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText('WANDA10');
    } catch {
      // ignore clipboard fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-y border-[#DCD2C3] bg-[#FAF8F2] py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-[#6F9290] uppercase">
          The WANDA&apos;S Dispatch
        </p>
        <h2 className="mt-3.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl">
          A Little Something Special, <span className="italic">Delivered.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#292D2C]/70">
          Be the first to discover new arrivals, exclusive finds, and special offers.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} noValidate className="mx-auto mt-9 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className={`w-full border bg-[#F4EFE5]/70 px-5 py-4 text-[14px] text-[#292D2C] placeholder:text-[#292D2C]/45 focus:bg-[#FAF8F2] focus:outline-none ${
                    error ? 'border-[#9F4B43]' : 'border-[#DCD2C3] focus:border-[#6F9290]'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="bg-[#6F9290] px-9 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-colors duration-300 hover:bg-[#345B59]"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p className="mt-2.5 text-left text-[12.5px] text-[#9F4B43]">{error}</p>
            )}
            <p className="mt-4 text-[11.5px] text-[#292D2C]/50">
              Thoughtful notes only — unsubscribe at any time. Enjoy 10% off your first find.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-9 max-w-lg border border-[#6F9290]/40 bg-[#F4EFE5] px-6 py-7"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#345B59] text-[#FAF8F2]">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-editorial text-2xl text-[#292D2C]">
              You&apos;re on the list.
            </h3>
            <p className="mt-1.5 text-[13.5px] text-[#292D2C]/70">
              Thank you for joining WANDA&apos;S. Use your welcome privilege in your shopping bag:
            </p>
            <div className="mt-4 inline-flex items-center gap-3 border border-[#DCD2C3] bg-[#FAF8F2] px-4 py-2">
              <span className="font-mono text-sm font-semibold tracking-[0.2em] text-[#345B59]">
                WANDA10
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.12em] text-[#6F9290] uppercase hover:text-[#345B59]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
