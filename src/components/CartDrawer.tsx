import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  ArrowRight,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById, PRODUCTS } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 150;

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    addToCart,
    clearCart,
    navigateProduct,
    navigateShop,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const discount = promoApplied ? cartSubtotal * 0.1 : 0;
  const discountedSubtotal = Math.max(0, cartSubtotal - discount);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
  const freeShippingProgress = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = discountedSubtotal === 0 || freeShippingRemaining === 0 ? 0 : 12;
  const grandTotal = discountedSubtotal + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    if (cleaned === 'WANDA10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Try code WANDA10 for 10% off your order.');
    }
  };

  const handlePlaceSampleOrder = () => {
    const orderNum = `WND-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderComplete(orderNum);
    clearCart();
    setPromoApplied(false);
    setPromoInput('');
  };

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => setOrderComplete(null), 350);
  };

  const emptySuggestions = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 3);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#292D2C]/50 backdrop-blur-[2px]"
          />

          {/* Slide-Over Warm Ivory Cart Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-[460px] flex-col bg-[#FAF8F2] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DCD2C3] px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#345B59] stroke-[1.6]" />
                <h2 className="font-editorial text-[26px] font-normal text-[#292D2C]">
                  Your Bag
                </h2>
                <span className="rounded-full bg-[#F4EFE5] px-2.5 py-0.5 text-[11px] font-semibold text-[#345B59] ring-1 ring-[#DCD2C3]">
                  {cartCount}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close shopping bag"
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD2C3] text-[#292D2C] transition-colors hover:bg-[#F4EFE5]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            {cart.length > 0 && !orderComplete && (
              <div className="border-b border-[#DCD2C3]/80 bg-[#F4EFE5] px-6 py-3.5">
                <div className="flex items-center justify-between text-[12px] text-[#292D2C]">
                  <span className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-[#6F9290]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="font-medium text-[#345B59]">
                        You&apos;ve unlocked complimentary express shipping.
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="font-semibold text-[#345B59]">
                          ${freeShippingRemaining.toFixed(2)}
                        </strong>{' '}
                        more for complimentary express shipping
                      </span>
                    )}
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden bg-[#DCD2C3]">
                  <motion.div
                    initial={false}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="h-full bg-[#6F9290]"
                  />
                </div>
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {orderComplete ? (
                /* Front-End Simulated Order Confirmation */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#345B59] text-[#FAF8F2]">
                    <CheckCircle2 className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <p className="mt-6 text-[10.5px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                    Demo Order Confirmed
                  </p>
                  <h3 className="mt-2 font-editorial text-3xl text-[#292D2C]">
                    Thank you for shopping with WANDA&apos;S.
                  </h3>
                  <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-[#292D2C]/70">
                    Your curated finds are being prepared in our signature almond linen wrap.
                    (Front-end showcase — no real charge occurred.)
                  </p>
                  <div className="mt-6 border border-[#DCD2C3] bg-[#F4EFE5] px-6 py-3">
                    <span className="text-[11px] tracking-[0.18em] text-[#292D2C]/60 uppercase">
                      Reference Number
                    </span>
                    <p className="mt-0.5 font-mono text-base font-semibold text-[#345B59]">
                      {orderComplete}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      navigateShop('all');
                    }}
                    className="mt-8 bg-[#6F9290] px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                  >
                    Continue Exploring
                  </button>
                </motion.div>
              ) : cart.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col py-6">
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFE5] text-[#6F9290] ring-1 ring-[#DCD2C3]">
                      <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <h3 className="mt-5 font-editorial text-[28px] font-light text-[#292D2C]">
                      Your shopping bag is empty
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-[13.5px] leading-relaxed text-[#292D2C]/65">
                      Discover luxury fragrances, tactile electronics, cozy cashmere knitwear, and
                      elevated daily essentials.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        handleClose();
                        navigateShop('all');
                      }}
                      className="mt-6 inline-flex items-center gap-2 bg-[#6F9290] px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Quick Suggestions inside Empty Cart */}
                  <div className="mt-8 border-t border-[#DCD2C3] pt-6">
                    <p className="mb-4 flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Popular Additions</span>
                    </p>
                    <div className="space-y-3.5">
                      {emptySuggestions.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-3.5 border border-[#DCD2C3]/80 bg-[#F4EFE5]/60 p-2.5"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            onClick={() => {
                              handleClose();
                              navigateProduct(prod.id);
                            }}
                            className="h-16 w-14 cursor-pointer object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={() => {
                                handleClose();
                                navigateProduct(prod.id);
                              }}
                              className="truncate text-left font-editorial text-[17px] text-[#292D2C] hover:text-[#345B59]"
                            >
                              {prod.name}
                            </button>
                            <p className="text-[12.5px] font-semibold text-[#292D2C]">
                              ${prod.price}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addToCart(prod, { quantity: 1 })}
                            className="border border-[#6F9290] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#345B59] uppercase transition-colors hover:bg-[#6F9290] hover:text-[#FAF8F2]"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;

                      return (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 border-b border-[#DCD2C3]/80 pb-5"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              navigateProduct(product.id);
                            }}
                            className="h-24 w-20 shrink-0 overflow-hidden bg-[#E7DFD2] ring-1 ring-[#DCD2C3]/70"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </button>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  handleClose();
                                  navigateProduct(product.id);
                                }}
                                className="text-left font-editorial text-[19px] leading-snug text-[#292D2C] hover:text-[#345B59]"
                              >
                                {product.name}
                              </button>
                              <button
                                type="button"
                                aria-label="Remove item"
                                onClick={() => removeFromCart(item.key)}
                                className="p-1 text-[#292D2C]/40 transition-colors hover:text-[#9F4B43]"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="mt-1 flex flex-wrap gap-x-2 text-[11.5px] text-[#292D2C]/60">
                              {item.selectedVariant && <span>{item.selectedVariant}</span>}
                              {item.selectedVariant && item.selectedSize && <span>·</span>}
                              {item.selectedSize && <span>Size {item.selectedSize}</span>}
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-3">
                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-[#DCD2C3] bg-[#F4EFE5]/60">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    updateCartQuantity(item.key, item.quantity - 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center text-[#292D2C] hover:bg-[#DCD2C3]/40"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-7 text-center text-[12.5px] font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    updateCartQuantity(item.key, item.quantity + 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center text-[#292D2C] hover:bg-[#DCD2C3]/40"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-[14.5px] font-semibold text-[#292D2C]">
                                ${(item.unitPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Promo Code Input */}
                  <div className="pt-1">
                    {!promoApplied ? (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#6F9290]" />
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value);
                              setPromoError('');
                            }}
                            placeholder="Promo code (try WANDA10)"
                            className="w-full border border-[#DCD2C3] bg-[#F4EFE5]/60 py-2.5 pr-3 pl-9 text-[12.5px] text-[#292D2C] placeholder:text-[#292D2C]/45 focus:border-[#6F9290] focus:bg-[#FAF8F2] focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="border border-[#292D2C] px-4 py-2 text-[10.5px] font-semibold tracking-[0.18em] text-[#292D2C] uppercase transition-colors hover:bg-[#292D2C] hover:text-[#FAF8F2]"
                        >
                          Apply
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between border border-[#6F9290]/40 bg-[#F4EFE5] px-3.5 py-2.5 text-[12px] text-[#345B59]">
                        <span className="flex items-center gap-2 font-medium">
                          <Tag className="h-3.5 w-3.5" />
                          Code <strong>WANDA10</strong> applied (10% off)
                        </span>
                        <button
                          type="button"
                          onClick={() => setPromoApplied(false)}
                          className="text-[#292D2C]/50 hover:text-[#292D2C]"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    {promoError && (
                      <p className="mt-1.5 text-[11.5px] text-[#9F4B43]">{promoError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Totals & Checkout CTA */}
            {cart.length > 0 && !orderComplete && (
              <div className="border-t border-[#DCD2C3] bg-[#F4EFE5] px-6 py-5">
                <div className="space-y-2 text-[13.5px]">
                  <div className="flex justify-between text-[#292D2C]/75">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-[#345B59]">
                      <span>Privilege (WANDA10 · 10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#292D2C]/75">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#DCD2C3] pt-3 text-[16px] font-semibold text-[#292D2C]">
                    <span>Estimated Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceSampleOrder}
                  className="mt-5 flex w-full items-center justify-center gap-2.5 bg-[#6F9290] py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                >
                  <span>Complete Demo Order</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-2.5 text-center text-[11px] text-[#292D2C]/50">
                  Interactive front-end preview · Complimentary gift wrapping included
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
