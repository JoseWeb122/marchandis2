import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Truck,
  RotateCcw,
  Mail,
  MapPin,
  Clock,
  User,
  Heart,
  Package,
  Sparkles,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const InfoModals: React.FC = () => {
  const { infoModal, setInfoModal, wishlist, navigateWishlist, cartCount, setCartOpen } =
    useStore();

  const [contactSent, setContactSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const closeModal = () => {
    setInfoModal(null);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 300);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSent(true);
  };

  return (
    <AnimatePresence>
      {infoModal && (
        <div
          key={`info-modal-${infoModal}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-[#292D2C]/55 backdrop-blur-[3px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-h-[88vh] w-full max-w-xl overflow-y-auto border border-[#DCD2C3] bg-[#FAF8F2] p-7 shadow-2xl sm:p-9"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={closeModal}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD2C3] text-[#292D2C] transition-colors hover:bg-[#F4EFE5]"
          >
            <X className="h-4 w-4" />
          </button>

          {/* ACCOUNT PREVIEW (VISUAL FRONT-END ONLY) */}
          {infoModal === 'account' && (
            <div>
              <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                <User className="h-3.5 w-3.5" />
                <span>WANDA&apos;S Circle · Front-End Member Preview</span>
              </div>
              <h2 className="mt-2 font-editorial text-3xl text-[#292D2C]">
                Welcome Back, Guest
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[#292D2C]/65">
                Enjoy a preview of the WANDA&apos;S member experience. Your bag and wishlist are
                automatically preserved right in your browser.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    navigateWishlist();
                  }}
                  className="flex flex-col items-start border border-[#DCD2C3] bg-[#F4EFE5]/70 p-4 text-left transition-colors hover:border-[#6F9290]"
                >
                  <Heart className="h-4.5 w-4.5 text-[#6F9290]" />
                  <span className="mt-3 font-editorial text-2xl text-[#292D2C]">
                    {wishlist.length} Saved
                  </span>
                  <span className="text-[11px] tracking-[0.14em] text-[#292D2C]/60 uppercase">
                    View Wishlist
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    setCartOpen(true);
                  }}
                  className="flex flex-col items-start border border-[#DCD2C3] bg-[#F4EFE5]/70 p-4 text-left transition-colors hover:border-[#6F9290]"
                >
                  <Package className="h-4.5 w-4.5 text-[#6F9290]" />
                  <span className="mt-3 font-editorial text-2xl text-[#292D2C]">
                    {cartCount} In Bag
                  </span>
                  <span className="text-[11px] tracking-[0.14em] text-[#292D2C]/60 uppercase">
                    Open Shopping Bag
                  </span>
                </button>
              </div>

              <div className="mt-6 border border-[#DCD2C3] bg-[#F4EFE5]/60 p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#345B59] uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Active Member Privilege</span>
                </div>
                <p className="mt-2 text-[13.5px] text-[#292D2C]/80">
                  Apply code <strong className="font-mono text-[#345B59]">WANDA10</strong> inside
                  your shopping bag for 10% off your curated order, plus complimentary express
                  shipping above $150.
                </p>
              </div>
            </div>
          )}

          {/* SHIPPING INFORMATION */}
          {infoModal === 'shipping' && (
            <div>
              <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                <Truck className="h-3.5 w-3.5" />
                <span>Delivery &amp; Packaging</span>
              </div>
              <h2 className="mt-2 font-editorial text-3xl text-[#292D2C]">
                Shipping Information
              </h2>

              <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-[#292D2C]/80">
                <div className="border-b border-[#DCD2C3] pb-4">
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    Complimentary Express Delivery
                  </h3>
                  <p className="mt-1.5">
                    Orders of $150 or more enjoy complimentary carbon-neutral express shipping
                    (2–3 business days). Standard tracked delivery under $150 is a flat $12.
                  </p>
                </div>
                <div className="border-b border-[#DCD2C3] pb-4">
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    Dispatch &amp; Signature Presentation
                  </h3>
                  <p className="mt-1.5">
                    Orders placed before 2:00 PM EST ship the same business day in plastic-free
                    almond tissue wrap and protective archival boxes — ideal for effortless gifting.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    Fragrance &amp; Electronics Care
                  </h3>
                  <p className="mt-1.5">
                    Fine perfumes and precision electronics are cushioned in temperature-stabilized
                    inner sleeves with full transit insurance included.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* RETURNS & EXCHANGES */}
          {infoModal === 'returns' && (
            <div>
              <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Peace of Mind</span>
              </div>
              <h2 className="mt-2 font-editorial text-3xl text-[#292D2C]">
                Returns &amp; Exchanges
              </h2>

              <div className="mt-6 space-y-5 text-[14px] leading-relaxed text-[#292D2C]/80">
                <div className="border-b border-[#DCD2C3] pb-4">
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    30-Day Complimentary Returns
                  </h3>
                  <p className="mt-1.5">
                    We stand behind every piece we curate. Unworn apparel with tags, unopened
                    fragrances, and accessories in original condition may be returned or exchanged
                    within 30 days at no cost.
                  </p>
                </div>
                <div className="border-b border-[#DCD2C3] pb-4">
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    Instant Size Exchanges
                  </h3>
                  <p className="mt-1.5">
                    Need a different sweater fit or strap colorway? We dispatch your replacement
                    size the moment your prepaid return label is scanned.
                  </p>
                </div>
                <div>
                  <h3 className="font-sans text-[12px] font-semibold tracking-[0.16em] text-[#345B59] uppercase">
                    Electronics Protection
                  </h3>
                  <p className="mt-1.5">
                    All audio gadgets and timepieces include our 2-Year WANDA&apos;S Care Warranty
                    covering manufacturing and battery defects.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT CONCIERGE */}
          {infoModal === 'contact' && (
            <div>
              <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                <Mail className="h-3.5 w-3.5" />
                <span>Client Concierge</span>
              </div>
              <h2 className="mt-2 font-editorial text-3xl text-[#292D2C]">
                Get in Touch
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 border-y border-[#DCD2C3] py-4 text-[13px] text-[#292D2C]/75 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#6F9290]" />
                  <span>hello@wandas.store</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#6F9290]" />
                  <span>Mon–Sat · 9am–7pm</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#6F9290]" />
                  <span>SoHo, New York</span>
                </div>
              </div>

              {!contactSent ? (
                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-semibold tracking-[0.16em] text-[#292D2C]/70 uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1.5 w-full border border-[#DCD2C3] bg-[#F4EFE5]/70 px-3.5 py-2.5 text-[13.5px] focus:border-[#6F9290] focus:bg-[#FAF8F2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold tracking-[0.16em] text-[#292D2C]/70 uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full border border-[#DCD2C3] bg-[#F4EFE5]/70 px-3.5 py-2.5 text-[13.5px] focus:border-[#6F9290] focus:bg-[#FAF8F2] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-[0.16em] text-[#292D2C]/70 uppercase">
                      How can we help?
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Sizing advice, fragrance pairing, or order questions..."
                      className="mt-1.5 w-full border border-[#DCD2C3] bg-[#F4EFE5]/70 px-3.5 py-2.5 text-[13.5px] focus:border-[#6F9290] focus:bg-[#FAF8F2] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#6F9290] py-3.5 text-[11px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="mt-6 border border-[#6F9290]/40 bg-[#F4EFE5] p-6 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#345B59] text-[#FAF8F2]">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-editorial text-2xl text-[#292D2C]">
                    Message received
                  </h3>
                  <p className="mt-1 text-[13.5px] text-[#292D2C]/70">
                    Thank you, {contactName}. Our concierge team will respond within one business
                    day.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
