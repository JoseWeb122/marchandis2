import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Heart, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateProduct,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants?.[0]?.label ?? '');
      setSelectedSize(quickViewProduct.sizes?.[1] ?? quickViewProduct.sizes?.[0] ?? '');
      setQuantity(1);
      setActiveImage(0);
    }
  }, [quickViewProduct]);

  const saved = quickViewProduct ? isWishlisted(quickViewProduct.id) : false;
  const matchedVariant = quickViewProduct?.variants?.find((v) => v.label === selectedVariant);
  const unitPrice = (quickViewProduct?.price ?? 0) + (matchedVariant?.priceDelta ?? 0);

  const handleAdd = () => {
    if (!quickViewProduct) return;
    addToCart(quickViewProduct, {
      quantity,
      variantLabel: selectedVariant || undefined,
      size: selectedSize || undefined,
      openDrawer: true,
    });
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div
          key="quick-view-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-[#292D2C]/55 backdrop-blur-[3px]"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto border border-[#DCD2C3] bg-[#FAF8F2] shadow-2xl md:grid-cols-12 md:overflow-hidden"
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close quick view"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD2C3] bg-[#FAF8F2]/90 text-[#292D2C] backdrop-blur-sm transition-colors hover:bg-[#F4EFE5]"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left: Product Image */}
          <div className="relative bg-[#E7DFD2] md:col-span-6">
            <div className="aspect-[4/5] h-full w-full">
              <img
                src={quickViewProduct.images[activeImage]}
                alt={quickViewProduct.name}
                className="h-full w-full object-cover"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="absolute right-4 bottom-4 left-4 flex justify-center gap-2">
                {quickViewProduct.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`View angle ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`h-1.5 transition-all ${
                      activeImage === i ? 'w-7 bg-[#FAF8F2]' : 'w-2 bg-[#FAF8F2]/55'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Quick View Details */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6 md:max-h-[90vh] md:overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pr-8">
                <span className="text-[10.5px] font-semibold tracking-[0.24em] text-[#6F9290] uppercase">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-[12px]">
                  <Star className="h-3.5 w-3.5 fill-[#6F9290] text-[#6F9290]" />
                  <span className="font-semibold">{quickViewProduct.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="mt-2 font-editorial text-3xl leading-[1.1] text-[#292D2C]">
                {quickViewProduct.name}
              </h2>
              <p className="mt-1 text-[13px] text-[#292D2C]/60">{quickViewProduct.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-xl font-semibold text-[#292D2C]">
                  ${unitPrice.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#292D2C]/45 line-through">
                    ${(quickViewProduct.originalPrice + (matchedVariant?.priceDelta ?? 0)).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-[#292D2C]/78">
                {quickViewProduct.shortDescription}
              </p>

              {/* Variants */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#292D2C]/65 uppercase">
                    {quickViewProduct.variantLabel ?? 'Option'}:{' '}
                    <span className="text-[#292D2C]">{selectedVariant}</span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((v) => {
                      const active = selectedVariant === v.label;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v.label)}
                          className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[12px] transition-colors ${
                            active
                              ? 'border-[#345B59] bg-[#345B59] text-[#FAF8F2]'
                              : 'border-[#DCD2C3] bg-[#F4EFE5]/60 text-[#292D2C] hover:border-[#6F9290]'
                          }`}
                        >
                          {v.swatchHex && (
                            <span
                              style={{ backgroundColor: v.swatchHex }}
                              className="h-3 w-3 rounded-full ring-1 ring-black/20"
                            />
                          )}
                          <span>{v.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Apparel Sizes */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#292D2C]/65 uppercase">
                    Size: <span className="text-[#292D2C]">{selectedSize}</span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => {
                      const active = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[44px] border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                            active
                              ? 'border-[#345B59] bg-[#345B59] text-[#FAF8F2]'
                              : 'border-[#DCD2C3] bg-[#F4EFE5]/60 text-[#292D2C] hover:border-[#6F9290]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="mt-7 border-t border-[#DCD2C3] pt-5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center border border-[#DCD2C3] bg-[#F4EFE5]/70">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-9 items-center justify-center hover:bg-[#DCD2C3]/40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-[13.5px] font-semibold">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-11 w-9 items-center justify-center hover:bg-[#DCD2C3]/40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex h-11 flex-1 items-center justify-center gap-2 bg-[#6F9290] px-5 text-[11px] font-semibold tracking-[0.2em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  aria-label="Toggle wishlist"
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`flex h-11 w-11 items-center justify-center border transition-colors ${
                    saved
                      ? 'border-[#345B59] bg-[#345B59]/10 text-[#345B59]'
                      : 'border-[#DCD2C3] bg-[#F4EFE5]/60 text-[#292D2C] hover:border-[#6F9290]'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-[#6F9290] text-[#6F9290]' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigateProduct(quickViewProduct.id)}
                className="group mt-4 flex w-full items-center justify-center gap-2 py-1 text-[11px] font-semibold tracking-[0.2em] text-[#345B59] uppercase transition-colors hover:text-[#292D2C]"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
