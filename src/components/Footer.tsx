import React, { useState } from 'react';
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateHome, navigateShop, navigateWishlist, setInfoModal, pushToast } = useStore();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerEmail.trim())) {
      pushToast({
        title: 'Invalid email',
        subtitle: 'Please enter a valid email address.',
      });
      return;
    }
    setFooterSubscribed(true);
    setFooterEmail('');
    pushToast({
      title: 'Subscribed to WANDA’S',
      subtitle: 'Welcome! Use code WANDA10 for 10% off.',
    });
  };

  return (
    <footer className="bg-[#292D2C] text-[#FAF8F2]">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 border-b border-[#FAF8F2]/12 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Identity & Story */}
          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={navigateHome}
              className="flex flex-col items-start text-left"
            >
              <span className="font-editorial text-[32px] leading-none font-medium tracking-[0.24em] text-[#FAF8F2]">
                WANDA&apos;S
              </span>
              <span className="mt-1.5 text-[9px] font-medium tracking-[0.28em] text-[#6F9290] uppercase">
                EVERYDAY FINDS. ELEVATED.
              </span>
            </button>

            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.75] text-[#DCD2C3]/80">
              A curated lifestyle marketplace uniting niche fragrances, minimalist electronics,
              architectural knitwear, and heirloom everyday accessories crafted to elevate daily
              rituals.
            </p>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  name: 'Instagram',
                  path: 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm4.5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zm5.4-2.3a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z',
                },
                {
                  name: 'Pinterest',
                  path: 'M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.18-5.01 1.18-5.01s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.74 2.28.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.25-.58-2.03-2.41-2.03-3.88 0-3.16 2.3-6.06 6.62-6.06 3.47 0 6.17 2.48 6.17 5.79 0 3.45-2.18 6.23-5.2 6.23-1.02 0-1.97-.53-2.3-1.15l-.63 2.39c-.23.87-.84 1.97-1.25 2.64.94.29 1.94.45 2.98.45 5.52 0 10-4.48 10-10S17.52 2 12 2z',
                },
                {
                  name: 'TikTok',
                  path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.name.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    pushToast({
                      title: `WANDA’S on ${social.name}`,
                      subtitle: '@wandas.elevated — daily visual edits & new drops.',
                    });
                  }}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF8F2]/18 text-[#DCD2C3] transition-all duration-200 hover:border-[#6F9290] hover:bg-[#6F9290] hover:text-[#FAF8F2]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#DCD2C3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('all')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('all', 'new')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('fragrances')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Fragrances
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('electronics')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Electronics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('fashion')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Fashion &amp; Knitwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateShop('accessories')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
              Customer Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#DCD2C3]/85">
              <li>
                <button
                  type="button"
                  onClick={() => setInfoModal('shipping')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setInfoModal('returns')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={navigateWishlist}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setInfoModal('contact')}
                  className="transition-colors hover:text-[#FAF8F2]"
                >
                  Client Concierge
                </button>
              </li>
            </ul>

            <div className="mt-6 space-y-2 border-t border-[#FAF8F2]/10 pt-5 text-[12.5px] text-[#DCD2C3]/75">
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#6F9290]" />
                <span>hello@wandas.store</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-[#6F9290]" />
                <span>+1 (212) 555-0194</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-[#6F9290]" />
                <span>142 Mercer Street, New York</span>
              </div>
            </div>
          </div>

          {/* Column 4: Compact Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
              Stay in the Know
            </h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#DCD2C3]/80">
              Receive early invitations to seasonal edits, restocks, and private member offers.
            </p>

            {!footerSubscribed ? (
              <form onSubmit={handleFooterSubscribe} className="mt-5 flex">
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-[#FAF8F2]/20 bg-[#FAF8F2]/6 px-3.5 py-2.5 text-[13px] text-[#FAF8F2] placeholder:text-[#DCD2C3]/50 focus:border-[#6F9290] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center justify-center bg-[#6F9290] px-4 text-[#FAF8F2] transition-colors hover:bg-[#345B59]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="mt-5 flex items-center gap-2 border border-[#6F9290]/50 bg-[#345B59]/30 px-4 py-2.5 text-[12.5px] text-[#FAF8F2]">
                <Check className="h-4 w-4 text-[#6F9290]" />
                <span>Subscribed — welcome to WANDA&apos;S.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[12px] text-[#DCD2C3]/55 sm:flex-row">
          <p>© {new Date().getFullYear()} WANDA&apos;S Retail Collective. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setInfoModal('shipping')}
              className="transition-colors hover:text-[#FAF8F2]"
            >
              Shipping Policy
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('returns')}
              className="transition-colors hover:text-[#FAF8F2]"
            >
              Returns Policy
            </button>
            <button
              type="button"
              onClick={() => setInfoModal('contact')}
              className="transition-colors hover:text-[#FAF8F2]"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
